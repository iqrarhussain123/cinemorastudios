"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      frameId = 0;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

      progressRef.current?.style.setProperty(
        "transform",
        `scaleX(${Math.min(1, Math.max(0, progress))})`,
      );
    };

    const queueProgressUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", queueProgressUpdate, { passive: true });
    window.addEventListener("resize", queueProgressUpdate);

    return () => {
      window.removeEventListener("scroll", queueProgressUpdate);
      window.removeEventListener("resize", queueProgressUpdate);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div className="scroll-progress-value" ref={progressRef} />
    </div>
  );
}

