"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { RollingLink } from "@/components/rolling-link";

const navigation = [
  { href: "#top", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#contact", label: "Contact Us" },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

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

  return (
    <header className={`site-header ${isPastHero ? "is-hidden" : ""}`}>
      <div className="site-header-inner">
        <a className="brand" href="#top" aria-label="Cinemora Studios home">
          <Image
            className="brand-mark"
            src="/images/branding/cinemora-logo.png"
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
            src="/images/branding/menu-lines.png"
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

        <a className="header-contact-link" href="#contact">
          Contact Us
        </a>

        <div
          className={`mobile-menu ${isMenuOpen ? "is-open" : ""}`}
          id="mobile-menu"
        >
          {navigation.map((item) => (
            <a
              href={item.href}
              key={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
