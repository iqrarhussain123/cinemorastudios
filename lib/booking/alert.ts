import { google } from "googleapis";
import { DateTime } from "luxon";
import { bookingConfig } from "./config";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getGmailAuthClient() {
  const client = new google.auth.OAuth2(requireEnv("GOOGLE_CLIENT_ID"), requireEnv("GOOGLE_CLIENT_SECRET"));
  const token = process.env.GMAIL_REFRESH_TOKEN || process.env.GOOGLE_REFRESH_TOKEN;
  if (!token || token.trim() === "") {
    throw new Error("Missing required environment variable: GOOGLE_REFRESH_TOKEN or GMAIL_REFRESH_TOKEN");
  }
  client.setCredentials({ refresh_token: token });
  return client;
}

/** RFC 2047 encoded-word — email headers can't carry raw non-ASCII bytes. */
function encodeHeader(value: string): string {
  return `=?UTF-8?B?${Buffer.from(value, "utf-8").toString("base64")}?=`;
}

function randomBoundary(tag: string): string {
  return `${tag}_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

function buildPlainMessage(to: string, subject: string, text: string): string {
  const message = [
    `To: ${to}`,
    `Subject: ${encodeHeader(subject)}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "",
    text,
  ].join("\r\n");
  return Buffer.from(message).toString("base64url");
}

/** multipart/mixed: (plain + html) alternative, plus a text/calendar part so Gmail shows a native event card. */
function buildBookingMessage(params: {
  to: string;
  subject: string;
  text: string;
  html: string;
  ics: string;
}): string {
  const mixedBoundary = randomBoundary("mixed");
  const altBoundary = randomBoundary("alt");

  const parts = [
    `To: ${params.to}`,
    `Subject: ${encodeHeader(params.subject)}`,
    "MIME-Version: 1.0",
    "Importance: high",
    "X-Priority: 1 (Highest)",
    `Content-Type: multipart/mixed; boundary="${mixedBoundary}"`,
    "",
    `--${mixedBoundary}`,
    `Content-Type: multipart/alternative; boundary="${altBoundary}"`,
    "",
    `--${altBoundary}`,
    "Content-Type: text/plain; charset=utf-8",
    "",
    params.text,
    "",
    `--${altBoundary}`,
    "Content-Type: text/html; charset=utf-8",
    "",
    params.html,
    "",
    `--${altBoundary}--`,
    "",
    `--${mixedBoundary}`,
    'Content-Type: text/calendar; charset=utf-8; method=REQUEST; name="invite.ics"',
    'Content-Disposition: attachment; filename="invite.ics"',
    "",
    params.ics,
    "",
    `--${mixedBoundary}--`,
  ];

  return Buffer.from(parts.join("\r\n")).toString("base64url");
}

/** Best-effort: marks a self-sent message Important + Starred. Requires the gmail.modify scope —
 * silently no-ops until GMAIL_REFRESH_TOKEN is regenerated with that scope granted. */
async function markImportant(gmail: ReturnType<typeof google.gmail>, messageId: string | null | undefined): Promise<void> {
  if (!messageId) return;
  try {
    await gmail.users.messages.modify({
      userId: "me",
      id: messageId,
      requestBody: { addLabelIds: ["IMPORTANT", "STARRED"] },
    });
  } catch (err) {
    console.error("could not mark message important (gmail.modify scope may not be granted yet)", err);
  }
}

async function sendGmail(subject: string, text: string): Promise<void> {
  const to = process.env.ALERT_EMAIL || "iqrarworksatcinemora@gmail.com";
  if (!to) {
    console.error("Email not sent — ALERT_EMAIL is not configured.");
    return;
  }

  const gmail = google.gmail({ version: "v1", auth: getGmailAuthClient() });
  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: buildPlainMessage(to, subject, text) },
  });
}

/** Sends an operational alert email via the Gmail API. Used by the booking health-check cron. */
export async function sendAlertEmail(subject: string, text: string): Promise<void> {
  await sendGmail(subject, text);
}

export interface BookingNotification {
  eventId: string;
  attendeeName: string;
  attendeeEmail: string;
  startISO: string;
  meetLink: string | null;
  notes?: string;
  /** IANA timezone the visitor booked from, if the browser could detect it. */
  attendeeTimezone?: string;
}

function icsDate(dt: DateTime): string {
  return dt.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'");
}

/** Folds long ICS lines at 75 octets per RFC 5545 § 3.1 (continuation lines start with a space). */
function foldIcsLine(line: string): string {
  if (line.length <= 75) return line;
  const chunks: string[] = [];
  let rest = line;
  while (rest.length > 75) {
    chunks.push(rest.slice(0, 75));
    rest = " " + rest.slice(75);
  }
  chunks.push(rest);
  return chunks.join("\r\n");
}

function buildIcs(params: {
  eventId: string;
  summary: string;
  description: string;
  start: DateTime;
  end: DateTime;
  location: string;
  organizerEmail: string;
  organizerName: string;
  attendeeEmail: string;
  attendeeName: string;
}): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Cinemora Studios//Booking//EN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${params.eventId}@cinemorastudios.agency`,
    `DTSTAMP:${icsDate(DateTime.utc())}`,
    `DTSTART:${icsDate(params.start)}`,
    `DTEND:${icsDate(params.end)}`,
    `SUMMARY:${params.summary}`,
    `DESCRIPTION:${params.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${params.location}`,
    `ORGANIZER;CN=${params.organizerName}:mailto:${params.organizerEmail}`,
    `ATTENDEE;CN=${params.attendeeName};ROLE=REQ-PARTICIPANT;RSVP=TRUE:mailto:${params.attendeeEmail}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(foldIcsLine).join("\r\n");
}

/** "11:00pm" — matches the lowercase am/pm style Calendly uses in its notification emails. */
function calendlyTime(dt: DateTime): string {
  return dt.toFormat("h:mm") + dt.toFormat("a").toLowerCase();
}

function buildHtmlEmail(params: {
  attendeeName: string;
  attendeeEmail: string;
  hostWhen: string;
  attendeeWhen: string | null;
  meetLink: string | null;
  notes?: string;
}): string {
  const accent = "#bed0b6";
  const accentInk = "#0b2522";
  const surfaceCard = "#0b2522";
  const inkPrimary = "#f3f6ef";
  const inkSecondary = "#b9c7b4";
  const hairline = "#1e3a35";

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:18px 0;border-top:1px solid ${hairline};color:${inkSecondary};font-size:14px;font-weight:600;width:150px;vertical-align:top;">${label}</td>
      <td style="padding:18px 0;border-top:1px solid ${hairline};color:${inkPrimary};font-size:16px;line-height:1.5;vertical-align:top;">${value}</td>
    </tr>`;

  const timeRow = params.attendeeWhen
    ? row("When", `${params.hostWhen}<br/><span style="color:${inkSecondary};font-size:13.5px;">${params.attendeeWhen} — attendee's local time</span>`)
    : row("When", params.hostWhen);

  return `
<div style="background:${surfaceCard};font-family:Arial,Helvetica,sans-serif;width:100%;max-width:600px;margin:0 auto;border-radius:12px;overflow:hidden;">
  <div style="background:${accent};color:${accentInk};padding:28px 40px;font-size:17px;font-weight:700;letter-spacing:0.2px;">
    Cinemora Studios
  </div>
  <div style="padding:36px 40px 48px;">
    <p style="margin:0 0 8px;color:${inkSecondary};font-size:14px;">New booking</p>
    <h1 style="margin:0 0 28px;color:${inkPrimary};font-size:26px;font-weight:700;">${params.attendeeName} booked a ${bookingConfig.meetingTitle}</h1>
    <table style="width:100%;border-collapse:collapse;">
      ${timeRow}
      ${row("Attendee", `${params.attendeeName} &lt;<a href="mailto:${params.attendeeEmail}" style="color:${inkPrimary};">${params.attendeeEmail}</a>&gt;`)}
      ${params.notes ? row("Notes", params.notes.replace(/\n/g, "<br/>")) : ""}
    </table>
    ${
      params.meetLink
        ? `<a href="${params.meetLink}" style="display:inline-block;margin-top:36px;background:${accent};color:${accentInk};text-decoration:none;font-size:16px;font-weight:700;padding:18px 32px;border-radius:10px;">Join Google Meet</a>`
        : `<p style="margin-top:36px;color:${inkSecondary};font-size:14px;">A calendar invite is on its way to the attendee's email.</p>`
    }
  </div>
</div>`;
}

/** Notifies the host by email right after a booking is created — attendee, time, Meet link, and a calendar invite. */
export async function sendBookingNotificationEmail(booking: BookingNotification): Promise<void> {
  const to = process.env.ALERT_EMAIL || "iqrarworksatcinemora@gmail.com";
  if (!to) {
    console.error("Booking notification not sent — ALERT_EMAIL is not configured.");
    return;
  }

  const start = DateTime.fromISO(booking.startISO).setZone(bookingConfig.hostTimezone);
  const end = start.plus({ minutes: bookingConfig.durationMinutes });
  const hostWhen = start.toFormat("cccc, LLLL d 'at' h:mm a") + ` (${bookingConfig.hostTimezone})`;

  let attendeeWhen: string | null = null;
  if (booking.attendeeTimezone && booking.attendeeTimezone !== bookingConfig.hostTimezone) {
    const attendeeStart = DateTime.fromISO(booking.startISO).setZone(booking.attendeeTimezone);
    if (attendeeStart.isValid) {
      attendeeWhen = attendeeStart.toFormat("cccc, LLLL d 'at' h:mm a") + ` (${booking.attendeeTimezone})`;
    }
  }

  const subject = `📅 New Event: ${booking.attendeeName} - ${calendlyTime(start)} ${start.toFormat("ccc")}, ${start.toFormat("dd LLL yyyy")} - ${bookingConfig.meetingTitle}`;

  const textLines = [
    `${booking.attendeeName} just booked a ${bookingConfig.meetingTitle.toLowerCase()}.`,
    "",
    `When: ${hostWhen}`,
  ];
  if (attendeeWhen) textLines.push(`Attendee's local time: ${attendeeWhen}`);
  textLines.push(`Attendee: ${booking.attendeeName} <${booking.attendeeEmail}>`, `Meet link: ${booking.meetLink ?? "(not created)"}`);
  if (booking.notes) textLines.push("", "Notes:", booking.notes);

  const html = buildHtmlEmail({
    attendeeName: booking.attendeeName,
    attendeeEmail: booking.attendeeEmail,
    hostWhen,
    attendeeWhen,
    meetLink: booking.meetLink,
    notes: booking.notes,
  });

  const ics = buildIcs({
    eventId: booking.eventId,
    summary: `${bookingConfig.meetingTitle} — ${booking.attendeeName}`,
    description: booking.notes ? `${bookingConfig.meetingDescription}\n\nNotes: ${booking.notes}` : bookingConfig.meetingDescription,
    start,
    end,
    location: booking.meetLink ?? "",
    organizerEmail: to,
    organizerName: bookingConfig.hostName,
    attendeeEmail: booking.attendeeEmail,
    attendeeName: booking.attendeeName,
  });

  const gmail = google.gmail({ version: "v1", auth: getGmailAuthClient() });
  const res = await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: buildBookingMessage({ to, subject, text: textLines.join("\n"), html, ics }) },
  });
  await markImportant(gmail, res.data.id);
}
