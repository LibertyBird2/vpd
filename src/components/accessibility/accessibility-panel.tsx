"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useContent } from "@/hooks/use-content";
import { useAccessibility } from "./accessibility-provider";
import { Contrast, Type, MousePointer2, BookOpen, Focus, RotateCcw, Maximize, AlignLeft, Search } from "lucide-react";

export function AccessibilityPanel({ onClose }: { onClose: () => void }) {
  const { ui } = useContent();
  const { settings, updateSettings, resetSettings } = useAccessibility();
  const panelRef = useRef<HTMLDivElement>(null);
  
  // Basic translation fallbacks if missing in UI
  const t = ui.accessibility || {
    dialogLabel: "Accessibility Settings",
    eyebrow: "Display Preferences",
    title: "Accessibility",
    subtitle: "Saved automatically to your device.",
    close: "Close",
    appearance: "Appearance",
    textSize: "Text Size",
    contrast: "Contrast",
    highContrast: "High Contrast",
    motionAndFocus: "Motion and Focus",
    reducedMotion: "Reduce Motion",
    focusEnhance: "Enhanced Focus",
    reading: "Reading",
    readingMode: "Reading Mode",
    reset: "Reset Settings",
    done: "Done"
  };

  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    
    // Focus first interactive element
    const focusable = panelRef.current?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement;
    if (focusable) focusable.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={t.dialogLabel}
    >
      <div
        className="fixed inset-0 bg-foreground/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div 
        ref={panelRef}
        className="relative flex h-full w-full max-w-md flex-col overflow-hidden border-s border-border bg-surface-elevated shadow-2xl z-10 animate-in slide-in-from-end duration-200"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 className="mt-1 font-semibold text-2xl text-foreground">
              {t.title}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">{t.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary-soft hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voice"
          >
            {t.close}
          </button>
        </div>

        <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
          <Group label={t.appearance}>
            <div role="radiogroup" className="flex items-center gap-2 rounded-2xl border border-border p-2">
               {(["light", "dark", "system"] as const).map(mode => (
                 <button
                   key={mode}
                   role="radio"
                   aria-checked={settings.appearance === mode}
                   onClick={() => updateSettings({ appearance: mode })}
                   className={`flex-1 rounded-xl py-2 px-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voice ${
                     settings.appearance === mode 
                       ? "bg-voice text-voice-foreground"
                       : "hover:bg-secondary-soft text-foreground"
                   }`}
                 >
                   {mode === "light" ? t.light : mode === "dark" ? t.dark : t.system}
                 </button>
               ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground" aria-hidden="true">{t.appearanceHint}</p>
          </Group>

          <Group label={t.textSize}>
            <div role="radiogroup" className="flex items-center gap-2 rounded-2xl border border-border p-2">
               {(["default", "large", "largest"] as const).map(size => (
                 <button
                   key={size}
                   role="radio"
                   aria-checked={settings.textSize === size}
                   onClick={() => updateSettings({ textSize: size })}
                   className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voice ${
                     settings.textSize === size 
                       ? "bg-voice text-voice-foreground"
                       : "hover:bg-secondary-soft text-foreground"
                   }`}
                 >
                   {size.charAt(0).toUpperCase() + size.slice(1)}
                 </button>
               ))}
            </div>
          </Group>

          <Group label="Display">
            <Toggle
              icon={Contrast}
              label={t.highContrast}
              on={settings.highContrast}
              onChange={(v) => updateSettings({ highContrast: v })}
            />
            <Toggle
              icon={BookOpen}
              label={t.readingMode}
              on={settings.readingMode}
              onChange={(v) => updateSettings({ readingMode: v })}
            />
          </Group>

          <Group label="Reading Preferences">
            <Toggle
              icon={Maximize}
              label="Text Spacing"
              on={settings.textSpacing}
              onChange={(v) => updateSettings({ textSpacing: v })}
            />
            <Toggle
              icon={AlignLeft}
              label="Line Spacing"
              on={settings.lineSpacing}
              onChange={(v) => updateSettings({ lineSpacing: v })}
            />
          </Group>

          <Group label={t.motionAndFocus}>
            <Toggle
              icon={MousePointer2}
              label={t.reducedMotion}
              on={settings.reduceMotion}
              onChange={(v) => updateSettings({ reduceMotion: v })}
            />
            <Toggle
              icon={Focus}
              label={t.focusEnhance}
              on={settings.enhancedFocus}
              onChange={(v) => updateSettings({ enhancedFocus: v })}
            />
          </Group>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4 bg-surface/50">
          <button
            type="button"
            onClick={resetSettings}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary-soft hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voice"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {t.reset}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-voice px-5 py-2 text-sm font-semibold text-voice-foreground shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voice focus-visible:ring-offset-2"
          >
            {t.done}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section aria-label={label}>
      <h3 className="mb-3 text-sm font-semibold text-foreground">{label}</h3>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Toggle({
  icon: Icon,
  label,
  on,
  onChange,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`group flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voice ${
        on
          ? "border-voice/40 bg-voice/5 hover:bg-voice/10"
          : "border-border bg-background hover:bg-secondary-soft"
      }`}
    >
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl transition-colors ${
          on ? "bg-voice text-voice-foreground shadow-xs" : "bg-muted text-muted-foreground group-hover:text-foreground"
        }`}
      >
        <Icon className="h-4.5 w-4.5" />
      </span>
      <span className="flex-1 text-sm font-semibold text-foreground">{label}</span>
      <span
        dir="ltr"
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
          on ? "bg-voice" : "bg-muted-foreground/30"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
            on ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}
