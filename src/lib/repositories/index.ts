import { getLocalContent } from "@/lib/data/local/provider";

export function getHomePage(locale: string) {
  return getLocalContent(locale).home;
}

export function getAboutPage(locale: string) {
  return getLocalContent(locale).about;
}

export function getPrograms(locale: string) {
  return getLocalContent(locale).home.whatWeDo;
}

export function getProjects(locale: string) {
  return getLocalContent(locale).projects;
}

export function getInsights(locale: string) {
  return getLocalContent(locale).insights;
}

export function getEvents(locale: string) {
  return getLocalContent(locale).events;
}

export function getVoices(locale: string) {
  return getLocalContent(locale).voices;
}

export function getSite(locale: string) {
  return getLocalContent(locale).site;
}

export function getNavigation(locale: string) {
  return getLocalContent(locale).ui.navigation;
}

export function getGetInvolvedPage(locale: string) {
  return getLocalContent(locale).getInvolved;
}

export function getAccessibilityStatementPage(locale: string) {
  return getLocalContent(locale).accessibility;
}
