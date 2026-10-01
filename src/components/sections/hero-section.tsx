import { Reveal, PillLink, ArcFigure } from "@/components/shared";
import { ArrowRight } from "lucide-react";
import { getLocalizedHref } from "@/lib/utils";
import { getImage } from "@/registry";
import type { HomeContent } from "@/types";

export function HeroSection({ home, locale }: { home: HomeContent; locale: string }) {
  const hero = home.hero;

  return (
    <section className="relative overflow-hidden arc-field bg-background">
      <div className="container-page relative grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:py-28">
        <Reveal direction="up" className="min-w-0">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold tracking-wide text-voice">
            <span aria-hidden className="h-1.5 w-6 rounded-full bg-[image:var(--gradient-voice)]" />
            {hero.badge}
          </span>

          <h1 className="mt-8 text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-foreground md:text-[4rem]">
            {hero.titleLead}{" "}
            <span className="relative inline-block text-primary-deep">
              {hero.titleAccent}
              <svg
                aria-hidden
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                className="absolute inset-x-0 -bottom-1 h-3 w-full"
              >
                <defs>
                  <linearGradient id="vpd-hero-arc" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="var(--primary)" />
                    <stop offset="1" stopColor="var(--voice)" />
                  </linearGradient>
                </defs>
                <path
                  d="M2 9 Q 60 1 150 9 T 298 9"
                  fill="none"
                  stroke="url(#vpd-hero-arc)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <PillLink href={getLocalizedHref(locale, hero.primaryCta.href)} size="xl">
              {hero.primaryCta.label}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
            </PillLink>
            <PillLink
              href={getLocalizedHref(locale, hero.secondaryCta.href)}
              variant="ghost"
              size="xl"
            >
              {hero.secondaryCta.label}
            </PillLink>
          </div>
        </Reveal>

        <Reveal direction="zoom" delay={140} className="relative">
          <ArcFigure
            src={getImage(hero.image)}
            alt={hero.imageAlt}
            variant="arc"
            ratio="4/3"
            halo="teal"
            eager
          />
          <div className="absolute -bottom-6 rounded-[var(--arc-md)_0.5rem_var(--arc-md)_0.5rem] border border-border bg-card px-6 py-4 shadow-lift -start-6">
            <p className="text-2xl font-semibold text-voice">{hero.highlight.value}</p>
            <p className="text-xs text-muted-foreground">{hero.highlight.label}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
