"use client";

import { useEffect, useState } from "react";

const MOBILE_SLOT_LIMIT = 4;

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
  const [availability, setAvailability] = useState<{
    date: string;
    slots: string[];
    error: string | null;
  }>({ date: "", slots: [], error: null });
  const [use24h, setUse24h] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setShowPicker(false);
  }, [date]);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/availability?date=${date}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setAvailability({
          date,
          slots: data.error ? [] : (data.slots ?? []),
          error: data.error ?? null,
        });
      })
      .catch(() => {
        if (!cancelled) {
          setAvailability({ date, slots: [], error: "Could not load availability right now." });
        }
      });
    return () => { cancelled = true; };
  }, [date]);

  const isLoading = availability.date !== date;
  const slots = isLoading ? null : availability.slots;
  const error = isLoading ? null : availability.error;

  const visibleSlots = isMobile && slots ? slots.slice(0, MOBILE_SLOT_LIMIT) : slots ?? [];
  const overflowSlots = isMobile && slots ? slots.slice(MOBILE_SLOT_LIMIT) : [];
  const hasOverflow = overflowSlots.length > 0;

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

      <div
        className={[
          "themed-scroll flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1",
          slots && slots.length > 0 ? "" : "items-center justify-center text-center",
        ].join(" ")}
      >
        {error && <p className="text-sm text-ink-secondary">{error}</p>}
        {!error && slots === null && <p className="text-sm text-ink-muted">Loading times…</p>}
        {!error && slots !== null && slots.length === 0 && (
          <p className="text-sm text-ink-muted">No times available this day.</p>
        )}

        {/* First N slots */}
        {visibleSlots.map((iso) => (
          <button
            key={iso}
            type="button"
            onClick={() => onSelectSlot(iso)}
            className="shrink-0 rounded-lg border border-line-hairline px-4 py-2.5 text-sm font-medium text-ink-primary transition-colors hover:border-accent hover:bg-accent/10"
          >
            {formatSlotTime(iso, timezone, use24h)}
          </button>
        ))}

        {/* Mobile: "N more times" toggle */}
        {isMobile && hasOverflow && !showPicker && (
          <button
            type="button"
            onClick={() => setShowPicker(true)}
            className="mt-1 flex w-full items-center justify-between rounded-lg border border-line-hairline bg-surface-hover px-4 py-2.5 text-sm font-semibold text-ink-primary transition-colors hover:border-accent hover:bg-accent/10"
          >
            <span>{overflowSlots.length} more times</span>
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 5l4 4 4-4" />
            </svg>
          </button>
        )}

        {/* Mobile: custom dark-themed overflow list */}
        {isMobile && hasOverflow && showPicker && (
          <div className="mt-1 flex flex-col gap-0 overflow-hidden rounded-xl border border-line-hairline bg-surface-card">
            <div className="flex items-center justify-between border-b border-line-hairline px-4 py-2.5">
              <span className="text-xs font-semibold text-ink-secondary">Pick a time</span>
              <button
                type="button"
                onClick={() => setShowPicker(false)}
                className="text-xs text-ink-muted hover:text-ink-secondary"
                aria-label="Back to top times"
              >
                ✕
              </button>
            </div>
            <div className="themed-scroll flex max-h-56 flex-col overflow-y-auto">
              {overflowSlots.map((iso) => (
                <button
                  key={iso}
                  type="button"
                  onClick={() => onSelectSlot(iso)}
                  className="shrink-0 border-b border-line-hairline px-4 py-2.5 text-left text-sm font-medium text-ink-primary transition-colors last:border-b-0 hover:bg-accent/10 active:bg-accent/20"
                >
                  {formatSlotTime(iso, timezone, use24h)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
