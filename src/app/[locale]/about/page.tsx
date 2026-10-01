import { SiteLayout, PageHeader, Section } from "@/components/site-layout";
import { getAboutPage } from "@/lib/repositories";
import { Reveal, ArcNumber, PillLink } from "@/components/shared";
import { Breadcrumb } from "@/components/layout";
import { AboutNav } from "@/components/about";
import { ShieldCheck } from "lucide-react";
import type { LabelledValue, OrgValue, StoryStep, FocusArea } from "@/types";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const about = getAboutPage(locale);
  return {
    title: about.seo.title,
    description: about.seo.description,
    openGraph: {
      title: about.seo.ogTitle ?? about.seo.title,
      description: about.seo.ogDescription ?? about.seo.description,
    },
  };
}

export default async function About({ params }: Props) {
  const { locale } = await params;
  const data = getAboutPage(locale);

  const majorSections = [
    { label: data.onThisPage.items.find(i => i.href === '#who')?.label || "Who We Are", href: "#who-we-are" },
    { label: data.onThisPage.items.find(i => i.href === '#values')?.label || "Our Approach", href: "#our-approach" },
    { label: data.onThisPage.items.find(i => i.href === '#strategy')?.label || "Strategic Framework", href: "#strategic-framework" },
    { label: data.onThisPage.items.find(i => i.href === '#areas')?.label || "Areas of Work", href: "#areas-of-work" },
    { label: data.onThisPage.items.find(i => i.href === '#governance')?.label || "Funding Journey", href: "#funding-journey" },
  ];

  return (
    <SiteLayout locale={locale}>
      <PageHeader 
        eyebrow={data.header.eyebrow} 
        title={data.header.title} 
        lede={data.header.lede}
        breadcrumbs={
          <Breadcrumb locale={locale} items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        }
      />

      <AboutNav items={majorSections} />

      {/* SECTION 1 - WHO WE ARE */}
      <section id="who-we-are" className="scroll-mt-16">
        <Section bg="default" eyebrow={data.who.eyebrow} title={data.who.title}>
          <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <Reveal direction="up" className="space-y-6 text-lg leading-relaxed text-foreground/85">
              <p>{data.who.paragraphs[0]}</p>
              <p>{data.who.paragraphs[1]}</p>
            </Reveal>
            <Reveal direction="zoom" delay={120} className="rounded-3xl border border-border bg-surface p-8">
              <p className="eyebrow">{data.who.glanceLabel}</p>
              <dl className="mt-6 grid gap-5 text-sm">
                {data.who.glance.map((g: LabelledValue) => (
                  <div key={g.key} className="grid grid-cols-[1fr_1.4fr] gap-4 border-b border-border pb-4 last:border-none last:pb-0">
                    <dt className="text-muted-foreground">{g.label}</dt>
                    <dd className="text-foreground">{g.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Section>
      </section>

      {/* SECTION 2 - OUR APPROACH (Vision, Mission, Values) */}
      <section id="our-approach" className="scroll-mt-16">
        <Section bg="surface" eyebrow={data.values.eyebrow} title={data.onThisPage.items.find(i => i.href === '#values')?.label || "Our Approach"}>
          <div className="grid gap-10 md:grid-cols-2 lg:gap-14">
            <Reveal direction="up" className="rounded-3xl bg-background p-8 border border-border shadow-sm">
              <h3 className="text-2xl font-semibold leading-snug">{data.vision.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{data.vision.body}</p>
            </Reveal>
            <Reveal direction="up" delay={100} className="rounded-3xl bg-background p-8 border border-border shadow-sm">
              <h3 className="text-2xl font-semibold leading-snug">{data.mission.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{data.mission.body}</p>
            </Reveal>
          </div>
          
          <div className="mt-24">
            <Reveal direction="up">
              <h3 className="text-2xl md:text-3xl font-semibold mb-10">{data.values.title}</h3>
            </Reveal>
            <ul className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {data.values.items.map((v: OrgValue, i: number) => (
                <Reveal
                  as="li"
                  key={v.title}
                  direction="up"
                  delay={(i % 3) * 60}
                  className="bg-background p-8 transition-colors hover:bg-surface/50"
                >
                  <h4 className="font-semibold text-xl">{v.title}</h4>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{v.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      </section>

      {/* SECTION 3 - STRATEGIC FRAMEWORK */}
      <section id="strategic-framework" className="scroll-mt-16">
        <Section bg="default" eyebrow={data.strategy.eyebrow} title={data.strategy.title}>
          <div className="relative mx-auto mt-16 max-w-4xl before:absolute before:inset-y-0 before:start-[1.65rem] before:-z-10 before:w-px before:bg-border md:before:start-1/2 md:before:-translate-x-1/2">
            {data.strategy.steps.map((step: StoryStep, i: number) => (
              <Reveal
                key={step.number}
                direction="up"
                delay={(i % 2) * 100}
                className={`relative mb-16 flex flex-col gap-6 last:mb-0 md:flex-row md:items-center ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 md:px-12">
                  <div className={`rounded-3xl border border-border bg-surface p-8 ${i % 2 === 0 ? "md:text-start" : "md:text-end rtl:md:text-start rtl:md:odd:text-end"}`}>
                    <h3 className="font-semibold text-2xl">{step.title}</h3>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </div>
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-background bg-voice font-semibold text-voice-foreground text-lg shadow-sm z-10 mx-auto md:mx-0">
                  {step.number}
                </div>
                <div className="flex-1" />
              </Reveal>
            ))}
          </div>
        </Section>
      </section>

      {/* SECTION 4 - AREAS OF WORK */}
      <section id="areas-of-work" className="scroll-mt-16">
        <Section bg="surface" eyebrow={data.areas.eyebrow} title={data.areas.title}>
          <div className="py-8 md:py-12 mx-auto max-w-6xl">
            <ul className="grid gap-x-12 gap-y-16 md:grid-cols-2 lg:gap-x-20 lg:gap-y-24">
              {data.areas.items.map((a: FocusArea, i: number) => (
                <Reveal
                  as="li"
                  key={a.id}
                  direction="up"
                  delay={(i % 2) * 100}
                  className="group relative flex flex-col items-start"
                >
                  <ArcNumber n={i + 1} tone={i % 2 === 0 ? "teal" : "purple"} />
                  <h3 className="mt-8 font-semibold text-2xl leading-snug text-foreground md:text-3xl">{a.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{a.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      </section>

      {/* SECTION 5 - FUNDING JOURNEY / GOVERNANCE */}
      <section id="funding-journey" className="scroll-mt-16">
        <Section
          bg="default"
          eyebrow={data.governance.eyebrow}
          title={data.governance.title}
        >
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
            <Reveal direction="up" className="space-y-6 text-lg leading-relaxed text-foreground/85">
              {data.governance.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </Reveal>
            <ul className="grid gap-4">
              {data.governance.checklist.map((t: string, i: number) => (
                <Reveal
                  as="li"
                  key={t}
                  direction="up"
                  delay={i * 60}
                  className="flex items-start gap-4 rounded-3xl border border-border bg-surface p-6 md:p-8"
                >
                  <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-primary" />
                  <span className="text-base leading-relaxed text-foreground/90">{t}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      </section>
      
    </SiteLayout>
  );
}
