export function BetaNoticeCard() {
  return (
    <section className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50 p-4 text-sm font-bold leading-6 text-emerald-950">
      <p className="text-base font-black text-emerald-900">
        현재는 베타 테스트 버전입니다.
      </p>
      <p className="mt-2 text-emerald-800">
        가게 정보와 기록은 테스트용으로 저장됩니다. 정식 버전에서는 더
        안전한 저장 기능이 추가됩니다.
      </p>
    </section>
  );
}
