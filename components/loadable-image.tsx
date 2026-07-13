"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type LoadableImageProps = ImageProps & {
  placeholderLabel?: string;
};

export function LoadableImage({
  alt,
  className,
  onLoad,
  placeholderLabel = "Loading image",
  ...imageProps
}: LoadableImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded ? (
        <span className="image-loading-text" aria-hidden="true">
          {placeholderLabel}
        </span>
      ) : null}
      <Image
        {...imageProps}
        alt={alt}
        className={className}
        data-loaded={isLoaded ? "true" : "false"}
        onLoad={(event) => {
          setIsLoaded(true);
          onLoad?.(event);
        }}
      />
    </>
  );
}
