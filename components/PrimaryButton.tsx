import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "outline" | "soft" | "dark";
  className?: string;
  disabled?: boolean;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

const variantClasses = {
  solid:
    "bg-emerald-500 text-white shadow-lg shadow-emerald-200/80 hover:bg-emerald-600",
  outline:
    "border border-slate-200 bg-white text-slate-900 shadow-sm hover:border-emerald-300 hover:bg-emerald-50",
  soft: "bg-emerald-50 text-emerald-800 hover:bg-emerald-100",
  dark: "bg-slate-950 text-white shadow-lg shadow-slate-200 hover:bg-slate-800",
};

export function PrimaryButton({
  children,
  href,
  variant = "solid",
  className = "",
  disabled = false,
  onClick,
  type = "button",
}: PrimaryButtonProps) {
  const classes = `inline-flex min-h-12 items-center justify-center rounded-xl px-5 py-3 text-base font-bold transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
