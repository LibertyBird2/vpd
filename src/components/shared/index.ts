/**
 * Shared, cross-page components barrel.
 *
 *   import { AccessibilityTrigger } from "@/components/shared";
 */

export { AccessibilityToggle as AccessibilityTrigger } from "@/components/accessibility";
export { PillLink, PillButton, pillClass } from "./pill";
export { Reveal } from "./reveal";
export type { PillVariant, PillSize } from "./pill";
export { BrandRule, SectionHeading, ArcFigure, IconBadge, ArcNumber } from "./brand";
export type { BrandTone, ArcVariant, ArcRatio } from "./brand";
export {
  Card,
  VoiceCard,
  ProjectCard,
  CardImage,
  CardContent,
  CardEyebrow,
  CardTitle,
  CardFooter,
} from "./card";
export type { CardProps, VoiceCardProps, ProjectCardProps } from "./card";
