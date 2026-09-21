import { Languages } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { useContent } from "@/hooks/use-content";

/**
 * Compact language toggle. AR ↔ EN. Uses a button with an aria-label so it
 * remains accessible without visible text on desktop, and shows the target
 * language code alongside on mobile.
 */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { language, toggleLanguage } = useLanguage();
  const { ui } = useContent();
  const target = language === "en" ? ui.language.arabic : ui.language.english;
  const label = `${ui.actions.changeLanguage} — ${target}`;

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={label}
      title={label}
      className={`inline-flex h-10 min-w-[2.5rem] items-center justify-center gap-1.5 rounded-full border border-border px-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary-soft ${className}`}
    >
      <Languages className="h-4 w-4" aria-hidden />
      <span aria-hidden>{language === "en" ? "AR" : "EN"}</span>
    </button>
  );
}
