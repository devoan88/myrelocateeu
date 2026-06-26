# RelocateEU — სრული მასტერ დოკუმენტი

### ანი დევდარიანი | ვენა, ავსტრია | 2026

---

## 1. პროდუქტის ვიზია

**რა არის RelocateEU?**
AI-powered relocation platform — ადამიანი შემოდის სად არის, გამოდის სად უნდა იყოს. ვიზა, ბანკი, სკოლა, სახლი, ჯანდაცვა, სამსახური — ყველაფერი ერთ ადგილზე, ქართულად, ინგლისურად, გერმანულად.

**ვისთვის:**
- ეტაპი 1: ქართველი ემიგრანტები → ავსტრია, გერმანია, შვეიცარია
- ეტაპი 2: ყველა ეროვნება → მთელი ევროპა
- ეტაპი 3: B2B — კომპანიები, რომლებიც თანამშრომლებს გადაყავთ

---

## 2. სრული ფუნქციების სია

### Core Features (MVP — პირველი ვერსია)
- [ ] Country selector + personalized checklist
- [ ] Progress tracker (checkbox + progress bar)
- [ ] Official source links (gov.at, bmi.gv.at)
- [ ] Last Updated თარიღი ყოველ ჩანაწერზე
- [ ] AI Chat (Claude API) — 3 შეტყობინება უფასოდ
- [ ] User accounts (Supabase Auth)
- [ ] Stripe subscription (Free / Premium €12/თვე)
- [ ] Admin dashboard — content management
- [ ] "Report outdated info" ღილაკი
- [ ] Disclaimer ყველა გვერდზე

### Premium Features (ეტაპი 2)
- [ ] **Visa Probability Calculator** — AI ითვლის შანსს
- [ ] **Document AI Scanner** — საბუთების შემოწმება
- [ ] **Cost of Life Simulator** — ქალაქების შედარება
- [ ] **Expat Buddy System** — peer matching
- [ ] **Community Verification** — crowdsourced fact-checking
- [ ] Email reminders — "გახსოვდეს: 30 დღეში ვადა"
- [ ] Document templates — წერილები, ფორმები
- [ ] Multilingual (KA / EN / DE / FR)

### განსაკუთრებული ფუნქციები — სხვას არ აქვს
- [ ] **"My Relocation Story"** — user-ები ყვებიან გამოცდილებას → ვლოგი
- [ ] **"AI Lawyer Mode"** — კომპლექსური სიტუაციების ახსნა
- [ ] **"Family Planner"** — ბავშვების სკოლა, ბაღი, ექიმი ერთ ეკრანზე
- [ ] **"Emergency Button"** — ავარიული სიტუაციებში სწრაფი სახელმძღვანელო
- [ ] **"Neighborhood Score"** — AI ითვლის: "ეს უბანი შენთვის 8.5/10"
- [ ] **"Integration Timeline"** — "6 თვეში ასე გამოიყურება შენი ცხოვრება"

---

## 3. Tech Stack — ყველაფერი რაც გჭირდება

| კომპონენტი | ინსტრუმენტი | ფასი |
|---|---|---|
| Frontend | Next.js 14 + Tailwind | უფასო |
| Hosting | Vercel | უფასო (starter) |
| Database | Supabase | უფასო (50k rows) |
| Auth | Supabase Auth | უფასო |
| AI Chat | Claude API (Anthropic) | $3/მილიონ token |
| Payments | Stripe | 2.9% + 30¢ per transaction |
| Security | Cloudflare | უფასო |
| Email | Resend | უფასო (3k/თვე) |
| Analytics | Google Analytics | უფასო |
| Domain | Namecheap | ~€12/წელი |

**პირველი თვის ხარჯი: ~€50-100** (domain + Claude API calls)

---

## 4. შემოსავლის სრული სტრუქტურა

### B2C (პირდაპირ მომხმარებლებისგან)
- Free tier: 0€ (lead magnet)
- Premium: €12/თვე ან €99/წელი
- Pro: €29/თვე (AI lawyer mode + buddy + priority)

### B2B (კომპანიებისგან)
- Starter: €199/თვე (10 თანამშრომელი)
- Business: €499/თვე (50 თანამშრომელი)
- Enterprise: custom pricing

### Affiliate
- N26 / Revolut: €15-50 per referral
- სადაზღვევო: €30-100 per referral
- Immoscout24 / Willhaben: €20-40 per lead
- ენის სკოლები: 10-15% commission

### მომავალი
- Marketplace: ადვოკატები, თარჯიმნები, იჯარის აგენტები
- Sponsored listings: ვენის ქართული ბიზნესები
- White-label: სხვა კომპანიებისთვის RelocateEU-ს გაყიდვა

### პროგნოზი
| თვე | Users | შემოსავალი |
|---|---|---|
| 3 | 100 | €1,200 |
| 6 | 500 | €6,000 |
| 12 | 1,500 | €18,000 + affiliate |
| 24 | 5,000+ | €60,000+ |

---

## 5. სრული Cursor Prompt სერია (8 + 4 bonus)

### PROMPT 1 — პროექტის საფუძველი
```
Create a web app called RelocateEU using Next.js 14 with App Router and Tailwind CSS.

Homepage:
- Navigation: Logo "RelocateEU" + Login + "Get Started" button
- Hero: headline "Move to Europe with confidence", subheadline "Your AI-powered relocation guide for Austria, Germany and Switzerland"
- Two dropdowns: destination country (Austria, Germany, Switzerland) and origin country (Georgia, Ukraine, Armenia, India, Other)
- "Get my free guide" CTA button
- Features section: 4 cards showing key benefits
- Footer with disclaimer: "RelocateEU provides informational content only, not legal advice."

Design: clean, professional, blue (#2563EB) and white. Mobile responsive. Font: DM Sans from Google Fonts.

Set up all files, tailwind.config.js, and package.json with all dependencies.
```

### PROMPT 2 — Country Intelligence Database
```
Create a comprehensive data structure for relocation guides.

File: /data/countries/austria.ts

Structure:
{
  country: "Austria",
  flag: "🇦🇹",
  capital: "Vienna",
  language: "German",
  disclaimer: "This is informational content only. Always verify on official government websites. This is not legal advice.",
  visaTypes: [
    {
      id: "red-white-red",
      name: "Red-White-Red Card",
      for: "Skilled workers",
      requirements: ["Job offer", "Qualification recognition", "German B1"],
      officialLink: "https://www.migration.gv.at",
      processingTime: "8-12 weeks",
      lastUpdated: "2026-05-01"
    }
  ],
  steps: [
    {
      id: "meldezettel",
      category: "registration",
      title: "Meldezettel — Registration",
      description: "Register your address within 3 days of moving in.",
      documents: ["Passport", "Rental contract", "Meldezettel form"],
      officialWebsite: "https://www.wien.gv.at",
      estimatedDays: 1,
      isFree: true,
      lastUpdated: "2026-05-01"
    }
  ]
}

Create similar files for germany.ts and switzerland.ts with real, accurate data from official sources.
```

### PROMPT 3 — Personalized Guide Page
```
Create /guide page.

Logic:
- Read URL params: ?destination=austria&origin=georgia&hasChildren=true
- Filter steps based on user profile
- If Georgia + Austria: note visa-free 90 days, but residence permit needed after
- If hasChildren: add school enrollment section (Volksschule, Mittelschule)
- Sort steps by category: registration → banking → health → housing → school → work

UI:
- Progress bar at top: "You've completed X of Y steps"
- Accordion for each step with checkbox
- Each step shows: title, description, documents needed, official link, time estimate, last verified date
- Yellow warning box: "Verify all information on official government websites before acting. Laws change frequently."
- "Report outdated info" link on each step

Save checkbox state to localStorage for now.
```

### PROMPT 4 — AI Chat Assistant
```
Add AI chat using Anthropic Claude API.

File: /app/api/chat/route.ts

System prompt:
"You are the RelocateEU assistant. You help people relocating to Austria, Germany, or Switzerland. 

Rules:
1. Always cite specific official government websites (gov.at, bmi.gv.at, bamf.de, sem.admin.ch)
2. Always end with: 'This is general information, not legal advice. Verify on official websites.'
3. If you are unsure, say 'I'm not certain — please check [official source] directly.'
4. Never make up visa requirements or deadlines.
5. Be warm, practical, and specific.
6. Answer in the same language the user writes in."

Features:
- Pass user profile (destination, origin, family status) in every request
- Free users: 3 messages per day (track in localStorage)
- Premium: unlimited
- Show "Powered by Claude AI" + disclaimer below chat
- Floating button bottom-right corner
- Chat opens as slide-up panel
```

### PROMPT 5 — Visa Probability Calculator
```
Create a /calculator page called "Visa Probability Calculator".

Form fields:
- Destination country (Austria / Germany / Switzerland)
- Visa type (Work / Family / Student / Digital Nomad)
- Education level (High school / Bachelor / Master / PhD)
- Years of work experience (0-20 slider)
- Speaks German? (None / A1 / A2 / B1 / B2 / C1)
- Has job offer? (Yes / No)
- Monthly income in home country (slider €0 - €5000)
- Family members joining? (Number)

Logic: weighted scoring algorithm
- PhD + job offer + B2 German = ~92% probability
- High school + no offer + no German = ~23%

Output:
- Large percentage display with color (green >70%, yellow 40-70%, red <40%)
- "Your strongest factors" list
- "What would improve your chances" suggestions
- CTA: "Get full personalized guide →"

Add disclaimer: "This estimate is based on general criteria. Individual cases vary. Consult an immigration lawyer for your specific situation."
```

### PROMPT 6 — Document Scanner
```
Create a /documents page called "Document Checker".

Feature: User uploads their documents (passport, contract, diploma) as images or PDFs.

For each document type, check:
- Passport: expiry date (warn if < 6 months), nationality detected
- Employment contract: type (permanent/temporary), salary mentioned
- Diploma: education level detected

After upload, show:
- Checklist: "For Red-White-Red Card you need: ✓ Passport ✓ Contract ✗ German certificate (missing)"
- Missing documents list with links to get them
- "Your documents expire on X — start visa process before Y"

Use Claude API vision to analyze documents.
Add clear disclaimer: "Documents are analyzed locally and never stored on our servers."
```

### PROMPT 7 — Cost of Life Simulator
```
Create an interactive /cost-calculator page.

Sliders and inputs:
- Number of adults (1-4)
- Number of children (0-5)
- Apartment size (1 room / 2 rooms / 3 rooms / 4+ rooms)
- City (Vienna / Berlin / Munich / Zurich / Geneva / Hamburg)
- Has car? (Yes / No)
- Lifestyle (Budget / Moderate / Comfortable / Luxury)

Real data (use these approximate 2026 figures):
- Vienna 2-room apartment: €1,100-1,600/month
- Berlin 2-room: €1,200-1,800/month
- Munich 2-room: €1,500-2,200/month
- Zurich 2-room: CHF 2,200-3,200/month
- Groceries Vienna: €300-500/person/month
- Public transport Vienna: €30/month (Jahreskarte)

Output:
- Monthly total breakdown by category
- Comparison bar chart: selected city vs 2 other cities
- "You need to earn €X/month net to live comfortably here"
- Affiliate links to relevant services (insurance, banking)
```

### PROMPT 8 — Expat Buddy System
```
Create a /community page called "Expat Buddy".

How it works:
1. New user fills profile: origin country, destination, move date, interests (family/work/language)
2. System matches them with people who moved 3-12 months ago to the same city
3. Both users see: origin, destination, common interests, move date
4. Can send message request (premium feature)

Database (Supabase):
- buddy_profiles table: user_id, origin, destination, city, move_date, bio, interests[], is_visible
- buddy_requests table: from_id, to_id, status, created_at

UI:
- Profile cards with avatar initials, city, "moved 4 months ago", interests tags
- "Connect" button (sends notification)
- Filter by: city, origin country, interests
- Privacy: real names only shown after both accept

Free: view profiles
Premium: send connection requests
```

### BONUS PROMPT A — Admin Dashboard
```
Create /admin page (protected — only admin@relocateeu.com can access).

Features:
1. Content health dashboard:
   - List all guide entries with lastUpdated date
   - Red highlight: entries older than 90 days
   - Yellow highlight: entries older than 30 days
   - Green: updated in last 30 days
   
2. Edit any entry inline — auto-sets lastUpdated to today

3. Stats cards:
   - Total registered users
   - Premium users
   - Most visited guide sections
   - "Report outdated" submissions queue

4. Update log: "Austria Meldezettel updated by admin — June 1, 2026"

This ensures information stays accurate and trustworthy.
```

### BONUS PROMPT B — SEO + Launch
```
Optimize RelocateEU for search engines.

Add to every page:
- Meta title and description
- Open Graph tags for social sharing
- Structured data (JSON-LD) for FAQ pages

Create these SEO-optimized pages:
- /relocate-to-austria-from-georgia (Georgian expat guide)
- /relocate-to-germany-guide
- /austria-visa-types-2026
- /vienna-cost-of-living-2026

Each page: 800+ words, real information, official links, FAQ section.

Generate /sitemap.xml automatically from all pages.
Add robots.txt.

These pages will rank on Google within 2-3 months and bring free traffic.
```

### BONUS PROMPT C — Email System
```
Add email notifications using Resend API.

Triggers:
1. Welcome email: when user registers
2. Weekly digest: "Your relocation progress — you've completed X of Y steps"
3. Reminder: "Important: Your Meldezettel registration is due in 7 days"
4. Expiry alert: "Your document expires in 30 days — renew now"

Templates: clean HTML email, RelocateEU branding, unsubscribe link always visible.

Add email preferences page: user can choose which notifications to receive.
```

### BONUS PROMPT D — Mobile App Prep
```
Convert RelocateEU to also work as a Progressive Web App (PWA).

Add to next.config.js: PWA configuration
Add manifest.json: app name, icons, theme color
Add service worker: cache key pages for offline access

This lets users "install" RelocateEU on their phone home screen without App Store.
Later we can convert to React Native for a real native app.

Also add: offline mode message when user has no internet: 
"You're offline. Your saved checklist is still available."
```

---

## 6. რისკები და გამოსავლები — სრული ანალიზი

| რისკი | სიმძიმე | გამოსავალი |
|---|---|---|
| მოძველებული ინფო | მაღალი | Kvirauri reminder, admin dashboard |
| GDPR დარღვევა | მაღალი | ადვოკატი €300, cookie consent |
| კონკურენტი გამოჩნდება | საშუალო | Community + ქართული ნიში = ფორი |
| AI-ი შეცდომით პასუხობს | საშუალო | Disclaimer ყველგან + official links |
| 0→100 user-ის მიღება | საშუალო | Facebook ჯგუფები, PR, პირადი ქსელი |
| Server ჩავარდება | დაბალი | Vercel 99.9% uptime |
| Stripe ბლოკი | დაბალი | Stripe ავსტრია — სრულად ლეგალური |

---

## 7. Marketing — პირველი 90 დღე

**კვირა 1-2:** MVP გაშვება
- 10 მეგობარი → უფასო beta-ტესტერები
- Feedback → სწრაფი გამოსწორება

**კვირა 3-4:** ვენა
- Facebook: "Ქართველები ავსტრიაში" ჯგუფი (5,000+)
- Post: "გავაკეთე ეს, იმიტომ რომ ჩემი გამოცდილება..."
- პირდაპირ 50 user

**თვე 2:** მედია
- Formula ტელევიზია / Rustavi 2 ონლაინ — "ქართველი ვენაში შექმნა..."
- LinkedIn post ინგლისურად
- Reddit: r/expats, r/germany, r/austria

**თვე 3:** B2B
- ვენის ქართული კომპანიები — "გამოიყენეთ თქვენი გუნდისთვის"
- ავსტრიული IT კომპანიები — "hire internationally"

---

## 8. განსაკუთრებული კონცეფცია — "The Founder Story"

ეს არის შენი საიდუმლო იარაღი, ანი.

RelocateEU-ს About გვერდზე იყოს:

> "I'm Ani Devdariani. I moved to Vienna with two children, not knowing German, not knowing the system. I spent weeks searching for information that should have taken hours to find. I built RelocateEU because nobody should feel alone in that process."

ეს ერთი პარაგრაფი ათასი რეკლამის ტოლია. ადამიანი ენდობა ადამიანს — არა კომპანიას.

---

## 9. Investor Pitch — მომავლისთვის

როდესაც 1,000 user-ს მიაღწევ, ამ ფრაზებით შეგიძლია ინვესტორებთან საუბარი:

- "Global mobility market: $100B+"
- "We serve the underserved — individual expats, not corporations"
- "Unit economics: €12/month, 85% gross margin"
- "Community moat — data and trust that competitors cannot replicate"
- "Founder-market fit: I am my own customer"

---

## 10. ერთი წლის შემდეგ — სად უნდა იყო

- 2,000+ premium subscribers
- ევროპის 10+ ქვეყანა
- B2B — 20+ კომპანია
- Media coverage: TechCrunch, Forbes Georgia
- Team: შენ + 1 editor + 1 developer (part-time)
- შემოსავალი: €20,000+ / თვეში
- Seed funding: $500k - $1M discussion

---

*RelocateEU — Built by an expat, for expats.*
*"Move with confidence."*
