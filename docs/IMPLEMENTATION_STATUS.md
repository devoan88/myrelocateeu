# RelocateEU — Implementation status vs MASTER.md

Last updated: 2026-05-30. See [MASTER.md](./MASTER.md) for full product vision.

## MVP (Core)

| Feature | Status | Notes |
|---------|--------|-------|
| Country selector + checklist | ✅ Done | `/` → `/results` |
| Progress tracker | ✅ Done | Checkboxes + progress bar |
| Official source links | ✅ Done | Per step in Supabase / seed |
| Last verified date | ✅ Done | "Last verified" + admin flags 30d/90d |
| AI Chat (Claude) | ⚠️ Partial | Premium/Pro only; not 3 free/day |
| User accounts | ⚠️ Partial | Clerk in deps; sign-in not wired |
| Stripe (Free / Premium / Pro) | ✅ Done | €12 / €29 tiers |
| Admin dashboard | ⚠️ Partial | `/admin` + edit; no user stats queue |
| Report outdated info | ✅ Done | Email via Resend |
| Disclaimer everywhere | ⚠️ Partial | AI disclaimer component; no site footer |

## Prompt series

| # | Topic | Status |
|---|--------|--------|
| 1 | Homepage foundation | ⚠️ Missing features section + footer disclaimer |
| 2 | Country TS files (`/data/countries`) | ❌ Using Supabase `relocation_info` instead |
| 3 | `/guide` page | ⚠️ Implemented as `/results` |
| 4 | AI chat | ⚠️ Different limits than spec |
| 5 | Visa calculator | ❌ |
| 6 | Document scanner | ❌ |
| 7 | Cost of life | ❌ |
| 8 | Expat buddy | ❌ |
| A | Admin dashboard | ⚠️ Core done |
| B | SEO pages | ⚠️ `sitemap.xml` only |
| C | Email system | ⚠️ Admin/cron only |
| D | PWA | ❌ |

## Infrastructure

| Item | Status |
|------|--------|
| Vercel + `vercel.json` cron | ✅ |
| `.env.example` | ✅ |
| Security headers | ✅ |
| Google Analytics (consent-gated) | ✅ |
| Cloudflare guide | ✅ `docs/CLOUDFLARE_DNS.md` |
| Privacy / cookies | ✅ |

## Suggested next steps (launch MVP)

1. Homepage: 4 feature cards + global legal footer
2. Wire Clerk auth + free tier (3 AI messages/day or 10/hour per security spec)
3. Attach `AiDisclaimer` to all AI outputs
4. `/about` with founder story (§8 in MASTER)
5. Germany + Switzerland Supabase seed (Austria exists)
