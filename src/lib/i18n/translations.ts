export type Locale = "en" | "ka" | "de";

export const LOCALES: { code: Locale; label: string }[] = [
  { code: "ka", label: "ქარ" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
];

export const translations = {
  en: {
    nav: {
      login: "Login",
    },
    hero: {
      badge: "AI-powered relocation guidance",
      headline: "Move to Europe with",
      headlineHighlight: "confidence",
      subheadline:
        "AI-powered relocation guide for Austria, Germany and Switzerland",
      destinationLabel: "Destination country",
      originLabel: "Origin country",
      destinationPlaceholder: "Select destination",
      originPlaceholder: "Select origin",
      cta: "Get my free guide",
    },
    countries: {
      Austria: "Austria",
      Germany: "Germany",
      Switzerland: "Switzerland",
      Georgia: "Georgia",
      Ukraine: "Ukraine",
      Armenia: "Armenia",
      India: "India",
      Other: "Other",
    },
  },
  ka: {
    nav: {
      login: "შესვლა",
    },
    hero: {
      badge: "AI-ზე დაფუძნებული რელოკაციის სახელმძღვანელო",
      headline: "გადადით ევროპაში",
      headlineHighlight: "თავდაჯერებულობით",
      subheadline:
        "AI-ზე დაფუძნებული რელოკაციის გზამკვლევი ავსტრიის, გერმანიისა და შვეიცარიისთვის",
      destinationLabel: "დანიშნულების ქვეყანა",
      originLabel: "წარმოშობის ქვეყანა",
      destinationPlaceholder: "აირჩიეთ დანიშნულება",
      originPlaceholder: "აირჩიეთ წარმოშობის ქვეყანა",
      cta: "მიიღეთ უფასო გზამკვლევი",
    },
    countries: {
      Austria: "ავსტრია",
      Germany: "გერმანია",
      Switzerland: "შვეიცარია",
      Georgia: "საქართველო",
      Ukraine: "უკრაინა",
      Armenia: "სომხეთი",
      India: "ინდოეთი",
      Other: "სხვა",
    },
  },
  de: {
    nav: {
      login: "Anmelden",
    },
    hero: {
      badge: "KI-gestützte Relocation-Beratung",
      headline: "Nach Europa ziehen – mit",
      headlineHighlight: "Sicherheit",
      subheadline:
        "KI-gestützter Relocation-Guide für Österreich, Deutschland und die Schweiz",
      destinationLabel: "Zielland",
      originLabel: "Herkunftsland",
      destinationPlaceholder: "Ziel auswählen",
      originPlaceholder: "Herkunft auswählen",
      cta: "Kostenlosen Guide erhalten",
    },
    countries: {
      Austria: "Österreich",
      Germany: "Deutschland",
      Switzerland: "Schweiz",
      Georgia: "Georgien",
      Ukraine: "Ukraine",
      Armenia: "Armenien",
      India: "Indien",
      Other: "Andere",
    },
  },
} as const;

export type TranslationKeys = (typeof translations)[Locale];

export function getTranslation(locale: Locale): TranslationKeys {
  return translations[locale] ?? translations.en;
}
