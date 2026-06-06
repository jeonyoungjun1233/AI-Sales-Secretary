"use client";

import { useState } from "react";

import { GeneratedResultBox } from "@/components/GeneratedResultBox";
import { GenerationPageLayout } from "@/components/GenerationPageLayout";
import { InputCard } from "@/components/InputCard";
import { OptionChip } from "@/components/OptionChip";
import {
  generateMockInquiryReply,
  inquiryTypes,
  replyTones,
  type InquiryType,
  type ReplyTone,
} from "@/lib/mockGeneration";

const inquiryTypeDescriptions: Record<InquiryType, string> = {
  "예약 문의": "날짜, 시간, 인원 안내",
  "영업시간 문의": "오늘 방문 가능 여부",
  "가격 문의": "가격과 이용 방법 안내",
  "위치 문의": "주소와 찾아오는 길",
  "불만 문의": "사과와 개선 약속",
  "기타 문의": "상황에 맞는 기본 답장",
};

const toneDescriptions: Record<ReplyTone, string> = {
  "친절한 말투": "부드럽고 자세하게",
  "짧고 깔끔한 말투": "핵심만 빠르게",
  "밝고 귀여운 말투": "가볍고 친근하게",
  "고급스러운 말투": "정중하고 차분하게",
};

const sideNoteItems = [
  "영업 중이라 긴 답장을 쓰기 어려울 때",
  "예약 가능 여부를 정중하게 안내해야 할 때",
  "반복되는 질문에 매번 새로 답하기 부담될 때",
];

export default function InquiryGenerationPage() {
  const [question, setQuestion] = useState("");
  const [inquiryType, setInquiryType] = useState<InquiryType>("예약 문의");
  const [tone, setTone] = useState<ReplyTone>("친절한 말투");
  const [result, setResult] = useState("");

  function handleGenerate() {
    setResult(
      generateMockInquiryReply({
        question,
        inquiryType,
        tone,
      }),
    );
  }

  return (
    <GenerationPageLayout
      eyebrow="손님 문의 답장"
      title="손님 질문을 붙여넣으면 바로 보낼 답장을 준비합니다."
      description="예약, 가격, 위치 문의처럼 자주 오는 질문을 사장님 말투에 맞춰 정리해보세요."
      sideNoteTitle="이럴 때 쓰기 좋습니다"
      sideNoteItems={sideNoteItems}
    >
      <div className="grid gap-6">
        <InputCard
          title="손님 문의 내용"
          description="손님이 보낸 질문을 그대로 붙여넣고, 어떤 문의인지 골라주세요."
        >
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">
              손님 질문
            </span>
            <textarea
              className="min-h-36 resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-base leading-7 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="예: 오늘 저녁 7시에 4명 예약 가능한가요?"
              value={question}
            />
          </label>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold text-slate-800">
              문의 유형
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {inquiryTypes.map((type) => (
                <OptionChip
                  description={inquiryTypeDescriptions[type]}
                  key={type}
                  label={type}
                  onClick={() => setInquiryType(type)}
                  selected={inquiryType === type}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold text-slate-800">
              답장 말투
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
            className="min-h-12 rounded-xl bg-emerald-500 px-5 py-3 text-base font-black text-white shadow-lg shadow-emerald-200/80 transition hover:bg-emerald-600 active:scale-[0.99]"
            onClick={handleGenerate}
            type="button"
          >
            답장 만들기
          </button>
        </InputCard>

        <GeneratedResultBox
          emptyDescription="손님 질문과 문의 유형을 고른 뒤 답장 만들기 버튼을 눌러보세요."
          emptyTitle="아직 만든 답장이 없습니다."
          result={result}
          successMessage="약 5분 걸릴 답장을 10초 만에 만들었어요."
          title="손님에게 보낼 답장"
        />
      </div>
    </GenerationPageLayout>
  );
}
