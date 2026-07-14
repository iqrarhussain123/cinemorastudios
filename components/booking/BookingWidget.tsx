"use client";

import { useState, type CSSProperties } from "react";
import type { BookingConfig } from "@/lib/booking/config";
import { BrandPanel } from "./BrandPanel";
import { Calendar } from "./Calendar";
import { TimeSlotList } from "./TimeSlotList";
import { BookingForm } from "./BookingForm";

function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function BookingWidget({ config }: { config: BookingConfig }) {
  const [selectedDate, setSelectedDate] = useState(todayKey());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [timezone, setTimezone] = useState(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || config.hostTimezone,
  );

  const style = { "--accent": config.accentColor } as CSSProperties;

  return (
    <div
      style={style}
      className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line-hairline bg-surface-card shadow-2xl sm:h-[620px] sm:flex-row"
    >
      <BrandPanel config={config} timezone={timezone} onTimezoneChange={setTimezone} />
      <Calendar
        selectedDate={selectedDate}
        onSelectDate={(date) => {
          setSelectedDate(date);
          setSelectedSlot(null);
        }}
        workingDays={config.workingDays}
        bookableDaysAhead={config.bookableDaysAhead}
      />
      {selectedSlot ? (
        <BookingForm
          slotISO={selectedSlot}
          timezone={timezone}
          onBack={() => setSelectedSlot(null)}
        />
      ) : (
        <TimeSlotList date={selectedDate} timezone={timezone} onSelectSlot={setSelectedSlot} />
      )}
    </div>
  );
}
