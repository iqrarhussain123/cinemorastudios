import Image from "next/image";
import { type BrandingService } from "@/components/branding-card";
import { BrandingShowcase } from "@/components/branding-showcase";
import { HeroSection } from "@/components/hero-section";
import { FaqSection } from "@/components/faq-section";
import { ImpactSection } from "@/components/impact-section";
import { LazyVideo } from "@/components/lazy-video";
import { LoadableImage } from "@/components/loadable-image";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ProjectShowcase, WorkCarousel } from "@/components/work-showcase";

const cloudinaryImages = {
  cinemoraLogo:
    "https://res.cloudinary.com/l7fgvttd/image/upload/v1783963296/cinemora/images/branding/cinemora-logo.png",
  team: {
    iqrarHussain:
      "https://res.cloudinary.com/l7fgvttd/image/upload/v1783963324/cinemora/images/team/iqrar-hussain.png",
    asfarButt:
      "https://res.cloudinary.com/l7fgvttd/image/upload/v1783963323/cinemora/images/team/asfar-butt.png",
  },
  heroSlides: {
    slide3:
      "https://res.cloudinary.com/l7fgvttd/image/upload/v1783963301/cinemora/images/hero/slides/slide3.png",
    slide4:
      "https://res.cloudinary.com/l7fgvttd/image/upload/v1783963302/cinemora/images/hero/slides/slide4.png",
    slide5:
      "https://res.cloudinary.com/l7fgvttd/image/upload/v1783966417/cinemora/images/hero/slides/slide5.png",
    slide6:
      "https://res.cloudinary.com/l7fgvttd/image/upload/v1783963309/cinemora/images/hero/slides/slide6.png",
    slide7:
      "https://res.cloudinary.com/l7fgvttd/image/upload/v1783963311/cinemora/images/hero/slides/slide7.png",
    slide8:
      "https://res.cloudinary.com/l7fgvttd/image/upload/v1783966424/cinemora/images/hero/slides/slide8.png",
  },
};

const brandingServices: BrandingService[] = [
  {
    date: "15/08/2024",
    title: "Brand Discovery Session",
    symbol: "◉",
    description:
      "Gain clarity on your strengths, values, and brand positioning.",
    imageSrc: cloudinaryImages.heroSlides.slide8,
  },
  {
    date: "19/12/2024",
    title: "Brand Coaching Program",
    symbol: "✦",
    description:
      "A deep-dive program to shape your story, image, and online presence.",
    imageSrc: cloudinaryImages.heroSlides.slide5,
  },
  {
    date: "30/12/2024",
    title: "LinkedIn & Social Profile Makeover",
    symbol: "@",
    description: "Optimize your digital footprint for visibility and impact.",
    imageSrc: cloudinaryImages.heroSlides.slide4,
  },
  {
    date: "27/04/2024",
    title: "Content Strategy & Visibility Coaching",
    symbol: "◌",
    description:
      "Learn how to create content that builds authority and trust.",
    imageSrc: cloudinaryImages.heroSlides.slide3,
  },
  {
    date: "04/05/2024",
    title: "Executive Thought Leadership",
    symbol: "◆",
    description:
      "Shape sharper points of view for founders, coaches, and consultants.",
    imageSrc: cloudinaryImages.heroSlides.slide7,
  },
  {
    date: "11/05/2024",
    title: "Podcast Growth Sprint",
    symbol: "◍",
    description:
      "Turn long-form conversations into short clips that build demand.",
    imageSrc: cloudinaryImages.heroSlides.slide8,
  },
  {
    date: "18/05/2024",
    title: "Founder Content System",
    symbol: "⌘",
    description:
      "Build a repeatable workflow for ideas, scripting, posting, and review.",
    imageSrc: cloudinaryImages.heroSlides.slide5,
  },
  {
    date: "25/05/2024",
    title: "Authority Positioning Audit",
    symbol: "◎",
    description:
      "Clarify your offer, audience, proof, and message before scaling content.",
    imageSrc: cloudinaryImages.heroSlides.slide6,
  },
  {
    date: "01/06/2024",
    title: "Short-Form Content Engine",
    symbol: "▶",
    description:
      "Create a weekly clip pipeline for Instagram, TikTok, YouTube, and LinkedIn.",
    imageSrc: cloudinaryImages.heroSlides.slide8,
  },
  {
    date: "08/06/2024",
    title: "LinkedIn Authority Builder",
    symbol: "in",
    description:
      "Improve profile clarity, posting cadence, and conversion-focused content.",
    imageSrc: cloudinaryImages.heroSlides.slide5,
  },
  {
    date: "15/06/2024",
    title: "Offer Messaging Workshop",
    symbol: "◇",
    description:
      "Translate expertise into clear offers people can understand and buy.",
    imageSrc: cloudinaryImages.heroSlides.slide4,
  },
  {
    date: "22/06/2024",
    title: "Audience Research Sprint",
    symbol: "⌖",
    description:
      "Map audience pains, buying triggers, objections, and content angles.",
    imageSrc: cloudinaryImages.heroSlides.slide3,
  },
  {
    date: "29/06/2024",
    title: "Personal Brand Visual Kit",
    symbol: "✣",
    description:
      "Set the visual direction for thumbnails, posts, reels, and lead magnets.",
    imageSrc: cloudinaryImages.heroSlides.slide7,
  },
  {
    date: "06/07/2024",
    title: "Launch Content Plan",
    symbol: "↗",
    description:
      "Plan launch content that builds attention before the offer goes live.",
    imageSrc: cloudinaryImages.heroSlides.slide8,
  },
  {
    date: "13/07/2024",
    title: "Client Conversion Funnel",
    symbol: "⇄",
    description:
      "Connect content, calls-to-action, lead capture, and follow-up into one flow.",
    imageSrc: cloudinaryImages.heroSlides.slide5,
  },
  {
    date: "20/07/2024",
    title: "Retention Content Strategy",
    symbol: "∞",
    description:
      "Keep clients engaged with proof, education, updates, and authority signals.",
    imageSrc: cloudinaryImages.heroSlides.slide6,
  },
];

const teamMembers = [
  {
    name: "Iqrar Hussain",
    role: "Founder & CEO",
    imageSrc: cloudinaryImages.team.iqrarHussain,
  },
  {
    name: "Asfar Butt",
    role: "Project Manager",
    imageSrc: cloudinaryImages.team.asfarButt,
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
              <LazyVideo
                className="vsl-video"
                autoPlay
                loop
                deliveryWidth={1280}
                muteOnExit
                muted
                playsInline
                preload="metadata"
                src="https://res.cloudinary.com/l7fgvttd/video/upload/v1783963886/cinemora/videos/vsl/vsl-video.mp4"
                toggleMuteOnClick
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
            <p className="about-eyebrow">Founder-Led Growth Studio</p>
            <h2>
              The <em>mind</em> behind Cinemora.
            </h2>
            <p className="about-lead">
              Iqrar builds growth architecture for coaches, founders, and real
              estate brands—connecting positioning, content, lead generation,
              and AI-powered systems so attention becomes qualified
              conversations.
            </p>
            <p>
              Cinemora brings creative strategy and buyer-focused systems under
              one roof. The result is work designed to build authority, create
              demand, and move the right people toward action.
            </p>

            <div className="about-pillars" aria-label="Cinemora approach">
              <span>Positioning</span>
              <span>Content Systems</span>
              <span>AI Operations</span>
            </div>

            <a className="about-book-button" href="/booking">
              <span>Book a strategy call</span>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="about-image-placeholder">
            <div className="about-image-frame">
              <LoadableImage
                alt="Iqrar Hussain, founder of Cinemora Studios"
                className="about-image"
                fill
                sizes="(max-width: 760px) 100vw, 44rem"
                src="/logo.jpg"
              />
            </div>
            <div className="about-image-caption">
              <div>
                <span>Founder &amp; Creative Director</span>
                <strong>Iqrar Hussain</strong>
              </div>
              <a
                aria-label="View Iqrar Hussain on LinkedIn"
                href="https://www.linkedin.com/in/cinemorastudios"
                rel="noreferrer"
                target="_blank"
              >
                <span className="linkedin-mark" aria-hidden="true">in</span>
                <span>LinkedIn</span>
              </a>
            </div>
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
            {teamMembers.map(({ name, role, imageSrc }) => (
              <article className="team-card" key={name}>
                <div className="team-image-placeholder" aria-hidden="true" style={{ position: "relative", overflow: "hidden" }}>
                  <LoadableImage src={imageSrc} alt={name} fill style={{ objectFit: "cover" }} className="team-member-img" />
                  <div className="team-logo-overlay">
                    <Image src={cloudinaryImages.cinemoraLogo} alt="Cinemora Logo" width={88} height={88} className="team-overlay-img" />
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





