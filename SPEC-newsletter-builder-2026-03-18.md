# SPEC: Newsletter Builder
**Project:** bus-engine | **Industry:** Transit Bus
**Generated:** 2026-03-18

---

## DECISION LOG

| Assumption | Reality | Impact |
|---|---|---|
| Resend already in stack | NOT installed — not in package.json | Must install resend |
| Cross-engine newsletter pattern exists | Zero newsletter code across all NuStack engines | Build fresh — no port available |
| AI route uses claude-opus or claude-3 | Exact model: claude-haiku-4-5-20251001 | Use same model in generate route |
| Supabase uses Drizzle ORM | bus-engine uses @supabase/supabase-js directly (no Drizzle) | Match existing Server Actions pattern |
| Resend wrapper exists in lib/ | Not present — no actual email sends in codebase | Build /api/newsletter/send as new Resend integration |

## HEALTH ISSUES FOUND
NONE — 10/10 clean.

## ENVIRONMENT VERIFICATION
Run before writing any code:
- [ ] `ANTHROPIC_API_KEY` present in .env.local
- [ ] `SUPABASE_SERVICE_ROLE_KEY` present in .env.local
- [ ] `RESEND_API_KEY` added to .env.local AND Vercel before MP5 (send feature)
- [ ] `grep '"resend"' package.json` → must return a line (after MP1 install)
- [ ] `SELECT count(*) FROM bn_newsletters` → no error (after MP1 migration)

## SUCCESS CRITERIA
1. /dashboard/newsletter loads with empty state showing "Create Your First Newsletter" CTA — no empty stat cards
2. "Generate with AI" produces full HTML preview within 10 seconds
3. HTML is copyable for Mailchimp use
4. Direct send (NEWSLETTER_TEST_MODE=true) delivers email to brad@nustack.digital with all 4 sections
5. CSV subscriber import works; brand filter (CCW/TSI/SBL) shows correct counts
6. Mobile/responsive at 375px — builder usable on phone
7. `npx tsc --noEmit` → zero errors

---

## READ BEFORE TOUCHING ANYTHING
- `app/api/ai-chat/route.ts` — exact Anthropic SDK usage, model ID, error handling pattern
- `app/dashboard/compliance/actions.ts` — exact Server Actions pattern (createClient, supabase.from, revalidatePath)
- `components/dashboard/Sidebar.tsx` — full NavGroup structure before modifying
- `app/dashboard/news/page.tsx` — brand switcher pattern (CCW/TSI/SBL), modal pattern
- `lib/supabase/server.ts` — createClient() returns service role client; use everywhere

---

## USER JOURNEY

**STATE: NEW USER**
- Page header "Newsletter Builder", two CTAs: "New Newsletter" (primary) + "Import Subscribers" (secondary)
- Centered empty state: mail icon + "No newsletters yet. Create your first to get started."
- Subscriber pill: "0 CCW subscribers · 0 TSI · 0 SBL"
- No stat cards, no table until data exists

**STATE: ESTABLISHED**
- Two tabs: "Newsletters" | "Subscribers"
- Newsletter list: Brand badge, Issue #, Topic, Status (Draft/Generated/Sent), Date, Actions
- Subscriber stats: per-brand counts

**OPTIMAL PATH (7 steps):**
1. Click "New Newsletter"
2. Pick brand (CCW/TSI/SBL)
3. Enter issue #, topic, lead headline, 2-3 bullet points
4. Click "Generate with AI"
5. Review HTML preview in iframe
6. Edit "From the Team" section (optional)
7. Send or Export HTML

---

## DATABASE CHANGES

### Migration 011: `bn_` Newsletter Tables
File: `supabase/migrations/011_bn_newsletter_subscribers.sql`

```sql
CREATE TABLE bn_newsletters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand TEXT NOT NULL CHECK (brand IN ('CCW', 'TSI', 'SBL')),
  issue_number INTEGER NOT NULL,
  send_date DATE,
  topic TEXT NOT NULL,
  lead_headline TEXT NOT NULL,
  lead_bullets JSONB NOT NULL DEFAULT '[]',
  from_the_team TEXT,
  subject_line TEXT,
  generated_html TEXT,
  status TEXT NOT NULL CHECK (status IN ('draft', 'generated', 'sent')) DEFAULT 'draft',
  sent_at TIMESTAMPTZ,
  recipient_count INTEGER,
  test_mode BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bn_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand TEXT NOT NULL CHECK (brand IN ('CCW', 'TSI', 'SBL', 'all')),
  email TEXT NOT NULL,
  name TEXT,
  source TEXT NOT NULL CHECK (source IN ('import', 'manual', 'form')) DEFAULT 'manual',
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email, brand)
);

ALTER TABLE bn_newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE bn_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role access bn_newsletters" ON bn_newsletters FOR ALL USING (true);
CREATE POLICY "Service role access bn_subscribers" ON bn_subscribers FOR ALL USING (true);
```

- EXISTING TABLES TOUCHED: None
- ROLLBACK: `DROP TABLE bn_subscribers; DROP TABLE bn_newsletters;`
- CAN-SPAM: `active=false` = unsubscribed. `source` tracks opt-in method.

---

## SKELETON CODE CONTRACTS

### `app/dashboard/newsletter/actions.ts`
```typescript
'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

interface CreateNewsletterInput {
  brand: 'CCW' | 'TSI' | 'SBL'
  issue_number: number
  send_date?: string
  topic: string
  lead_headline: string
  lead_bullets: string[]
  from_the_team?: string
  subject_line?: string
}

export async function createNewsletter(input: CreateNewsletterInput): Promise<{ id: string }>
export async function updateNewsletterHtml(id: string, html: string, subject_line?: string): Promise<void>
export async function updateNewsletterStatus(id: string, status: 'draft' | 'generated' | 'sent', recipientCount?: number): Promise<void>
export async function deleteNewsletter(id: string): Promise<void>
export async function addSubscriber(data: { brand: string; email: string; name?: string }): Promise<void>
export async function removeSubscriber(id: string): Promise<void>
export async function toggleSubscriberActive(id: string, active: boolean): Promise<void>
export async function importSubscribers(rows: Array<{ email: string; name?: string; brand: string }>): Promise<{ inserted: number; skipped: number }>
```

### `app/api/newsletter/generate/route.ts`
```typescript
// POST — Zod validate → fetch fleet spotlight from bus_vehicles/bus_inventory
// → build Anthropic prompt with BRAND_VOICE[brand]
// → call claude-haiku-4-5-20251001 → parse JSON response
// → generateHtmlShell(brand, issue_number, send_date, sections) → HTML string
// → save to bn_newsletters (status='generated') → return { html, subject_line }

const BRAND_VOICE = {
  CCW: `Complete Coach Works (CCW) — professional, technically authoritative, engineering-focused.
    ESOP, 350 employees, est. 1987, Riverside CA. Midlife refurbishment ~$300-400K (saves 40-60% vs new),
    CNG repower (CARB L9N certified), ZEPS electric conversion (70+ done, $580K vs $830K OEM).
    Tone: confident expert, "transit agencies trust us with their fleet."`,
  TSI: `Transit Sales International (TSI) — sales-focused, inventory-driven, accessible.
    1,000+ pre-owned transit buses, 30-60ft, all fuel types, 60-day delivery.
    Tone: helpful dealer, "we have your bus in stock and can deliver fast."`,
  SBL: `Shuttle Bus Leasing (SBL) — flexible, partnership-oriented, solution-focused.
    Seasonal/contract/gap/employee shuttle leasing, lease-to-own available.
    2002/2010 Olympics supplier. 1,000+ bus inventory.
    Tone: trusted partner, "flexibility that fits your operation."`,
}

// generateHtmlShell(brand, issueNumber, sendDate, sections): string
// Brand colors: CCW=#003087 accent=#E8A020 | TSI=#1a5fa8 | SBL=#2d7a3a
// Structure: Header bar → "In This Issue" bullets → Lead Story → Fleet Spotlight → Industry News → From the Team → Footer
// Inlined CSS only (email client compatibility)
// Footer: "© 2026 [Brand] | Unsubscribe | View on Web"
```

### `app/api/newsletter/send/route.ts`
```typescript
// POST — Zod: { newsletter_id: uuid, brand: string, test_mode?: boolean }
// Guard: status must be 'generated', generated_html must exist
// Recipients: if test_mode || NEWSLETTER_TEST_MODE=true → ['brad@nustack.digital']
//   else: bn_subscribers where brand=input.brand AND active=true
// Guard: if recipients.length === 0 → 400 "No active subscribers for this brand"
// Send via Resend emails.send() with raw HTML string
// FROM: 'onboarding@resend.dev' until CCW/TSI/SBL domains verified with Resend
// Update bn_newsletters: status='sent', sent_at, recipient_count
// Return: { sent: number, failed: number }
```

### `components/dashboard/NewsletterBuilderClient.tsx`
```typescript
'use client'
interface Props {
  newsletters: BnNewsletter[]
  subscriberCounts: { CCW: number; TSI: number; SBL: number }
  nextIssueNumbers: { CCW: number; TSI: number; SBL: number }
}

// Builder form schema:
const schema = z.object({
  brand: z.enum(['CCW', 'TSI', 'SBL']),
  issue_number: z.number().min(1),
  send_date: z.string().optional(),
  topic: z.string().min(3).max(100),
  lead_headline: z.string().min(5).max(150),
  lead_bullets: z.array(z.string().min(3)).min(1).max(3),
  from_the_team: z.string().min(10).max(500).optional(),
  subject_line: z.string().max(60).optional(),
})
```

---

## MICRO-PROMPTS

### MP1: Install Resend + DB Migration + Types (2 files + 1 command)
1. Run `npm install resend`
2. `supabase/migrations/011_bn_newsletter_subscribers.sql` (CREATE) — full SQL above
3. `lib/database.types.ts` (MODIFY) — add bn_newsletters + bn_subscribers to Tables object

Run migration via Supabase MCP or `supabase db push`.

Verify:
1. `npx tsc --noEmit` → zero errors
2. `SELECT count(*) FROM bn_newsletters` → 0 (table exists)
3. `SELECT count(*) FROM bn_subscribers` → 0
4. `grep '"resend"' package.json` → returns version line

---

### MP2: Server Actions + Generate API (2 files)
1. `app/dashboard/newsletter/actions.ts` (CREATE) — follow compliance/actions.ts pattern exactly
2. `app/api/newsletter/generate/route.ts` (CREATE)

Generate route:
- Fetch fleet spotlight: CCW → `bus_vehicles` status='available' LIMIT 1, TSI/SBL → `bus_inventory` LIMIT 1
- Anthropic prompt returns JSON: `{ subject_line, lead_story, fleet_spotlight, industry_news: string[], from_the_team_polished }`
- `generateHtmlShell()` builds the final HTML template literal
- Save html to bn_newsletters, update status='generated'

Verify:
1. `npx tsc --noEmit` → zero errors
2. POST `/api/newsletter/generate` with valid payload → HTTP 200 with `{ html: "<html>...", subject_line: "..." }` (html > 500 chars)

---

### MP3: Send API Route (1 file)
1. `app/api/newsletter/send/route.ts` (CREATE)

From address note: Use `'onboarding@resend.dev'` until CCW/TSI/SBL Resend domains verified. Document this in a comment.

Verify:
1. `npx tsc --noEmit` → zero errors
2. With `NEWSLETTER_TEST_MODE=true` and a generated newsletter: POST send → HTTP 200 `{ sent: 1, failed: 0 }` + email arrives at brad@nustack.digital

---

### MP4: Page + Builder Client (2 files)
1. `app/dashboard/newsletter/page.tsx` (CREATE — Server Component)
2. `components/dashboard/NewsletterBuilderClient.tsx` (CREATE — "use client")

Page fetches: newsletters list + subscriber counts per brand + nextIssueNumbers (max+1 per brand).

Builder client tabs:
- **Newsletters tab:** Table with Brand badge, Issue #, Topic, Status, Date, Actions (Preview/Send/Delete)
- **Subscribers tab:** Stats row, Import CSV button, Add single subscriber mini-form, subscriber table with brand filter

Builder slide-over (full-height right panel, 700px wide, overlay backdrop):
- Step 1: Brand selector + issue number (auto-filled) + send date
- Step 2: Topic + lead headline + bullet inputs (dynamic, max 3)
- Step 3: From the Team textarea + subject line (auto-filled after generation, editable)
- "Generate with AI" → POST /api/newsletter/generate → HTML renders in `<iframe sandbox>` below form
- Action bar: "Copy HTML" | "Send Newsletter" | "Download .html"

CSV import: client-side parsing (email,name,brand columns) → call `importSubscribers` server action → `toast.success('45 imported, 2 skipped')`

Styling: match `app/dashboard/news/page.tsx` brand tab style. Brand badge colors: CCW=`#003087`, TSI=`#1a5fa8`, SBL=`#2d7a3a`.

Verify:
1. `npx tsc --noEmit` → zero errors
2. `/dashboard/newsletter` loads, empty state renders
3. "New Newsletter" → builder slide-over opens, brand selector works
4. "Generate with AI" → HTML preview in iframe within 15s
5. "Copy HTML" → clipboard receives valid HTML

---

### MP5: Sidebar Nav + Build + Deploy (2 files)
1. `components/dashboard/Sidebar.tsx` (MODIFY)
2. Final build + commit + deploy

Sidebar changes: Add `Mail` to lucide-react imports. Add to CCW_GROUPS Website, TSI_GROUPS Website, SBL_GROUPS Website:
```typescript
{ label: 'Newsletter', href: '/dashboard/newsletter', icon: Mail },
```

Add `RESEND_API_KEY` to Vercel before deploying: `vercel env add RESEND_API_KEY production`

Build commands:
1. `npm run lint` → zero warnings
2. `npm run build` → zero errors
3. `git add supabase/migrations/011_bn_newsletter_subscribers.sql lib/database.types.ts app/dashboard/newsletter/ app/api/newsletter/ components/dashboard/NewsletterBuilderClient.tsx components/dashboard/Sidebar.tsx package.json package-lock.json`
4. `git commit -m "feat(newsletter): add newsletter builder with AI generation, Resend send, subscriber management"`
5. `git pull --rebase origin main && git push origin main`
6. Confirm Vercel deploy triggered

---

## ERROR HANDLING
- Anthropic failure: HTTP 500 `{ error: 'Generation failed — try again' }`. User: `toast.error('AI generation failed. Try again.')`. Newsletter stays 'draft'.
- `RESEND_API_KEY` missing: HTTP 500 `{ error: 'Email not configured' }`. User: `toast.error('Email not configured. Contact NuStack.')`.
- No subscribers: HTTP 400 `{ error: 'No active CCW subscribers' }`. User: `toast.error('No active subscribers. Import first.')`.
- `importSubscribers` unique constraint = skipped count (not an error).
- All catches: `console.error('[newsletter/...]', err)` — no silent catches.

---

## TEST MODE
Env var: `NEWSLETTER_TEST_MODE=true` in .env.local
- All sends → brad@nustack.digital only
- Subject prepended with "[TEST] "
- DB writes proceed normally (test_mode=true flag on record)

---

## ENV VARS

**New (Brad provides):**
- `RESEND_API_KEY` — from resend.com dashboard → Settings → API Keys

**Already present:**
- `ANTHROPIC_API_KEY` ✅
- `NEXT_PUBLIC_SUPABASE_URL` ✅
- `SUPABASE_SERVICE_ROLE_KEY` ✅

**Resend verified domain note:** CCW/TSI/SBL custom "from" addresses require Resend DNS setup. Until verified: use `'onboarding@resend.dev'`. Dale/CCW will need to verify domains before external sends.

---

## INSTALL
```bash
npm install resend
```

---

## DO NOT
- Do NOT rewrite /api/ai-chat/route.ts — build /api/newsletter/generate as a new route
- Do NOT install react-email or mjml — use raw HTML string template
- Do NOT add Mailchimp SDK — "export HTML for Mailchimp" = copy-paste; Resend = direct send
- Do NOT use Drizzle ORM — bus-engine uses @supabase/supabase-js directly
- Do NOT show empty stat cards on newsletter page
- Do NOT commit with failing build
- Do NOT add Newsletter nav item only to CCW — must be in TSI and SBL groups too
- Do NOT hard-code RESEND_API_KEY — env var only

---

## LOCKED IMPLEMENTATION PROMPT

```
You are building the Newsletter Builder for bus-engine.
Project: C:\Users\bradp\dev\bus-engine
SPEC: C:\Users\bradp\dev\bus-engine\SPEC-newsletter-builder-2026-03-18.md

Stack: Next.js 16 App Router, Supabase (service role via lib/supabase/server.ts createClient()),
Clerk (middleware protects /dashboard/**), TypeScript strict, react-hook-form + zod, Tailwind, shadcn/ui, sonner.
AI: @anthropic-ai/sdk — use claude-haiku-4-5-20251001 (match /api/ai-chat/route.ts exactly).
Email: resend (must install — not yet in package.json).

CRITICAL PATTERNS:
- Supabase: import { createClient } from '@/lib/supabase/server'
- Server Actions: follow app/dashboard/compliance/actions.ts EXACTLY
- AI route: read app/api/ai-chat/route.ts first — replicate its Anthropic pattern
- New tables: bn_newsletters, bn_subscribers (migration 011)
- HTML generation: raw template literal — no React Email, no mjml

Execute in order. Max 3 files per pass. Stop after each pass and verify npx tsc --noEmit before continuing.

MP1: (run npm install resend) + supabase/migrations/011_bn_newsletter_subscribers.sql + lib/database.types.ts
MP2: app/dashboard/newsletter/actions.ts + app/api/newsletter/generate/route.ts
MP3: app/api/newsletter/send/route.ts
MP4: app/dashboard/newsletter/page.tsx + components/dashboard/NewsletterBuilderClient.tsx
MP5: components/dashboard/Sidebar.tsx (add Mail nav item to all 3 brand groups) + npm run build + commit + deploy

Add RESEND_API_KEY to Vercel before MP5 deploy.
After all MPs pass tsc and build: git commit + push + confirm Vercel URL.
```
