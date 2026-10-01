import Link from "next/link";
import { Reveal, IconBadge, SectionHeading } from "@/components/shared";
import { ArrowRight } from "lucide-react";
import { getLocalizedHref } from "@/lib/utils";
import { getIcon } from "@/registry";
import type { HomeContent } from "@/types";

export function IntroSection({ home, locale }: { home: HomeContent; locale: string }) {
  const s = home.whoWeAre;

  return (
    <>
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

      <section className="bg-background">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <SectionHeading align="center" eyebrow={s.eyebrow} title={s.title} lede={s.lede}>
              <Link
                href={getLocalizedHref(locale, s.cta.href)}
                className="group mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-voice no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voice rounded-sm"
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
    </>
  );
}
