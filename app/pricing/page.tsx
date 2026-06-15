import Link from "next/link";

import { MobileAppShell } from "@/components/MobileAppShell";
import { billingPlans } from "@/lib/billing/plans";

export default function PricingPage() {
  return (
    <MobileAppShell
      actionHref="/feedback"
      actionLabel="의견"
      title="사장님에게 맞는 플랜"
      subtitle="답장, 리뷰, 홍보글 업무를 더 빠르게 줄여보세요."
    >
      <div className="grid gap-5">
        <section className="rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300">
          <p className="text-sm font-black text-emerald-300">출시 준비 중</p>
          <h2 className="mt-2 text-3xl font-black leading-tight">
            월 9,900원으로 답장 시간을 줄여보세요.
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">
            AI 알바생처럼 매일 답장, 리뷰, 홍보를 도와드립니다.
          </p>
        </section>

        <div className="grid gap-4">
          {billingPlans.map((plan) => (
            <article
              className={`rounded-[1.75rem] border p-5 shadow-lg ${
                plan.highlighted
                  ? "border-emerald-400 bg-[linear-gradient(135deg,#ecfdf5_0%,#ffffff_70%)] shadow-emerald-200"
                  : "border-slate-100 bg-white shadow-slate-950/5"
              }`}
              key={plan.id}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-emerald-700">
                    {plan.recommendedFor}
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-slate-950">
                    {plan.name}
                  </h2>
                  <p className="mt-2 text-3xl font-black text-slate-950">
                    {plan.priceLabel}
                  </p>
                </div>
                {plan.highlighted ? (
                  <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-black text-white">
                    추천
                  </span>
                ) : null}
              </div>

              <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-black text-slate-700">
                월 생성 {plan.monthlyGenerationLimit.toLocaleString("ko-KR")}회
              </p>

              <ul className="mt-4 grid gap-2">
                {plan.features.slice(0, 5).map((feature) => (
                  <li
                    className="flex items-start gap-2 text-sm font-semibold leading-6 text-slate-600"
                    key={feature}
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                className={`mt-5 flex min-h-13 items-center justify-center rounded-2xl px-5 py-3 text-base font-black transition active:scale-[0.99] ${
                  plan.id === "free"
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                    : "bg-slate-950 text-white"
                }`}
                href={plan.id === "free" ? "/dashboard" : "/feedback"}
              >
                {plan.ctaLabel}
              </Link>
            </article>
          ))}
        </div>

        <section className="rounded-[1.5rem] bg-emerald-50 p-4 text-sm font-bold leading-6 text-emerald-950">
          <p className="text-base font-black">결제는 아직 연결하지 않았어요.</p>
          <p className="mt-2 text-emerald-800">
            지금은 베타 의견을 모아 정식 플랜을 준비하는 단계입니다.
          </p>
        </section>
      </div>
    </MobileAppShell>
  );
}
