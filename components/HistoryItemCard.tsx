"use client";

import { useEffect, useRef, useState } from "react";

import type { GenerateType } from "@/lib/ai/types";
import type { StoredGeneration } from "@/lib/storage/types";

const generationTypeLabels: Record<GenerateType, string> = {
  inquiry: "문의",
  review: "리뷰",
  promo: "홍보글",
  faq: "FAQ",
};

const generationTypeClasses: Record<GenerateType, string> = {
  inquiry: "bg-emerald-50 text-emerald-800",
  review: "bg-amber-50 text-amber-800",
  promo: "bg-rose-50 text-rose-800",
  faq: "bg-sky-50 text-sky-800",
};

type HistoryItemCardProps = {
  item: StoredGeneration;
  onCopy?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function HistoryItemCard({
  item,
  onCopy,
  onDelete,
}: HistoryItemCardProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const timeoutRef = useRef<number | null>(null);
  const preview =
    item.output.length > 94 ? `${item.output.slice(0, 94)}...` : item.output;

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(item.output);
      setCopyStatus("copied");
      onCopy?.(item.id);
    } catch {
      setCopyStatus("failed");
    }

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setCopyStatus("idle");
    }, 1600);
  }

  return (
    <article className="rounded-[1.75rem] bg-white p-4 shadow-lg shadow-slate-950/5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-black ${generationTypeClasses[item.type]}`}
          >
            {generationTypeLabels[item.type]}
          </span>
          <h2 className="mt-3 text-lg font-black leading-7 text-slate-950">
            {item.title}
          </h2>
        </div>
        <time className="shrink-0 text-xs font-bold text-slate-400">
          {formatHistoryDate(item.createdAt)}
        </time>
      </div>

      <p className="mt-3 whitespace-pre-line rounded-3xl bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-600">
        {preview}
      </p>

      <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
        <button
          className="min-h-12 rounded-2xl bg-slate-950 px-4 py-2 text-sm font-black text-white transition active:scale-[0.99]"
          onClick={handleCopy}
          type="button"
        >
          {copyStatus === "copied" ? "복사했어요" : "다시 복사"}
        </button>
        <button
          className="min-h-12 rounded-2xl bg-slate-100 px-4 py-2 text-sm font-black text-slate-500 transition active:scale-[0.99]"
          onClick={() => onDelete?.(item.id)}
          type="button"
        >
          삭제
        </button>
      </div>

      <p className="min-h-5 pt-2 text-center text-xs font-black text-emerald-700">
        {copyStatus === "failed" ? "복사가 되지 않았어요." : ""}
        {copyStatus === "copied" ? "다시 사용할 수 있어요." : ""}
      </p>
    </article>
  );
}

function formatHistoryDate(value: string) {
  return new Date(value).toLocaleDateString("ko-KR", {
    month: "numeric",
    day: "numeric",
  });
}
