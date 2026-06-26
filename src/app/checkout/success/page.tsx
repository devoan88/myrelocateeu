import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setPlanCookie, verifyCheckoutSession } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Checkout complete",
  description: "Your RelocateEU subscription is being confirmed.",
  robots: { index: false, follow: false },
};

type CheckoutSuccessPageProps = {
  searchParams: { session_id?: string };
};

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const { session_id } = searchParams;

  if (!session_id) {
    redirect("/pricing");
  }

  try {
    const result = await verifyCheckoutSession(session_id);
    if (result) {
      await setPlanCookie(result.planId);
      redirect(`/pricing?success=${result.plan}`);
    }
  } catch {
    redirect("/pricing");
  }

  redirect("/pricing");
}
