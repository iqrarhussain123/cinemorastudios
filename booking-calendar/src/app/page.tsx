import { bookingConfig } from "@/lib/config";
import { BookingWidget } from "@/components/BookingWidget";

export default function BookingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-8">
      <BookingWidget config={bookingConfig} />
    </main>
  );
}
