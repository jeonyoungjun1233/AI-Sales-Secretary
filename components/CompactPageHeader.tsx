import type { ReactNode } from "react";

type CompactPageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function CompactPageHeader({
  title,
  description,
  action,
}: CompactPageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h2 className="text-xl font-black leading-7 text-slate-950">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
