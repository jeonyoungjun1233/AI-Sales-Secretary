import { DashboardActionCard } from "@/components/DashboardActionCard";
import { PreviewReplyCard } from "@/components/PreviewReplyCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SectionTitle } from "@/components/SectionTitle";
import { UsageSummaryCard } from "@/components/UsageSummaryCard";

const recommendationCards = [
  {
    title: "비 오는 날 홍보글 만들기",
    description: "따뜻한 메뉴나 당일 할인 소식을 손님에게 알리기 좋습니다.",
    iconText: "☔",
    buttonText: "홍보글 만들기",
    href: "/generate/promo",
    helperText: "오늘 추천",
    accent: "blue" as const,
  },
  {
    title: "최근 리뷰 답글 작성하기",
    description: "밀린 리뷰에 짧고 정중한 답글을 남겨 신뢰를 높입니다.",
    iconText: "⭐",
    buttonText: "답글 만들기",
    href: "/generate/review",
    helperText: "리뷰 2개 대기",
    accent: "amber" as const,
  },
  {
    title: "자주 묻는 질문 정리하기",
    description: "영업시간, 예약, 주차 안내를 미리 정리해 답장을 빠르게 합니다.",
    iconText: "📝",
    buttonText: "준비 중",
    helperText: "처음 3개 추천",
    accent: "mint" as const,
    disabled: true,
  },
];

const mainActions = [
  {
    title: "손님 문의 답장 만들기",
    description: "손님 질문을 붙여넣고 바로 보낼 답장을 만듭니다.",
    iconText: "💬",
    buttonText: "답장 만들기",
    href: "/generate/inquiry",
    accent: "mint" as const,
  },
  {
    title: "리뷰 답글 만들기",
    description: "감사, 사과, 재방문 안내를 자연스럽게 정리합니다.",
    iconText: "⭐",
    buttonText: "답글 만들기",
    href: "/generate/review",
    accent: "amber" as const,
  },
  {
    title: "오늘의 홍보글 만들기",
    description: "신메뉴와 이벤트 소식을 쉽게 올릴 문장으로 바꿉니다.",
    iconText: "📣",
    buttonText: "홍보글 만들기",
    href: "/generate/promo",
    accent: "pink" as const,
  },
  {
    title: "FAQ 관리",
    description: "반복되는 질문과 답변을 미리 정리합니다.",
    iconText: "📝",
    buttonText: "준비 중",
    accent: "blue" as const,
    disabled: true,
  },
  {
    title: "가게 정보 관리",
    description: "영업시간, 주소, 대표 메뉴, 말투를 정리합니다.",
    iconText: "🏪",
    buttonText: "정보 수정",
    href: "/setup",
    accent: "slate" as const,
  },
];

const usageItems = [
  { label: "오늘 생성", value: "3회" },
  { label: "무료 이용", value: "10회 중" },
  { label: "남은 횟수", value: "7회" },
];

const recentReplies = [
  {
    question: "주차 가능한가요?",
    reply:
      "안녕하세요. 매장 앞 주차는 어렵지만, 도보 2분 거리에 공영주차장이 있습니다. 방문 전 편하게 문의 주세요.",
  },
  {
    question: "오늘 케이크 예약 되나요?",
    reply:
      "문의 주셔서 감사합니다. 오늘 케이크 예약 가능합니다. 원하시는 픽업 시간과 성함을 남겨주시면 준비해드릴게요.",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#fbfffd] pb-24 text-slate-950 sm:pb-0">
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-lg border border-emerald-100 bg-[linear-gradient(135deg,#ecfdf5_0%,#ffffff_55%,#ecfeff_100%)] p-6 shadow-xl shadow-emerald-950/5 sm:p-8">
            <p className="text-sm font-black text-emerald-700">
              오늘의 업무 줄이기
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-0.02em] text-slate-950 sm:text-4xl">
              사장님, 오늘은 어떤 일을 줄여드릴까요?
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              금요일 오후, 문의 답장과 리뷰 답글을 먼저 정리하기 좋은
              시간입니다.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="/generate/inquiry">답장 만들기</PrimaryButton>
              <PrimaryButton href="/setup" variant="outline">
                가게 정보 정리하기
              </PrimaryButton>
            </div>
          </div>

          <UsageSummaryCard
            title="오늘 사용량"
            description="오늘 3회 생성 / 무료 플랜 10회 중"
            items={usageItems}
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
        <SectionTitle
          eyebrow="오늘의 추천 작업"
          title="지금 하면 좋은 일을 골라봤습니다."
          description="처음 화면에서 바로 눌러볼 수 있도록 자주 쓰는 일을 앞에 배치했습니다."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {recommendationCards.map((card) => (
            <DashboardActionCard {...card} key={card.title} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
        <SectionTitle
          eyebrow="주요 기능"
          title="사장님이 자주 쓰는 기능"
          description="문의 답장, 리뷰 답글, 홍보글, FAQ, 가게 정보를 한곳에서 시작합니다."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {mainActions.map((card) => (
            <DashboardActionCard {...card} key={card.title} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <SectionTitle
          eyebrow="최근 답장 미리보기"
          title="복사해서 쓸 수 있는 문안이 이렇게 보입니다."
          description="마음에 드는 문안은 복사해서 실제 채널에 바로 붙여넣을 수 있습니다."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {recentReplies.map((reply) => (
            <PreviewReplyCard
              key={reply.question}
              question={reply.question}
              reply={reply.reply}
              label="최근 만든 답장"
            />
          ))}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-emerald-100 bg-white/95 p-4 shadow-2xl shadow-slate-300 backdrop-blur sm:hidden">
        <PrimaryButton className="w-full" href="/generate/inquiry">
          답장 만들기
        </PrimaryButton>
      </div>
    </main>
  );
}
