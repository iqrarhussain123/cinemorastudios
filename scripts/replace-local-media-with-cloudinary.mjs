import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, "..");
const MAP_PATH = path.join(PROJECT_ROOT, "cloudinary-map.json");
const TARGET_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".css"]);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", ".next", "node_modules", "public"].includes(entry.name)) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (TARGET_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function normalizeLocalUrl(localPath) {
  return `/${localPath.split(path.sep).join("/")}`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function main() {
  if (!fs.existsSync(MAP_PATH)) {
    console.error("Missing cloudinary-map.json. Run scripts/upload-to-cloudinary.mjs first.");
    process.exit(1);
  }

  const mappings = JSON.parse(fs.readFileSync(MAP_PATH, "utf8"))
    .filter((entry) => entry?.localPath && entry?.cloudinaryUrl)
    .map((entry) => ({
      localUrl: normalizeLocalUrl(entry.localPath),
      cloudinaryUrl: entry.cloudinaryUrl,
    }));

  const files = walk(PROJECT_ROOT);
  const changedFiles = [];
  const unmatched = new Set();
  const localPathPattern = /\/(?:images|videos)\/[^"'`),\s]+(?:\s[^"'`),]+)*/g;

  for (const file of files) {
    let content = fs.readFileSync(file, "utf8");
    const original = content;

    for (const { localUrl, cloudinaryUrl } of mappings) {
      const pattern = new RegExp(`(?<=["'\`])${escapeRegExp(localUrl)}(?=["'\`])`, "g");
      content = content.replace(pattern, cloudinaryUrl);
    }

    for (const match of original.match(localPathPattern) ?? []) {
      if (!mappings.some(({ localUrl }) => localUrl === match)) {
        unmatched.add(match);
      }
    }

    if (content !== original) {
      fs.writeFileSync(file, content);
      changedFiles.push(path.relative(PROJECT_ROOT, file));
    }
  }

  console.log(`Updated ${changedFiles.length} files.`);
  for (const file of changedFiles) {
    console.log(`- ${file}`);
  }

  if (unmatched.size > 0) {
    console.log("\nLocal media references not found in cloudinary-map.json:");
    for (const item of [...unmatched].sort()) {
      console.log(`- ${item}`);
    }
  }
}

main();
