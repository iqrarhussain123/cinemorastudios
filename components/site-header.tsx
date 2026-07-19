"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RollingLink, RollingText } from "@/components/rolling-link";

const navigation = [
  { href: "#top", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Case Studies" },
  { href: "/booking", label: "Contact Us" },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frameId = 0;

    const updateHeaderState = () => {
      frameId = 0;
      const pastHero = window.scrollY >= window.innerHeight * 0.92;
      setIsPastHero(pastHero);

      if (pastHero) {
        setIsMenuOpen(false);
      }
    };

    const queueUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateHeaderState);
      }
    };

    updateHeaderState();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const closeOnOutsidePointer = (event: PointerEvent) => {
      const header = headerRef.current;

      if (header?.contains(event.target as Node)) {
        return;
      }

      setIsMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
    };
  }, [isMenuOpen]);

  return (
    <header className={`site-header ${isPastHero ? "is-hidden" : ""}`} ref={headerRef}>
      <div className="site-header-inner">
        <a className="brand" href="#top" aria-label="Cinemora Studios home">
          <Image
            className="brand-mark"
            src="https://res.cloudinary.com/l7fgvttd/image/upload/v1783963296/cinemora/images/branding/cinemora-logo.png"
            alt=""
            width={300}
            height={300}
            priority
          />
          <span className="brand-copy">
            <strong>Cinemora Studios</strong>
            <small>We Turn Attention into Clients</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <Image
            className="menu-icon"
            src="https://res.cloudinary.com/l7fgvttd/image/upload/v1783963297/cinemora/images/branding/menu-lines.png"
            alt=""
            width={96}
            height={96}
          />
        </button>

        <nav aria-label="Main navigation">
          {navigation.slice(0, 3).map((item) => (
            <RollingLink href={item.href} label={item.label} key={item.href} />
          ))}
        </nav>

        <a className="header-contact-link rolling-trigger" href="/booking" aria-label="Contact Us">
          <RollingText label="Contact Us" />
        </a>

        <div
          className={`mobile-menu ${isMenuOpen ? "is-open" : ""}`}
          id="mobile-menu"
        >
          {navigation.map((item) => (
            <a
              className="rolling-trigger"
              href={item.href}
              key={item.href}
              aria-label={item.label}
              onClick={() => setIsMenuOpen(false)}
            >
              <RollingText label={item.label} />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
