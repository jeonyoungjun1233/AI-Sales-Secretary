import type { ReactNode } from "react";

type InputCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function InputCard({ title, description, children }: InputCardProps) {
  return (
    <section className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-950/5">
      <div>
        <p className="text-sm font-black text-emerald-700">입력하기</p>
        <h2 className="mt-1 text-xl font-black text-slate-950">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <div className="mt-5 grid gap-5">{children}</div>
    </section>
  );
}
