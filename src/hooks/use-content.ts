import { useMemo } from "react";
import { useParams } from "next/navigation";
import { getLocalContent } from "@/lib/data/local/provider";

/** Locale-aware access to the whole content bundle. */
export function useContent() {
  const params = useParams();
  const language = (params?.locale as string) || "en";
  return useMemo(() => getLocalContent(language), [language]);
}
