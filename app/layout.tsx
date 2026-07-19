import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ScrollProgress } from "@/components/scroll-progress";
import { SectionReveal } from "@/components/section-reveal";
import "./globals.css";

const manrope = Manrope({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-manrope",
});

const mapsUrl = "https://maps.app.goo.gl/9iioJQzHgsBy5DeS9?g_st=awb";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.cinemorastudios.agency/#website",
      url: "https://www.cinemorastudios.agency/",
      name: "Cinemora Studios",
      inLanguage: "en",
      publisher: { "@id": "https://www.cinemorastudios.agency/#business" },
    },
    {
      "@type": ["ProfessionalService", "Organization"],
      "@id": "https://www.cinemorastudios.agency/#business",
      name: "Cinemora Studios",
      alternateName: ["Cinemora", "Cinemora Studio"],
      url: "https://www.cinemorastudios.agency/",
      logo: "https://www.cinemorastudios.agency/android-chrome-512x512.png",
      image: "https://www.cinemorastudios.agency/cinemora-social-card.png",
      description:
        "Founder-led creative growth studio building personal brands, content systems, websites, and AI operations.",
      foundingDate: "2024",
      founder: { "@id": "https://www.cinemorastudios.agency/#iqrar-hussain" },
      email: "iqrar@cinemorastudios.agency",
      telephone: "+92-336-0599017",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Office No. 203, 2nd Floor, Jenan Abn Ul Fazl Plaza, Shamsabad",
        addressLocality: "Rawalpindi",
        postalCode: "46000",
        addressCountry: "PK",
      },
      areaServed: ["Pakistan", "United States", "Worldwide"],
      hasMap: mapsUrl,
      sameAs: [
        mapsUrl,
        "https://www.linkedin.com/in/cinemorastudios",
        "https://www.linkedin.com/company/cinemora-studios",
      ],
      knowsAbout: [
        "Personal branding",
        "Content strategy",
        "Video production",
        "Lead generation",
        "Web development",
        "AI business systems",
      ],
      mentions: [
        { "@type": "Organization", name: "Ray White", url: "https://www.raywhite.com/" },
        { "@type": "Organization", name: "ThriveWorks360", url: "https://thriveworks360.com/home", sameAs: "https://www.linkedin.com/company/thriveworks360" },
        { "@type": "Organization", name: "Success School", url: "https://www.successschool.io/home" },
        { "@type": "Person", name: "Tim Frey", sameAs: "https://www.linkedin.com/in/timfrey", worksFor: { "@type": "Organization", name: "Success School" } },
        { "@type": "Organization", name: "Spoken Wines", url: "https://spokenwines.com/" },
        { "@type": "Organization", name: "Zendor Properties", url: "https://www.zendorproperties.ae/", sameAs: "https://www.linkedin.com/company/zendorproperties" },
        { "@type": "Person", name: "Skylar Alexis", sameAs: "https://www.linkedin.com/in/skylaralexis" },
        { "@type": "Organization", name: "Hodder Borg", url: "https://hodderborg.com.au/" },
        { "@type": "Organization", name: "Otis Pottery", url: "https://otispottery.net/" },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://www.cinemorastudios.agency/#iqrar-hussain",
      name: "Iqrar Hussain",
      jobTitle: "Founder and Creative Director",
      worksFor: { "@id": "https://www.cinemorastudios.agency/#business" },
      url: "https://www.cinemorastudios.agency/#contact",
      image: "https://www.cinemorastudios.agency/logo.jpg",
      sameAs: ["https://www.linkedin.com/in/cinemorastudios"],
    },
    {
      "@type": "Service",
      "@id": "https://www.cinemorastudios.agency/#services",
      name: "Brand Growth, Content, Web Development and AI Systems",
      provider: { "@id": "https://www.cinemorastudios.agency/#business" },
      areaServed: "Worldwide",
      serviceType: [
        "Personal Branding",
        "Content Strategy",
        "Video Production",
        "Web Development",
        "AI Automation",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.cinemorastudios.agency/#faqs",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who will actually be working on our project?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Cinemora leads strategy and creative direction directly, with selected specialists supporting production, design, and delivery when the project scope needs it.",
          },
        },
        {
          "@type": "Question",
          name: "How do you communicate and manage work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We use clear milestones, regular check-ins, and one shared communication channel so decisions, feedback, and progress stay visible.",
          },
        },
        {
          "@type": "Question",
          name: "What do you need to start working together?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A clear goal, access to relevant brand materials, and an initial discovery conversation are enough to shape the first plan.",
          },
        },
        {
          "@type": "Question",
          name: "What happens after launch?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We can support refinement, optimization, and ongoing creative work after the first launch or campaign goes live.",
          },
        },
        {
          "@type": "Question",
          name: "Can you handle branding, design and development?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Engagements can cover strategy, branding, design, content, and implementation as one connected process.",
          },
        },
        {
          "@type": "Question",
          name: "What is the project investment?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Investment depends on scope, timeline, and support level. We provide a clear proposal before work begins.",
          },
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cinemorastudios.agency"),
  title: {
    default: "Cinemora Studios | Brand, Content, Web & AI Growth Systems",
    template: "%s | Cinemora Studios",
  },
  description:
    "Cinemora Studios is a founder-led growth studio building authority, demand, and qualified pipeline through brand strategy, content, web products, and AI systems.",
  keywords: [
    "Cinemora Studios",
    "Cinemora Studio",
    "Cinemora",
    "personal branding agency",
    "content strategy agency",
    "video production Rawalpindi",
    "AI automation agency",
    "web development agency",
  ],
  authors: [{ name: "Iqrar Hussain", url: "https://www.linkedin.com/in/cinemorastudios" }],
  creator: "Iqrar Hussain",
  publisher: "Cinemora Studios",
  category: "Marketing Services",
  applicationName: "Cinemora Studios",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Cinemora Studios",
    title: "Cinemora Studios | Build Authority. Create Demand.",
    description: "Founder-led brand, content, web, and AI systems engineered to turn attention into qualified pipeline.",
    images: [
      {
        url: "/cinemora-social-card.png",
        width: 1200,
        height: 630,
        alt: "Cinemora Studios logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cinemora Studios | Build Authority. Create Demand.",
    description: "Founder-led brand, content, web, and AI systems engineered to turn attention into qualified pipeline.",
    images: ["/cinemora-social-card.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <ScrollProgress />
        <SectionReveal />
        {children}
      </body>
    </html>
  );
}
