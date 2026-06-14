import type {
  AiProvider,
  BusinessType,
  GenerateRequest,
  GenerateResponse,
  GenerateTone,
  GenerateType,
  PromoChannel,
} from "../types";

const DEFAULT_MODEL = "gpt-4.1-mini";

const typeLabels: Record<GenerateType, string> = {
  inquiry: "손님 문의 답장",
  review: "리뷰 답글",
  promo: "홍보글",
  faq: "FAQ 답변",
};

const toneLabels: Record<GenerateTone, string> = {
  friendly: "친절한 말투",
  short: "짧고 깔끔한 말투",
  cute: "밝고 귀여운 말투",
  premium: "고급스러운 말투",
};

const businessTypeLabels: Record<BusinessType, string> = {
  cafe: "카페",
  restaurant: "음식점",
  nail: "네일샵",
  hair: "미용실",
  academy: "학원",
  pt: "PT샵",
};

const channelLabels: Record<PromoChannel, string> = {
  instagram: "인스타그램",
  "naver-place": "네이버 플레이스",
  "kakao-channel": "카카오톡 채널",
};

type OpenAiResponseBody = {
  output_text?: string;
  output?: {
    content?: {
      text?: string;
    }[];
  }[];
};

export const openaiProvider: AiProvider = {
  async generate(request) {
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
        max_output_tokens: 700,
        temperature: 0.5,
        text: {
          format: {
            type: "json_schema",
            name: "sales_secretary_generation",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                title: { type: "string" },
                text: { type: "string" },
                savedMinutes: { type: "number" },
                warnings: {
                  type: "array",
                  items: { type: "string" },
                },
              },
              required: ["title", "text", "savedMinutes", "warnings"],
            },
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Generation request failed.");
    }

    const data = (await response.json()) as OpenAiResponseBody;
    const rawText = extractResponseText(data);
    const parsed = parseGenerationResponse(rawText);

    return normalizeResponse(parsed, request);
  },
};

function buildDeveloperInstruction() {
  return [
    "너는 한국 소상공인 사장님을 돕는 업무 비서다.",
    "손님에게 그대로 보낼 수 있는 자연스럽고 공손한 한국어 문구를 만든다.",
    "과장 광고, 허위 사실, 확정되지 않은 혜택, 자동 전송처럼 보이는 표현은 피한다.",
    "사용자가 입력한 가게 정보, FAQ, 일정, 최근 기록을 참고하되 없는 사실은 만들지 않는다.",
    "응답은 반드시 지정된 JSON 형식으로만 작성한다.",
  ].join("\n");
}

function buildUserInstruction(request: GenerateRequest) {
  const context = request.context;
  const businessProfile = context?.businessProfile;
  const faqs = context?.faqs ?? [];
  const todayEvents = context?.todayEvents ?? [];
  const recentGenerations = context?.recentGenerations ?? [];

  return [
    `작업: ${typeLabels[request.type]}`,
    `선택 말투: ${request.tone ? toneLabels[request.tone] : "기본"}`,
    `선택 유형: ${request.category || "기본"}`,
    request.businessType
      ? `업종: ${businessTypeLabels[request.businessType]}`
      : "",
    request.channel ? `채널: ${channelLabels[request.channel]}` : "",
    "",
    "사용자 입력:",
    request.input,
    "",
    "가게 정보:",
    businessProfile
      ? [
          `가게 이름: ${businessProfile.businessName || "미입력"}`,
          `업종: ${businessProfile.businessType || "미입력"}`,
          `영업시간: ${businessProfile.openingHours || "미입력"}`,
          `주소: ${businessProfile.address || "미입력"}`,
          `대표 메뉴: ${businessProfile.mainMenu || "미입력"}`,
          `기본 말투: ${businessProfile.tone || "미입력"}`,
        ].join("\n")
      : "미입력",
    "",
    "자주 묻는 질문:",
    faqs.length > 0
      ? faqs
          .slice(0, 5)
          .map((faq) => `Q. ${faq.question}\nA. ${faq.answer}`)
          .join("\n")
      : "없음",
    "",
    "오늘 일정:",
    todayEvents.length > 0
      ? todayEvents
          .slice(0, 5)
          .map(
            (event) =>
              `${event.time} ${event.title}${event.memo ? ` - ${event.memo}` : ""}`,
          )
          .join("\n")
      : "없음",
    "",
    "최근 만든 문구:",
    recentGenerations.length > 0
      ? recentGenerations
          .slice(0, 3)
          .map((item) => `${typeLabels[item.type]}: ${item.output.slice(0, 120)}`)
          .join("\n")
      : "없음",
    "",
    "출력 규칙:",
    "- title은 짧게 작성한다.",
    "- text는 사장님이 복사해서 바로 쓸 수 있는 문장으로 작성한다.",
    "- savedMinutes는 문의/리뷰 5, 홍보글 10을 기준으로 숫자로 작성한다.",
    "- warnings는 사장님이 확인해야 할 사실이 있을 때만 짧게 작성한다.",
  ]
    .filter(Boolean)
    .join("\n");
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

function parseGenerationResponse(rawText: string) {
  const direct = parseJson(rawText);

  if (direct) {
    return direct;
  }

  const firstBrace = rawText.indexOf("{");
  const lastBrace = rawText.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace > firstBrace) {
    const parsed = parseJson(rawText.slice(firstBrace, lastBrace + 1));

    if (parsed) {
      return parsed;
    }
  }

  return {
    text: rawText,
  };
}

function parseJson(value: string) {
  try {
    return JSON.parse(value) as Partial<GenerateResponse>;
  } catch {
    return null;
  }
}

function normalizeResponse(
  value: Partial<GenerateResponse>,
  request: GenerateRequest,
): GenerateResponse {
  const text = typeof value.text === "string" ? value.text.trim() : "";

  if (!text) {
    throw new Error("Empty generation result.");
  }

  return {
    title:
      typeof value.title === "string" && value.title.trim()
        ? value.title.trim()
        : typeLabels[request.type],
    text,
    savedMinutes:
      typeof value.savedMinutes === "number" && value.savedMinutes > 0
        ? Math.round(value.savedMinutes)
        : request.type === "promo"
          ? 10
          : 5,
    warnings: Array.isArray(value.warnings)
      ? value.warnings.filter((warning): warning is string => typeof warning === "string")
      : [],
  };
}
