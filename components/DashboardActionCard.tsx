import { PrimaryButton } from "./PrimaryButton";

type DashboardActionCardProps = {
  title: string;
  description: string;
  iconText: string;
  buttonText: string;
  href?: string;
  helperText?: string;
  accent?: "mint" | "blue" | "amber" | "pink" | "slate";
  disabled?: boolean;
};

const accentClasses = {
  mint: "from-emerald-100 to-teal-50 text-emerald-800",
  blue: "from-sky-100 to-cyan-50 text-sky-800",
  amber: "from-amber-100 to-orange-50 text-amber-800",
  pink: "from-rose-100 to-pink-50 text-rose-800",
  slate: "from-slate-100 to-slate-50 text-slate-800",
};

export function DashboardActionCard({
  title,
  description,
  iconText,
  buttonText,
  href,
  helperText,
  accent = "mint",
  disabled = false,
}: DashboardActionCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-950/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/10">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-2xl ${accentClasses[accent]}`}
        >
          <span aria-hidden>{iconText}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-black text-slate-950">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
          {helperText ? (
            <p className="mt-3 text-sm font-bold text-emerald-700">
              {helperText}
            </p>
          ) : null}
        </div>
      </div>
      {disabled || !href ? (
        <button
          className="mt-5 min-h-12 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-5 py-3 text-base font-bold text-slate-400"
          disabled
          type="button"
        >
          {buttonText}
        </button>
      ) : (
        <PrimaryButton className="mt-5 w-full" href={href}>
          {buttonText}
        </PrimaryButton>
      )}
    </article>
  );
}
