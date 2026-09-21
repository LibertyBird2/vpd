import { MetadataRoute } from "next";
import { getProjects, getEvents } from "@/repositories/dataAccess";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = "https://v4d.org"; // Ensure this matches actual prod URL
  const locales = ["en", "ar"];

  const paths = ["", "/about", "/projects", "/events", "/voices", "/insights", "/get-involved"];

  // Projects and Events slug generation from English data
  const projects = getProjects("en");
  const events = getEvents("en");

  const projectPaths = projects.initiatives.items.map((p: any) => `/projects/${p.slug}`);
  const eventPaths = [...events.items.upcoming, ...events.items.past].map(
    (e: any) => `/events/${e.slug}`,
  );

  const allPaths = [...paths, ...projectPaths, ...eventPaths];

  const sitemapUrls: MetadataRoute.Sitemap = [];

  for (const path of allPaths) {
    sitemapUrls.push({
      url: `${BASE_URL}/en${path}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${BASE_URL}/en${path}`,
          ar: `${BASE_URL}/ar${path}`,
        },
      },
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.8,
    });
  }

  return sitemapUrls;
}
