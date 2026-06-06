import Link from "next/link";

import { CalendarEventCard } from "@/components/CalendarEventCard";
import { MobileAppShell } from "@/components/MobileAppShell";
import { QuickActionButton } from "@/components/QuickActionButton";
import { todayCalendarEvents } from "@/lib/mockCalendar";

const stats = [
  { label: "절약한 시간", value: "약 15분", tone: "bg-emerald-500 text-white" },
  { label: "오늘 생성", value: "3회", tone: "bg-white text-slate-950" },
  { label: "남은 횟수", value: "7회", tone: "bg-white text-slate-950" },
];

const recentCopies = [
  {
    type: "문의 답장",
    title: "주차 문의 답장",
    text: "매장 앞 주차는 어렵지만 도보 2분 거리 공영주차장을 이용하실 수 있습니다.",
  },
  {
    type: "홍보글",
    title: "오늘 저녁 홍보글",
    text: "오늘 저녁 따뜻한 메뉴 준비되어 있습니다. 방문 전 편하게 문의 주세요.",
  },
];

export default function DashboardPage() {
  return (
    <MobileAppShell
      actionHref="/calendar"
      actionLabel="일정"
      title="사장님, 오늘은 이 일부터 줄여볼까요?"
      subtitle="문의, 리뷰, 홍보 일정을 한눈에 보고 바로 처리할 수 있어요."
    >
      <section className="rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300">
        <p className="text-sm font-bold text-emerald-300">오늘의 업무</p>
        <h2 className="mt-3 text-2xl font-black leading-tight">
          답장 늦기 전에 먼저 처리할 일을 골라봤어요.
        </h2>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {stats.map((item) => (
            <div
              className={`rounded-2xl p-3 text-center shadow-sm ${item.tone}`}
              key={item.label}
            >
              <p className="text-[0.68rem] font-bold opacity-70">
                {item.label}
              </p>
              <p className="mt-1 text-base font-black">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-[1.75rem] border border-emerald-100 bg-[linear-gradient(135deg,#ecfdf5_0%,#ffffff_68%,#ecfeff_100%)] p-5 shadow-lg shadow-emerald-950/5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black text-emerald-700">
              가장 먼저 할 일
            </p>
            <h2 className="mt-2 text-xl font-black leading-7 text-slate-950">
              오후 예약 문의에 답장하기
            </h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
              답장이 늦으면 예약을 놓칠 수 있어요. 10초 답장부터
              만들어보세요.
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
          문의 답장 만들기
        </Link>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-950">빠른 실행</h2>
          <p className="text-xs font-bold text-slate-400">엄지로 바로 실행</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <QuickActionButton
            description="예약, 위치, 가격"
            href="/generate/inquiry"
            icon="💬"
            title="문의"
          />
          <QuickActionButton
            accent="amber"
            description="감사, 사과 답글"
            href="/generate/review"
            icon="★"
            title="리뷰"
          />
          <QuickActionButton
            accent="rose"
            description="오늘 올릴 글"
            href="/generate/promo"
            icon="↗"
            title="홍보"
          />
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-950">오늘 일정</h2>
          <Link
            className="text-sm font-black text-emerald-700"
            href="/calendar"
          >
            전체 보기
          </Link>
        </div>
        <div className="grid gap-3">
          {todayCalendarEvents.map((event) => (
            <CalendarEventCard {...event} key={event.id} />
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-black text-slate-950">최근 만든 문구</h2>
        <div className="mt-3 grid gap-3">
          {recentCopies.map((item) => (
            <article
              className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-950/5"
              key={item.title}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                  {item.type}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  방금 전
                </span>
              </div>
              <h3 className="mt-3 text-base font-black text-slate-950">
                {item.title}
              </h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>
    </MobileAppShell>
  );
}
