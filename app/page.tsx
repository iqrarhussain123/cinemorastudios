import Image from "next/image";
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
};

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
    <main id="main-content">
      <SiteHeader />

      <div className="hero-overlap-stack">
        <div className="hero-scroll-stage">
          <HeroSection />
        </div>

        <section className="video-section" id="work">
          <div className="video-heading-band">
            <div className="video-heading-inner">
              <h2>See how attention becomes demand.</h2>
            </div>
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

      <div className="selected-work-stack-scope">
        <ImpactSection />
        <WorkCarousel />
      </div>
      <TestimonialsSection />
      <ProjectShowcase />

      <section className="conversion-cta" aria-labelledby="conversion-title">
        <div className="section-inner conversion-cta-inner">
          <p className="eyebrow">Ready for the next stage?</p>
          <h2 id="conversion-title">
            Views don&rsquo;t pay bills.
            <span> Community does.</span>
          </h2>
          <div className="conversion-cta-action">
            <p>We build the positioning, content, and systems that turn passive reach into community—and community into demand.</p>
            <a className="conversion-button" href="/booking">
              <span>Book a growth strategy call</span>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <FaqSection />

      <section className="about-section" id="contact">
        <div className="section-inner about-inner">
          <div className="about-copy">
            <p className="about-eyebrow">Founder-Led Growth Studio</p>
            <h2>
              The <em>mind</em> behind Cinemora.
            </h2>
            <p className="about-lead">
              Iqrar designs growth systems for founders, expert-led businesses,
              and real estate brands—connecting positioning, content, digital
              products, and AI operations so visibility becomes qualified
              pipeline.
            </p>
            <p>
              Every engagement connects strategy to execution. The result is a
              brand that looks credible, communicates clearly, and has the
              infrastructure to turn attention into measurable commercial
              outcomes.
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
              Senior attention, direct communication, and clear ownership from
              strategy through delivery.
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





