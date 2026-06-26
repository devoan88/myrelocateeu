import type { Metadata } from "next";
import LegalPageLayout, { LegalLink, LegalSection } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How RelocateEU collects, uses, and protects your personal data.",
};

const SUPPORT_EMAIL = "support@relocateeu.com";

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <LegalSection title="1. Information We Collect">
        <p>We collect the following types of information:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-[#0F172A]">Account information</strong> — email
            address and name when you register
          </li>
          <li>
            <strong className="text-[#0F172A]">Relocation preferences</strong> — your
            destination country and origin country
          </li>
          <li>
            <strong className="text-[#0F172A]">Usage data</strong> — pages visited,
            features used, checklist progress, and interaction with guides
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="2. How We Use It">
        <p>We use your information to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Provide personalised relocation guides tailored to your situation</li>
          <li>Send reminders and updates about your relocation checklist</li>
          <li>Improve our service and fix technical issues</li>
          <li>Process subscriptions and communicate about your account</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Data Storage">
        <p>
          Your data is stored securely using Supabase, with servers located in the
          European Union. We retain your data while your account is active and for a
          limited period after deletion to comply with legal obligations.
        </p>
      </LegalSection>

      <LegalSection title="4. Third Parties">
        <p>We share data with trusted service providers only as needed to operate RelocateEU:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-[#0F172A]">Paddle</strong> — payment processing for
            subscriptions
          </li>
          <li>
            <strong className="text-[#0F172A]">Anthropic</strong> — AI-powered features
            such as chat assistance (message content only, when you use those features)
          </li>
        </ul>
        <p>
          These providers process data under data processing agreements with appropriate
          safeguards.
        </p>
      </LegalSection>

      <LegalSection title="5. Your Rights">
        <p>
          Under the GDPR, you have the right to access, rectify, delete, and port your
          personal data. You may also restrict or object to certain processing, and
          withdraw consent where processing is consent-based.
        </p>
        <p>
          To exercise any of these rights, email{" "}
          <LegalLink href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</LegalLink>. We
          respond within 30 days.
        </p>
      </LegalSection>

      <LegalSection title="6. Cookies">
        <p>
          We use essential cookies only — for authentication, language preferences, and
          core site functionality. We do not use advertising or tracking cookies.
        </p>
        <p>
          You can manage cookie preferences through your browser settings. Essential
          cookies are required for the service to function.
        </p>
      </LegalSection>

      <LegalSection title="7. Contact">
        <p>
          Privacy questions? Email{" "}
          <LegalLink href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</LegalLink>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
