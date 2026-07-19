"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
import { ScrollCounter } from "@/components/scroll-counter";
import { RollingText } from "@/components/rolling-link";

const impactStats = [
  ["Successful Projects", "200+"],
  ["Client Satisfaction", "95%"],
  ["Years of Experience", "10+"],
];

const workflow = [
  {
    name: "Attention",
    icon: "◎",
    label: "Get seen",
    title: "Earn the right attention.",
    description: "Positioning, creative direction, and platform-native content put the brand in front of the people most likely to buy.",
    output: "Qualified visibility",
  },
  {
    name: "Authority",
    icon: "✦",
    label: "Build trust",
    title: "Turn visibility into belief.",
    description: "Consistent ideas, proof, and premium execution make the brand easier to trust, remember, and recommend.",
    output: "Category credibility",
  },
  {
    name: "Demand",
    icon: "↗",
    label: "Create intent",
    title: "Make the market want more.",
    description: "Offers, campaigns, and conversion journeys connect the brand story to a clear commercial reason to act.",
    output: "Buyer intent",
  },
  {
    name: "Pipeline",
    icon: "◆",
    label: "Capture growth",
    title: "Convert demand into pipeline.",
    description: "Web products, outreach, automation, and AI operations capture interest and move qualified buyers toward a conversation.",
    output: "Measurable opportunities",
  },
];

export function ImpactSection() {
  const [activeStage, setActiveStage] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let frameId = 0;

    const updateFlow = () => {
      frameId = 0;
      const bounds = canvas.getBoundingClientRect();
      const travel = Math.max(bounds.height * 0.8, 1);
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.82 - bounds.top) / travel));
      canvas.style.setProperty("--workflow-progress", progress.toFixed(3));
      setActiveStage(Math.min(workflow.length - 1, Math.floor((progress * (workflow.length - 1)) + 0.001)));
    };
    const queueUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateFlow);
    };

    updateFlow();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);
    return () => {
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section className="impact-section" id="services" aria-label="Cinemora growth system">
      <div className="impact-bg-placeholder">
        <div className="section-inner impact-inner">
          <div className="impact-intro">
            <p className="eyebrow">Brand, Content, Web &amp; AI Systems</p>
            <div className="impact-mobile-summary">
              <span>Attention. Authority. Demand.</span>
              <h2 id="impact-mobile-title">We turn visibility into qualified pipeline.</h2>
              <p>Strategy earns attention. Content builds trust. Web and AI systems convert that trust into measurable growth.</p>
            </div>
            <div className="growth-workflow">
              <div className="workflow-toolbar">
                <div>
                  <span className="workflow-status"><i /> Live growth system</span>
                  <h2 id="impact-title">From attention to pipeline.</h2>
                </div>
                <p>Select a node to inspect how the system moves buyers forward.</p>
              </div>

              <div className="workflow-canvas" ref={canvasRef}>
                <div className="workflow-nodes" role="tablist" aria-label="Cinemora growth workflow">
                  {workflow.map((item, index) => (
                    <Fragment key={item.name}>
                      <button
                        aria-selected={activeStage === index}
                        className={`workflow-node${activeStage === index ? " is-active" : ""}`}
                        onClick={() => setActiveStage(index)}
                        onFocus={() => setActiveStage(index)}
                        role="tab"
                        type="button"
                      >
                        <span className="workflow-node-icon" aria-hidden="true">{item.icon}</span>
                        <span className="workflow-node-copy">
                          <small>{String(index + 1).padStart(2, "0")} / {item.label}</small>
                          <strong>{item.name}</strong>
                        </span>
                      </button>
                      {index < workflow.length - 1 && (
                        <span
                          className="workflow-connector"
                          style={{ "--connector-index": index } as CSSProperties}
                          aria-hidden="true"
                        />
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
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
