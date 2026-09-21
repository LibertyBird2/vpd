import { SiteLayout, PageHeader } from "@/components/site-layout";
import { getInsights } from "@/repositories/dataAccess";
import { Metadata } from "next";
import { InsightsFilter } from "@/components/insights-filter";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const insights = getInsights(locale);
  return {
    title: insights.seo.title,
    description: insights.seo.description,
    openGraph: {
      title: insights.seo.ogTitle ?? insights.seo.title,
      description: insights.seo.ogDescription ?? insights.seo.description,
    },
  };
}

export default async function Insights({ params }: Props) {
  const { locale } = await params;
  const data = getInsights(locale);

  return (
    <SiteLayout locale={locale}>
      <PageHeader eyebrow={data.header.eyebrow} title={data.header.title} lede={data.header.lede} />

      <InsightsFilter
        categories={data.categories}
        items={data.items}
        locale={locale}
        featuredLabel={data.featuredLabel}
        readFeaturedLabel={data.readFeaturedLabel}
      />
    </SiteLayout>
  );
}
