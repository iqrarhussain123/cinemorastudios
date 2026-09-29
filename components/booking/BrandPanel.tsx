"use client";

import type { BookingConfig } from "@/lib/booking/config";
import { useEffect, useRef, useState } from "react";

const ALL_TIMEZONES: string[] = Intl.supportedValuesOf ? Intl.supportedValuesOf("timeZone") : ["UTC"];

// Popular timezones shown at the top before the full sorted list
const POPULAR = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Toronto",
  "America/Vancouver",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Rome",
  "Europe/Madrid",
  "Asia/Dubai",
  "Asia/Karachi",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Australia/Sydney",
  "Pacific/Auckland",
  "UTC",
];

function buildList(query: string): { popular: string[]; rest: string[] } {
  const q = query.toLowerCase().replace(/\s+/g, "_");
  if (!q) {
    const popularSet = new Set(POPULAR);
    return {
      popular: POPULAR.filter((tz) => ALL_TIMEZONES.includes(tz)),
      rest: ALL_TIMEZONES.filter((tz) => !popularSet.has(tz)),
    };
  }
  const filtered = ALL_TIMEZONES.filter((tz) => tz.toLowerCase().includes(q));
  return { popular: [], rest: filtered };
}

function TimezoneSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (tz: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { popular, rest } = buildList(query);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Focus search when opened
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function select(tz: string) {
    onChange(tz);
    setOpen(false);
    setQuery("");
  }

  const tzBtnCls =
    "w-full px-2.5 py-1.5 text-left text-xs text-ink-primary hover:bg-accent/10 active:bg-accent/20 transition-colors";

  return (
    <div className="relative min-w-0 flex-1" ref={containerRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full max-w-[180px] items-center gap-1.5 truncate rounded-md border border-line-hairline bg-surface-card px-2 py-1 text-left text-xs text-ink-secondary outline-none transition-colors hover:border-accent focus:border-accent"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex-1 truncate">{value}</span>
        <svg
          aria-hidden="true"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 3.5l3 3 3-3" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          aria-label="Select timezone"
          className="absolute top-full left-0 z-50 mt-1 w-56 overflow-hidden rounded-xl border border-line-hairline bg-surface-card shadow-2xl"
        >
          {/* Search */}
          <div className="border-b border-line-hairline p-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search timezone…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-md border border-line-hairline bg-surface-hover px-2.5 py-1.5 text-xs text-ink-primary outline-none placeholder:text-ink-muted focus:border-accent"
            />
          </div>

          {/* List */}
          <div className="themed-scroll max-h-52 overflow-y-auto">
            {popular.length > 0 && (
              <>
                <div className="px-2.5 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                  Popular
                </div>
                {popular.map((tz) => (
                  <button
                    key={tz}
                    type="button"
                    role="option"
                    aria-selected={tz === value}
                    onClick={() => select(tz)}
                    className={`${tzBtnCls} ${tz === value ? "bg-accent/15 font-semibold" : ""}`}
                  >
                    {tz}
                  </button>
                ))}
                {rest.length > 0 && (
                  <div className="mx-2.5 my-1 border-t border-line-hairline" />
                )}
              </>
            )}

            {rest.length === 0 && popular.length === 0 && (
              <p className="px-3 py-4 text-center text-xs text-ink-muted">No timezones match.</p>
            )}

            {rest.map((tz) => (
              <button
                key={tz}
                type="button"
                role="option"
                aria-selected={tz === value}
                onClick={() => select(tz)}
                className={`${tzBtnCls} ${tz === value ? "bg-accent/15 font-semibold" : ""}`}
              >
                {tz}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function BrandPanel({
  config,
  timezone,
  onTimezoneChange,
}: {
  config: BookingConfig;
  timezone: string;
  onTimezoneChange: (tz: string) => void;
}) {
  const initial = config.hostName.trim().charAt(0).toUpperCase() || "?";

  return (
    <div className="booking-brand-panel themed-scroll flex h-full min-h-0 w-full flex-col gap-5 overflow-y-auto p-6 sm:w-64">
      <div className="flex items-center gap-3">
        {config.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={config.logoUrl}
            alt={config.hostName}
            className="h-10 w-10 rounded-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
            {initial}
          </div>
        )}
        <div>
          <div className="text-sm font-medium text-ink-primary">{config.hostName}</div>
          <div className="text-xs text-ink-muted">{config.companyName}</div>
        </div>
      </div>

      <div>
        <h1 className="text-lg font-semibold leading-snug text-ink-primary">{config.meetingTitle}</h1>
        {config.meetingDescription && (
          <p className="mt-1 text-sm text-ink-secondary">{config.meetingDescription}</p>
        )}
      </div>

      {config.testimonials.length > 0 && (
        <div className="space-y-3 border-t border-line-hairline pt-4">
          <div className="text-xs font-medium text-ink-muted">From our partners:</div>
          {config.testimonials.map((t, i) => (
            <p key={i} className="booking-testimonial text-sm italic text-ink-secondary">
              &ldquo;{t.quote}&rdquo; <span className="not-italic text-ink-muted">— {t.author}</span>
            </p>
          ))}
        </div>
      )}

      <div className="space-y-2.5 border-t border-line-hairline pt-4 text-sm text-ink-secondary">
        <div className="flex items-center gap-2">
          <span aria-hidden>⏱</span>
          <span>{config.durationMinutes}m</span>
        </div>
        <div className="flex items-center gap-2">
          <span aria-hidden>📹</span>
          <span>Google Meet</span>
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <span aria-hidden>🌐</span>
          <TimezoneSelect value={timezone} onChange={onTimezoneChange} />
        </div>
      </div>
    </div>
  );
}
