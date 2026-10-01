import { SiteLayout } from "@/components/site-layout";
import { getHomePage, getEvents, getInsights, getVoices } from "@/lib/repositories";
import { Metadata } from "next";
import {
  HeroSection,
  IntroSection,
  AreasOfWorkSection,
  ImpactAndAccessibilitySection,
  VoicesSection,
  KnowledgeSection,
  GetInvolvedSection,
} from "@/components/sections";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const home = getHomePage(locale);
  return {
    title: home.seo.title,
    description: home.seo.description,
    openGraph: {
      title: home.seo.ogTitle ?? home.seo.title,
      description: home.seo.ogDescription ?? home.seo.description,
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const home = getHomePage(locale);
  const events = getEvents(locale);
  const insights = getInsights(locale);
  const voices = getVoices(locale);

  return (
    <SiteLayout locale={locale}>
      <HeroSection home={home} locale={locale} />
      <IntroSection home={home} locale={locale} />
      <AreasOfWorkSection home={home} locale={locale} />
      <ImpactAndAccessibilitySection home={home} />
      <VoicesSection home={home} voices={voices} locale={locale} />
      <KnowledgeSection home={home} events={events} insights={insights} locale={locale} />
      <GetInvolvedSection home={home} locale={locale} />
    </SiteLayout>
  );
}
