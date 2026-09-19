import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Cinemora Studios collects, uses, and protects personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page" id="main-content">
      <header className="legal-header">
        <Link className="legal-brand" href="/">Cinemora Studios</Link>
        <Link className="legal-home-link" href="/">Back to home</Link>
      </header>

      <article className="legal-document">
        <p className="legal-eyebrow">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Effective July 30, 2026</p>
        <p className="legal-intro">
          Cinemora Studios respects your privacy. This policy explains what information we collect, why we use it,
          and the choices available to you when you visit our website, contact us, or book a meeting through our
          scheduling service.
        </p>

        <section>
          <h2>1. Information we collect</h2>
          <p>We may collect information that you provide directly, including:</p>
          <ul>
            <li>Your name, email address, phone number, company details, and message.</li>
            <li>Meeting details you submit, such as your preferred time, notes, and time zone.</li>
            <li>Communications and project information you choose to share with us.</li>
          </ul>
          <p>
            We may also receive basic technical information such as device type, browser, referring page, and website
            usage data through our hosting and analytics providers.
          </p>
        </section>

        <section>
          <h2>2. Google Calendar data</h2>
          <p>
            Our booking service connects to the Google Calendar account authorized by Cinemora Studios. It uses Google
            Calendar data only to check busy and available times, prevent scheduling conflicts, create the meeting
            requested by a visitor, add the attendee, and generate meeting details such as a Google Meet link.
          </p>
          <p>
            We do not use Google Calendar data for advertising, profiling, credit decisions, or sale to third parties.
            We do not allow humans to read Google user data except when necessary for security, legal compliance,
            troubleshooting with the user's permission, or to provide and improve the booking feature.
          </p>
          <p>
            Cinemora Studios' use and transfer of information received from Google APIs complies with the Google API
            Services User Data Policy, including the Limited Use requirements.
          </p>
        </section>

        <section>
          <h2>3. How we use information</h2>
          <ul>
            <li>To provide, confirm, and manage bookings and requested services.</li>
            <li>To respond to enquiries and communicate about potential or active projects.</li>
            <li>To operate, secure, maintain, and improve our website and services.</li>
            <li>To meet legal, accounting, fraud-prevention, and regulatory obligations.</li>
          </ul>
        </section>

        <section>
          <h2>4. Sharing and service providers</h2>
          <p>
            We share information only when needed with service providers that support our operations, such as Google
            Calendar and Google Meet for scheduling, Vercel for website hosting, and email or communications providers.
            These providers process information under their own terms and privacy commitments. We may also disclose
            information when legally required or necessary to protect our rights, users, or services.
          </p>
          <p>We do not sell or rent personal information.</p>
        </section>

        <section>
          <h2>5. Retention and security</h2>
          <p>
            We retain personal information only for as long as reasonably necessary for the purposes described in this
            policy, including providing services, maintaining business records, and meeting legal obligations. Calendar
            events remain subject to the retention settings of the connected Google account. We use reasonable
            administrative and technical safeguards, but no method of storage or transmission is completely secure.
          </p>
        </section>

        <section>
          <h2>6. Your choices and rights</h2>
          <p>
            You may ask to access, correct, or delete personal information we hold about you, or object to certain uses,
            subject to applicable law. You may also revoke Google account access at any time through your Google Account
            permissions. To make a privacy or deletion request, email{" "}
            <a href="mailto:iqrar@cinemorastudios.agency">iqrar@cinemorastudios.agency</a>.
          </p>
        </section>

        <section>
          <h2>7. International processing and children</h2>
          <p>
            We operate from Pakistan and serve clients internationally, so information may be processed in countries
            other than your own. Our services are intended for businesses and adults and are not directed to children
            under 13.
          </p>
        </section>

        <section>
          <h2>8. Updates to this policy</h2>
          <p>
            We may update this policy as our services or legal obligations change. The effective date above shows when
            it was last revised. Material changes will be posted on this page.
          </p>
        </section>

        <section>
          <h2>9. Contact us</h2>
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
