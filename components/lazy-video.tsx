"use client";

import {
  type VideoHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

type LazyVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  "onCanPlay" | "onLoadedData" | "preload" | "src"
> & {
  lazyRootMargin?: string;
  loadImmediately?: boolean;
  preload?: VideoHTMLAttributes<HTMLVideoElement>["preload"];
  restartOnHover?: boolean;
  src: string;
};

export function LazyVideo({
  lazyRootMargin = "0px",
  loadImmediately = false,
  preload = "metadata",
  restartOnHover = false,
  src,
  ...videoProps
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(loadImmediately);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || loadImmediately) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldLoad = entry.isIntersecting;
        setIsNearViewport(shouldLoad);

        if (!shouldLoad) {
          video.pause();
          return;
        }

        if (video.src) {
          void video.play();
        }
      },
      { rootMargin: lazyRootMargin, threshold: 0.15 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [lazyRootMargin, loadImmediately]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !isNearViewport || !video.src) {
      return;
    }

    void video.play();
  }, [isNearViewport, src]);

  const restartVideo = () => {
    const video = videoRef.current;

    if (!video || !video.src) {
      return;
    }

    video.currentTime = 0;
    void video.play();
  };

  return (
    <>
      {!isLoaded ? (
        <div className="video-loading-screen" aria-hidden="true">
          <span className="video-loading-spinner" />
        </div>
      ) : null}
      <video
        {...videoProps}
        data-loaded={isLoaded ? "true" : "false"}
        onCanPlay={() => setIsLoaded(true)}
        onLoadedData={() => setIsLoaded(true)}
        onMouseEnter={restartOnHover ? restartVideo : videoProps.onMouseEnter}
        onFocus={restartOnHover ? restartVideo : videoProps.onFocus}
        preload={isNearViewport ? preload : "none"}
        ref={videoRef}
        src={isNearViewport ? src : undefined}
      />
    </>
  );
}
