type GuideArrowCalloutProps = {
  label: string;
};

export function GuideArrowCallout({ label }: GuideArrowCalloutProps) {
  return (
    <div className="pointer-events-none absolute -right-2 top-1/2 flex -translate-y-1/2 items-center gap-2">
      <span className="rounded-full bg-emerald-500 px-3 py-1 text-[0.68rem] font-black text-white shadow-lg shadow-emerald-200">
        {label}
      </span>
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-lg font-black text-white shadow-lg shadow-emerald-200"
      >
        ←
      </span>
    </div>
  );
}
