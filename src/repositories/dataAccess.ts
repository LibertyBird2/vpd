import { getContent } from "@/data";
import type { SiteContent } from "@/data/types";

// Lightweight data access abstraction
export function getPageData(locale: string): SiteContent {
  return getContent(locale);
}

export function getHomePage(locale: string) {
  return getPageData(locale).home;
}

export function getAboutPage(locale: string) {
  return getPageData(locale).about;
}

export function getPrograms(locale: string) {
  return getPageData(locale).home.whatWeDo; // or appropriate data structure
}

export function getProjects(locale: string) {
  return getPageData(locale).projects;
}

export function getInsights(locale: string) {
  return getPageData(locale).insights;
}

export function getEvents(locale: string) {
  return getPageData(locale).events;
}

export function getVoices(locale: string) {
  return getPageData(locale).voices;
}

export function getSite(locale: string) {
  return getPageData(locale).site;
}

export function getNavigation(locale: string) {
  return getPageData(locale).navigation;
}

export function getGetInvolvedPage(locale: string) {
  return getPageData(locale).getInvolved;
}
