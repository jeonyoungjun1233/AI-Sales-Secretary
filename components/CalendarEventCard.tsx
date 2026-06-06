import type { CalendarEventType } from "@/lib/mockCalendar";

type CalendarEventCardProps = {
  time: string;
  title: string;
  type: CalendarEventType;
  description?: string;
};

const typeClasses: Record<CalendarEventType, string> = {
  예약: "bg-emerald-50 text-emerald-800 border-emerald-100",
  "리뷰 답글": "bg-amber-50 text-amber-800 border-amber-100",
  홍보글: "bg-rose-50 text-rose-800 border-rose-100",
  "가게 관리": "bg-sky-50 text-sky-800 border-sky-100",
};

export function CalendarEventCard({
  time,
  title,
  type,
  description,
}: CalendarEventCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-950/5">
      <div className="flex items-start gap-3">
        <div className="flex w-16 shrink-0 flex-col items-center rounded-2xl bg-slate-950 px-2 py-3 text-white">
          <span className="text-xs font-bold text-slate-300">오늘</span>
          <span className="mt-1 text-sm font-black">{time}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-2.5 py-1 text-xs font-black ${typeClasses[type]}`}
            >
              {type}
            </span>
          </div>
          <h3 className="mt-2 text-base font-black leading-6 text-slate-950">
            {title}
          </h3>
          {description ? (
            <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
