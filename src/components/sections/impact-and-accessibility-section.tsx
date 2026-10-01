import { Reveal, SectionHeading, ArcFigure } from "@/components/shared";
import { getImage } from "@/registry";
import type { HomeContent } from "@/types";

export function ImpactAndAccessibilitySection({ home }: { home: HomeContent }) {
  const impact = home.impact;
  const accessibility = home.accessibility;

  return (
    <>
      <section className="bg-background pb-20 md:pb-24">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[var(--arc-xl)_var(--arc-md)_var(--arc-xl)_var(--arc-md)] bg-primary px-8 py-14 text-primary-foreground md:px-16 md:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background: "radial-gradient(120% 100% at 100% 0%, var(--voice) 0%, transparent 62%)",
              }}
            />
            <div className="relative">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground/85">
                {impact.eyebrow}
              </p>
              <p className="mt-6 max-w-3xl text-balance text-2xl font-semibold leading-snug md:text-[2rem]">
                {impact.statement}
              </p>
              <dl className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {impact.stats.map((stat, i: number) => (
                  <Reveal key={stat.label} direction="zoom" delay={i * 90}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block text-5xl font-semibold tracking-tight md:text-6xl">
                        {stat.value}
                      </span>
                      <span
                        aria-hidden
                        className="mt-4 block h-0.5 w-10 rounded-full bg-primary-foreground/50"
                      />
                      <span className="mt-4 block text-sm leading-relaxed text-primary-foreground/90">
                        {stat.label}
                      </span>
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="band-arc-top band-arc-bottom bg-surface">
        <div className="container-page grid gap-14 py-20 md:grid-cols-2 md:items-center md:py-28">
          <Reveal>
            <ArcFigure
              src={getImage(accessibility.image)}
              alt={accessibility.imageAlt}
              variant="arc"
              ratio="4/3"
              halo="teal"
            />
          </Reveal>
          <div>
            <Reveal>
              <SectionHeading eyebrow={accessibility.eyebrow} title={accessibility.title} />
            </Reveal>
            <ul className="mt-9 grid gap-5">
              {accessibility.commitments.map((c, i: number) => (
                <Reveal as="li" key={c} delay={i * 80} className="flex gap-4">
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-voice)] text-primary-foreground"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <p className="leading-relaxed text-foreground">{c}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
