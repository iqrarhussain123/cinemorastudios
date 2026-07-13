import Image from "next/image";
import { type BrandingService } from "@/components/branding-card";
import { BrandingShowcase } from "@/components/branding-showcase";
import { HeroSection } from "@/components/hero-section";
import { FaqSection } from "@/components/faq-section";
import { ImpactSection } from "@/components/impact-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ProjectShowcase, WorkCarousel } from "@/components/work-showcase";

const brandingServices: BrandingService[] = [
  {
    date: "15/08/2024",
    title: "Brand Discovery Session",
    description:
      "Gain clarity on your strengths, values, and brand positioning.",
    imageSrc: "/images/hero/slides/slide2.png",
  },
  {
    date: "19/12/2024",
    title: "Brand Coaching Program",
    description:
      "A deep-dive program to shape your story, image, and online presence.",
    imageSrc: "/images/hero/slides/slide1.png",
  },
  {
    date: "30/12/2024",
    title: "LinkedIn & Social Profile Makeover",
    description: "Optimize your digital footprint for visibility and impact.",
    imageSrc: "/images/hero/slides/slide4.png",
  },
  {
    date: "27/04/2024",
    title: "Content Strategy & Visibility Coaching",
    description:
      "Learn how to create content that builds authority and trust.",
    imageSrc: "/images/hero/slides/slide3.png",
  },
  {
    date: "04/05/2024",
    title: "Executive Thought Leadership",
    description:
      "Shape sharper points of view for founders, coaches, and consultants.",
    imageSrc: "/images/hero/slides/slide7.png",
  },
  {
    date: "11/05/2024",
    title: "Podcast Growth Sprint",
    description:
      "Turn long-form conversations into short clips that build demand.",
    imageSrc: "/images/hero/slides/slide8.png",
  },
  {
    date: "18/05/2024",
    title: "Founder Content System",
    description:
      "Build a repeatable workflow for ideas, scripting, posting, and review.",
    imageSrc: "/images/hero/slides/slide5.png",
  },
  {
    date: "25/05/2024",
    title: "Authority Positioning Audit",
    description:
      "Clarify your offer, audience, proof, and message before scaling content.",
    imageSrc: "/images/hero/slides/slide6.png",
  },
  {
    date: "01/06/2024",
    title: "Short-Form Content Engine",
    description:
      "Create a weekly clip pipeline for Instagram, TikTok, YouTube, and LinkedIn.",
    imageSrc: "/images/hero/slides/slide2.png",
  },
  {
    date: "08/06/2024",
    title: "LinkedIn Authority Builder",
    description:
      "Improve profile clarity, posting cadence, and conversion-focused content.",
    imageSrc: "/images/hero/slides/slide1.png",
  },
  {
    date: "15/06/2024",
    title: "Offer Messaging Workshop",
    description:
      "Translate expertise into clear offers people can understand and buy.",
    imageSrc: "/images/hero/slides/slide4.png",
  },
  {
    date: "22/06/2024",
    title: "Audience Research Sprint",
    description:
      "Map audience pains, buying triggers, objections, and content angles.",
    imageSrc: "/images/hero/slides/slide3.png",
  },
  {
    date: "29/06/2024",
    title: "Personal Brand Visual Kit",
    description:
      "Set the visual direction for thumbnails, posts, reels, and lead magnets.",
    imageSrc: "/images/hero/slides/slide7.png",
  },
  {
    date: "06/07/2024",
    title: "Launch Content Plan",
    description:
      "Plan launch content that builds attention before the offer goes live.",
    imageSrc: "/images/hero/slides/slide8.png",
  },
  {
    date: "13/07/2024",
    title: "Client Conversion Funnel",
    description:
      "Connect content, calls-to-action, lead capture, and follow-up into one flow.",
    imageSrc: "/images/hero/slides/slide5.png",
  },
  {
    date: "20/07/2024",
    title: "Retention Content Strategy",
    description:
      "Keep clients engaged with proof, education, updates, and authority signals.",
    imageSrc: "/images/hero/slides/slide6.png",
  },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <div className="hero-overlap-stack">
        <div className="hero-scroll-stage">
          <HeroSection />
        </div>

        <section className="video-section" id="work">
          <div className="video-heading-band">
            <h2>Is this you ?</h2>
          </div>
          <div className="section-inner">
            <div className="vsl-video-frame">
              <video
                className="vsl-video"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                src="/videos/vsl/VSL_Video.mp4"
              />
            </div>
          </div>
        </section>
      </div>

      <section className="branding-section" id="case-studies">
        <div className="branding-inner">
          <div className="section-intro">
            <div>
              <p className="eyebrow">Our Services</p>
              <h2>
                Personal <span>Branding Services</span>
                <br />
                Tailored for You
              </h2>
            </div>
            <p className="intro-copy">
              A range of 1:1 and group coaching packages to help you elevate
              your personal brand.
            </p>
          </div>

          <BrandingShowcase services={brandingServices} />

        </div>
      </section>

      <ImpactSection />
      <WorkCarousel />
      <TestimonialsSection />
      <ProjectShowcase />

      <FaqSection />

      <section className="about-section" id="contact">
        <div className="section-inner about-inner">
          <div className="about-copy">
            <h2>
              The <em>Minds</em> Behind Cinemora
            </h2>
            <div className="about-image-placeholder" role="img" aria-label="About Cinemora visual">
              <span>About Cinemora</span>
            </div>
            <blockquote>
              “We don&apos;t just edit videos. We engineer attention.”
            </blockquote>
            <p>
              Iqrar isn&apos;t just a founder; he&apos;s the strategic architect
              behind Cinemora&apos;s most viral campaigns. With a background that
              fuses data-driven marketing with high-end cinematic production, he
              recognized early on that the future of brand authority lies in
              video.
            </p>
            <p>
              He built Cinemora Studios to bridge the gap between “aesthetic” and
              “effective”. Under his leadership, the agency has helped elite
              coaches and real estate moguls generate millions in pipeline
              revenue, proving that premium content is the ultimate leverage in
              the digital age.
            </p>

            <div className="about-stats">
              <div>
                <strong>$4M+</strong>
                <span>Revenue Generated</span>
              </div>
              <div>
                <strong>50M+</strong>
                <span>Views Managed</span>
              </div>
            </div>

            <a className="text-link" href="mailto:hello@cinemorastudios.com">
              Work with Iqrar <span aria-hidden="true">→</span>
            </a>
          </div>

        </div>
      </section>

      <section className="team-section" aria-labelledby="team-title">
        <div className="section-inner">
          <div className="team-heading">
            <p className="eyebrow">Team</p>
            <h2 id="team-title">The faces behind Cinemora</h2>
            <p>
              There are no layers here. The people who understand your brand are
              the people building it, start to finish.
            </p>
          </div>

          <div className="team-grid">
            {[
              ["Iqrar Hussain", "Founder & CEO"],
              ["Asfar Butt", "Project Manager"],
            ].map(([name, role]) => (
              <article className="team-card" key={name}>
                <div className="team-image-placeholder" aria-hidden="true" style={{ position: "relative", overflow: "hidden" }}>
                  <Image src={`/images/team/${name.toLowerCase().replace(' ', '_')}.png`} alt={name} fill style={{ objectFit: "cover" }} className="team-member-img" />
                  <div className="team-logo-overlay">
                    <Image src="/images/branding/cinemora-logo.png" alt="Cinemora Logo" width={88} height={88} className="team-overlay-img" />
                  </div>
                </div>
                <div>
                  <strong>{name}</strong>
                  <span>{role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}





