import type { DailyActionItem, DailyActionRequest, DailyActionResponse } from "./types";

const DEFAULT_MODEL = "gpt-4.1-mini";

type OpenAiResponseBody = {
  output_text?: string;
  output?: {
    content?: {
      text?: string;
    }[];
  }[];
};

const businessActionIdeas: Record<
  string,
  {
    promo: string;
    inquiry: string;
    review: string;
  }
> = {
  카페: {
    promo: "오후 디저트 타임 홍보",
    inquiry: "예약 가능 여부 답장",
    review: "음료와 응대 리뷰 답글",
  },
  음식점: {
    promo: "점심·저녁 예약 유도",
    inquiry: "단체 예약 문의 답장",
    review: "식사 경험 리뷰 답글",
  },
  네일샵: {
    promo: "이번 주 예약 가능 시간 안내",
    inquiry: "시술 예약 문의 답장",
    review: "디자인 후기 답글",
  },
  미용실: {
    promo: "주말 예약 유도",
    inquiry: "시술 상담 문의 답장",
    review: "시술 후기 답글",
  },
  학원: {
    promo: "신규 수강생 상담 안내",
    inquiry: "수업 상담 문의 답장",
    review: "수강 후기 답글",
  },
  PT샵: {
    promo: "체험 수업 문의 유도",
    inquiry: "운동 상담 문의 답장",
    review: "운동 후기 답글",
  },
};

export async function generateDailyAction(
  request: DailyActionRequest,
): Promise<DailyActionResponse> {
  if (process.env.AI_PROVIDER === "openai" && process.env.OPENAI_API_KEY) {
    try {
      return normalizeDailyActionResponse(
        await generateDailyActionWithOpenAi(request),
        request,
      );
    } catch {
      return buildFallbackDailyAction(request);
    }
  }

  return buildFallbackDailyAction(request);
}

export function buildFallbackDailyAction(
  request: DailyActionRequest,
): DailyActionResponse {
  const businessName = request.businessProfile?.businessName || "우리 가게";
  const businessType = request.businessProfile?.businessType || "가게";
  const ideas = getBusinessIdeas(businessType);
  const recentGenerations = request.recentGenerations ?? [];
  const todayEvents = request.todayEvents ?? [];
  const faqs = request.faqs ?? [];
  const hasInquiryHistory = recentGenerations.some((item) => item.type === "inquiry");
  const hasReviewHistory = recentGenerations.some((item) => item.type === "review");
  const hasPromoHistory = recentGenerations.some((item) => item.type === "promo");
  const profileNeedsWork = countFilledProfileFields(request) < 4;
  const actions: DailyActionItem[] = [];

  actions.push({
    id: "action-inquiry",
    type: "inquiry",
    title: hasInquiryHistory ? "비슷한 문의 빠른 답장" : ideas.inquiry,
    description: "예약 기회를 놓치지 않게 먼저 답장합니다.",
    output: [
      `안녕하세요. ${businessName}입니다.`,
      "문의 주셔서 감사합니다. 원하시는 날짜와 시간, 인원을 알려주시면 가능 여부를 바로 확인해드릴게요.",
      request.businessProfile?.openingHours
        ? `참고로 운영 시간은 ${request.businessProfile.openingHours}입니다.`
        : "확인 후 가장 빠르게 안내드리겠습니다.",
    ].join("\n"),
    recommendedTime: "오전 11시",
    canCopy: true,
    canSaveToHistory: true,
    canAddToCalendar: false,
  });

  if (!hasReviewHistory || recentGenerations.length < 3) {
    actions.push({
      id: "action-review",
      type: "review",
      title: ideas.review,
      description: "리뷰 답글을 남겨 재방문 신뢰를 만듭니다.",
      output: [
        "소중한 리뷰 정말 감사합니다.",
        `${businessName}에서 좋은 시간 보내셨다니 큰 힘이 됩니다.`,
        "다음 방문에도 만족하실 수 있도록 정성껏 준비하겠습니다.",
      ].join("\n"),
      recommendedTime: "오후 3시",
      canCopy: true,
      canSaveToHistory: true,
      canAddToCalendar: false,
    });
  }

  if (!hasPromoHistory || todayEvents.length === 0) {
    actions.push({
      id: "action-promo",
      type: "promo",
      title: ideas.promo,
      description: "오늘 손님 유입을 위한 짧은 홍보글입니다.",
      output: [
        `${businessName} 오늘도 준비되어 있습니다.`,
        request.businessProfile?.mainMenu
          ? `대표 메뉴는 ${request.businessProfile.mainMenu}입니다.`
          : "방문 전 문의 주시면 준비 가능 여부를 안내드릴게요.",
        "가볍게 들러주세요. 필요한 안내는 댓글이나 메시지로 도와드릴게요.",
      ].join("\n"),
      recommendedTime: "오후 5시",
      canCopy: true,
      canSaveToHistory: true,
      canAddToCalendar: true,
    });
  }

  actions.push({
    id: "action-calendar",
    type: "calendar",
    title: profileNeedsWork || faqs.length < 3 ? "가게 정보 보완" : "오늘 홍보 일정 추가",
    description:
      profileNeedsWork || faqs.length < 3
        ? "반복 질문을 줄이도록 기본 정보를 채웁니다."
        : "오늘 올릴 홍보글 시간을 일정에 남깁니다.",
    output:
      profileNeedsWork || faqs.length < 3
        ? "가게 정보와 자주 묻는 질문을 2개만 더 채우면 답장이 더 자연스러워집니다."
        : "오후 손님 유입을 위해 짧은 홍보글을 준비하고 일정에 남겨보세요.",
    recommendedTime: "오후 6시",
    canCopy: false,
    canSaveToHistory: false,
    canAddToCalendar: true,
  });

  const limitedActions = actions.slice(0, 4);

  return {
    summaryTitle: "오늘 할 일 준비 완료",
    summaryText: `${businessName}에 맞춰 답장, 리뷰, 홍보, 일정을 정리했어요.`,
    savedMinutes: limitedActions.reduce((total, action) => total + getSavedMinutes(action), 0),
    actions: limitedActions,
  };
}

function getBusinessIdeas(businessType: string) {
  return businessActionIdeas[businessType] ?? {
    promo: "오늘의 홍보글 만들기",
    inquiry: "손님 문의 답장",
    review: "리뷰 답글 정리",
  };
}

async function generateDailyActionWithOpenAi(
  request: DailyActionRequest,
): Promise<Partial<DailyActionResponse>> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing generation credential.");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
      input: [
        {
          role: "developer",
          content: buildDeveloperInstruction(),
        },
        {
          role: "user",
          content: buildUserInstruction(request),
        },
      ],
      max_output_tokens: 1300,
      temperature: 0.45,
      text: {
        format: {
          type: "json_schema",
          name: "daily_sales_action",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              summaryTitle: { type: "string" },
              summaryText: { type: "string" },
              savedMinutes: { type: "number" },
              actions: {
                type: "array",
                minItems: 3,
                maxItems: 4,
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    id: { type: "string" },
                    type: {
                      type: "string",
                      enum: ["inquiry", "review", "promo", "calendar"],
                    },
                    title: { type: "string" },
                    description: { type: "string" },
                    output: { type: "string" },
                    recommendedTime: { type: "string" },
                    canCopy: { type: "boolean" },
                    canSaveToHistory: { type: "boolean" },
                    canAddToCalendar: { type: "boolean" },
                  },
                  required: [
                    "id",
                    "type",
                    "title",
                    "description",
                    "output",
                    "recommendedTime",
                    "canCopy",
                    "canSaveToHistory",
                    "canAddToCalendar",
                  ],
                },
              },
            },
            required: ["summaryTitle", "summaryText", "savedMinutes", "actions"],
          },
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Daily action request failed.");
  }

  const data = (await response.json()) as OpenAiResponseBody;
  const rawText = extractResponseText(data);
  const parsed = parseJson(rawText);

  if (!parsed) {
    throw new Error("Daily action result parse failed.");
  }

  return parsed;
}

function buildDeveloperInstruction() {
  return [
    "너는 한국 소상공인 사장님의 오늘 업무를 줄여주는 매출 비서다.",
    "답장, 리뷰, 홍보, 일정 제안을 한 번에 준비한다.",
    "없는 사실을 만들지 말고, 사장님이 확인 후 복사해서 쓸 수 있는 안전한 문구를 만든다.",
    "문장은 짧고 쉬운 한국어로 쓴다.",
    "기술 용어를 쓰지 않는다.",
    "응답은 반드시 지정된 JSON 형식으로만 작성한다.",
  ].join("\n");
}

function buildUserInstruction(request: DailyActionRequest) {
  const profile = request.businessProfile;
  const faqs = request.faqs ?? [];
  const todayEvents = request.todayEvents ?? [];
  const recentGenerations = request.recentGenerations ?? [];

  return [
    `기준일: ${request.currentDate || "오늘"}`,
    "",
    "가게 정보:",
    profile
      ? [
          `가게 이름: ${profile.businessName || "미입력"}`,
          `업종: ${profile.businessType || "미입력"}`,
          `영업시간: ${profile.openingHours || "미입력"}`,
          `대표 메뉴: ${profile.mainMenu || "미입력"}`,
          `말투: ${profile.tone || "미입력"}`,
        ].join("\n")
      : "미입력",
    "",
    "자주 묻는 질문:",
    faqs.length
      ? faqs
          .slice(0, 6)
          .map((faq) => `Q. ${faq.question}\nA. ${faq.answer}`)
          .join("\n")
      : "없음",
    "",
    "오늘 일정:",
    todayEvents.length
      ? todayEvents
          .slice(0, 6)
          .map((event) => `${event.time} ${event.title}${event.memo ? ` - ${event.memo}` : ""}`)
          .join("\n")
      : "없음",
    "",
    "최근 만든 문구:",
    recentGenerations.length
      ? recentGenerations
          .slice(0, 5)
          .map((item) => `${item.type}: ${item.title} / ${item.output.slice(0, 120)}`)
          .join("\n")
      : "없음",
    "",
    "생성 기준:",
    "- inquiry, review, promo, calendar 유형을 균형 있게 만든다.",
    "- 일정이 비어 있으면 홍보글 또는 일정 제안을 우선한다.",
    "- 리뷰 기록이 적으면 리뷰 답글을 제안한다.",
    "- FAQ가 적으면 질문 정리나 기본 정보 보완을 제안한다.",
    "- action output은 복사하거나 일정 메모로 쓸 수 있게 작성한다.",
    "- 사용자에게 내부 type 값은 보이지 않으므로 title과 description은 한국어로 명확히 작성한다.",
  ].join("\n");
}

function normalizeDailyActionResponse(
  value: Partial<DailyActionResponse>,
  request: DailyActionRequest,
): DailyActionResponse {
  const fallback = buildFallbackDailyAction(request);
  const actions = Array.isArray(value.actions)
    ? value.actions
        .filter(isDailyActionItem)
        .slice(0, 4)
        .map((action, index) => ({
          ...action,
          id: action.id || `action-${index + 1}`,
          canCopy: action.type !== "calendar" && action.canCopy,
          canSaveToHistory: action.type !== "calendar" && action.canSaveToHistory,
          canAddToCalendar: action.type === "calendar" || action.canAddToCalendar,
        }))
    : [];

  if (actions.length < 3) {
    return fallback;
  }

  return {
    summaryTitle:
      typeof value.summaryTitle === "string" && value.summaryTitle.trim()
        ? value.summaryTitle.trim()
        : fallback.summaryTitle,
    summaryText:
      typeof value.summaryText === "string" && value.summaryText.trim()
        ? value.summaryText.trim()
        : fallback.summaryText,
    savedMinutes:
      typeof value.savedMinutes === "number" && value.savedMinutes > 0
        ? Math.round(value.savedMinutes)
        : actions.reduce((total, action) => total + getSavedMinutes(action), 0),
    actions,
  };
}

function isDailyActionItem(value: unknown): value is DailyActionItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    isDailyActionType(item.type) &&
    typeof item.title === "string" &&
    typeof item.description === "string" &&
    typeof item.output === "string" &&
    typeof item.recommendedTime === "string" &&
    typeof item.canCopy === "boolean" &&
    typeof item.canSaveToHistory === "boolean" &&
    typeof item.canAddToCalendar === "boolean"
  );
}

function isDailyActionType(value: unknown) {
  return value === "inquiry" || value === "review" || value === "promo" || value === "calendar";
}

function getSavedMinutes(action: DailyActionItem) {
  if (action.type === "promo") {
    return 10;
  }

  if (action.type === "calendar") {
    return 4;
  }

  return 5;
}

function countFilledProfileFields(request: DailyActionRequest) {
  const profile = request.businessProfile;

  if (!profile) {
    return 0;
  }

  return [
    profile.businessName,
    profile.businessType,
    profile.openingHours,
    profile.address,
    profile.phone,
    profile.mainMenu,
  ].filter((value) => typeof value === "string" && value.trim().length > 0).length;
}

function extractResponseText(data: OpenAiResponseBody) {
  if (typeof data.output_text === "string" && data.output_text.trim()) {
    return data.output_text;
  }

  const contentText = data.output
    ?.flatMap((item) => item.content ?? [])
    .map((content) => content.text)
    .filter((text): text is string => Boolean(text))
    .join("\n");

  return contentText || "";
}

function parseJson(value: string) {
  try {
    return JSON.parse(value) as Partial<DailyActionResponse>;
  } catch {
    return null;
  }
}
