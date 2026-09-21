/**
 * VPD brand primitives.
 *
 * Every recurring visual gesture on the site comes from here so the identity
 * stays systematic rather than decorative:
 *
 *   BrandRule      — 2px teal→purple hairline (page top, band edges)
 *   SectionHeading — eyebrow + arc accent + title + lede, one rhythm everywhere
 *   ArcFigure      — the single approved image mask family
 *   IconBadge      — the single approved icon container
 *   ArcNumber      — numbered focus-area marker (replaces generic cards)
 */

import type { ComponentType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getImage } from "@/registry";

/* ------------------------------------------------------------------ rule */

export function BrandRule({ className = "" }: { className?: string }) {
  return <div aria-hidden className={cn("rule-voice", className)} />;
}

/* --------------------------------------------------------------- heading */

export type BrandTone = "default" | "onColor";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "default",
  align = "start",
  className,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: BrandTone;
  align?: "start" | "center";
  className?: string;
  children?: ReactNode;
}) {
  const onColor = tone === "onColor";
  return (
    <div
      className={cn(
        "arc-accent max-w-3xl",
        align === "center" && "arc-accent-center mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-[0.72rem] font-semibold uppercase tracking-[0.18em]",
            onColor ? "text-current opacity-80" : "text-voice",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-3 text-balance text-3xl font-semibold leading-[1.12] tracking-tight md:text-[2.75rem]",
          onColor ? "text-current" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed md:text-xl",
            onColor ? "text-current opacity-90" : "text-muted-foreground",
          )}
        >
          {lede}
        </p>
      )}
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- figure */

export type ArcVariant = "arc" | "arcAlt" | "soft";
export type ArcRatio = "4/3" | "4/5" | "3/2" | "1/1";

const ARC_VARIANT: Record<ArcVariant, string> = {
  arc: "arc-frame",
  arcAlt: "arc-frame-alt",
  soft: "arc-frame-soft",
};

const ARC_RATIO: Record<ArcRatio, string> = {
  "4/3": "aspect-[4/3]",
  "4/5": "aspect-[4/5]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
};

export function ArcFigure({
  src,
  alt,
  variant = "arc",
  ratio = "4/3",
  halo,
  className,
  eager = false,
  caption,
}: {
  src: any;
  alt: string;
  variant?: ArcVariant;
  ratio?: ArcRatio;
  /** Offset brand-coloured shape behind the image. */
  halo?: "teal" | "purple";
  className?: string;
  eager?: boolean;
  caption?: ReactNode;
}) {
  if (!src) return null;
  const resolvedSrc = typeof src === "string" ? getImage(src) : src;
  if (!resolvedSrc) return null;

  return (
    <div className={cn("relative", className)}>
      {halo && (
        <div
          aria-hidden
          className={cn(
            "absolute -inset-4 -z-10 md:-inset-6",
            variant === "arcAlt" ? "band-arc-top" : "arc-frame-alt",
            halo === "teal" ? "bg-primary-soft" : "bg-secondary-soft",
          )}
        />
      )}
      <figure className={cn(ARC_VARIANT[variant], "shadow-soft relative", ARC_RATIO[ratio])}>
        <Image
          src={resolvedSrc}
          alt={alt}
          priority={eager}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-fit transition-transform duration-700 ease-out"
        />
        {caption && <figcaption className="sr-only">{caption}</figcaption>}
      </figure>
    </div>
  );
}

/* ------------------------------------------------------------------ icon */

export function IconBadge({
  icon: Icon,
  tone = "teal",
  size = "md",
  className,
}: {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  tone?: "teal" | "purple" | "onColor";
  size?: "sm" | "md";
  className?: string;
}) {
  const tones = {
    teal: "bg-primary-soft text-primary-deep",
    purple: "bg-secondary-soft text-voice",
    onColor: "bg-current/15 text-current",
  } as const;
  const sizes = { sm: "h-10 w-10", md: "h-12 w-12" } as const;
  const icons = { sm: "h-[1.15rem] w-[1.15rem]", md: "h-[1.35rem] w-[1.35rem]" } as const;
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        tones[tone],
        sizes[size],
        className,
      )}
    >
      <Icon className={icons[size]} aria-hidden />
    </span>
  );
}

/* ---------------------------------------------------------------- number */

export function ArcNumber({ n, tone = "teal" }: { n: number; tone?: "teal" | "purple" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-[var(--arc-md)_0.5rem_var(--arc-md)_0.5rem] text-sm font-semibold",
        tone === "teal" ? "bg-primary-soft text-primary-deep" : "bg-secondary-soft text-voice",
      )}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}
