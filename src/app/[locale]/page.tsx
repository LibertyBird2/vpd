import Link from "next/link";
import { SiteLayout } from "@/components/site-layout";
import {
  Reveal,
  SectionHeading,
  ArcFigure,
  IconBadge,
  ArcNumber,
  PillLink,
} from "@/components/shared";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getHomePage, getEvents, getInsights, getVoices } from "@/repositories/dataAccess";
import { getIcon, getImage } from "@/registry";
import { getLocalizedHref } from "@/lib/utils";
import type { HomeContent, EventsContent, InsightsContent, VoicesContent } from "@/data/types";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const home = getHomePage(locale);
  return {
    title: home.seo.title,
    description: home.seo.description,
    openGraph: {
      title: home.seo.ogTitle ?? home.seo.title,
      description: home.seo.ogDescription ?? home.seo.description,
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const home = getHomePage(locale);
  const events = getEvents(locale);
  const insights = getInsights(locale);
  const voices = getVoices(locale);

  return (
    <SiteLayout locale={locale}>
      <Hero home={home} locale={locale} />
      <OrgSnapshot home={home} />
      <WhoWeAre home={home} locale={locale} />
      <WhatWeDo home={home} locale={locale} />
      <FocusAreas home={home} />
      <ImpactBand home={home} />
      <AccessibilityPromise home={home} />
      <VoicesFeature home={home} voices={voices} locale={locale} />
      <KnowledgeStrip home={home} events={events} insights={insights} locale={locale} />
      <GetInvolved home={home} locale={locale} />
    </SiteLayout>
  );
}

function Hero({ home, locale }: { home: HomeContent; locale: string }) {
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

function OrgSnapshot({ home }: { home: HomeContent }) {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page grid gap-x-10 gap-y-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {home.snapshot.map((f, i: number) => (
          <Reveal
            key={f.key}
            delay={i * 70}
            className="flex items-start gap-4 border-voice/20 ltr:lg:border-l ltr:lg:pl-8 ltr:lg:first:border-l-0 ltr:lg:first:pl-0 rtl:lg:border-r rtl:lg:pr-8 rtl:lg:first:border-r-0 rtl:lg:first:pr-0"
          >
            <IconBadge icon={getIcon(f.icon)} size="sm" tone={i % 2 === 0 ? "teal" : "purple"} />
            <span>
              <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-voice">
                {f.label}
              </span>
              <span className="mt-1.5 block text-sm font-medium leading-relaxed text-foreground">
                {f.value}
              </span>
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WhoWeAre({ home, locale }: { home: HomeContent; locale: string }) {
  const s = home.whoWeAre;

  return (
    <section className="bg-background">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <SectionHeading align="center" eyebrow={s.eyebrow} title={s.title} lede={s.lede}>
            <Link
              href={getLocalizedHref(locale, s.cta.href)}
              className="group mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-voice no-underline"
            >
              {s.cta.label}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180"
                aria-hidden
              />
            </Link>
          </SectionHeading>
        </Reveal>
      </div>
    </section>
  );
}

function WhatWeDo({ home, locale }: { home: HomeContent; locale: string }) {
  const s = home.whatWeDo;

  return (
    <section className="band-arc-top band-arc-bottom bg-surface">
      <div className="container-page grid gap-14 py-20 md:py-28 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
        <Reveal direction="zoom">
          <ArcFigure
            src={getImage(s.image)}
            alt={s.imageAlt}
            variant="arcAlt"
            ratio="4/5"
            halo="purple"
          />
        </Reveal>

        <div>
          <Reveal direction="right">
            <SectionHeading eyebrow={s.eyebrow} title={s.title} />
          </Reveal>
          <ul className="mt-10 grid gap-0">
            {s.pillars.map((p, i: number) => (
              <Reveal
                as="li"
                key={p.key}
                direction="up"
                delay={i * 90}
                className="group flex items-start gap-5 border-b border-border py-6 first:border-t"
              >
                <IconBadge icon={getIcon(p.icon)} tone={i === 1 ? "purple" : "teal"} />
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal direction="up" delay={300}>
            <PillLink
              href={getLocalizedHref(locale, s.cta.href)}
              variant="ghost"
              size="lg"
              className="mt-8"
            >
              {s.cta.label}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
            </PillLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FocusAreas({ home }: { home: HomeContent }) {
  const s = home.focusAreas;

  return (
    <section className="bg-background">
      <div className="container-page py-20 md:py-28">
        <Reveal direction="up">
          <SectionHeading eyebrow={s.eyebrow} title={s.title} />
        </Reveal>
        <ul className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {s.areas.map((a, i: number) => (
            <Reveal as="li" key={a.id} direction="up" delay={(i % 3) * 80} className="group">
              <ArcNumber n={i + 1} tone={i % 2 === 0 ? "teal" : "purple"} />
              <h3 className="mt-5 text-lg font-semibold text-foreground">{a.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{a.body}</p>
              <span
                aria-hidden
                className="mt-5 block h-0.5 w-12 rounded-full bg-[image:var(--gradient-voice)] transition-all duration-500 ease-out group-hover:w-24"
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ImpactBand({ home }: { home: HomeContent }) {
  const s = home.impact;

  return (
    <section className="bg-background pb-20 md:pb-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[var(--arc-xl)_var(--arc-md)_var(--arc-xl)_var(--arc-md)] bg-primary px-8 py-14 text-primary-foreground md:px-16 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background: "radial-gradient(120% 100% at 100% 0%, var(--voice) 0%, transparent 62%)",
            }}
          />
          <div className="relative">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground/85">
              {s.eyebrow}
            </p>
            <p className="mt-6 max-w-3xl text-balance text-2xl font-semibold leading-snug md:text-[2rem]">
              {s.statement}
            </p>
            <dl className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {s.stats.map((stat, i: number) => (
                <Reveal key={stat.label} direction="zoom" delay={i * 90}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-5xl font-semibold tracking-tight md:text-6xl">
                      {stat.value}
                    </span>
                    <span
                      aria-hidden
                      className="mt-4 block h-0.5 w-10 rounded-full bg-primary-foreground/50"
                    />
                    <span className="mt-4 block text-sm leading-relaxed text-primary-foreground/90">
                      {stat.label}
                    </span>
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function AccessibilityPromise({ home }: { home: HomeContent }) {
  const s = home.accessibility;

  return (
    <section className="band-arc-top band-arc-bottom bg-surface">
      <div className="container-page grid gap-14 py-20 md:grid-cols-2 md:items-center md:py-28">
        <Reveal>
          <ArcFigure
            src={getImage(s.image)}
            alt={s.imageAlt}
            variant="arc"
            ratio="4/3"
            halo="teal"
          />
        </Reveal>
        <div>
          <Reveal>
            <SectionHeading eyebrow={s.eyebrow} title={s.title} />
          </Reveal>
          <ul className="mt-9 grid gap-5">
            {s.commitments.map((c, i: number) => (
              <Reveal as="li" key={c} delay={i * 80} className="flex gap-4">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-voice)] text-primary-foreground"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <p className="leading-relaxed text-foreground">{c}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function VoicesFeature({
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
                className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-semibold text-voice no-underline transition-transform duration-300 hover:-translate-y-0.5"
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

function KnowledgeStrip({
  home,
  events,
  insights,
  locale,
}: {
  home: HomeContent;
  events: EventsContent;
  insights: InsightsContent;
  locale: string;
}) {
  const s = home.knowledge;
  const upcoming = events?.items?.upcoming?.[0];
  const insight = insights?.items?.[0];

  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page py-14 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-voice">
              {s.eyebrow}
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">{s.title}</h2>
          </div>
          <Link
            href={getLocalizedHref(locale, "/insights")}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-voice no-underline"
          >
            {s.allLabel} <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
          </Link>
        </div>

        <ul className="mt-8 grid gap-0 md:grid-cols-2">
          {upcoming && (
            <Reveal as="li" className="border-t border-border">
              <Link
                href={getLocalizedHref(locale, `/events/${upcoming.slug}`)}
                className="group flex items-start gap-4 py-6 no-underline ltr:md:pr-10 rtl:md:pl-10"
              >
                <IconBadge
                  icon={getIcon(upcoming.format === "Workshop" ? "accessibility" : "calendar")}
                  size="sm"
                  tone="teal"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-voice">
                    {s.upcomingLabel} · {upcoming.format}
                  </span>
                  <span className="mt-2 block font-semibold text-foreground group-hover:text-primary-deep">
                    {upcoming.title}
                  </span>
                  <span className="mt-1.5 block text-sm text-muted-foreground">
                    {upcoming.location}
                  </span>
                </span>
              </Link>
            </Reveal>
          )}

          {insight && (
            <Reveal as="li" delay={90} className="border-t border-border">
              <Link
                href={getLocalizedHref(locale, "/insights")}
                className="group flex items-start gap-4 py-6 no-underline ltr:md:pl-10 rtl:md:pr-10"
              >
                <IconBadge icon={getIcon("fileText")} size="sm" tone="purple" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-voice">
                    {s.latestLabel}
                  </span>
                  <span className="mt-2 block font-semibold text-foreground group-hover:text-voice">
                    {insight.title}
                  </span>
                  <span className="mt-1.5 block text-sm text-muted-foreground">{insight.kind}</span>
                </span>
              </Link>
            </Reveal>
          )}
        </ul>
      </div>
    </section>
  );
}

function GetInvolved({ home, locale }: { home: HomeContent; locale: string }) {
  const s = home.getInvolved;

  return (
    <section className="bg-background">
      <div className="container-page grid gap-14 py-20 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionHeading eyebrow={s.eyebrow} title={s.title} lede={s.lede} />
          <ArcFigure
            src={getImage(s.image)}
            alt={s.imageAlt}
            variant="arcAlt"
            ratio="3/2"
            className="mt-9"
          />
        </Reveal>
        <ul className="grid gap-0">
          {s.ways.map((w: any, i: number) => (
            <Reveal
              as="li"
              key={w.key}
              delay={i * 90}
              className="border-b border-border first:border-t"
            >
              <Link
                href={getLocalizedHref(locale, "/get-involved")}
                className="group flex items-center gap-5 py-7 no-underline"
              >
                <IconBadge icon={getIcon(w.icon)} tone={i === 1 ? "purple" : "teal"} />
                <span className="min-w-0 flex-1">
                  <span className="block text-xl font-semibold text-foreground transition-colors group-hover:text-primary-deep">
                    {w.title}
                  </span>
                  <span className="mt-2 block leading-relaxed text-muted-foreground">{w.body}</span>
                </span>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 text-voice transition-transform duration-300 group-hover:-translate-y-1 rtl:-scale-x-100"
                  aria-hidden
                />
              </Link>
            </Reveal>
          ))}
          <Reveal as="li" delay={320} className="pt-2">
            <PillLink
              href={getLocalizedHref(locale, s.cta.href)}
              variant="voice"
              size="xl"
              className="mt-8"
            >
              {s.cta.label}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
            </PillLink>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
