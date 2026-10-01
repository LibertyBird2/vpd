import { SiteLayout, PageHeader, Section } from "@/components/site-layout";
import { PillLink, VoiceCard, Reveal } from "@/components/shared";
import { getVoices } from "@/lib/repositories";
import { ArrowUpRight } from "lucide-react";
import { getLocalizedHref } from "@/lib/utils";
import type { Voice, OrgValue } from "@/types";
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
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((v: Voice, i: number) => (
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
