import type { Metadata } from "next";
import { bookingConfig } from "@/lib/booking/config";
import "./booking.css";

export const metadata: Metadata = {
  title: `${bookingConfig.meetingTitle} — ${bookingConfig.companyName}`,
  description: bookingConfig.meetingDescription,
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
