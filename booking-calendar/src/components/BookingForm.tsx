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
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meetLink, setMeetLink] = useState<string | null | undefined>(undefined);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
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
    <form onSubmit={handleSubmit} className="themed-scroll flex h-full min-h-0 w-full flex-col gap-3 overflow-y-auto p-6 sm:w-64">
      <button
        type="button"
        onClick={onBack}
        className="mb-1 self-start text-xs text-ink-muted hover:text-ink-secondary"
      >
        ‹ Back
      </button>
      <p className="text-sm font-medium text-ink-primary">{formatFull(slotISO, timezone)}</p>

      <label className="text-xs font-medium text-ink-secondary">
        Name
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-line-hairline bg-surface-card px-3 py-2 text-sm text-ink-primary outline-none focus:border-accent"
        />
      </label>

      <label className="text-xs font-medium text-ink-secondary">
        Email
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-line-hairline bg-surface-card px-3 py-2 text-sm text-ink-primary outline-none focus:border-accent"
        />
      </label>

      <label className="text-xs font-medium text-ink-secondary">
        Notes (optional)
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="mt-1 w-full resize-none rounded-lg border border-line-hairline bg-surface-card px-3 py-2 text-sm text-ink-primary outline-none focus:border-accent"
        />
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-ink hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? "Booking…" : "Confirm"}
      </button>
    </form>
  );
}
