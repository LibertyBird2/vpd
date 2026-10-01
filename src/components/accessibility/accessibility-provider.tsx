"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { AccessibilitySettings, DEFAULTS } from "./accessibility-settings";

type AccessibilityContextType = {
  settings: AccessibilitySettings;
  updateSettings: (partial: Partial<AccessibilitySettings>) => void;
  resetSettings: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const STORAGE_KEY = "vpd:a11y";

function applySettings(settings: AccessibilitySettings) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  // Appearance
  if (settings.appearance === "system") {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", isDark);
  } else {
    root.classList.toggle("dark", settings.appearance === "dark");
  }

  // Text Size
  root.setAttribute("data-text-size", settings.textSize);

  // Other Settings via classes
  root.classList.toggle("hc", settings.highContrast);
  root.classList.toggle("reduce-motion", settings.reduceMotion);
  root.classList.toggle("reading", settings.readingMode);
  root.classList.toggle("text-spacing", settings.textSpacing);
  root.classList.toggle("line-spacing", settings.lineSpacing);
  root.classList.toggle("focus-enhance", settings.enhancedFocus);
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULTS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const nextSettings = { ...DEFAULTS, ...parsed };
        setSettings(nextSettings);
        applySettings(nextSettings);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (settings.appearance !== "system") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applySettings(settings);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [settings.appearance, settings]);

  const updateSettings = (partial: Partial<AccessibilitySettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      applySettings(next);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const resetSettings = () => {
    setSettings(DEFAULTS);
    applySettings(DEFAULTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
}
