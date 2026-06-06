"use client";

import { useState } from "react";

import { PreviewReplyCard } from "@/components/PreviewReplyCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SectionTitle } from "@/components/SectionTitle";
import { ToneSelector } from "@/components/ToneSelector";

const businessTypes = [
  "카페",
  "음식점",
  "미용실",
  "네일샵",
  "학원",
  "숙박업",
  "소매점",
  "기타",
];

const tips = [
  "영업시간 문의에 같은 답을 반복하지 않아도 됩니다.",
  "리뷰 답글에 가게 분위기와 말투가 자연스럽게 담깁니다.",
  "홍보글에 대표 메뉴와 매장 특징을 쉽게 넣을 수 있습니다.",
];

export default function SetupPage() {
  const [saved, setSaved] = useState(false);

  return (
    <main className="min-h-screen bg-[#fbfffd] text-slate-950">
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <SectionTitle
              eyebrow="가게 정보 등록"
              title="좋은 답장은 정확한 가게 정보에서 시작합니다."
              description="처음에는 간단히 적어도 충분합니다. 나중에 언제든 더 자세히 채울 수 있습니다."
            />

            <form
              className="mt-8 rounded-lg border border-emerald-100 bg-white p-5 shadow-xl shadow-emerald-950/5 sm:p-6"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-slate-800">
                      가게 이름
                    </span>
                    <input
                      className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                      placeholder="예: 연남동 초록카페"
                      type="text"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-slate-800">
                      업종
                    </span>
                    <select className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-base outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100">
                      {businessTypes.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-800">
                    영업시간
                  </span>
                  <input
                    className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                    placeholder="예: 매일 10:00 - 21:00, 월요일 휴무"
                    type="text"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-800">주소</span>
                  <input
                    className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                    placeholder="예: 서울 마포구 성미산로 00"
                    type="text"
                  />
                </label>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-slate-800">
                      전화번호
                    </span>
                    <input
                      className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                      placeholder="예: 02-000-0000"
                      type="tel"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-slate-800">
                      대표 메뉴
                    </span>
                    <input
                      className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                      placeholder="예: 바닐라 라떼, 딸기 케이크"
                      type="text"
                    />
                  </label>
                </div>

                <ToneSelector />

                <div
                  className="rounded-lg border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900"
                  aria-live="polite"
                >
                  {saved
                    ? "가게 정보가 임시 저장되었습니다. 이제 답장 만들기를 체험해보세요."
                    : "오늘은 화면 확인 단계라 실제 저장은 다음 작업에서 연결합니다. 먼저 어떤 정보를 받을지 보기 좋게 정리했습니다."}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <PrimaryButton
                    className="sm:w-auto"
                    onClick={() => setSaved(true)}
                  >
                    가게 정보 저장하기
                  </PrimaryButton>
                  {saved ? (
                    <PrimaryButton href="/generate/inquiry" variant="soft">
                      답장 만들기 체험하기
                    </PrimaryButton>
                  ) : null}
                  <PrimaryButton href="/dashboard" variant="outline">
                    대시보드로 돌아가기
                  </PrimaryButton>
                </div>
              </div>
            </form>
          </div>

          <aside className="grid gap-5">
            <div className="rounded-lg border border-emerald-100 bg-white p-5 shadow-xl shadow-emerald-950/5">
              <h2 className="text-xl font-black text-slate-950">
                입력하면 좋아지는 점
              </h2>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-700">
                {tips.map((tip) => (
                  <li className="rounded-lg bg-emerald-50 p-4" key={tip}>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <PreviewReplyCard
              label="가게 정보 반영 예시"
              question="오늘 딸기 케이크 있나요?"
              reply="안녕하세요. 오늘 딸기 케이크 준비되어 있습니다. 방문 전 연락 주시면 원하시는 시간에 맞춰 챙겨드릴게요."
            />
          </aside>
        </div>
      </section>
    </main>
  );
}
