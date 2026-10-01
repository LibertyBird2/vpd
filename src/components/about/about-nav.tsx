"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type AboutSectionLink = {
  label: string;
  href: string;
};

export function AboutNav({ items }: { items: AboutSectionLink[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.href.substring(1));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="About sections"
      className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <div className="container-page">
        <div className="flex gap-8 overflow-x-auto whitespace-nowrap py-4 scrollbar-hide">
          {items.map((item) => {
            const isActive = activeId === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-voice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-deep",
                  isActive ? "text-voice" : "text-muted-foreground"
                )}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
