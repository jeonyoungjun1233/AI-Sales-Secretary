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
    <article className="rounded-[1.5rem] border border-emerald-100 bg-white p-4 shadow-lg shadow-emerald-950/5">
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <p className="text-sm font-black text-emerald-700">결과 미리보기</p>
          <h2 className="mt-1 text-xl font-black text-slate-950">{title}</h2>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
          10초 완성
        </span>
      </div>

      {hasResult ? (
        <div className="mt-5 grid gap-4">
          <div className="rounded-[1.35rem] bg-gradient-to-br from-emerald-50 to-teal-50 p-4 shadow-inner shadow-emerald-100/60">
            <p className="whitespace-pre-line text-base leading-8 text-slate-800">
              {result}
            </p>
          </div>
          <p className="rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black leading-6 text-emerald-800">
            {successMessage}
          </p>
          <CopyButton text={result} />
        </div>
      ) : (
        <div className="mt-5 rounded-[1.35rem] border border-dashed border-emerald-200 bg-emerald-50/60 p-5">
          <h3 className="text-lg font-black text-slate-950">{emptyTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {emptyDescription}
          </p>
        </div>
      )}
    </article>
  );
}
