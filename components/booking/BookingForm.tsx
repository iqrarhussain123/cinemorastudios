"use client";

import { useState, type FormEvent } from "react";

function formatFull(iso: string, timezone: string): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  }).format(new Date(iso));
}

function buildNotes(
  revenue: string,
  challenge: string,
  service: string,
  source: string,
  userNotes: string,
): string {
  const lines = [
    `Monthly revenue: ${revenue}`,
    `Biggest challenge: ${challenge}`,
    `Service interest: ${service}`,
    `Found us via: ${source || "Not specified"}`,
  ];
  if (userNotes.trim()) lines.push(`\nNotes: ${userNotes.trim()}`);
  return lines.join("\n");
}

const REVENUE_OPTIONS = [
  "Pre-revenue",
  "$1K – $5K / mo",
  "$5K – $20K / mo",
  "$20K – $50K / mo",
  "$50K+ / mo",
];

const CHALLENGE_OPTIONS = [
  "Not enough content or visibility",
  "Content isn't converting to leads",
  "Need a website or digital product",
  "Want to automate outreach or ops",
  "Scaling but systems aren't keeping up",
  "Other",
];

const SERVICE_OPTIONS = [
  "Personal Brand Management",
  "AI Custom Solutions",
  "Web Development",
  "Video Production & Editing",
  "Not sure yet, need a strategy call",
];

const SOURCE_OPTIONS = [
  "Instagram",
  "LinkedIn",
  "YouTube",
  "Referral / Word of mouth",
  "Google Search",
  "Cold outreach",
  "Other",
];

const inputCls =
  "mt-1 w-full rounded-lg border border-line-hairline bg-surface-card px-3 py-2 text-sm text-ink-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent/30";

const labelCls = "text-xs font-medium text-ink-secondary";

export function BookingForm({
  slotISO,
  timezone,
  onBack,
}: {
  slotISO: string;
  timezone: string;
  onBack: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [revenue, setRevenue] = useState("");
  const [challenge, setChallenge] = useState("");
  const [service, setService] = useState("");
  const [source, setSource] = useState("");
  const [userNotes, setUserNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meetLink, setMeetLink] = useState<string | null | undefined>(undefined);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const notes = buildNotes(revenue, challenge, service, source, userNotes);
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startISO: slotISO, name, email, notes }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not create the booking.");
        return;
      }
      setMeetLink(data.meetLink ?? null);
    } catch {
      setError("Could not reach the server — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (meetLink !== undefined) {
    return (
      <div className="themed-scroll flex h-full min-h-0 w-full flex-col gap-3 overflow-y-auto p-6 sm:w-64">
        <div className="text-sm font-semibold text-ink-primary">You&rsquo;re booked!</div>
        <p className="text-sm text-ink-secondary">{formatFull(slotISO, timezone)}</p>
        {meetLink ? (
          <a
            href={meetLink}
            target="_blank"
            rel="noreferrer"
            className="mt-2 rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-medium text-accent-ink hover:opacity-90"
          >
            Join Google Meet
          </a>
        ) : (
          <p className="text-sm text-ink-muted">A calendar invite is on its way to your email.</p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="themed-scroll flex h-full min-h-0 w-full flex-col gap-3 overflow-y-auto p-6 sm:w-64"
    >
      <button
        type="button"
        onClick={onBack}
        className="mb-1 self-start text-xs text-ink-muted hover:text-ink-secondary"
      >
        ‹ Back
      </button>

      <p className="text-sm font-medium text-ink-primary">{formatFull(slotISO, timezone)}</p>

      {/* ── Contact ── */}
      <label className={labelCls}>
        Name
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputCls}
        />
      </label>

      <label className={labelCls}>
        Email
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
        />
      </label>

      {/* ── Qualification ── */}
      <div className="mt-1 border-t border-line-hairline pt-3">
        <p className="mb-2.5 text-xs font-semibold text-ink-secondary">
          A few quick questions so we come prepared
        </p>

        <div className="flex flex-col gap-3">
          <label className={labelCls}>
            What&rsquo;s your current monthly revenue?
            <select
              required
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              className={inputCls}
            >
              <option value="" disabled>
                Select…
              </option>
              {REVENUE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>

          <label className={labelCls}>
            What&rsquo;s your biggest growth challenge right now?
            <select
              required
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              className={inputCls}
            >
              <option value="" disabled>
                Select…
              </option>
              {CHALLENGE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>

          <label className={labelCls}>
            Which service are you most interested in?
            <select
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              className={inputCls}
            >
              <option value="" disabled>
                Select…
              </option>
              {SERVICE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>

          <label className={labelCls}>
            How did you find us? <span className="font-normal opacity-60">(optional)</span>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className={inputCls}
            >
              <option value="">Select…</option>
              {SOURCE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* ── Optional notes ── */}
      <label className={labelCls}>
        Anything else you&rsquo;d like us to know? <span className="font-normal opacity-60">(optional)</span>
        <textarea
          value={userNotes}
          onChange={(e) => setUserNotes(e.target.value)}
          rows={2}
          className={`${inputCls} resize-none`}
        />
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-ink hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? "Booking…" : "Confirm booking"}
      </button>
    </form>
  );
}
