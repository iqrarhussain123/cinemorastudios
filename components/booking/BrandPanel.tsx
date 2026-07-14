"use client";

import type { BookingConfig } from "@/lib/booking/config";

const COMMON_TIMEZONES = Intl.supportedValuesOf ? Intl.supportedValuesOf("timeZone") : ["UTC"];

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
    <div className="themed-scroll flex h-full min-h-0 w-full flex-col gap-5 overflow-y-auto p-6 sm:w-64">
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
            <p key={i} className="text-sm italic text-ink-secondary">
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
        <div className="flex items-center gap-2">
          <span aria-hidden>🌐</span>
          <select
            value={timezone}
            onChange={(e) => onTimezoneChange(e.target.value)}
            className="max-w-[180px] truncate rounded-md border border-line-hairline bg-surface-card px-1.5 py-1 text-sm text-ink-secondary outline-none focus:border-accent"
          >
            {COMMON_TIMEZONES.includes(timezone) ? null : <option value={timezone}>{timezone}</option>}
            {COMMON_TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
