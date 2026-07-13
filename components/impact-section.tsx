const impactStats = [
  ["Successful Projects", "200+"],
  ["Client Satisfaction", "95%"],
  ["Years of Experience", "10+"],
];

export function ImpactSection() {
  return (
    <section className="impact-section" aria-labelledby="impact-title">
      <div className="impact-bg-placeholder">
        <div className="section-inner impact-inner">
          <div className="impact-intro">
            <h2 id="impact-title">
              We&apos;re a full-service digital agency combining creativity,
              technology, <span>and marketing expertise to help ambitious brands
              grow faster and smarter.</span>
            </h2>
          </div>

          <div className="impact-stats">
            {impactStats.map(([label, value]) => (
              <div className="impact-stat-card" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
            <a className="impact-cta-card" href="#contact">
              <span aria-hidden="true">↗</span>
              <strong>More About Us</strong>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
