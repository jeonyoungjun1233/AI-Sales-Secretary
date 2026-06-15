import { generateWithAgent } from "@/lib/ai/agentRouter";
import type { GenerateRequest, GenerateType } from "@/lib/ai/types";
import {
  canGenerate,
  getServerUsageHeaders,
  getServerUsageSnapshot,
  getUsageLimitDetail,
  getUsageLimitMessage,
  normalizeUsageSnapshot,
} from "@/lib/billing/usage";

export const runtime = "nodejs";

const allowedTypes = new Set<GenerateType>([
  "inquiry",
  "review",
  "promo",
  "faq",
]);

export async function POST(request: Request) {
  let body: Partial<GenerateRequest>;

  try {
    body = (await request.json()) as Partial<GenerateRequest>;
  } catch {
    return Response.json(
      { message: "내용을 다시 확인해주세요." },
      { status: 400 },
    );
  }

  if (!body.type || !allowedTypes.has(body.type) || !body.input?.trim()) {
    return Response.json(
      { message: "내용을 입력한 뒤 다시 시도해주세요." },
      { status: 400 },
    );
  }

  const clientUsage = normalizeUsageSnapshot(body.usage);
  const serverUsage = getServerUsageSnapshot(request);

  if (
    (clientUsage && !canGenerate(clientUsage)) ||
    !canGenerate(serverUsage)
  ) {
    return Response.json(
      {
        message: getUsageLimitMessage(),
        detail: getUsageLimitDetail(),
        upgradeHref: "/pricing",
      },
      { status: 402 },
    );
  }

  const result = await generateWithAgent({
    type: body.type,
    input: body.input,
    tone: body.tone,
    businessType: body.businessType,
    channel: body.channel,
    category: body.category,
    context: body.context,
  });

  return Response.json(
    { result },
    {
      headers: getServerUsageHeaders(request),
    },
  );
}
