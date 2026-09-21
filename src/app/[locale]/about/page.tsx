import Link from "next/link";
import { SiteLayout, PageHeader, Section } from "@/components/site-layout";
import { getAboutPage } from "@/repositories/dataAccess";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { ArcFigure, Reveal } from "@/components/shared";
import { getImage } from "@/registry";
import { getLocalizedHref } from "@/lib/utils";
import type { LabelledValue, OrgValue, StoryStep, FocusArea, TeamMember } from "@/data/types";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const about = getAboutPage(locale);
  return {
    title: about.seo.title,
    description: about.seo.description,
    openGraph: {
      title: about.seo.ogTitle ?? about.seo.title,
      description: about.seo.ogDescription ?? about.seo.description,
    },
  };
}

export default async function About({ params }: Props) {
  const { locale } = await params;
  const data = getAboutPage(locale);

  return (
    <SiteLayout locale={locale}>
      <PageHeader eyebrow={data.header.eyebrow} title={data.header.title} lede={data.header.lede} />

      <Section id="who" eyebrow={data.who.eyebrow} title={data.who.title}>
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <Reveal direction="up" className="space-y-6 text-lg leading-relaxed text-foreground/85">
            {data.who.paragraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
          <Reveal
            direction="zoom"
            delay={120}
            className="rounded-3xl border border-border bg-surface p-8"
          >
            <p className="eyebrow">{data.who.glanceLabel}</p>
            <dl className="mt-6 grid gap-5 text-sm">
              {data.who.glance.map((g: LabelledValue) => (
                <div
                  key={g.key}
                  className="grid grid-cols-[1fr_1.4fr] gap-4 border-b border-border pb-4 last:border-none last:pb-0"
                >
                  <dt className="text-muted-foreground">{g.label}</dt>
                  <dd className="text-foreground">{g.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section id="story" bg="surface" eyebrow={data.story.eyebrow} title={data.story.title}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal
            direction="zoom"
            className="overlay-voice-3 relative overflow-hidden rounded-3xl border border-border"
          >
            <ArcFigure
              src={getImage(data.story.image)}
              alt={data.story.imageAlt}
              ratio="4/3"
              variant="arc"
            />
          </Reveal>
          <Reveal
            direction="up"
            delay={100}
            className="space-y-6 text-base leading-relaxed text-foreground/85"
          >
            {data.story.paragraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
        </div>
      </Section>

      <div className="grid gap-px bg-border md:grid-cols-2">
        <VmBlock id="vision" title={data.vision.title} body={data.vision.body} />
        <VmBlock id="mission" title={data.mission.title} body={data.mission.body} />
      </div>

      <Section id="values" eyebrow={data.values.eyebrow} title={data.values.title}>
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {data.values.items.map((v: OrgValue, i: number) => (
            <Reveal
              as="li"
              key={v.title}
              direction="up"
              delay={(i % 3) * 70}
              className="bg-background p-8"
            >
              <h3 className="font-semibold text-xl text-voice">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section
        id="strategy"
        bg="surface"
        eyebrow={data.strategy.eyebrow}
        title={data.strategy.title}
      >
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.strategy.steps.map((step: StoryStep, i: number) => (
            <Reveal
              as="li"
              key={step.number}
              direction="up"
              delay={i * 80}
              className="rounded-3xl border border-border bg-background p-8"
            >
              <p className="font-semibold text-3xl text-voice">{step.number}</p>
              <p className="mt-4 font-semibold text-xl">{step.title}</p>
              <p className="mt-3 text-sm text-muted-foreground">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section id="areas" eyebrow={data.areas.eyebrow} title={data.areas.title}>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.areas.items.map((a: FocusArea, i: number) => (
            <Reveal
              as="li"
              key={a.id}
              direction="up"
              delay={(i % 3) * 80}
              className="rounded-3xl border border-border bg-background p-8"
            >
              <h3 className="font-semibold text-xl">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section
        id="governance"
        bg="surface"
        eyebrow={data.governance.eyebrow}
        title={data.governance.title}
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal direction="up" className="space-y-6 text-base leading-relaxed text-foreground/85">
            {data.governance.paragraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
            <Link
              href={getLocalizedHref(locale, data.governance.cta.href)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-voice"
            >
              {data.governance.cta.label} <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
          <ul className="grid gap-4">
            {data.governance.checklist.map((t: string, i: number) => (
              <Reveal
                as="li"
                key={t}
                direction="up"
                delay={i * 60}
                className="flex items-start gap-3 rounded-2xl border border-border bg-background p-5"
              >
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-foreground/90">{t}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="team" eyebrow={data.team.eyebrow} title={data.team.title}>
        <ul className="grid gap-6 md:grid-cols-2">
          {data.team.members.map((t: TeamMember, i: number) => (
            <Reveal
              as="li"
              key={t.name}
              direction="up"
              delay={i * 90}
              className="flex gap-6 rounded-3xl border border-border bg-background p-6"
            >
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-secondary-soft font-semibold text-xl text-voice">
                {t.name[0]}
              </div>
              <div className="min-min-w-0">
                <p className="font-semibold text-lg">{t.name}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{t.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.bio}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>
    </SiteLayout>
  );
}

function VmBlock({ id, title, body }: { id: string; title: string; body: string }) {
  return (
    <section id={id} className="bg-background p-10 md:p-16">
      <Reveal direction="up">
        <p className="eyebrow">{title}</p>
        <p className="mt-6 font-semibold text-2xl leading-snug md:text-3xl">{body}</p>
      </Reveal>
    </section>
  );
}
