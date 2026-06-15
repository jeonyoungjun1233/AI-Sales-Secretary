import { generateDailyAction } from "@/lib/agent/dailyAction";
import type { DailyActionRequest } from "@/lib/agent/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: DailyActionRequest;

  try {
    body = (await request.json()) as DailyActionRequest;
  } catch {
    body = {};
  }

  const result = await generateDailyAction({
    currentDate: body.currentDate,
    businessProfile: body.businessProfile ?? null,
    faqs: Array.isArray(body.faqs) ? body.faqs : [],
    todayEvents: Array.isArray(body.todayEvents) ? body.todayEvents : [],
    recentGenerations: Array.isArray(body.recentGenerations)
      ? body.recentGenerations
      : [],
  });

  return Response.json({ result });
}
