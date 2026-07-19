"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  imageVariant?: "photo" | "logo" | "logoLight" | "brandFill" | "wordmark";
  brandText?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Cinemora helped both me and my wife, Steph, build stronger personal brands and gain more than 15,000 followers. Over 18 months, Success School grew from around $10K–$20K per month to reaching $100K months. Their content and positioning work played a major role in that growth.",
    name: "Tim Frey",
    role: "Founder, Success School",
    description: "Personal branding · Content strategy · Audience growth",
    imageSrc: "/images/clients/Tim Frey.png",
    imageAlt: "Tim Frey, founder of Success School",
  },
  {
    quote:
      "Cinemora became an extension of my podcast studio. They managed social content across our client projects, handled the complete post-production workflow, and supported clients with day-to-day content strategy. Their work helped us improve delivery, stay consistent, and build stronger systems for podcast growth.",
    name: "Alycia Champan",
    role: "Podcast Studio Founder",
    description: "Post-production · Social media management · Podcast growth",
    imageSrc: "/images/clients/Alycia.jpg",
    imageAlt: "Alycia Champan, podcast studio founder",
  },
  {
    quote:
      "Working with Cinemora helped us grow the Spoken Wines YouTube channel from 1,000 to 10,000 subscribers. Our long-form videos reached 30,000 views, while short-form content hit 220,000 views—giving the brand real momentum and strengthening our PR efforts.",
    name: "Jan",
    role: "Founder, Spoken Wines",
    description: "Web development · Media commerce · Content ecosystem",
    imageSrc: "/images/clients/Jan De Weerd.jpg",
    imageAlt: "Jan De Weerd, founder of Spoken Wines",
  },
  {
    quote:
      "Cinemora edited all of our social listing-shoot videos and shaped them into consistent, sales-focused content. Every property was presented more effectively across social media, and the videos helped us generate solid sales while building a stronger, more recognizable presence online.",
    name: "Hodderborg",
    role: "Real Estate Agency",
    description: "Property video editing · Social content · Sales support",
    imageSrc: "/images/clients/Hodderborg.png",
    imageAlt: "Hodderborg",
    imageVariant: "logo",
  },
  {
    quote:
      "Cinemora built an end-to-end cold outreach system that manages targeting, sequencing, follow-up, and deliverability without letting opportunities fall through the cracks. The system keeps campaigns from being flagged and has produced conversion rates ranging from 20% to 45%.",
    name: "Apex Outreach",
    role: "AI Outreach Platform",
    description: "AI systems · Cold outreach automation · Lead conversion",
    brandText: "A\nAPEX OUTREACH",
  },
  {
    quote:
      "Cinemora built Collegare Talent into a polished digital platform for our relationship-first talent management model. The experience gives creators, managers, and brand partners a clear way to understand our approach and connect with the right opportunities.",
    name: "Skylar Alexis",
    role: "Co-Founder, Collegare Talent",
    description: "Web development · Talent platform · Creator systems",
    imageSrc: "/images/clients/Skylar-Alexis.jpg",
    imageAlt: "Skylar Alexis, co-founder of Collegare Talent",
  },
  {
    quote:
      "Cinemora brought our family pottery studio online with a website that makes it easier to share our story, present handmade collections, sell work, and promote pottery classes. The experience connects decades of craftsmanship with a modern customer journey.",
    name: "Otis Pottery",
    role: "Family-Owned Pottery Studio",
    description: "Ecommerce web development · Product discovery · Class bookings",
    imageSrc: "/images/clients/Otis-Pottery.png",
    imageAlt: "Otis Pottery studio and logo",
    imageVariant: "brandFill",
  },
  {
    quote:
      "Cinemora helped turn GradeWise AI into a complete student-facing SaaS experience, connecting AI grade prediction, rubric-based feedback, plagiarism checks, and assignment guidance in one clear product. The platform has grown to generate $10K in annual recurring revenue.",
    name: "GradeWise AI",
    role: "AI EdTech Platform",
    description: "SaaS product · AI grading · Web development · $10K ARR",
    brandText: "GradeWise",
    imageVariant: "wordmark",
  },
];

const resultPattern = /(\$?\d[\d,]*(?:\.\d+)?(?:K)?(?:%|\+)?)/gi;
const resultTokenPattern = /^\$?\d[\d,]*(?:\.\d+)?(?:K)?(?:%|\+)?$/i;

function emphasizeResults(quote: string) {
  return quote.split(resultPattern).map((part, index) =>
    resultTokenPattern.test(part) ? (
      <strong className="testimonial-result" key={`${part}-${index}`}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const testimonial = testimonials[activeIndex];
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="section-inner testimonials-inner">
        <div className="testimonials-heading">
          <p className="eyebrow">Client Feedback</p>
          <h2 id="testimonials-title">What Clients Say</h2>
        </div>

        <div
          className="testimonial-card"
          aria-live="polite"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div className="testimonial-slides">
                <article className="testimonial-slide testimonial-slide-active" key={testimonial.name}>
                  <div>
                    <div className="testimonial-copy">
                      <span className="quote-mark" aria-hidden="true">
                        &ldquo;
                      </span>
                      <blockquote>{emphasizeResults(testimonial.quote)}</blockquote>
                    </div>

                    <div className="testimonial-controls" aria-label="Testimonial progress">
                      <div className="testimonial-position" aria-label={`Testimonial ${activeIndex + 1} of ${testimonials.length}`}>
                        <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
                        <span aria-hidden="true" />
                        <small>{String(testimonials.length).padStart(2, "0")}</small>
                      </div>
                    </div>
                  </div>

                  <div className="testimonial-person-card">
                    <div className={`testimonial-image-placeholder${testimonial.brandText ? " testimonial-image-placeholder-brand" : ""}${testimonial.imageVariant === "wordmark" ? " testimonial-image-placeholder-wordmark" : ""}`}>
                      {testimonial.imageSrc ? (
                        <Image
                          className={`testimonial-client-image${testimonial.imageVariant === "logo" ? " testimonial-client-logo" : ""}${testimonial.imageVariant === "logoLight" ? " testimonial-client-logo-light" : ""}${testimonial.imageVariant === "brandFill" ? " testimonial-client-brand-fill" : ""}`}
                          src={testimonial.imageSrc}
                          alt={testimonial.imageAlt ?? testimonial.name}
                          fill
                          sizes="(max-width: 760px) 58vw, 420px"
                        />
                      ) : testimonial.brandText ? (
                        <strong className={`testimonial-brand-text${testimonial.imageVariant === "wordmark" ? " testimonial-brand-wordmark" : ""}`}>
                          {testimonial.brandText.split("\n").map((line) => (
                            <span key={line}>{line}</span>
                          ))}
                        </strong>
                      ) : (
                        <span>Client Image</span>
                      )}
                    </div>
                    <div className="testimonial-author">
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.role}</span>
                      <small>{testimonial.description}</small>
                    </div>
                  </div>
                </article>
          </div>
        </div>
      </div>
    </section>
  );
}
