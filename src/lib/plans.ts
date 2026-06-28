import { cookies } from "next/headers";
import {
  getAiQuestionsLimit,
  PLAN_FEATURES,
  type PlanFeatures,
  type PlanTier,
} from "@/lib/features";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { createClientIfConfigured } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";

const PLAN_COOKIE = "relocateeu_plan_id";

export type UserPlanRecord = {
  id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  email: string | null;
  plan: PlanTier;
  subscription_status: string | null;
  chat_messages_used: number;
  chat_period_start: string;
};

export type UserPlanContext = {
  plan: PlanTier;
  record: UserPlanRecord | null;
  features: PlanFeatures;
  chatMessagesRemaining: number;
};

const FREE_CONTEXT: UserPlanContext = {
  plan: "free",
  record: null,
  features: PLAN_FEATURES.free,
  chatMessagesRemaining: 0,
};

export async function getUserPlan(): Promise<UserPlanContext> {
  const supabase = await createClientIfConfigured();
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan")
        .eq("id", user.id)
        .maybeSingle();

      const plan = (profile?.plan as PlanTier) ?? "free";
      const features = PLAN_FEATURES[plan] ?? PLAN_FEATURES.free;
      const limit = getAiQuestionsLimit(plan);

      return {
        plan,
        record: null,
        features,
        chatMessagesRemaining: limit === "unlimited" ? Infinity : limit,
      };
    }
  }

  const cookieStore = await cookies();
  const planCookie = cookieStore.get(PLAN_COOKIE);

  if (!planCookie?.value) {
    return FREE_CONTEXT;
  }

  const admin = createSupabaseAdmin();
  if (!admin) {
    return FREE_CONTEXT;
  }

  const { data, error } = await admin
    .from("user_plans")
    .select("*")
    .eq("id", planCookie.value)
    .maybeSingle();

  if (error || !data) {
    return FREE_CONTEXT;
  }

  const record = data as UserPlanRecord;
  const plan = record.plan as PlanTier;

  if (record.stripe_subscription_id && process.env.STRIPE_SECRET_KEY) {
    try {
      const stripe = getStripe();
      const subscription = await stripe.subscriptions.retrieve(
        record.stripe_subscription_id
      );

      if (
        subscription.status !== "active" &&
        subscription.status !== "trialing"
      ) {
        await admin
          .from("user_plans")
          .update({ plan: "free", subscription_status: subscription.status })
          .eq("id", record.id);

        return FREE_CONTEXT;
      }
    } catch {
      return FREE_CONTEXT;
    }
  }

  const features = PLAN_FEATURES[plan] ?? PLAN_FEATURES.free;
  const limit = getAiQuestionsLimit(plan);

  if (limit === "unlimited") {
    return {
      plan,
      record,
      features,
      chatMessagesRemaining: Infinity,
    };
  }

  const today = new Date().toISOString().slice(0, 10);
  const sameDay = record.chat_period_start === today;
  const used = sameDay ? record.chat_messages_used : 0;
  const chatMessagesRemaining = Math.max(0, limit - used);

  return {
    plan,
    record,
    features,
    chatMessagesRemaining,
  };
}

export async function setPlanCookie(planId: string) {
  const cookieStore = await cookies();
  cookieStore.set(PLAN_COOKIE, planId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });
}

export async function upsertUserPlanFromStripe(params: {
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  email: string | null;
  plan: PlanTier;
  subscriptionStatus: string;
}): Promise<string | null> {
  const admin = createSupabaseAdmin();
  if (!admin) return null;

  const { data: existing } = await admin
    .from("user_plans")
    .select("id")
    .eq("stripe_subscription_id", params.stripeSubscriptionId)
    .maybeSingle();

  const payload = {
    stripe_customer_id: params.stripeCustomerId,
    stripe_subscription_id: params.stripeSubscriptionId,
    email: params.email,
    plan: params.plan,
    subscription_status: params.subscriptionStatus,
    updated_at: new Date().toISOString(),
  };

  if (existing?.id) {
    const { data, error } = await admin
      .from("user_plans")
      .update(payload)
      .eq("id", existing.id)
      .select("id")
      .single();

    return error ? null : data.id;
  }

  const { data, error } = await admin
    .from("user_plans")
    .insert(payload)
    .select("id")
    .single();

  return error ? null : data.id;
}

export async function downgradeUserPlan(stripeSubscriptionId: string) {
  const admin = createSupabaseAdmin();
  if (!admin) return;

  const { data: existing } = await admin
    .from("user_plans")
    .select("email")
    .eq("stripe_subscription_id", stripeSubscriptionId)
    .maybeSingle();

  await admin
    .from("user_plans")
    .update({
      plan: "free",
      subscription_status: "canceled",
      stripe_subscription_id: null,
    })
    .eq("stripe_subscription_id", stripeSubscriptionId);

  if (existing?.email) {
    await syncProfilePlan({ email: existing.email, plan: "free", planExpiresAt: null });
  }
}

export async function syncProfilePlan(params: {
  userId?: string | null;
  email?: string | null;
  plan: PlanTier;
  planExpiresAt: Date | null;
}): Promise<void> {
  const admin = createSupabaseAdmin();
  if (!admin) return;

  const payload = {
    plan: params.plan,
    plan_expires_at: params.planExpiresAt?.toISOString() ?? null,
    updated_at: new Date().toISOString(),
  };

  if (params.userId) {
    await admin.from("profiles").update(payload).eq("id", params.userId);
    return;
  }

  if (params.email) {
    await admin.from("profiles").update(payload).eq("email", params.email);
  }
}

export async function syncPlanFromSubscription(params: {
  userId?: string | null;
  email?: string | null;
  plan: PlanTier;
  subscription: { current_period_end: number; status: string };
}): Promise<void> {
  const active =
    params.subscription.status === "active" ||
    params.subscription.status === "trialing";

  await syncProfilePlan({
    userId: params.userId,
    email: params.email,
    plan: active ? params.plan : "free",
    planExpiresAt: active
      ? new Date(params.subscription.current_period_end * 1000)
      : null,
  });
}

export async function incrementChatUsage(planId: string): Promise<boolean> {
  const admin = createSupabaseAdmin();
  if (!admin) return false;

  const { data } = await admin
    .from("user_plans")
    .select("chat_messages_used, chat_period_start, plan")
    .eq("id", planId)
    .single();

  if (!data) return false;

  const today = new Date().toISOString().slice(0, 10);
  const sameDay = data.chat_period_start === today;

  const used = sameDay ? data.chat_messages_used + 1 : 1;

  await admin
    .from("user_plans")
    .update({
      chat_messages_used: used,
      chat_period_start: today,
    })
    .eq("id", planId);

  return true;
}

export async function verifyCheckoutSession(sessionId: string): Promise<{
  planId: string;
  plan: PlanTier;
} | null> {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["subscription", "customer"],
  });

  if (session.mode !== "subscription" || !session.subscription) {
    return null;
  }

  const subscription =
    typeof session.subscription === "string"
      ? await stripe.subscriptions.retrieve(session.subscription)
      : session.subscription;

  if (subscription.status !== "active" && subscription.status !== "trialing") {
    return null;
  }

  const plan = (session.metadata?.plan ??
    subscription.metadata?.plan ??
    "premium") as PlanTier;

  if (plan !== "premium" && plan !== "pro") {
    return null;
  }

  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id;

  if (!customerId) return null;

  const planId = await upsertUserPlanFromStripe({
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscription.id,
    email: session.customer_details?.email ?? session.customer_email ?? null,
    plan,
    subscriptionStatus: subscription.status,
  });

  if (!planId) return null;

  return { planId, plan };
}

// Backward-compatible helper
export async function isPremiumUser(): Promise<boolean> {
  const { plan } = await getUserPlan();
  return plan === "premium" || plan === "pro";
}

export async function hasFullChecklistAccess(): Promise<boolean> {
  const { plan } = await getUserPlan();
  return plan !== "free";
}
