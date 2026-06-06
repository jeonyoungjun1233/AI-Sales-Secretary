import { FeatureCard } from "@/components/FeatureCard";
import { PreviewReplyCard } from "@/components/PreviewReplyCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SectionTitle } from "@/components/SectionTitle";

const problems = [
  {
    icon: "⏰",
    title: "손님 답장이 늦어져요",
    description: "바쁜 영업 중에는 예약, 위치, 가격 문의에 바로 답하기 어렵습니다.",
  },
  {
    icon: "💬",
    title: "리뷰 답글이 부담돼요",
    description: "좋은 리뷰도, 아쉬운 리뷰도 매번 말투를 고민하게 됩니다.",
  },
  {
    icon: "📣",
    title: "홍보글이 잘 안 떠올라요",
    description: "오늘 올릴 소식은 있는데 어떤 문장으로 써야 할지 막힙니다.",
  },
];

const features = [
  {
    title: "손님 문의 답장 만들기",
    description: "문의 내용을 붙여넣으면 바로 보낼 답장 초안을 준비합니다.",
    iconText: "💬",
    buttonText: "답장 만들기",
    href: "/generate/inquiry",
  },
  {
    title: "리뷰 답글 만들기",
    description: "감사 인사와 사과 문구를 상황에 맞게 정리해줍니다.",
    iconText: "⭐",
    buttonText: "리뷰 답글 보기",
    href: "/generate/review",
  },
  {
    title: "오늘의 홍보글 만들기",
    description: "신메뉴, 할인, 날씨 소식을 손님이 보고 싶은 문장으로 바꿉니다.",
    iconText: "📣",
    buttonText: "홍보글 보기",
    href: "/generate/promo",
  },
  {
    title: "FAQ 관리",
    description: "자주 묻는 영업시간, 예약, 주차 안내를 한곳에 모읍니다.",
    iconText: "📝",
    buttonText: "FAQ 준비하기",
    href: "/setup",
  },
];

const steps = [
  { step: "1단계", title: "가게 정보 입력", description: "가게명, 업종, 영업시간을 간단히 적습니다." },
  { step: "2단계", title: "손님 질문 붙여넣기", description: "문의나 리뷰 내용을 그대로 넣습니다." },
  { step: "3단계", title: "답장 생성", description: "가게 말투에 맞는 문안을 확인합니다." },
  { step: "4단계", title: "복사해서 사용", description: "마음에 들면 바로 복사해 보냅니다." },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#fbfffd] text-slate-950">
      <section className="relative border-b border-emerald-100 bg-[linear-gradient(135deg,#f0fdf4_0%,#ffffff_46%,#ecfeff_100%)]">
        <div className="mx-auto grid min-h-[calc(100dvh-4rem)] w-full max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_440px] lg:py-16">
          <div className="flex flex-col items-start">
            <p className="rounded-full bg-white px-4 py-2 text-sm font-bold text-emerald-700 shadow-sm">
              사장님 답장 시간을 줄여주는 쉬운 업무 도구
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-[-0.02em] text-slate-950 sm:text-5xl lg:text-6xl">
              사장님, 손님 답장 놓치지 마세요.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
              문의 답장, 리뷰 답글, 홍보글을 10초 만에 만들어드립니다.
              복잡한 자동화 없이 복사해서 바로 사용하세요.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              처음에는 자동 전송 없이, 사장님이 직접 확인하고 복사해서 쓰는
              안전한 방식입니다.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <PrimaryButton className="w-full sm:w-auto" href="/generate/inquiry">
                무료로 시작하기
              </PrimaryButton>
              <PrimaryButton
                className="w-full sm:w-auto"
                href="/dashboard"
                variant="outline"
              >
                데모 보기
              </PrimaryButton>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-lg bg-emerald-200/40 blur-2xl" />
            <div className="relative grid gap-4">
              <PreviewReplyCard
                question="오늘 저녁 7시에 4명 예약 가능한가요?"
                reply="안녕하세요. 문의 주셔서 감사합니다. 오늘 저녁 7시 4명 예약 가능합니다. 성함과 연락처를 남겨주시면 바로 예약 도와드릴게요."
              />
              <div className="grid grid-cols-3 gap-3">
                {["문의 답장", "리뷰 답글", "홍보글"].map((item) => (
                  <div
                    className="rounded-lg bg-white p-3 text-center text-sm font-bold text-slate-700 shadow-md shadow-emerald-950/5"
                    key={item}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <SectionTitle
          eyebrow="사장님이 매일 겪는 문제"
          title="바쁜 하루에 답장, 리뷰, 홍보까지 챙기기 어렵습니다."
          description="AI 사장님 매출 비서는 어려운 설정 대신 사장님이 매일 하는 일을 쉬운 카드로 정리합니다."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {problems.map((problem) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-950/5"
              key={problem.title}
            >
              <div className="text-3xl" aria-hidden>
                {problem.icon}
              </div>
              <h3 className="mt-4 text-xl font-black text-slate-950">
                {problem.title}
              </h3>
              <p className="mt-2 text-base leading-7 text-slate-600">
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
            title="사장님이 바로 눌러볼 수 있는 쉬운 기능"
            description="기능 이름만 봐도 어떤 일을 줄여주는지 알 수 있게 구성했습니다."
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
            title="처음 쓰는 사장님도 4단계면 충분합니다."
            description="자동으로 보내지 않고, 사장님이 눈으로 확인한 뒤 복사해서 쓰는 방식이라 부담이 적습니다."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {steps.map((item) => (
              <article
                className="rounded-lg border border-emerald-100 bg-white p-5 shadow-lg shadow-emerald-950/5"
                key={item.step}
              >
                <p className="text-sm font-black text-emerald-700">
                  {item.step}
                </p>
                <h3 className="mt-3 text-lg font-black text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="rounded-lg bg-slate-950 p-6 text-white shadow-2xl shadow-slate-200 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold text-emerald-300">
                오늘 바로 시작
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                오늘부터 답장 시간을 줄여보세요.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                가게 정보를 간단히 적고, 손님 질문을 붙여넣는 흐름부터
                확인해볼 수 있습니다.
              </p>
            </div>
            <PrimaryButton href="/generate/inquiry">무료로 시작하기</PrimaryButton>
          </div>
        </div>
      </section>
    </main>
  );
}
