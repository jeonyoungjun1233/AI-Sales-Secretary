import { CalendarEventCard } from "@/components/CalendarEventCard";
import {
  formatMonthDayTitle,
  type CalendarEvent,
} from "@/lib/mockCalendar";

type CalendarDayScheduleProps = {
  dateKey: string;
  events: CalendarEvent[];
};

export function CalendarDaySchedule({
  dateKey,
  events,
}: CalendarDayScheduleProps) {
  return (
    <section className="rounded-[1.75rem] bg-white p-4 shadow-lg shadow-slate-950/5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-black text-slate-950">
          {formatMonthDayTitle(dateKey)}
        </h2>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
          {events.length}개
        </span>
      </div>

      {events.length > 0 ? (
        <div className="mt-4 grid gap-3">
          {events.map((event) => (
            <CalendarEventCard key={event.id} {...event} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-3xl bg-slate-50 px-4 py-6 text-center">
          <p className="text-base font-black text-slate-800">
            아직 등록된 일정이 없어요.
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            아래에서 바로 추가할 수 있어요.
          </p>
        </div>
      )}
    </section>
  );
}
