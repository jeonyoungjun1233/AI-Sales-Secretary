export const calendarEventTypes = [
  "예약",
  "리뷰 답글",
  "홍보글",
  "가게 관리",
] as const;

export type CalendarEventType = (typeof calendarEventTypes)[number];

export type CalendarEvent = {
  id: string;
  time: string;
  title: string;
  type: CalendarEventType;
  description: string;
};

export const todayCalendarEvents: CalendarEvent[] = [
  {
    id: "reservation-check",
    time: "오후 2시",
    title: "예약 문의 확인",
    type: "예약",
    description: "점심 이후 들어온 예약 문의를 먼저 정리해요.",
  },
  {
    id: "review-reply",
    time: "오후 5시",
    title: "리뷰 답글 정리",
    type: "리뷰 답글",
    description: "최근 리뷰 2개에 짧고 정중한 답글을 남겨요.",
  },
  {
    id: "promo-post",
    time: "오후 7시",
    title: "인스타 홍보글 올리기",
    type: "홍보글",
    description: "퇴근 시간대에 오늘의 소식을 한 번 더 알려요.",
  },
];

export const weeklyTasks = [
  "자주 묻는 예약 질문 3개 정리",
  "이번 주 인기 메뉴 홍보글 준비",
  "좋은 리뷰에 감사 답글 남기기",
  "영업시간과 대표 메뉴 다시 확인",
];
