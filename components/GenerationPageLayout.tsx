import type { ReactNode } from "react";

import { MobileAppShell } from "./MobileAppShell";
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
    <MobileAppShell title={eyebrow} subtitle={title}>
      <section className="rounded-[1.5rem] border border-emerald-100 bg-[linear-gradient(135deg,#ecfdf5_0%,#ffffff_62%,#ecfeff_100%)] p-4 shadow-lg shadow-emerald-950/5">
        <p className="text-sm font-bold leading-6 text-slate-600">
          {description}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <PrimaryButton className="min-h-11 px-3 py-2 text-sm" href="/dashboard" variant="outline">
            홈으로
          </PrimaryButton>
          <PrimaryButton className="min-h-11 px-3 py-2 text-sm" href="/setup" variant="soft">
            가게 정보
          </PrimaryButton>
        </div>
      </section>

      <section className="mt-4 grid gap-4">
        {children}
        <aside className="rounded-[1.5rem] border border-emerald-100 bg-white p-4 shadow-lg shadow-emerald-950/5">
          <h2 className="text-lg font-black text-slate-950">
            {sideNoteTitle}
          </h2>
          <ul className="mt-4 grid gap-2 text-sm font-semibold leading-6 text-slate-600">
            {sideNoteItems.map((item) => (
              <li className="rounded-2xl bg-emerald-50 p-3" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </MobileAppShell>
  );
}
