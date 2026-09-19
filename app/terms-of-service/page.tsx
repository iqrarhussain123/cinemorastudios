import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the Cinemora Studios website and services.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfServicePage() {
  return (
    <main className="legal-page" id="main-content">
      <header className="legal-header">
        <Link className="legal-brand" href="/">Cinemora Studios</Link>
        <Link className="legal-home-link" href="/">Back to home</Link>
      </header>

      <article className="legal-document">
        <p className="legal-eyebrow">Legal</p>
        <h1>Terms of Service</h1>
        <p className="legal-updated">Effective July 30, 2026</p>
        <p className="legal-intro">
          These Terms of Service govern your use of the Cinemora Studios website, booking tools, and related services.
          By using this website or submitting a booking, you agree to these terms.
        </p>

        <section>
          <h2>1. Website and services</h2>
          <p>
            Cinemora Studios provides brand strategy, content, web development, creative production, and AI systems
            services. Website information is provided for general informational and business-enquiry purposes. A project
            begins only after both parties agree to a separate proposal, statement of work, contract, or written
            confirmation.
          </p>
        </section>

        <section>
          <h2>2. Booking meetings</h2>
          <p>
            Our scheduling tool lets you request an available meeting time. You agree to provide accurate contact
            information and use the tool only for legitimate business purposes. A calendar confirmation does not create
            a client relationship, guarantee availability for services, or commit either party to a project.
          </p>
          <p>
            If you need to cancel or reschedule, please contact us as early as reasonably possible. We may cancel or
            reschedule meetings when operationally necessary.
          </p>
        </section>

        <section>
          <h2>3. Acceptable use</h2>
          <p>You must not:</p>
          <ul>
            <li>Use the website or booking service unlawfully, fraudulently, or abusively.</li>
            <li>Attempt unauthorized access, interfere with security, or disrupt the service.</li>
            <li>Submit malware, automated spam, misleading information, or harmful content.</li>
            <li>Copy, scrape, republish, or exploit site content except as permitted by law.</li>
          </ul>
        </section>

        <section>
          <h2>4. Intellectual property</h2>
          <p>
            Unless otherwise stated, the website's design, text, graphics, branding, media, and other content belong to
            Cinemora Studios or its licensors and are protected by applicable intellectual-property laws. Client-project
            ownership and licences are governed by the applicable project agreement.
          </p>
        </section>

        <section>
          <h2>5. Third-party services</h2>
          <p>
            The website may use or link to services operated by third parties, including Google, Vercel, Cloudinary,
            social platforms, and communications providers. We do not control third-party services and are not
            responsible for their availability, content, or practices. Your use of them may be governed by separate
            terms.
          </p>
        </section>

        <section>
          <h2>6. Disclaimers</h2>
          <p>
            The website and booking service are provided on an "as available" basis. We make no guarantee that the
            website will always be uninterrupted, error-free, or suitable for a particular purpose. Portfolio examples
            and general statements do not guarantee specific commercial, marketing, financial, or business results.
          </p>
        </section>

        <section>
          <h2>7. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Cinemora Studios will not be liable for indirect, incidental,
            special, consequential, or lost-profit damages arising from use of this website or its booking tools. Our
            total liability relating to the website will not exceed the amount you paid us specifically for the affected
            website service, if any.
          </p>
        </section>

        <section>
          <h2>8. Privacy</h2>
          <p>
            Our <Link href="/privacy-policy">Privacy Policy</Link> explains how we collect, use, and protect personal
            information and forms part of these terms.
          </p>
        </section>

        <section>
          <h2>9. Changes and governing law</h2>
          <p>
            We may update these terms by posting a revised version here. Continued use after an update means you accept
            the revised terms. These terms are governed by the laws of Pakistan, and disputes will be subject to the
            competent courts of Rawalpindi, Pakistan, unless applicable consumer law requires otherwise.
          </p>
        </section>

        <section>
          <h2>10. Contact</h2>
          <address>
            Cinemora Studios
            <br />
            Office 203, Jenan Abn Ul Fazl Plaza, Shamsabad
            <br />
            Rawalpindi 46000, Pakistan
            <br />
            <a href="mailto:iqrar@cinemorastudios.agency">iqrar@cinemorastudios.agency</a>
          </address>
        </section>
      </article>

      <footer className="post-footer-legal legal-footer" aria-label="Legal links">
        <div className="post-footer-legal-primary">
          <span>&copy; {new Date().getFullYear()} All Rights Reserved, Cinemora Studios</span>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
        <nav className="post-footer-legal-right">
          <Link href="/terms-of-service">Terms of Service</Link>
          <span aria-hidden="true">/</span>
          <Link href="/booking">Book a Call</Link>
        </nav>
      </footer>
    </main>
  );
}
