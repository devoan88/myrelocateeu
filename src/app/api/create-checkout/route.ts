import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createCheckoutSession } from "@/lib/stripe/create-session";
import type { BillingCycle } from "@/lib/stripe/create-session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const plan = body.plan as string;
    const billingCycle: BillingCycle =
      body.billingCycle === "yearly" ? "yearly" : "monthly";

    let userId = body.userId as string | undefined;
    if (!userId) {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      userId = user?.id;
    }

    const { url, error } = await createCheckoutSession({
      plan,
      billingCycle,
      userId,
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
    console.error("Create checkout error:", error);
    return NextResponse.json(
      { error: "Unable to create checkout session. Check Stripe configuration." },
      { status: 500 }
    );
  }
}
