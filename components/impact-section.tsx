"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { ScrollCounter } from "@/components/scroll-counter";
import { RollingText } from "@/components/rolling-link";

const impactStats = [
  ["Successful Projects", "200+"],
  ["Client Satisfaction", "95%"],
  ["Years of Experience", "10+"],
];

const impactStatementLines = [
  "We combine creativity, technology, and marketing",
  "to help ambitious brands grow and build authority.",
  "Then lead their category.",
];

export function ImpactSection() {
  const statementRef = useRef<HTMLHeadingElement>(null);
  const [isStatementVisible, setIsStatementVisible] = useState(false);

  useEffect(() => {
    const statement = statementRef.current;
    if (!statement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatementVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(statement);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="impact-section" aria-labelledby="impact-title">
      <div className="impact-bg-placeholder">
        <div className="section-inner impact-inner">
          <div className="impact-intro">
            <h2
              className={isStatementVisible ? "is-filled" : ""}
              id="impact-title"
              ref={statementRef}
            >
              {impactStatementLines.map((line, lineIndex) => {
                const precedingWords = impactStatementLines
                  .slice(0, lineIndex)
                  .reduce((total, item) => total + item.split(" ").length, 0);

                return (
                  <span className="impact-line" key={line}>
                    {line.split(" ").map((word, wordIndex) => (
                      <span
                        className="impact-word"
                        key={`${word}-${wordIndex}`}
                        style={{ "--word-index": precedingWords + wordIndex } as CSSProperties}
                      >
                        {word}{" "}
                      </span>
                    ))}
                  </span>
                );
              })}
            </h2>
          </div>

          <div className="impact-stats">
            {impactStats.map(([label, value]) => (
              <div className="impact-stat-card" key={label}>
                <strong><ScrollCounter value={value} /></strong>
                <span>{label}</span>
              </div>
            ))}
            <a className="impact-cta-card rolling-trigger" href="#contact" aria-label="More About Us">
              <span aria-hidden="true">↗</span>
              <strong><RollingText label="More About Us" /></strong>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
