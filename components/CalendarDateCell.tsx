type CalendarDateCellProps = {
  dateKey: string;
  day: number;
  eventCount: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  onSelect: () => void;
};

export function CalendarDateCell({
  dateKey,
  day,
  eventCount,
  isCurrentMonth,
  isSelected,
  isToday,
  onSelect,
}: CalendarDateCellProps) {
  const cellTone = isSelected
    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
    : isToday
      ? "bg-emerald-50 text-emerald-800"
      : "bg-white text-slate-800 hover:bg-slate-50";

  return (
    <button
      aria-label={`${dateKey} 선택`}
      className={`relative flex aspect-square min-h-11 flex-col items-center justify-center rounded-2xl text-sm font-black transition active:scale-[0.98] ${cellTone} ${
        isCurrentMonth ? "" : "opacity-35"
      }`}
      onClick={onSelect}
      type="button"
    >
      <span>{day}</span>
      {eventCount > 0 ? (
        <span
          className={`mt-1 h-1.5 w-1.5 rounded-full ${
            isSelected ? "bg-white" : "bg-emerald-500"
          }`}
          aria-hidden
        />
      ) : null}
    </button>
  );
}
