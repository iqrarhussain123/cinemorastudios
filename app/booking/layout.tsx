import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Strategy Call",
  description:
    "Book a strategy call with Cinemora Studios to discuss personal branding, content systems, web development, or AI automation.",
  alternates: { canonical: "/booking" },
  openGraph: {
    title: "Book a Strategy Call | Cinemora Studios",
    description: "Choose a time to discuss your brand, growth system, or digital product with Cinemora Studios.",
    url: "/booking",
  },
};

export default function BookingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
