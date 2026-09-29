"use client";

import { useEffect, useRef } from "react";
import "./offer-section.css";

export function OfferSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Local reveal observer scoped to this section
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const elements = Array.from(root.querySelectorAll<HTMLElement>(".offer-reveal"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    elements.forEach((el, i) => {
      el.classList.add("reveal-on-scroll");
      el.style.setProperty("--reveal-delay", `${Math.min(i % 5, 4) * 70}ms`);
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // LemonSqueezy script injection (once)
  useEffect(() => {
    if (document.getElementById("lemon-js")) return;
    const script = document.createElement("script");
    script.id = "lemon-js";
    script.src = "https://assets.lemonsqueezy.com/lemon.js";
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const trackClick = (label: string) => {
    // Plausible
    if (typeof window !== "undefined" && (window as any).plausible) {
      (window as any).plausible("Offer CTA Click", { props: { label } });
    }
    // GA4
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "offer_cta_click", { label });
    }
  };

  return (
    <section className="offer-section" id="pricing" aria-labelledby="offer-section-title" ref={sectionRef}>

      {/* ── 1. Problem hook ── */}
      <div className="offer-problem">
        <div className="section-inner">
          <div className="offer-section-intro offer-reveal">
            <p className="eyebrow">The Real Cost of Getting This Wrong</p>
            <h2 id="offer-section-title">Most brands invest in content.<br />Few invest in the system behind it.</h2>
          </div>

          <div className="offer-problem-grid">
            <div className="offer-problem-card offer-reveal">
              <span className="offer-problem-number" aria-hidden="true">01</span>
              <strong className="offer-problem-label">The Visibility Tax</strong>
              <p>You're spending on content that earns impressions, not pipeline. Followers without architecture cost you money every month.</p>
            </div>
            <div className="offer-problem-card offer-reveal">
              <span className="offer-problem-number" aria-hidden="true">02</span>
              <strong className="offer-problem-label">The Credibility Gap</strong>
              <p>Great content without positioning strategy still fails to convert. Attention without trust infrastructure goes to waste.</p>
            </div>
            <div className="offer-problem-card offer-reveal">
              <span className="offer-problem-number" aria-hidden="true">03</span>
              <strong className="offer-problem-label">The Compounding Edge</strong>
              <p>Brands with integrated content-to-pipeline systems outperform those without. The gap widens every quarter you wait.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. ROI proof ── */}
      <div className="offer-roi">
        <div className="section-inner offer-roi-inner">
          <div className="offer-roi-math offer-reveal">
            <p className="eyebrow offer-eyebrow-light">Proof of Work</p>
            <div className="offer-roi-number" aria-label="17x average return on investment">
              <span className="offer-roi-digit">17</span>
              <span className="offer-roi-x">×</span>
            </div>
            <p className="offer-roi-label">Average client ROI within 12 months</p>
            <p className="offer-roi-sub">Across positioning, content systems, and AI-powered pipeline — measured against retainer cost.</p>
          </div>

          <div className="offer-roi-stats">
            <div className="offer-stat-tile offer-reveal">
              <strong>$10K → $100K/mo</strong>
              <span>Tim Frey — Success School grew monthly revenue 10× in 18 months through brand positioning and content systems.</span>
            </div>
            <div className="offer-stat-tile offer-reveal">
              <strong>1K → 10K subscribers</strong>
              <span>Spoken Wines — YouTube channel grew 10× with long-form content hitting 30,000 views and short-form reaching 220,000.</span>
            </div>
            <div className="offer-stat-tile offer-reveal">
              <strong>$10K ARR</strong>
              <span>GradeWise AI — SaaS product built end-to-end from zero, live and generating recurring revenue within the engagement.</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Offer tracks ── */}
      <div className="offer-tracks">
        <div className="section-inner">
          <div className="offer-tracks-intro offer-reveal">
            <p className="eyebrow">Choose Your Track</p>
            <h2>Two ways to work together.</h2>
          </div>

          <div className="offer-tracks-grid">
            {/* Track A */}
            <article className="offer-track-card offer-reveal" aria-label="Personal Brand Management track">
              <div className="offer-track-header">
                <span className="offer-track-tag">Most Popular</span>
                <h3>Personal Brand Management</h3>
                <div className="offer-track-price">
                  <strong>$1,500</strong>
                  <span>/mo</span>
                </div>
                <p className="offer-track-pitch">Full-stack content and positioning engine. We build, run, and iterate the entire system for you.</p>
              </div>
              <ul className="offer-track-features" aria-label="Included in Personal Brand Management">
                <li>Monthly content strategy and editorial calendar</li>
                <li>Platform-native video production and editing</li>
                <li>Short-form and long-form publishing across channels</li>
                <li>Audience growth and community engagement systems</li>
                <li>Monthly performance review and strategy iteration</li>
                <li>Dedicated Slack channel and async support</li>
              </ul>
              <div className="offer-track-actions">
                <a
                  className="conversion-button offer-track-primary lemonsqueezy-button"
                  href="https://YOUR-STORE.lemonsqueezy.com/buy/PRODUCT-ID"
                  onClick={() => trackClick("personal-brand-checkout")}
                >
                  <span>Get started — $1,500/mo</span>
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M5 12h13M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a
                  className="offer-track-secondary"
                  href="/booking"
                  onClick={() => trackClick("personal-brand-call")}
                >
                  Or book a call first
                </a>
              </div>
            </article>

            {/* Track B */}
            <article className="offer-track-card offer-track-card-alt offer-reveal" aria-label="AI Custom Solutions track">
              <div className="offer-track-header">
                <span className="offer-track-tag offer-track-tag-alt">Custom Build</span>
                <h3>AI Custom Solutions</h3>
                <div className="offer-track-price">
                  <strong>$3,000</strong>
                  <span>+</span>
                </div>
                <p className="offer-track-pitch">End-to-end AI and web systems scoped to your exact growth constraint — built once, runs forever.</p>
              </div>
              <ul className="offer-track-features" aria-label="Included in AI Custom Solutions">
                <li>Custom scoping call and systems architecture</li>
                <li>AI-powered outreach, automation, or SaaS product build</li>
                <li>Conversion-optimised landing page or web platform</li>
                <li>Integration with existing tools and CRM stack</li>
                <li>30-day post-launch support and iteration cycle</li>
                <li>Ownership of all assets and source code</li>
              </ul>
              <div className="offer-track-actions">
                <a
                  className="conversion-button offer-track-primary lemonsqueezy-button"
                  href="https://YOUR-STORE.lemonsqueezy.com/buy/PRODUCT-ID"
                  onClick={() => trackClick("ai-solutions-checkout")}
                >
                  <span>Start your build — $3,000+</span>
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M5 12h13M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a
                  className="offer-track-secondary"
                  href="/booking"
                  onClick={() => trackClick("ai-solutions-call")}
                >
                  Or book a scoping call
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* ── 4. Close ── */}
      <div className="offer-close">
        <div className="section-inner offer-close-inner">
          <div className="offer-close-copy offer-reveal">
            <p className="eyebrow">Risk Reversal</p>
            <h2>No lock-ins. No guesswork. Just results.</h2>
            <p>Every engagement begins with a strategy call. If the fit isn't right, you'll know before any money changes hands. Month-to-month on retainer. Full asset ownership on project builds.</p>
          </div>

          <div className="offer-close-right">
            <div className="offer-slots offer-reveal" aria-label="Available slots">
              <div className="offer-slots-bar" aria-hidden="true">
                <span className="offer-slots-fill" style={{ width: "40%" }} />
              </div>
              <p className="offer-slots-label">
                <strong>2 of 5</strong> spots taken this quarter
              </p>
              <p className="offer-slots-sub">Taking on 3 new clients before end of quarter.</p>
            </div>

            <div className="offer-close-actions offer-reveal">
              <a
                className="conversion-button"
                href="/booking"
                onClick={() => trackClick("close-book-call")}
              >
                <span>Book a growth strategy call</span>
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M5 12h13M13 6l6 6-6 6" />
                </svg>
              </a>
              <a
                className="offer-close-secondary lemonsqueezy-button"
                href="https://YOUR-STORE.lemonsqueezy.com/buy/PRODUCT-ID"
                onClick={() => trackClick("close-checkout")}
              >
                Skip the call — start directly
                <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16">
                  <path d="M5 12h13M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
