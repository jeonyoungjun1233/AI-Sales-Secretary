import type { ReactNode } from "react";

type InputCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function InputCard({ title, description, children }: InputCardProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5 sm:p-6">
      <div>
        <p className="text-sm font-black text-emerald-700">입력하기</p>
        <h2 className="mt-1 text-2xl font-black text-slate-950">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <div className="mt-6 grid gap-6">{children}</div>
    </section>
  );
}
