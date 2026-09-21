"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "next/navigation";
import { useContent } from "@/hooks/use-content";
import {
  Sun,
  Moon,
  Monitor,
  Contrast,
  Type,
  MousePointer2,
  BookOpen,
  Focus,
  RotateCcw,
  Minus,
  Plus,
} from "lucide-react";
import type { Prefs, Theme } from "./accessibility-panel";

const DEFAULTS: Prefs = {
  theme: "system",
  hc: false,
  fontScale: 1,
  reduceMotion: false,
  reading: false,
  focusEnhance: false,
};
const LABELS = {
  en: {},
  ar: {
    dialogLabel: "إعدادات إمكانية الوصول",
    eyebrow: "تفضيلات العرض",
    title: "إمكانية الوصول",
    subtitle: "تُحفظ خياراتك على هذا الجهاز تلقائياً.",
    close: "إغلاق",
    appearance: "المظهر",
    appearanceHint: "طابق النظام أو اختر المظهر المناسب.",
    light: "فاتح",
    dark: "داكن",
    system: "النظام",
    contrast: "التباين",
    contrastHint: "تعزيز تباين النصوص والحدود.",
    highContrast: "تباين عالٍ",
    highContrastDesc: "يزيد التباين في جميع عناصر الواجهة.",
    textSize: "حجم الخط",
    textSizeHint: "تكبير أو تصغير نصوص الصفحة.",
    decreaseText: "تصغير حجم الخط",
    increaseText: "تكبير حجم الخط",
    motionAndFocus: "الحركة والتركيز",
    reducedMotion: "تقليل الحركة",
    reducedMotionDesc: "تقليل التأثيرات المتحركة غير الضرورية.",
    focusEnhance: "إبراز مؤشر التركيز",
    focusEnhanceDesc: "إظهار إطار تركيز أوضح على كافة العناصر.",
    reading: "القراءة",
    readingMode: "وضع القراءة",
    readingModeDesc: "تقليل عرض المحتوى وزيادة ارتفاع الأسطر لسهولة القراءة.",
    reset: "إعادة ضبط",
    done: "تم",
  },
} as const;

export function PanelModal({
  prefs,
  save,
  onClose,
}: {
  prefs: Prefs;
  save: (p: Prefs) => void;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const { ui } = useContent();

  useEffect(() => {
    setMounted(true);
    // Lock body scroll when modal is open
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const update = (p: Partial<Prefs>) => save({ ...prefs, ...p });
  const fontScale =
    typeof prefs.fontScale === "number" && !isNaN(prefs.fontScale) ? prefs.fontScale : 1;

  const handleScaleChange = (val: number) => {
    const rounded = Number(val.toFixed(2));
    save({ ...prefs, fontScale: rounded });
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={ui.accessibility.dialogLabel}
    >
      <div
        className="fixed inset-0 bg-foreground/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative flex h-full w-full max-w-md flex-col overflow-hidden border-s border-border bg-surface-elevated shadow-2xl z-10 animate-in slide-in-from-end duration-200">
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            <p className="eyebrow">{ui.accessibility.eyebrow}</p>
            <h2 className="mt-1 font-semibold text-2xl text-foreground">
              {ui.accessibility.title}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">{ui.accessibility.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={ui.accessibility.close}
            className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary-soft hover:text-foreground"
          >
            {ui.accessibility.close}
          </button>
        </div>

        <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
          <Group label={ui.accessibility.appearance} hint={ui.accessibility.appearanceHint}>
            <SegmentedGroup
              value={prefs.theme}
              onChange={(v) => update({ theme: v as Theme })}
              options={[
                { value: "light", label: ui.accessibility.light, icon: Sun },
                { value: "dark", label: ui.accessibility.dark, icon: Moon },
                { value: "system", label: ui.accessibility.system, icon: Monitor },
              ]}
            />
          </Group>

          <Group label={ui.accessibility.contrast} hint={ui.accessibility.contrastHint}>
            <Toggle
              icon={Contrast}
              label={ui.accessibility.highContrast}
              description={ui.accessibility.highContrastDesc}
              on={Boolean(prefs.hc)}
              onChange={(v) => update({ hc: v })}
            />
          </Group>

          <Group label={ui.accessibility.textSize} hint={ui.accessibility.textSizeHint}>
            <div className="rounded-2xl border border-border bg-background p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Type className="h-4.5 w-4.5 text-voice" />
                  <span className="text-sm font-semibold text-foreground">
                    {ui.accessibility.textSize}
                  </span>
                </div>
                <span
                  dir="ltr"
                  className="rounded-full bg-voice/10 px-2.5 py-0.5 text-xs font-bold tabular-nums text-voice"
                >
                  {Math.round(fontScale * 100)}%
                </span>
              </div>

              <div className="flex items-center gap-3" dir="ltr">
                <button
                  type="button"
                  onClick={() =>
                    handleScaleChange(Math.max(0.9, Number((fontScale - 0.05).toFixed(2))))
                  }
                  disabled={fontScale <= 0.9}
                  aria-label={ui.accessibility.decreaseText}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-colors hover:bg-secondary-soft disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <div className="relative flex-1 flex items-center" dir="ltr">
                  <input
                    type="range"
                    min={0.9}
                    max={1.4}
                    step={0.05}
                    // dir="ltr"
                    value={fontScale}
                    onInput={(e) =>
                      handleScaleChange(parseFloat((e.target as HTMLInputElement).value) || 1)
                    }
                    onChange={(e) => handleScaleChange(parseFloat(e.target.value) || 1)}
                    aria-label={ui.accessibility.textSize}
                    aria-valuemin={90}
                    aria-valuemax={140}
                    aria-valuenow={Math.round(fontScale * 100)}
                    aria-valuetext={`${Math.round(fontScale * 100)}%`}
                    className="h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-voice focus:outline-none focus:ring-2 focus:ring-voice"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleScaleChange(Math.min(1.4, Number((fontScale + 0.05).toFixed(2))))
                  }
                  disabled={fontScale >= 1.4}
                  aria-label={ui.accessibility.increaseText}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-colors hover:bg-secondary-soft disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Quick Presets */}
              <div
                className="flex items-center justify-between gap-1 pt-1.5 border-t border-border/60"
                dir="ltr"
              >
                {[
                  { label: "90%", val: 0.9 },
                  { label: "100%", val: 1.0 },
                  { label: "115%", val: 1.15 },
                  { label: "130%", val: 1.3 },
                  { label: "140%", val: 1.4 },
                ].map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => handleScaleChange(preset.val)}
                    className={`flex-1 rounded-lg py-1 text-[11px] font-semibold transition-all ${
                      Math.abs(fontScale - preset.val) < 0.01
                        ? "bg-voice text-voice-foreground shadow-xs font-bold"
                        : "text-muted-foreground hover:bg-secondary-soft hover:text-foreground"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </Group>

          <Group label={ui.accessibility.motionAndFocus}>
            <Toggle
              icon={MousePointer2}
              label={ui.accessibility.reducedMotion}
              description={ui.accessibility.reducedMotionDesc}
              on={Boolean(prefs.reduceMotion)}
              onChange={(v) => update({ reduceMotion: v })}
            />
            <Toggle
              icon={Focus}
              label={ui.accessibility.focusEnhance}
              description={ui.accessibility.focusEnhanceDesc}
              on={Boolean(prefs.focusEnhance)}
              onChange={(v) => update({ focusEnhance: v })}
            />
          </Group>

          <Group label={ui.accessibility.reading}>
            <Toggle
              icon={BookOpen}
              label={ui.accessibility.readingMode}
              description={ui.accessibility.readingModeDesc}
              on={Boolean(prefs.reading)}
              onChange={(v) => update({ reading: v })}
            />
          </Group>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4 bg-surface/50">
          <button
            type="button"
            onClick={() => save(DEFAULTS)}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary-soft hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {ui.accessibility.reset}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-voice px-5 py-2 text-sm font-semibold text-voice-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            {ui.accessibility.done}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Group({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-label={label}>
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold text-foreground">{label}</h3>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      <div className="space-y-2.5">{children}</div>
    </section>
  );
}

function SegmentedGroup({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Array<{
    value: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
}) {
  return (
    <div
      role="radiogroup"
      className="grid grid-cols-3 gap-1.5 rounded-2xl border border-border bg-background p-1.5"
    >
      {options.map((o) => {
        const active = o.value === value;
        const Icon = o.icon;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`flex flex-col items-center gap-1.5 rounded-xl px-3 py-3 text-xs font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voice ${
              active
                ? "bg-voice text-voice-foreground shadow-sm"
                : "text-muted-foreground hover:bg-secondary-soft hover:text-foreground"
            }`}
          >
            <Icon className="h-4.5 w-4.5" />
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Toggle({
  icon: Icon,
  label,
  description,
  on,
  onChange,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description?: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={Boolean(on)}
      onClick={() => onChange(!on)}
      className={`group flex w-full items-start gap-3.5 rounded-2xl border px-4 py-3.5 text-left rtl:text-right transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voice ${
        on
          ? "border-voice/40 bg-voice/5 hover:bg-voice/10 dark:bg-voice/15 dark:hover:bg-voice/20"
          : "border-border bg-background hover:bg-secondary-soft/50"
      }`}
    >
      <span
        className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors ${
          on
            ? "bg-voice text-voice-foreground shadow-xs"
            : "bg-muted text-muted-foreground group-hover:text-foreground"
        }`}
      >
        <Icon className="h-4.5 w-4.5" />
      </span>
      <span className="min-w-0 flex-1 pt-0.5">
        <span className="block text-sm font-semibold text-foreground leading-snug">{label}</span>
        {description && (
          <span className="mt-0.5 block text-xs leading-normal text-muted-foreground">
            {description}
          </span>
        )}
      </span>
      {/* Forced to LTR so track translation (translate-x-5 / translate-x-0) works seamlessly in both LTR & RTL */}
      <span
        dir="ltr"
        className={`relative mt-1 inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
          on ? "bg-voice" : "bg-muted-foreground/30"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out ${
            on ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}
