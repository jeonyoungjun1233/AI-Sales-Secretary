"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "홈", href: "/dashboard", icon: "⌂", match: "/dashboard" },
  { label: "액션", href: "/agent", icon: "+", match: "/agent" },
  { label: "일정", href: "/calendar", icon: "□", match: "/calendar" },
  { label: "계정", href: "/account", icon: "◇", match: "/account" },
];

export function BottomTabNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[430px] border-t border-emerald-100 bg-white/95 px-3 pb-3 pt-2 shadow-2xl shadow-slate-300 backdrop-blur-xl sm:bottom-6 sm:rounded-b-[2rem] sm:border-x">
      <div className="grid grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const active =
            pathname === tab.href ||
            pathname.startsWith(`${tab.match}/`) ||
            (tab.href === "/agent" && pathname.startsWith("/generate/")) ||
            (tab.href === "/account" &&
              ["/setup", "/login", "/signup"].some((path) =>
                pathname.startsWith(path),
              )) ||
            (tab.href === "/dashboard" &&
              ["/guide", "/submission", "/roadmap"].some((path) =>
                pathname.startsWith(path),
              ));

          return (
            <Link
              aria-current={active ? "page" : undefined}
              className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-black transition active:scale-[0.98] ${
                active
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                  : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"
              }`}
              href={tab.href}
              key={tab.href}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                  active ? "bg-white/20" : "bg-slate-100"
                }`}
                aria-hidden
              >
                {tab.icon}
              </span>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
