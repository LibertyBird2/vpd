import { SiteLayout, PageHeader, Section } from "@/components/site-layout";
import { PillLink, Reveal, ArcFigure } from "@/components/shared";
import { getProjects } from "@/lib/repositories";
import { Sparkles, ArrowRight, History, Users, ArrowUpRight } from "lucide-react";
import { getLocalizedHref } from "@/lib/utils";
import type { InitiativeProject } from "@/types";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const projects = getProjects(locale);
  return {
    title: projects.seo.title,
    description: projects.seo.description,
    openGraph: {
      title: projects.seo.ogTitle ?? projects.seo.title,
      description: projects.seo.ogDescription ?? projects.seo.description,
    },
  };
}

export default async function ProgramsPage({ params }: Props) {
  const { locale } = await params;
  const data = getProjects(locale);

  return (
    <SiteLayout locale={locale}>
      <PageHeader 
        eyebrow={data.header.eyebrow} 
        title={data.header.title} 
        lede={data.header.lede} 
      />

      <Section eyebrow={data.empty.eyebrow} title={data.empty.title}>
        <Reveal direction="zoom">
          <div className="relative overflow-hidden rounded-3xl border-2 border-dashed border-primary/30 bg-primary-soft/30 p-10 md:p-16">
            <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary-deep">
              <Sparkles className="h-4 w-4" />
              {data.empty.badge}
            </p>
            <h3 className="mt-8 max-w-2xl font-semibold text-3xl leading-snug text-foreground md:text-4xl">
              {data.empty.heading}
            </h3>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground/80">{data.empty.body}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <PillLink href={getLocalizedHref(locale, data.empty.primaryCta.href)} size="lg">
                {data.empty.primaryCta.label}
              </PillLink>
              <PillLink
                href={getLocalizedHref(locale, data.empty.secondaryCta.href)}
                variant="outline"
                size="lg"
              >
                {data.empty.secondaryCta.label}
              </PillLink>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section
        bg="surface"
        eyebrow={data.initiatives.eyebrow}
        title={data.initiatives.title}
        lede={data.initiatives.lede}
      >
        <div className="band-arc-top py-8 md:py-16 mx-auto mt-10 max-w-5xl space-y-16 lg:space-y-24">
          {data.initiatives.items.map((p: InitiativeProject, i: number) => (
            <Reveal 
              as="article" 
              key={p.slug} 
              direction="up" 
              delay={i === 0 ? 0 : 100}
              className="group grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-start lg:gap-16"
            >
              <div className="relative">
                <ArcFigure 
                  src={p.image} 
                  alt={p.alt || p.title} 
                  ratio="4/3" 
                  variant="soft" 
                  className="w-full shadow-sm transition-transform duration-500 group-hover:-translate-y-1" 
                />
                <div className="absolute top-4 start-4 rounded-full bg-background/95 px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
                  {p.period}
                </div>
              </div>
              
              <div className="flex flex-col pt-2">
                <p className="text-xs font-bold uppercase tracking-widest text-voice">{p.origin}</p>
                <h3 className="mt-4 text-2xl font-semibold leading-snug md:text-3xl">
                  <Link 
                    href={`/${locale}/programs/${p.slug}`} 
                    className="flex items-start gap-3 hover:text-voice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-surface rounded-sm transition-colors"
                  >
                    <span>{p.title}</span>
                  </Link>
                </h3>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">{p.summary}</p>
                
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-foreground/80">
                    <span className="flex items-center gap-2">
                      <History className="h-4 w-4 text-muted-foreground" />
                      {p.status}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {p.reach}
                    </span>
                  </div>
                  <Link
                    href={`/${locale}/programs/${p.slug}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm border border-border transition-colors hover:bg-voice hover:text-voice-foreground hover:border-voice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label={`Read more about ${p.title}`}
                  >
                    <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
