"use client";

import { useState } from "react";

import { GeneratedResultBox } from "@/components/GeneratedResultBox";
import { GenerationPageLayout } from "@/components/GenerationPageLayout";
import { InputCard } from "@/components/InputCard";
import { OptionChip } from "@/components/OptionChip";
import { generateWithAgent } from "@/lib/ai/agentRouter";
import {
  businessTypeOptions,
  promoChannelOptions,
  promoPurposeOptions,
  type BusinessType,
  type GenerateResponse,
  type PromoChannel,
  type PromoPurpose,
} from "@/lib/ai/types";
import { addGenerationHistory } from "@/lib/storage/generationHistoryStore";

const sideNoteItems = [
  "소식은 하나만 담아보세요.",
  "제공 가능한 내용만 적으세요.",
  "채널에 맞게 짧게 씁니다.",
];

export default function PromoGenerationPage() {
  const [purpose, setPurpose] = useState<PromoPurpose>("reservation");
  const [businessType, setBusinessType] = useState<BusinessType>("cafe");
  const [channel, setChannel] = useState<PromoChannel>("instagram");
  const [extraNote, setExtraNote] = useState("");
  const [response, setResponse] = useState<GenerateResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notice, setNotice] = useState("");

  async function handleGenerate() {
    if (!extraNote.trim()) {
      setResponse(null);
      setNotice("홍보하고 싶은 내용을 간단히 적어주세요.");
      return;
    }

    setNotice("");
    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 450));

    const nextResponse = await generateWithAgent({
      type: "promo",
      input: extraNote,
      category: purpose,
      businessType,
      channel,
    });

    addGenerationHistory({
      type: "promo",
      title: nextResponse.title || "홍보글",
      input: extraNote,
      output: nextResponse.text,
      category: `${purpose}/${businessType}/${channel}`,
      savedMinutes: nextResponse.savedMinutes,
    });
    setResponse(nextResponse);
    setIsGenerating(false);
  }

  function handleExtraNoteChange(value: string) {
    setExtraNote(value);

    if (notice) {
      setNotice("");
    }
  }

  const resultText = response?.text ?? "";

  return (
    <GenerationPageLayout
      eyebrow="오늘의 홍보글"
      title="오늘 소식을 적어보세요."
      description="홍보글로 바로 바꿔드립니다."
      sideNoteTitle="홍보글 팁"
      sideNoteItems={sideNoteItems}
    >
      <div className="grid gap-6">
        <InputCard
          title="홍보글 조건"
          description="목적과 채널을 골라주세요."
        >
          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold text-slate-800">
              홍보 목적
            </legend>
            <div className="grid gap-2">
              {promoPurposeOptions.map((item) => (
                <OptionChip
                  description={item.description}
                  key={item.value}
                  label={item.label}
                  onClick={() => setPurpose(item.value)}
                  selected={purpose === item.value}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold text-slate-800">업종</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {businessTypeOptions.map((item) => (
                <OptionChip
                  description={item.description}
                  key={item.value}
                  label={item.label}
                  onClick={() => setBusinessType(item.value)}
                  selected={businessType === item.value}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold text-slate-800">
              홍보 채널
            </legend>
            <div className="grid gap-2">
              {promoChannelOptions.map((item) => (
                <OptionChip
                  description={item.description}
                  key={item.value}
                  label={item.label}
                  onClick={() => setChannel(item.value)}
                  selected={channel === item.value}
                />
              ))}
            </div>
          </fieldset>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">
              넣고 싶은 소식
            </span>
            <textarea
              className="min-h-28 resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-base leading-7 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => handleExtraNoteChange(event.target.value)}
              placeholder="예: 이번 주 금요일까지 딸기 라떼를 준비해두었습니다."
              value={extraNote}
            />
          </label>

          <button
            className="min-h-14 rounded-2xl bg-emerald-500 px-5 py-3 text-base font-black text-white shadow-lg shadow-emerald-200/80 transition hover:bg-emerald-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isGenerating}
            onClick={handleGenerate}
            type="button"
          >
            {isGenerating ? "홍보글 정리 중" : "홍보글 만들기"}
          </button>
        </InputCard>

        <GeneratedResultBox
          emptyDescription="오늘 알리고 싶은 소식을 적으면 홍보글로 바꿔드릴게요."
          emptyTitle="아직 만든 홍보글이 없습니다."
          loading={isGenerating}
          loadingDescription="채널에 맞게 문장 길이와 말투를 다듬고 있어요."
          loadingTitle="오늘 올릴 글을 보기 좋게 정리하고 있어요."
          noticeMessage={notice}
          result={resultText}
          successMessage="오늘 올릴 글을 준비했어요. 기록에 저장했어요."
          title="오늘 올릴 홍보글"
          warnings={response?.warnings}
        />
      </div>
    </GenerationPageLayout>
  );
}
