import type { Metadata } from "next";
import { bookingConfig } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${bookingConfig.meetingTitle} — ${bookingConfig.companyName}`,
  description: bookingConfig.meetingDescription,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
