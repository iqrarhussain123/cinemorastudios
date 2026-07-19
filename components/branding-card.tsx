"use client";

export interface BrandingService {
  date: string;
  title: string;
  description: string;
  imageSrc?: string;
  symbol?: string;
}

interface BrandingCardProps {
  service: BrandingService;
  isFeatured?: boolean;
}

export function BrandingCard({ service, isFeatured = false }: BrandingCardProps) {
  return (
    <article className={`branding-card ${isFeatured ? "is-featured" : ""}`}>
      <div className="card-meta">
        <time>{service.date}</time>
        <span className="card-arrow" aria-hidden="true">
          &rarr;
        </span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <div className="card-image-placeholder" aria-hidden="true">
        <span className="card-service-symbol">{service.symbol ?? "✦"}</span>
        <span className="card-service-index">Cinemora / Service</span>
      </div>
    </article>
  );
}
