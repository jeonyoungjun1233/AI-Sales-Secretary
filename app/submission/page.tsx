import Link from "next/link";

import { MobileAppShell } from "@/components/MobileAppShell";
import { PrimaryButton } from "@/components/PrimaryButton";

const coreFeatures = [
  "1분 체험",
  "오늘 매출 액션",
  "문의 답장",
  "홍보글 복사",
  "기록/일정 관리",
];

const demoOrder = [
  { href: "/demo", label: "1분 체험" },
  { href: "/agent", label: "오늘 액션" },
  { href: "/history", label: "기록 확인" },
  { href: "/calendar", label: "일정 보기" },
  { href: "/pricing", label: "요금제 보기" },
];

export default function SubmissionPage() {
  return (
    <MobileAppShell
      actionHref="/guide"
      actionLabel="사용법"
      title="한눈에 보기"
      subtitle="답장, 리뷰, 홍보글, 일정을 한 번에 도와주는 AI 업무 비서입니다."
    >
      <div className="grid gap-5">
        <section className="rounded-[1.75rem] bg-[linear-gradient(135deg,#10b981_0%,#14b8a6_100%)] p-5 text-white shadow-2xl shadow-emerald-200">
          <p className="text-sm font-black text-emerald-100">
            AI 사장님 매출 비서
          </p>
          <h2 className="mt-2 text-3xl font-black leading-tight">
            바쁜 사장님의 오늘 할 일을 줄입니다.
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-emerald-50">
            문의 답장, 리뷰 답글, 홍보글, 일정까지 한 화면에서 이어집니다.
          </p>
        </section>

        <section className="rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-950/5">
          <p className="text-sm font-black text-emerald-700">핵심 기능</p>
          <div className="mt-4 grid gap-2">
            {coreFeatures.map((feature, index) => (
              <div
                className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3"
                key={feature}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 text-xs font-black text-white">
                  {index + 1}
                </span>
                <span className="text-sm font-black text-slate-800">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-950/5">
          <p className="text-sm font-black text-emerald-700">추천 시연 순서</p>
          <div className="mt-4 grid gap-3">
            {demoOrder.map((item, index) => (
              <Link
                className="flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-900 transition active:scale-[0.99]"
                href={item.href}
                key={item.href}
              >
                <span>
                  {index + 1}. {item.label}
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-3">
          <PrimaryButton href="/demo">1분 체험하기</PrimaryButton>
          <PrimaryButton href="/guide" variant="dark">
            사용법 보기
          </PrimaryButton>
          <PrimaryButton href="/pricing" variant="outline">
            요금제 보기
          </PrimaryButton>
        </section>
      </div>
    </MobileAppShell>
  );
}
