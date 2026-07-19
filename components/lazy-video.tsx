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
  muteOnExit?: boolean;
  preload?: VideoHTMLAttributes<HTMLVideoElement>["preload"];
  restartOnHover?: boolean;
  deliveryWidth?: number;
  src: string;
  toggleMuteOnClick?: boolean;
};

export function LazyVideo({
  lazyRootMargin = "0px",
  muted = false,
  muteOnExit = false,
  preload = "metadata",
  restartOnHover = false,
  deliveryWidth = 720,
  src,
  toggleMuteOnClick = false,
  ...videoProps
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isMuted, setIsMuted] = useState(Boolean(muted));
  const [muteFeedback, setMuteFeedback] = useState<"muted" | "unmuted" | null>(null);
  const effectiveMuted = toggleMuteOnClick ? isMuted : Boolean(muted);
  const deliverySrc = optimizeVideoUrl(src, deliveryWidth);
  const posterSrc = getVideoPosterUrl(src, deliveryWidth);

  useEffect(() => {
    if (!muteFeedback) {
      return;
    }

    const timer = window.setTimeout(() => {
      setMuteFeedback(null);
    }, 850);

    return () => window.clearTimeout(timer);
  }, [muteFeedback]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const target = video.parentElement ?? video;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldLoad = entry.isIntersecting;
        setIsNearViewport(shouldLoad);

        if (!shouldLoad) {
          if (muteOnExit) {
            setIsMuted(true);
          }

          video.pause();
          return;
        }

        if (video.src) {
          void video.play();
        }
      },
      { rootMargin: lazyRootMargin, threshold: 0.15 },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [lazyRootMargin, muteOnExit]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = effectiveMuted;
  }, [effectiveMuted]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !isNearViewport || !video.src) {
      return;
    }

    void video.play();
  }, [isNearViewport, deliverySrc]);

  const restartVideo = () => {
    const video = videoRef.current;

    if (!video || !video.src) {
      return;
    }

    video.currentTime = 0;
    void video.play();
  };

  const toggleMuted = () => {
    const video = videoRef.current;
    const nextMuted = !isMuted;

    setIsMuted(nextMuted);
    setMuteFeedback(nextMuted ? "muted" : "unmuted");

    if (video?.src) {
      void video.play();
    }
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
        muted={effectiveMuted}
        poster={isNearViewport ? posterSrc : undefined}
        src={isNearViewport ? deliverySrc : undefined}
      />
      {toggleMuteOnClick ? (
        <button
          aria-label={effectiveMuted ? "Unmute video" : "Mute video"}
          className="video-mute-toggle"
          onClick={toggleMuted}
          type="button"
        />
      ) : null}
      {muteFeedback ? (
        <div className="video-mute-feedback" aria-live="polite">
          <span aria-hidden="true">{muteFeedback === "muted" ? "M" : "U"}</span>
          <strong>{muteFeedback === "muted" ? "Muted" : "Unmuted"}</strong>
        </div>
      ) : null}
    </>
  );
}

function optimizeVideoUrl(src: string, width: number) {
  if (!src.includes("res.cloudinary.com") || !src.includes("/video/upload/")) {
    return src;
  }

  return src.replace(
    "/video/upload/",
    `/video/upload/f_auto,q_auto:eco,vc_auto,w_${width}/`,
  );
}

function getVideoPosterUrl(src: string, width: number) {
  if (!src.includes("res.cloudinary.com") || !src.includes("/video/upload/")) {
    return undefined;
  }

  return src
    .replace(
      "/video/upload/",
      `/video/upload/so_0,f_webp,q_auto:eco,w_${width}/`,
    )
    .replace(/\.mp4(?:\?.*)?$/i, ".webp");
}
