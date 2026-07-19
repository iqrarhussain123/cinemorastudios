import Image from "next/image";
import { RollingText } from "@/components/rolling-link";

const footerColumns = [
  {
    title: "Company",
    links: [
      { href: "#services", label: "Services" },
      { href: "#case-studies", label: "Selected Work" },
      { href: "#contact", label: "About the Founder" },
      { href: "/booking", label: "Book a Call" },
    ],
  },
];

const contactLinks = [
  {
    href: "mailto:iqrar@cinemorastudios.agency",
    label: "iqrar@cinemorastudios.agency",
  },
  {
    href: "mailto:iqrarworksatcinemora@gmail.com",
    label: "iqrarworksatcinemora@gmail.com",
  },
  {
    href: "tel:+923360599017",
    label: "+92 3360599017",
  },
];

const mapsUrl =
  "https://maps.app.goo.gl/9iioJQzHgsBy5DeS9?g_st=awb";

const mapsEmbedUrl =
  "https://www.google.com/maps?q=Office%20No.%20203%2C%202nd%20Floor%2C%20Jenan%20Abn%20Ul%20Fazl%20Plaza%2C%20Shamsabad%2C%20Rawalpindi%2046000%2C%20Pakistan&output=embed";

function ContactIcon({ type }: { type: "email" | "phone" }) {
  if (type === "phone") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.1 3.5 5.4 4.8c-.9.4-1.3 1.4-1 2.3 2 5.9 6.6 10.5 12.5 12.5.9.3 1.9-.1 2.3-1l1.3-2.7-4.2-2-1.1 1.7c-2.9-1.3-5.5-3.9-6.8-6.8l1.7-1.1-2-4.2Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-wordmark">Cinemora Studios</div>

        <div className="footer-main">
          <div className="footer-columns">
            {footerColumns.map((column) => (
              <div className="footer-column" key={column.title}>
                <h3>{column.title}</h3>
                {column.links.map((link) => (
                  <a className="rolling-trigger" href={link.href} key={link.href} aria-label={link.label}>
                    <RollingText label={link.label} />
                  </a>
                ))}
              </div>
            ))}
            <div className="footer-column footer-contact">
              <h3>Contact</h3>
              {contactLinks.map((link) => (
                <a className="footer-contact-link" href={link.href} key={link.href}>
                  <ContactIcon type={link.href.startsWith("tel:") ? "phone" : "email"} />
                  <span>{link.label}</span>
                </a>
              ))}
              <div className="footer-address-wrap">
                <a
                  className="footer-address-link"
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Office No. 203, 2nd Floor, Jenan Abn Ul Fazl Plaza, Shamsabad, Rawalpindi. View on Google Maps"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 21s7-6.1 7-13a7 7 0 1 0-14 0c0 6.9 7 13 7 13Z" />
                    <circle cx="12" cy="8" r="2.4" />
                  </svg>
                  <span>
                    Office 203, Jenan Abn Ul Fazl Plaza, Shamsabad
                  </span>
                </a>
                <div className="footer-map-preview" aria-hidden="true">
                  <div className="footer-map-brand">
                    <Image
                      src="/apple-touch-icon.png"
                      alt=""
                      width={28}
                      height={28}
                    />
                    <div>
                      <strong>Cinemora Studios</strong>
                      <small>Shamsabad, Rawalpindi</small>
                    </div>
                  </div>
                  <iframe
                    src={mapsEmbedUrl}
                    title="Cinemora Studios location map"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    tabIndex={-1}
                  />
                  <span>Open location on Google Maps ↗</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-cta">
            <a href="/booking" aria-label="Start a project">
              +
            </a>
            <p>
              Strategy, creative, and systems
              <br />
              built to earn attention
              <br />
              and convert it into demand.
            </p>
          </div>
        </div>

        <div className="footer-legal">
          <span>© {new Date().getFullYear()} Cinemora Studios</span>
          <a className="rolling-trigger" href="https://www.linkedin.com/company/cinemora-studios" target="_blank" rel="noopener noreferrer" aria-label="Cinemora Studios on LinkedIn"><RollingText label="LinkedIn" /></a>
          <a className="rolling-trigger" href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Cinemora Studios on Google Maps"><RollingText label="Google Maps" /></a>
        </div>
      </div>
    </footer>
  );
}
