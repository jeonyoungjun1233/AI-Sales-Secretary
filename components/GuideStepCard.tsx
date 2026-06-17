import Link from "next/link";

import { GuidePhoneMockup } from "./GuidePhoneMockup";

type GuideStepCardProps = {
  step: string;
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
  screenTitle: string;
  screenEyebrow: string;
  screenItems: string[];
  callout: string;
};

export function GuideStepCard({
  step,
  title,
  description,
  href,
  buttonLabel,
  screenTitle,
  screenEyebrow,
  screenItems,
  callout,
}: GuideStepCardProps) {
  return (
    <article className="rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-950/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-black text-white">
            {step}
          </p>
          <h2 className="mt-4 text-2xl font-black leading-8 text-slate-950">
            {title}
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
            {description}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="pt-2 text-2xl font-black text-emerald-500"
        >
          →
        </span>
      </div>

      <div className="mt-5">
        <GuidePhoneMockup
          activeLabel={callout}
          callout={callout}
          eyebrow={screenEyebrow}
          items={screenItems}
          title={screenTitle}
        />
      </div>

      <Link
        className="mt-5 flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-base font-black text-white shadow-lg shadow-slate-200 transition active:scale-[0.99]"
        href={href}
      >
        {buttonLabel}
      </Link>
    </article>
  );
}
