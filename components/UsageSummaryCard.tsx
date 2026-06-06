type UsageItem = {
  label: string;
  value: string;
};

type UsageSummaryCardProps = {
  title: string;
  description: string;
  items: UsageItem[];
};

export function UsageSummaryCard({
  title,
  description,
  items,
}: UsageSummaryCardProps) {
  return (
    <aside className="rounded-lg border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-lg shadow-emerald-950/5 sm:p-6">
      <p className="text-sm font-bold text-emerald-700">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div
            className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm"
            key={item.label}
          >
            <span className="text-sm font-semibold text-slate-600">
              {item.label}
            </span>
            <strong className="text-lg font-black text-slate-950">
              {item.value}
            </strong>
          </div>
        ))}
      </div>
    </aside>
  );
}
