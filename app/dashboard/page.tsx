"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { BetaNoticeCard } from "@/components/BetaNoticeCard";
import { DemoDataButton } from "@/components/DemoDataButton";
import { MobileAppShell } from "@/components/MobileAppShell";
import { QuickActionButton } from "@/components/QuickActionButton";
import {
  calendarEventTypeLabels,
  getEventsForDate,
  getUpcomingEvents,
  initialCalendarEvents,
  TODAY_DATE_KEY,
} from "@/lib/mockCalendar";
import { getCalendarEvents } from "@/lib/storage/calendarStore";
import {
  getGenerationHistory,
  getSavedWorkSummary,
} from "@/lib/storage/generationHistoryStore";
import {
  getRemoteCalendarEvents,
  getRemoteGenerationHistory,
  mergeById,
} from "@/lib/storage/remoteStore";
import type {
  StoredCalendarEvent,
  StoredGeneration,
} from "@/lib/storage/types";

const generationTypeLabels = {
  inquiry: "문의 답장",
  review: "리뷰 답글",
  promo: "홍보글",
  faq: "FAQ",
};

const initialStoredCalendarEvents: StoredCalendarEvent[] =
  initialCalendarEvents.map((event) => ({
    ...event,
    createdAt: "2026-06-10T00:00:00.000Z",
  }));

export default function DashboardPage() {
  const [calendarEvents, setCalendarEvents] = useState<StoredCalendarEvent[]>(
    initialStoredCalendarEvents,
  );
  const [generations, setGenerations] = useState<StoredGeneration[]>([]);
  const todayEvents = getEventsForDate(calendarEvents, TODAY_DATE_KEY);
  const upcomingEvents = getUpcomingEvents(calendarEvents, 3);
  const recentGenerations = generations.slice(0, 2);
  const summary = getSavedWorkSummary(generations);
  const stats = [
    {
      label: "절약",
      value: `${summary.savedMinutesTotal || 15}분`,
      tone: "bg-emerald-500 text-white",
    },
    {
      label: "오늘 생성",
      value: `${summary.todayGenerationCount}개`,
      tone: "bg-white text-slate-950",
    },
    {
      label: "기록",
      value: `${summary.generationCount}개`,
      tone: "bg-white text-slate-950",
    },
  ];

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadDashboardData();
    }, 0);

    async function loadDashboardData() {
      const localEvents = getCalendarEvents(initialStoredCalendarEvents);
      const remoteEvents = await getRemoteCalendarEvents();
      const localGenerations = getGenerationHistory();
      const remoteGenerations = await getRemoteGenerationHistory();

      setCalendarEvents(mergeById(remoteEvents, localEvents));
      setGenerations(sortGenerations(mergeById(remoteGenerations, localGenerations)));
    }

    function handleDemoDataLoaded() {
      void loadDashboardData();
    }

    window.addEventListener("demo-data-loaded", handleDemoDataLoaded);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("demo-data-loaded", handleDemoDataLoaded);
    };
  }, []);

  return (
    <MobileAppShell
      actionHref="/history"
      actionLabel="기록"
      title="오늘은 무엇을 줄여드릴까요?"
      subtitle="답장, 리뷰, 홍보를 바로 시작하세요."
    >
      <section className="rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300">
        <p className="text-sm font-bold text-emerald-300">오늘 현황</p>
        <h2 className="mt-2 text-3xl font-black leading-tight">
          {summary.savedMinutesTotal
            ? `오늘 ${summary.savedMinutesTotal}분 아꼈어요`
            : `할 일 ${todayEvents.length}개`}
        </h2>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {stats.map((item) => (
            <div
              className={`rounded-2xl p-3 text-center shadow-sm ${item.tone}`}
              key={item.label}
            >
              <p className="text-xs font-bold opacity-70">{item.label}</p>
              <p className="mt-1 text-base font-black">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-[1.75rem] bg-[linear-gradient(135deg,#ecfdf5_0%,#ffffff_70%)] p-5 shadow-lg shadow-emerald-950/5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black text-emerald-700">먼저 할 일</p>
            <h2 className="mt-2 text-xl font-black leading-7 text-slate-950">
              예약 문의 답장하기
            </h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
              10초 답장부터 만들어보세요.
            </p>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-emerald-700 shadow-sm">
            추천
          </span>
        </div>
        <Link
          className="mt-5 flex min-h-14 items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-base font-black text-white shadow-lg shadow-emerald-200 transition active:scale-[0.99]"
          href="/generate/inquiry"
        >
          답장 만들기
        </Link>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-950">빠른 실행</h2>
          <p className="text-xs font-bold text-slate-400">바로 시작</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <QuickActionButton
            description="질문 답장"
            href="/generate/inquiry"
            icon="+"
            title="문의"
          />
          <QuickActionButton
            accent="amber"
            description="리뷰 답글"
            href="/generate/review"
            icon="★"
            title="리뷰"
          />
          <QuickActionButton
            accent="rose"
            description="오늘 홍보"
            href="/generate/promo"
            icon="↗"
            title="홍보"
          />
        </div>
      </section>

      <section className="mt-6 rounded-[1.75rem] bg-white p-4 shadow-lg shadow-slate-950/5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-950">
              오늘 할 일 {todayEvents.length}개
            </h2>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              가까운 일정부터 봅니다.
            </p>
          </div>
          <Link
            className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700"
            href="/calendar"
          >
            전체 보기
          </Link>
        </div>

        <div className="mt-4 grid gap-2">
          {upcomingEvents.map((event) => (
            <Link
              className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 transition active:scale-[0.99]"
              href="/calendar"
              key={event.id}
            >
              <div className="min-w-0">
                <p className="text-sm font-black text-slate-950">
                  {event.time} {event.title}
                </p>
                <p className="mt-1 text-xs font-bold text-slate-500">
                  {calendarEventTypeLabels[event.type]}
                </p>
              </div>
              <span className="text-lg font-black text-emerald-500">›</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-[1.75rem] bg-white p-4 shadow-lg shadow-slate-950/5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-950">
              최근 만든 문구
            </h2>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              다시 복사할 수 있어요.
            </p>
          </div>
          <Link
            className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700"
            href="/history"
          >
            기록 보기
          </Link>
        </div>

        {recentGenerations.length > 0 ? (
          <div className="grid gap-3">
            {recentGenerations.map((item) => (
              <Link
                className="rounded-3xl bg-slate-50 p-4 transition active:scale-[0.99]"
                href="/history"
                key={item.id}
              >
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                  {generationTypeLabels[item.type]}
                </span>
                <h3 className="mt-3 text-base font-black text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">
                  {item.output.slice(0, 54)}
                  {item.output.length > 54 ? "..." : ""}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-500">
            아직 만든 문구가 없어요.
          </div>
        )}
      </section>

      <section className="mt-6 rounded-[1.75rem] bg-white p-4 shadow-lg shadow-slate-950/5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black text-emerald-700">가게 답변</p>
            <h2 className="mt-1 text-xl font-black leading-7 text-slate-950">
              자주 묻는 질문 정리
            </h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
              반복 답장을 더 빠르게 만듭니다.
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
            추천
          </span>
        </div>
        <Link
          className="mt-5 flex min-h-14 items-center justify-center rounded-2xl bg-emerald-50 px-5 py-3 text-base font-black text-emerald-800 transition active:scale-[0.99]"
          href="/faq"
        >
          질문 관리
        </Link>
      </section>

      <div className="mt-6 grid gap-3">
        <BetaNoticeCard />
        <DemoDataButton
          onLoaded={() => {
            window.dispatchEvent(new CustomEvent("demo-data-loaded"));
          }}
        />
      </div>
    </MobileAppShell>
  );
}

function sortGenerations(generations: StoredGeneration[]) {
  return [...generations].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
