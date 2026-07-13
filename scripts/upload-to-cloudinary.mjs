import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'l7fgvttd',
  api_key: process.env.CLOUDINARY_API_KEY || '292343919148643',
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

const PUBLIC_DIR = path.join(__dirname, '../public')

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif']
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.avi', '.mkv']

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, fileList)
    } else {
      fileList.push(fullPath)
    }
  }
  return fileList
}

// Preserves the existing public/ subfolder layout under cinemora/, e.g.
// public/videos/reels/foo.mp4 -> cinemora/videos/reels/foo
function getCloudinaryFolder(filePath) {
  const relativeDir = path.dirname(path.relative(PUBLIC_DIR, filePath))
  const normalized = relativeDir.split(path.sep).join('/')
  return normalized === '.' ? 'cinemora' : `cinemora/${normalized}`
}

function getResourceType(ext) {
  if (VIDEO_EXTENSIONS.includes(ext)) return 'video'
  if (IMAGE_EXTENSIONS.includes(ext)) return 'image'
  return 'raw'
}

function slugify(name) {
  return name
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

async function uploadFile(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const resourceType = getResourceType(ext)
  const folder = getCloudinaryFolder(filePath)
  const publicId = slugify(path.basename(filePath, ext)) || 'file'

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: resourceType,
      folder: folder,
      public_id: publicId,
      overwrite: false,
      use_filename: true,
    })

    console.log(`Uploaded: ${result.secure_url}`)
    return { localPath: path.relative(PUBLIC_DIR, filePath), cloudinaryUrl: result.secure_url, publicId: result.public_id, resourceType }
  } catch (err) {
    console.error(`Failed: ${filePath}`)
    console.error(`   Reason: ${err.message}`)
    return null
  }
}

async function main() {
  if (!process.env.CLOUDINARY_API_SECRET) {
    console.error('Missing CLOUDINARY_API_SECRET env var. Aborting.')
    process.exit(1)
  }

  const allFiles = getAllFiles(PUBLIC_DIR)
  const mediaFiles = allFiles.filter(f => {
    const ext = path.extname(f).toLowerCase()
    return [...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS].includes(ext)
  })

  console.log(`\nFound ${mediaFiles.length} media files to upload...\n`)

  const results = []
  for (const file of mediaFiles) {
    const result = await uploadFile(file)
    if (result) results.push(result)
  }

  const mappingPath = path.join(__dirname, '../cloudinary-map.json')
  fs.writeFileSync(mappingPath, JSON.stringify(results, null, 2))

  console.log(`\nDone! ${results.length}/${mediaFiles.length} files uploaded.`)
  console.log(`URL mapping saved to: cloudinary-map.json`)
}

main()
