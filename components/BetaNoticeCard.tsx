import Link from "next/link";

export function BetaNoticeCard() {
  return (
    <section className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50 p-4 text-sm font-bold leading-6 text-emerald-950">
      <p className="text-base font-black text-emerald-900">
        현재는 베타 테스트 버전입니다.
      </p>
      <p className="mt-2 text-emerald-800">
        사장님 의견을 반영해 정식 버전을 준비하고 있어요.
      </p>
      <Link
        className="mt-4 inline-flex min-h-11 items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-black text-emerald-800 shadow-sm transition active:scale-[0.98]"
        href="/feedback"
      >
        의견 남기기
      </Link>
    </section>
  );
}
