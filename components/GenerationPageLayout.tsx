import type { ReactNode } from "react";

import { PrimaryButton } from "./PrimaryButton";

type GenerationPageLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  sideNoteTitle: string;
  sideNoteItems: string[];
};

export function GenerationPageLayout({
  eyebrow,
  title,
  description,
  children,
  sideNoteTitle,
  sideNoteItems,
}: GenerationPageLayoutProps) {
  return (
    <main className="min-h-screen bg-[#fbfffd] pb-10 text-slate-950">
      <section className="border-b border-emerald-100 bg-[linear-gradient(135deg,#ecfdf5_0%,#ffffff_58%,#ecfeff_100%)]">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-end">
            <div>
              <p className="text-sm font-black text-emerald-700">{eyebrow}</p>
              <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                {description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <PrimaryButton href="/dashboard" variant="outline">
                대시보드로 돌아가기
              </PrimaryButton>
              <PrimaryButton href="/setup" variant="soft">
                가게 정보 정리하기
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_340px] lg:py-10">
        <div>{children}</div>
        <aside className="rounded-lg border border-emerald-100 bg-white p-5 shadow-xl shadow-emerald-950/5">
          <h2 className="text-xl font-black text-slate-950">
            {sideNoteTitle}
          </h2>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-700">
            {sideNoteItems.map((item) => (
              <li className="rounded-lg bg-emerald-50 p-4" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  );
}
