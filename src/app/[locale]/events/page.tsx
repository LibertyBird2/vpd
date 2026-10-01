import Link from "next/link";
import { SiteLayout, PageHeader, Section } from "@/components/site-layout";
import { getEvents } from "@/lib/repositories";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { getLocalizedHref } from "@/lib/utils";
import type { EventItem } from "@/types";
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

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  const data = getEvents(locale);

  const allEvents = [...data.items.upcoming, ...data.items.past];
  
  // Use YYYY-MM-DD comparison to avoid timezone/hydration issues on the server
  const today = new Date().toISOString().split('T')[0];

  const upcomingEvents = allEvents
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date)); // Nearest upcoming first

  const pastEvents = allEvents
    .filter((e) => e.date < today)
    .sort((a, b) => b.date.localeCompare(a.date)); // Most recent past first

  return (
    <SiteLayout locale={locale}>
      <PageHeader 
        eyebrow={data.header.eyebrow} 
        title={data.header.title} 
        lede={data.header.lede} 
      />

      {upcomingEvents.length > 0 && (
        <Section eyebrow={data.upcomingSection.eyebrow} title={data.upcomingSection.title}>
          <ul className="grid gap-6">
            {upcomingEvents.map((e: EventItem, i: number) => (
              <Reveal as="li" key={e.slug} direction="up" delay={i * 80}>
                <Link
                  href={getLocalizedHref(locale, `/events/${e.slug}`)}
                  className="group flex flex-col gap-6 rounded-3xl border border-border bg-surface p-6 transition-all hover:border-primary-deep hover:shadow-soft sm:flex-row sm:items-center sm:p-8"
                >
                  <div className="flex w-32 shrink-0 flex-col items-center justify-center rounded-2xl bg-background border border-border py-4 px-2 text-center shadow-sm">
                    <span className="text-xs font-semibold uppercase tracking-widest text-voice">
                      {new Date(e.date).toLocaleString(locale, { month: "short" })}
                    </span>
                    <span className="my-1 text-4xl font-bold text-foreground">
                      {new Date(e.date).getDate()}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {new Date(e.date).getFullYear()}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-widest text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-voice" />
                        {e.format}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-voice" />
                        {e.location}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold leading-snug text-foreground group-hover:text-voice transition-colors">
                      {e.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground line-clamp-2">
                      {e.summary}
                    </p>
                  </div>
                  
                  <div className="hidden shrink-0 items-center justify-center sm:flex sm:h-12 sm:w-12 sm:rounded-full sm:border sm:border-border sm:bg-background sm:group-hover:border-voice sm:group-hover:bg-voice sm:group-hover:text-voice-foreground transition-all">
                    <ArrowUpRight className="h-5 w-5 rtl:-scale-x-100" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {pastEvents.length > 0 && (
        <Section 
          bg={upcomingEvents.length > 0 ? "surface" : "default"} 
          eyebrow={data.pastSection.eyebrow} 
          title={data.pastSection.title}
        >
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((e: EventItem, i: number) => (
              <Reveal as="li" key={e.slug} direction="up" delay={(i % 3) * 80}>
                <Link
                  href={getLocalizedHref(locale, `/events/${e.slug}`)}
                  className="group flex h-full flex-col rounded-3xl border border-border bg-background p-6 transition-all hover:border-voice hover:shadow-sm sm:p-8"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    <span className="rounded-full bg-surface px-2.5 py-1 font-medium text-foreground">
                      {new Date(e.date).toLocaleDateString(locale, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className="truncate">{e.location}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold leading-snug text-foreground group-hover:text-voice transition-colors">
                    {e.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground flex-1">
                    {e.summary}
                  </p>
                  
                  <div className="mt-6 flex items-center text-sm font-semibold text-voice group-hover:text-primary-deep transition-colors">
                    {data.detail.pastLabel}
                    <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:mr-1.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Section>
      )}
    </SiteLayout>
  );
}
