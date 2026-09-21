import Link from "next/link";
import { ArcFigure } from "./brand";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Voice, InitiativeProject, Insight } from "@/data/types";
import type { StaticImageData } from "next/image";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  asLink?: boolean;
}

export function Card({ children, className, href, asLink = false }: CardProps) {
  const baseClasses =
    "group flex h-full flex-col rounded-3xl border border-border bg-background transition-colors hover:border-voice";

  if (asLink && href) {
    return (
      <Link href={href} className={cn(baseClasses, "no-underline", className)}>
        {children}
      </Link>
    );
  }

  return <article className={cn(baseClasses, className)}>{children}</article>;
}

export function CardImage({ image, alt = "" }: { image?: string | StaticImageData; alt?: string }) {
  return (
    <div className="overlay-voice-3 relative overflow-hidden rounded-t-3xl">
      <ArcFigure src={image} alt={alt} ratio="4/5" className="w-full" variant="soft" />
    </div>
  );
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col p-6">{children}</div>;
}

export function CardEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs uppercase tracking-widest text-voice">{children}</p>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="mt-3 font-semibold text-2xl leading-snug text-foreground">{children}</h1>;
}

export function CardFooter({ children }: { children?: React.ReactNode }) {
  return (
    <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
      {children}
    </div>
  );
}

export interface VoiceCardProps {
  voice: Voice;
  className?: string;
}

export function VoiceCard({ voice, className }: VoiceCardProps) {
  return (
    <Card className={className}>
      <CardImage image={voice.image} />
      <CardContent>
        <CardEyebrow>
          {voice.author} — {voice.role}
        </CardEyebrow>
        <CardTitle>&quot;{voice.title}&quot;</CardTitle>
        <p className="mt-3 flex-1 text-sm text-muted-foreground">{voice.excerpt}</p>
        <p className="mt-6 text-xs text-muted-foreground">{voice.readingTime}</p>
      </CardContent>
    </Card>
  );
}

export interface ProjectCardProps {
  project: InitiativeProject;
  locale: string;
  className?: string;
}

export function ProjectCard({ project, locale, className }: ProjectCardProps) {
  return (
    <Card asLink href={`/${locale}/projects/${project.slug}`} className={className}>
      <CardImage image={project.image} />
      <CardContent>
        <CardEyebrow>{project.origin}</CardEyebrow>
        <CardTitle>{project.title}</CardTitle>
        <p className="mt-3 text-sm text-muted-foreground">{project.period}</p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">{project.summary}</p>
        <CardFooter>
          <span>{project.reach}</span>
          <ArrowUpRight className="h-4 w-4 text-voice transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export interface InsightCardProps {
  insight: Insight;
  locale: string;
  className?: string;
}

export function InsightCard({ insight, locale, className }: InsightCardProps) {
  return (
    <Card asLink href={`/${locale}/insights/${insight.slug}`} className={className}>
      <CardImage image={insight.image} />
      <div className="flex items-center gap-3 text-xs p-6 pb-0">
        <span className="rounded-full bg-secondary-soft px-2.5 py-1 font-medium text-voice">
          {insight.kind}
        </span>
        <span className="text-muted-foreground">{insight.read}</span>
      </div>
      <CardContent>
        <CardTitle>{insight.title}</CardTitle>
        <p className="mt-3 text-sm text-muted-foreground">{insight.date}</p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">{insight.excerpt}</p>
      </CardContent>
    </Card>
  );
}

export default Card;
