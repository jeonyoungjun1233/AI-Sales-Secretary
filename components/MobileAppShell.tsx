import Link from "next/link";
import type { ReactNode } from "react";

import { BottomTabNav } from "./BottomTabNav";

type MobileAppShellProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children: ReactNode;
  actionHref?: string;
  actionLabel?: string;
};

export function MobileAppShell({
  title,
  subtitle,
  eyebrow = "AI 매출 비서",
  children,
  actionHref = "/account",
  actionLabel = "계정",
}: MobileAppShellProps) {
  return (
    <main className="min-h-[100dvh] bg-slate-100 text-slate-950 sm:py-6">
      <div className="mx-auto min-h-[100dvh] w-full max-w-[430px] bg-[#fbfffd] shadow-2xl shadow-slate-300/70 sm:min-h-[calc(100dvh-3rem)] sm:overflow-hidden sm:rounded-[2rem] sm:border sm:border-emerald-100">
        <header className="sticky top-0 z-30 border-b border-emerald-100 bg-[#fbfffd]/95 px-5 pb-4 pt-4 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <Link
              aria-label={eyebrow}
              className="flex items-center gap-2"
              href="/dashboard"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 text-xs font-black text-white shadow-lg shadow-emerald-200"
              >
                매
              </span>
              <span
                aria-hidden="true"
                className="text-sm font-black text-emerald-700"
              >
                {eyebrow}
              </span>
            </Link>
            <Link
              className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50"
              href={actionHref}
            >
              {actionLabel}
            </Link>
          </div>
          <div className="mt-4">
            <h1 className="text-[1.7rem] font-black leading-tight text-slate-950">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                {subtitle}
              </p>
            ) : null}
          </div>
        </header>

        <div className="px-4 pb-28 pt-4">{children}</div>
      </div>
      <BottomTabNav />
    </main>
  );
}
