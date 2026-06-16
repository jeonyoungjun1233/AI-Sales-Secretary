"use client";

import { useState } from "react";

import { MobileAppShell } from "@/components/MobileAppShell";
import { addBetaFeedback } from "@/lib/storage/feedbackStore";

const featureOptions = ["문의 답장", "리뷰 답글", "홍보글", "일정", "FAQ"];
const priceOptions = ["무료라면 사용", "월 9,900원", "월 29,000원", "아직 모르겠음"];

export default function FeedbackPage() {
  const [wouldUse, setWouldUse] = useState("써볼 것 같아요");
  const [neededFeature, setNeededFeature] = useState("문의 답장");
  const [price, setPrice] = useState("월 9,900원");
  const [memo, setMemo] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    const feedback = {
      wouldUse,
      neededFeature,
      price,
      memo,
      createdAt: new Date().toISOString(),
    };

    try {
      addBetaFeedback(feedback);
    } catch {
      // 의견 저장이 실패해도 제출 흐름은 유지합니다.
    }

    setSubmitted(true);
  }

  return (
    <MobileAppShell
      actionHref="/pricing"
      actionLabel="플랜"
      title="30초 의견"
      subtitle="정식 버전에 반영하겠습니다."
    >
      <div className="grid gap-5">
        <section className="rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300">
          <p className="text-sm font-black text-emerald-300">베타 테스트</p>
          <h2 className="mt-2 text-3xl font-black leading-tight">
            써볼 만한지 알려주세요.
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">
            네 가지 질문만 답하면 끝입니다.
          </p>
        </section>

        {submitted ? (
          <section className="rounded-[1.75rem] bg-white p-5 text-center shadow-lg shadow-slate-950/5">
            <p className="text-4xl" aria-hidden>
              ✓
            </p>
            <h2 className="mt-3 text-2xl font-black text-slate-950">
              의견 감사합니다.
            </h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
              정식 버전에 반영하겠습니다.
            </p>
          </section>
        ) : (
          <section className="grid gap-4 rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-950/5">
            <FeedbackSelect
              label="실제로 쓸 것 같나요?"
              onChange={setWouldUse}
              options={["써볼 것 같아요", "기능을 더 보고 싶어요", "아직은 어려워요"]}
              value={wouldUse}
            />

            <FeedbackSelect
              label="가장 필요한 기능은 무엇인가요?"
              onChange={setNeededFeature}
              options={featureOptions}
              value={neededFeature}
            />

            <FeedbackSelect
              label="월 얼마면 괜찮나요?"
              onChange={setPrice}
              options={priceOptions}
              value={price}
            />

            <label className="grid gap-2">
              <span className="text-sm font-black text-slate-800">
                한마디 의견
              </span>
              <textarea
                className="min-h-28 resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base leading-7 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                onChange={(event) => setMemo(event.target.value)}
                placeholder="예: 가장 필요했던 기능이나 불편한 점을 적어주세요."
                value={memo}
              />
            </label>

            <button
              className="min-h-14 rounded-2xl bg-emerald-500 px-5 py-3 text-base font-black text-white shadow-lg shadow-emerald-200 transition active:scale-[0.99]"
              onClick={handleSubmit}
              type="button"
            >
              의견 남기기
            </button>
          </section>
        )}
      </div>
    </MobileAppShell>
  );
}

type FeedbackSelectProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

function FeedbackSelect({
  label,
  options,
  value,
  onChange,
}: FeedbackSelectProps) {
  return (
    <fieldset className="grid gap-2">
      <legend className="text-sm font-black text-slate-800">{label}</legend>
      <div className="grid gap-2">
        {options.map((option) => (
          <button
            className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition active:scale-[0.99] ${
              value === option
                ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                : "border-slate-200 bg-white text-slate-600"
            }`}
            key={option}
            onClick={() => onChange(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
