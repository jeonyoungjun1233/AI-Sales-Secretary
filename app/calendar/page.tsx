"use client";

import { useEffect, useState } from "react";

import { CalendarDaySchedule } from "@/components/CalendarDaySchedule";
import { CalendarEventForm } from "@/components/CalendarEventForm";
import { CalendarMonthGrid } from "@/components/CalendarMonthGrid";
import { CompactPageHeader } from "@/components/CompactPageHeader";
import { MobileAppShell } from "@/components/MobileAppShell";
import {
  formatMonthTitle,
  getDateParts,
  getEventsForDate,
  initialCalendarEvents,
  makeDateKey,
  TODAY_DATE_KEY,
  type CalendarEvent,
} from "@/lib/mockCalendar";
import {
  getCalendarEvents,
  saveCalendarEvents,
} from "@/lib/storage/calendarStore";
import type { StoredCalendarEvent } from "@/lib/storage/types";

const baseDate = getDateParts(TODAY_DATE_KEY);
const yearOptions = [2025, 2026, 2027, 2028];
const monthOptions = Array.from({ length: 12 }, (_, index) => index);
const initialStoredCalendarEvents: StoredCalendarEvent[] =
  initialCalendarEvents.map((event) => ({
    ...event,
    createdAt: "2026-06-10T00:00:00.000Z",
  }));

export default function CalendarPage() {
  const [events, setEvents] = useState<StoredCalendarEvent[]>(
    initialStoredCalendarEvents,
  );
  const [selectedDate, setSelectedDate] = useState(TODAY_DATE_KEY);
  const [viewYear, setViewYear] = useState(baseDate.year);
  const [viewMonth, setViewMonth] = useState(baseDate.monthIndex);

  const selectedEvents = getEventsForDate(events, selectedDate);
  const monthPrefix = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}`;
  const monthEventCount = events.filter((event) =>
    event.date.startsWith(monthPrefix),
  ).length;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setEvents(getCalendarEvents(initialStoredCalendarEvents));
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  function selectDate(dateKey: string) {
    const nextDate = getDateParts(dateKey);

    setSelectedDate(dateKey);
    setViewYear(nextDate.year);
    setViewMonth(nextDate.monthIndex);
  }

  function moveMonth(direction: -1 | 1) {
    const next = new Date(viewYear, viewMonth + direction, 1);
    const nextYear = next.getFullYear();
    const nextMonth = next.getMonth();

    setViewYear(nextYear);
    setViewMonth(nextMonth);
    setSelectedDate(makeDateKey(nextYear, nextMonth, 1));
  }

  function handleYearChange(year: number) {
    setViewYear(year);
    setSelectedDate(makeDateKey(year, viewMonth, 1));
  }

  function handleMonthChange(monthIndex: number) {
    setViewMonth(monthIndex);
    setSelectedDate(makeDateKey(viewYear, monthIndex, 1));
  }

  function handleAddEvent(event: CalendarEvent) {
    const nextEvent: StoredCalendarEvent = {
      ...event,
      createdAt: new Date().toISOString(),
    };
    const nextEvents = saveCalendarEvents([...events, nextEvent]);

    setEvents(nextEvents);
    selectDate(event.date);
  }

  return (
    <MobileAppShell
      actionHref="/dashboard"
      actionLabel="홈"
      title="일정"
      subtitle="예약, 리뷰, 홍보를 한눈에 봅니다."
    >
      <div className="grid gap-5">
        <section className="rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-emerald-300">
                오늘 할 일
              </p>
              <h2 className="mt-2 text-3xl font-black leading-tight">
                {selectedEvents.length}개
              </h2>
              <p className="mt-2 text-sm font-semibold text-slate-300">
                날짜를 누르면 아래에 보여요.
              </p>
            </div>
            <button
              className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950"
              onClick={() => selectDate(TODAY_DATE_KEY)}
              type="button"
            >
              오늘
            </button>
          </div>
        </section>

        <section className="grid gap-3">
          <CompactPageHeader
            title={formatMonthTitle(viewYear, viewMonth)}
            description={`${monthEventCount}개 일정`}
          />

          <div className="grid grid-cols-[44px_1fr_44px] gap-2">
            <button
              aria-label="이전 달"
              className="min-h-12 rounded-2xl bg-white text-xl font-black text-slate-700 shadow-sm active:scale-[0.98]"
              onClick={() => moveMonth(-1)}
              type="button"
            >
              ‹
            </button>
            <div className="grid grid-cols-2 gap-2">
              <select
                aria-label="연도 선택"
                className="min-h-12 rounded-2xl bg-white px-3 text-sm font-black text-slate-800 shadow-sm outline-none focus:ring-4 focus:ring-emerald-100"
                onChange={(event) => handleYearChange(Number(event.target.value))}
                value={viewYear}
              >
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>
              <select
                aria-label="월 선택"
                className="min-h-12 rounded-2xl bg-white px-3 text-sm font-black text-slate-800 shadow-sm outline-none focus:ring-4 focus:ring-emerald-100"
                onChange={(event) =>
                  handleMonthChange(Number(event.target.value))
                }
                value={viewMonth}
              >
                {monthOptions.map((monthIndex) => (
                  <option key={monthIndex} value={monthIndex}>
                    {monthIndex + 1}월
                  </option>
                ))}
              </select>
            </div>
            <button
              aria-label="다음 달"
              className="min-h-12 rounded-2xl bg-white text-xl font-black text-slate-700 shadow-sm active:scale-[0.98]"
              onClick={() => moveMonth(1)}
              type="button"
            >
              ›
            </button>
          </div>
        </section>

        <CalendarMonthGrid
          events={events}
          monthIndex={viewMonth}
          onSelectDate={selectDate}
          selectedDate={selectedDate}
          year={viewYear}
        />

        <CalendarDaySchedule dateKey={selectedDate} events={selectedEvents} />

        <CalendarEventForm
          onAddEvent={handleAddEvent}
          selectedDate={selectedDate}
        />
      </div>
    </MobileAppShell>
  );
}
