import { generateDailyAction } from "@/lib/agent/dailyAction";
import type { DailyActionRequest } from "@/lib/agent/types";
import {
  canGenerate,
  getServerUsageHeaders,
  getServerUsageSnapshot,
  getUsageLimitDetail,
  getUsageLimitMessage,
  normalizeUsageSnapshot,
} from "@/lib/billing/usage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: DailyActionRequest;

  try {
    body = (await request.json()) as DailyActionRequest;
  } catch {
    body = {};
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

  const result = await generateDailyAction({
    currentDate: body.currentDate,
    businessProfile: body.businessProfile ?? null,
    faqs: Array.isArray(body.faqs) ? body.faqs : [],
    todayEvents: Array.isArray(body.todayEvents) ? body.todayEvents : [],
    recentGenerations: Array.isArray(body.recentGenerations)
      ? body.recentGenerations
      : [],
    usage: clientUsage ?? undefined,
  });

  return Response.json(
    { result },
    {
      headers: getServerUsageHeaders(request),
    },
  );
}
