"use client";

import type { DailyActionItem } from "@/lib/agent/types";

import { AgentActionCard } from "./AgentActionCard";

type AgentActionBundleProps = {
  actions: DailyActionItem[];
  completedIds: string[];
  feedbackById: Record<string, string>;
  onCopy: (action: DailyActionItem) => void;
  onSaveToHistory: (action: DailyActionItem) => void;
  onAddToCalendar: (action: DailyActionItem) => void;
  onComplete: (action: DailyActionItem) => void;
};

export function AgentActionBundle({
  actions,
  completedIds,
  feedbackById,
  onCopy,
  onSaveToHistory,
  onAddToCalendar,
  onComplete,
}: AgentActionBundleProps) {
  return (
    <section className="grid gap-3">
      {actions.map((action) => (
        <AgentActionCard
          action={action}
          completed={completedIds.includes(action.id)}
          feedback={feedbackById[action.id]}
          key={action.id}
          onAddToCalendar={onAddToCalendar}
          onComplete={onComplete}
          onCopy={onCopy}
          onSaveToHistory={onSaveToHistory}
        />
      ))}
    </section>
  );
}
