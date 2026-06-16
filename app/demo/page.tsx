"use client";

import Link from "next/link";
import { useState } from "react";

import { MobileAppShell } from "@/components/MobileAppShell";
import { applyQuickStart, type ApplyQuickStartResult } from "@/lib/demo/applyQuickStart";
import {
  quickStartTemplateOptions,
  type QuickStartIndustry,
} from "@/lib/demo/quickStartTemplates";

export default function DemoPage() {
  const [selectedIndustry, setSelectedIndustry] =
    useState<QuickStartIndustry>("cafe");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ApplyQuickStartResult | null>(null);
  const selectedOption = quickStartTemplateOptions.find(
    (option) => option.id === selectedIndustry,
  );

  async function handleStart() {
    setIsLoading(true);
    setResult(null);

    try {
      const quickStartResult = await applyQuickStart(selectedIndustry);

      setResult(quickStartResult);
      window.dispatchEvent(new CustomEvent("demo-data-loaded"));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <MobileAppShell
      actionHref="/agent"
      actionLabel="액션"
      title="1분 체험"
      subtitle="가게 예시를 넣고 바로 AI 매출 액션을 만들어보세요."
    >
      <div className="grid gap-5">
        <section className="rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300">
          <p className="text-sm font-bold text-emerald-300">빠른 시작</p>
          <h2 className="mt-2 text-3xl font-black leading-tight">
            버튼 한 번으로 체험 준비
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">
            업종을 고르면 예시 가게, 질문, 일정, 최근 문구를 채워드려요.
          </p>
        </section>

        <section className="rounded-[1.75rem] bg-white p-4 shadow-lg shadow-slate-950/5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black text-emerald-700">업종 선택</p>
              <h2 className="mt-1 text-xl font-black text-slate-950">
                어떤 가게로 볼까요?
              </h2>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
              6가지
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {quickStartTemplateOptions.map((option) => {
              const active = option.id === selectedIndustry;

              return (
                <button
                  className={`rounded-3xl border p-4 text-left transition active:scale-[0.99] ${
                    active
                      ? "border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-100"
                      : "border-slate-100 bg-slate-50 hover:border-emerald-200"
                  }`}
                  key={option.id}
                  onClick={() => {
                    setSelectedIndustry(option.id);
                    setResult(null);
                  }}
                  type="button"
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-black ${
                      active
                        ? "bg-emerald-500 text-white"
                        : "bg-white text-slate-600"
                    }`}
                  >
                    {option.label.slice(0, 1)}
                  </span>
                  <strong className="mt-3 block text-base font-black text-slate-950">
                    {option.label}
                  </strong>
                  <span className="mt-1 block text-xs font-bold leading-5 text-slate-500">
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-[1.75rem] bg-[linear-gradient(135deg,#ecfdf5_0%,#ffffff_70%)] p-5 shadow-lg shadow-emerald-950/5">
          <p className="text-sm font-black text-emerald-700">
            첫 추천 액션
          </p>
          <h2 className="mt-2 text-2xl font-black leading-8 text-slate-950">
            {selectedOption?.recommendedFirstAction}
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
            기존 내용에 예시를 더해서 바로 체험합니다.
          </p>
          <button
            className="mt-5 flex min-h-14 w-full items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-base font-black text-white shadow-lg shadow-emerald-200 transition active:scale-[0.99] disabled:opacity-60"
            disabled={isLoading}
            onClick={handleStart}
            type="button"
          >
            {isLoading ? "준비하는 중" : "예시 가게로 시작하기"}
          </button>
        </section>

        {result ? (
          <section className="rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-950/5">
            <p className="text-sm font-black text-emerald-700">
              예시 가게를 준비했어요.
            </p>
            <h2 className="mt-2 text-2xl font-black leading-8 text-slate-950">
              이제 오늘 매출 액션을 만들어보세요.
            </h2>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs font-bold text-slate-500">질문</p>
                <p className="mt-1 text-lg font-black text-slate-950">
                  {result.faqCount}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs font-bold text-slate-500">일정</p>
                <p className="mt-1 text-lg font-black text-slate-950">
                  {result.eventCount}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs font-bold text-slate-500">문구</p>
                <p className="mt-1 text-lg font-black text-slate-950">
                  {result.generationCount}
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              <Link
                className="flex min-h-14 items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-base font-black text-white transition active:scale-[0.99]"
                href="/agent"
              >
                오늘 액션 만들기
              </Link>
              <Link
                className="flex min-h-12 items-center justify-center rounded-2xl bg-emerald-50 px-5 py-3 text-sm font-black text-emerald-800 transition active:scale-[0.99]"
                href="/dashboard"
              >
                홈에서 둘러보기
              </Link>
            </div>
          </section>
        ) : null}
      </div>
    </MobileAppShell>
  );
}
