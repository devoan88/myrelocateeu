import type { MetadataRoute } from "next";
import { COUNTRY_SLUGS } from "@/data/countries";
import { DESTINATION_COUNTRIES } from "@/lib/checklists";
import { SITE_URL } from "@/lib/seo/site";

const ORIGINS = ["Georgia", "Ukraine", "Armenia", "India", "Other"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/stories`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/tools/schengen-calculator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/tools/visa-calculator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/cost-simulator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...COUNTRY_SLUGS.map((slug) => ({
      url: `${SITE_URL}/countries/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];

  const guideRoutes: MetadataRoute.Sitemap = DESTINATION_COUNTRIES.flatMap(
    (destination) =>
      ORIGINS.map((origin) => ({
        url: `${SITE_URL}/guide?destination=${encodeURIComponent(destination)}&origin=${encodeURIComponent(origin)}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      }))
  );

  return [...staticRoutes, ...guideRoutes];
}
