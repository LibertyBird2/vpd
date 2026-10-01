"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InsightCard } from "@/components/shared/card";
import { Reveal } from "@/components/shared";
import type { Insight } from "@/types";

interface InsightsFilterProps {
  categories: string[];
  items: Insight[];
  locale: string;
  featuredLabel: string;
  readFeaturedLabel: string;
  readLabel?: string;
}

export function InsightsFilter({
  categories,
  items,
  locale,
  featuredLabel,
  readFeaturedLabel,
  readLabel,
}: InsightsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0] || "All");

  const isAll = (cat: string) =>
    cat.toLowerCase() === "all" || cat === "الكل" || cat === categories[0];

  const filteredItems = items.filter((item) => {
    if (isAll(selectedCategory)) return true;
    return item.kind.trim().toLowerCase() === selectedCategory.trim().toLowerCase();
  });

  const featured = filteredItems[0];
  const rest = filteredItems.slice(1);

  return (
    <>
      {/* Category filter bar */}
      <div className="border-b border-border bg-background">
        <div className="container-page flex flex-wrap gap-2 py-5">
          {categories.map((c: string) => {
            const active = selectedCategory === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCategory(c)}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-voice bg-secondary-soft text-voice"
                    : "border-border text-muted-foreground hover:border-voice hover:text-voice"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtered items grid section */}
      <div className="container-page py-12">
        {filteredItems.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">
            {locale === "ar" ? "لا توجد نتائج لهذه الفئة" : "No insights found for this category."}
          </p>
        ) : (
          <>
            {/* Featured lead item */}
            {featured && (
              <Reveal direction="zoom">
                <article className="mb-14 group rounded-3xl border border-border bg-surface p-8 md:p-12 transition-all hover:border-primary-deep hover:shadow-soft">
                  <Link href={`/${locale}/insights/${featured.slug}`} className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_1.8fr] items-start no-underline outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
                    <div className="flex flex-col items-start">
                      <div className="flex flex-wrap items-center gap-3 text-xs mb-6">
                        <span className="rounded-full bg-secondary-soft px-3 py-1 font-semibold text-voice uppercase tracking-widest">
                          {featured.kind}
                        </span>
                        <span className="text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-voice inline-block"></span>
                          {featuredLabel}
                        </span>
                      </div>
                      {!!featured.date && <p className="mt-2 text-sm text-muted-foreground">{featured.date}</p>}
                      {!!featured.read && <p className="mt-2 text-sm text-muted-foreground uppercase tracking-widest">{featured.read}</p>}
                    </div>
                    <div>
                      <h2 className="font-semibold text-3xl leading-snug md:text-4xl lg:text-5xl lg:leading-tight text-foreground group-hover:text-voice transition-colors">
                        {featured.title}
                      </h2>
                      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                        {featured.excerpt}
                      </p>
                      <div className="mt-10 flex items-center text-sm font-semibold text-voice group-hover:text-primary-deep transition-colors">
                        {readFeaturedLabel}
                        <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:mr-1.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                </article>
              </Reveal>
            )}

            {/* Rest grid items */}
            {rest.length > 0 && (
              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p: Insight, i: number) => (
                  <Reveal as="li" key={p.slug} direction="up" delay={(i % 3) * 80}>
                    <InsightCard insight={p} locale={locale} readLabel={readLabel} />
                  </Reveal>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
}
