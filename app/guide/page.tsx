import { GuideQuickNav } from "@/components/GuideQuickNav";
import { GuideStepCard } from "@/components/GuideStepCard";
import { MobileAppShell } from "@/components/MobileAppShell";
import { PrimaryButton } from "@/components/PrimaryButton";

const guideSteps = [
  {
    step: "1",
    title: "1분 체험",
    description: "예시 가게로 바로 시작해요.",
    href: "/demo",
    buttonLabel: "체험하기",
    screenEyebrow: "빠른 시작",
    screenTitle: "예시 가게로 시작",
    screenItems: ["예시 가게로 시작하기", "카페 고르기", "오늘 액션 보기"],
    callout: "여기",
  },
  {
    step: "2",
    title: "업종 선택",
    description: "카페, 음식점, 네일샵 중 골라요.",
    href: "/demo",
    buttonLabel: "업종 고르기",
    screenEyebrow: "업종 선택",
    screenTitle: "어떤 가게로 볼까요?",
    screenItems: ["카페", "음식점", "네일샵"],
    callout: "선택",
  },
  {
    step: "3",
    title: "오늘 액션",
    description: "답장, 리뷰, 홍보를 한 번에 준비해요.",
    href: "/agent",
    buttonLabel: "액션 만들기",
    screenEyebrow: "원클릭 준비",
    screenTitle: "오늘 할 일 준비",
    screenItems: ["오늘 액션 만들기", "오늘 현황", "완료율"],
    callout: "누르기",
  },
  {
    step: "4",
    title: "문구 확인",
    description: "만든 문구를 읽고 확인해요.",
    href: "/generate/inquiry",
    buttonLabel: "답장 보기",
    screenEyebrow: "답장 만들기",
    screenTitle: "손님 질문 입력",
    screenItems: ["답장 만들기", "말투 선택", "결과 확인"],
    callout: "확인",
  },
  {
    step: "5",
    title: "복사해서 사용",
    description: "카카오톡이나 인스타에 붙여넣어요.",
    href: "/history",
    buttonLabel: "기록 보기",
    screenEyebrow: "최근 기록",
    screenTitle: "다시 복사하기",
    screenItems: ["복사하기", "기록 보기", "삭제"],
    callout: "복사",
  },
  {
    step: "6",
    title: "일정에 남기기",
    description: "홍보할 일을 달력에 넣어요.",
    href: "/calendar",
    buttonLabel: "일정 보기",
    screenEyebrow: "오늘 할 일",
    screenTitle: "달력에서 확인",
    screenItems: ["일정 추가하기", "날짜 선택", "오늘 보기"],
    callout: "추가",
  },
];

export default function GuidePage() {
  return (
    <MobileAppShell
      actionHref="/demo"
      actionLabel="체험"
      title="사용법"
      subtitle="버튼만 따라 누르면 바로 체험할 수 있어요."
    >
      <div className="grid gap-5">
        <section className="rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300">
          <p className="text-sm font-black text-emerald-300">처음이라면</p>
          <h2 className="mt-2 text-3xl font-black leading-tight">
            6단계만 따라오세요.
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">
            예시 가게를 고르고, 오늘 쓸 문구를 만들고, 복사하면 끝입니다.
          </p>
          <div className="mt-5 grid gap-3">
            <PrimaryButton href="/demo">1분 체험하기</PrimaryButton>
            <PrimaryButton href="/submission" variant="outline">
              한눈에 보기
            </PrimaryButton>
          </div>
        </section>

        <GuideQuickNav
          links={[
            { href: "/demo", label: "1분 체험" },
            { href: "/agent", label: "오늘 액션" },
            { href: "/history", label: "기록" },
            { href: "/calendar", label: "일정" },
          ]}
        />

        <section className="grid gap-4">
          {guideSteps.map((step) => (
            <GuideStepCard {...step} key={step.step} />
          ))}
        </section>

        <section className="rounded-[1.75rem] bg-emerald-50 p-5">
          <p className="text-sm font-black text-emerald-700">핵심만 기억</p>
          <h2 className="mt-2 text-2xl font-black leading-8 text-slate-950">
            만들고, 확인하고, 복사하세요.
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
            자동 전송이 아니라 사장님이 직접 확인하고 쓰는 안전한 방식입니다.
          </p>
        </section>
      </div>
    </MobileAppShell>
  );
}
