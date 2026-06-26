import { createSupabaseClient } from "@/lib/supabase/client";
import type {
  RelocationInfo,
  RelocationLanguage,
} from "@/lib/supabase/types";

const AUSTRIA_SEED: RelocationInfo[] = [
  {
    id: "seed-austria-visa-en",
    country: "Austria",
    category: "visa",
    title: "Meldezettel (Residence Registration)",
    content: `You must register your residence (Meldezettel) within 3 days of moving into accommodation in Austria.

Required documents:
• Valid passport or national ID
• Completed registration form (Meldezettel) signed by your landlord (Wohnungsgeber)
• Rental contract (Mietvertrag) or proof of ownership

Where to go: Municipal registration office (Meldeamt / Gemeindeamt) for your district.

Note: Registration is mandatory for all residents. Late registration can result in administrative fines.`,
    source_url: "https://www.bmi.gv.at/",
    last_updated: "2026-02-10",
    language: "en",
  },
  {
    id: "seed-austria-bank-en",
    country: "Austria",
    category: "bank",
    title: "Opening a Bank Account in Austria",
    content: `Austrian banks require proof of identity and local registration before opening a standard account.

Typically required documents:
• Valid passport or ID card
• Meldezettel (registration certificate)
• Proof of income: employment contract, recent payslip, or student enrollment letter
• Residence permit or visa (for non-EU nationals)

Tips:
• Compare Erste Bank, Raiffeisen, BAWAG, and online options such as N26
• Ask about a Basiskonto (basic payment account) if you are new to Austria
• Allow 1–2 weeks to receive your debit card (Bankomatkarte)`,
    source_url:
      "https://www.oesterreich.gv.at/en/themen/finanzen_und_steuer/Seite.020200.html",
    last_updated: "2026-01-22",
    language: "en",
  },
  {
    id: "seed-austria-healthcare-en",
    country: "Austria",
    category: "healthcare",
    title: "ÖGK Health Insurance Registration",
    content: `Health insurance is mandatory for all residents in Austria. The Österreichische Gesundheitskasse (ÖGK) covers most employees and self-employed persons.

Registration steps:
1. Employed: your employer registers you automatically with ÖGK
2. Self-employed: register within one month at your regional ÖGK office
3. Submit passport, Meldezettel, and residence permit (if applicable)
4. Receive your e-card by post within 2–3 weeks

Your e-card is required for doctor visits, hospital care, and pharmacy prescriptions.`,
    source_url: "https://www.oegk.at/",
    last_updated: "2026-03-01",
    language: "en",
  },
  {
    id: "seed-austria-school-en",
    country: "Austria",
    category: "school",
    title: "School Enrollment via BildungsGRUnd",
    content: `In Vienna, school placement for children is managed through the BildungsGRUnd online platform operated by the city education authority.

Enrollment process:
1. Create an account on BildungsGRUnd (bildungsgrund.at)
2. Submit a school placement application for the upcoming school year
3. Upload required documents: child's passport or birth certificate, Meldezettel, vaccination records (Impfpass), and previous school reports
4. Non-German documents may need certified translations
5. The municipal school authority (Stadtschulrat) assigns a school based on catchment area and availability

Apply early — popular schools fill up quickly before the September school year.`,
    source_url: "https://www.bildungsgrund.at/",
    last_updated: "2026-02-18",
    language: "en",
  },
];

function getFallbackRelocationInfo(
  country: string,
  language: RelocationLanguage
): RelocationInfo[] {
  if (country !== "Austria") return [];

  if (language === "en") return AUSTRIA_SEED;

  // For de/ka without Supabase, fall back to English content
  return AUSTRIA_SEED.map((row) => ({ ...row, language }));
}

export async function getRelocationInfo(
  country: string,
  language: RelocationLanguage
): Promise<RelocationInfo[]> {
  const supabase = createSupabaseClient();

  if (!supabase) {
    return getFallbackRelocationInfo(country, language);
  }

  const { data, error } = await supabase
    .from("relocation_info")
    .select("*")
    .eq("country", country)
    .eq("language", language)
    .order("category");

  if (error || !data?.length) {
    return getFallbackRelocationInfo(country, language);
  }

  return data as RelocationInfo[];
}

export function getRelocationInfoByCategory(
  rows: RelocationInfo[]
): Partial<Record<string, RelocationInfo>> {
  return Object.fromEntries(rows.map((row) => [row.category, row]));
}

export function formatLastUpdated(
  date: string,
  language: RelocationLanguage
): string {
  const locale =
    language === "ka" ? "ka-GE" : language === "de" ? "de-AT" : "en-GB";

  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const lastUpdatedLabels: Record<RelocationLanguage, string> = {
  en: "Last updated",
  de: "Zuletzt aktualisiert",
  ka: "ბოლო განახლება",
};

export const lastVerifiedLabels: Record<RelocationLanguage, string> = {
  en: "Last verified",
  de: "Zuletzt verifiziert",
  ka: "ბოლოს დადასტურებული",
};

export const reportOutdatedLabels: Record<
  RelocationLanguage,
  {
    button: string;
    modalTitle: string;
    modalHint: string;
    messageLabel: string;
    messagePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    sending: string;
    cancel: string;
    close: string;
    successTitle: string;
    successBody: string;
  }
> = {
  en: {
    button: "Report outdated info",
    modalTitle: "Report outdated information",
    modalHint:
      "Help us keep guides accurate. We review every report and update verified content.",
    messageLabel: "What seems outdated? (optional)",
    messagePlaceholder: "e.g. The registration deadline changed…",
    emailLabel: "Your email (optional)",
    emailPlaceholder: "you@example.com",
    submit: "Send report",
    sending: "Sending…",
    cancel: "Cancel",
    close: "Close",
    successTitle: "Thank you",
    successBody:
      "Your report was sent to our team. We will review and update the guide if needed.",
  },
  de: {
    button: "Veraltete Info melden",
    modalTitle: "Veraltete Information melden",
    modalHint:
      "Helfen Sie uns, die Inhalte aktuell zu halten. Jedes Feedback wird geprüft.",
    messageLabel: "Was ist veraltet? (optional)",
    messagePlaceholder: "z. B. Die Frist für die Anmeldung hat sich geändert…",
    emailLabel: "Ihre E-Mail (optional)",
    emailPlaceholder: "sie@beispiel.de",
    submit: "Meldung senden",
    sending: "Wird gesendet…",
    cancel: "Abbrechen",
    close: "Schließen",
    successTitle: "Danke",
    successBody:
      "Ihre Meldung wurde an unser Team gesendet. Wir prüfen und aktualisieren den Inhalt bei Bedarf.",
  },
  ka: {
    button: "მოძველებული ინფოს შეტყობინება",
    modalTitle: "მოძველებული ინფორმაციის შეტყობინება",
    modalHint:
      "დაგვეხმარეთ გზამკვლევის განახლებაში. ყველა შეტყობინებას ვამოწმებთ.",
    messageLabel: "რა გრძნობთ მოძველებულად? (არასავალდებულო)",
    messagePlaceholder: "მაგ. რეგისტრაციის ვადა შეიცვალა…",
    emailLabel: "თქვენი ელფოსტა (არასავალდებულო)",
    emailPlaceholder: "you@example.com",
    submit: "გაგზავნა",
    sending: "იგზავნება…",
    cancel: "გაუქმება",
    close: "დახურვა",
    successTitle: "მადლობა",
    successBody:
      "თქვენი შეტყობინება გაგზავნილია. საჭიროების შემთხვევაში განვაახლებთ გზამკვლევს.",
  },
};

export const sourceLabels: Record<RelocationLanguage, string> = {
  en: "Official source",
  de: "Offizielle Quelle",
  ka: "ოფიციალური წყარო",
};
