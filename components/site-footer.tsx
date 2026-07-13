const footerColumns = [
  {
    title: "Company",
    links: ["About us", "Careers", "Blog", "Contact"],
  },
  {
    title: "Product",
    links: ["Features", "Pricing", "Demo", "Integrations"],
  },
  {
    title: "Resources",
    links: ["Help Center", "Case Studies", "API Application Guide"],
  },
];

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
                  <a href="#top" key={link}>
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>

          <div className="footer-cta">
            <a href="#contact" aria-label="Start a project">
              +
            </a>
            <p>
              Cinemora creates brands,
              <br />
              videos, and digital systems
              <br />
              turning clicks into clients.
            </p>
          </div>
        </div>

        <div className="footer-legal">
          <a href="#top">Privacy Policy</a>
          <a href="#top">Cookie Policy</a>
          <a href="#top">Terms &amp; Conditions</a>
        </div>
      </div>
    </footer>
  );
}
