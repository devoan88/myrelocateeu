import Link from "next/link";
import type { Metadata } from "next";
import { PRIVACY_CONTACT_EMAIL } from "@/lib/legal/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How RelocateEU collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12">
        <article className="prose prose-slate mx-auto max-w-3xl">
          <h1>Privacy Policy</h1>
          <p className="lead text-slate-600">
            Last updated: March 1, 2026 · RelocateEU (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;)
          </p>

          <h2>1. Introduction</h2>
          <p>
            RelocateEU provides AI-powered relocation guidance for Austria,
            Germany, and Switzerland. We are committed to protecting your
            personal data in accordance with the General Data Protection
            Regulation (GDPR) and applicable EU data protection laws.
          </p>

          <h2>2. Data Controller</h2>
          <p>
            RelocateEU is the data controller for personal data collected through
            this website. Contact:{" "}
            <a href={`mailto:${PRIVACY_CONTACT_EMAIL}`}>{PRIVACY_CONTACT_EMAIL}</a>
          </p>

          <h2>3. Data We Collect</h2>
          <ul>
            <li>
              <strong>Account data:</strong> email address, name, and
              authentication identifiers when you register via Clerk (email/password
              or Google sign-in).
            </li>
            <li>
              <strong>Usage data:</strong> relocation preferences (origin and
              destination countries), checklist progress, and AI chat messages.
            </li>
            <li>
              <strong>Payment data:</strong> processed by Stripe; we do not store
              full card details.
            </li>
            <li>
              <strong>Technical data:</strong> IP address, browser type, and
              device information for security and rate limiting.
            </li>
            <li>
              <strong>Cookies:</strong> see Section 6 below.
            </li>
          </ul>

          <h2>4. Legal Basis for Processing</h2>
          <ul>
            <li>
              <strong>Contract:</strong> to provide relocation guides and
              subscription services you request.
            </li>
            <li>
              <strong>Legitimate interest:</strong> to improve our service,
              prevent fraud, and enforce rate limits.
            </li>
            <li>
              <strong>Consent:</strong> for non-essential cookies and marketing
              communications where applicable.
            </li>
            <li>
              <strong>Legal obligation:</strong> to comply with tax and accounting
              requirements.
            </li>
          </ul>

          <h2>5. Your Rights Under GDPR</h2>
          <p>You have the right to:</p>
          <ul>
            <li>
              <strong>Access</strong> — request a copy of your personal data.
            </li>
            <li>
              <strong>Rectification</strong> — correct inaccurate data.
            </li>
            <li>
              <strong>Erasure</strong> — request deletion (&quot;right to be
              forgotten&quot;).
            </li>
            <li>
              <strong>Restriction</strong> — limit how we process your data.
            </li>
            <li>
              <strong>Portability</strong> — receive your data in a structured
              format.
            </li>
            <li>
              <strong>Object</strong> — object to processing based on legitimate
              interests.
            </li>
            <li>
              <strong>Withdraw consent</strong> — at any time for consent-based
              processing.
            </li>
          </ul>
          <p>
            To exercise these rights, email{" "}
            <a href={`mailto:${PRIVACY_CONTACT_EMAIL}`}>{PRIVACY_CONTACT_EMAIL}</a>.
            We respond within 30 days. You may also lodge a complaint with your
            local supervisory authority.
          </p>

          <h2>6. Cookies</h2>
          <p>We use the following cookies:</p>
          <ul>
            <li>
              <strong>Essential:</strong> authentication session (Clerk),
              language preference, subscription plan cookie — required for the
              service to function.
            </li>
            <li>
              <strong>Functional:</strong> cookie consent preference stored in
              your browser.
            </li>
            <li>
              <strong>Analytics (optional):</strong> only loaded if you accept
              cookies via our consent banner.
            </li>
          </ul>
          <p>
            You can decline non-essential cookies via the banner. Essential
            cookies cannot be disabled while using the service. Manage browser
            cookies through your browser settings.
          </p>

          <h2>7. Data Retention</h2>
          <p>
            Account data is retained while your account is active and for up to
            3 years after deletion for legal compliance. AI chat logs are retained
            for 90 days. Payment records are kept for 7 years per tax law.
          </p>

          <h2>8. Third-Party Processors</h2>
          <ul>
            <li>Clerk — authentication</li>
            <li>Stripe — payments</li>
            <li>Supabase — database hosting (EU region recommended)</li>
            <li>Anthropic — AI processing (chat messages)</li>
            <li>Vercel — hosting</li>
            <li>Cloudflare — CDN and DDoS protection</li>
            <li>Resend — transactional email</li>
          </ul>
          <p>
            All processors operate under Data Processing Agreements with
            appropriate safeguards for international transfers (Standard
            Contractual Clauses where applicable).
          </p>

          <h2>9. International Transfers</h2>
          <p>
            Your data may be processed outside the EEA. We ensure adequate
            protection through SCCs, adequacy decisions, or equivalent safeguards.
          </p>

          <h2>10. Security</h2>
          <p>
            We use HTTPS encryption, Cloudflare protection, rate limiting,
            authenticated access controls, and regular security reviews.
          </p>

          <h2>11. Children</h2>
          <p>
            RelocateEU is not intended for users under 16. We do not knowingly
            collect data from children.
          </p>

          <h2>12. Changes</h2>
          <p>
            We may update this policy. Material changes will be notified via email
            or a site notice. Continued use constitutes acceptance.
          </p>

          <h2>13. Contact</h2>
          <p>
            Data protection inquiries:{" "}
            <a href={`mailto:${PRIVACY_CONTACT_EMAIL}`}>{PRIVACY_CONTACT_EMAIL}</a>
          </p>

          <p className="mt-8">
            <Link href="/" className="text-blue-600 hover:underline">
              ← Back to home
            </Link>
          </p>
        </article>
    </main>
  );
}
