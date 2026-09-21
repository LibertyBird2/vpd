"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InsightCard } from "@/components/shared/card";
import { Reveal } from "@/components/shared";
import type { Insight } from "@/data/types";

interface InsightsFilterProps {
  categories: string[];
  items: Insight[];
  locale: string;
  featuredLabel: string;
  readFeaturedLabel: string;
}

export function InsightsFilter({
  categories,
  items,
  locale,
  featuredLabel,
  readFeaturedLabel,
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
                <article className="mb-14 grid gap-10 rounded-3xl border border-border bg-surface p-8 md:p-12 lg:grid-cols-[1fr_1.4fr]">
                  <div>
                    <p className="inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
                      {featured.kind}
                    </p>
                    <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
                      {featuredLabel} · {featured.read}
                    </p>
                  </div>
                  <div>
                    <h2 className="font-semibold text-3xl leading-tight md:text-5xl">
                      {featured.title}
                    </h2>
                    <p className="mt-5 text-lg text-muted-foreground">{featured.excerpt}</p>
                    <Link
                      href={`/${locale}/insights/${featured.slug}`}
                      className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-voice"
                    >
                      {readFeaturedLabel} <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            )}

            {/* Rest grid items */}
            {rest.length > 0 && (
              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p: Insight, i: number) => (
                  <Reveal as="li" key={p.slug} direction="up" delay={(i % 3) * 80}>
                    <InsightCard insight={p} locale={locale} />
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
