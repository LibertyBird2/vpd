import React from "react";
import { SiteLayout, PageHeader, Section } from "@/components/site-layout";
import { PillButton, PillLink, Reveal } from "@/components/shared";
import { getGetInvolvedPage, getSite } from "@/repositories/dataAccess";
import { Mail, MapPin } from "lucide-react";
import { ArcFigure } from "@/components/shared";
import { getImage, getIcon } from "@/registry";
import type { WayToHelp } from "@/data/types";
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
        <div className="grid gap-6 md:grid-cols-3">
          {data.ways.map((w: WayToHelp, i: number) => (
            <Reveal key={w.key} direction="up" delay={i * 90}>
              <Card
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

      <Section bg="surface" eyebrow={data.contact.eyebrow} title={data.contact.title}>
        <div className="grid gap-10 rounded-3xl border border-border bg-background p-8 md:p-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal direction="right">
            <form className="grid gap-5">
              <Field label={data.contact.form.name}>
                <input name="name" className={inputClass} />
              </Field>
              <Field label={data.contact.form.email}>
                <input type="email" name="email" className={inputClass} />
              </Field>
              <Field label={data.contact.form.topic}>
                <select name="topic" className={inputClass}>
                  {data.contact.form.topics.map((t: string) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field label={data.contact.form.message}>
                <textarea name="message" rows={5} className={`${inputClass} resize-none`} />
              </Field>
              <Field label={data.contact.form.accessNeeds}>
                <input
                  name="accessNeeds"
                  placeholder={data.contact.form.accessNeedsPlaceholder}
                  className={inputClass}
                />
              </Field>
              <PillButton type="submit" size="lg" className="mt-2 w-fit">
                {data.contact.form.submit}
              </PillButton>
            </form>
          </Reveal>
          <Reveal direction="left" delay={120} className="space-y-6">
            <aside className="space-y-6">
              <div className="overlay-voice-3 relative overflow-hidden rounded-2xl">
                <ArcFigure
                  src={getImage("accessibilityTech")}
                  alt={data.contact.imageAlt}
                  ratio="4/3"
                  variant="arc"
                />
              </div>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-voice" />
                  <div>
                    <p className="text-muted-foreground">{data.contact.details.emailLabel}</p>
                    <p className="text-foreground">{site.email}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-voice" />
                  <div>
                    <p className="text-muted-foreground">{data.contact.details.basedLabel}</p>
                    <p className="text-foreground">{site.cities}</p>
                  </div>
                </li>
              </ul>
              <p className="rounded-2xl border border-border bg-surface p-4 text-xs text-muted-foreground">
                {data.contact.note}
              </p>
            </aside>
          </Reveal>
        </div>
      </Section>
    </SiteLayout>
  );
}

function Card({
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
    <div className="flex h-full flex-col rounded-3xl border border-border bg-background p-8">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary-soft text-voice">
        {Icon && <Icon className="h-5 w-5" aria-hidden />}
      </div>
      <h1 className="mt-5 font-semibold text-2xl">{title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
      <ul className="mt-6 mb-6 space-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
        {fields.map((f) => (
          <li key={f}>· {f}</li>
        ))}
      </ul>
      <PillLink href="" size="xl">
        {cta}
      </PillLink>
    </div>
  );
}

function Field({ label, id, children }: { label: string; id?: string; children: React.ReactNode }) {
  const fieldId = id || `field-${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
  return (
    <div className="grid gap-2 text-sm">
      <label htmlFor={fieldId} className="text-foreground">
        {label}
      </label>
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<{ id?: string }>, {
            id: (children.props as { id?: string }).id || fieldId,
          })
        : children}
    </div>
  );
}
