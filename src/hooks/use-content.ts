import { useMemo } from "react";
import { useParams } from "next/navigation";
import { getContent } from "@/data";

/** Locale-aware access to the whole content bundle. */
export function useContent() {
  const params = useParams();
  const language = (params?.locale as string) || "en";
  return useMemo(() => getContent(language), [language]);
}
