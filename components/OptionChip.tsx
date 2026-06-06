"use client";

type OptionChipProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
  description?: string;
};

export function OptionChip({
  label,
  selected,
  onClick,
  description,
}: OptionChipProps) {
  return (
    <button
      aria-pressed={selected}
      className={`min-h-12 rounded-2xl border px-4 py-3 text-left transition active:scale-[0.99] ${
        selected
          ? "border-emerald-400 bg-emerald-50 text-emerald-950 shadow-sm shadow-emerald-100"
          : "border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:bg-emerald-50/50"
      }`}
      onClick={onClick}
      type="button"
    >
      <span className="block text-sm font-black">{label}</span>
      {description ? (
        <span className="mt-1 block text-xs leading-5 text-slate-500">
          {description}
        </span>
      ) : null}
    </button>
  );
}
