"use client";

import { useState } from "react";

import { GeneratedResultBox } from "@/components/GeneratedResultBox";
import { GenerationPageLayout } from "@/components/GenerationPageLayout";
import { InputCard } from "@/components/InputCard";
import { OptionChip } from "@/components/OptionChip";
import {
  generateMockReviewReply,
  replyTones,
  reviewTypes,
  type ReplyTone,
  type ReviewType,
} from "@/lib/mockGeneration";

const reviewTypeDescriptions: Record<ReviewType, string> = {
  "좋은 리뷰": "감사 인사와 재방문 유도",
  "불만 리뷰": "사과와 개선 의지",
  "애매한 리뷰": "감사와 아쉬운 점 보완",
};

const toneDescriptions: Record<ReplyTone, string> = {
  "친절한 말투": "부드럽고 자세하게",
  "짧고 깔끔한 말투": "핵심만 빠르게",
  "밝고 귀여운 말투": "가볍고 친근하게",
  "고급스러운 말투": "정중하고 차분하게",
};

const sideNoteItems = [
  "답글이 꾸준하면 가게가 더 신뢰감 있게 보입니다.",
  "불만 리뷰에도 차분히 답하면 다음 손님에게 좋은 인상을 남깁니다.",
  "바쁜 날에도 짧고 정중한 답글을 빠르게 준비할 수 있습니다.",
];

export default function ReviewGenerationPage() {
  const [review, setReview] = useState("");
  const [reviewType, setReviewType] = useState<ReviewType>("좋은 리뷰");
  const [tone, setTone] = useState<ReplyTone>("친절한 말투");
  const [result, setResult] = useState("");

  function handleGenerate() {
    setResult(
      generateMockReviewReply({
        review,
        reviewType,
        tone,
      }),
    );
  }

  return (
    <GenerationPageLayout
      eyebrow="리뷰 답글"
      title="리뷰에 맞는 답글을 10초 안에 정리합니다."
      description="좋은 리뷰에는 감사 인사를, 아쉬운 리뷰에는 정중한 사과와 개선 의지를 담아보세요."
      sideNoteTitle="리뷰 관리가 중요한 이유"
      sideNoteItems={sideNoteItems}
    >
      <div className="grid gap-6">
        <InputCard
          title="손님 리뷰 내용"
          description="손님이 남긴 리뷰를 붙여넣고 리뷰 분위기에 맞는 답글을 만들어보세요."
        >
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">
              손님 리뷰
            </span>
            <textarea
              className="min-h-36 resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-base leading-7 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => setReview(event.target.value)}
              placeholder="예: 직원분이 친절하고 커피가 맛있었어요. 다음에 또 갈게요."
              value={review}
            />
          </label>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold text-slate-800">
              리뷰 유형
            </legend>
            <div className="grid gap-2">
              {reviewTypes.map((type) => (
                <OptionChip
                  description={reviewTypeDescriptions[type]}
                  key={type}
                  label={type}
                  onClick={() => setReviewType(type)}
                  selected={reviewType === type}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold text-slate-800">
              답글 말투
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {replyTones.map((item) => (
                <OptionChip
                  description={toneDescriptions[item]}
                  key={item}
                  label={item}
                  onClick={() => setTone(item)}
                  selected={tone === item}
                />
              ))}
            </div>
          </fieldset>

          <button
            className="min-h-14 rounded-2xl bg-emerald-500 px-5 py-3 text-base font-black text-white shadow-lg shadow-emerald-200/80 transition hover:bg-emerald-600 active:scale-[0.99]"
            onClick={handleGenerate}
            type="button"
          >
            리뷰 답글 만들기
          </button>
        </InputCard>

        <GeneratedResultBox
          emptyDescription="손님 리뷰와 리뷰 유형을 고른 뒤 리뷰 답글 만들기 버튼을 눌러보세요."
          emptyTitle="아직 만든 리뷰 답글이 없습니다."
          result={result}
          successMessage="리뷰 답글을 10초 만에 정리했어요."
          title="손님 리뷰에 남길 답글"
        />
      </div>
    </GenerationPageLayout>
  );
}
