import type { Metadata } from "next";
import "./booking.css";

export const metadata: Metadata = {
  title: "Book a Growth Strategy Call",
  description:
    "Book a focused 30-minute growth strategy call with Iqrar Hussain, founder of Cinemora Studios.",
  alternates: { canonical: "/booking" },
  openGraph: {
    title: "Book a Growth Strategy Call | Cinemora Studios",
    description: "Choose a time to discuss the positioning, content, web, or AI system required to reach your next growth goal.",
    url: "/booking",
  },
};

export default function BookingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
