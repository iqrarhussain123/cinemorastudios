"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { RollingText } from "@/components/rolling-link";

const heroSlides = [
  "https://res.cloudinary.com/l7fgvttd/image/upload/v1784420054/cinemora/images/hero/slides/iqrar-studios.png",
  "https://res.cloudinary.com/l7fgvttd/image/upload/v1783963301/cinemora/images/hero/slides/slide3.png",
  "https://res.cloudinary.com/l7fgvttd/image/upload/v1783963302/cinemora/images/hero/slides/slide4.png",
  "https://res.cloudinary.com/l7fgvttd/image/upload/v1783966417/cinemora/images/hero/slides/slide5.png",
  "https://res.cloudinary.com/l7fgvttd/image/upload/v1783963309/cinemora/images/hero/slides/slide6.png",
  "https://res.cloudinary.com/l7fgvttd/image/upload/v1783963311/cinemora/images/hero/slides/slide7.png",
  "https://res.cloudinary.com/l7fgvttd/image/upload/v1783966424/cinemora/images/hero/slides/slide8.png",
];

const showcaseBrands = [
  {
    name: "Nasdaq",
    logo: "/images/logos/nasdaq.png",
  },
  {
    name: "Ray White",
    logo: "/images/logos/ray-white-new.png",
  },
  {
    name: "S Five Real Estate",
    logo: "/images/logos/S FIVE REAL ESTATE.png",
  },
  {
    name: "Spoken Wines",
    logo: "/images/logos/SPOKEN-WINES.png",
  },
  {
    name: "Success School",
    logo: "/images/logos/Success School.png",
  },
  {
    name: "Zendor Properties",
    logo: "/images/logos/zendorproperties_logo.png",
  },
];

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frameId = 0;

    const updateParallax = () => {
      frameId = 0;
      const bounds = hero.getBoundingClientRect();

      if (bounds.bottom < 0 || bounds.top > window.innerHeight) {
        return;
      }

      const shift = Math.max(-35, Math.min(95, -bounds.top * 0.13));
      hero.style.setProperty("--hero-shift", `${shift}px`);
    };

    const queueParallaxUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener("scroll", queueParallaxUpdate, { passive: true });
    window.addEventListener("resize", queueParallaxUpdate);

    return () => {
      window.removeEventListener("scroll", queueParallaxUpdate);
      window.removeEventListener("resize", queueParallaxUpdate);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const carouselBrands = [...showcaseBrands, ...showcaseBrands];

  return (
    <section
      className="hero hero-reference"
      id="top"
      aria-labelledby="hero-title"
      ref={heroRef}
    >
      <div
        className="hero-slideshow"
        aria-hidden="true"
        style={{ "--hero-slide-duration": `${heroSlides.length * 4}s` } as CSSProperties}
      >
        {heroSlides.map((slide, index) => (
          <Image
            className="hero-slide"
            src={slide}
            alt=""
            fill
            sizes="100vw"
            style={{ "--slide-index": index } as CSSProperties}
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            key={slide}
          />
        ))}
      </div>

      <div className="hero-reference-layout">
        <div className="hero-reference-title">
          <div className="hero-proof" aria-label="Client review rating">
            <span className="hero-proof-avatars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="hero-proof-stars">*****</span>
            <strong>4.9/5</strong>
            <small>based on 180 verified reviews</small>
          </div>

          <h1 className="hero-statement" id="hero-title">
            <span>Brands </span>
            <span>That Lead</span>
          </h1>

          <div className="hero-project-actions">
            <a className="hero-project-link hero-project-link-primary rolling-trigger" href="/booking" aria-label="Start Your Brand">
              <RollingText label="Start Your Brand" />
            </a>
            <a className="hero-project-link hero-project-link-secondary rolling-trigger" href="#work" aria-label="See our Work">
              <RollingText label="See our Work" />
            </a>
          </div>
        </div>

        <div className="hero-reference-copy">
          <p>
            We build personal brands and AI systems that turn attention into
            clients.
          </p>
          <div className="brand-showcase" aria-label="Brands showcase">
            <div className="brand-carousel">
              <div className="brand-track">
                {carouselBrands.map((brand, index) => (
                  <div
                    className="showcase-brand"
                    aria-hidden={index >= showcaseBrands.length}
                    key={`${brand.name}-${index}`}
                  >
                    <Image
                      src={brand.logo}
                      alt={index < showcaseBrands.length ? brand.name : ""}
                      width={300}
                      height={300}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
