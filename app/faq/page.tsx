"use client";

import { useEffect, useState } from "react";

import { MobileAppShell } from "@/components/MobileAppShell";
import { getFaqs, saveFaqs } from "@/lib/storage/faqStore";
import type { StoredFaq } from "@/lib/storage/types";

const initialFaqs: StoredFaq[] = [
  {
    id: "hours",
    question: "영업시간이 어떻게 되나요?",
    answer: "매일 오전 10시부터 오후 9시까지 운영합니다. 휴무일은 별도로 안내드립니다.",
    createdAt: "2026-06-10T00:00:00.000Z",
  },
  {
    id: "parking",
    question: "주차 가능한가요?",
    answer: "매장 앞 주차 공간은 제한적이며, 가까운 공영주차장 이용을 추천드립니다.",
    createdAt: "2026-06-10T00:00:00.000Z",
  },
  {
    id: "reservation",
    question: "예약 가능한가요?",
    answer: "예약 가능합니다. 원하시는 날짜, 시간, 인원을 알려주시면 확인해드릴게요.",
    createdAt: "2026-06-10T00:00:00.000Z",
  },
  {
    id: "takeout",
    question: "포장 가능한가요?",
    answer: "일부 메뉴는 포장 가능합니다. 방문 전 문의 주시면 준비 가능 여부를 안내드리겠습니다.",
    createdAt: "2026-06-10T00:00:00.000Z",
  },
  {
    id: "pet",
    question: "반려동물 동반 가능한가요?",
    answer: "매장 상황에 따라 달라질 수 있어 방문 전 문의 부탁드립니다.",
    createdAt: "2026-06-10T00:00:00.000Z",
  },
];

export default function FaqPage() {
  const [faqs, setFaqs] = useState<StoredFaq[]>(initialFaqs);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setFaqs(getFaqs(initialFaqs));
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  function handleAddFaq() {
    const cleanQuestion = question.trim();
    const cleanAnswer = answer.trim();

    if (!cleanQuestion || !cleanAnswer) {
      setMessage("질문과 답변을 모두 입력해주세요.");
      return;
    }

    const nextFaq: StoredFaq = {
      id: `faq-${Date.now()}`,
      question: cleanQuestion,
      answer: cleanAnswer,
      createdAt: new Date().toISOString(),
    };
    const nextFaqs = saveFaqs([nextFaq, ...faqs]);

    setFaqs(nextFaqs);
    setQuestion("");
    setAnswer("");
    setMessage("질문을 저장했어요.");
  }

  function handleQuestionChange(value: string) {
    setQuestion(value);

    if (message) {
      setMessage("");
    }
  }

  function handleAnswerChange(value: string) {
    setAnswer(value);

    if (message) {
      setMessage("");
    }
  }

  return (
    <MobileAppShell
      actionHref="/dashboard"
      actionLabel="홈"
      title="자주 묻는 질문"
      subtitle="반복 답장을 줄여보세요."
    >
      <section className="rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300">
        <p className="text-sm font-bold text-emerald-300">가게 답변 모음</p>
        <h2 className="mt-3 text-2xl font-black leading-tight">
          질문을 미리 정리합니다.
        </h2>
        <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">
          답장이 더 빨라집니다.
        </p>
      </section>

      <section className="mt-5 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-950/5">
        <h2 className="text-xl font-black text-slate-950">질문 추가</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
          질문과 답변을 적어두세요.
        </p>

        <div className="mt-5 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">질문</span>
            <input
              className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => handleQuestionChange(event.target.value)}
              placeholder="예: 단체 예약 가능한가요?"
              type="text"
              value={question}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">답변</span>
            <textarea
              className="min-h-28 resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base leading-7 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => handleAnswerChange(event.target.value)}
              placeholder="예: 가능합니다. 원하시는 날짜와 인원을 알려주시면 확인해드릴게요."
              value={answer}
            />
          </label>

          <button
            className="min-h-14 rounded-2xl bg-emerald-500 px-5 py-3 text-base font-black text-white shadow-lg shadow-emerald-200 transition active:scale-[0.99]"
            onClick={handleAddFaq}
            type="button"
          >
            질문 추가하기
          </button>

          <p
            className="min-h-5 text-center text-sm font-black text-emerald-700"
            aria-live="polite"
          >
            {message}
          </p>
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-950">질문 목록</h2>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
            {faqs.length}개
          </span>
        </div>

        <div className="grid gap-3">
          {faqs.map((faq) => (
            <article
              className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-950/5"
              key={faq.id}
            >
              <p className="text-base font-black leading-6 text-slate-950">
                {faq.question}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>
    </MobileAppShell>
  );
}
