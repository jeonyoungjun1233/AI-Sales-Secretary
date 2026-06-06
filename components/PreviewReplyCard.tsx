import { CopyButton } from "./CopyButton";

type PreviewReplyCardProps = {
  question: string;
  reply: string;
  label?: string;
};

export function PreviewReplyCard({
  question,
  reply,
  label = "답장 미리보기",
}: PreviewReplyCardProps) {
  return (
    <article className="rounded-lg border border-emerald-100 bg-white p-4 shadow-xl shadow-emerald-950/10 sm:p-5">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <p className="text-sm font-bold text-emerald-700">{label}</p>
          <p className="mt-1 text-xs font-semibold text-slate-400">
            직접 확인하고 복사해서 쓰는 방식
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
          10초 완성
        </span>
      </div>

      <div className="mt-4 grid gap-3">
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-bold text-slate-500">손님 질문</p>
          <p className="mt-2 text-sm leading-6 text-slate-800">{question}</p>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
          <p className="text-xs font-bold text-emerald-700">
            추천 답장
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-800">{reply}</p>
        </div>
      </div>

      <CopyButton className="mt-4" text={reply} />
    </article>
  );
}
