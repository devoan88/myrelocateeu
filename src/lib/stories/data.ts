export type Story = {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  origin: string;
  originFlag: string;
  destination: string;
  destinationFlag: string;
  movedDate: string;
  quote: string;
  tags: string[];
  rating: number;
};

export const AVATAR_PALETTE = [
  "#EFF6FF",
  "#F0FDF4",
  "#FFF7ED",
  "#FDF4FF",
  "#FEF2F2",
  "#ECFEFF",
] as const;

export const STORY_TAG_OPTIONS = [
  "First time expat",
  "Family",
  "Children",
  "Work permit",
  "Tech industry",
  "Solo move",
  "School enrollment",
  "Switzerland",
  "Work",
  "Salary negotiation",
  "German learning",
  "Blue Card",
] as const;

export const ORIGIN_CITIES = [
  { value: "Tbilisi", label: "Tbilisi 🇬🇪", flag: "🇬🇪" },
  { value: "Yerevan", label: "Yerevan 🇦🇲", flag: "🇦🇲" },
  { value: "Kyiv", label: "Kyiv 🇺🇦", flag: "🇺🇦" },
  { value: "Other", label: "Other", flag: "🌍" },
] as const;

export const DESTINATION_CITIES = [
  { value: "Vienna", label: "Vienna 🇦🇹", flag: "🇦🇹" },
  { value: "Berlin", label: "Berlin 🇩🇪", flag: "🇩🇪" },
  { value: "Munich", label: "Munich 🇩🇪", flag: "🇩🇪" },
  { value: "Zurich", label: "Zurich 🇨🇭", flag: "🇨🇭" },
  { value: "Geneva", label: "Geneva 🇨🇭", flag: "🇨🇭" },
  { value: "Hamburg", label: "Hamburg 🇩🇪", flag: "🇩🇪" },
] as const;

export const STORIES: Story[] = [
  {
    id: "nino",
    name: "Nino T.",
    initials: "NT",
    avatarBg: "#EFF6FF",
    origin: "Tbilisi",
    originFlag: "🇬🇪",
    destination: "Vienna",
    destinationFlag: "🇦🇹",
    movedDate: "March 2025",
    quote:
      "I spent two weeks trying to understand the Meldezettel process from various websites. RelocateEU had it explained in three sentences with a direct link to the right office. That alone was worth it.",
    tags: ["First time expat", "Family", "German learning"],
    rating: 5,
  },
  {
    id: "giorgi",
    name: "Giorgi M.",
    initials: "GM",
    avatarBg: "#F0FDF4",
    origin: "Tbilisi",
    originFlag: "🇬🇪",
    destination: "Berlin",
    destinationFlag: "🇩🇪",
    movedDate: "January 2025",
    quote:
      "The visa calculator told me my B1 German was holding me back. I got it to B2 in four months, reran the calculator, and my score jumped from 61% to 84%. Got the Blue Card in September.",
    tags: ["Work permit", "Tech industry", "Solo move"],
    rating: 5,
  },
  {
    id: "mariam",
    name: "Mariam K.",
    initials: "MK",
    avatarBg: "#FFF7ED",
    origin: "Yerevan",
    originFlag: "🇦🇲",
    destination: "Vienna",
    destinationFlag: "🇦🇹",
    movedDate: "June 2025",
    quote:
      "Finding a school for my daughter was my biggest worry. The guide listed exactly which documents I needed and linked directly to the district's school registration form. Done in one afternoon.",
    tags: ["Family", "Children", "School enrollment"],
    rating: 5,
  },
  {
    id: "tamta",
    name: "Tamta B.",
    initials: "TB",
    avatarBg: "#FDF4FF",
    origin: "Tbilisi",
    originFlag: "🇬🇪",
    destination: "Zurich",
    destinationFlag: "🇨🇭",
    movedDate: "April 2025",
    quote:
      "Switzerland is expensive and complicated. The cost simulator helped me realise I needed at least CHF 7,000/month net to live comfortably. That helped me negotiate my salary before accepting the job.",
    tags: ["Switzerland", "Work", "Salary negotiation"],
    rating: 4,
  },
];
