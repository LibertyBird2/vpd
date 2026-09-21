// components/shared/pill.tsx

import Link from "next/link";
import { ReactNode, ButtonHTMLAttributes, MouseEventHandler } from "react";

export type PillVariant = "primary" | "secondary" | "outline" | "ghost" | "voice";

export type PillSize = "sm" | "md" | "lg" | "xl";

type PillLinkProps = {
  href: string;
  children: ReactNode;
  variant?: PillVariant;
  size?: PillSize;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const VARIANTS: Record<PillVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-lift",

  secondary: "bg-secondary text-secondary-foreground hover:-translate-y-0.5 hover:shadow-soft",

  outline:
    "border border-border bg-background text-foreground hover:-translate-y-0.5 hover:border-primary hover:shadow-soft",

  ghost: "bg-transparent text-voice hover:bg-secondary-soft",

  voice: "bg-voice text-voice-foreground hover:-translate-y-0.5 hover:shadow-lift",
};

const SIZES: Record<PillSize, string> = {
  sm: "min-h-9 px-4 py-2 text-xs",
  md: "min-h-10 px-5 py-2.5 text-sm",
  lg: "min-h-11 px-6 py-3 text-sm",
  xl: "min-h-12 px-7 py-3.5 text-sm",
};

export function pillClass({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: PillVariant;
  size?: PillSize;
  className?: string;
}) {
  return [
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "rounded-full",
    "font-semibold",
    "no-underline",
    "transition-all",
    "duration-300",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-primary",
    "focus-visible:ring-offset-2",
    VARIANTS[variant],
    SIZES[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export function PillLink({
  href,
  children,
  variant = "secondary",
  size = "md",
  className = "",
  external = false,
  ariaLabel,
  onClick,
}: PillLinkProps) {
  const classes = pillClass({ variant, size, className });

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </Link>
  );
}

type PillButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: PillVariant;
  size?: PillSize;
  className?: string;
};

export function PillButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}: PillButtonProps) {
  return (
    <button type={type} className={pillClass({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}
