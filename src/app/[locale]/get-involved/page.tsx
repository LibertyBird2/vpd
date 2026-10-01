import React from "react";
import { SiteLayout, PageHeader, Section } from "@/components/site-layout";
import { PillButton, PillLink, Reveal } from "@/components/shared";
import { getGetInvolvedPage, getSite } from "@/lib/repositories";
import { Mail, MapPin, ChevronDown } from "lucide-react";
import { ArcFigure } from "@/components/shared";
import { getImage, getIcon } from "@/registry";
import { cn } from "@/lib/utils";
import type { WayToHelp } from "@/types";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const data = getGetInvolvedPage(locale);
  return {
    title: data.seo.title,
    description: data.seo.description,
    openGraph: {
      title: data.seo.ogTitle ?? data.seo.title,
      description: data.seo.ogDescription ?? data.seo.description,
    },
  };
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-voice focus:outline-none";

export default async function GetInvolved({ params }: Props) {
  const { locale } = await params;
  const data = getGetInvolvedPage(locale);
  const site = getSite(locale);

  return (
    <SiteLayout locale={locale}>
      <PageHeader eyebrow={data.header.eyebrow} title={data.header.title} lede={data.header.lede} />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {data.ways.map((w: WayToHelp, i: number) => (
            <Reveal key={w.key} direction="up" delay={i * 90} className="h-full">
              <EngagementCard
                icon={getIcon(w.icon)}
                title={w.title}
                body={w.body}
                fields={w.fields}
                cta={w.cta}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="contact" bg="surface" eyebrow={data.contact.eyebrow} title={data.contact.title}>
        <div className="grid gap-10 rounded-3xl border border-border bg-background p-8 md:p-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal direction="right">
            <form className="grid gap-6">
              <Field label={data.contact.form.name} required>
                <input name="name" className={inputClass} />
              </Field>
              <Field label={data.contact.form.email} required>
                <input type="email" name="email" className={inputClass} />
              </Field>
              <Field label={data.contact.form.topic} required>
                <div className="relative">
                  <select name="topic" className={cn(inputClass, "appearance-none pr-10 rtl:pr-4 rtl:pl-10")}>
                    <option value="" disabled selected className="text-muted-foreground">Select...</option>
                    {data.contact.form.topics.map((t: string) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none rtl:left-3 rtl:right-auto" />
                </div>
              </Field>
              <Field label={data.contact.form.message} required>
                <textarea name="message" rows={5} className={cn(inputClass, "resize-none")} />
              </Field>
              <Field label={data.contact.form.accessNeeds}>
                <input
                  name="accessNeeds"
                  placeholder={data.contact.form.accessNeedsPlaceholder}
                  className={inputClass}
                />
              </Field>
              <PillButton type="submit" size="lg" className="mt-2 w-full sm:w-fit">
                {data.contact.form.submit}
              </PillButton>
            </form>
          </Reveal>
          <Reveal direction="left" delay={120} className="space-y-8">
            <aside className="space-y-8">
              <div className="relative overflow-hidden rounded-2xl bg-secondary-soft">
                <ArcFigure
                  src={getImage("accessibilityTech")}
                  alt={data.contact.imageAlt}
                  ratio="4/3"
                  variant="soft"
                  className="w-full"
                />
              </div>
              <ul className="space-y-5 text-sm">
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 rounded-full bg-secondary-soft p-2 text-voice">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">{data.contact.details.emailLabel}</p>
                    <p className="font-medium text-foreground">{site.email}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 rounded-full bg-secondary-soft p-2 text-voice">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">{data.contact.details.basedLabel}</p>
                    <p className="font-medium text-foreground">{site.cities}</p>
                  </div>
                </li>
              </ul>
              <p className="rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted-foreground">
                {data.contact.note}
              </p>
            </aside>
          </Reveal>
        </div>
      </Section>
    </SiteLayout>
  );
}

function EngagementCard({
  icon: Icon,
  title,
  body,
  fields,
  cta,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  body: string;
  fields: string[];
  cta: string;
}) {
  return (
    <div className="flex flex-col h-full rounded-3xl border border-border bg-surface p-8 transition-colors hover:border-voice">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary-soft text-voice mb-6">
        {Icon && <Icon className="h-6 w-6" aria-hidden />}
      </div>
      <h2 className="font-semibold text-2xl text-foreground mb-3">{title}</h2>
      <p className="text-sm leading-relaxed text-muted-foreground flex-1">{body}</p>
      
      {fields && fields.length > 0 && (
        <ul className="mt-6 mb-8 space-y-3 border-t border-border/60 pt-6 text-sm text-foreground/80">
          {fields.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span className="text-voice/60" aria-hidden>—</span> {f}
            </li>
          ))}
        </ul>
      )}
      
      <PillLink href="#contact" variant="outline" className="w-full justify-center">
        {cta}
      </PillLink>
    </div>
  );
}

function Field({ label, id, required, children }: { label: string; id?: string; required?: boolean; children: React.ReactNode }) {
  const fieldId = id || `field-${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
  return (
    <div className="grid gap-2 text-sm">
      <label htmlFor={fieldId} className="text-foreground font-medium">
        {label} {required && <span className="text-voice ml-1 rtl:mr-1 rtl:ml-0" aria-hidden="true">*</span>}
      </label>
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<{ id?: string, required?: boolean }>, {
            id: (children.props as { id?: string }).id || fieldId,
            required: required ? true : undefined,
          })
        : children}
    </div>
  );
}
