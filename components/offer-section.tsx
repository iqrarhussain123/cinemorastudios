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

  const track = (label: string, ctaType: "checkout" | "booking" | "general" = "general") => {
    if (typeof window !== "undefined") {
      if ((window as any).posthog) {
        (window as any).posthog.capture("offer_cta_clicked", { label, cta_type: ctaType });
      }
      if ((window as any).plausible) {
        (window as any).plausible("Offer CTA Click", { props: { label } });
      }
      if ((window as any).gtag) {
        (window as any).gtag("event", "offer_cta_clicked", { label, cta_type: ctaType });
      }
    }
  };

  return (
    <section className="offer-section" id="pricing" aria-labelledby="offer-title" ref={sectionRef}>

      {/* ── 1. Problem hook ── */}
      <div className="offer-problem">
        <div className="section-inner">
          <div className="offer-section-intro offer-reveal">
            <p className="eyebrow">The Real Cost of Getting This Wrong</p>
            <h2 id="offer-title">Most brands invest in content.<br />Few invest in the system behind it.</h2>
          </div>

          <div className="offer-problem-grid">
            <div className="offer-problem-card offer-reveal">
              <span className="offer-problem-number" aria-hidden="true">01</span>
              <svg className="offer-problem-icon" aria-hidden="true" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="18" width="4" height="10" rx="1.5" fill="currentColor" opacity="0.25"/>
                <rect x="11" y="12" width="4" height="16" rx="1.5" fill="currentColor" opacity="0.5"/>
                <rect x="18" y="7" width="4" height="21" rx="1.5" fill="currentColor" opacity="0.75"/>
                <rect x="25" y="3" width="4" height="25" rx="1.5" fill="currentColor"/>
                <path d="M5 20L12 14L19 9L26 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <strong className="offer-problem-label">The Visibility Tax</strong>
              <p>You're spending on content that earns impressions, not pipeline. Followers without architecture cost you money every month.</p>
            </div>
            <div className="offer-problem-card offer-reveal">
              <span className="offer-problem-number" aria-hidden="true">02</span>
              <svg className="offer-problem-icon" aria-hidden="true" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M16 10v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 8l16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
              </svg>
              <strong className="offer-problem-label">The Credibility Gap</strong>
              <p>Great content without positioning strategy still fails to convert. Attention without trust infrastructure goes to waste.</p>
            </div>
            <div className="offer-problem-card offer-reveal">
              <span className="offer-problem-number" aria-hidden="true">03</span>
              <svg className="offer-problem-icon" aria-hidden="true" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 24C4 24 7 14 13 12C19 10 20 18 26 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 10l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="8" cy="22" r="2" fill="currentColor" opacity="0.4"/>
                <circle cx="16" cy="15" r="2" fill="currentColor" opacity="0.6"/>
                <circle cx="24" cy="12" r="2.5" fill="currentColor"/>
              </svg>
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
              <span>Spoken Wines — YouTube channel grew 10× with long-form hitting 30,000 views and short-form reaching 220,000.</span>
            </div>
            <div className="offer-stat-tile offer-reveal">
              <strong>$10K ARR</strong>
              <span>GradeWise AI — SaaS product built end-to-end from zero, live and generating recurring revenue within the engagement.</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Offer tracks — tab-based ── */}
      <div className="offer-tracks">
        <div className="section-inner">
          <div className="offer-tracks-intro offer-reveal">
            <p className="eyebrow">Choose Your Path</p>
            <h2>Two ways to work together.</h2>
          </div>

          {/* 4-column grid: 3 brand tiers + AI card */}
          <div className="tier-grid offer-reveal">
            {/* Tier 1 */}
            <article className="tier-card" aria-label="Authority Starter plan">
              <div className="tier-card-header">
                <span className="tier-badge">Starter</span>
                <h3>Authority Starter</h3>
                <div className="tier-price">
                  <span className="tier-from">from</span>
                  <strong>$1,500</strong>
                  <span className="tier-per">/mo</span>
                </div>
                <p className="tier-pitch">Consistent content engine to establish presence and start building qualified audience.</p>
              </div>
              <ul className="tier-features">
                <li>Monthly content strategy and calendar</li>
                <li>Platform-native short-form video editing</li>
                <li>2–3 posts per week across one channel</li>
                <li>Monthly performance review</li>
                <li>Async Slack support</li>
              </ul>
              <div className="tier-actions">
                <a
                  className="conversion-button tier-cta lemonsqueezy-button"
                  href="https://YOUR-STORE.lemonsqueezy.com/buy/PRODUCT-ID"
                  onClick={() => track("authority-starter-checkout", "checkout")}
                >
                  <span>Get started</span>
                  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
                </a>
                <a className="tier-secondary" href="/booking" onClick={() => track("authority-starter-call", "booking")}>
                  Book a call first
                </a>
              </div>
            </article>

            {/* Tier 2 */}
            <article className="tier-card tier-card-featured" aria-label="Brand Authority plan">
              <div className="tier-card-header">
                <span className="tier-badge tier-badge-featured">Most Popular</span>
                <h3>Brand Authority</h3>
                <div className="tier-price">
                  <span className="tier-from">from</span>
                  <strong>$3,000</strong>
                  <span className="tier-per">/mo</span>
                </div>
                <p className="tier-pitch">Full-stack brand system — positioning, multi-channel content, and community that converts to pipeline.</p>
              </div>
              <ul className="tier-features">
                <li>Positioning strategy and messaging framework</li>
                <li>Short-form and long-form video production</li>
                <li>Multi-channel publishing (YouTube, IG, LinkedIn)</li>
                <li>Community engagement and audience growth</li>
                <li>Bi-weekly strategy calls</li>
                <li>Priority async support</li>
              </ul>
              <div className="tier-actions">
                <a
                  className="conversion-button tier-cta lemonsqueezy-button"
                  href="https://YOUR-STORE.lemonsqueezy.com/buy/PRODUCT-ID"
                  onClick={() => track("brand-authority-checkout", "checkout")}
                >
                  <span>Get started</span>
                  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
                </a>
                <a className="tier-secondary" href="/booking" onClick={() => track("brand-authority-call", "booking")}>
                  Book a call first
                </a>
              </div>
            </article>

            {/* Tier 3 */}
            <article className="tier-card" aria-label="Full-Scale Operation plan">
              <div className="tier-card-header">
                <span className="tier-badge">Full Scale</span>
                <h3>Full-Scale Operation</h3>
                <div className="tier-price">
                  <span className="tier-from">from</span>
                  <strong>$5,000</strong>
                  <span className="tier-per">/mo</span>
                </div>
                <p className="tier-pitch">Entire growth infrastructure — brand, content, digital product, and AI-powered demand generation running together.</p>
              </div>
              <ul className="tier-features">
                <li>Everything in Brand Authority</li>
                <li>Web platform or digital product build</li>
                <li>AI-powered lead generation or outreach system</li>
                <li>Paid media strategy and creative</li>
                <li>Weekly strategy sessions</li>
                <li>Dedicated account management</li>
              </ul>
              <div className="tier-actions">
                <a
                  className="conversion-button tier-cta"
                  href="/booking"
                  onClick={() => track("full-scale-call", "booking")}
                >
                  <span>Book a strategy call</span>
                  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
                </a>
              </div>
            </article>

            {/* AI card — dark vertical */}
            <article className="tier-card tier-card-ai" aria-label="AI and Automation Systems">
              <div className="tier-card-header">
                <span className="tier-badge tier-badge-ai">Custom Build</span>
                <h3>AI &amp; Automation</h3>
                <div className="tier-price">
                  <span className="tier-from">from</span>
                  <strong>$3,000</strong>
                  <span className="tier-per">/project</span>
                </div>
                <p className="tier-pitch">Custom-scoped to your exact growth constraint — built once, runs forever. No templates, no shortcuts.</p>
              </div>
              <ul className="tier-features">
                <li>Cold outreach &amp; lead qualification automation</li>
                <li>SaaS product or internal AI tooling</li>
                <li>Conversion-optimised web platform</li>
                <li>CRM &amp; tool stack integration</li>
                <li>30-day post-launch support cycle</li>
                <li>Full source code ownership</li>
              </ul>
              <div className="tier-actions">
                <a
                  className="conversion-button tier-cta btn-primary-dark"
                  href="/booking"
                  onClick={() => track("ai-scoping-call", "booking")}
                >
                  <span>Book a scoping call</span>
                  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
                </a>
                <span className="tier-secondary" style={{ cursor: "default", textDecoration: "none" }}>
                  No commitment until we agree on scope
                </span>
              </div>
            </article>
          </div>
        </div>
      </div>

    </section>
  );
}
