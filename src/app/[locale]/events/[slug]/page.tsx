import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteLayout, Section } from "@/components/site-layout";
import { getEvents } from "@/repositories/dataAccess";
import { PillLink, Reveal } from "@/components/shared";
import { getLocalizedHref } from "@/lib/utils";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const events = getEvents(locale);
  return [...events.items.upcoming, ...events.items.past].map((e: any) => ({
    slug: e.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = getEvents(locale);
  const event = [...data.items.upcoming, ...data.items.past].find((e: any) => e.slug === slug);

  if (!event) return { title: data.detail.seoSuffix, robots: "noindex" };

  return {
    title: `${event.title} — VPD Events`,
    description: event.summary,
    openGraph: {
      title: event.title,
      description: event.summary,
    },
  };
}

export default async function EventDetail({ params }: Props) {
  const { locale, slug } = await params;
  const data = getEvents(locale);
  const event = [...data.items.upcoming, ...data.items.past].find((e: any) => e.slug === slug);
  const upcoming = data.items.upcoming.some((e: any) => e.slug === slug);

  if (!event) {
    notFound();
  }

  const d = new Date(event.date);

  return (
    <SiteLayout locale={locale}>
      <section className="border-b border-border bg-surface">
        <div className="container-page py-14">
          <Reveal direction="up">
            <Link
              href={getLocalizedHref(locale, "/events")}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground no-underline hover:text-voice"
            >
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              {data.detail.backLabel}
            </Link>
            <p className="eyebrow mt-8">
              {event.format} · {upcoming ? data.detail.upcomingLabel : data.detail.pastLabel}
            </p>
            <h1 className="mt-4 max-w-3xl text-balance font-semibold text-4xl leading-[1.05] md:text-6xl">
              {event.title}
            </h1>
            <div className="mt-8 grid gap-4 text-sm sm:grid-cols-3">
              <Meta
                icon={Calendar}
                label={d.toLocaleDateString(locale, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              />
              <Meta icon={MapPin} label={event.location} />
              <Meta icon={Users} label={data.detail.openLabel} />
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <Reveal direction="up" className="space-y-6 text-lg leading-relaxed text-foreground/85">
            <p className="text-xl text-foreground">{event.summary}</p>
            {data.detail.sections.map((sec: any) => (
              <div key={sec.title}>
                <h2 className="mt-10 font-semibold text-2xl text-foreground">{sec.title}</h2>
                <p className="mt-4">{sec.body}</p>
              </div>
            ))}
            <h2 className="mt-10 font-semibold text-2xl text-foreground">
              {data.detail.accessTitle}
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              {data.detail.access.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal direction="left" delay={120} className="space-y-5">
            <aside className="space-y-5">
              {upcoming ? (
                <div className="rounded-3xl border border-border bg-primary p-8 text-primary-foreground">
                  <p className="text-xs uppercase tracking-[0.14em] opacity-80">
                    {data.detail.rsvp.eyebrow}
                  </p>
                  <p className="mt-3 font-semibold text-2xl">{data.detail.rsvp.title}</p>
                  <p className="mt-2 text-sm opacity-90">{data.detail.rsvp.body}</p>
                  <PillLink
                    href={getLocalizedHref(locale, "/get-involved")}
                    variant="secondary"
                    size="lg"
                    className="mt-6 w-full"
                  >
                    {data.detail.rsvp.cta}
                  </PillLink>
                </div>
              ) : (
                <div className="rounded-3xl border border-border bg-secondary p-8 text-secondary-foreground">
                  <p className="text-xs uppercase tracking-[0.14em] opacity-80">
                    {data.detail.recording.eyebrow}
                  </p>
                  <p className="mt-3 font-semibold text-2xl">{data.detail.recording.title}</p>
                  <p className="mt-2 text-sm opacity-90">{data.detail.recording.body}</p>
                  <PillLink
                    href={getLocalizedHref(locale, "/get-involved")}
                    variant="outline"
                    size="lg"
                    className="mt-6 w-full"
                  >
                    {data.detail.recording.cta}
                  </PillLink>
                </div>
              )}

              <div className="rounded-3xl border border-border bg-surface p-6 text-sm">
                <p className="eyebrow">{data.detail.support.title}</p>
                <p className="mt-3 text-muted-foreground">{data.detail.support.body}</p>
                <Link
                  href={getLocalizedHref(locale, data.detail.support.cta.href)}
                  className="mt-4 inline-block text-voice"
                >
                  {data.detail.support.cta.label}
                </Link>
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>
    </SiteLayout>
  );
}

function Meta({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-background p-4">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-voice" />
      <span className="text-foreground">{label}</span>
    </div>
  );
}

// function Meta({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
//   return (
//     <div className="flex items-start gap-3 rounded-2xl border border-border bg-background p-4">
//       <Icon className="mt-0.5 h-4 w-4 shrink-0 text-voice" />
//       <span className="text-foreground">{label}</span>
//     </div>
//   );
// }
