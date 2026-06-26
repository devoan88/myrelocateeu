import type { PaidPlanTier } from "@/lib/constants";
import { getStripePlanDetails, isPaidPlan } from "@/lib/constants";
import { getAppUrl, getStripe } from "@/lib/stripe";

export type BillingCycle = "monthly" | "yearly";

function getPriceId(plan: PaidPlanTier, cycle: BillingCycle): string | null {
  if (plan === "premium") {
    return cycle === "yearly"
      ? process.env.STRIPE_PREMIUM_YEARLY ??
          process.env.STRIPE_PREMIUM_YEARLY_PRICE_ID ??
          null
      : process.env.STRIPE_PREMIUM_MONTHLY ??
          process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID ??
          null;
  }
  return cycle === "yearly"
    ? process.env.STRIPE_PRO_YEARLY ??
        process.env.STRIPE_PRO_YEARLY_PRICE_ID ??
        null
    : process.env.STRIPE_PRO_MONTHLY ??
        process.env.STRIPE_PRO_MONTHLY_PRICE_ID ??
        null;
}

export async function createCheckoutSession(params: {
  plan: string;
  billingCycle?: BillingCycle;
  userId?: string | null;
}): Promise<{ url: string | null; error?: string }> {
  const { plan, billingCycle = "monthly", userId } = params;
  const interval = billingCycle === "yearly" ? "year" : "month";

  if (!isPaidPlan(plan)) {
    return { url: null, error: "Invalid plan" };
  }

  const stripe = getStripe();
  const appUrl = getAppUrl();
  const priceId = getPriceId(plan, billingCycle);

  const lineItems = priceId
    ? [{ price: priceId, quantity: 1 }]
    : (() => {
        const details = getStripePlanDetails(plan);
        const unitAmount =
          billingCycle === "yearly"
            ? plan === "premium"
              ? 9900
              : 24900
            : details.amount;
        return [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: details.name,
                description: details.description,
              },
              unit_amount: unitAmount,
              recurring: {
                interval: interval as "month" | "year",
              },
            },
            quantity: 1,
          },
        ];
      })();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: lineItems,
    metadata: {
      plan,
      billingCycle,
      ...(userId ? { userId } : {}),
    },
    subscription_data: {
      metadata: { plan, billingCycle, ...(userId ? { userId } : {}) },
    },
    ...(userId ? { client_reference_id: userId } : {}),
    success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/pricing`,
  });

  return { url: session.url };
}
