import type { GenerateTone, GenerateType } from "@/lib/ai/types";
import type {
  StoredBusinessProfile,
  StoredCalendarEvent,
  StoredFaq,
  StoredGeneration,
} from "@/lib/storage/types";

export type QuickStartIndustry =
  | "cafe"
  | "restaurant"
  | "nail"
  | "hair"
  | "academy"
  | "pt";

export type QuickStartTemplate = {
  id: QuickStartIndustry;
  label: string;
  description: string;
  businessProfile: Omit<StoredBusinessProfile, "updatedAt">;
  faqs: Array<Omit<StoredFaq, "id" | "createdAt">>;
  calendarEvents: Array<
    Omit<StoredCalendarEvent, "id" | "date" | "createdAt"> & {
      dayOffset: number;
    }
  >;
  generationHistory: Array<
    Omit<StoredGeneration, "id" | "createdAt" | "copiedCount">
  >;
  recommendedFirstAction: string;
};

export const quickStartTemplateOptions: Array<
  Pick<QuickStartTemplate, "id" | "label" | "description" | "recommendedFirstAction">
> = [
  {
    id: "cafe",
    label: "카페",
    description: "음료, 디저트, 예약 문의",
    recommendedFirstAction: "비 오는 날 따뜻한 라떼 홍보글",
  },
  {
    id: "restaurant",
    label: "음식점",
    description: "예약, 포장, 리뷰 답글",
    recommendedFirstAction: "저녁 예약 유도 홍보글",
  },
  {
    id: "nail",
    label: "네일샵",
    description: "예약 시간, 가격, 시술 안내",
    recommendedFirstAction: "이번 주 예약 가능 시간 안내",
  },
  {
    id: "hair",
    label: "미용실",
    description: "주말 예약, 시술 후기",
    recommendedFirstAction: "주말 커트 예약 안내",
  },
  {
    id: "academy",
    label: "학원",
    description: "상담, 수업 시간, 레벨 테스트",
    recommendedFirstAction: "신규 상담 문의 답장",
  },
  {
    id: "pt",
    label: "PT샵",
    description: "체험 수업, 상담, 후기",
    recommendedFirstAction: "체험 수업 문의 답장",
  },
];

const templates: Record<QuickStartIndustry, QuickStartTemplate> = {
  cafe: {
    id: "cafe",
    label: "카페",
    description: "음료, 디저트, 예약 문의",
    businessProfile: {
      businessName: "연남동 초록카페",
      businessType: "카페",
      openingHours: "매일 10:00 - 21:00",
      address: "서울 마포구 성미산로",
      phone: "02-000-0000",
      mainMenu: "아메리카노, 바닐라라떼, 딸기케이크",
      tone: "친절한 말투",
    },
    faqs: [
      {
        question: "영업시간이 어떻게 되나요?",
        answer: "매일 오전 10시부터 오후 9시까지 운영합니다.",
      },
      {
        question: "포장 가능한가요?",
        answer: "음료와 디저트 모두 포장 가능합니다.",
      },
      {
        question: "주차 가능한가요?",
        answer: "매장 앞 주차는 어렵고, 근처 공영주차장을 이용해 주세요.",
      },
      {
        question: "반려동물 동반 가능한가요?",
        answer: "야외 좌석에서는 반려동물과 함께 이용하실 수 있습니다.",
      },
    ],
    calendarEvents: [
      {
        dayOffset: 0,
        title: "오후 디저트 홍보글",
        time: "오후 2시",
        type: "promo",
        memo: "딸기케이크와 라떼 세트 소개",
      },
      {
        dayOffset: 0,
        title: "리뷰 답글 정리",
        time: "오후 5시",
        type: "review",
        memo: "최근 좋은 리뷰 2개 답글",
      },
      {
        dayOffset: 1,
        title: "주말 예약 문의 확인",
        time: "오전 11시",
        type: "reservation",
        memo: "4인 이상 방문 문의 답장",
      },
    ],
    generationHistory: [
      {
        type: "inquiry",
        title: "저녁 방문 문의 답장",
        input: "오늘 저녁에 4명 자리 있나요?",
        output:
          "안녕하세요. 문의 주셔서 감사합니다. 오늘 저녁 4명 방문 가능 여부를 확인해드릴게요. 원하시는 시간대를 알려주시면 더 빠르게 안내드리겠습니다.",
        tone: "friendly",
        category: "reservation",
        savedMinutes: 5,
      },
      {
        type: "promo",
        title: "딸기케이크 홍보글",
        input: "딸기케이크가 오늘 준비됐어요.",
        output:
          "오늘 초록카페에 딸기케이크가 준비됐어요. 바닐라라떼와 함께 즐기기 좋아요. 달콤한 오후가 필요할 때 들러주세요.",
        tone: "friendly",
        category: "social",
        savedMinutes: 10,
      },
    ],
    recommendedFirstAction: "비 오는 날 따뜻한 라떼 홍보글",
  },
  restaurant: {
    id: "restaurant",
    label: "음식점",
    description: "예약, 포장, 리뷰 답글",
    businessProfile: {
      businessName: "성수 따뜻한식당",
      businessType: "음식점",
      openingHours: "매일 11:30 - 22:00",
      address: "서울 성동구 성수이로",
      phone: "02-111-1111",
      mainMenu: "제육정식, 된장찌개, 계절반찬",
      tone: "친절한 말투",
    },
    faqs: [
      {
        question: "예약 가능한가요?",
        answer: "가능합니다. 방문 날짜, 시간, 인원을 알려주시면 확인해드릴게요.",
      },
      {
        question: "포장 가능한가요?",
        answer: "일부 메뉴는 포장 가능합니다. 방문 전 문의 주시면 준비해드릴게요.",
      },
      {
        question: "브레이크타임이 있나요?",
        answer: "오후 3시부터 5시까지는 쉬는 시간입니다.",
      },
    ],
    calendarEvents: [
      {
        dayOffset: 0,
        title: "저녁 예약 문의 답장",
        time: "오후 3시",
        type: "reservation",
        memo: "6명 단체석 가능 여부 확인",
      },
      {
        dayOffset: 0,
        title: "저녁 메뉴 홍보글",
        time: "오후 5시",
        type: "promo",
        memo: "퇴근길 식사 유도",
      },
    ],
    generationHistory: [
      {
        type: "review",
        title: "좋은 리뷰 답글",
        input: "반찬이 맛있고 직원분들이 친절했어요.",
        output:
          "소중한 리뷰 감사합니다. 반찬과 응대 모두 만족하셨다니 큰 힘이 됩니다. 다음 방문에도 따뜻한 식사로 준비하겠습니다.",
        tone: "friendly",
        category: "positive",
        savedMinutes: 6,
      },
      {
        type: "promo",
        title: "저녁 예약 홍보글",
        input: "오늘 저녁 자리가 조금 남았어요.",
        output:
          "오늘 저녁 따뜻한 한 끼가 필요하신가요? 성수 따뜻한식당에서 정성껏 준비한 집밥 메뉴로 편하게 식사하세요.",
        tone: "friendly",
        category: "reservation",
        savedMinutes: 10,
      },
    ],
    recommendedFirstAction: "저녁 예약 유도 홍보글",
  },
  nail: {
    id: "nail",
    label: "네일샵",
    description: "예약 시간, 가격, 시술 안내",
    businessProfile: {
      businessName: "무드네일",
      businessType: "네일샵",
      openingHours: "화-일 11:00 - 20:00",
      address: "서울 강남구 논현로",
      phone: "02-222-2222",
      mainMenu: "젤네일, 이달의 아트, 케어",
      tone: "밝고 귀여운 말투",
    },
    faqs: [
      {
        question: "예약 가능한 시간이 있나요?",
        answer: "원하시는 날짜와 시간대를 알려주시면 가능한 시간을 안내드릴게요.",
      },
      {
        question: "시술 시간은 얼마나 걸리나요?",
        answer: "기본 젤네일은 보통 1시간 30분 정도 소요됩니다.",
      },
      {
        question: "주차 가능한가요?",
        answer: "건물 주차장을 이용하실 수 있습니다.",
      },
    ],
    calendarEvents: [
      {
        dayOffset: 0,
        title: "예약 가능 시간 안내",
        time: "오후 1시",
        type: "reservation",
        memo: "이번 주 빈 시간 공지",
      },
      {
        dayOffset: 1,
        title: "이달의 아트 홍보글",
        time: "오후 6시",
        type: "promo",
        memo: "신규 디자인 소개",
      },
    ],
    generationHistory: [
      {
        type: "inquiry",
        title: "예약 시간 문의 답장",
        input: "이번 주 토요일 예약 가능한가요?",
        output:
          "안녕하세요. 문의 주셔서 감사합니다. 토요일 예약 가능 시간을 확인해드릴게요. 원하시는 시간대와 시술 종류를 알려주세요.",
        tone: "cute",
        category: "reservation",
        savedMinutes: 5,
      },
      {
        type: "promo",
        title: "이달의 아트 홍보글",
        input: "이번 달 새 디자인을 보여주고 싶어요.",
        output:
          "이번 달 무드네일의 새 아트가 준비됐어요. 손끝 분위기를 바꾸고 싶으셨다면 이번 주 예약 가능 시간을 확인해보세요.",
        tone: "cute",
        category: "event",
        savedMinutes: 10,
      },
    ],
    recommendedFirstAction: "이번 주 예약 가능 시간 안내",
  },
  hair: {
    id: "hair",
    label: "미용실",
    description: "주말 예약, 시술 후기",
    businessProfile: {
      businessName: "라움헤어",
      businessType: "미용실",
      openingHours: "매일 10:30 - 20:30",
      address: "서울 송파구 백제고분로",
      phone: "02-333-3333",
      mainMenu: "커트, 염색, 클리닉",
      tone: "고급스러운 말투",
    },
    faqs: [
      {
        question: "주말 예약 가능한가요?",
        answer: "가능한 시간대를 확인해드리겠습니다. 원하시는 날짜를 알려주세요.",
      },
      {
        question: "커트 가격은 얼마인가요?",
        answer: "디자이너별로 가격이 다르니 예약 시 안내드리겠습니다.",
      },
      {
        question: "염색 시간은 얼마나 걸리나요?",
        answer: "모발 상태와 시술 범위에 따라 보통 2시간 이상 소요됩니다.",
      },
    ],
    calendarEvents: [
      {
        dayOffset: 0,
        title: "주말 예약 안내",
        time: "오후 12시",
        type: "reservation",
        memo: "남은 예약 시간 정리",
      },
      {
        dayOffset: 2,
        title: "시술 후기 답글",
        time: "오후 4시",
        type: "review",
        memo: "클리닉 후기 답글",
      },
    ],
    generationHistory: [
      {
        type: "review",
        title: "시술 후기 답글",
        input: "염색 색이 마음에 들어요. 설명도 친절했어요.",
        output:
          "소중한 후기 감사합니다. 컬러가 만족스러우셨다니 기쁩니다. 다음 방문에도 모발 상태에 맞춰 세심하게 안내드리겠습니다.",
        tone: "premium",
        category: "positive",
        savedMinutes: 6,
      },
      {
        type: "promo",
        title: "주말 예약 안내글",
        input: "이번 주말 예약 가능 시간이 있어요.",
        output:
          "이번 주말 라움헤어 예약 가능 시간이 일부 남아 있습니다. 커트와 클리닉을 계획 중이셨다면 편하게 문의 주세요.",
        tone: "premium",
        category: "reservation",
        savedMinutes: 10,
      },
    ],
    recommendedFirstAction: "주말 커트 예약 안내",
  },
  academy: {
    id: "academy",
    label: "학원",
    description: "상담, 수업 시간, 레벨 테스트",
    businessProfile: {
      businessName: "바른성장학원",
      businessType: "학원",
      openingHours: "월-금 13:00 - 21:00",
      address: "서울 양천구 목동로",
      phone: "02-444-4444",
      mainMenu: "초등 수학, 중등 영어, 상담 수업",
      tone: "친절한 말투",
    },
    faqs: [
      {
        question: "상담 예약 가능한가요?",
        answer: "가능합니다. 학생 학년과 원하시는 상담 시간을 알려주세요.",
      },
      {
        question: "레벨 테스트가 있나요?",
        answer: "네, 상담 전 간단한 레벨 확인을 진행합니다.",
      },
      {
        question: "수업 시간표는 어떻게 되나요?",
        answer: "학년과 과목에 따라 다르며 상담 시 자세히 안내드립니다.",
      },
    ],
    calendarEvents: [
      {
        dayOffset: 0,
        title: "상담 문의 답장",
        time: "오후 2시",
        type: "reservation",
        memo: "초등 수학 상담 문의",
      },
      {
        dayOffset: 1,
        title: "신규 수강생 모집글",
        time: "오후 7시",
        type: "promo",
        memo: "학부모 대상 안내",
      },
    ],
    generationHistory: [
      {
        type: "inquiry",
        title: "상담 문의 답장",
        input: "초등 5학년 수학 상담 가능한가요?",
        output:
          "안녕하세요. 초등 5학년 수학 상담 가능합니다. 학생의 현재 학습 상황과 원하시는 상담 시간을 알려주시면 일정 안내드리겠습니다.",
        tone: "friendly",
        category: "consulting",
        savedMinutes: 5,
      },
      {
        type: "promo",
        title: "신규 상담 홍보글",
        input: "신규 수강생 상담을 받고 싶어요.",
        output:
          "새 학기 학습 흐름이 걱정된다면 바른성장학원 상담을 받아보세요. 학생 수준에 맞춰 필요한 과목과 수업 방향을 안내드립니다.",
        tone: "friendly",
        category: "lead",
        savedMinutes: 10,
      },
    ],
    recommendedFirstAction: "신규 상담 문의 답장",
  },
  pt: {
    id: "pt",
    label: "PT샵",
    description: "체험 수업, 상담, 후기",
    businessProfile: {
      businessName: "핏온 PT",
      businessType: "PT샵",
      openingHours: "평일 07:00 - 22:00",
      address: "서울 마포구 월드컵북로",
      phone: "02-555-5555",
      mainMenu: "1:1 PT, 체형 분석, 체험 수업",
      tone: "짧고 깔끔한 말투",
    },
    faqs: [
      {
        question: "체험 수업 가능한가요?",
        answer: "가능합니다. 원하시는 날짜와 운동 목표를 알려주세요.",
      },
      {
        question: "상담은 얼마나 걸리나요?",
        answer: "체형 확인과 목표 상담까지 보통 30분 정도 소요됩니다.",
      },
      {
        question: "운동복을 가져가야 하나요?",
        answer: "편한 운동복과 실내용 운동화를 준비해 주세요.",
      },
    ],
    calendarEvents: [
      {
        dayOffset: 0,
        title: "체험 수업 문의 답장",
        time: "오전 10시",
        type: "reservation",
        memo: "첫 방문 문의 안내",
      },
      {
        dayOffset: 1,
        title: "운동 후기 답글",
        time: "오후 8시",
        type: "review",
        memo: "체형 분석 후기 답글",
      },
    ],
    generationHistory: [
      {
        type: "inquiry",
        title: "체험 수업 문의 답장",
        input: "처음인데 체험 수업 가능한가요?",
        output:
          "네, 체험 수업 가능합니다. 원하시는 날짜와 시간, 운동 목표를 알려주시면 가능한 일정 안내드리겠습니다.",
        tone: "short",
        category: "trial",
        savedMinutes: 5,
      },
      {
        type: "promo",
        title: "체험 수업 안내글",
        input: "처음 오는 분에게 체험 수업을 안내하고 싶어요.",
        output:
          "운동을 시작하고 싶지만 막막하다면 핏온 PT 체험 수업부터 시작해보세요. 체형과 목표에 맞춰 첫 방향을 잡아드립니다.",
        tone: "short",
        category: "lead",
        savedMinutes: 10,
      },
    ],
    recommendedFirstAction: "체험 수업 문의 답장",
  },
};

export function buildQuickStartTemplate(
  industry: QuickStartIndustry,
): {
  id: QuickStartIndustry;
  label: string;
  description: string;
  businessProfile: StoredBusinessProfile;
  faqs: StoredFaq[];
  calendarEvents: StoredCalendarEvent[];
  generationHistory: StoredGeneration[];
  recommendedFirstAction: string;
} {
  const template = templates[industry];
  const now = new Date();
  const stamp = `${industry}-${now.getTime()}`;
  const createdAt = now.toISOString();

  return {
    id: template.id,
    label: template.label,
    description: template.description,
    businessProfile: {
      ...template.businessProfile,
      updatedAt: createdAt,
    },
    faqs: template.faqs.map((faq, index) => ({
      ...faq,
      id: `quick-${stamp}-faq-${index + 1}`,
      createdAt,
    })),
    calendarEvents: template.calendarEvents.map((event, index) => ({
      id: `quick-${stamp}-event-${index + 1}`,
      title: event.title,
      date: getDateKey(event.dayOffset),
      time: event.time,
      type: event.type,
      memo: event.memo,
      createdAt,
    })),
    generationHistory: template.generationHistory.map((generation, index) => ({
      ...generation,
      id: `quick-${stamp}-generation-${index + 1}`,
      type: generation.type as GenerateType,
      tone: generation.tone as GenerateTone | undefined,
      createdAt,
      copiedCount: 0,
    })),
    recommendedFirstAction: template.recommendedFirstAction,
  };
}

function getDateKey(dayOffset: number) {
  const date = new Date();

  date.setDate(date.getDate() + dayOffset);

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

export function getQuickStartTemplateOption(industry: QuickStartIndustry) {
  return quickStartTemplateOptions.find((option) => option.id === industry);
}

export function isQuickStartIndustry(value: string): value is QuickStartIndustry {
  return value in templates;
}
