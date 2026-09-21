"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Accessibility } from "lucide-react";
import { useParams } from "next/navigation";

export type Theme = "light" | "dark" | "system";
export type Prefs = {
  theme: Theme;
  hc: boolean;
  fontScale: number; // 0.9 - 1.4
  reduceMotion: boolean;
  reading: boolean;
  focusEnhance: boolean;
};

const DEFAULTS: Prefs = {
  theme: "system",
  hc: false,
  fontScale: 1,
  reduceMotion: false,
  reading: false,
  focusEnhance: false,
};

function apply(prefs: Prefs) {
  if (typeof window === "undefined") return;
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const dark = prefs.theme === "dark" || (prefs.theme === "system" && media.matches);
  root.classList.toggle("dark", dark);
  root.classList.toggle("hc", Boolean(prefs.hc));
  root.classList.toggle("reduce-motion", Boolean(prefs.reduceMotion));
  root.classList.toggle("reading", Boolean(prefs.reading));
  root.classList.toggle("focus-enhance", Boolean(prefs.focusEnhance));
  const scale =
    typeof prefs.fontScale === "number" && !isNaN(prefs.fontScale) ? prefs.fontScale : 1;
  root.style.setProperty("--font-scale", String(scale));
}

let sharedPrefs: Prefs | null = null;
const listeners = new Set<(p: Prefs) => void>();

function setPrefs(next: Prefs) {
  sharedPrefs = next;
  try {
    localStorage.setItem("v4d:a11y", JSON.stringify(next));
  } catch {}
  apply(next);
  listeners.forEach((l) => l(next));
}

function usePrefs(): [Prefs, (p: Prefs) => void] {
  const [state, setState] = useState<Prefs>(() => {
    if (sharedPrefs) return sharedPrefs;
    let initial = DEFAULTS;
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("v4d:a11y");
        if (raw) initial = { ...DEFAULTS, ...JSON.parse(raw) };
      } catch {}
    }
    sharedPrefs = initial;
    return initial;
  });

  useEffect(() => {
    if (!sharedPrefs) {
      sharedPrefs = state;
    }
    apply(sharedPrefs);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const on = () => {
      if (sharedPrefs?.theme === "system") apply(sharedPrefs);
    };
    media.addEventListener("change", on);

    const l = (p: Prefs) => setState(p);
    listeners.add(l);

    return () => {
      media.removeEventListener("change", on);
      listeners.delete(l);
    };
  }, []);

  return [state, setPrefs];
}

const DynamicPanelModal = dynamic(
  () => import("./accessibility-panel-modal").then((m) => m.PanelModal),
  { ssr: false },
);

export function AccessibilityTrigger() {
  const [open, setOpen] = useState(false);
  const [prefs, save] = usePrefs();
  const params = useParams();
  const isAr = params?.locale === "ar";

  useEffect(() => {
    if (!open) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", on);
    return () => document.removeEventListener("keydown", on);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={isAr ? "إعدادات إمكانية الوصول" : "Open accessibility settings"}
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary-soft hover:text-voice"
      >
        <Accessibility className="h-5 w-5" />
      </button>
      {open && <DynamicPanelModal prefs={prefs} save={save} onClose={() => setOpen(false)} />}
    </>
  );
}
