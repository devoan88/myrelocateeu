import { NextResponse } from "next/server";
import Stripe from "stripe";
import type { PlanTier } from "@/lib/constants";
import {
  downgradeUserPlan,
  syncPlanFromSubscription,
  upsertUserPlanFromStripe,
} from "@/lib/plans";
import { getStripe } from "@/lib/stripe";

function resolvePlan(metadata: Stripe.Metadata | null | undefined): PlanTier {
  const plan = metadata?.plan;
  if (plan === "premium" || plan === "pro") return plan;
  return "premium";
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ received: true });
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== "subscription" || !session.subscription) break;

        const subscription = await getStripe().subscriptions.retrieve(
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription.id
        );

        const plan = resolvePlan(session.metadata ?? subscription.metadata);
        const userId =
          session.metadata?.userId ??
          session.client_reference_id ??
          subscription.metadata?.userId ??
          null;
        const email =
          session.customer_details?.email ?? session.customer_email ?? null;

        const customerId =
          typeof session.customer === "string"
            ? session.customer
            : session.customer?.id;

        if (customerId && (plan === "premium" || plan === "pro")) {
          await upsertUserPlanFromStripe({
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscription.id,
            email,
            plan,
            subscriptionStatus: subscription.status,
          });

          await syncPlanFromSubscription({
            userId,
            email,
            plan,
            subscription,
          });
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const plan = resolvePlan(subscription.metadata);
        const userId = subscription.metadata?.userId ?? null;
        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer.id;

        if (subscription.status === "active" || subscription.status === "trialing") {
          if (plan === "premium" || plan === "pro") {
            await upsertUserPlanFromStripe({
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscription.id,
              email: null,
              plan,
              subscriptionStatus: subscription.status,
            });

            await syncPlanFromSubscription({
              userId,
              email: null,
              plan,
              subscription,
            });
          }
        } else {
          await downgradeUserPlan(subscription.id);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await downgradeUserPlan(subscription.id);
        break;
      }
    }
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
