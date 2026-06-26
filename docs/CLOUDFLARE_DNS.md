# Cloudflare DNS Setup Guide for RelocateEU

This guide walks you through connecting your domain to RelocateEU on Vercel with Cloudflare for CDN, DDoS protection, and SSL.

## Prerequisites

- A registered domain (e.g. `relocateeu.com`)
- A [Cloudflare](https://dash.cloudflare.com) account (free plan works)
- RelocateEU deployed on [Vercel](https://vercel.com)

---

## Step 1: Add your domain to Cloudflare

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Add a site** and enter your domain
3. Select the **Free** plan
4. Cloudflare will scan existing DNS records — review and continue
5. Update your domain registrar's nameservers to the two Cloudflare nameservers shown (e.g. `ada.ns.cloudflare.com`, `bob.ns.cloudflare.com`)
6. Wait for propagation (usually 5–30 minutes, up to 24 hours)

---

## Step 2: Add domain to Vercel

1. Open your RelocateEU project in Vercel → **Settings** → **Domains**
2. Add your domain: `relocateeu.com` and `www.relocateeu.com`
3. Vercel shows the required DNS records — keep this tab open

---

## Step 3: Configure DNS records in Cloudflare

In Cloudflare → **DNS** → **Records**, add or update:

| Type  | Name | Content              | Proxy status | TTL  |
|-------|------|----------------------|--------------|------|
| CNAME | `@`  | `cname.vercel-dns.com` | Proxied (orange cloud) | Auto |
| CNAME | `www`| `cname.vercel-dns.com` | Proxied (orange cloud) | Auto |

> **Note:** If your apex domain (`@`) requires an A record, use Vercel's recommended A record (`76.76.21.21`) with **Proxied** enabled instead.

### Recommended additional records

| Type | Name | Content | Purpose |
|------|------|---------|---------|
| TXT | `@` | `v=spf1 include:_spf.resend.com ~all` | Email (Resend) |
| CNAME | `clerk` | *(from Clerk dashboard)* | Authentication |
| CNAME | `stripe` | *(if using Stripe custom domain)* | Payments |

---

## Step 4: SSL/TLS settings

1. Cloudflare → **SSL/TLS** → **Overview**
2. Set encryption mode to **Full (strict)**
3. Enable **Always Use HTTPS** under **SSL/TLS** → **Edge Certificates**
4. Enable **Automatic HTTPS Rewrites**

Vercel provides a valid certificate automatically once DNS is verified.

---

## Step 5: Security settings (recommended)

### Firewall

Cloudflare → **Security** → **Settings**:
- **Security Level:** Medium
- **Bot Fight Mode:** On (free plan)

### Rate limiting (optional, paid)

For additional API protection beyond app-level limits, create a Cloudflare Rate Limiting rule:
- Path: `/api/chat`
- Threshold: 20 requests per minute per IP

### WAF

Enable **Managed Rules** (free tier includes basic OWASP rules).

---

## Step 6: Environment variables

Update Vercel environment variables after DNS is live:

```
NEXT_PUBLIC_APP_URL=https://relocateeu.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
```

Redeploy after changing env vars.

---

## Step 7: Clerk production URLs

In [Clerk Dashboard](https://dashboard.clerk.com) → **Configure** → **Paths**:
- Sign-in URL: `https://relocateeu.com/sign-in`
- Sign-up URL: `https://relocateeu.com/sign-up`
- After sign-in: `https://relocateeu.com`
- After sign-up: `https://relocateeu.com`

Add `relocateeu.com` to **Allowed origins**.

---

## Step 8: Verify deployment

1. Visit `https://relocateeu.com` — confirm SSL padlock
2. Check Cloudflare → **Analytics** → **Traffic** for proxied requests
3. Test sign-in, AI chat, and Stripe checkout on production
4. Run [SSL Labs test](https://www.ssllabs.com/ssltest/) — aim for A or A+

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Too many redirects | Set SSL mode to **Full (strict)**, not Flexible |
| 522 error | Vercel project may be down; check Vercel status |
| Clerk auth fails | Verify Clerk allowed origins include your domain |
| DNS not propagating | Confirm nameservers at registrar match Cloudflare |

---

## Support

- Cloudflare docs: https://developers.cloudflare.com/dns/
- Vercel custom domains: https://vercel.com/docs/projects/domains
- RelocateEU privacy: privacy@relocateeu.com
