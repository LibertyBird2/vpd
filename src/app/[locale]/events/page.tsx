import Link from "next/link";
import { SiteLayout, PageHeader, Section } from "@/components/site-layout";
import { getEvents } from "@/repositories/dataAccess";
import { ArrowUpRight } from "lucide-react";
import { getLocalizedHref } from "@/lib/utils";
import type { EventItem } from "@/data/types";
import { Metadata } from "next";
import { Reveal } from "@/components/shared";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const events = getEvents(locale);
  return {
    title: events.seo.title,
    description: events.seo.description,
    openGraph: {
      title: events.seo.ogTitle ?? events.seo.title,
      description: events.seo.ogDescription ?? events.seo.description,
    },
  };
}

export default async function Events({ params }: Props) {
  const { locale } = await params;
  const data = getEvents(locale);

  return (
    <SiteLayout locale={locale}>
      <PageHeader eyebrow={data.header.eyebrow} title={data.header.title} lede={data.header.lede} />

      <Section eyebrow={data.upcomingSection.eyebrow} title={data.upcomingSection.title}>
        <ul className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-background">
          {data.items.upcoming.map((e: EventItem, i: number) => (
            <Reveal as="li" key={e.slug} direction="up" delay={i * 80}>
              <Link
                href={getLocalizedHref(locale, `/events/${e.slug}`)}
                className="group grid gap-4 p-6 no-underline transition-colors hover:bg-surface md:grid-cols-[130px_1fr_auto] md:items-center md:gap-8"
              >
                <div className="rounded-xl border border-border bg-secondary-soft p-4 text-center text-voice md:p-3">
                  <div className="text-[10px] uppercase tracking-widest">
                    {new Date(e.date).toLocaleString(locale, { month: "long" })}
                  </div>
                  <div className="font-semibold text-3xl">{new Date(e.date).getDate()}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {new Date(e.date).getFullYear()}
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {e.format} · {e.location}
                  </p>
                  <p className="mt-2 font-semibold text-2xl leading-snug text-foreground">
                    {e.title}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{e.summary}</p>
                </div>
                <ArrowUpRight className="hidden h-5 w-5 text-voice md:block rtl:-scale-x-100" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section bg="surface" eyebrow={data.pastSection.eyebrow} title={data.pastSection.title}>
        <ul className="grid gap-6 md:grid-cols-2">
          {data.items.past.map((e: EventItem, i: number) => (
            <Reveal as="li" key={e.slug} direction="up" delay={i * 80}>
              <Link
                href={getLocalizedHref(locale, `/events/${e.slug}`)}
                className="block rounded-3xl border border-border bg-background p-6 no-underline transition-colors hover:border-voice"
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {new Date(e.date).toLocaleDateString(locale, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  · {e.location}
                </p>
                <p className="mt-3 font-semibold text-xl text-foreground group-hover:text-voice transition-colors">
                  {e.title}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{e.summary}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>
    </SiteLayout>
  );
}
