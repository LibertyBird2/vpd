"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useContent } from "@/hooks/use-content";
import { BrandLogo } from "./brand-logo";
import { AccessibilityTrigger } from "./accessibility-panel";
import { LanguageSwitcher } from "./shared/language-switcher";
import { PillLink } from "./shared/pill";
import { BrandRule } from "./shared/brand";
import { usePathname } from "next/navigation";
import logoSvg from "@/assets/logo.svg";

export function SiteHeader({ locale }: { locale?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || "";
  const { site, ui } = useContent();

  useEffect(() => {
    const sentinel = document.getElementById("header-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { rootMargin: "-8px 0px 0px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        id="header-sentinel"
        className="absolute top-0 h-2 w-full pointer-events-none opacity-0"
        aria-hidden="true"
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:z-[100] focus:rounded-md focus:bg-voice focus:px-4 focus:py-2 focus:text-voice-foreground ltr:focus:left-3 rtl:focus:right-3"
      >
        {ui.actions.skipToContent}
      </a>
      <BrandRule className="sticky top-0 z-50" />
      <header
        className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? "border-border bg-background/95 lg:bg-background/90 shadow-soft lg:backdrop-blur"
            : "border-transparent bg-background"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-1 no-underline text-foreground"
          >
            <BrandLogo logo={logoSvg} />
            <span className="hidden md:flex flex-col leading-none">
              <span className="text-md text-primary-deep font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {site.name}
              </span>
              <span className="text-sm text-voice font-semibold tracking-tight">
                {site.title || site.fullName}
              </span>
            </span>
          </Link>

          <nav aria-label={ui.nav.primary} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {ui.navigation.map((n) => {
                const isActive =
                  pathname.endsWith(n.href) || (n.href === "/" && pathname.length <= 4);
                return (
                  <li key={n.href}>
                    <Link
                      href={`/${locale}${n.href}`}
                      className={`arc-underline rounded-full px-3.5 py-2.5 text-sm font-medium text-foreground no-underline transition-colors hover:text-primary-deep ${isActive ? "text-voice" : ""}`}
                      data-active={isActive ? "true" : undefined}
                    >
                      {n.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <AccessibilityTrigger />
            <PillLink href={`/${locale}/get-involved`} className="hidden md:inline-flex">
              {ui.actions.getInvolved}
            </PillLink>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
              aria-label={open ? ui.actions.closeMenu : ui.actions.openMenu}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div id="mobile-navigation" className="border-t border-border bg-background lg:hidden">
            <nav aria-label={ui.nav.mobile} className="container-page py-4">
              <ul className="grid gap-1">
                {ui.navigation.map((n) => {
                  const isActive =
                    pathname.endsWith(n.href) || (n.href === "/" && pathname.length <= 4);
                  return (
                    <li key={n.href}>
                      <Link
                        href={`/${locale}${n.href}`}
                        onClick={() => setOpen(false)}
                        className={`block rounded-[var(--arc-sm)] border-s-2 px-4 py-3.5 text-base font-medium text-foreground no-underline transition-colors hover:border-primary hover:bg-primary-soft/60 ${isActive ? "border-voice bg-secondary-soft text-voice" : "border-transparent"}`}
                        data-active={isActive ? "true" : undefined}
                      >
                        {n.label}
                      </Link>
                    </li>
                  );
                })}
                <li className="pt-2">
                  <PillLink
                    href={`/${locale}/get-involved`}
                    onClick={() => setOpen(false)}
                    className="w-full justify-center px-4 py-3"
                  >
                    {ui.actions.getInvolved}
                  </PillLink>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
      <span className="sr-only">{site.fullName}</span>
    </>
  );
}
