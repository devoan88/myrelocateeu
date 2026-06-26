export type SlideshowImageEntry = {
  slug: string;
  city: string;
  country: string;
  imageUrl: string;
  isPremium?: boolean;
};

/** Direct Unsplash URLs for hero slideshow — replace with licensed assets before production. */
export const SLIDESHOW_IMAGE_ENTRIES: SlideshowImageEntry[] = [
  {
    slug: "austria",
    city: "Vienna",
    country: "Austria",
    imageUrl:
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1600&q=85&auto=format&fit=crop",
  },
  {
    slug: "germany",
    city: "Berlin",
    country: "Germany",
    imageUrl:
      "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1600&q=85&auto=format&fit=crop",
  },
  {
    slug: "switzerland",
    city: "Zurich",
    country: "Switzerland",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85&auto=format&fit=crop",
  },
  {
    slug: "france",
    city: "Paris",
    country: "France",
    imageUrl:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=85&auto=format&fit=crop",
  },
  {
    slug: "monaco",
    city: "Monaco",
    country: "Monaco",
    imageUrl:
      "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=1600&q=85&auto=format&fit=crop",
    isPremium: true,
  },
  {
    slug: "luxembourg",
    city: "Luxembourg",
    country: "Luxembourg",
    imageUrl:
      "https://images.unsplash.com/photo-1587974928442-e7bfd8e00000?w=1600&q=85&auto=format&fit=crop",
  },
  {
    slug: "netherlands",
    city: "Amsterdam",
    country: "Netherlands",
    imageUrl:
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1600&q=85&auto=format&fit=crop",
  },
];

export const SLIDESHOW_IMAGES = Object.fromEntries(
  SLIDESHOW_IMAGE_ENTRIES.map((entry) => [entry.slug, entry.imageUrl])
) as Record<string, string>;

export function getSlideshowImageUrl(slug: string): string {
  return SLIDESHOW_IMAGES[slug] ?? "";
}
