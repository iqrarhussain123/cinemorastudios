import type { MetadataRoute } from "next";

const siteUrl = "https://www.cinemorastudios.agency";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot"], allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
