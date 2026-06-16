import { FeatureCard } from "@/components/FeatureCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SectionTitle } from "@/components/SectionTitle";

const problems = [
  {
    icon: "⏰",
    title: "답장이 늦으면 예약을 놓칩니다.",
    description: "바쁜 시간에도 문의를 챙겨보세요.",
  },
  {
    icon: "★",
    title: "리뷰 답글은 신뢰를 만듭니다.",
    description: "짧고 정중하게 관리하세요.",
  },
  {
    icon: "↗",
    title: "홍보글은 매출 기회입니다.",
    description: "오늘 소식을 바로 알려보세요.",
  },
];

const features = [
  {
    title: "손님 문의 답장 만들기",
    description: "자주 오는 질문에 바로 답합니다.",
    iconText: "💬",
    buttonText: "답장 만들기",
    href: "/generate/inquiry",
  },
  {
    title: "리뷰 답글 만들기",
    description: "감사와 사과를 짧게 정리합니다.",
    iconText: "★",
    buttonText: "리뷰 답글 보기",
    href: "/generate/review",
  },
  {
    title: "오늘의 홍보글 만들기",
    description: "오늘 올릴 글을 바로 준비합니다.",
    iconText: "↗",
    buttonText: "홍보글 보기",
    href: "/generate/promo",
  },
  {
    title: "오늘 일정 보기",
    description: "오늘 할 일을 한눈에 봅니다.",
    iconText: "□",
    buttonText: "일정 보기",
    href: "/calendar",
  },
];

const steps = [
  {
    step: "1",
    title: "가게 정보 입력",
    description: "기본 정보만 적습니다.",
  },
  {
    step: "2",
    title: "손님 글 붙여넣기",
    description: "문의나 리뷰를 넣습니다.",
  },
  {
    step: "3",
    title: "문구 만들기",
    description: "쓸 문구를 확인합니다.",
  },
  {
    step: "4",
    title: "복사해서 사용",
    description: "복사해서 붙여넣습니다.",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#fbfffd] text-slate-950">
      <section className="relative border-b border-emerald-100 bg-[linear-gradient(135deg,#ecfdf5_0%,#ffffff_50%,#ecfeff_100%)]">
        <div className="mx-auto grid min-h-[calc(100dvh-4rem)] w-full max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_390px] lg:py-14">
          <div className="flex flex-col items-start">
            <p className="rounded-full bg-white px-4 py-2 text-sm font-black text-emerald-700 shadow-sm">
              사장님 전용 AI 업무 앱
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              사장님, 오늘 할 일을 AI가 정리해드릴게요.
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-slate-700 sm:text-xl">
              답장, 리뷰, 홍보글을 한 번에 준비하세요.
            </p>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-slate-600">
              복잡한 설정 없이 1분 만에 체험해보세요. 복사해서 바로 쓰는 AI 알바생입니다.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <PrimaryButton className="w-full sm:w-auto" href="/demo">
                1분 체험하기
              </PrimaryButton>
              <PrimaryButton
                className="w-full sm:w-auto"
                href="/agent"
                variant="outline"
              >
                오늘 액션 보기
              </PrimaryButton>
              <PrimaryButton
                className="w-full sm:w-auto"
                href="/pricing"
                variant="outline"
              >
                요금제 보기
              </PrimaryButton>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[360px] rounded-[2rem] border border-emerald-100 bg-slate-950 p-3 shadow-2xl shadow-emerald-950/20">
            <div className="rounded-[1.65rem] bg-[#fbfffd] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-emerald-700">
                    오늘의 홈
                  </p>
                  <h2 className="mt-1 text-xl font-black leading-7 text-slate-950">
                    오늘은 이 일부터 줄여볼까요?
                  </h2>
                </div>
                <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-black text-white">
                  15분 절약
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {["문의", "리뷰", "홍보"].map((item) => (
                  <div
                    className="rounded-2xl bg-white p-3 text-center text-xs font-black text-slate-700 shadow-md shadow-slate-950/5"
                    key={item}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-[1.4rem] bg-emerald-50 p-4">
                <p className="text-xs font-black text-emerald-700">
                  가장 먼저 할 일
                </p>
                <p className="mt-2 text-base font-black leading-6 text-slate-950">
                  오후 예약 문의에 답장하기
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  손님 질문을 붙여넣으면 바로 보낼 문구를 준비해요.
                </p>
              </div>

              <div className="mt-4 rounded-[1.4rem] bg-white p-4 shadow-md shadow-slate-950/5">
                <p className="text-xs font-black text-slate-500">손님 질문</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">
                  오늘 저녁 7시에 4명 예약 가능한가요?
                </p>
                <div className="mt-3 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-3">
                  <p className="text-xs font-black text-emerald-700">
                    추천 답장
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                    안녕하세요. 문의 주셔서 감사합니다. 원하시는 시간과
                    인원을 확인해 예약 가능 여부를 안내드리겠습니다.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-1 rounded-2xl bg-white p-2 text-center text-[0.68rem] font-black text-slate-500 shadow-md shadow-slate-950/5">
                <span className="rounded-xl bg-emerald-500 py-2 text-white">
                  홈
                </span>
                <span className="py-2">만들기</span>
                <span className="py-2">일정</span>
                <span className="py-2">가게</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <SectionTitle
          eyebrow="왜 필요한가요?"
          title="답장과 홍보가 밀리면 매출 기회를 놓칠 수 있습니다."
          description="AI 사장님 매출 비서는 사장님이 매일 놓치기 쉬운 응대와 홍보 일을 휴대폰 안에서 바로 처리하게 돕습니다."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {problems.map((problem) => (
            <article
              className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-950/5"
              key={problem.title}
            >
              <div className="text-3xl" aria-hidden>
                {problem.icon}
              </div>
              <h3 className="mt-4 text-xl font-black leading-7 text-slate-950">
                {problem.title}
              </h3>
              <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                {problem.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <SectionTitle
            align="center"
            eyebrow="주요 기능"
            title="사장님이 매일 쓰는 기능만 먼저 담았습니다."
            description="매일 쓰는 일만 담았습니다."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <FeatureCard {...feature} key={feature.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <SectionTitle
            eyebrow="사용 방법"
            title="처음 쓰는 사장님도 휴대폰에서 바로 시작할 수 있습니다."
            description="확인하고 복사해서 쓰는 방식입니다."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {steps.map((item) => (
              <article
                className="rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-lg shadow-emerald-950/5"
                key={item.step}
              >
                <p className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-black text-white">
                  {item.step}
                </p>
                <h3 className="mt-4 text-lg font-black text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-200 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold text-emerald-300">
                오늘 바로 시작
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                오늘부터 답장 시간을 줄여보세요.
              </h2>
              <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-slate-300">
              리뷰 답글, 홍보글, 일정까지 한 번에 준비하세요.
            </p>
            </div>
            <PrimaryButton href="/demo">1분 체험하기</PrimaryButton>
          </div>
        </div>
      </section>
    </main>
  );
}
