import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string; // If undefined, it's the current page
};

export function Breadcrumb({ 
  items, 
  locale,
  ariaLabel = "Breadcrumb"
}: { 
  items: BreadcrumbItem[]; 
  locale: string;
  ariaLabel?: string;
}) {
  const isRtl = locale === "ar";
  const Separator = isRtl ? ChevronLeft : ChevronRight;

  return (
    <nav aria-label={ariaLabel} className="mb-6 overflow-x-auto whitespace-nowrap">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link 
                  href={`/${locale}${item.href.startsWith("/") ? item.href : `/${item.href}`}`.replace(/\/+/g, "/")}
                  className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voice rounded-sm transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <Separator className="h-4 w-4 opacity-50 shrink-0" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
