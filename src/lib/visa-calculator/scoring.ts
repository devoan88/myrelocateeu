export type Destination = "Austria" | "Germany" | "Switzerland";
export type VisaType =
  | "Work"
  | "Family reunification"
  | "Student"
  | "Digital Nomad"
  | "Retirement";
export type Education = "High school" | "Bachelor's" | "Master's" | "PhD";
export type GermanLevel = "None" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type CalculatorAnswers = {
  destination: Destination | null;
  visaType: VisaType | null;
  education: Education | null;
  workExperience: number;
  germanLevel: GermanLevel | null;
  jobOffer: boolean;
  monthlyIncome: number;
  nationality: string | null;
  movingWithFamily: boolean;
  euStatus: boolean;
};

const EDUCATION_SCORES: Record<Education, number> = {
  "High school": 5,
  "Bachelor's": 12,
  "Master's": 20,
  PhD: 28,
};

const GERMAN_SCORES: Record<GermanLevel, number> = {
  None: 0,
  A1: 3,
  A2: 6,
  B1: 10,
  B2: 16,
  C1: 22,
  C2: 25,
};

function incomeScore(income: number): number {
  if (income < 1000) return 0;
  if (income <= 2000) return 5;
  if (income <= 3500) return 10;
  return 15;
}

export function calculateScore(answers: CalculatorAnswers): number {
  let score = 0;

  if (answers.education) {
    score += EDUCATION_SCORES[answers.education];
  }

  score += Math.min(answers.workExperience * 2, 22);

  if (answers.germanLevel) {
    score += GERMAN_SCORES[answers.germanLevel];
  }

  score += answers.jobOffer ? 30 : 0;
  score += incomeScore(answers.monthlyIncome);
  score += answers.euStatus ? 8 : 0;

  return Math.min(Math.round(score), 94);
}

export type ScoreBand = "high" | "medium" | "low";

export function getScoreBand(score: number): ScoreBand {
  if (score > 70) return "high";
  if (score >= 40) return "medium";
  return "low";
}

export function getStrengths(answers: CalculatorAnswers): string[] {
  const strengths: string[] = [];

  if (answers.education === "PhD") {
    strengths.push("PhD — exceptional educational profile");
  } else if (answers.education === "Master's") {
    strengths.push("Master's degree — strong educational profile");
  } else if (answers.education === "Bachelor's") {
    strengths.push("Bachelor's degree — solid educational foundation");
  } else if (answers.education === "High school") {
    strengths.push("High school qualification on file");
  }

  if (answers.workExperience >= 5) {
    strengths.push(
      `${answers.workExperience} years experience — meets skilled worker threshold`
    );
  } else if (answers.workExperience >= 2) {
    strengths.push(`${answers.workExperience} years of relevant work experience`);
  }

  if (answers.germanLevel === "C2" || answers.germanLevel === "C1") {
    strengths.push(`${answers.germanLevel} German — exceeds language requirements`);
  } else if (answers.germanLevel === "B2") {
    strengths.push("B2 German — meets minimum language requirement");
  } else if (answers.germanLevel === "B1") {
    strengths.push("B1 German — basic communication level documented");
  }

  if (answers.jobOffer) {
    strengths.push("Confirmed job offer — strongest eligibility factor");
  }

  if (answers.monthlyIncome > 3500) {
    strengths.push("Income above €3,500 — supports financial requirements");
  }

  if (answers.euStatus) {
    strengths.push("Current EU residence status — simplifies the process");
  }

  if (strengths.length === 0) {
    strengths.push("Profile mapped — review areas to strengthen below");
  }

  return strengths.slice(0, 5);
}

export function getImprovements(answers: CalculatorAnswers): string[] {
  const tips: string[] = [];

  if (!answers.jobOffer && answers.visaType === "Work") {
    tips.push("A confirmed job offer would be the single biggest factor");
  }

  if (
    !answers.germanLevel ||
    answers.germanLevel === "None" ||
    answers.germanLevel === "A1" ||
    answers.germanLevel === "A2"
  ) {
    tips.push("Reaching B2+ German would increase your profile significantly");
  } else if (answers.germanLevel === "B1") {
    tips.push("Reaching B2 German would strengthen most work permit applications");
  }

  if (answers.destination === "Austria" && answers.visaType === "Work") {
    tips.push("Consider Red-White-Red Card specifically for your profile");
  }

  if (answers.education === "High school") {
    tips.push("A recognised degree or vocational qualification strengthens your case");
  }

  if (answers.workExperience < 3) {
    tips.push("More relevant work experience can improve your eligibility score");
  }

  if (answers.monthlyIncome < 2000) {
    tips.push("Higher documented income supports financial requirement checks");
  }

  if (answers.movingWithFamily) {
    tips.push("Family applications require additional documentation and proof of funds");
  }

  if (tips.length === 0) {
    tips.push("Verify all requirements on the official migration website");
  }

  return [...new Set(tips)].slice(0, 5);
}

export function getSourceNote(destination: Destination | null): string {
  if (destination === "Austria") {
    return "This estimate is based on general published criteria from migration.gv.at as of June 2026. Requirements are updated regularly. Individual cases can vary significantly. Source: migration.gv.at/en/living-and-working-in-austria/work/third-country-nationals";
  }
  if (destination === "Germany") {
    return "This estimate is based on general published criteria from make-it-in-germany.com as of June 2026. Requirements are updated regularly. Individual cases can vary significantly. Source: make-it-in-germany.com/en/visa-residence";
  }
  if (destination === "Switzerland") {
    return "This estimate is based on general published criteria from sem.admin.ch as of June 2026. Requirements are updated regularly. Individual cases can vary significantly. Source: sem.admin.ch/sem/en/home/themen.html";
  }
  return "This estimate is based on general published criteria as of June 2026. Requirements are updated regularly. Individual cases can vary significantly.";
}

export const BAND_COLORS = {
  high: { stroke: "#16A34A", text: "text-[#16A34A]" },
  medium: { stroke: "#D97706", text: "text-[#D97706]" },
  low: { stroke: "#DC2626", text: "text-[#DC2626]" },
} as const;

export function originFromNationality(nationality: string | null): string {
  if (!nationality || nationality === "Other") return "Other";
  return nationality;
}
