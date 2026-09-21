import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { Reveal } from "./shared";

export function SiteLayout({ children, locale }: { children: ReactNode; locale: string }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader locale={locale} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden band-arc-bottom arc-field border-b border-border bg-primary-soft">
      <div className="container-page py-16 md:py-24">
        <Reveal direction="up" className="arc-accent">
          {eyebrow && (
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-voice">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            {title}
          </h1>
          {lede && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {lede}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  bg = "default",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lede?: string;
  children?: ReactNode;
  bg?: "default" | "surface" | "voice";
}) {
  const bgCls =
    bg === "surface"
      ? "bg-surface"
      : bg === "voice"
        ? "bg-secondary text-secondary-foreground"
        : "";
  return (
    <section id={id} className={`py-20 md:py-28 ${bgCls}`}>
      <div className="container-page">
        {(eyebrow || title || lede) && (
          <Reveal direction="up" className="arc-accent mb-14 max-w-3xl">
            {eyebrow && (
              <p className={`eyebrow ${bg === "voice" ? "!text-secondary-foreground/70" : ""}`}>
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.12] tracking-tight md:text-[2.75rem]">
                {title}
              </h2>
            )}
            {lede && (
              <p
                className={`mt-5 text-lg leading-relaxed md:text-xl ${
                  bg === "voice" ? "text-secondary-foreground/85" : "text-muted-foreground"
                }`}
              >
                {lede}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
