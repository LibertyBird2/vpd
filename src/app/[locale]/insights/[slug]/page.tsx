import { notFound } from "next/navigation";
import { SiteLayout, Section, PageHeader } from "@/components/site-layout";
import { getInsights } from "@/repositories/dataAccess";
import { Reveal } from "@/components/shared";
import type { Insight } from "@/data/types";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const insights = getInsights(locale);
  return insights.items.map((e: Insight) => ({
    slug: e.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = getInsights(locale);
  const insight = data.items.find((e: Insight) => e.slug === slug);

  if (!insight) return { title: "Insight — VPD", robots: "noindex" };

  return {
    title: `${insight.title} — VPD Insights`,
    description: insight.excerpt,
    openGraph: {
      title: insight.title,
      description: insight.excerpt,
    },
  };
}

export default async function InsightDetail({ params }: Props) {
  const { locale, slug } = await params;
  const data = getInsights(locale);
  const insight = data.items.find((e: Insight) => e.slug === slug);

  if (!insight) {
    notFound();
  }

  return (
    <SiteLayout locale={locale}>
      <PageHeader eyebrow={`${insight.kind} · ${insight.read}`} title={insight.title} />

      <Section>
        <div className="max-w-3xl">
          <Reveal direction="up">
            <article className="space-y-6 text-lg leading-relaxed text-foreground/85">
              <p className="text-xl font-medium text-foreground">{insight.excerpt}</p>
              {insight.sections?.map((sec: { title: string; body: string }) => (
                <div key={sec.title}>
                  <h2 className="mt-10 font-semibold text-2xl text-foreground">{sec.title}</h2>
                  <p className="mt-4 leading-relaxed">{sec.body}</p>
                </div>
              ))}
            </article>
          </Reveal>
        </div>
      </Section>
    </SiteLayout>
  );
}
