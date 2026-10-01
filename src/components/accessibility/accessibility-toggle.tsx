"use client";

import { useState } from "react";
import { Accessibility } from "lucide-react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const DynamicAccessibilityPanel = dynamic(
  () => import("./accessibility-panel").then((m) => m.AccessibilityPanel),
  { ssr: false }
);

export function AccessibilityToggle() {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const isAr = params?.locale === "ar";
  const label = isAr ? "إعدادات إمكانية الوصول" : "Open accessibility settings";

  return (
    <>
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls="accessibility-panel"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary-soft hover:text-voice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voice"
      >
        <Accessibility className="h-5 w-5" aria-hidden="true" />
      </button>

      {open && <DynamicAccessibilityPanel onClose={() => setOpen(false)} />}
    </>
  );
}
