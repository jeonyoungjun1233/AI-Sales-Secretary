"use client";

import type { GenerateType } from "@/lib/ai/types";

export type HistoryFilter = "all" | Extract<GenerateType, "inquiry" | "review" | "promo">;

const filterLabels: Record<HistoryFilter, string> = {
  all: "전체",
  inquiry: "문의",
  review: "리뷰",
  promo: "홍보글",
};

type HistoryFilterTabsProps = {
  selected: HistoryFilter;
  onSelect: (filter: HistoryFilter) => void;
};

export function HistoryFilterTabs({
  selected,
  onSelect,
}: HistoryFilterTabsProps) {
  const filters = Object.keys(filterLabels) as HistoryFilter[];

  return (
    <div className="grid grid-cols-4 gap-2 rounded-3xl bg-white p-2 shadow-lg shadow-slate-950/5">
      {filters.map((filter) => (
        <button
          className={`min-h-11 rounded-2xl text-sm font-black transition active:scale-[0.98] ${
            selected === filter
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
              : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"
          }`}
          key={filter}
          onClick={() => onSelect(filter)}
          type="button"
        >
          {filterLabels[filter]}
        </button>
      ))}
    </div>
  );
}
