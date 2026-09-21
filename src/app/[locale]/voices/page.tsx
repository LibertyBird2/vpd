import { SiteLayout, PageHeader, Section } from "@/components/site-layout";
import { PillLink, ArcFigure, VoiceCard, Reveal } from "@/components/shared";
import { getVoices } from "@/repositories/dataAccess";
import { Quote, ArrowUpRight } from "lucide-react";
import { getImage } from "@/registry";
import { getLocalizedHref } from "@/lib/utils";
import type { Voice, OrgValue } from "@/data/types";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const voices = getVoices(locale);
  return {
    title: voices.seo.title,
    description: voices.seo.description,
    openGraph: {
      title: voices.seo.ogTitle ?? voices.seo.title,
      description: voices.seo.ogDescription ?? voices.seo.description,
    },
  };
}

export default async function Voices({ params }: Props) {
  const { locale } = await params;
  const data = getVoices(locale);
  const featured = data.items[0];
  const rest = data.items;

  return (
    <SiteLayout locale={locale}>
      <PageHeader eyebrow={data.header.eyebrow} title={data.header.title} lede={data.header.lede}>
        <div className="flex flex-wrap gap-3">
          <PillLink href={getLocalizedHref(locale, data.header.primaryCta.href)} variant="voice">
            {data.header.primaryCta.label}
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
          </PillLink>
          <PillLink
            href={getLocalizedHref(locale, data.header.secondaryCta.href)}
            variant="outline"
          >
            {data.header.secondaryCta.label}
          </PillLink>
        </div>
      </PageHeader>

      <Section>
        {/* Featured voice */}
        {featured && (
          <Reveal direction="zoom">
            <article className="mb-16 grid gap-10 rounded-3xl border border-border bg-surface p-8 md:p-12 lg:grid-cols-[1fr_1.3fr]">
              <div className="overlay-voice-8 relative overflow-hidden rounded-2xl">
                <ArcFigure
                  src={getImage(featured.image)}
                  alt=""
                  ratio="4/5"
                  className="w-full"
                  variant="arcAlt"
                />
              </div>
              <div className="flex flex-col justify-center">
                <Quote className="h-8 w-8 text-voice rtl:-scale-x-100" />
                <p className="mt-6 font-semibold text-3xl leading-tight md:text-4xl">
                  &quot;{featured.title}&quot;
                </p>
                <p className="mt-6 text-base text-muted-foreground">{featured.excerpt}</p>
                <p className="mt-8 text-sm uppercase tracking-[0.14em] text-voice">
                  {featured.author} — {featured.role}
                </p>
              </div>
            </article>
          </Reveal>
        )}

        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((v: Voice, i: number) => (
            <Reveal as="li" key={v.slug} direction="up" delay={(i % 3) * 80}>
              <VoiceCard voice={v} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section bg="surface" eyebrow={data.contribute.eyebrow} title={data.contribute.title}>
        <div className="grid gap-8 md:grid-cols-3">
          {data.contribute.options.map((opt: OrgValue, i: number) => (
            <Reveal
              key={opt.title}
              direction="up"
              delay={i * 80}
              className="rounded-3xl border border-border bg-background p-8"
            >
              <p className="font-semibold text-xl text-voice">{opt.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{opt.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
