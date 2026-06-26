import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe/create-session";

/** @deprecated Prefer POST /api/create-checkout */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const billingCycle =
      body.billingCycle === "yearly" || body.interval === "year"
        ? "yearly"
        : "monthly";
    const { url, error } = await createCheckoutSession({
      plan: body.plan,
      billingCycle,
      userId: body.userId,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    if (!url) {
      return NextResponse.json(
        { error: "Unable to create checkout session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}
