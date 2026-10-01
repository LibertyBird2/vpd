import type { SiteContent } from "@/types";
import { en } from "@/content/en";
import { ar } from "@/content/ar";

export type ContentLocale = "en" | "ar";

export const content: Record<ContentLocale, SiteContent> = { en, ar };

export const defaultLocale: ContentLocale = "en";

export function getLocalContent(locale: string): SiteContent {
  return content[(locale as ContentLocale) in content ? (locale as ContentLocale) : defaultLocale];
}
