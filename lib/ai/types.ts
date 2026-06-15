export type GenerateType = "inquiry" | "review" | "promo" | "faq";

export type GenerateTone = "friendly" | "short" | "cute" | "premium";

export type InquiryCategory =
  | "reservation"
  | "hours"
  | "price"
  | "parking"
  | "menu"
  | "location"
  | "complaint"
  | "other";

export type ReviewCategory = "positive" | "negative" | "mixed";

export type PromoPurpose =
  | "reservation"
  | "event"
  | "new-menu"
  | "rainy-day"
  | "closing-soon";

export type BusinessType =
  | "cafe"
  | "restaurant"
  | "nail"
  | "hair"
  | "academy"
  | "pt";

export type PromoChannel = "instagram" | "naver-place" | "kakao-channel";

export type GenerateRequest = {
  type: GenerateType;
  input: string;
  tone?: GenerateTone;
  businessType?: BusinessType;
  channel?: PromoChannel;
  category?: InquiryCategory | ReviewCategory | PromoPurpose | string;
  context?: GenerateContext;
  usage?: {
    planId?: string;
    monthKey?: string;
    monthlyGenerationCount?: number;
    monthlyGenerationLimit?: number;
    remainingGenerations?: number;
    canGenerate?: boolean;
    upgradeMessage?: string;
  };
};

export type GenerateContext = {
  businessProfile?: {
    businessName?: string;
    businessType?: string;
    openingHours?: string;
    address?: string;
    phone?: string;
    mainMenu?: string;
    tone?: string;
  } | null;
  faqs?: {
    question: string;
    answer: string;
  }[];
  todayEvents?: {
    title: string;
    time: string;
    type: string;
    memo?: string;
  }[];
  recentGenerations?: {
    type: GenerateType;
    title: string;
    output: string;
  }[];
};

export type GenerateResponse = {
  text: string;
  savedMinutes: number;
  title: string;
  warnings: string[];
};

export type AiProvider = {
  generate(request: GenerateRequest): Promise<GenerateResponse>;
};

export type SelectOption<T extends string> = {
  value: T;
  label: string;
  description: string;
};

export const toneOptions: SelectOption<GenerateTone>[] = [
  {
    value: "friendly",
    label: "친절한 말투",
    description: "부드럽고 자세하게",
  },
  {
    value: "short",
    label: "짧고 깔끔한 말투",
    description: "핵심만 빠르게",
  },
  {
    value: "cute",
    label: "밝고 귀여운 말투",
    description: "가볍고 친근하게",
  },
  {
    value: "premium",
    label: "고급스러운 말투",
    description: "정중하고 차분하게",
  },
];

export const inquiryCategoryOptions: SelectOption<InquiryCategory>[] = [
  {
    value: "reservation",
    label: "예약 문의",
    description: "날짜, 시간, 인원 안내",
  },
  {
    value: "hours",
    label: "영업시간 문의",
    description: "오늘 방문 가능 여부",
  },
  {
    value: "price",
    label: "가격 문의",
    description: "가격과 이용 방법 안내",
  },
  {
    value: "parking",
    label: "주차 문의",
    description: "주차 위치와 이동 안내",
  },
  {
    value: "menu",
    label: "메뉴 문의",
    description: "대표 메뉴와 준비 여부",
  },
  {
    value: "location",
    label: "위치 문의",
    description: "주소와 찾아오는 길",
  },
  {
    value: "complaint",
    label: "불편 문의",
    description: "사과와 개선 약속",
  },
  {
    value: "other",
    label: "기타 문의",
    description: "상황에 맞는 기본 답장",
  },
];

export const reviewCategoryOptions: SelectOption<ReviewCategory>[] = [
  {
    value: "positive",
    label: "좋은 리뷰",
    description: "감사 인사와 재방문 유도",
  },
  {
    value: "negative",
    label: "불만 리뷰",
    description: "사과와 개선 의지",
  },
  {
    value: "mixed",
    label: "애매한 리뷰",
    description: "감사와 아쉬운 점 보완",
  },
];

export const promoPurposeOptions: SelectOption<PromoPurpose>[] = [
  {
    value: "reservation",
    label: "예약 유도",
    description: "비어 있는 시간 알리기",
  },
  {
    value: "event",
    label: "이벤트 홍보",
    description: "혜택과 소식 전하기",
  },
  {
    value: "new-menu",
    label: "신메뉴 홍보",
    description: "새 메뉴나 서비스 소개",
  },
  {
    value: "rainy-day",
    label: "비 오는 날 홍보",
    description: "날씨에 맞는 방문 유도",
  },
  {
    value: "closing-soon",
    label: "마감 임박 홍보",
    description: "오늘 남은 시간 안내",
  },
];

export const businessTypeOptions: SelectOption<BusinessType>[] = [
  { value: "cafe", label: "카페", description: "음료와 디저트" },
  { value: "restaurant", label: "음식점", description: "식사와 메뉴" },
  { value: "nail", label: "네일샵", description: "손끝 관리" },
  { value: "hair", label: "미용실", description: "헤어 관리" },
  { value: "academy", label: "학원", description: "상담과 수업" },
  { value: "pt", label: "PT샵", description: "운동과 상담" },
];

export const promoChannelOptions: SelectOption<PromoChannel>[] = [
  {
    value: "instagram",
    label: "인스타그램",
    description: "짧은 소개와 해시태그",
  },
  {
    value: "naver-place",
    label: "네이버 플레이스",
    description: "방문 전 안내 중심",
  },
  {
    value: "kakao-channel",
    label: "카카오톡 채널",
    description: "문의 유도 중심",
  },
];
