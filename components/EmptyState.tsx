import { PrimaryButton } from "./PrimaryButton";

type EmptyStateProps = {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
};

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
}: EmptyStateProps) {
  return (
    <section className="rounded-[1.75rem] bg-white p-6 text-center shadow-lg shadow-slate-950/5">
      <p className="text-4xl font-black text-emerald-500">+</p>
      <h2 className="mt-4 text-xl font-black text-slate-950">{title}</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
        {description}
      </p>
      {actionHref && actionLabel ? (
        <PrimaryButton className="mt-5 w-full" href={actionHref}>
          {actionLabel}
        </PrimaryButton>
      ) : null}
    </section>
  );
}
