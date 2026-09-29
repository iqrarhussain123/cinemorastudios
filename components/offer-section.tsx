"use client";

import { useEffect, useRef, useState } from "react";
import "./offer-section.css";

type OfferTab = "brand" | "ai";

export function OfferSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<OfferTab>("brand");

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

          {/* Tab selector */}
          <div className="offer-path-selector offer-reveal" role="tablist" aria-label="Service paths">
            <button
              role="tab"
              aria-selected={activeTab === "brand"}
              aria-controls="panel-brand"
              id="tab-brand"
              type="button"
              className={`offer-path-tab ${activeTab === "brand" ? "is-active" : ""}`}
              onClick={() => setActiveTab("brand")}
            >
              Build my personal brand
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "ai"}
              aria-controls="panel-ai"
              id="tab-ai"
              type="button"
              className={`offer-path-tab ${activeTab === "ai" ? "is-active" : ""}`}
              onClick={() => setActiveTab("ai")}
            >
              Automate my business with AI
            </button>
          </div>

          {/* Brand panel — 3-tier grid */}
          <div
            id="panel-brand"
            role="tabpanel"
            aria-labelledby="tab-brand"
            hidden={activeTab !== "brand"}
            className="tier-grid"
          >
            {/* Tier 1 */}
            <article className="tier-card offer-reveal" aria-label="Authority Starter plan">
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
            <article className="tier-card tier-card-featured offer-reveal" aria-label="Brand Authority plan">
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
            <article className="tier-card offer-reveal" aria-label="Full-Scale Operation plan">
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
                  className="conversion-button tier-cta btn-primary"
                  href="/booking"
                  onClick={() => track("full-scale-call", "booking")}
                >
                  <span>Book a strategy call</span>
                  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
                </a>
              </div>
            </article>
          </div>

          {/* AI panel — dark full-width */}
          <div
            id="panel-ai"
            role="tabpanel"
            aria-labelledby="tab-ai"
            hidden={activeTab !== "ai"}
            className="offer-ai-panel offer-reveal"
          >
            <div className="offer-ai-copy">
              <span className="offer-ai-tag">Custom Build</span>
              <h3>AI &amp; Automation Systems</h3>
              <p className="offer-ai-pitch">Every AI engagement is custom-scoped to your exact growth constraint — built once, runs forever. No templates, no shortcuts.</p>
              <ul className="offer-ai-features">
                <li>End-to-end cold outreach and lead qualification automation</li>
                <li>SaaS product or internal AI tooling built from scratch</li>
                <li>Conversion-optimised web platform with integrated analytics</li>
                <li>CRM, calendar, and existing tool stack integration</li>
                <li>30-day post-launch support and iteration cycle</li>
                <li>Full asset and source code ownership on handover</li>
              </ul>
            </div>
            <div className="offer-ai-action">
              <p className="offer-ai-price-note">Engagements typically start at <strong>$3,000</strong> — scoped per project.</p>
              <a
                className="conversion-button btn-primary-dark"
                href="/booking"
                onClick={() => track("ai-scoping-call", "booking")}
              >
                <span>Book a scoping call</span>
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
              </a>
              <p className="offer-ai-note">Every engagement starts with a strategy call — no commitment until we agree on scope and fit.</p>
            </div>
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
            <div className="offer-slots offer-reveal" aria-label="Available client slots">
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
                onClick={() => track("close-book-call", "booking")}
              >
                <span>Book a growth strategy call</span>
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
              </a>
              <a
                className="offer-close-secondary lemonsqueezy-button"
                href="https://YOUR-STORE.lemonsqueezy.com/buy/PRODUCT-ID"
                onClick={() => track("close-deposit", "checkout")}
              >
                Skip the call — pay deposit to start
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
