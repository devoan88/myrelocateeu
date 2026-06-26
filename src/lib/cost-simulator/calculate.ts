export type City =
  | "Vienna"
  | "Berlin"
  | "Munich"
  | "Zurich"
  | "Geneva"
  | "Hamburg";

export type ApartmentSize =
  | "Studio"
  | "1 bedroom"
  | "2 bedrooms"
  | "3 bedrooms";

export type Lifestyle = "Budget" | "Standard" | "Comfortable" | "Premium";

export type CostInputs = {
  city: City;
  adults: number;
  children: number;
  apartment: ApartmentSize;
  lifestyle: Lifestyle;
  hasCar: boolean;
  privateInsurance: boolean;
  internationalSchool: boolean;
};

export type CostBreakdown = {
  housing: number;
  food: number;
  transport: number;
  healthcare: number;
  childcare: number;
  utilities: number;
  leisure: number;
};

export type CostResult = CostBreakdown & { total: number };

/** Vienna, Standard, 2 adults, 1 child, 2 bedrooms, no car */
const VIENNA_BASE: CostBreakdown = {
  housing: 1350,
  food: 580,
  transport: 75,
  healthcare: 120,
  childcare: 400,
  utilities: 165,
  leisure: 200,
};

const CITY_MULTIPLIER: Record<City, number> = {
  Vienna: 1.0,
  Berlin: 0.91,
  Munich: 1.16,
  Zurich: 1.68,
  Geneva: 1.74,
  Hamburg: 0.97,
};

const LIFESTYLE_MULTIPLIER: Record<Lifestyle, number> = {
  Budget: 0.72,
  Standard: 1.0,
  Comfortable: 1.3,
  Premium: 1.75,
};

const APARTMENT_HOUSING: Record<ApartmentSize, number> = {
  Studio: 0.65,
  "1 bedroom": 0.82,
  "2 bedrooms": 1.0,
  "3 bedrooms": 1.35,
};

const CAR_COST = 280;
const PRIVATE_INSURANCE_PER_PERSON = 180;
const INTERNATIONAL_SCHOOL_PER_CHILD = 800;

export const ALL_CITIES: City[] = [
  "Vienna",
  "Berlin",
  "Munich",
  "Zurich",
  "Geneva",
  "Hamburg",
];

export const CITY_FLAGS: Record<City, string> = {
  Vienna: "🇦🇹",
  Berlin: "🇩🇪",
  Munich: "🇩🇪",
  Zurich: "🇨🇭",
  Geneva: "🇨🇭",
  Hamburg: "🇩🇪",
};

export function calculateMonthlyCosts(
  inputs: CostInputs,
  cityOverride?: City
): CostResult {
  const city = cityOverride ?? inputs.city;
  const lifestyleMult = LIFESTYLE_MULTIPLIER[inputs.lifestyle];
  const cityMult = CITY_MULTIPLIER[city];
  const aptMult = APARTMENT_HOUSING[inputs.apartment];

  const adultScale = inputs.adults / 2;
  const householdScale = 0.85 + inputs.adults * 0.075 + inputs.children * 0.075;

  const scaled = (base: number, useHousehold = false) =>
    Math.round(
      base *
        lifestyleMult *
        cityMult *
        (useHousehold ? householdScale : 1)
    );

  let housing = Math.round(
    VIENNA_BASE.housing * aptMult * adultScale * lifestyleMult * cityMult
  );
  let food = Math.round(VIENNA_BASE.food * adultScale * lifestyleMult * cityMult);
  let transport = scaled(VIENNA_BASE.transport);
  let healthcare = Math.round(
    VIENNA_BASE.healthcare * adultScale * cityMult
  );
  let childcare =
    inputs.children > 0
      ? Math.round(
          VIENNA_BASE.childcare * inputs.children * lifestyleMult * cityMult
        )
      : 0;
  let utilities = scaled(VIENNA_BASE.utilities, true);
  let leisure = Math.round(
    VIENNA_BASE.leisure * adultScale * lifestyleMult * cityMult
  );

  if (inputs.hasCar) {
    transport += Math.round(CAR_COST * cityMult);
  }

  if (inputs.privateInsurance) {
    healthcare += Math.round(
      PRIVATE_INSURANCE_PER_PERSON *
        (inputs.adults + inputs.children) *
        cityMult
    );
  }

  if (inputs.internationalSchool && inputs.children > 0) {
    childcare += Math.round(
      INTERNATIONAL_SCHOOL_PER_CHILD * inputs.children
    );
  }

  const breakdown: CostBreakdown = {
    housing,
    food,
    transport,
    healthcare,
    childcare,
    utilities,
    leisure,
  };

  const total = Object.values(breakdown).reduce((sum, n) => sum + n, 0);

  return { ...breakdown, total };
}

export function estimateGrossSalary(netMonthly: number): number {
  return Math.round(netMonthly * 1.2);
}

export function formatComparisonDiff(
  selectedTotal: number,
  otherTotal: number
): string {
  const diff = otherTotal - selectedTotal;
  if (diff === 0) return "—";
  const amount = Math.abs(diff).toLocaleString();
  return diff < 0 ? `€${amount} cheaper` : `€${amount} more expensive`;
}

export const BREAKDOWN_META = [
  { key: "housing" as const, label: "Housing", icon: "🏠" },
  { key: "food" as const, label: "Food & groceries", icon: "🛒" },
  { key: "transport" as const, label: "Transport", icon: "🚌" },
  { key: "healthcare" as const, label: "Healthcare", icon: "🏥" },
  { key: "childcare" as const, label: "Childcare/School", icon: "👶" },
  { key: "utilities" as const, label: "Utilities & phone", icon: "⚡" },
  { key: "leisure" as const, label: "Leisure & eating out", icon: "🎭" },
];

export function buildSummaryLabel(inputs: CostInputs): string {
  const childPart =
    inputs.children === 0
      ? ""
      : inputs.children === 1
        ? ", 1 child"
        : `, ${inputs.children} children`;
  return `Estimated total for ${inputs.city}, ${inputs.adults} adult${inputs.adults > 1 ? "s" : ""}${childPart}`;
}
