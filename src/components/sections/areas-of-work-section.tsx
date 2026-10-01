import { Reveal, IconBadge, SectionHeading, ArcFigure, ArcNumber, PillLink } from "@/components/shared";
import { ArrowRight } from "lucide-react";
import { getLocalizedHref } from "@/lib/utils";
import { getIcon, getImage } from "@/registry";
import type { HomeContent } from "@/types";

export function AreasOfWorkSection({ home, locale }: { home: HomeContent; locale: string }) {
  const whatWeDo = home.whatWeDo;
  const focusAreas = home.focusAreas;

  return (
    <>
      <section className="band-arc-top band-arc-bottom bg-surface">
        <div className="container-page grid gap-14 py-20 md:py-28 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
          <Reveal direction="zoom">
            <ArcFigure
              src={getImage(whatWeDo.image)}
              alt={whatWeDo.imageAlt}
              variant="arcAlt"
              ratio="4/5"
              halo="purple"
            />
          </Reveal>

          <div>
            <Reveal direction="right">
              <SectionHeading eyebrow={whatWeDo.eyebrow} title={whatWeDo.title} />
            </Reveal>
            <ul className="mt-10 grid gap-0">
              {whatWeDo.pillars.map((p, i: number) => (
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
                href={getLocalizedHref(locale, whatWeDo.cta.href)}
                variant="ghost"
                size="lg"
                className="mt-8"
              >
                {whatWeDo.cta.label}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
              </PillLink>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-28">
          <Reveal direction="up">
            <SectionHeading eyebrow={focusAreas.eyebrow} title={focusAreas.title} />
          </Reveal>
          <ul className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {focusAreas.areas.map((a, i: number) => (
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
    </>
  );
}
