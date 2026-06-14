type ValueSummaryCardProps = {
  label: string;
  value: string;
  description?: string;
  tone?: "dark" | "green" | "light";
};

const toneClasses = {
  dark: "bg-slate-950 text-white shadow-slate-300",
  green: "bg-emerald-500 text-white shadow-emerald-200",
  light: "bg-white text-slate-950 shadow-slate-950/5",
};

export function ValueSummaryCard({
  label,
  value,
  description,
  tone = "light",
}: ValueSummaryCardProps) {
  return (
    <article className={`rounded-3xl p-4 shadow-lg ${toneClasses[tone]}`}>
      <p className="text-sm font-black opacity-70">{label}</p>
      <p className="mt-2 text-2xl font-black leading-tight">{value}</p>
      {description ? (
        <p className="mt-2 text-xs font-bold leading-5 opacity-70">
          {description}
        </p>
      ) : null}
    </article>
  );
}
