import { SiteLayout, PageHeader, Section } from "@/components/site-layout";
import { PillLink, ProjectCard, Reveal } from "@/components/shared";
import { getProjects } from "@/repositories/dataAccess";
import { Sparkles } from "lucide-react";
import { getLocalizedHref } from "@/lib/utils";
import type { InitiativeProject } from "@/data/types";
import { Metadata } from "next";

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

export default async function Projects({ params }: Props) {
  const { locale } = await params;
  const data = getProjects(locale);

  return (
    <SiteLayout locale={locale}>
      <PageHeader eyebrow={data.header.eyebrow} title={data.header.title} lede={data.header.lede} />

      <Section eyebrow={data.empty.eyebrow} title={data.empty.title}>
        <Reveal direction="zoom">
          <div className="rounded-3xl border border-dashed border-border-strong bg-surface p-10 md:p-14">
            <p className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              {data.empty.badge}
            </p>
            <h3 className="mt-6 max-w-2xl font-semibold text-3xl leading-snug md:text-4xl">
              {data.empty.heading}
            </h3>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{data.empty.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PillLink href={getLocalizedHref(locale, data.empty.primaryCta.href)}>
                {data.empty.primaryCta.label}
              </PillLink>
              <PillLink
                href={getLocalizedHref(locale, data.empty.secondaryCta.href)}
                variant="outline"
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
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.initiatives.items.map((p: InitiativeProject, i: number) => (
            <Reveal as="li" key={p.slug} direction="up" delay={(i % 3) * 80}>
              <ProjectCard project={p} locale={locale} />
            </Reveal>
          ))}
        </ul>
      </Section>
    </SiteLayout>
  );
}
