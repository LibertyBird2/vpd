"use client";

import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/providers/language-provider";

export function Providers({ children, locale }: { children: React.ReactNode; locale: string }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
