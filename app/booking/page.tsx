import { bookingConfig } from "@/lib/booking/config";
import { BookingWidget } from "@/components/booking/BookingWidget";

export default function BookingPage() {
  return (
    <main className="booking-page flex min-h-screen items-center justify-center p-4 sm:p-8">
      <BookingWidget config={bookingConfig} />
    </main>
  );
}
