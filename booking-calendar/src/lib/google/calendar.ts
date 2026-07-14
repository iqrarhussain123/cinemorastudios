import { google } from "googleapis";
import { DateTime, Interval } from "luxon";
import { randomUUID } from "node:crypto";
import { getGoogleAuthClient } from "./auth";
import { bookingConfig } from "../config";

export interface BusyInterval {
  start: string;
  end: string;
}

/** Busy blocks on the connected calendar between two ISO instants (UTC). */
export async function getBusyIntervals(timeMinISO: string, timeMaxISO: string): Promise<BusyInterval[]> {
  const calendar = google.calendar({ version: "v3", auth: getGoogleAuthClient() });
  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMinISO,
      timeMax: timeMaxISO,
      items: [{ id: bookingConfig.calendarId }],
    },
  });
  const busy = res.data.calendars?.[bookingConfig.calendarId]?.busy ?? [];
  return busy
    .filter((b): b is { start: string; end: string } => Boolean(b.start && b.end))
    .map((b) => ({ start: b.start, end: b.end }));
}

/**
 * Candidate slot start times for a single calendar day, in the host's configured working
 * hours/timezone, minus anything that overlaps a busy interval, minus anything inside the
 * minimum-notice window, minus anything after bookableDaysAhead.
 */
export async function computeAvailableSlots(dateISO: string): Promise<string[]> {
  const day = DateTime.fromISO(dateISO, { zone: bookingConfig.hostTimezone });
  if (!day.isValid) return [];

  if (!bookingConfig.workingDays.includes(day.weekday % 7)) return [];

  const now = DateTime.now().setZone(bookingConfig.hostTimezone);
  const earliestBookable = now.plus({ minutes: bookingConfig.minNoticeMinutes });
  const latestBookableDay = now.plus({ days: bookingConfig.bookableDaysAhead });
  if (day.startOf("day") > latestBookableDay.startOf("day")) return [];

  const [startHour, startMinute] = bookingConfig.workingHours.start.split(":").map(Number);
  const dayStart = day.set({ hour: startHour, minute: startMinute, second: 0, millisecond: 0 });

  // "24:00" (midnight at the end of the day) can't be expressed as an hour/minute on `day` itself —
  // treat it as the start of the next calendar day so a 24/7 config yields a full 24h window.
  let dayEnd: DateTime;
  if (bookingConfig.workingHours.end === "24:00") {
    dayEnd = day.plus({ days: 1 }).startOf("day");
  } else {
    const [endHour, endMinute] = bookingConfig.workingHours.end.split(":").map(Number);
    dayEnd = day.set({ hour: endHour, minute: endMinute, second: 0, millisecond: 0 });
  }

  const busy = await getBusyIntervals(dayStart.toUTC().toISO()!, dayEnd.toUTC().toISO()!);
  const busyIntervals = busy.map((b) => Interval.fromDateTimes(DateTime.fromISO(b.start), DateTime.fromISO(b.end)));

  const slots: string[] = [];
  let cursor = dayStart;
  while (cursor.plus({ minutes: bookingConfig.durationMinutes }) <= dayEnd) {
    const slotEnd = cursor.plus({ minutes: bookingConfig.durationMinutes });
    const slotInterval = Interval.fromDateTimes(cursor, slotEnd);
    const overlapsBusy = busyIntervals.some((b) => b.overlaps(slotInterval));
    const tooSoon = cursor < earliestBookable;
    if (!overlapsBusy && !tooSoon) {
      slots.push(cursor.toUTC().toISO()!);
    }
    cursor = slotEnd;
  }
  return slots;
}

export interface CreateBookingParams {
  startISO: string;
  attendeeEmail: string;
  attendeeName: string;
  notes?: string;
}

export interface CreateBookingResult {
  eventId: string;
  meetLink: string | null;
}

/** Re-checks the slot is still free, then creates the event with a Google Meet link. */
export async function createBookingEvent(params: CreateBookingParams): Promise<CreateBookingResult> {
  const start = DateTime.fromISO(params.startISO);
  if (!start.isValid) throw new Error("Invalid start time");
  const end = start.plus({ minutes: bookingConfig.durationMinutes });

  const busy = await getBusyIntervals(start.toUTC().toISO()!, end.toUTC().toISO()!);
  const requested = Interval.fromDateTimes(start, end);
  const stillFree = !busy.some((b) =>
    Interval.fromDateTimes(DateTime.fromISO(b.start), DateTime.fromISO(b.end)).overlaps(requested),
  );
  if (!stillFree) {
    throw new Error("That slot was just booked by someone else — please pick another time.");
  }

  const calendar = google.calendar({ version: "v3", auth: getGoogleAuthClient() });
  const res = await calendar.events.insert({
    calendarId: bookingConfig.calendarId,
    conferenceDataVersion: 1,
    sendUpdates: "all",
    requestBody: {
      summary: `${bookingConfig.meetingTitle} — ${params.attendeeName}`,
      description: params.notes ? `${bookingConfig.meetingDescription}\n\nNotes: ${params.notes}` : bookingConfig.meetingDescription,
      start: { dateTime: start.toUTC().toISO()! },
      end: { dateTime: end.toUTC().toISO()! },
      attendees: [{ email: params.attendeeEmail, displayName: params.attendeeName }],
      conferenceData: {
        createRequest: {
          requestId: randomUUID(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
  });

  return {
    eventId: res.data.id!,
    meetLink: res.data.hangoutLink ?? null,
  };
}
