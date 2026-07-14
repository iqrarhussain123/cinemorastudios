"use client";

import { useEffect, useState } from "react";

function formatHeaderDate(dateKey: string): string {
  const d = new Date(`${dateKey}T00:00:00`);
  const weekday = d.toLocaleDateString(undefined, { weekday: "short" });
  const day = String(d.getDate()).padStart(2, "0");
  return `${weekday} ${day}`;
}

function formatSlotTime(iso: string, timezone: string, use24h: boolean): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: !use24h,
    timeZone: timezone,
  }).format(new Date(iso));
}

export function TimeSlotList({
  date,
  timezone,
  onSelectSlot,
}: {
  date: string;
  timezone: string;
  onSelectSlot: (iso: string) => void;
}) {
  const [slots, setSlots] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [use24h, setUse24h] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setSlots(null);
    setError(null);

    fetch(`/api/availability?date=${date}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) setError(data.error);
        else setSlots(data.slots ?? []);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load availability right now.");
      });

    return () => {
      cancelled = true;
    };
  }, [date]);

  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-4 p-6 sm:w-64">
      <div className="flex shrink-0 items-center justify-between">
        <div className="text-sm font-semibold text-ink-primary">{formatHeaderDate(date)}</div>
        <div className="flex overflow-hidden rounded-md border border-line-hairline text-xs">
          <button
            type="button"
            onClick={() => setUse24h(false)}
            className={`px-2 py-1 ${!use24h ? "bg-accent text-accent-ink" : "text-ink-secondary hover:bg-surface-hover"}`}
          >
            12h
          </button>
          <button
            type="button"
            onClick={() => setUse24h(true)}
            className={`px-2 py-1 ${use24h ? "bg-accent text-accent-ink" : "text-ink-secondary hover:bg-surface-hover"}`}
          >
            24h
          </button>
        </div>
      </div>

      <div className="themed-scroll flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {error && <p className="text-sm text-ink-secondary">{error}</p>}
        {!error && slots === null && <p className="text-sm text-ink-muted">Loading times…</p>}
        {!error && slots !== null && slots.length === 0 && (
          <p className="text-sm text-ink-muted">No times available this day.</p>
        )}
        {slots?.map((iso) => (
          <button
            key={iso}
            type="button"
            onClick={() => onSelectSlot(iso)}
            className="shrink-0 rounded-lg border border-line-hairline px-4 py-2.5 text-sm font-medium text-ink-primary transition-colors hover:border-accent hover:bg-accent/10"
          >
            {formatSlotTime(iso, timezone, use24h)}
          </button>
        ))}
      </div>
    </div>
  );
}
