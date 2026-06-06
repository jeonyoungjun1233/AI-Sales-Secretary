"use client";

import { useState } from "react";

import { GeneratedResultBox } from "@/components/GeneratedResultBox";
import { GenerationPageLayout } from "@/components/GenerationPageLayout";
import { InputCard } from "@/components/InputCard";
import { OptionChip } from "@/components/OptionChip";
import {
  businessTypes,
  generateMockPromoPost,
  promoChannels,
  promoPurposes,
  type BusinessType,
  type PromoChannel,
  type PromoPurpose,
} from "@/lib/mockGeneration";

const purposeDescriptions: Record<PromoPurpose, string> = {
  "예약 유도": "비어 있는 시간 알리기",
  "이벤트 홍보": "혜택과 소식 전하기",
  "신메뉴 홍보": "새 메뉴나 서비스 소개",
  "비 오는 날 홍보": "날씨에 맞는 방문 유도",
  "마감 임박 홍보": "오늘 남은 시간 안내",
};

const businessDescriptions: Record<BusinessType, string> = {
  카페: "음료와 디저트",
  음식점: "식사와 메뉴",
  네일샵: "손끝 관리",
  미용실: "헤어 관리",
  학원: "상담과 수업",
  PT샵: "운동과 상담",
};

const channelDescriptions: Record<PromoChannel, string> = {
  인스타그램: "짧은 소개와 해시태그",
  "네이버 플레이스": "방문 전 안내 중심",
  "카카오톡 채널": "문의 유도 중심",
};

const sideNoteItems = [
  "하나의 글에는 하나의 소식만 담으면 더 잘 읽힙니다.",
  "가격이나 혜택은 실제로 제공 가능한 내용만 적는 것이 안전합니다.",
  "채널마다 문장 길이와 안내 방식이 조금씩 달라야 합니다.",
];

export default function PromoGenerationPage() {
  const [purpose, setPurpose] = useState<PromoPurpose>("예약 유도");
  const [businessType, setBusinessType] = useState<BusinessType>("카페");
  const [channel, setChannel] = useState<PromoChannel>("인스타그램");
  const [extraNote, setExtraNote] = useState("");
  const [result, setResult] = useState("");

  function handleGenerate() {
    setResult(
      generateMockPromoPost({
        purpose,
        businessType,
        channel,
        extraNote,
      }),
    );
  }

  return (
    <GenerationPageLayout
      eyebrow="오늘의 홍보글"
      title="오늘 올릴 홍보글을 바로 준비합니다."
      description="업종, 목적, 올릴 채널만 고르면 손님이 이해하기 쉬운 홍보 문안이 만들어집니다."
      sideNoteTitle="홍보글 작성 팁"
      sideNoteItems={sideNoteItems}
    >
      <div className="grid gap-6">
        <InputCard
          title="홍보글 조건"
          description="오늘 손님에게 알리고 싶은 목적과 업종, 올릴 채널을 골라주세요."
        >
          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold text-slate-800">
              홍보 목적
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {promoPurposes.map((item) => (
                <OptionChip
                  description={purposeDescriptions[item]}
                  key={item}
                  label={item}
                  onClick={() => setPurpose(item)}
                  selected={purpose === item}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold text-slate-800">업종</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {businessTypes.map((item) => (
                <OptionChip
                  description={businessDescriptions[item]}
                  key={item}
                  label={item}
                  onClick={() => setBusinessType(item)}
                  selected={businessType === item}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold text-slate-800">
              홍보 채널
            </legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {promoChannels.map((item) => (
                <OptionChip
                  description={channelDescriptions[item]}
                  key={item}
                  label={item}
                  onClick={() => setChannel(item)}
                  selected={channel === item}
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
              onChange={(event) => setExtraNote(event.target.value)}
              placeholder="예: 이번 주 금요일까지 딸기 라떼를 준비해두었습니다."
              value={extraNote}
            />
          </label>

          <button
            className="min-h-12 rounded-xl bg-emerald-500 px-5 py-3 text-base font-black text-white shadow-lg shadow-emerald-200/80 transition hover:bg-emerald-600 active:scale-[0.99]"
            onClick={handleGenerate}
            type="button"
          >
            홍보글 만들기
          </button>
        </InputCard>

        <GeneratedResultBox
          emptyDescription="홍보 목적, 업종, 채널을 고른 뒤 홍보글 만들기 버튼을 눌러보세요."
          emptyTitle="아직 만든 홍보글이 없습니다."
          result={result}
          successMessage="오늘 올릴 홍보글을 바로 준비했어요."
          title="오늘 올릴 홍보글"
        />
      </div>
    </GenerationPageLayout>
  );
}
