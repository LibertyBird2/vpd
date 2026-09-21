import type { InsightsContent } from "../types";

export const insights: InsightsContent = {
  seo: {
    title: "Insights — VPD",
    description:
      "Organizational perspectives, issue framing, advocacy positions, educational knowledge, and research publications from VPD.",
    ogTitle: "Insights — VPD",
    ogDescription: "Positions, explainers, and research from VPD.",
  },

  header: {
    eyebrow: "Insights",
    title: "Where VPD stands, in writing.",
    lede: "Positions, explainers, and research notes. Everything here is public, cite-able, and open to reply.",
  },

  categories: ["All", "Position", "Explainer", "Research note"],
  featuredLabel: "Featured",
  readFeaturedLabel: "Read the piece",
  readLabel: "Read",

  items: [
    {
      slug: "why-rights-based",
      image: "",
      kind: "Position",
      title: "Why VPD is a rights-based organization, not a charity",
      read: "6 min read",
      excerpt:
        "The charity frame casts persons with disabilities as recipients. The rights frame recognizes them as citizens. The distinction changes everything.",
    },
    {
      slug: "language-matters",
      image: "",
      kind: "Explainer",
      title: "The language we use — and why we use it",
      read: "4 min read",
      excerpt:
        "A short guide to the terms VPD uses in Arabic and English, and the reasoning behind each choice.",
    },
    {
      slug: "yemen-baseline",
      image: "",
      kind: "Research note",
      title: "Toward a baseline: what we don't yet know about disability in Yemen",
      read: "9 min read",
      excerpt:
        "An honest inventory of the data gaps VPD's early research agenda will try to close.",
    },
    {
      slug: "accessibility-standards",
      image: "",
      kind: "Explainer",
      title: "Accessibility standards, in plain Arabic and English",
      read: "5 min read",
      excerpt:
        "WCAG and CRPD, translated into decisions organizations can actually make on Monday morning.",
    },
  ],
};
