/**
 * Shared, cross-page components barrel.
 *
 *   import { WaveMark, AccessibilityPanel } from "@/components/shared";
 */

export { AccessibilityTrigger } from "@/components/accessibility-panel";
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
