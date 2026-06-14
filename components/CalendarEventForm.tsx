"use client";

import { useState } from "react";

import {
  calendarEventTypeLabels,
  calendarEventTypes,
  formatMonthDayTitle,
  type CalendarEvent,
  type CalendarEventType,
} from "@/lib/mockCalendar";

const timeOptions = [
  "오전 9시",
  "오전 11시",
  "오후 2시",
  "오후 5시",
  "오후 7시",
  "오후 9시",
];

type CalendarEventFormProps = {
  onAddEvent: (event: CalendarEvent) => void;
  selectedDate: string;
};

export function CalendarEventForm({
  onAddEvent,
  selectedDate,
}: CalendarEventFormProps) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("오후 2시");
  const [type, setType] = useState<CalendarEventType>("reservation");
  const [memo, setMemo] = useState("");
  const [message, setMessage] = useState("");

  function handleAddEvent() {
    const cleanTitle = title.trim();

    if (!cleanTitle) {
      setMessage("일정 제목을 입력해주세요.");
      return;
    }

    onAddEvent({
      id: `event-${Date.now()}`,
      date: selectedDate,
      time,
      title: cleanTitle,
      type,
      memo: memo.trim() || undefined,
    });
    setTitle("");
    setMemo("");
    setMessage("일정에 저장했어요.");
  }

  function clearMessage() {
    if (message) {
      setMessage("");
    }
  }

  return (
    <section className="rounded-[1.75rem] bg-white p-4 shadow-lg shadow-slate-950/5">
      <div>
        <h2 className="text-xl font-black text-slate-950">일정 추가</h2>
        <p className="mt-1 text-sm font-semibold text-slate-500">
          {formatMonthDayTitle(selectedDate)}에 넣습니다.
        </p>
      </div>

      <div className="mt-5 grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-800">제목</span>
          <input
            className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            onChange={(event) => {
              clearMessage();
              setTitle(event.target.value);
            }}
            placeholder="예: 저녁 예약 확인"
            type="text"
            value={title}
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">시간</span>
            <select
              className="min-h-12 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-800 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => setTime(event.target.value)}
              value={time}
            >
              {timeOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">유형</span>
            <select
              className="min-h-12 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-800 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) =>
                setType(event.target.value as CalendarEventType)
              }
              value={type}
            >
              {calendarEventTypes.map((item) => (
                <option key={item} value={item}>
                  {calendarEventTypeLabels[item]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-800">메모</span>
          <input
            className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            onChange={(event) => setMemo(event.target.value)}
            placeholder="선택 사항"
            type="text"
            value={memo}
          />
        </label>

        <button
          className="min-h-14 rounded-2xl bg-emerald-500 px-5 py-3 text-base font-black text-white shadow-lg shadow-emerald-200 transition active:scale-[0.99]"
          onClick={handleAddEvent}
          type="button"
        >
          일정 추가하기
        </button>

        <p
          aria-live="polite"
          className="min-h-5 text-center text-sm font-black text-emerald-700"
        >
          {message}
        </p>
      </div>
    </section>
  );
}
