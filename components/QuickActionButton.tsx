import Link from "next/link";

type QuickActionButtonProps = {
  href: string;
  icon: string;
  title: string;
  description: string;
  accent?: "mint" | "amber" | "rose";
};

const accentClasses = {
  mint: "from-emerald-500 to-teal-400 shadow-emerald-200",
  amber: "from-amber-400 to-orange-400 shadow-amber-100",
  rose: "from-rose-400 to-pink-400 shadow-rose-100",
};

export function QuickActionButton({
  href,
  icon,
  title,
  description,
  accent = "mint",
}: QuickActionButtonProps) {
  return (
    <Link
      className="group rounded-3xl bg-white p-4 shadow-lg shadow-slate-950/5 transition active:scale-[0.99]"
      href={href}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-lg text-white shadow-lg ${accentClasses[accent]}`}
        aria-hidden
      >
        {icon}
      </div>
      <h3 className="mt-3 text-base font-black text-slate-950">{title}</h3>
      <p className="mt-1 text-xs font-bold leading-5 text-slate-500">
        {description}
      </p>
    </Link>
  );
}
