import Image, { type ImageProps } from "next/image";

type LoadableImageProps = ImageProps;

export function LoadableImage({
  alt,
  className,
  ...imageProps
}: LoadableImageProps) {
  return (
    <Image {...imageProps} alt={alt} className={className} />
  );
}
