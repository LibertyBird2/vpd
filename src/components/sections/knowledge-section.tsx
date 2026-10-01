import Link from "next/link";
import { Reveal, IconBadge } from "@/components/shared";
import { ArrowRight } from "lucide-react";
import { getLocalizedHref } from "@/lib/utils";
import { getIcon } from "@/registry";
import type { HomeContent, EventsContent, InsightsContent } from "@/types";

export function KnowledgeSection({
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
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-voice">
              {s.eyebrow}
            </h2>
            <p className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">{s.title}</p>
          </div>
          <Link
            href={getLocalizedHref(locale, "/insights")}
            className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-voice no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voice rounded-sm"
          >
            {s.allLabel}{" "}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180"
              aria-hidden
            />
          </Link>
        </div>

        <ul className="mt-8 grid gap-0 md:grid-cols-2">
          {upcoming && (
            <Reveal as="li" className="border-t border-border">
              <Link
                href={getLocalizedHref(locale, `/events/${upcoming.slug}`)}
                className="group flex items-start gap-4 py-6 no-underline ltr:md:pr-10 rtl:md:pl-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voice rounded-sm"
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
                  <span className="mt-2 block font-semibold text-foreground group-hover:text-primary-deep transition-colors">
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
                className="group flex items-start gap-4 py-6 no-underline ltr:md:pl-10 rtl:md:pr-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voice rounded-sm"
              >
                <IconBadge icon={getIcon("fileText")} size="sm" tone="purple" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-voice">
                    {s.latestLabel}
                  </span>
                  <span className="mt-2 block font-semibold text-foreground group-hover:text-voice transition-colors">
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
