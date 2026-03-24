# Minimalist Entrepreneur Skills Applied to ClaimIt

> Skills from [slavingia/skills](https://github.com/slavingia/skills) run against ClaimIt's actual state as of March 2026.
>
> Skipped: `/find-community` (community = SEA consumers, already defined), `/validate-idea` (already built), `/mvp` (already shipped), `/company-values` (deferred — no hires imminent).
>
> Run: `/pricing`, `/first-customers`, `/marketing-plan`, `/grow-sustainably`, `/minimalist-review`

---

## `/pricing`

**Context fed in:**
- Product: ClaimIt — AI-powered complaint filing platform for Southeast Asia
- Costs: Anthropic API (~$0.003/complaint draft), Supabase (~$25/mo base), Resend (~$20/mo), Vercel (~$20/mo). Fixed infra costs ~$65/mo.
- DB has tiers: `free`, `basic`, `pro`, `enterprise` — none are enforced yet
- Competition: None charging for this in SEA. Most consumer rights resources are government portals (free, but unusable). LegalZoom-equivalents charge $50-200/document but don't exist in SEA at scale.
- Currencies supported: IDR, USD, SGD, MYR, PHP, THB, VND

---

### Recommendation: Value-based pricing, three tiers

**The minimalist principle here:** "Always charge something. Even $1 changes the relationship."

The core value ClaimIt delivers is not "an AI draft" — it's **time saved and psychological relief**. Filing a formal complaint manually takes 3-6 hours of research, drafting, and navigating regulator websites. ClaimIt collapses this to ~10 minutes. That's worth charging for.

#### Tier structure

| Tier | Price | What's included | Rationale |
|---|---|---|---|
| **Free** | $0 | 1 complaint/month, watermarked PDF, no email send | Entry point; lets users experience the value |
| **Basic** | $4.99/mo (≈ Rp 75k · RM 22 · ₱290) | 5 complaints/month, email send, PDF download, case history | Core paying tier; covers costs at ~15 users |
| **Pro** | $12.99/mo (≈ Rp 200k · RM 57 · ₱750) | Unlimited complaints, priority AI, bulk export, follow-up drafts | Power users, small businesses, journalists |

> Do not launch an Enterprise tier until 3+ companies ask for it. Build it for them, not speculatively.

#### Pricing principles applied

1. **Cost coverage:** At Basic ($4.99), you need 14 paying users to break even on fixed infra. That's a very low bar.
2. **Value anchor:** In SEA, a single resolved complaint (e.g., RM 500 refund) is worth 100x the Basic price. Users who get results will pay.
3. **Currency sensitivity:** IDR prices should be round numbers (Rp 75.000, not Rp 74.900). Avoid $-signs on Indonesian pages — use `Rp` throughout the `/id/` locale.
4. **No free trial with credit card.** Friction before trust = churn. Let the free tier do the trial work.

#### When to revisit pricing

- After first 50 paying users: check if Pro/Basic ratio is healthy (target 30% Pro)
- If AI costs spike: add a per-complaint overage at $0.50 rather than raising tiers
- If businesses start using it for bulk complaints: create a per-seat Enterprise plan then

#### Immediate action

Remove all "coming soon" placeholders around subscriptions. Enforce the `free` tier limit (1 complaint/month) in `/api/cases` — this is the natural upgrade trigger. Ship Basic and Pro via Stripe Checkout before acquiring any paid marketing.

---

## `/first-customers`

**Context fed in:**
- Product: ClaimIt, Indonesian-first consumer complaint platform
- Current users: 0 (just launched)
- Target: first 100 users who file real complaints
- Timeline: 3 months

---

### Recommendation: Skip the launch. Start with circles.

**The minimalist principle:** "Manual sales = 99% of early growth."

#### Circle 1 — Friends & family (target: 10 users, week 1-2)

Find 10 people in your immediate network who have had a bad consumer experience recently. Every Indonesian has had a Tokopedia/Shopee dispute, a Telkomsel billing issue, or a Gojek overcharge in the last 6 months. Ask them directly:

> "I built something that helps you write a formal complaint letter in 10 minutes. Can you try it right now on that [issue they mentioned]?"

Do not send a link and hope. Sit with them (physically or on a call) and watch them use it. Fix every point of confusion before moving to circle 2.

**Metric:** 10 real complaints filed by people who are not you.

#### Circle 2 — Communities (target: 90 users, weeks 3-8)

ClaimIt's natural communities already exist and are active:

| Community | Platform | Approach |
|---|---|---|
| r/indonesia, r/perkonsumenan | Reddit | Post when someone has a complaint problem. Don't advertise — solve their specific problem with a ClaimIt link |
| Kaskus Forum Jual Beli | Kaskus | Same approach — reply to complaint threads |
| Facebook groups: "Curhat Konsumen Indonesia", "Laporan Penipuan Online" | Facebook | 200k-800k members each. Post case studies: "I filed a complaint against [company] using ClaimIt and got a refund in 3 days" |
| Twitter/X Indonesia consumer hashtags | X | #tiputipu, #komplain[brand] — reply with ClaimIt when people vent publicly |
| LINE OpenChat consumer groups | LINE | Active in ID, TH, JP — join and contribute |
| Teman Konsumen Telegram groups | Telegram | Active in my and consumer rights channels |

**Rule:** never post "check out my app." Post when you can help a specific person with a specific problem. The link is secondary to the solution.

**Metric:** 50 cases filed from community referrals. Track UTM sources per community.

#### Circle 3 — Cold outreach (start week 6)

Reach out to consumer rights journalists and bloggers in Indonesia, Malaysia, Philippines:
- Detik Finance consumer desk (ID)
- Kompas.com consumer section (ID)
- Says.com / Cilisos (MY)
- Rappler consumer stories (PH)

Pitch: "We help consumers file formal complaints. We have [N] cases filed, [X]% got a response. Here's a story angle."

One well-placed article in Detik or Kompas = 1,000 signups.

#### Weekly targets (first 12 weeks)

| Week | Target | Source |
|---|---|---|
| 1-2 | 10 users | Circle 1 — direct outreach |
| 3-4 | 25 users | Reddit/Kaskus community replies |
| 5-6 | 50 users | Facebook groups |
| 7-8 | 75 users | Twitter/X + LINE + Telegram |
| 9-12 | 100 users | Media outreach + organic word-of-mouth |

**Do not run paid ads until you have 100 organic users and understand who converts.**

---

## `/marketing-plan`

**Context fed in:**
- Product: ClaimIt, 8-locale SEA platform
- Current users: 0
- Preferred channels: organic, content-first
- Goal: build audience in ID first, then expand to MY, PH, TH

---

### Recommendation: Spend time before money. Pick one platform. Own it.

**The minimalist principle:** "Marketing is sales at scale. Make fans, not impressions."

#### Primary platform: Twitter/X Indonesia

Why X, not Instagram or TikTok:
- Consumer complaints go viral on X Indonesia. #Tokopedia, #Telkomsel, #GarudaIndonesia trend regularly with complaint content.
- ClaimIt can provide real value in replies, not just broadcast content.
- Low production cost — text-heavy, no video editing needed.

Post frequency: **5x/week.** No less.

#### Content pillars (3 types, rotating)

**1. Educate** — what are your actual rights?
> "Did you know: under UU Perlindungan Konsumen No. 8/1999, you have the right to a full refund if a product doesn't match its description. Here's how to cite it in a complaint 🧵"

> "Tokopedia says 'seller's decision is final.' It's not. Here's what the regulation actually says."

**2. Inspire** — real outcomes
> "Case study: @user filed a complaint against [airline] using ClaimIt. Got a response in 48 hours and a full refund in 2 weeks. Here's the complaint letter that worked."

Post these with the user's permission. Anonymize if needed. Real outcomes are the best marketing.

**3. Entertain** — consumer chaos
> "Compilation: 5 times Indonesian companies sent the most absurd auto-reply emails to complaints (and what you should do instead)"

Humor builds audience. Keep it relatable, not mean.

#### Content calendar (week 1-4)

| Day | Type | Example topic |
|---|---|---|
| Mon | Educate | Consumer law explainer (one law per week) |
| Tue | Inspire | Case study or outcome |
| Wed | Educate | "How to file a complaint with [regulator]" |
| Thu | Entertain | Complaint horror story / meme |
| Fri | CTA | "Have a complaint? Try ClaimIt free" |

#### Email strategy — own your audience

Build an email list from day one. Gate nothing with it yet — just offer:
> "Get our weekly rights briefing: one Indonesian consumer law explained, one real case study."

Target: 1,000 subscribers before any paid marketing. Email converts better than social for a high-intent product like ClaimIt.

Add to homepage: a single email capture box. No popup. Just a quiet "Get the weekly briefing →" in the footer.

#### Build in public

Tweet the journey:
- "Week 1: 0 complaints filed. Week 4: 50. Here's what worked."
- "We added Bahasa Melayu support today. Here's why Malaysia is a different market than Indonesia."
- "The most common complaint industry on ClaimIt so far: [industry]. Not what we expected."

Founders who share numbers build trust. Trust converts.

#### When to expand past Indonesia

- Only after 500 active Indonesian users
- Malaysia next (most similar legal context, English + Malay bilingual comfortable)
- Philippines third (English-dominant, high social media usage)
- Do not translate to Thai until you have a Thai-speaking community contact who can review the legal context

#### What not to do

- No paid ads yet (you don't know your conversion funnel well enough)
- No influencer campaigns (wrong audience — consumer rights is not aspirational)
- No SEO-first content farm (write for humans, not search engines, until you have 50+ real articles)

---

## `/grow-sustainably`

**Context fed in:**
- ClaimIt is pre-revenue, just launched
- Considering: paid acquisition, fundraising, hiring a growth person, expanding to 3 more countries simultaneously
- Fixed costs: ~$65/mo infra

---

### Evaluation of growth decisions

**Framework applied:** Profitability impact · Reversibility · Motivation · Alternatives · "Default alive or default dead?"

---

**Decision 1: Should ClaimIt run paid ads now?**

- **Profitability impact:** Negative. No conversion funnel data. ARPU unknown. CAC would be pure guesswork.
- **Reversibility:** Easy to stop, but money spent is gone.
- **Motivation:** Ego-driven. Wanting to "look like a real startup" rather than responding to customer demand.
- **Alternatives:** Organic community seeding (free), media outreach (free), building in public (free).
- **Verdict:** No. "Spend time before money until you understand what converts."

---

**Decision 2: Should ClaimIt raise funding?**

- **Profitability impact:** Dilution. Pressure to grow faster than is sustainable. Turns a lifestyle-viable business into a VC-paced one.
- **Reversibility:** Irreversible. Once you take money, the incentive structure changes permanently.
- **Motivation:** Mixed. Capital could accelerate localization and legal content. But the current cost structure is so lean ($65/mo) that you could reach profitability with 14 paying users.
- **Sustainability test:** Is ClaimIt "default alive"? At current burn: yes, if founders are not paying themselves. With even 50 Basic subscribers ($250/mo), it covers infra 3x over.
- **Verdict:** Bootstrap to 100 paying users first. Prove retention. Then evaluate whether capital actually unlocks something you can't do organically, or whether it just adds pressure.

---

**Decision 3: Should ClaimIt expand to 5 SEA countries simultaneously?**

- **Profitability impact:** Significant cost in legal research, translation quality review, and localized company data. Each country is a new data set to maintain.
- **Reversibility:** Low. Once you promise a country, users expect support.
- **Alternatives:** Do Indonesia well. Make one market undeniably useful before spreading thin.
- **Verdict:** No. "Niche down further before expanding outward." Indonesia alone has 270M people and a dysfunctional consumer protection system. That's a 10-year market.

---

**Decision 4: Hire a growth/marketing person?**

- **Variable vs. fixed cost:** A hire is a fixed cost that doesn't scale with revenue. A freelance content writer for 5 posts/week is a variable cost.
- **Current state:** No paying users yet. Hiring before product-market fit is confirmed burns runway and motivation.
- **Verdict:** No full-time hire. Consider a part-time Bahasa Indonesia copywriter once you have 50 organic users and understand what content is working.

---

**The "default alive" calculation**

| Scenario | Monthly revenue | Monthly cost | Runway |
|---|---|---|---|
| 0 paying users | $0 | $65 | Depends on founders' savings |
| 14 Basic users | $70 | $65 | Break-even |
| 50 Basic users | $250 | $65 | Profitable |
| 50 Basic + 20 Pro | $510 | $95* | Comfortably profitable |

*AI costs increase with usage but remain small at this scale.

**You are 14 paying users from default-alive. Focus there before any other growth investment.**

---

## `/minimalist-review`

**Context fed in:** Full ClaimIt codebase, stack, and roadmap.

**Principles checked:** Community First · Start Manual · Build Minimal · Sell First · Time Over Money · Profitability · Customer-Driven Growth · Values Alignment

---

### Overall assessment: Strong MVP. Two gaps to close before growth.

**What ClaimIt gets right (minimalist-aligned):**

- Solves a real, painful, underserved problem in a specific community (SEA consumers)
- Leverages AI to remove the highest-friction step (drafting) — not to add features for features' sake
- Multi-locale from day one, but sensibly (Indonesian-first, others follow)
- Lean tech stack with no unnecessary dependencies
- In-memory rate limiting is honest about its limitations (documented in CLAUDE.md)
- RLS on all tables — security was not an afterthought

**Gap 1: Pricing is not enforced (critical)**

The DB has subscription tiers but no paywall exists. This means you are giving away unlimited AI draft generation with zero conversion pressure. Every user who files a complaint and gets a response is a user who would have paid — and you missed the moment.

> "Charge something from day one. Even $1 creates a different dynamic."

**Simplest fix:** Add a `case_count` check in `POST /api/cases`. If the user has ≥ 1 case in the last 30 days and their tier is `free`, return a 402 with an upgrade prompt. This is one API check and one UI modal. Ship it this week.

**Gap 2: No outcome tracking (growth blocker)**

Cases have a `status` field with `resolved` as an option, but there's no mechanism for users to mark a case as resolved or report an outcome. Without outcome data, you cannot:
- Prove the product works (for marketing)
- Understand which industries/companies resolve complaints (for product improvement)
- Build social proof (case studies for `/marketing-plan`)

**Simplest fix:** Add a "Mark as resolved" button on the case detail page that sets `status = 'resolved'` and optionally captures a one-line outcome summary. This is a single PATCH call. It costs 2 hours to build.

**What to not build yet:**

- Company response portal (companies logging into ClaimIt to respond) — wait until companies ask for it
- Complaint aggregation/analytics dashboard — wait until you have 100 cases
- Referral program — wait until users love it enough to refer organically
- Stripe integration for Enterprise tier — wait until a company requests it

**One actionable validation step:**

File 10 real complaints through ClaimIt yourself, across 10 different companies and industries. Use it as a real user would. Note every moment of confusion, every step that takes longer than expected. Fix those before acquiring any new users.

---

## Summary: Priority actions

| # | Action | Skill | Effort |
|---|---|---|---|
| 1 | Enforce free tier limit (1 case/30 days) in `POST /api/cases` | /pricing | 2 hrs |
| 2 | Add Stripe Checkout for Basic ($4.99) and Pro ($12.99) | /pricing | 1 day |
| 3 | Add "Mark as resolved" on case detail page | /minimalist-review | 2 hrs |
| 4 | File 10 real complaints through ClaimIt yourself | /minimalist-review | 2 hrs |
| 5 | Post 5x/week on X Indonesia, reply in consumer complaint threads | /marketing-plan | Ongoing |
| 6 | Message 10 people in your network who've had a bad consumer experience | /first-customers | This week |
| 7 | Set up email capture on homepage (no popup, just footer) | /marketing-plan | 1 hr |
| 8 | Do NOT run paid ads, raise funding, or expand countries yet | /grow-sustainably | Decision |
