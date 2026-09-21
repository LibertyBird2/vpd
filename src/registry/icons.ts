import {
  Scale,
  Accessibility,
  Users,
  BookOpen,
  HandHeart,
  Building2,
  Calendar,
  Landmark,
  MapPin,
  ShieldCheck,
  FileText,
  Handshake,
  HeartHandshake,
  Mail,
  Quote,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/data/types";

/** Presentation-layer mapping: content references icons by name only. */
export const icons: Record<IconName, LucideIcon> = {
  scale: Scale,
  accessibility: Accessibility,
  users: Users,
  bookOpen: BookOpen,
  handHeart: HandHeart,
  building2: Building2,
  calendar: Calendar,
  landmark: Landmark,
  mapPin: MapPin,
  shieldCheck: ShieldCheck,
  fileText: FileText,
  handshake: Handshake,
  heartHandshake: HeartHandshake,
  mail: Mail,
  quote: Quote,
  sparkles: Sparkles,
};

export const getIcon = (name: IconName): LucideIcon => icons[name] || Sparkles;
