"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { LazyVideo } from "@/components/lazy-video";

const projects = [
  {
    title: "Apex Outreach",
    meta: "SaaS Product · Web Dev · AI Systems",
    description:
      "A full-stack SaaS platform that automates B2B outbound sales — from audience targeting to booked calls — without manual prospecting.",
    features: [
      "AI-powered outreach sequences that run autonomously end-to-end",
      "Smart audience builder with filter-based ICP targeting",
      "Multi-account connection for scaled sending across profiles",
      "Conversion-optimized landing page built for SaaS sign-up flow",
    ],
    color: "#0f3f3a",
    accent: "#d9e8cf",
    videoSrc: "https://res.cloudinary.com/l7fgvttd/video/upload/v1783963327/cinemora/videos/apex-outreach.mp4",
  },
  {
    title: "GradeWise AI",
    meta: "SaaS Product · EdTech · AI Systems",
    description:
      "An AI grading and feedback platform built for university students — predicts grades, delivers rubric-based analysis, and flags plagiarism before submission.",
    features: [
      "Instant AI grade prediction from assignment uploads",
      "Rubric-aware feedback engine aligned to academic standards",
      "Built-in plagiarism detection before final submission",
      "Conversational AI chatbot for real-time assignment guidance",
    ],
    color: "#d7b9c8",
    accent: "#6f2d52",
    videoSrc: "https://res.cloudinary.com/l7fgvttd/video/upload/v1783963870/cinemora/videos/video-project-4.mp4",
  },
  {
    title: "Spoken Wines",
    meta: "Web Dev · Brand · Media Commerce",
    description:
      "A Framer-built media and commerce platform that tells winery stories through cinematic video content and connects global audiences to regional wine purchasing partners.",
    features: [
      "Immersive video-first storytelling architecture per winery",
      "Global affiliate commerce layer routing to regional wine shops",
      "Editorial content system for ongoing winery partner publishing",
      "Smooth, cinematic UI built entirely in Framer for performance",
    ],
    color: "#b8c9df",
    accent: "#12385f",
    videoSrc: "https://res.cloudinary.com/l7fgvttd/video/upload/v1783963867/cinemora/videos/spoken-wines.mp4",
  },
  {
    title: "Collegare Studio",
    meta: "Web Dev · Creator Economy · Education",
    description:
      "A Kajabi-powered creator business academy that gives content creators the systems, templates, and live coaching to build scalable income from their content.",
    features: [
      "Full course and workshop storefront built on Kajabi",
      "Integrated community and live cohort infrastructure",
      "Plug-and-play business templates for creator monetization",
      "Clean, conversion-focused design targeting early-stage creators",
    ],
    color: "#f0d7a6",
    accent: "#714616",
    videoSrc: "https://res.cloudinary.com/l7fgvttd/video/upload/v1783963331/cinemora/videos/collegare.mp4",
  },
];

const featuredProjects = [projects[1], projects[0], projects[2], projects[3]];

type WorkCategory = "reels" | "long-form" | "real-estate" | "social-media-ads";

type WorkCarouselItem = {
  src: string;
  title: string;
};

const workTabs: Array<{ id: WorkCategory; label: string }> = [
  { id: "reels", label: "Reels" },
  { id: "long-form", label: "Long Form" },
  { id: "real-estate", label: "Real Estate" },
  { id: "social-media-ads", label: "Social Media Ads" },
];

const carouselVideo = (src: string, title: string): WorkCarouselItem => ({ src, title });

const workCarouselProjects: Record<WorkCategory, WorkCarouselItem[]> = {
  reels: [
    carouselVideo(
      "https://res.cloudinary.com/l7fgvttd/video/upload/v1783963557/cinemora/videos/reels/let-me-start-with-the-truth-for-25-years-i-built-brands-and-experiences-for-other-people-the-uk-government-amazon-abb-good-work-behind-the-scenes-never-my-name-on-the-door-then-i-became-the-investor.mp4",
      "Let me start with the truth",
    ),
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783963603/cinemora/videos/reels/recent-work.mp4", "Recent work"),
    carouselVideo(
      "https://res.cloudinary.com/l7fgvttd/video/upload/v1783966660/cinemora/videos/reels/reacting-to-a-female-entrepreneur-doing-millions.mp4",
      "Female entrepreneur reaction",
    ),
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783966635/cinemora/videos/reels/gym-s-v02.mp4", "Gym's V02"),
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783963524/cinemora/videos/reels/2.mp4", "Reel 2"),
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783963519/cinemora/videos/reels/1.mp4", "Reel 1"),
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783963567/cinemora/videos/reels/p2-v02.mp4", "P2 V02"),
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783966665/cinemora/videos/reels/smiling-reel.mp4", "Smiling reel"),
  ],
  "long-form": [
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783963333/cinemora/videos/long_form/d7rovsisfex299xgtllq.mp4", "Long form edit"),
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783966444/cinemora/videos/long_form/husband-wife-dynamic-horizontal.mp4", "Husband-wife dynamic"),
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783963365/cinemora/videos/long_form/rate-this-video-out-of-10.mp4", "Rate this video out of 10"),
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783963377/cinemora/videos/long_form/trial-inal.mp4", "Trial final"),
  ],
  "real-estate": [
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783963382/cinemora/videos/real_estate/800k-house.mp4", "$800k House"),
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783963412/cinemora/videos/real_estate/2-11-william-st-shellharbour.mp4", "2-11 William St, Shellharbour"),
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783966503/cinemora/videos/real_estate/36-carr-parade-unanderra.mp4", "36 Carr Parade, Unanderra"),
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783966523/cinemora/videos/real_estate/60a-princes-hwy-thirroul.mp4", "60A Princes Hwy, Thirroul"),
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783963481/cinemora/videos/real_estate/coastal-love.mp4", "Coastal Love"),
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783963510/cinemora/videos/real_estate/shellharbour-coming-soon.mp4", "Shellharbour coming soon"),
  ],
  "social-media-ads": [
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783966673/cinemora/videos/socia_media_ads/basic-video-3.mp4", "Basic Video 3"),
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783963654/cinemora/videos/socia_media_ads/dimo-macaron.mp4", "DIMO Macaron"),
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783966709/cinemora/videos/socia_media_ads/final-draft-v1.mp4", "Final Draft V1"),
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783966723/cinemora/videos/socia_media_ads/final-draft-vid-2.mp4", "Final Draft Vid 2"),
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783963743/cinemora/videos/socia_media_ads/oou7hd9etqlty5qujjfc.mp4", "Social media ad"),
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783966742/cinemora/videos/socia_media_ads/toneface.mp4", "TONEFACE"),
    carouselVideo("https://res.cloudinary.com/l7fgvttd/video/upload/v1783963862/cinemora/videos/socia_media_ads/ybbslwc0a0hn6gpqq7ea.mp4", "Social ad edit"),
  ],
};

function CarouselVideo({ item }: { item: WorkCarouselItem }) {
  return (
    <div className="work-card-media work-card-media-drive">
      <LazyVideo
        aria-label={item.title}
        autoPlay
        lazyRootMargin="360px"
        loop
        muted
        playsInline
        preload="metadata"
        restartOnHover
        src={item.src}
      />
    </div>
  );
}

export function WorkCarousel() {
  return (
    <section className="work-showcase" aria-labelledby="work-carousel-title">
      <div className="section-inner">
        {workTabs.map((tab, index) => (
          <input
            className={`work-tab-input work-category-${tab.id}`}
            defaultChecked={index === 0}
            id={`work-tab-${tab.id}`}
            key={tab.id}
            name="work-category"
            type="radio"
          />
        ))}

        <div className="work-filters" aria-label="Work filters">
          {workTabs.map((tab) => (
            <label
              className="work-filter-label"
              htmlFor={`work-tab-${tab.id}`}
              key={tab.id}
            >
              {tab.label}
            </label>
          ))}
        </div>

        {workTabs.map((tab) => {
          const carouselTrack = [
            ...workCarouselProjects[tab.id],
            ...workCarouselProjects[tab.id],
          ];

          return (
            <div
              className={`work-carousel work-carousel-panel work-carousel-${tab.id}`}
              aria-label={`${tab.label} videos`}
              key={tab.id}
            >
              <div className="work-carousel-track">
                {carouselTrack.map((item, index) => (
                  <article
                    className={`work-carousel-card work-carousel-card-${tab.id}`}
                    key={`${item.src}-${index}`}
                  >
                    <CarouselVideo item={item} />
                  </article>
                ))}
              </div>
            </div>
          );
        })}
          </div>
    </section>
  );
}

export function ProjectShowcase() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProject = featuredProjects[activeProjectIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveProjectIndex((currentIndex) => (
        (currentIndex + 1) % featuredProjects.length
      ));
    }, 9000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="work-showcase work-showcase-project" aria-label="Project showcase">
      <div className="section-inner">
        <div className="project-preview-switcher">
          {featuredProjects.map((project, index) => (
            <input
              className="project-dot-input"
              checked={activeProjectIndex === index}
              id={`project-dot-${index + 1}`}
              name="featured-project"
              onChange={() => setActiveProjectIndex(index)}
              type="radio"
              key={project.title}
            />
          ))}

          <div className="section-intro project-section-intro">
            <div>
              <p className="eyebrow">Featured Work</p>
              <h2>Projects We Shipped</h2>
            </div>
            <p className="intro-copy">SaaS Products / Web Dev / AI Systems</p>
          </div>

          <div className="project-preview-stage">
            <div className="project-preview-slides">
              <article
                className="project-preview-layout is-active"
                key={activeProject.title}
              >
                <div className="project-preview-media">
                  <div
                    className="website-preview-placeholder"
                    style={
                      {
                        "--preview-bg": activeProject.color,
                        "--preview-accent": activeProject.accent,
                      } as CSSProperties
                    }
                  >
                    {activeProject.videoSrc ? (
                      <LazyVideo
                        aria-label={`${activeProject.title} website preview video`}
                        autoPlay
                        lazyRootMargin="520px"
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        src={activeProject.videoSrc}
                      />
                    ) : (
                      <span>{activeProject.meta}</span>
                    )}
                  </div>
                </div>
                <div className="project-preview-copy">
                  <span className="project-preview-meta">{activeProject.meta}</span>
                  <h2>{activeProject.title}</h2>
                  <p>{activeProject.description}</p>
                  <ul>
                    {activeProject.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </div>
          <div className="project-dots" aria-label="Choose project">
            {featuredProjects.map((project, index) => (
              <label
                aria-label={`Show ${project.title}`}
                className={activeProjectIndex === index ? "is-active" : undefined}
                htmlFor={`project-dot-${index + 1}`}
                key={project.title}
                onClick={() => setActiveProjectIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
