type AgentSummaryCardProps = {
  todayEventCount: number;
  recentGenerationCount: number;
  savedMinutes: number;
};

export function AgentSummaryCard({
  todayEventCount,
  recentGenerationCount,
  savedMinutes,
}: AgentSummaryCardProps) {
  const items = [
    { label: "오늘 일정", value: `${todayEventCount}개` },
    { label: "최근 문구", value: `${recentGenerationCount}개` },
    { label: "예상 절약", value: `${savedMinutes}분` },
  ];

  return (
    <section className="grid grid-cols-3 gap-2">
      {items.map((item) => (
        <div
          className="rounded-[1.25rem] bg-white p-3 text-center shadow-lg shadow-slate-950/5"
          key={item.label}
        >
          <p className="text-xs font-bold text-slate-400">{item.label}</p>
          <p className="mt-1 text-lg font-black text-slate-950">
            {item.value}
          </p>
        </div>
      ))}
    </section>
  );
}
