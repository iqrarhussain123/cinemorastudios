import type { MetadataRoute } from "next";

const siteUrl = "https://www.cinemorastudios.agency";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "GoogleOther",
          "Applebot",
          "Applebot-Extended",
          "Amazonbot",
          "CCBot",
          "cohere-ai",
          "Meta-ExternalAgent",
          "Bytespider",
          "DuckAssistBot",
          "Diffbot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
