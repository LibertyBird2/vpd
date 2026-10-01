import Link from "next/link";
import { Reveal, ArcFigure } from "@/components/shared";
import { ArrowUpRight } from "lucide-react";
import { getLocalizedHref } from "@/lib/utils";
import { getImage } from "@/registry";
import type { HomeContent, VoicesContent } from "@/types";

export function VoicesSection({
  home,
  voices,
  locale,
}: {
  home: HomeContent;
  voices: VoicesContent;
  locale: string;
}) {
  const s = home.voices;
  const v = voices.items[0];
  const alt = s.imageAltTemplate.replace("{author}", v.author).replace("{role}", v.role);

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[var(--arc-md)_var(--arc-xl)_var(--arc-md)_var(--arc-xl)] bg-voice text-voice-foreground">
          <div className="grid gap-10 p-8 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-14 md:p-14">
            <Reveal direction="right">
              <ArcFigure src={getImage(v.image)} alt={alt} variant="arcAlt" ratio="4/5" />
            </Reveal>
            <Reveal direction="left" delay={120}>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-voice-foreground/75">
                {s.eyebrow}
              </p>
              <svg
                aria-hidden
                viewBox="0 0 120 40"
                className="mt-5 h-8 w-24 text-voice-foreground/60"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
              >
                <path d="M6 30 C 20 6 46 4 62 18" strokeWidth="3" />
                <path d="M24 34 C 36 18 56 16 70 26" strokeWidth="3" strokeOpacity="0.6" />
                <circle cx="80" cy="14" r="5" fill="currentColor" stroke="none" />
              </svg>
              <blockquote className="mt-5 text-2xl font-semibold leading-snug tracking-tight md:text-[2.25rem]">
                {v.title}
              </blockquote>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-voice-foreground/90">
                {v.excerpt}
              </p>
              <p className="mt-6 text-sm font-medium text-voice-foreground/80">
                {v.author} — {v.role}
              </p>
              <Link
                href={getLocalizedHref(locale, s.cta.href)}
                className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-semibold text-voice no-underline transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voice-foreground"
              >
                {s.cta.label}
                <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
