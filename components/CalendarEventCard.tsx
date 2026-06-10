import {
  calendarEventTypeBadges,
  calendarEventTypeLabels,
  type CalendarEventType,
} from "@/lib/mockCalendar";

type CalendarEventCardProps = {
  time: string;
  title: string;
  type: CalendarEventType;
  memo?: string;
};

export function CalendarEventCard({
  time,
  title,
  type,
  memo,
}: CalendarEventCardProps) {
  return (
    <article className="rounded-3xl bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-black text-slate-950">{time}</p>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-black ${calendarEventTypeBadges[type]}`}
        >
          {calendarEventTypeLabels[type]}
        </span>
      </div>
      <h3 className="mt-3 text-base font-black leading-6 text-slate-950">
        {title}
      </h3>
      {memo ? (
        <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">
          {memo}
        </p>
      ) : null}
    </article>
  );
}
