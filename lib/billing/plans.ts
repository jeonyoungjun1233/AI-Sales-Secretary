export type BillingPlanId = "free" | "basic" | "pro" | "business";

export type BillingPlan = {
  id: BillingPlanId;
  name: string;
  priceLabel: string;
  monthlyGenerationLimit: number;
  recommendedFor: string;
  features: string[];
  ctaLabel: string;
  highlighted: boolean;
};

export const billingPlans: BillingPlan[] = [
  {
    id: "free",
    name: "무료 체험",
    priceLabel: "0원",
    monthlyGenerationLimit: 10,
    recommendedFor: "처음 써보는 사장님",
    features: [
      "월 생성 10회",
      "가게 1개",
      "최근 기록 5개",
      "기본 답장/리뷰/홍보글 생성",
    ],
    ctaLabel: "무료로 써보기",
    highlighted: false,
  },
  {
    id: "basic",
    name: "베이직",
    priceLabel: "월 9,900원",
    monthlyGenerationLimit: 300,
    recommendedFor: "작은 가게 1곳",
    features: [
      "월 생성 300회",
      "생성 기록 저장",
      "FAQ와 일정 저장",
      "가게 정보 기반 답변",
    ],
    ctaLabel: "출시 알림 받기",
    highlighted: false,
  },
  {
    id: "pro",
    name: "프로",
    priceLabel: "월 29,000원",
    monthlyGenerationLimit: 2000,
    recommendedFor: "매일 홍보가 필요한 가게",
    features: [
      "월 생성 2,000회",
      "업종별 고급 템플릿",
      "오늘 매출 액션",
      "주간 홍보 캘린더",
      "고급 말투 설정",
    ],
    ctaLabel: "준비 중",
    highlighted: true,
  },
  {
    id: "business",
    name: "비즈니스",
    priceLabel: "월 59,000원",
    monthlyGenerationLimit: 5000,
    recommendedFor: "여러 매장 운영",
    features: [
      "여러 매장 관리",
      "직원 계정",
      "매장별 일정",
      "우선 지원",
      "향후 자동 연동",
    ],
    ctaLabel: "상담 준비 중",
    highlighted: false,
  },
];

export function getPlanById(id?: string | null) {
  return billingPlans.find((plan) => plan.id === id) ?? billingPlans[0];
}
