import { PrimaryButton } from "./PrimaryButton";

type FeatureCardProps = {
  title: string;
  description: string;
  iconText: string;
  buttonText: string;
  href: string;
};

export function FeatureCard({
  title,
  description,
  iconText,
  buttonText,
  href,
}: FeatureCardProps) {
  return (
    <article className="flex h-full flex-col justify-between rounded-lg border border-emerald-100 bg-white p-5 shadow-lg shadow-emerald-950/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/10">
      <div className="flex flex-col gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-100 to-teal-50 text-2xl">
          <span aria-hidden>{iconText}</span>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-black text-slate-950">{title}</h3>
          <p className="text-base leading-7 text-slate-600">{description}</p>
        </div>
      </div>
      <PrimaryButton className="mt-6 w-full" href={href} variant="soft">
        {buttonText}
      </PrimaryButton>
    </article>
  );
}
