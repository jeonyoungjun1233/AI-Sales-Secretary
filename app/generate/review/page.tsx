"use client";

import { useState } from "react";

import { GeneratedResultBox } from "@/components/GeneratedResultBox";
import { GenerationPageLayout } from "@/components/GenerationPageLayout";
import { InputCard } from "@/components/InputCard";
import { OptionChip } from "@/components/OptionChip";
import { getGenerationContext } from "@/lib/ai/generationContext";
import { requestGeneration } from "@/lib/ai/requestGeneration";
import {
  reviewCategoryOptions,
  toneOptions,
  type GenerateResponse,
  type GenerateTone,
  type ReviewCategory,
} from "@/lib/ai/types";
import { addGenerationHistory } from "@/lib/storage/generationHistoryStore";

const sideNoteItems = [
  "꾸준한 답글이 신뢰를 만듭니다.",
  "아쉬운 리뷰도 차분히 답하세요.",
  "바쁜 날에도 짧게 준비합니다.",
];

export default function ReviewGenerationPage() {
  const [review, setReview] = useState("");
  const [reviewType, setReviewType] = useState<ReviewCategory>("positive");
  const [tone, setTone] = useState<GenerateTone>("friendly");
  const [response, setResponse] = useState<GenerateResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notice, setNotice] = useState("");

  async function handleGenerate() {
    if (!review.trim()) {
      setResponse(null);
      setNotice("리뷰 내용을 붙여넣어 주세요.");
      return;
    }

    setNotice("");
    setIsGenerating(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 450));

      const nextResponse = await requestGeneration({
        type: "review",
        input: review,
        category: reviewType,
        tone,
        context: getGenerationContext(),
      });

      addGenerationHistory({
        type: "review",
        title: nextResponse.title || "리뷰 답글",
        input: review,
        output: nextResponse.text,
        tone,
        category: reviewType,
        savedMinutes: nextResponse.savedMinutes,
      });
      setResponse(nextResponse);
    } catch {
      setResponse(null);
      setNotice("문구를 준비하지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleReviewChange(value: string) {
    setReview(value);

    if (notice) {
      setNotice("");
    }
  }

  const resultText = response?.text ?? "";
  const savedMinutes = response?.savedMinutes ?? 5;

  return (
    <GenerationPageLayout
      eyebrow="리뷰 답글"
      title="리뷰를 붙여넣으세요."
      description="상황에 맞는 답글을 준비합니다."
      sideNoteTitle="리뷰가 중요한 이유"
      sideNoteItems={sideNoteItems}
    >
      <div className="grid gap-6">
        <InputCard
          title="손님 리뷰 내용"
          description="리뷰를 넣고 분위기를 고르세요."
        >
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">
              손님 리뷰
            </span>
            <textarea
              className="min-h-36 resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-base leading-7 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => handleReviewChange(event.target.value)}
              placeholder="예: 직원분이 친절하고 커피가 맛있었어요. 다음에 또 갈게요."
              value={review}
            />
          </label>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold text-slate-800">
              리뷰 유형
            </legend>
            <div className="grid gap-2">
              {reviewCategoryOptions.map((type) => (
                <OptionChip
                  description={type.description}
                  key={type.value}
                  label={type.label}
                  onClick={() => setReviewType(type.value)}
                  selected={reviewType === type.value}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold text-slate-800">
              답글 말투
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {toneOptions.map((item) => (
                <OptionChip
                  description={item.description}
                  key={item.value}
                  label={item.label}
                  onClick={() => setTone(item.value)}
                  selected={tone === item.value}
                />
              ))}
            </div>
          </fieldset>

          <button
            className="min-h-14 rounded-2xl bg-emerald-500 px-5 py-3 text-base font-black text-white shadow-lg shadow-emerald-200/80 transition hover:bg-emerald-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isGenerating}
            onClick={handleGenerate}
            type="button"
          >
            {isGenerating ? "답글 정리 중" : "리뷰 답글 만들기"}
          </button>
        </InputCard>

        <GeneratedResultBox
          emptyDescription="리뷰 내용을 넣으면 상황에 맞는 답글을 준비해드릴게요."
          emptyTitle="아직 만든 리뷰 답글이 없습니다."
          loading={isGenerating}
          loadingDescription="손님이 읽어도 자연스럽게 보이도록 다듬고 있어요."
          loadingTitle="리뷰 분위기에 맞춰 답글을 정리하고 있어요."
          noticeMessage={notice}
          result={resultText}
          successMessage={`약 ${savedMinutes}분을 줄였어요. 기록에 저장했어요.`}
          title="손님 리뷰에 남길 답글"
          warnings={response?.warnings}
        />
      </div>
    </GenerationPageLayout>
  );
}
