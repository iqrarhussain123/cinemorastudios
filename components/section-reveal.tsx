"use client";

import { useEffect } from "react";

const revealSelector = [
  ".video-heading-inner h2",
  ".workflow-toolbar > *",
  ".workflow-node",
  ".impact-stat-card",
  ".impact-cta-card",
  ".work-section-intro > *",
  ".work-filters",
  ".testimonials-heading > *",
  ".project-section-intro > *",
  ".project-preview-stage",
  ".conversion-cta-inner > *",
  ".faq-media-column > *",
  ".faq-content > .eyebrow",
  ".faq-content > h2",
  ".faq-list details",
  ".about-copy > *",
  ".about-image-placeholder",
  ".team-heading > *",
  ".team-card",
  ".footer-wordmark",
  ".footer-main > *",
  ".footer-legal > *",
].join(",");

export function SectionReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.classList.add("reveal-enabled");

    const groups = new Map<Element, HTMLElement[]>();
    elements.forEach((element) => {
      element.classList.add("reveal-on-scroll");
      const group = element.closest("section, footer") ?? document.body;
      const items = groups.get(group) ?? [];
      items.push(element);
      groups.set(group, items);
    });

    groups.forEach((items) => {
      items.forEach((element, index) => {
        element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
      });
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return () => root.classList.remove("reveal-enabled");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-enabled");
    };
  }, []);

  return null;
}
