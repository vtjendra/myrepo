# ClaimIt — AI Assistant Guide

## Project Overview

**ClaimIt** is a consumer rights platform for Southeast Asia. It helps users file formal complaints against companies by:
1. Guiding them through a multi-step complaint wizard
2. Generating AI-powered rights briefings (what laws protect them)
3. Drafting formal complaint letters via Claude AI (streamed)
4. Sending complaints directly to companies by email

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Supabase · Anthropic Claude API · Resend · next-intl · Zustand

**Deployment:** Vercel (`vercel.json` — `next build` / `npm install`)

---

## Repository Structure

```
src/
  app/
    [locale]/               # All pages under locale prefix
      page.tsx              # Homepage
      layout.tsx            # Root layout with intl provider
      complain-about/[slug]/[country]/
        page.tsx            # Step 1: Issue selection
        rights/page.tsx     # Step 2: Rights briefing
        details/page.tsx    # Step 3: Complaint details form
        draft/page.tsx      # Step 4: AI draft review/edit
        send/page.tsx       # Step 5: Send complaint
      cases/
        page.tsx            # Case list
        [uuid]/page.tsx     # Case detail / timeline
      companies/
        add/page.tsx        # Add company form
        [slug]/[country]/page.tsx  # Company profile
      rights/[country]/[industry]/page.tsx  # Rights info page
    api/
      ai/
        draft/route.ts      # POST — stream AI complaint draft
        rights/route.ts     # POST — generate/cache rights briefing
      cases/
        route.ts            # GET/POST cases
        [uuid]/route.ts     # GET/PATCH single case
        [uuid]/send/route.ts  # POST — send complaint email
      companies/
        route.ts            # GET/POST companies
        search/route.ts     # GET — search companies
      upload/route.ts       # POST — upload evidence files
      og/route.tsx          # Open Graph image generation
    robots.ts
    sitemap.ts
    globals.css
  components/
    ui/                     # Primitive components (Button, Input, Modal, etc.)
    complaint/              # Complaint wizard components
    case/                   # Case card, timeline, response form
    company/                # Company card, search
    layout/                 # Header, footer, bottom nav, locale switcher
    seo/                    # JSON-LD structured data
  lib/
    ai/
      client.ts             # Anthropic client singleton (server-only)
      prompts.ts            # getRightsBriefingPrompt, getComplaintDraftPrompt
      sanitize.ts           # Input sanitization before AI calls
    supabase/
      client.ts             # Browser Supabase client
      server.ts             # Server Supabase client (cookies)
      middleware.ts         # Middleware Supabase client
      admin.ts              # Service-role admin client
      types.ts              # TypeScript interfaces matching DB schema
    email/
      resend.ts             # Resend client + sendComplaintEmail()
    validators/
      case.ts               # Zod schemas for case mutations
      company.ts            # Zod schemas for company mutations
      upload.ts             # Zod schemas for file uploads
    constants.ts            # ISSUE_CATEGORIES, DESIRED_OUTCOMES, currencies, file limits
    rate-limit.ts           # In-memory rate limiter (Map-based)
  stores/
    complaint-store.ts      # Zustand store (persisted) for multi-step wizard state
  i18n/
    routing.ts              # Locale list, default locale, pathname config
    request.ts              # next-intl server request config
    navigation.ts           # Typed navigation helpers
  middleware.ts             # Global middleware: rate limit → intl → Supabase auth refresh
messages/                   # i18n JSON files
  en.json, id.json, zh.json, hi.json, ms.json, tl.json, vi.json, th.json
supabase/
  migrations/00001_initial_schema.sql  # Full DB schema
  seed.sql
  config.toml
```

---

## Development Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

No test suite is configured in this project.

To regenerate Supabase TypeScript types after schema changes:
```bash
supabase gen types typescript --local > src/lib/supabase/types.ts
```

---

## Environment Variables

Required in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=     # Admin/server-only operations
ANTHROPIC_API_KEY=             # Claude API for AI features
RESEND_API_KEY=                # Email sending
```

---

## Key Conventions

### Routing & i18n

- All user-facing pages live under `src/app/[locale]/`
- Supported locales: `id` (default), `en`, `zh`, `hi`, `ms`, `tl`, `vi`, `th`
- `localePrefix: 'always'` — every URL includes the locale segment
- Indonesian locale has a localized path: `/komplain-tentang/[slug]/[country]`
- Use `next-intl` hooks/functions: `useTranslations()` (client), `getTranslations()` (server)
- Navigation helpers are in `src/i18n/navigation.ts` (typed `Link`, `useRouter`, etc.)
- Add new translation keys to **all 8** message files in `messages/`

### Supabase Usage

- **Browser client** (`src/lib/supabase/client.ts`): Use in Client Components
- **Server client** (`src/lib/supabase/server.ts`): Use in Server Components and API routes — reads cookies
- **Admin client** (`src/lib/supabase/admin.ts`): Service-role only — never expose to client
- **Middleware client** (`src/lib/supabase/middleware.ts`): Used in `middleware.ts` to refresh auth tokens
- All tables have Row Level Security (RLS) enabled. User data is strictly scoped to `auth.uid()`
- Companies and company entities are publicly readable
- The `evidence` storage bucket is private; files are namespaced by `auth.uid()`

### AI Integration

- The Anthropic client is a singleton in `src/lib/ai/client.ts` (server-only)
- Two AI prompts in `src/lib/prompts.ts`:
  - `getRightsBriefingPrompt()` — generates a rights briefing (300–500 words) for a country/industry/category
  - `getComplaintDraftPrompt()` — writes a formal complaint letter
- The draft API (`/api/ai/draft`) **streams** the response using `ReadableStream`; the rights API (`/api/ai/rights`) caches results in the `rights_cache` table
- Always sanitize user input with `sanitizeInput()` and validate locale with `validateLocale()` before passing to prompts
- Current model: `claude-sonnet-4-20250514`

### Rate Limiting

In-memory rate limiter (`src/lib/rate-limit.ts`) applied at two levels:
- Global middleware: 100 req/min per IP
- AI draft endpoint: 3 req/min per IP
- Send case endpoint: 3 req/min per IP

**Note:** This is in-memory and resets on server restart. Not suitable for multi-instance deployments without a Redis-backed solution.

### Client State (Zustand)

- `useComplaintStore` in `src/stores/complaint-store.ts` persists complaint wizard state to `localStorage` under the key `claimit-complaints`
- State is keyed by `"${slug}-${country}"` (use `makeKey(slug, country)`)
- Data older than 24 hours is automatically discarded
- Always call `clearComplaint(key)` after successfully saving a case to the DB

### API Routes

- All API routes validate input with Zod before processing
- Authentication is checked via `supabase.auth.getUser()` — never trust client-passed user IDs
- Rate limiting is applied per-endpoint using `rateLimit(key, limit, windowMs)`
- Return `NextResponse.json(...)` for JSON responses; use plain `new Response(...)` for streams

### Database Schema

Key tables and relationships:
- `companies` → global company record with `global_slug`
- `company_entities` → per-country instance (has `complaint_email`, `regulator_name`, etc.)
- `cases` → linked to `users` and `company_entities`; holds both `draft_complaint` and `final_complaint`
- `responses` → timeline entries per case (`sender_type`: `user | company | system`)
- `rights_cache` → LLM-generated rights text, unique per `(country_code, industry, issue_category, locale)`
- `subscriptions` → Stripe integration (future use; no user-facing policies in MVP)

Enum types: `industry`, `desired_outcome`, `case_status`, `sender_type`, `subscription_tier`, `subscription_status`

Constants matching these enums live in `src/lib/constants.ts`.

### Styling

- Tailwind CSS with a `brand` color palette (blue shades, primary: `brand-600` = `#2563eb`)
- Font: Inter
- Utility class `container-app` is used for page containers (defined in `globals.css`)
- Mobile-first; bottom navigation (`BottomNav`) is used for mobile layout

### File Uploads

- Evidence files are uploaded to Supabase Storage (`evidence` bucket)
- Max 3 files, 5 MB each, types: `image/jpeg`, `image/png`, `application/pdf`
- Validated by `src/lib/validators/upload.ts`
- Storage path: `{userId}/{filename}`

---

## Complaint Wizard Flow

The multi-step complaint flow is the core user journey:

| Step | URL segment | Component | Store action |
|------|-------------|-----------|--------------|
| 1 | `/complain-about/[slug]/[country]` | `IssueSelector` | `setCompany`, `setIssue` |
| 2 | `.../rights` | `RightsCard` | `setRights` |
| 3 | `.../details` | `ComplaintForm` | `setDetails` |
| 4 | `.../draft` | `DraftViewer` | `setDraft`, `setFinal` |
| 5 | `.../send` | send page | `clearComplaint` after save |

State flows through the Zustand store (client-side) across all steps. Each page reads from the store to pre-populate data and writes back on submission. The final step saves the case to Supabase and then optionally sends an email.

---

## Adding New Features

### New page
1. Create `src/app/[locale]/your-path/page.tsx`
2. Add the path to `src/i18n/routing.ts` `pathnames`
3. Add translation keys to all 8 `messages/*.json` files

### New API endpoint
1. Create `src/app/api/your-endpoint/route.ts`
2. Add Zod validation schema
3. Add rate limiting with `rateLimit()`
4. Check auth with `supabase.auth.getUser()` if needed

### New DB table
1. Create a migration in `supabase/migrations/`
2. Add RLS policies
3. Regenerate types: `supabase gen types typescript --local > src/lib/supabase/types.ts`
4. Add TypeScript interface to `src/lib/supabase/types.ts`

### New locale
1. Add locale to `routing.locales` in `src/i18n/routing.ts`
2. Add the locale to the `middleware.ts` `matcher` pattern
3. Create `messages/{locale}.json` with all keys
