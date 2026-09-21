import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteLayout, Section } from "@/components/site-layout";
import { getProjects } from "@/repositories/dataAccess";
import { ArrowLeft } from "lucide-react";
import { ArcFigure, Reveal } from "@/components/shared";
import { getImage } from "@/registry";
import { getLocalizedHref } from "@/lib/utils";
import type { InitiativeProject } from "@/data/types";
import { Metadata } from "next";
import { YouTubeEmbed } from "@/components/shared/videoPlayer";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const projects = getProjects(locale);
  return projects.initiatives.items.map((p: InitiativeProject) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = getProjects(locale);
  const project = data.initiatives.items.find((p: InitiativeProject) => p.slug === slug);

  if (!project) return { title: data.detail.seoSuffix, robots: "noindex" };

  return {
    title: `${project.title} — VPD`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function ProjectDetail({ params }: Props) {
  const { locale, slug } = await params;
  const data = getProjects(locale);
  const project = data.initiatives.items.find((p: InitiativeProject) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <SiteLayout locale={locale}>
      <section className="border-b border-border bg-surface">
        <div className="container-page py-14">
          <Reveal direction="up">
            <Link
              href={getLocalizedHref(locale, "/projects")}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground no-underline hover:text-voice"
            >
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              {data.detail.backLabel}
            </Link>
            <p className="eyebrow mt-8">{project.origin}</p>
            <h1 className="mt-4 max-w-3xl text-balance font-semibold text-4xl leading-[1.05] md:text-6xl">
              {project.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span>{project.period}</span>
              <span>{project.reach}</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 text-xs text-voice">
                {data.detail.disclaimer}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container-page py-16">
        <Reveal direction="zoom">
          <div className="overlay-voice-3 relative overflow-hidden rounded-3xl border border-border">
            <ArcFigure
              src={getImage(project.image || "workshop")}
              alt={project.title}
              ratio="1/1"
              className="aspect-[16/9] w-full"
              variant="arc"
            />
          </div>
        </Reveal>
      </div>

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <Reveal direction="up" className="space-y-6 text-lg leading-relaxed text-foreground/85">
            <p className="text-xl leading-relaxed text-foreground">{project.summary}</p>
            {(project.sections || data.detail.sections).map(
              (sec: { title: string; body: string }) => (
                <div key={sec.title}>
                  <h2 className="mt-10 font-semibold text-2xl text-foreground">{sec.title}</h2>
                  <p className="mt-4">{sec.body}</p>
                </div>
              ),
            )}
            <h2 className="mt-10 font-semibold text-2xl text-foreground">
              {data.detail.lessonsTitle}
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              {(project.lessons || data.detail.lessons).map((l: string, i: number) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
            {project.video && (
              <YouTubeEmbed title={`فيديو عن مشروع ${project.title}`} URL={project.video} />
            )}
          </Reveal>
          <Reveal direction="left" delay={120} className="space-y-6">
            <aside className="space-y-6">
              <div className="rounded-3xl border border-border bg-surface p-6">
                <p className="eyebrow">{data.detail.detailsLabel}</p>
                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground">{data.detail.labels.origin}</dt>
                    <dd className="mt-1 text-foreground">{project.origin}</dd>
                  </div>
                  {project.partner && (
                    <div>
                      <dt className="text-muted-foreground">{data.detail.labels.partner}</dt>
                      <dd className="mt-1 text-foreground">{project.partner}</dd>
                    </div>
                  )}
                  {project.funder && (
                    <div>
                      <dt className="text-muted-foreground">{data.detail.labels.funder}</dt>
                      <dd className="mt-1 text-foreground">{project.funder}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-muted-foreground">{data.detail.labels.period}</dt>
                    <dd className="mt-1 text-foreground">{project.period}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">{data.detail.labels.reach}</dt>
                    <dd className="mt-1 text-foreground">{project.reach}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">{data.detail.labels.status}</dt>
                    <dd className="mt-1 text-foreground">{project.status}</dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-3xl border border-border bg-secondary p-6 text-secondary-foreground">
                <p className="eyebrow !text-secondary-foreground/70">{data.detail.noteLabel}</p>
                <p className="mt-3 font-semibold text-lg leading-snug">{data.detail.note}</p>
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>
    </SiteLayout>
  );
}
