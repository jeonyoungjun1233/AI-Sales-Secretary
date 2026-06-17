import Link from "next/link";

type GuideQuickNavProps = {
  links: Array<{
    href: string;
    label: string;
  }>;
};

export function GuideQuickNav({ links }: GuideQuickNavProps) {
  return (
    <nav className="grid grid-cols-2 gap-2 rounded-[1.5rem] bg-white p-3 shadow-lg shadow-slate-950/5">
      {links.map((link) => (
        <Link
          className="flex min-h-11 items-center justify-center rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-800 transition active:scale-[0.99]"
          href={link.href}
          key={link.href}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
