"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PrimaryButton } from "./PrimaryButton";

const navItems = [
  { label: "소개", href: "/" },
  { label: "대시보드", href: "/dashboard" },
  { label: "가게 정보", href: "/setup" },
];

export function AppHeader() {
  const pathname = usePathname();
  const isAppRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/setup") ||
    pathname.startsWith("/generate") ||
    pathname.startsWith("/calendar");

  if (isAppRoute) {
    return null;
  }

  return (
    <header className="sticky top-0 z-20 border-b border-emerald-100 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link className="flex min-w-0 items-center gap-3" href="/">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 text-sm font-black text-white shadow-lg shadow-emerald-200">
            AI
          </span>
          <span className="truncate text-base font-black text-slate-950 sm:text-lg">
            AI 사장님 매출 비서
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 md:flex">
          {navItems.map((item) => (
            <Link
              className="transition hover:text-emerald-700"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <PrimaryButton className="hidden sm:inline-flex" href="/setup">
          무료로 시작하기
        </PrimaryButton>
      </div>
    </header>
  );
}
