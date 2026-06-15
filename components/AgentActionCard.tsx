"use client";

import type { DailyActionItem } from "@/lib/agent/types";

type AgentActionCardProps = {
  action: DailyActionItem;
  completed: boolean;
  feedback?: string;
  onCopy: (action: DailyActionItem) => void;
  onSaveToHistory: (action: DailyActionItem) => void;
  onAddToCalendar: (action: DailyActionItem) => void;
  onComplete: (action: DailyActionItem) => void;
};

const actionLabels: Record<DailyActionItem["type"], string> = {
  inquiry: "문의",
  review: "리뷰",
  promo: "홍보",
  calendar: "일정",
};

const actionClasses: Record<DailyActionItem["type"], string> = {
  inquiry: "bg-emerald-50 text-emerald-800",
  review: "bg-amber-50 text-amber-800",
  promo: "bg-rose-50 text-rose-800",
  calendar: "bg-sky-50 text-sky-800",
};

export function AgentActionCard({
  action,
  completed,
  feedback,
  onCopy,
  onSaveToHistory,
  onAddToCalendar,
  onComplete,
}: AgentActionCardProps) {
  return (
    <article className="rounded-[1.75rem] bg-white p-4 shadow-lg shadow-slate-950/5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-black ${actionClasses[action.type]}`}
          >
            {actionLabels[action.type]}
          </span>
          <h3 className="mt-3 text-lg font-black leading-7 text-slate-950">
            {action.title}
          </h3>
        </div>
        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">
          {action.recommendedTime}
        </span>
      </div>

      <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
        {action.description}
      </p>

      <p className="mt-4 whitespace-pre-line rounded-3xl bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700">
        {action.output}
      </p>

      <div className="mt-4 grid gap-2">
        {action.canCopy ? (
          <button
            className="min-h-12 rounded-2xl bg-slate-950 px-4 py-2 text-sm font-black text-white transition active:scale-[0.99]"
            onClick={() => onCopy(action)}
            type="button"
          >
            복사하기
          </button>
        ) : null}
        <div className="grid grid-cols-2 gap-2">
          {action.canSaveToHistory ? (
            <button
              className="min-h-11 rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800 transition active:scale-[0.99]"
              onClick={() => onSaveToHistory(action)}
              type="button"
            >
              기록에 저장
            </button>
          ) : null}
          {action.canAddToCalendar ? (
            <button
              className="min-h-11 rounded-2xl bg-sky-50 px-4 py-2 text-sm font-black text-sky-800 transition active:scale-[0.99]"
              onClick={() => onAddToCalendar(action)}
              type="button"
            >
              일정에 추가
            </button>
          ) : null}
          <button
            className={`min-h-11 rounded-2xl px-4 py-2 text-sm font-black transition active:scale-[0.99] ${
              completed
                ? "bg-emerald-500 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
            onClick={() => onComplete(action)}
            type="button"
          >
            {completed ? "완료했어요" : "완료 표시"}
          </button>
        </div>
      </div>

      <p className="min-h-5 pt-2 text-center text-xs font-black text-emerald-700">
        {feedback || ""}
      </p>
    </article>
  );
}
