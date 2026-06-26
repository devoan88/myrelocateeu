import type { Metadata } from "next";
import LegalPageLayout, { LegalLink, LegalSection } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "RelocateEU terms of service — subscription plans, refunds, and usage terms.",
};

const SUPPORT_EMAIL = "support@relocateeu.com";

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service">
      <LegalSection title="1. Acceptance of Terms">
        <p>
          By accessing or using RelocateEU (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), you agree
          to be bound by these Terms of Service. If you do not agree, please do not use
          the service.
        </p>
      </LegalSection>

      <LegalSection title="2. Description of Service">
        <p>
          RelocateEU provides informational relocation guides for European destinations.
          Our content is designed to help you understand relocation steps and link you to
          official government sources.
        </p>
        <p>
          RelocateEU does not provide legal, immigration, tax, or financial advice. You
          should always verify information with official authorities before making decisions.
        </p>
      </LegalSection>

      <LegalSection title="3. Subscriptions">
        <p>We offer paid subscription plans:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-[#0F172A]">Premium</strong> — €12/month
          </li>
          <li>
            <strong className="text-[#0F172A]">Pro</strong> — €29/month
          </li>
        </ul>
        <p>
          Subscriptions renew automatically unless cancelled. You may cancel at any time
          from your account settings. Cancellation takes effect at the end of the current
          billing period.
        </p>
      </LegalSection>

      <LegalSection title="4. Refund Policy">
        <p>
          We offer a full refund within 30 days of your initial purchase. See our{" "}
          <LegalLink href="/refund">Refund Policy</LegalLink> for details on how to
          request a refund.
        </p>
      </LegalSection>

      <LegalSection title="5. Disclaimer">
        <p>
          All information on RelocateEU is provided for general informational purposes
          only. It is not legal, immigration, financial, or professional advice. Laws and
          requirements change frequently — always confirm details on official government
          websites before acting.
        </p>
        <p>
          RelocateEU is not affiliated with any government authority.
        </p>
      </LegalSection>

      <LegalSection title="6. Limitation of Liability">
        <p>
          To the fullest extent permitted by law, RelocateEU and its operators shall not
          be liable for any indirect, incidental, special, consequential, or punitive
          damages arising from your use of the service.
        </p>
        <p>
          Our total liability for any claim related to the service shall not exceed the
          amount you paid us in the twelve months preceding the claim.
        </p>
      </LegalSection>

      <LegalSection title="7. Contact">
        <p>
          Questions about these terms? Email us at{" "}
          <LegalLink href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</LegalLink>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
