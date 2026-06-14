"use client";

import { useState } from "react";

import { GeneratedResultBox } from "@/components/GeneratedResultBox";
import { GenerationPageLayout } from "@/components/GenerationPageLayout";
import { InputCard } from "@/components/InputCard";
import { OptionChip } from "@/components/OptionChip";
import { getGenerationContext } from "@/lib/ai/generationContext";
import { requestGeneration } from "@/lib/ai/requestGeneration";
import {
  inquiryCategoryOptions,
  toneOptions,
  type GenerateResponse,
  type GenerateTone,
  type InquiryCategory,
} from "@/lib/ai/types";
import { addGenerationHistory } from "@/lib/storage/generationHistoryStore";

const sideNoteItems = [
  "바쁜 시간에 답장이 필요할 때",
  "예약 가능 여부를 알려야 할 때",
  "반복 질문이 많을 때",
];

export default function InquiryGenerationPage() {
  const [question, setQuestion] = useState("");
  const [inquiryType, setInquiryType] =
    useState<InquiryCategory>("reservation");
  const [tone, setTone] = useState<GenerateTone>("friendly");
  const [response, setResponse] = useState<GenerateResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notice, setNotice] = useState("");

  async function handleGenerate() {
    if (!question.trim()) {
      setResponse(null);
      setNotice("먼저 손님 질문을 입력해주세요.");
      return;
    }

    setNotice("");
    setIsGenerating(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 450));

      const nextResponse = await requestGeneration({
        type: "inquiry",
        input: question,
        category: inquiryType,
        tone,
        context: getGenerationContext(),
      });

      addGenerationHistory({
        type: "inquiry",
        title: nextResponse.title || "문의 답장",
        input: question,
        output: nextResponse.text,
        tone,
        category: inquiryType,
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

  function handleQuestionChange(value: string) {
    setQuestion(value);

    if (notice) {
      setNotice("");
    }
  }

  const resultText = response?.text ?? "";
  const savedMinutes = response?.savedMinutes ?? 5;

  return (
    <GenerationPageLayout
      eyebrow="손님 문의 답장"
      title="손님 질문을 붙여넣으세요."
      description="보낼 답장을 바로 준비합니다."
      sideNoteTitle="이럴 때 좋아요"
      sideNoteItems={sideNoteItems}
    >
      <div className="grid gap-6">
        <InputCard
          title="손님 문의 내용"
          description="질문을 넣고 유형을 고르세요."
        >
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">
              손님 질문
            </span>
            <textarea
              className="min-h-36 resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-base leading-7 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => handleQuestionChange(event.target.value)}
              placeholder="예: 오늘 저녁 7시에 4명 예약 가능한가요?"
              value={question}
            />
          </label>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold text-slate-800">
              문의 유형
            </legend>
            <div className="grid gap-2">
              {inquiryCategoryOptions.map((type) => (
                <OptionChip
                  description={type.description}
                  key={type.value}
                  label={type.label}
                  onClick={() => setInquiryType(type.value)}
                  selected={inquiryType === type.value}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold text-slate-800">
              답장 말투
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
            {isGenerating ? "답장 정리 중" : "답장 만들기"}
          </button>
        </InputCard>

        <GeneratedResultBox
          emptyDescription="손님 질문을 붙여넣으면 바로 답장 초안을 만들어드릴게요."
          emptyTitle="아직 만든 답장이 없습니다."
          loading={isGenerating}
          loadingDescription="복사해서 쓸 수 있게 다듬고 있어요."
          loadingTitle="사장님 말투에 맞춰 문장을 정리하고 있어요."
          noticeMessage={notice}
          result={resultText}
          successMessage={`약 ${savedMinutes}분을 줄였어요. 기록에 저장했어요.`}
          title="손님에게 보낼 답장"
          warnings={response?.warnings}
        />
      </div>
    </GenerationPageLayout>
  );
}
