"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

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
    videoSrc: "/videos/apex-outreach.mp4",
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
    videoSrc: "/videos/video-project-4.mp4",
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
    videoSrc: "/videos/spoken-wines.mp4",
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
    videoSrc: "/videos/collegare.mp4",
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
      "/videos/reels/Let me start with the truth.  For 25 years I built brands and experiences for other people.   The UK government. Amazon. ABB. Good work, behind the scenes, never my name on the door.  Then I became the investor .mp4",
      "Let me start with the truth",
    ),
    carouselVideo("/videos/reels/Recent work.mp4", "Recent work"),
    carouselVideo(
      "/videos/reels/Reacting To A Female Entrepreneur Doing Millions.mp4",
      "Female entrepreneur reaction",
    ),
    carouselVideo("/videos/reels/Gym_s V02.mp4", "Gym's V02"),
    carouselVideo("/videos/reels/2.mp4", "Reel 2"),
    carouselVideo("/videos/reels/1.mp4", "Reel 1"),
    carouselVideo("/videos/reels/P2 V02.mp4", "P2 V02"),
    carouselVideo("/videos/reels/😊.mp4", "Smiling reel"),
  ],
  "long-form": [
    carouselVideo("/videos/long_form/d7rovsisfex299xgtllq.mp4", "Long form edit"),
    carouselVideo("/videos/long_form/Husband-Wife dynamic horizontal.mp4", "Husband-wife dynamic"),
    carouselVideo("/videos/long_form/Rate this video out of 10.mp4", "Rate this video out of 10"),
    carouselVideo("/videos/long_form/trial inal.mp4", "Trial final"),
  ],
  "real-estate": [
    carouselVideo("/videos/real_estate/$800k House.mp4", "$800k House"),
    carouselVideo("/videos/real_estate/2-11 William St, Shellharbour.mp4", "2-11 William St, Shellharbour"),
    carouselVideo("/videos/real_estate/36 Carr Parade, Unanderra.mp4", "36 Carr Parade, Unanderra"),
    carouselVideo("/videos/real_estate/60A Princes Hwy, Thirroul.mp4", "60A Princes Hwy, Thirroul"),
    carouselVideo("/videos/real_estate/Coastal Love.mp4", "Coastal Love"),
    carouselVideo("/videos/real_estate/SHELLHARBOUR COMING SOON.mp4", "Shellharbour coming soon"),
  ],
  "social-media-ads": [
    carouselVideo("/videos/socia_media_ads/Basic Video 3 .mp4", "Basic Video 3"),
    carouselVideo("/videos/socia_media_ads/DIMO Macaron.mp4", "DIMO Macaron"),
    carouselVideo("/videos/socia_media_ads/Final Draft V1.mp4", "Final Draft V1"),
    carouselVideo("/videos/socia_media_ads/Final Draft Vid 2.mp4", "Final Draft Vid 2"),
    carouselVideo("/videos/socia_media_ads/oou7hd9etqlty5qujjfc.mp4", "Social media ad"),
    carouselVideo("/videos/socia_media_ads/TONEFACE.mp4", "TONEFACE"),
    carouselVideo("/videos/socia_media_ads/ybbslwc0a0hn6gpqq7ea.mp4", "Social ad edit"),
  ],
};

function CarouselVideo({ item }: { item: WorkCarouselItem }) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    const video = videoRef.current;

    if (!media || !video) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play();
        } else {
          video.pause();
        }
      },
      { rootMargin: "240px", threshold: 0.08 },
    );

    observer.observe(media);

    return () => observer.disconnect();
  }, []);

  const restartVideo = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.currentTime = 0;
    void video.play();
  };

  return (
    <div
      className="work-card-media work-card-media-drive"
      ref={mediaRef}
      onFocus={restartVideo}
      onMouseEnter={restartVideo}
    >
      <video
        aria-label={item.title}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        ref={videoRef}
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
                      <video
                        aria-label={`${activeProject.title} website preview video`}
                        autoPlay
                        loop
                        muted
                        playsInline
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
