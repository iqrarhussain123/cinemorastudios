"use client";

import { useEffect, useRef, useState } from "react";

type ScrollCounterProps = {
  value: string;
  duration?: number;
};

export function ScrollCounter({ value, duration = 1300 }: ScrollCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(() => formatCounter(value, 0));

  useEffect(() => {
    const counter = counterRef.current;

    if (!counter) return;

    let frameId = 0;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frameId = window.requestAnimationFrame(() => setDisplayValue(value));
      return () => window.cancelAnimationFrame(frameId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          window.cancelAnimationFrame(frameId);
          setDisplayValue(formatCounter(value, 0));
          return;
        }

        window.cancelAnimationFrame(frameId);
        setDisplayValue(formatCounter(value, 0));
        const startTime = performance.now();

        const animate = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(formatCounter(value, easedProgress));

          if (progress < 1) {
            frameId = window.requestAnimationFrame(animate);
          }
        };

        frameId = window.requestAnimationFrame(animate);
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(counter);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, [duration, value]);

  return (
    <span className="scroll-counter" ref={counterRef} aria-label={value}>
      <span aria-hidden="true">{displayValue}</span>
    </span>
  );
}

function formatCounter(value: string, progress: number) {
  const match = value.match(/-?\d+(?:\.\d+)?/);

  if (!match) return value;

  const target = Number(match[0]);
  const decimals = match[0].includes(".") ? match[0].split(".")[1].length : 0;
  const current = target * progress;
  const formattedNumber = decimals ? current.toFixed(decimals) : Math.round(current).toString();

  return `${value.slice(0, match.index)}${formattedNumber}${value.slice((match.index ?? 0) + match[0].length)}`;
}
