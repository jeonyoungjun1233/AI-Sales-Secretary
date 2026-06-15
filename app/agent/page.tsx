"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { AgentActionBundle } from "@/components/AgentActionBundle";
import { AgentEmptyState } from "@/components/AgentEmptyState";
import { AgentRunButton } from "@/components/AgentRunButton";
import { AgentSummaryCard } from "@/components/AgentSummaryCard";
import { MobileAppShell } from "@/components/MobileAppShell";
import type { DailyActionItem, DailyActionResponse } from "@/lib/agent/types";
import { addCalendarEvent, getCalendarEvents } from "@/lib/storage/calendarStore";
import { getFaqs } from "@/lib/storage/faqStore";
import {
  addGenerationHistory,
  getGenerationHistory,
  getSavedWorkSummary,
} from "@/lib/storage/generationHistoryStore";
import { getBusinessProfile } from "@/lib/storage/businessProfileStore";
import {
  getRemoteBusinessProfile,
  getRemoteCalendarEvents,
  getRemoteFaqs,
  getRemoteGenerationHistory,
  mergeById,
  saveRemoteCalendarEvent,
  saveRemoteGeneration,
} from "@/lib/storage/remoteStore";
import type {
  StoredBusinessProfile,
  StoredCalendarEvent,
  StoredFaq,
  StoredGeneration,
} from "@/lib/storage/types";

type AgentContextState = {
  businessProfile: StoredBusinessProfile | null;
  faqs: StoredFaq[];
  calendarEvents: StoredCalendarEvent[];
  generations: StoredGeneration[];
};

const initialContext: AgentContextState = {
  businessProfile: null,
  faqs: [],
  calendarEvents: [],
  generations: [],
};

export default function AgentPage() {
  const [contextData, setContextData] =
    useState<AgentContextState>(initialContext);
  const [result, setResult] = useState<DailyActionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [feedbackById, setFeedbackById] = useState<Record<string, string>>({});
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const eventCounterRef = useRef(0);
  const todayKey = getTodayDateKey();
  const todayEvents = useMemo(
    () =>
      contextData.calendarEvents.filter((event) => event.date === todayKey),
    [contextData.calendarEvents, todayKey],
  );
  const summary = getSavedWorkSummary(contextData.generations);
  const actionCount = result?.actions.length ?? 0;
  const completionText =
    actionCount > 0
      ? `오늘 ${actionCount}개 중 ${completedIds.length}개 완료`
      : "오늘 할 일을 준비해요";

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadAgentContext();
    }, 0);

    async function loadAgentContext() {
      const localProfile = getBusinessProfile();
      const remoteProfile = await getRemoteBusinessProfile();
      const localFaqs = getFaqs([]);
      const remoteFaqs = await getRemoteFaqs();
      const localEvents = getCalendarEvents([]);
      const remoteEvents = await getRemoteCalendarEvents();
      const localGenerations = getGenerationHistory();
      const remoteGenerations = await getRemoteGenerationHistory();

      setContextData({
        businessProfile: remoteProfile ?? localProfile,
        faqs: mergeById(remoteFaqs, localFaqs),
        calendarEvents: mergeById(remoteEvents, localEvents),
        generations: sortGenerations(mergeById(remoteGenerations, localGenerations)),
      });
    }

    return () => window.clearTimeout(timeoutId);
  }, []);

  async function handleRunAgent() {
    setIsLoading(true);
    setNotice("");
    setFeedbackById({});
    setCompletedIds([]);

    try {
      const response = await fetch("/api/agent/daily-action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentDate: todayKey,
          businessProfile: contextData.businessProfile,
          faqs: contextData.faqs.slice(0, 8),
          todayEvents: todayEvents.slice(0, 6),
          recentGenerations: contextData.generations.slice(0, 8),
        }),
      });

      if (!response.ok) {
        throw new Error("Daily action request failed.");
      }

      const data = (await response.json()) as { result?: DailyActionResponse };

      if (!data.result?.actions?.length) {
        throw new Error("Daily action result is empty.");
      }

      setResult(data.result);
      setNotice("오늘 할 일을 준비했어요.");
    } catch {
      setNotice("오늘 할 일을 준비하지 못했어요. 다시 눌러주세요.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCopy(action: DailyActionItem) {
    try {
      await copyText(action.output);
      setActionFeedback(action.id, "복사했어요.");
      markCompleted(action.id);
    } catch {
      setActionFeedback(action.id, "복사가 되지 않았어요.");
    }
  }

  function handleSaveToHistory(action: DailyActionItem) {
    if (action.type === "calendar") {
      return;
    }

    const savedGeneration = addGenerationHistory({
      type: action.type,
      title: action.title,
      input: action.description,
      output: action.output,
      savedMinutes: getActionSavedMinutes(action),
    });

    setContextData((current) => ({
      ...current,
      generations: sortGenerations([savedGeneration, ...current.generations]),
    }));
    setActionFeedback(action.id, "기록에 저장했어요.");
    markCompleted(action.id);
    void saveRemoteGeneration(savedGeneration);
  }

  function handleAddToCalendar(action: DailyActionItem) {
    eventCounterRef.current += 1;

    const nextEvent = addCalendarEvent({
      id: `agent-event-${action.id}-${eventCounterRef.current}`,
      title: action.title,
      date: todayKey,
      time: action.recommendedTime || "오후 5시",
      type: getCalendarEventType(action),
      memo: action.description,
    });

    setContextData((current) => ({
      ...current,
      calendarEvents: [...current.calendarEvents, nextEvent],
    }));
    setActionFeedback(action.id, "일정에 추가했어요.");
    markCompleted(action.id);
    void saveRemoteCalendarEvent(nextEvent);
  }

  function handleComplete(action: DailyActionItem) {
    markCompleted(action.id);
    setActionFeedback(action.id, "완료로 표시했어요.");
  }

  function setActionFeedback(id: string, message: string) {
    setFeedbackById((current) => ({ ...current, [id]: message }));
  }

  function markCompleted(id: string) {
    setCompletedIds((current) =>
      current.includes(id) ? current : [...current, id],
    );
  }

  return (
    <MobileAppShell
      actionHref="/history"
      actionLabel="기록"
      title="오늘 매출 액션"
      subtitle="오늘 할 일을 한 번에 준비해요."
    >
      <div className="grid gap-5">
        <section className="rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300">
          <p className="text-sm font-bold text-emerald-300">원클릭 준비</p>
          <h2 className="mt-2 text-3xl font-black leading-tight">
            {result?.summaryTitle || "버튼 하나로 정리해요"}
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">
            {result?.summaryText || "답장, 리뷰, 홍보, 일정을 바로 준비합니다."}
          </p>
        </section>

        <AgentSummaryCard
          recentGenerationCount={contextData.generations.length}
          savedMinutes={result?.savedMinutes ?? summary.savedMinutesTotal}
          todayEventCount={todayEvents.length}
        />

        <section className="rounded-[1.5rem] bg-white p-4 shadow-lg shadow-slate-950/5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black text-emerald-700">완료율</p>
              <h2 className="mt-1 text-xl font-black text-slate-950">
                {completionText}
              </h2>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
              {actionCount > 0
                ? `${Math.round((completedIds.length / actionCount) * 100)}%`
                : "준비"}
            </span>
          </div>
          <AgentRunButton loading={isLoading} onClick={handleRunAgent} />
          <p className="mt-3 min-h-5 text-center text-sm font-black text-emerald-700">
            {notice}
          </p>
        </section>

        {result ? (
          <AgentActionBundle
            actions={result.actions}
            completedIds={completedIds}
            feedbackById={feedbackById}
            onAddToCalendar={handleAddToCalendar}
            onComplete={handleComplete}
            onCopy={handleCopy}
            onSaveToHistory={handleSaveToHistory}
          />
        ) : (
          <AgentEmptyState />
        )}
      </div>
    </MobileAppShell>
  );
}

function getTodayDateKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${date}`;
}

async function copyText(text: string) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");

  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function getCalendarEventType(action: DailyActionItem) {
  if (action.type === "review") {
    return "review";
  }

  if (action.type === "promo") {
    return "promo";
  }

  if (action.type === "inquiry") {
    return "reservation";
  }

  return "store";
}

function getActionSavedMinutes(action: DailyActionItem) {
  if (action.type === "promo") {
    return 10;
  }

  return 5;
}

function sortGenerations(generations: StoredGeneration[]) {
  return [...generations].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
