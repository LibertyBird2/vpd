/**
 * Layout components barrel.
 *
 * The concrete implementations still live at `src/components/*` while the
 * codebase migrates to the new structure. Import from here in new code:
 *
 *   import { SiteHeader, SiteFooter, SiteLayout } from "@/components/layout";
 */

export { SiteHeader } from "@/components/site-header";
export { SiteFooter } from "@/components/site-footer";
export { SiteLayout, PageHeader, Section } from "@/components/site-layout";
