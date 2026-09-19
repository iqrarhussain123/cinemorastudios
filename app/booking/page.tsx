import Link from "next/link";
import { bookingConfig } from "@/lib/booking/config";
import { BookingWidget } from "@/components/booking/BookingWidget";

export default function BookingPage() {
  return (
    <main className="booking-page flex min-h-screen flex-col items-center justify-center gap-6 p-4 sm:p-8">
      <BookingWidget config={bookingConfig} className="booking-widget-wide" />
      <div className="post-footer-legal booking-legal" aria-label="Legal links">
        <div className="post-footer-legal-primary">
          <span>&copy; {new Date().getFullYear()} All Rights Reserved, Cinemora Studios</span>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
        <nav className="post-footer-legal-right">
          <Link href="/terms-of-service">Terms of Service</Link>
          <span aria-hidden="true">/</span>
          <Link href="/booking">Book a Call</Link>
        </nav>
      </div>
    </main>
  );
}
