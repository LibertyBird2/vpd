import React from "react";
import { SiteLayout, PageHeader, Section } from "@/components/site-layout";
import { PillLink, Reveal } from "@/components/shared";
import { getAccessibilityStatementPage } from "@/lib/repositories";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const data = getAccessibilityStatementPage(locale);
  return {
    title: data.seo.title,
    description: data.seo.description,
  };
}

export default async function AccessibilityStatement({ params }: Props) {
  const { locale } = await params;
  const data = getAccessibilityStatementPage(locale);

  return (
    <SiteLayout locale={locale}>
      <PageHeader
        eyebrow={data.header.eyebrow}
        title={data.header.title}
        lede={data.header.lede}
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-16">
          <Reveal direction="up" delay={50} className="space-y-12">
            {data.sections.map((section, i) => (
              <section key={i} className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
                <p className="leading-relaxed text-muted-foreground">{section.body}</p>
              </section>
            ))}

            <section className="space-y-4 rounded-3xl border border-border bg-surface p-8 md:p-10">
              <h2 className="text-xl font-semibold text-foreground">{data.limitations.title}</h2>
              <ul className="space-y-3 pt-2 text-muted-foreground">
                {data.limitations.items.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-voice" aria-hidden="true">
                      —
                    </span>
                    <span className="flex-1 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal direction="up" delay={100}>
            <section className="space-y-6 border-t border-border pt-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">{data.reporting.title}</h2>
                <p className="leading-relaxed text-muted-foreground">{data.reporting.lede}</p>
              </div>
              <PillLink href={data.reporting.cta.href} size="lg">
                {data.reporting.cta.label}
              </PillLink>
            </section>
          </Reveal>
        </div>
      </Section>
    </SiteLayout>
  );
}
