"use client";

import { useEffect, useRef } from "react";
import { BrandingCard, type BrandingService } from "@/components/branding-card";

interface BrandingShowcaseProps {
  services: BrandingService[];
}

export function BrandingShowcase({ services }: BrandingShowcaseProps) {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollDistanceRef = useRef(0);

  useEffect(() => {
    const showcase = showcaseRef.current;
    const viewport = viewportRef.current;
    const section = showcase?.closest<HTMLElement>(".branding-section");

    if (!showcase || !viewport || !section) {
      return;
    }

    const measure = () => {
      scrollDistanceRef.current = Math.max(0, showcase.scrollWidth - viewport.clientWidth);
    };

    const onWheel = (event: WheelEvent) => {
      const scrollDistance = scrollDistanceRef.current;

      if (scrollDistance <= 1) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const isPinned = rect.top <= 2 && rect.bottom >= window.innerHeight - 2;

      if (!isPinned) {
        return;
      }

      const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX)
        ? event.deltaY
        : event.deltaX;
      const isAtStart = viewport.scrollLeft <= 0 && delta < 0;
      const isAtEnd = viewport.scrollLeft >= scrollDistance - 1 && delta > 0;

      if (isAtStart || isAtEnd) {
        return;
      }

      event.preventDefault();
      viewport.scrollLeft = Math.min(Math.max(viewport.scrollLeft + delta, 0), scrollDistance);
    };

    measure();
    window.addEventListener("resize", measure);
    viewport.addEventListener("scroll", measure, { passive: true });
    section.addEventListener("wheel", onWheel, { passive: false });
    const delayedMeasure = window.setTimeout(measure, 300);
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(showcase);
    resizeObserver.observe(viewport);

    return () => {
      resizeObserver.disconnect();
      window.clearTimeout(delayedMeasure);
      window.removeEventListener("resize", measure);
      viewport.removeEventListener("scroll", measure);
      section.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <>
      <div className="branding-showcase-viewport" ref={viewportRef}>
        <div className="branding-grid" ref={showcaseRef}>
          {services.map((service, index) => (
            <BrandingCard
              service={service}
              isFeatured={index === 0}
              key={`${service.title}-${service.date}`}
            />
          ))}
        </div>
      </div>

      <div className="branding-actions">
        <a className="book-button" href="/booking">
          Book a Call <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </>
  );
}
