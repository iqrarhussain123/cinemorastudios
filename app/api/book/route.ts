import { NextRequest, NextResponse } from "next/server";
import { createBookingEvent } from "@/lib/booking/google/calendar";
import { sendBookingNotificationEmail } from "@/lib/booking/alert";

interface BookRequestBody {
  startISO?: string;
  name?: string;
  email?: string;
  notes?: string;
  attendeeTimezone?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: BookRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { startISO, name, email, notes, attendeeTimezone } = body;
  if (!startISO || !name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "startISO, name, and email are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "That doesn't look like a valid email address." }, { status: 400 });
  }
  if (name.trim().length > 100 || email.trim().length > 254 || (notes?.length ?? 0) > 2000) {
    return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 });
  }

  try {
    const result = await createBookingEvent({
      startISO,
      attendeeName: name.trim(),
      attendeeEmail: email.trim(),
      notes: notes?.trim(),
    });

    sendBookingNotificationEmail({
      eventId: result.eventId,
      attendeeName: name.trim(),
      attendeeEmail: email.trim(),
      startISO,
      meetLink: result.meetLink,
      notes: notes?.trim(),
      attendeeTimezone,
    }).catch((err) => console.error("booking notification email failed", err));

    return NextResponse.json({ meetLink: result.meetLink, eventId: result.eventId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not create the booking.";
    console.error("booking failed", err);
    return NextResponse.json({ error: message }, { status: 409 });
  }
}

