export type MonitoredSource = {
  url: string;
  domain: string;
  country: string;
  label: string;
};

export const MONITORED_SOURCES: MonitoredSource[] = [
  {
    url: "https://www.bmi.gv.at/",
    domain: "bmi.gv.at",
    country: "Austria",
    label: "BMI Austria (Meldezettel / residence)",
  },
  {
    url: "https://www.oesterreich.gv.at/",
    domain: "oesterreich.gv.at",
    country: "Austria",
    label: "oesterreich.gv.at",
  },
  {
    url: "https://www.make-it-in-germany.com/",
    domain: "make-it-in-germany.com",
    country: "Germany",
    label: "Make it in Germany",
  },
  {
    url: "https://www.sem.admin.ch/sem/en/home.html",
    domain: "sem.admin.ch",
    country: "Switzerland",
    label: "SEM Switzerland (migration)",
  },
];

export function sourceUrlMatchesDomain(
  sourceUrl: string,
  domain: string
): boolean {
  try {
    const host = new URL(sourceUrl).hostname.replace(/^www\./, "");
    const normalizedDomain = domain.replace(/^www\./, "");
    return host === normalizedDomain || host.endsWith(`.${normalizedDomain}`);
  } catch {
    return sourceUrl.includes(domain);
  }
}
