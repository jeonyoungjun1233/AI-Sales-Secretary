export const calendarEventTypes = [
  "reservation",
  "review",
  "promo",
  "store",
] as const;

export type CalendarEventType = (typeof calendarEventTypes)[number];

export type CalendarEvent = {
  id: string;
  date: string;
  time: string;
  title: string;
  type: CalendarEventType;
  memo?: string;
};

export type CalendarDay = {
  dateKey: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
};

export const TODAY_DATE_KEY = "2026-06-10";

export const calendarEventTypeLabels: Record<CalendarEventType, string> = {
  reservation: "예약",
  review: "리뷰 답글",
  promo: "홍보글",
  store: "가게 관리",
};

export const calendarEventTypeBadges: Record<CalendarEventType, string> = {
  reservation: "bg-emerald-50 text-emerald-800",
  review: "bg-amber-50 text-amber-800",
  promo: "bg-rose-50 text-rose-800",
  store: "bg-sky-50 text-sky-800",
};

export const initialCalendarEvents: CalendarEvent[] = [
  {
    id: "reservation-check",
    date: "2026-06-10",
    time: "오후 2시",
    title: "예약 문의 확인",
    type: "reservation",
    memo: "저녁 예약 가능 여부 확인",
  },
  {
    id: "review-reply",
    date: "2026-06-10",
    time: "오후 5시",
    title: "리뷰 답글",
    type: "review",
    memo: "최근 리뷰 2개 정리",
  },
  {
    id: "promo-post",
    date: "2026-06-10",
    time: "오후 7시",
    title: "오늘 홍보글",
    type: "promo",
    memo: "퇴근 시간대에 올리기",
  },
  {
    id: "menu-check",
    date: "2026-06-12",
    time: "오전 11시",
    title: "대표 메뉴 확인",
    type: "store",
    memo: "가격과 설명 점검",
  },
  {
    id: "weekend-promo",
    date: "2026-06-13",
    time: "오후 1시",
    title: "주말 홍보글",
    type: "promo",
    memo: "예약 유도 문구 준비",
  },
  {
    id: "parking-faq",
    date: "2026-06-18",
    time: "오후 4시",
    title: "주차 질문 정리",
    type: "store",
    memo: "FAQ에 추가",
  },
];

export const todayCalendarEvents = getEventsForDate(
  initialCalendarEvents,
  TODAY_DATE_KEY,
);

export const weeklyTasks = [
  "예약 질문 3개 정리",
  "인기 메뉴 홍보글 준비",
  "좋은 리뷰에 답글 남기기",
  "영업시간 다시 확인",
];

export function makeDateKey(year: number, monthIndex: number, day: number) {
  const month = String(monthIndex + 1).padStart(2, "0");
  const date = String(day).padStart(2, "0");

  return `${year}-${month}-${date}`;
}

export function getDateParts(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);

  return {
    year,
    monthIndex: month - 1,
    day,
  };
}

export function formatMonthTitle(year: number, monthIndex: number) {
  return `${year}년 ${monthIndex + 1}월`;
}

export function formatMonthDayTitle(dateKey: string) {
  const { monthIndex, day } = getDateParts(dateKey);

  return `${monthIndex + 1}월 ${day}일 할 일`;
}

export function getEventsForDate(events: CalendarEvent[], dateKey: string) {
  return sortCalendarEvents(events.filter((event) => event.date === dateKey));
}

export function getUpcomingEvents(events: CalendarEvent[], limit = 3) {
  return sortCalendarEvents(
    events.filter((event) => event.date >= TODAY_DATE_KEY),
  ).slice(0, limit);
}

export function getEventCountForDate(events: CalendarEvent[], dateKey: string) {
  return events.filter((event) => event.date === dateKey).length;
}

export function getCalendarMonthDays(year: number, monthIndex: number) {
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, monthIndex, 0).getDate();
  const cells: CalendarDay[] = [];

  for (let index = firstWeekday - 1; index >= 0; index -= 1) {
    const day = daysInPreviousMonth - index;
    const previousMonth = monthIndex === 0 ? 11 : monthIndex - 1;
    const previousYear = monthIndex === 0 ? year - 1 : year;
    const dateKey = makeDateKey(previousYear, previousMonth, day);

    cells.push({
      dateKey,
      day,
      isCurrentMonth: false,
      isToday: dateKey === TODAY_DATE_KEY,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = makeDateKey(year, monthIndex, day);

    cells.push({
      dateKey,
      day,
      isCurrentMonth: true,
      isToday: dateKey === TODAY_DATE_KEY,
    });
  }

  let nextDay = 1;

  while (cells.length < 42) {
    const nextMonth = monthIndex === 11 ? 0 : monthIndex + 1;
    const nextYear = monthIndex === 11 ? year + 1 : year;
    const dateKey = makeDateKey(nextYear, nextMonth, nextDay);

    cells.push({
      dateKey,
      day: nextDay,
      isCurrentMonth: false,
      isToday: dateKey === TODAY_DATE_KEY,
    });

    nextDay += 1;
  }

  return cells;
}

function sortCalendarEvents(events: CalendarEvent[]) {
  return [...events].sort((a, b) => {
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date);
    }

    return a.time.localeCompare(b.time, "ko");
  });
}
