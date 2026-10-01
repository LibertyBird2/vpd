"use client";

import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/providers/language-provider";
import { AccessibilityProvider } from "@/components/accessibility";

export function Providers({ children, locale }: { children: React.ReactNode; locale: string }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AccessibilityProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  );
}
