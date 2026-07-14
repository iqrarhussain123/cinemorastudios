import type { Metadata } from "next";
import { ScrollProgress } from "@/components/scroll-progress";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cinemorastudios.agency"),
  title: {
    default: "Cinemora Studios",
    template: "%s | Cinemora Studios",
  },
  description: "We turn attention into clients.",
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
    title: "Cinemora Studios",
    description: "We turn attention into clients.",
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
    title: "Cinemora Studios",
    description: "We turn attention into clients.",
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
      <body>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
