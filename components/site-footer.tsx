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
];

const phoneNumbers = [
  {
    display: "+92 3360599017",
    whatsAppUrl:
      "https://wa.me/923360599017?text=Hey%20Iqrar%2C%20I%20need%20help%20with%20your%20services.",
  },
  {
    display: "+1 928 393 6284",
    whatsAppUrl:
      "https://wa.me/19283936284?text=Hey%20Iqrar%2C%20I%20need%20help%20with%20your%20services.",
  },
];

const rawalpindiMapsUrl =
  "https://maps.app.goo.gl/9iioJQzHgsBy5DeS9?g_st=awb";

const rawalpindiMapsEmbedUrl =
  "https://www.google.com/maps?q=Office%20No.%20203%2C%202nd%20Floor%2C%20Jenan%20Abn%20Ul%20Fazl%20Plaza%2C%20Shamsabad%2C%20Rawalpindi%2046000%2C%20Pakistan&output=embed";

const dallasMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=2105%20Commerce%20St%2C%20Dallas%2C%20TX%2075201%2C%20United%20States";

const dallasMapsEmbedUrl =
  "https://www.google.com/maps?q=2105%20Commerce%20St%2C%20Dallas%2C%20TX%2075201%2C%20United%20States&output=embed";

const locations = [
  {
    href: rawalpindiMapsUrl,
    embedUrl: rawalpindiMapsEmbedUrl,
    ariaLabel:
      "Office No. 203, 2nd Floor, Jenan Abn Ul Fazl Plaza, Shamsabad, Rawalpindi. View on Google Maps",
    label: "Office 203, Jenan Abn Ul Fazl Plaza, Shamsabad",
    preview: "Shamsabad, Rawalpindi",
  },
  {
    href: dallasMapsUrl,
    embedUrl: dallasMapsEmbedUrl,
    ariaLabel: "2105 Commerce St, Dallas, TX 75201, United States. View on Google Maps",
    label: "2105 Commerce St, Dallas, TX 75201",
    preview: "Dallas, Texas",
  },
];

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

function SocialLinks() {
  return (
    <div className="footer-social-links" aria-label="Cinemora social profiles">
      <a className="footer-social-item" href="https://www.linkedin.com/company/cinemora-studios" target="_blank" rel="noopener noreferrer" aria-label="Cinemora Studios on LinkedIn">
        <span className="footer-linkedin-mark" aria-hidden="true">in</span>
        <span className="footer-social-preview" aria-hidden="true">
          <strong>LinkedIn</strong>
          <small>Cinemora Studios</small>
          <em>View company profile &rarr;</em>
        </span>
      </a>
      <a className="footer-social-item" href="https://www.instagram.com/cinemorastudios/" target="_blank" rel="noopener noreferrer" aria-label="Cinemora Studios on Instagram">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle className="footer-social-dot" cx="17.4" cy="6.7" r="0.8" />
        </svg>
        <span className="footer-social-preview" aria-hidden="true">
          <strong>Instagram</strong>
          <small>@cinemorastudios</small>
          <em>View studio profile &rarr;</em>
        </span>
      </a>
      <a className="footer-social-item" href="https://x.com/IqrarHussa16285" target="_blank" rel="noopener noreferrer" aria-label="Iqrar Hussain on X">
        <span className="footer-x-mark" aria-hidden="true">X</span>
        <span className="footer-social-preview" aria-hidden="true">
          <strong>X</strong>
          <small>@IqrarHussa16285</small>
          <em>View Iqrar on X &rarr;</em>
        </span>
      </a>
    </div>
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
                {column.title === "Company" ? <SocialLinks /> : null}
              </div>
            ))}
            <div className="footer-column footer-contact">
              <h3>Contact</h3>
              {contactLinks.map((link) => (
                <a className="footer-contact-link" href={link.href} key={link.href}>
                  <ContactIcon type="email" />
                  <span>{link.label}</span>
                </a>
              ))}
              {phoneNumbers.map((phone) => (
                <div className="footer-whatsapp-wrap" key={phone.display}>
                  <a
                    className="footer-contact-link footer-whatsapp-link"
                    href={phone.whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Message Iqrar on WhatsApp at ${phone.display}`}
                  >
                    <ContactIcon type="phone" />
                    <span>{phone.display}</span>
                  </a>
                  <div className="footer-whatsapp-preview" aria-hidden="true">
                    <div className="footer-whatsapp-brand">
                      <span>WA</span>
                      <div>
                        <strong>Chat with Iqrar</strong>
                        <small>Typically replies on WhatsApp</small>
                      </div>
                    </div>
                    <div className="footer-whatsapp-message">
                      Hey Iqrar, I need help with your services.
                    </div>
                    <span className="footer-whatsapp-action">Continue in WhatsApp &rarr;</span>
                  </div>
                </div>
              ))}
              {locations.map((location) => (
                <div className="footer-address-wrap" key={location.label}>
                <a
                  className="footer-address-link"
                  href={location.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={location.ariaLabel}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 21s7-6.1 7-13a7 7 0 1 0-14 0c0 6.9 7 13 7 13Z" />
                    <circle cx="12" cy="8" r="2.4" />
                  </svg>
                  <span>{location.label}</span>
                </a>
                <div className="footer-map-preview" aria-hidden="true">
                  <div className="footer-map-brand">
                    <Image
                      src="/apple-touch-icon.png"
                      alt="Cinemora Studios location"
                      width={28}
                      height={28}
                    />
                    <div>
                      <strong>Cinemora Studios</strong>
                      <small>{location.preview}</small>
                    </div>
                  </div>
                  <iframe
                    src={location.embedUrl}
                    title={`${location.preview} location map`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    tabIndex={-1}
                  />
                  <span>Open location on Google Maps ↗</span>
                </div>
                </div>
              ))}
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

        <div className="post-footer-legal" aria-label="Legal links">
          <div className="post-footer-legal-primary">
            <span>&copy; {new Date().getFullYear()} All Rights Reserved, Cinemora Studios</span>
            <a href="/privacy-policy">Privacy Policy</a>
          </div>
          <nav className="post-footer-legal-right">
            <a href="/terms-of-service">Terms of Service</a>
            <span aria-hidden="true">/</span>
            <a href="/booking">Book a Call</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
