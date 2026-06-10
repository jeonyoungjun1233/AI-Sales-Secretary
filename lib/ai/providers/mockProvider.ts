import type {
  AiProvider,
  BusinessType,
  GenerateRequest,
  GenerateResponse,
  GenerateTone,
  InquiryCategory,
  PromoChannel,
  PromoPurpose,
  ReviewCategory,
} from "../types";

const toneOpenings: Record<GenerateTone, string> = {
  friendly: "안녕하세요. 문의 주셔서 감사합니다.",
  short: "문의 감사합니다.",
  cute: "안녕하세요. 반갑습니다.",
  premium: "안녕하세요. 소중한 문의 감사드립니다.",
};

const toneClosings: Record<GenerateTone, string> = {
  friendly: "더 궁금하신 점이 있으면 언제든 편하게 말씀해주세요.",
  short: "필요하시면 바로 안내드리겠습니다.",
  cute: "편하게 문의 주시면 빠르게 챙겨드릴게요.",
  premium: "방문에 불편함 없도록 차분히 안내드리겠습니다.",
};

const inquiryReplies: Record<InquiryCategory, string> = {
  reservation:
    "원하시는 날짜, 시간, 인원을 알려주시면 예약 가능 여부를 확인해드리겠습니다.",
  hours:
    "오늘 이용 가능한 시간과 마감 시간을 확인해서 방문에 불편함 없도록 안내드리겠습니다.",
  price:
    "찾으시는 메뉴나 서비스를 알려주시면 현재 기준 가격과 이용 방법을 안내드리겠습니다.",
  parking:
    "매장 주변 주차 가능 여부와 가까운 주차 위치를 확인해서 안내드리겠습니다.",
  menu:
    "찾으시는 메뉴가 오늘 준비되어 있는지 확인하고, 함께 고르기 좋은 메뉴도 안내드리겠습니다.",
  location:
    "처음 방문하셔도 찾기 쉽도록 주소와 가까운 길 안내를 함께 전해드리겠습니다.",
  complaint:
    "불편을 드렸다면 죄송합니다. 말씀해주신 내용을 꼼꼼히 확인하고 개선할 부분을 바로 살펴보겠습니다.",
  other:
    "남겨주신 내용을 확인한 뒤 가장 정확한 안내를 드리겠습니다.",
};

const reviewReplies: Record<ReviewCategory, Record<GenerateTone, string>> = {
  positive: {
    friendly:
      "좋은 말씀 남겨주셔서 정말 감사합니다. 다시 방문하셨을 때도 기분 좋은 시간 보내실 수 있도록 정성껏 준비하겠습니다.",
    short:
      "좋은 리뷰 감사합니다. 다음 방문 때도 만족하실 수 있게 준비하겠습니다.",
    cute:
      "따뜻한 리뷰 정말 감사합니다. 다음에도 기분 좋은 시간 보내실 수 있게 잘 챙겨둘게요.",
    premium:
      "정성스러운 후기 진심으로 감사드립니다. 보내주신 신뢰에 어울리는 서비스로 다시 맞이하겠습니다.",
  },
  negative: {
    friendly:
      "기대하신 만큼 만족을 드리지 못해 죄송합니다. 남겨주신 내용을 꼼꼼히 확인하고 같은 불편이 반복되지 않도록 개선하겠습니다.",
    short:
      "불편을 드려 죄송합니다. 말씀해주신 부분을 확인하고 개선하겠습니다.",
    cute:
      "불편하셨던 점 정말 죄송합니다. 알려주신 부분을 잘 확인해서 더 나아진 모습 보여드릴게요.",
    premium:
      "만족스러운 경험을 드리지 못해 진심으로 사과드립니다. 소중한 의견을 바탕으로 서비스 품질을 세심하게 점검하겠습니다.",
  },
  mixed: {
    friendly:
      "솔직한 후기 감사합니다. 좋았던 부분은 더 살리고, 아쉬웠던 부분은 꼼꼼히 보완해 더 만족스러운 경험을 드리겠습니다.",
    short:
      "후기 감사합니다. 좋았던 점과 아쉬운 점 모두 확인하고 더 나아지겠습니다.",
    cute:
      "솔직하게 남겨주셔서 감사합니다. 좋았던 부분은 더 좋게, 아쉬운 부분은 더 꼼꼼하게 챙겨볼게요.",
    premium:
      "귀한 의견 감사드립니다. 만족하신 부분은 유지하고 부족했던 부분은 세심하게 보완하겠습니다.",
  },
};

const businessLines: Record<BusinessType, string> = {
  cafe: "따뜻한 음료와 디저트를 준비해두었습니다.",
  restaurant: "든든하게 즐기기 좋은 메뉴를 준비했습니다.",
  nail: "기분 전환하기 좋은 손끝 관리를 준비했습니다.",
  hair: "깔끔한 스타일 정리를 도와드릴 준비가 되어 있습니다.",
  academy: "상담과 수업 문의를 편하게 남겨주실 수 있습니다.",
  pt: "몸 상태에 맞춘 운동 상담을 도와드릴 수 있습니다.",
};

const promoPurposeLines: Record<PromoPurpose, string> = {
  reservation:
    "이번 주 예약 가능한 시간이 조금 남아 있어 편하게 안내드립니다.",
  event: "방문해주시는 분들을 위해 작은 혜택을 준비했습니다.",
  "new-menu": "새롭게 준비한 메뉴와 소식을 소개합니다.",
  "rainy-day": "비 오는 날에도 편하게 들르실 수 있도록 준비해두었습니다.",
  "closing-soon": "오늘 이용 가능한 시간이 얼마 남지 않아 안내드립니다.",
};

const channelClosings: Record<PromoChannel, string> = {
  instagram: "#오늘방문 #동네가게 #편하게문의주세요",
  "naver-place":
    "방문 전 궁금하신 점은 편하게 문의 주시면 자세히 안내드리겠습니다.",
  "kakao-channel":
    "예약이나 문의는 채널 메시지로 남겨주시면 확인 후 안내드리겠습니다.",
};

function getTone(request: GenerateRequest) {
  return request.tone ?? "friendly";
}

function getCategory<T extends string>(
  request: GenerateRequest,
  fallback: T,
) {
  return (request.category || fallback) as T;
}

function buildInquiryReply(request: GenerateRequest): GenerateResponse {
  const tone = getTone(request);
  const category = getCategory<InquiryCategory>(request, "reservation");
  const checked = request.input.trim()
    ? "보내주신 내용을 확인했습니다."
    : "상황을 알려주시면 더 정확히 안내드릴 수 있습니다.";

  return {
    title: "손님 문의 답장",
    savedMinutes: 5,
    warnings: [],
    text: [
      toneOpenings[tone],
      checked,
      inquiryReplies[category],
      toneClosings[tone],
    ].join(" "),
  };
}

function buildReviewReply(request: GenerateRequest): GenerateResponse {
  const tone = getTone(request);
  const category = getCategory<ReviewCategory>(request, "positive");
  const checked = request.input.trim()
    ? "남겨주신 리뷰를 꼼꼼히 읽었습니다."
    : "리뷰 내용을 알려주시면 상황에 맞춰 답글을 준비하겠습니다.";

  return {
    title: "리뷰 답글",
    savedMinutes: 5,
    warnings: [],
    text: [toneOpenings[tone], checked, reviewReplies[category][tone]].join(
      " ",
    ),
  };
}

function buildPromoPost(request: GenerateRequest): GenerateResponse {
  const purpose = getCategory<PromoPurpose>(request, "reservation");
  const businessType = request.businessType ?? "cafe";
  const channel = request.channel ?? "instagram";
  const note = request.input.trim();
  const noteLine = note ? `\n\n오늘의 소식: ${note}` : "";
  const body = `${promoPurposeLines[purpose]}\n\n${businessLines[businessType]} 방문 전 궁금하신 점은 편하게 문의해주세요.${noteLine}`;

  return {
    title: "오늘의 홍보글",
    savedMinutes: 10,
    warnings: [
      "가격, 혜택, 예약 가능 시간은 실제 제공 가능한 내용인지 확인해주세요.",
    ],
    text:
      channel === "instagram"
        ? `${body}\n\n${channelClosings[channel]}`
        : `${body}\n\n${channelClosings[channel]}`,
  };
}

function buildFaqAnswer(request: GenerateRequest): GenerateResponse {
  return {
    title: "자주 묻는 질문 답변",
    savedMinutes: 3,
    warnings: [],
    text: `문의 감사합니다. ${request.input.trim() || "질문 내용을 확인한 뒤"} 가게 상황에 맞춰 정확히 안내드리겠습니다.`,
  };
}

export const mockProvider: AiProvider = {
  async generate(request) {
    if (request.type === "inquiry") {
      return buildInquiryReply(request);
    }

    if (request.type === "review") {
      return buildReviewReply(request);
    }

    if (request.type === "promo") {
      return buildPromoPost(request);
    }

    return buildFaqAnswer(request);
  },
};

export async function generateMockInquiryReply(request: GenerateRequest) {
  return buildInquiryReply({ ...request, type: "inquiry" }).text;
}

export async function generateMockReviewReply(request: GenerateRequest) {
  return buildReviewReply({ ...request, type: "review" }).text;
}

export async function generateMockPromoPost(request: GenerateRequest) {
  return buildPromoPost({ ...request, type: "promo" }).text;
}
