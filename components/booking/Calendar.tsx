"use client";

import { useState } from "react";

const WEEKDAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfDay(d: Date): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function Calendar({
  selectedDate,
  onSelectDate,
  workingDays,
  bookableDaysAhead,
}: {
  selectedDate: string;
  onSelectDate: (dateKey: string) => void;
  workingDays: number[];
  bookableDaysAhead: number;
}) {
  const initial = new Date(`${selectedDate}T00:00:00`);
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());

  const today = startOfDay(new Date());
  const latestBookable = startOfDay(new Date());
  latestBookable.setDate(latestBookable.getDate() + bookableDaysAhead);

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const leadingBlanks = firstOfMonth.getDay();

  const cells: Array<{ dateKey: string; day: number } | null> = [];
  for (let i = 0; i < leadingBlanks; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(viewYear, viewMonth, day);
    cells.push({ dateKey: toDateKey(d), day });
  }

  function goToMonth(delta: number) {
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  }

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="themed-scroll h-full min-h-0 w-full flex-1 overflow-y-auto border-x border-line-hairline p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="text-base font-semibold text-ink-primary">{monthLabel}</div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => goToMonth(-1)}
            aria-label="Previous month"
            className="flex h-7 w-7 items-center justify-center rounded-md text-ink-secondary hover:bg-surface-hover"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => goToMonth(1)}
            aria-label="Next month"
            className="flex h-7 w-7 items-center justify-center rounded-md text-ink-secondary hover:bg-surface-hover"
          >
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-medium text-ink-muted">
        {WEEKDAY_LABELS.map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1.5">
        {cells.map((cell, i) => {
          if (!cell) return <div key={`blank-${i}`} />;
          const cellDate = startOfDay(new Date(`${cell.dateKey}T00:00:00`));
          const weekday = cellDate.getDay();
          const isPast = cellDate < today;
          const isTooFar = cellDate > latestBookable;
          const isWorkingDay = workingDays.includes(weekday);
          const isDisabled = isPast || isTooFar || !isWorkingDay;
          const isSelected = cell.dateKey === selectedDate;

          return (
            <button
              key={cell.dateKey}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelectDate(cell.dateKey)}
              className={[
                "aspect-square rounded-lg text-sm font-medium transition-colors",
                isDisabled
                  ? "cursor-not-allowed text-ink-muted"
                  : isSelected
                    ? "bg-accent text-accent-ink"
                    : "bg-surface-hover text-ink-primary hover:bg-accent/20",
              ].join(" ")}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
