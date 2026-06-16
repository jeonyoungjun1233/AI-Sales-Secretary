"use client";

import { useEffect, useRef, useState } from "react";

type CopyButtonProps = {
  text: string;
  className?: string;
};

export function CopyButton({ text, className = "" }: CopyButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(text);
          setStatus("copied");
          scheduleReset();
          return;
        } catch {
          // 브라우저 권한이 막힌 경우 아래 방식으로 한 번 더 시도합니다.
        }
      }

      const textarea = document.createElement("textarea");

      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);

      document.execCommand("copy");
      document.body.removeChild(textarea);

      setStatus("copied");
    } catch {
      setStatus("failed");
    }

    scheduleReset();
  }

  function scheduleReset() {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setStatus("idle");
    }, 1800);
  }

  return (
    <div className={`grid gap-2 ${className}`}>
      <button
        className="min-h-14 w-full rounded-2xl bg-slate-950 px-5 py-3 text-base font-black text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800 active:scale-[0.99]"
        onClick={handleCopy}
        type="button"
      >
        {status === "copied" ? "복사되었습니다" : "복사하기"}
      </button>
      <p className="min-h-5 text-center text-sm font-bold text-emerald-700" aria-live="polite">
        {status === "failed" ? "복사가 되지 않았습니다. 문안을 직접 선택해 주세요." : ""}
        {status === "copied" ? "원하는 채널에 바로 붙여넣어 사용할 수 있습니다." : ""}
      </p>
    </div>
  );
}
