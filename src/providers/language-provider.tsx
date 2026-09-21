"use client";
import { createContext, useContext, ReactNode } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";

export type Language = "en" | "ar";
export const SUPPORTED_LANGUAGES: Language[] = ["en", "ar"];

type LanguageContextValue = {
  language: Language;
  dir: "ltr" | "rtl";
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  languages: readonly Language[];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const language = (params.locale as Language) || "en";

  const setLanguage = (lang: Language) => {
    const segments = pathname.split("/");
    if (segments.length >= 2 && SUPPORTED_LANGUAGES.includes(segments[1] as Language)) {
      segments[1] = lang;
    } else {
      segments.splice(1, 0, lang);
    }
    const newPath = segments.join("/") || "/";
    try {
      document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;
    } catch {}
    router.push(newPath);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const value: LanguageContextValue = {
    language,
    dir: language === "ar" ? "rtl" : "ltr",
    setLanguage,
    toggleLanguage,
    languages: SUPPORTED_LANGUAGES,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
