import Link from "next/link";
import { Reveal, SectionHeading, ArcFigure, IconBadge, PillLink } from "@/components/shared";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { getLocalizedHref } from "@/lib/utils";
import { getIcon, getImage } from "@/registry";
import type { HomeContent } from "@/types";

export function GetInvolvedSection({ home, locale }: { home: HomeContent; locale: string }) {
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
                className="group flex items-center gap-5 py-7 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voice rounded-sm"
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
