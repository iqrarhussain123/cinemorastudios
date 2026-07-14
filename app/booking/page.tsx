import { bookingConfig } from "@/lib/booking/config";
import { BookingWidget } from "@/components/booking/BookingWidget";

export default function BookingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-page p-4 sm:p-8">
      <BookingWidget config={bookingConfig} />
    </main>
  );
}
