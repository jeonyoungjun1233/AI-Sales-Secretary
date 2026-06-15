import Link from "next/link";

import type { UsageSnapshot } from "@/lib/billing/usage";

type UsageSummaryCardProps = {
  summary: UsageSnapshot;
  compact?: boolean;
};

export function UsageSummaryCard({ summary, compact = false }: UsageSummaryCardProps) {
  const usedText = `이번 달 ${summary.monthlyGenerationCount}개 만들었어요.`;
  const remainingText = summary.canGenerate
    ? `무료 체험 ${summary.remainingGenerations}회 남음`
    : "이번 달 체험을 모두 사용했어요.";

  return (
    <section
      className={`rounded-[1.5rem] border border-emerald-100 bg-white shadow-lg shadow-slate-950/5 ${
        compact ? "p-4" : "p-5"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black text-emerald-700">
            {summary.planName}
          </p>
          <h2
            className={`mt-1 font-black text-slate-950 ${
              compact ? "text-lg" : "text-xl"
            }`}
          >
            {remainingText}
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
            {usedText}
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
          {summary.monthlyGenerationLimit}회
        </span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{
            width: `${Math.min(
              100,
              (summary.monthlyGenerationCount / summary.monthlyGenerationLimit) *
                100,
            )}%`,
          }}
        />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs font-bold leading-5 text-slate-500">
          더 많이 쓰려면 베이직 플랜을 준비해 주세요.
        </p>
        <Link
          className="shrink-0 rounded-full bg-slate-950 px-4 py-2 text-xs font-black text-white transition active:scale-[0.98]"
          href="/pricing"
        >
          플랜 보기
        </Link>
      </div>
    </section>
  );
}
