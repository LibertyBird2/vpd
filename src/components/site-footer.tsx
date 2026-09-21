"use client";

import Link from "next/link";
import { useContent } from "@/hooks/use-content";
import type { CtaLink } from "@/data/types";
import { BrandRule } from "./shared/brand";
import { BrandLogo } from "./brand-logo";
import { getLocalizedHref } from "@/lib/utils";
import logoWhiteSvg from "@/assets/logo-white.svg";

export function SiteFooter({ locale }: { locale?: string }) {
  const { site, ui } = useContent();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 band-arc-top md:mt-20 arc-field bg-voice text-voice-foreground">
      <BrandRule />
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <BrandLogo logo={logoWhiteSvg} />
            <p className="mt-6 text-sm leading-relaxed text-voice-foreground/85">
              {site.description}
            </p>
            <p className="mt-4 text-xs text-voice-foreground/60">{site.stage}</p>
          </div>

          {ui.footer.columns.map((col) => (
            <FooterCol key={col.title} title={col.title} links={col.links} locale={locale} />
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-voice-foreground/20 pt-8 text-xs text-voice-foreground/70 md:flex-row md:items-center md:justify-between">
          <p>{`© ${year} VPD — ${site.title}.`}</p>
          <p className="flex flex-wrap gap-x-6 gap-y-1">
            <span>{site.cities}</span>
            <span>{site.email}</span>
            <span>{ui.footer.accessibilityStatement}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, locale }: { title: string; links: CtaLink[]; locale?: string }) {
  return (
    <div>
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-voice-foreground/60">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l, i) => (
          <li key={`${l.href}-${i}`}>
            <Link
              href={getLocalizedHref(locale, l.href)}
              className="inline-block border-b border-transparent text-voice-foreground/90 no-underline transition-colors hover:border-current hover:text-voice-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
