import type { Metadata } from "next";
import { bookingConfig } from "@/lib/booking/config";
import "./booking.css";

const bookingTitle = `${bookingConfig.meetingTitle} - ${bookingConfig.companyName}`;

export const metadata: Metadata = {
  title: bookingTitle,
  description: bookingConfig.meetingDescription,
  alternates: {
    canonical: "/booking",
  },
  openGraph: {
    url: "/booking",
    title: bookingTitle,
    description: bookingConfig.meetingDescription,
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
    title: bookingTitle,
    description: bookingConfig.meetingDescription,
    images: ["/cinemora-social-card.png"],
  },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
