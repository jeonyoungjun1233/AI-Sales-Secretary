import { GuideArrowCallout } from "./GuideArrowCallout";

type GuidePhoneMockupProps = {
  title: string;
  eyebrow: string;
  items: string[];
  callout: string;
  activeLabel?: string;
};

export function GuidePhoneMockup({
  title,
  eyebrow,
  items,
  callout,
  activeLabel = "누르기",
}: GuidePhoneMockupProps) {
  return (
    <div className="relative mx-auto w-full max-w-[230px] rounded-[2rem] bg-slate-950 p-2 shadow-2xl shadow-slate-300">
      <div className="rounded-[1.6rem] bg-[#fbfffd] p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[0.65rem] font-black text-emerald-700">
              {eyebrow}
            </p>
            <h3 className="mt-1 text-sm font-black leading-5 text-slate-950">
              {title}
            </h3>
          </div>
          <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500 text-[0.68rem] font-black text-white">
            매
          </span>
        </div>

        <div className="mt-3 grid gap-2">
          {items.map((item, index) => {
            const active = index === 0;

            return (
              <div
                className={`rounded-2xl px-3 py-2 text-xs font-black ${
                  active
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100"
                    : "bg-slate-50 text-slate-500"
                }`}
                key={item}
              >
                {item}
              </div>
            );
          })}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1 rounded-2xl bg-white p-1 text-center text-[0.62rem] font-black text-slate-500 shadow-md shadow-slate-950/5">
          <span className="rounded-xl bg-emerald-500 py-1.5 text-white">
            홈
          </span>
          <span className="py-1.5">액션</span>
          <span className="py-1.5">일정</span>
        </div>
      </div>
      <GuideArrowCallout label={activeLabel || callout} />
    </div>
  );
}
