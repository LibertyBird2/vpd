import type { SiteContent } from "./types";
import { en } from "./en";
import { ar } from "./ar";

export type ContentLocale = "en" | "ar";

export const content: Record<ContentLocale, SiteContent> = { en, ar };

export const defaultLocale: ContentLocale = "en";

export function getContent(locale: string): SiteContent {
  return content[(locale as ContentLocale) in content ? (locale as ContentLocale) : defaultLocale];
}

export type * from "./types";
