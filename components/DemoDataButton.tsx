"use client";

import { useState } from "react";

import { saveBusinessProfile } from "@/lib/storage/businessProfileStore";
import { saveCalendarEvents } from "@/lib/storage/calendarStore";
import { saveFaqs } from "@/lib/storage/faqStore";
import { saveGenerationHistory } from "@/lib/storage/generationHistoryStore";
import {
  saveRemoteBusinessProfile,
  saveRemoteCalendarEvent,
  saveRemoteFaq,
  saveRemoteGeneration,
} from "@/lib/storage/remoteStore";
import type {
  StoredBusinessProfile,
  StoredCalendarEvent,
  StoredFaq,
  StoredGeneration,
} from "@/lib/storage/types";

type DemoDataButtonProps = {
  onLoaded?: () => void;
};

const sampleProfile: Omit<StoredBusinessProfile, "updatedAt"> = {
  businessName: "연남동 초록카페",
  businessType: "카페",
  openingHours: "매일 10:00 - 21:00",
  address: "서울 마포구 성미산로 00",
  phone: "02-000-0000",
  mainMenu: "바닐라 라떼, 딸기 케이크",
  tone: "친절한 말투",
};

const sampleFaqs: StoredFaq[] = [
  {
    id: "demo-faq-hours",
    question: "오늘 영업하나요?",
    answer: "네, 오늘은 오전 10시부터 오후 9시까지 운영합니다.",
    createdAt: "2026-06-15T09:00:00.000Z",
  },
  {
    id: "demo-faq-reservation",
    question: "예약 가능한가요?",
    answer: "가능합니다. 원하시는 날짜와 인원을 알려주시면 확인해드릴게요.",
    createdAt: "2026-06-15T09:05:00.000Z",
  },
  {
    id: "demo-faq-takeout",
    question: "포장 가능한가요?",
    answer: "일부 메뉴는 포장 가능합니다. 방문 전 문의 주시면 준비해드릴게요.",
    createdAt: "2026-06-15T09:10:00.000Z",
  },
];

const sampleEvents: StoredCalendarEvent[] = [
  {
    id: "demo-event-reservation",
    title: "예약 문의 답장",
    date: "2026-06-15",
    time: "14:00",
    type: "reservation",
    memo: "4명 저녁 예약 가능 여부 확인",
    createdAt: "2026-06-15T09:15:00.000Z",
  },
  {
    id: "demo-event-review",
    title: "리뷰 답글 쓰기",
    date: "2026-06-15",
    time: "17:00",
    type: "review",
    memo: "최근 좋은 리뷰 2개 답글",
    createdAt: "2026-06-15T09:20:00.000Z",
  },
  {
    id: "demo-event-promo",
    title: "딸기 케이크 홍보글",
    date: "2026-06-16",
    time: "11:00",
    type: "promo",
    memo: "인스타그램에 올릴 짧은 홍보글",
    createdAt: "2026-06-15T09:25:00.000Z",
  },
];

const sampleGenerations: StoredGeneration[] = [
  {
    id: "demo-generation-inquiry",
    type: "inquiry",
    title: "저녁 예약 문의 답장",
    input: "오늘 저녁 7시에 4명 예약 가능한가요?",
    output:
      "안녕하세요. 문의 주셔서 감사합니다. 오늘 저녁 7시 4명 예약 가능 여부를 확인해드리겠습니다. 성함과 연락처를 남겨주시면 바로 안내드릴게요.",
    tone: "friendly",
    category: "reservation",
    createdAt: "2026-06-15T09:30:00.000Z",
    savedMinutes: 5,
    copiedCount: 1,
  },
  {
    id: "demo-generation-review",
    type: "review",
    title: "좋은 리뷰 답글",
    input: "커피도 맛있고 직원분도 친절했어요.",
    output:
      "소중한 리뷰 정말 감사합니다. 커피와 응대 모두 만족하셨다니 큰 힘이 됩니다. 다음 방문에도 기분 좋은 시간 보내실 수 있도록 준비하겠습니다.",
    tone: "friendly",
    category: "positive",
    createdAt: "2026-06-15T09:35:00.000Z",
    savedMinutes: 6,
    copiedCount: 0,
  },
];

export function DemoDataButton({ onLoaded }: DemoDataButtonProps) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLoadDemoData() {
    setIsLoading(true);

    const profile = saveBusinessProfile(sampleProfile);

    saveFaqs(sampleFaqs);
    saveCalendarEvents(sampleEvents);
    saveGenerationHistory(sampleGenerations);

    await Promise.allSettled([
      saveRemoteBusinessProfile(profile),
      ...sampleFaqs.map((faq) => saveRemoteFaq(faq)),
      ...sampleEvents.map((event) => saveRemoteCalendarEvent(event)),
      ...sampleGenerations.map((generation) => saveRemoteGeneration(generation)),
    ]);

    setMessage("발표용 예시를 채웠어요.");
    setIsLoading(false);
    onLoaded?.();
  }

  return (
    <div className="rounded-[1.5rem] bg-white p-4 shadow-lg shadow-slate-950/5">
      <button
        className="min-h-11 w-full rounded-2xl bg-slate-100 px-4 py-2 text-sm font-black text-slate-700 transition active:scale-[0.99] disabled:opacity-60"
        disabled={isLoading}
        onClick={handleLoadDemoData}
        type="button"
      >
        {isLoading ? "예시 불러오는 중" : "데모 데이터 불러오기"}
      </button>
      <p className="mt-2 min-h-5 text-center text-xs font-bold text-emerald-700">
        {message}
      </p>
    </div>
  );
}
