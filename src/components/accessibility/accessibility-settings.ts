export type AppearanceMode = "light" | "dark" | "system";

export type AccessibilitySettings = {
  appearance: AppearanceMode;
  textSize: "default" | "large" | "largest";
  highContrast: boolean;
  reduceMotion: boolean;
  readingMode: boolean;
  textSpacing: boolean;
  lineSpacing: boolean;
  enhancedFocus: boolean;
};

export const DEFAULTS: AccessibilitySettings = {
  appearance: "system",
  textSize: "default",
  highContrast: false,
  reduceMotion: false,
  readingMode: false,
  textSpacing: false,
  lineSpacing: false,
  enhancedFocus: false,
};
