import { CalendarDateCell } from "@/components/CalendarDateCell";
import {
  getCalendarMonthDays,
  getEventCountForDate,
  type CalendarEvent,
} from "@/lib/mockCalendar";

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

type CalendarMonthGridProps = {
  events: CalendarEvent[];
  monthIndex: number;
  onSelectDate: (dateKey: string) => void;
  selectedDate: string;
  year: number;
};

export function CalendarMonthGrid({
  events,
  monthIndex,
  onSelectDate,
  selectedDate,
  year,
}: CalendarMonthGridProps) {
  const days = getCalendarMonthDays(year, monthIndex);

  return (
    <section className="rounded-[1.75rem] bg-white p-4 shadow-lg shadow-slate-950/5">
      <div className="grid grid-cols-7 gap-1.5 text-center text-[0.72rem] font-black text-slate-400">
        {weekdays.map((weekday) => (
          <span className="py-1" key={weekday}>
            {weekday}
          </span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1.5">
        {days.map((day) => (
          <CalendarDateCell
            dateKey={day.dateKey}
            day={day.day}
            eventCount={getEventCountForDate(events, day.dateKey)}
            isCurrentMonth={day.isCurrentMonth}
            isSelected={selectedDate === day.dateKey}
            isToday={day.isToday}
            key={day.dateKey}
            onSelect={() => onSelectDate(day.dateKey)}
          />
        ))}
      </div>
    </section>
  );
}
