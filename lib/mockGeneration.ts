export const replyTones = [
  "친절한 말투",
  "짧고 깔끔한 말투",
  "밝고 귀여운 말투",
  "고급스러운 말투",
] as const;

export const inquiryTypes = [
  "예약 문의",
  "영업시간 문의",
  "가격 문의",
  "위치 문의",
  "불만 문의",
  "기타 문의",
] as const;

export const reviewTypes = ["좋은 리뷰", "불만 리뷰", "애매한 리뷰"] as const;

export const promoPurposes = [
  "예약 유도",
  "이벤트 홍보",
  "신메뉴 홍보",
  "비 오는 날 홍보",
  "마감 임박 홍보",
] as const;

export const businessTypes = [
  "카페",
  "음식점",
  "네일샵",
  "미용실",
  "학원",
  "PT샵",
] as const;

export const promoChannels = [
  "인스타그램",
  "네이버 플레이스",
  "카카오톡 채널",
] as const;

export type ReplyTone = (typeof replyTones)[number];
export type InquiryType = (typeof inquiryTypes)[number];
export type ReviewType = (typeof reviewTypes)[number];
export type PromoPurpose = (typeof promoPurposes)[number];
export type BusinessType = (typeof businessTypes)[number];
export type PromoChannel = (typeof promoChannels)[number];

type InquiryInput = {
  question: string;
  tone: ReplyTone;
  inquiryType: InquiryType;
};

type ReviewInput = {
  review: string;
  tone: ReplyTone;
  reviewType: ReviewType;
};

type PromoInput = {
  purpose: PromoPurpose;
  businessType: BusinessType;
  channel: PromoChannel;
  extraNote?: string;
};

const inquiryReplies: Record<InquiryType, Record<ReplyTone, string>> = {
  "예약 문의": {
    "친절한 말투":
      "문의 주셔서 감사합니다. 원하시는 날짜와 시간, 방문 인원을 알려주시면 가능한 시간을 확인해서 바로 안내드리겠습니다.",
    "짧고 깔끔한 말투":
      "문의 감사합니다. 원하시는 날짜, 시간, 인원을 보내주시면 예약 가능 여부를 바로 확인해드리겠습니다.",
    "밝고 귀여운 말투":
      "문의 주셔서 감사합니다 :) 원하시는 날짜와 시간, 인원을 알려주시면 예약 가능 여부를 빠르게 확인해드릴게요.",
    "고급스러운 말투":
      "문의 주셔서 감사합니다. 원하시는 일정과 방문 인원을 남겨주시면 예약 가능 여부를 정중히 확인해 안내드리겠습니다.",
  },
  "영업시간 문의": {
    "친절한 말투":
      "문의 주셔서 감사합니다. 오늘 영업 여부와 이용 가능 시간은 매장 상황을 확인한 뒤 정확히 안내드리겠습니다.",
    "짧고 깔끔한 말투":
      "문의 감사합니다. 오늘 영업시간 확인 후 바로 안내드리겠습니다.",
    "밝고 귀여운 말투":
      "문의 감사합니다 :) 오늘 이용 가능한 시간을 확인해서 편하게 오실 수 있도록 안내드릴게요.",
    "고급스러운 말투":
      "문의 주셔서 감사합니다. 방문에 불편함이 없도록 영업시간을 확인해 정확히 안내드리겠습니다.",
  },
  "가격 문의": {
    "친절한 말투":
      "문의 주셔서 감사합니다. 원하시는 상품이나 서비스명을 알려주시면 현재 기준 가격과 이용 방법을 함께 안내드리겠습니다.",
    "짧고 깔끔한 말투":
      "문의 감사합니다. 원하시는 메뉴나 서비스를 알려주시면 가격을 확인해드리겠습니다.",
    "밝고 귀여운 말투":
      "문의 감사합니다 :) 어떤 메뉴나 서비스가 궁금하신지 알려주시면 가격을 바로 안내드릴게요.",
    "고급스러운 말투":
      "문의 주셔서 감사합니다. 관심 있으신 상품이나 서비스를 알려주시면 가격과 이용 안내를 차분히 도와드리겠습니다.",
  },
  "위치 문의": {
    "친절한 말투":
      "문의 주셔서 감사합니다. 매장 위치와 오시는 길을 편하게 확인하실 수 있도록 주소와 가까운 길 안내를 함께 보내드리겠습니다.",
    "짧고 깔끔한 말투":
      "문의 감사합니다. 매장 주소와 찾아오시는 길을 바로 안내드리겠습니다.",
    "밝고 귀여운 말투":
      "문의 감사합니다 :) 헤매지 않으시도록 매장 위치와 가까운 길을 함께 안내드릴게요.",
    "고급스러운 말투":
      "문의 주셔서 감사합니다. 방문에 불편함이 없도록 매장 위치와 이동 안내를 정중히 도와드리겠습니다.",
  },
  "불만 문의": {
    "친절한 말투":
      "불편을 드려 죄송합니다. 남겨주신 내용을 확인한 뒤 같은 불편이 반복되지 않도록 꼼꼼히 살펴보겠습니다.",
    "짧고 깔끔한 말투":
      "불편을 드려 죄송합니다. 내용을 확인하고 개선할 부분을 바로 살펴보겠습니다.",
    "밝고 귀여운 말투":
      "불편을 드려 정말 죄송합니다. 말씀해주신 부분은 놓치지 않고 확인해서 더 나아지도록 챙기겠습니다.",
    "고급스러운 말투":
      "불편을 드린 점 진심으로 사과드립니다. 남겨주신 의견은 신중히 확인하고 개선 방향을 살펴보겠습니다.",
  },
  "기타 문의": {
    "친절한 말투":
      "문의 주셔서 감사합니다. 남겨주신 내용을 확인한 뒤 가장 정확한 안내를 드릴 수 있도록 도와드리겠습니다.",
    "짧고 깔끔한 말투":
      "문의 감사합니다. 내용 확인 후 바로 안내드리겠습니다.",
    "밝고 귀여운 말투":
      "문의 감사합니다 :) 남겨주신 내용을 확인하고 편하게 안내드릴게요.",
    "고급스러운 말투":
      "문의 주셔서 감사합니다. 남겨주신 내용을 확인한 뒤 정중하고 정확하게 안내드리겠습니다.",
  },
};

const reviewReplies: Record<ReviewType, Record<ReplyTone, string>> = {
  "좋은 리뷰": {
    "친절한 말투":
      "소중한 리뷰 남겨주셔서 감사합니다. 만족스럽게 이용해주셨다니 정말 기쁩니다. 다음 방문 때도 좋은 경험을 드릴 수 있도록 정성껏 준비하겠습니다.",
    "짧고 깔끔한 말투":
      "좋은 리뷰 감사합니다. 다음에도 만족하실 수 있도록 정성껏 준비하겠습니다.",
    "밝고 귀여운 말투":
      "따뜻한 리뷰 정말 감사합니다 :) 다음에 오실 때도 기분 좋은 시간 보내실 수 있도록 열심히 준비할게요.",
    "고급스러운 말투":
      "정성스러운 리뷰에 깊이 감사드립니다. 다음 방문에서도 변함없이 만족스러운 경험을 드릴 수 있도록 세심하게 준비하겠습니다.",
  },
  "불만 리뷰": {
    "친절한 말투":
      "기대하신 만큼 만족을 드리지 못해 죄송합니다. 남겨주신 의견은 꼼꼼히 확인하고 더 나은 이용 경험을 드릴 수 있도록 개선하겠습니다.",
    "짧고 깔끔한 말투":
      "불편을 드려 죄송합니다. 남겨주신 의견을 확인하고 개선하겠습니다.",
    "밝고 귀여운 말투":
      "아쉬운 경험을 드려 죄송합니다. 말씀해주신 부분은 꼭 확인해서 다음에는 더 좋은 모습 보여드리겠습니다.",
    "고급스러운 말투":
      "만족을 드리지 못한 점 진심으로 사과드립니다. 귀한 의견을 바탕으로 서비스 품질을 더 세심하게 살피겠습니다.",
  },
  "애매한 리뷰": {
    "친절한 말투":
      "솔직한 후기 남겨주셔서 감사합니다. 좋았던 점은 더 잘 살리고, 아쉬웠던 부분은 더 나아질 수 있도록 꼼꼼히 살펴보겠습니다.",
    "짧고 깔끔한 말투":
      "후기 감사합니다. 좋았던 점과 아쉬운 점 모두 확인하고 더 나아지겠습니다.",
    "밝고 귀여운 말투":
      "솔직한 후기 감사합니다 :) 좋았던 부분은 더 살리고 아쉬운 부분은 더 챙겨보겠습니다.",
    "고급스러운 말투":
      "소중한 후기 감사드립니다. 남겨주신 의견을 차분히 살펴 더 만족스러운 경험을 드릴 수 있도록 개선하겠습니다.",
  },
};

const businessCopy: Record<BusinessType, string> = {
  카페: "향 좋은 음료와 디저트",
  음식점: "든든하고 따뜻한 한 끼",
  네일샵: "기분 좋아지는 손끝 관리",
  미용실: "분위기를 바꾸는 헤어 관리",
  학원: "꾸준한 성장을 돕는 수업",
  PT샵: "몸에 맞춘 운동 루틴",
};

const purposeCopy: Record<PromoPurpose, string> = {
  "예약 유도": "이번 주 예약 가능한 시간이 조금 남아 있습니다.",
  "이벤트 홍보": "오늘 방문하시는 분들을 위해 작은 혜택을 준비했습니다.",
  "신메뉴 홍보": "새롭게 준비한 메뉴와 서비스를 소개합니다.",
  "비 오는 날 홍보": "비 오는 날에도 편하게 들르실 수 있도록 따뜻하게 준비해두겠습니다.",
  "마감 임박 홍보": "오늘 이용 가능한 시간이 얼마 남지 않았습니다.",
};

function withInputNotice(value: string, sentence: string) {
  return value.trim() ? `남겨주신 내용 확인했습니다. ${sentence}` : sentence;
}

function withReviewNotice(value: string, sentence: string) {
  return value.trim() ? `남겨주신 리뷰 확인했습니다. ${sentence}` : sentence;
}

export function generateMockInquiryReply({
  question,
  tone,
  inquiryType,
}: InquiryInput) {
  return withInputNotice(question, inquiryReplies[inquiryType][tone]);
}

export function generateMockReviewReply({
  review,
  tone,
  reviewType,
}: ReviewInput) {
  return withReviewNotice(review, reviewReplies[reviewType][tone]);
}

export function generateMockPromoPost({
  purpose,
  businessType,
  channel,
  extraNote = "",
}: PromoInput) {
  const note = extraNote.trim();
  const mainCopy = `${purposeCopy[purpose]} ${businessCopy[businessType]}을 찾으신다면 오늘 편하게 들러주세요. 부담 없이 문의 주시면 가능한 시간과 이용 방법을 안내드리겠습니다.`;
  const noteCopy = note ? `\n\n오늘의 소식: ${note}` : "";

  if (channel === "인스타그램") {
    return `${mainCopy}${noteCopy}\n\n#동네가게 #오늘의소식 #${businessType} #사장님추천`;
  }

  if (channel === "네이버 플레이스") {
    return `${mainCopy}${noteCopy}\n\n방문 전 문의 주시면 더 편하게 이용하실 수 있습니다.`;
  }

  return `${mainCopy}${noteCopy}\n\n궁금하신 점은 채널 메시지로 편하게 남겨주세요.`;
}
