import { MobileAppShell } from "@/components/MobileAppShell";
import { PrimaryButton } from "@/components/PrimaryButton";

const roadmapItems = [
  {
    step: "1단계",
    title: "로그인과 가게 정보 저장",
    description: "내 가게 말투와 기록을 이어서 씁니다.",
    value: "반복 사용 이유가 생깁니다.",
    target: "처음 쓰는 사장님",
  },
  {
    step: "2단계",
    title: "결제와 구독",
    description: "자주 쓰는 사장님에게 더 많은 생성을 제공합니다.",
    value: "월 구독 매출을 만듭니다.",
    target: "매일 답장하는 사장님",
  },
  {
    step: "3단계",
    title: "채널 연동",
    description: "카카오톡, 인스타, 네이버 작업을 더 쉽게 이어갑니다.",
    value: "손님 응대 시간이 줄어듭니다.",
    target: "문의가 많은 매장",
  },
  {
    step: "4단계",
    title: "상권과 날씨 추천",
    description: "비 오는 날에는 카페 홍보글을 추천합니다.",
    value: "홍보 타이밍을 잡아줍니다.",
    target: "홍보가 어려운 사장님",
  },
  {
    step: "5단계",
    title: "여러 매장 관리",
    description: "여러 매장을 한 화면에서 관리합니다.",
    value: "비즈니스 플랜으로 확장합니다.",
    target: "다점포 운영자",
  },
  {
    step: "6단계",
    title: "글로벌 영어 버전",
    description: "해외 사장님도 쉽게 답장과 홍보를 준비합니다.",
    value: "글로벌 시장으로 넓어집니다.",
    target: "해외 소상공인",
  },
];

export default function RoadmapPage() {
  return (
    <MobileAppShell
      actionHref="/submission"
      actionLabel="요약"
      title="앞으로 이렇게 커집니다"
      subtitle="AI 매출 비서가 더 많은 업무를 도와드립니다."
    >
      <div className="grid gap-5">
        <section className="rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300">
          <p className="text-sm font-black text-emerald-300">업데이트 방향</p>
          <h2 className="mt-2 text-3xl font-black leading-tight">
            단순 문구 생성기에서 AI 직원으로
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">
            답장, 리뷰, 홍보, 일정, 매장 관리를 하나씩 연결합니다.
          </p>
        </section>

        <section className="grid gap-4">
          {roadmapItems.map((item) => (
            <article
              className="rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-950/5"
              key={item.step}
            >
              <p className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                {item.step}
              </p>
              <h2 className="mt-3 text-xl font-black leading-7 text-slate-950">
                {item.title}
              </h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                {item.description}
              </p>
              <div className="mt-4 grid gap-2">
                <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-black text-slate-700">
                  돈이 되는 이유: {item.value}
                </p>
                <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-800">
                  좋아할 사장님: {item.target}
                </p>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-3">
          <PrimaryButton href="/guide">사용법 보기</PrimaryButton>
          <PrimaryButton href="/pricing" variant="dark">
            요금제 보기
          </PrimaryButton>
        </section>
      </div>
    </MobileAppShell>
  );
}
