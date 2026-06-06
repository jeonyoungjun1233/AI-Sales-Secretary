import { CopyButton } from "./CopyButton";

type GeneratedResultBoxProps = {
  title: string;
  result: string;
  emptyTitle: string;
  emptyDescription: string;
  successMessage: string;
};

export function GeneratedResultBox({
  title,
  result,
  emptyTitle,
  emptyDescription,
  successMessage,
}: GeneratedResultBoxProps) {
  const hasResult = result.trim().length > 0;

  return (
    <article className="rounded-lg border border-emerald-100 bg-white p-5 shadow-xl shadow-emerald-950/5 sm:p-6">
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <p className="text-sm font-black text-emerald-700">결과 미리보기</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">{title}</h2>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
          10초 완성
        </span>
      </div>

      {hasResult ? (
        <div className="mt-5 grid gap-4">
          <div className="rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
            <p className="whitespace-pre-line text-base leading-8 text-slate-800">
              {result}
            </p>
          </div>
          <p className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold leading-6 text-emerald-900">
            {successMessage}
          </p>
          <CopyButton text={result} />
        </div>
      ) : (
        <div className="mt-5 rounded-lg border border-dashed border-emerald-200 bg-emerald-50/60 p-5">
          <h3 className="text-lg font-black text-slate-950">{emptyTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {emptyDescription}
          </p>
        </div>
      )}
    </article>
  );
}
