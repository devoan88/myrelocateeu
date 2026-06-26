import type { Metadata } from "next";
import LegalPageLayout, { LegalLink, LegalSection } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "RelocateEU 30-day money-back guarantee and cancellation policy.",
};

const SUPPORT_EMAIL = "support@relocateeu.com";

export default function RefundPage() {
  return (
    <LegalPageLayout title="Refund Policy">
      <LegalSection title="1. 30-Day Money-Back Guarantee">
        <p>
          We offer a full refund within 30 days of your initial purchase — no questions
          asked. If RelocateEU is not right for you, we will refund your payment in full.
        </p>
      </LegalSection>

      <LegalSection title="2. How to Request a Refund">
        <p>
          Email{" "}
          <LegalLink href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</LegalLink> with
          the email address associated with your account and a brief note that you would
          like a refund. We will confirm once your request is received.
        </p>
      </LegalSection>

      <LegalSection title="3. Processing Time">
        <p>
          Refunds are processed within 5–10 business days. The refund will be returned
          to your original payment method. Depending on your bank or card provider, it
          may take additional time to appear on your statement.
        </p>
      </LegalSection>

      <LegalSection title="4. Exceptions">
        <p>
          There are no exceptions — all plans (Premium and Pro) are eligible for the
          30-day money-back guarantee on initial purchase.
        </p>
      </LegalSection>

      <LegalSection title="5. Cancellation">
        <p>
          You can cancel your subscription at any time from your account settings. After
          cancellation, you retain access until the end of your current billing period.
          No further charges will be made.
        </p>
        <p>
          Cancelling does not automatically trigger a refund outside the 30-day guarantee
          window. For refund requests within 30 days, email{" "}
          <LegalLink href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</LegalLink>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
