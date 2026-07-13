"use client";

import Image from "next/image";

export interface BrandingService {
  date: string;
  title: string;
  description: string;
  imageSrc?: string;
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
        {service.imageSrc ? (
          <Image
            className="card-image"
            src={service.imageSrc}
            alt=""
            fill
            sizes="(max-width: 760px) 100vw, 25vw"
          />
        ) : null}
      </div>
    </article>
  );
}
