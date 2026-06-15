import { getGenerationHistory } from "@/lib/storage/generationHistoryStore";
import { getOwnerItem, setOwnerItem } from "@/lib/storage/localStore";
import type { StoredGeneration } from "@/lib/storage/types";

import { getPlanById, type BillingPlan, type BillingPlanId } from "./plans";

const USAGE_EVENTS_KEY = "billing-usage-events";
const SERVER_USAGE_COOKIE = "ai_boss_usage";

type UsageEventKind = "generation" | "daily-action";

type UsageEvent = {
  id: string;
  kind: UsageEventKind;
  createdAt: string;
};

export type UsageSnapshot = {
  planId: BillingPlanId;
  planName: string;
  monthKey: string;
  monthlyGenerationCount: number;
  monthlyGenerationLimit: number;
  remainingGenerations: number;
  canGenerate: boolean;
  upgradeMessage: string;
};

export function getCurrentPlan(): BillingPlan {
  return getPlanById("free");
}

export function getMonthlyUsage(generations = getGenerationHistory()) {
  const monthKey = getCurrentMonthKey();
  const monthlyEvents = getUsageEvents().filter((event) =>
    event.createdAt.startsWith(monthKey),
  );

  if (monthlyEvents.length > 0) {
    return monthlyEvents.length;
  }

  return generations.filter((generation) =>
    generation.createdAt.startsWith(monthKey),
  ).length;
}

export function getRemainingGenerations(
  generationsOrUsage?: StoredGeneration[] | Pick<
    UsageSnapshot,
    "monthlyGenerationLimit" | "monthlyGenerationCount"
  >,
) {
  if (Array.isArray(generationsOrUsage)) {
    const plan = getCurrentPlan();
    return Math.max(0, plan.monthlyGenerationLimit - getMonthlyUsage(generationsOrUsage));
  }

  if (generationsOrUsage) {
    return Math.max(
      0,
      generationsOrUsage.monthlyGenerationLimit -
        generationsOrUsage.monthlyGenerationCount,
    );
  }

  const plan = getCurrentPlan();
  return Math.max(0, plan.monthlyGenerationLimit - getMonthlyUsage());
}

export function canGenerate(
  usage: Pick<UsageSnapshot, "remainingGenerations" | "canGenerate"> = getUsageSummary(),
) {
  return usage.canGenerate && usage.remainingGenerations > 0;
}

export function getUsageSummary(generations = getGenerationHistory()): UsageSnapshot {
  const plan = getCurrentPlan();
  const monthlyGenerationCount = getMonthlyUsage(generations);
  const remainingGenerations = Math.max(
    0,
    plan.monthlyGenerationLimit - monthlyGenerationCount,
  );

  return {
    planId: plan.id,
    planName: plan.name,
    monthKey: getCurrentMonthKey(),
    monthlyGenerationCount,
    monthlyGenerationLimit: plan.monthlyGenerationLimit,
    remainingGenerations,
    canGenerate: remainingGenerations > 0,
    upgradeMessage: getUpgradeMessage({
      planName: plan.name,
      remainingGenerations,
    }),
  };
}

export function getUpgradeMessage(
  usage: Pick<UsageSnapshot, "planName" | "remainingGenerations"> = getUsageSummary(),
) {
  if (usage.remainingGenerations > 0) {
    return `무료 체험 ${usage.remainingGenerations}회 남았어요.`;
  }

  return "이번 달 무료 체험 횟수를 모두 사용했어요.";
}

export function recordGenerationUsage(kind: UsageEventKind = "generation") {
  const event: UsageEvent = {
    id: `usage-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    kind,
    createdAt: new Date().toISOString(),
  };
  const currentEvents = getUsageEvents();
  const nextEvents = [event, ...currentEvents].slice(0, 500);

  setOwnerItem(USAGE_EVENTS_KEY, nextEvents);

  return event;
}

export function normalizeUsageSnapshot(value: unknown): UsageSnapshot | null {
  if (!isRecord(value)) {
    return null;
  }

  const plan = getPlanById(typeof value.planId === "string" ? value.planId : "free");
  const monthlyGenerationCount = getNumber(value.monthlyGenerationCount, 0);
  const monthlyGenerationLimit = getNumber(
    value.monthlyGenerationLimit,
    plan.monthlyGenerationLimit,
  );
  const remainingGenerations = Math.max(
    0,
    getNumber(
      value.remainingGenerations,
      monthlyGenerationLimit - monthlyGenerationCount,
    ),
  );

  return {
    planId: plan.id,
    planName: plan.name,
    monthKey:
      typeof value.monthKey === "string" ? value.monthKey : getCurrentMonthKey(),
    monthlyGenerationCount,
    monthlyGenerationLimit,
    remainingGenerations,
    canGenerate:
      typeof value.canGenerate === "boolean"
        ? value.canGenerate && remainingGenerations > 0
        : remainingGenerations > 0,
    upgradeMessage:
      typeof value.upgradeMessage === "string"
        ? value.upgradeMessage
        : getUpgradeMessage({ planName: plan.name, remainingGenerations }),
  };
}

export function getUsageLimitMessage() {
  return "이번 달 무료 체험 횟수를 모두 사용했어요.";
}

export function getUsageLimitDetail() {
  return "계속 사용하려면 베이직 플랜을 준비해 주세요.";
}

export function getServerUsageSnapshot(request: Request): UsageSnapshot {
  const plan = getCurrentPlan();
  const monthKey = getCurrentMonthKey();
  const cookieUsage = parseServerUsageCookie(request.headers.get("cookie"));
  const monthlyGenerationCount =
    cookieUsage.monthKey === monthKey ? cookieUsage.count : 0;
  const remainingGenerations = Math.max(
    0,
    plan.monthlyGenerationLimit - monthlyGenerationCount,
  );

  return {
    planId: plan.id,
    planName: plan.name,
    monthKey,
    monthlyGenerationCount,
    monthlyGenerationLimit: plan.monthlyGenerationLimit,
    remainingGenerations,
    canGenerate: remainingGenerations > 0,
    upgradeMessage: getUpgradeMessage({ planName: plan.name, remainingGenerations }),
  };
}

export function getServerUsageHeaders(request: Request) {
  const snapshot = getServerUsageSnapshot(request);
  const nextCount = Math.min(
    snapshot.monthlyGenerationLimit,
    snapshot.monthlyGenerationCount + 1,
  );
  const headers = new Headers();

  headers.set(
    "Set-Cookie",
    `${SERVER_USAGE_COOKIE}=${snapshot.monthKey}.${nextCount}; Path=/; Max-Age=2678400; SameSite=Lax`,
  );

  return headers;
}

function getUsageEvents() {
  return getOwnerItem<UsageEvent[]>(USAGE_EVENTS_KEY, []);
}

function parseServerUsageCookie(cookieHeader: string | null) {
  const emptyUsage = { monthKey: "", count: 0 };

  if (!cookieHeader) {
    return emptyUsage;
  }

  const cookie = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${SERVER_USAGE_COOKIE}=`));

  if (!cookie) {
    return emptyUsage;
  }

  const rawValue = cookie.slice(SERVER_USAGE_COOKIE.length + 1);
  const [monthKey, countValue] = rawValue.split(".");
  const count = Number.parseInt(countValue ?? "0", 10);

  return {
    monthKey: /^\d{4}-\d{2}$/.test(monthKey ?? "") ? monthKey : "",
    count: Number.isFinite(count) && count > 0 ? count : 0,
  };
}

function getCurrentMonthKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function getNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
