"use client";

import { useEffect, useMemo, useState } from "react";

import { EmptyState } from "@/components/EmptyState";
import {
  HistoryFilterTabs,
  type HistoryFilter,
} from "@/components/HistoryFilterTabs";
import { HistoryItemCard } from "@/components/HistoryItemCard";
import { MobileAppShell } from "@/components/MobileAppShell";
import { ValueSummaryCard } from "@/components/ValueSummaryCard";
import type { GenerateType } from "@/lib/ai/types";
import {
  getGenerationHistory,
  getSavedWorkSummary,
  increaseCopiedCount,
  removeGenerationHistory,
} from "@/lib/storage/generationHistoryStore";
import {
  deleteRemoteGeneration,
  getRemoteGenerationHistory,
  mergeById,
  saveRemoteGeneration,
} from "@/lib/storage/remoteStore";
import type { StoredGeneration } from "@/lib/storage/types";

const generationTypeLabels: Record<GenerateType, string> = {
  inquiry: "문의",
  review: "리뷰",
  promo: "홍보글",
  faq: "FAQ",
};

export default function HistoryPage() {
  const [history, setHistory] = useState<StoredGeneration[]>([]);
  const [filter, setFilter] = useState<HistoryFilter>("all");
  const summary = getSavedWorkSummary(history);
  const weeklyCount = history.filter((item) => isWithinLastDays(item.createdAt, 7))
    .length;
  const filteredHistory = useMemo(() => {
    if (filter === "all") {
      return history;
    }

    return history.filter((item) => item.type === filter);
  }, [filter, history]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadHistory();
    }, 0);

    async function loadHistory() {
      const localHistory = getGenerationHistory();
      const remoteHistory = await getRemoteGenerationHistory();

      setHistory(sortHistory(mergeById(remoteHistory, localHistory)));
    }

    return () => window.clearTimeout(timeoutId);
  }, []);

  function handleDelete(id: string) {
    setHistory(removeGenerationHistory(id));
    void deleteRemoteGeneration(id);
  }

  function handleCopy(id: string) {
    const nextHistory = increaseCopiedCount(id);
    const nextItem = nextHistory.find((item) => item.id === id);

    setHistory(nextHistory);

    if (nextItem) {
      void saveRemoteGeneration(nextItem);
    }
  }

  return (
    <MobileAppShell
      actionHref="/generate/inquiry"
      actionLabel="답장"
      title="기록"
      subtitle="최근 만든 문구를 다시 확인해요."
    >
      <div className="grid gap-5">
        <section className="grid grid-cols-3 gap-2">
          <ValueSummaryCard
            description="최근 7일"
            label="이번 주"
            value={`${weeklyCount}개`}
          />
          <ValueSummaryCard
            label="절약"
            tone="green"
            value={`${summary.savedMinutesTotal}분`}
          />
          <ValueSummaryCard
            description="가장 많이 씀"
            label="기능"
            value={
              summary.topGenerationType
                ? generationTypeLabels[summary.topGenerationType]
                : "-"
            }
          />
        </section>

        <HistoryFilterTabs selected={filter} onSelect={setFilter} />

        {history.length === 0 ? (
          <EmptyState
            actionHref="/generate/inquiry"
            actionLabel="답장 만들기"
            description="문의 답장부터 만들어보세요."
            title="아직 만든 문구가 없어요."
          />
        ) : filteredHistory.length === 0 ? (
          <EmptyState
            description="다른 종류의 기록을 확인해보세요."
            title="해당 기록이 없어요."
          />
        ) : (
          <section className="grid gap-3">
            {filteredHistory.map((item) => (
              <HistoryItemCard
                item={item}
                key={item.id}
                onCopy={handleCopy}
                onDelete={handleDelete}
              />
            ))}
          </section>
        )}
      </div>
    </MobileAppShell>
  );
}

function isWithinLastDays(value: string, days: number) {
  const date = new Date(value).getTime();
  const now = Date.now();
  const diff = now - date;

  return diff >= 0 && diff <= days * 24 * 60 * 60 * 1000;
}

function sortHistory(history: StoredGeneration[]) {
  return [...history].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
