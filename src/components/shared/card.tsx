import Link from "next/link";
import { ArcFigure } from "./brand";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Voice, InitiativeProject, Insight } from "@/types";
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
    <Card className={cn("overflow-hidden group flex flex-col h-full", className)}>
      {!!voice.image && (
        <div className="relative overflow-hidden rounded-t-3xl bg-secondary-soft">
          <ArcFigure 
            src={voice.image} 
            alt={voice.author} 
            ratio="4/3" 
            className="w-full transition-transform duration-700 ease-out group-hover:scale-105" 
            variant="soft" 
          />
        </div>
      )}
      <CardContent>
        <div className="flex flex-col gap-1 mb-6 pb-5 border-b border-border/50">
          <h2 className="font-semibold text-lg text-foreground">{voice.author}</h2>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">{voice.role}</span>
        </div>
        <blockquote className="font-semibold text-xl leading-snug text-foreground group-hover:text-voice transition-colors mb-4">
          &quot;{voice.title}&quot;
        </blockquote>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{voice.excerpt}</p>
        
        {!!voice.readingTime && (
          <p className="mt-8 text-xs font-medium uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
            {voice.readingTime}
          </p>
        )}
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
  readLabel?: string;
  className?: string;
}

export function InsightCard({ insight, locale, readLabel, className }: InsightCardProps) {
  return (
    <Card asLink href={`/${locale}/insights/${insight.slug}`} className={cn("p-6 sm:p-8", className)}>
      {!!insight.image && <CardImage image={insight.image} />}
      <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
        <span className="rounded-full bg-secondary-soft px-3 py-1 font-semibold text-voice uppercase tracking-widest">
          {insight.kind}
        </span>
        {!!insight.read && <span className="text-muted-foreground uppercase tracking-widest">{insight.read}</span>}
      </div>
      <h3 className="font-semibold text-2xl leading-snug text-foreground group-hover:text-voice transition-colors">{insight.title}</h3>
      {!!insight.date && <p className="mt-2 text-sm text-muted-foreground">{insight.date}</p>}
      <p className="mt-4 text-base leading-relaxed text-muted-foreground flex-1">{insight.excerpt}</p>
      
      {!!readLabel && (
        <div className="mt-8 flex items-center text-sm font-semibold text-voice group-hover:text-primary-deep transition-colors">
          {readLabel}
          <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:mr-1.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
        </div>
      )}
    </Card>
  );
}

export default Card;
