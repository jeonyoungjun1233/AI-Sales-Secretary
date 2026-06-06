"use client";

import { useState } from "react";

import { CalendarEventCard } from "@/components/CalendarEventCard";
import { MobileAppShell } from "@/components/MobileAppShell";
import { OptionChip } from "@/components/OptionChip";
import {
  calendarEventTypes,
  todayCalendarEvents,
  weeklyTasks,
  type CalendarEvent,
  type CalendarEventType,
} from "@/lib/mockCalendar";

const typeDescriptions: Record<CalendarEventType, string> = {
  예약: "예약 문의 확인",
  "리뷰 답글": "밀린 답글 정리",
  홍보글: "오늘 소식 올리기",
  "가게 관리": "정보와 메뉴 점검",
};

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>(todayCalendarEvents);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("오후 4시");
  const [type, setType] = useState<CalendarEventType>("예약");
  const [added, setAdded] = useState(false);

  function handleAddEvent() {
    const cleanTitle = title.trim();

    if (!cleanTitle) {
      return;
    }

    setEvents((current) => [
      ...current,
      {
        id: `event-${Date.now()}`,
        time,
        title: cleanTitle,
        type,
        description: "오늘 처리할 일에 추가했어요.",
      },
    ]);
    setTitle("");
    setAdded(true);
  }

  return (
    <MobileAppShell
      actionHref="/generate/inquiry"
      actionLabel="만들기"
      title="오늘 챙길 일을 한눈에 정리했어요."
      subtitle="예약 문의, 리뷰 답글, 홍보글 일정을 놓치지 않게 도와드립니다."
    >
      <section className="rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300">
        <p className="text-sm font-bold text-emerald-300">오늘 일정</p>
        <h2 className="mt-3 text-2xl font-black leading-tight">
          알림 연결 전에도 오늘 할 일을 먼저 정리할 수 있어요.
        </h2>
        <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">
          실제 알림 기능은 다음 단계에서 연결됩니다.
        </p>
      </section>

      <section className="mt-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-950">오늘 할 일</h2>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
            {events.length}개
          </span>
        </div>
        <div className="grid gap-3">
          {events.map((event) => (
            <CalendarEventCard {...event} key={event.id} />
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-950/5">
        <h2 className="text-xl font-black text-slate-950">일정 추가</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
          지금 떠오른 일을 적어두면 오늘 화면에서 바로 확인할 수 있어요.
        </p>

        <div className="mt-5 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">
              일정 제목
            </span>
            <input
              className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => setTitle(event.target.value)}
              placeholder="예: 저녁 예약 문의 답장하기"
              type="text"
              value={title}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">시간</span>
            <input
              className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => setTime(event.target.value)}
              placeholder="예: 오후 4시"
              type="text"
              value={time}
            />
          </label>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold text-slate-800">
              일정 유형
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {calendarEventTypes.map((item) => (
                <OptionChip
                  description={typeDescriptions[item]}
                  key={item}
                  label={item}
                  onClick={() => setType(item)}
                  selected={type === item}
                />
              ))}
            </div>
          </fieldset>

          <button
            className="min-h-14 rounded-2xl bg-emerald-500 px-5 py-3 text-base font-black text-white shadow-lg shadow-emerald-200 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!title.trim()}
            onClick={handleAddEvent}
            type="button"
          >
            일정 추가하기
          </button>

          <p
            className="min-h-5 text-center text-sm font-black text-emerald-700"
            aria-live="polite"
          >
            {added ? "오늘 할 일에 추가되었습니다." : ""}
          </p>
        </div>
      </section>

      <section className="mt-6 rounded-[1.75rem] border border-emerald-100 bg-emerald-50 p-4">
        <h2 className="text-xl font-black text-slate-950">이번 주 할 일</h2>
        <div className="mt-4 grid gap-2">
          {weeklyTasks.map((task) => (
            <div
              className="rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-700 shadow-sm"
              key={task}
            >
              {task}
            </div>
          ))}
        </div>
      </section>
    </MobileAppShell>
  );
}
