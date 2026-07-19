import type { MetadataRoute } from "next";

const siteUrl = "https://www.cinemorastudios.agency";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-19");

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/booking`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
