export interface Testimonial {
  quote: string;
  author: string;
}

export interface BookingConfig {
  /** Shown as the host's name under the avatar. */
  hostName: string;
  /** Shown next to the host name, e.g. "@YourCompany". */
  companyName: string;
  /** Path under /public, or a full URL. Leave empty to hide the avatar. */
  logoUrl: string;
  /** Headline above the calendar, e.g. "Intro call w/ Alex". */
  meetingTitle: string;
  /** One-line description shown under the title. */
  meetingDescription: string;
  /** Length of each bookable slot, in minutes. */
  durationMinutes: number;
  /** Quotes shown in the left panel under "From our partners". Empty array hides the section. */
  testimonials: Testimonial[];
  /** Brand color used for the selected date, primary buttons, and highlights. */
  accentColor: string;
  /** Bookable window each working day, in hostTimezone. Use end: "24:00" for a full 24h day. */
  workingHours: { start: string; end: string };
  /** 0 = Sunday ... 6 = Saturday. */
  workingDays: number[];
  /** IANA timezone the working hours above are defined in. */
  hostTimezone: string;
  /** Minimum notice before a slot can be booked, in minutes (e.g. no booking 5 minutes from now). */
  minNoticeMinutes: number;
  /** How many days ahead visitors can book. */
  bookableDaysAhead: number;
  /** "primary" for the connected account's main calendar, or a specific calendar ID. */
  calendarId: string;
}

export const bookingConfig: BookingConfig = {
  hostName: "Iqrar Hussain",
  companyName: "Cinemora Studios",
  logoUrl: "/logo.jpg",
  meetingTitle: "Growth Strategy Call",
  meetingDescription: "A focused 30-minute conversation about your growth goal, current bottleneck, and the system required to close the gap.",
  durationMinutes: 30,
  testimonials: [
    {
      quote: "Cinemora helped us grow from 1,000 to 10,000 YouTube subscribers, with short-form content reaching 220,000 views.",
      author: "Jan de Weerd, Spoken Wines",
    },
    {
      quote: "Over 18 months, Success School grew from around $10K–$20K per month to reaching $100K months.",
      author: "Tim Frey, Success School",
    },
  ],
  accentColor: "#bed0b6",
  workingHours: { start: "00:00", end: "24:00" },
  workingDays: [0, 1, 2, 3, 4, 5, 6],
  hostTimezone: "America/Los_Angeles",
  minNoticeMinutes: 60,
  bookableDaysAhead: 30,
  calendarId: "primary",
};
