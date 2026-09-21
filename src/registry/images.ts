import heroLeadership from "@/assets/hero-leadership.jpg";
import heroCollaboration from "@/assets/hero-collaboration.jpg";
import participation from "@/assets/participation.jpg";
import workshop from "@/assets/workshop.jpg";
import accessibilityTech from "@/assets/accessibility-tech.jpg";

import type { ImageName } from "@/data/types";
import type { StaticImageData } from "next/image";

/**
 * Shared application images.
 *
 * Content may reference these images by key.
 * Project-specific images can instead use a direct public path.
 */
export const images: Record<ImageName, StaticImageData> = {
  heroLeadership,
  heroCollaboration,
  participation,
  workshop,
  accessibilityTech,
};

/**
 * Resolve an image reference from content.
 *
 * Supports:
 * - Registry keys: "workshop"
 * - Legacy asset paths: "/images/projects/autism.webp"
 * - Absolute URLs
 */
export function getImage(source?: ImageName | string): StaticImageData | string {
  if (!source) {
    return images.workshop;
  }

  if (source in images) {
    return images[source as ImageName];
  }

  if (source.startsWith("/") || source.startsWith("http://") || source.startsWith("https://")) {
    return source;
  }

  return images.workshop;
}
