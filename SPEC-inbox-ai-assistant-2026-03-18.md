# SPEC: Inbox + AI Writing Assistant
**Project:** bus-engine | **Industry:** transit-bus
**Generated:** 2026-03-18

---

## DECISION LOG

| Assumption | Reality | Impact |
|---|---|---|
| bus-engine uses same Supabase client pattern as ER engine | createClient() in lib/supabase/server.ts — no tryAuth() middleware like ER engine | API routes must use createClient() not createServiceSupabase(). No fleet_id scoping needed (single-tenant). |
| Table prefix would be bus_ | All existing tables use bus_ prefix. Next available prefix is bi_ per spec. | Use bi_ prefix for new inbox tables. |
| bus-engine has Twilio configured | No TWILIO env vars — VAPI is the comms channel (NEXT_PUBLIC_VAPI_API_KEY present) | Outbound reply = email (Resend) or manual. Twilio is optional/future. |
| AI draft route follows ER pattern (tryAuth) | bus-engine has no tryAuth — uses Clerk clerkMiddleware protecting /dashboard/* | API routes under /api/ are NOT protected by middleware. Must check auth() from @clerk/nextjs/server inside each route if needed. |
| ER inbox groups by renter_id | bus-engine contacts are agencies (bus_agencies) and pipeline contacts | Use generic contact model via bi_contacts ref in bi_threads. |
| Migration watermark is 010 | Confirmed — 010_pm_inspections_photos.sql is last | Next migration = 011_inbox.sql |

## HEALTH ISSUES FOUND
NONE — health audit passed 10/10.

## ENVIRONMENT VERIFICATION
Run before writing any code:
- [ ] Supabase connection live: https://glozekmiaflfijnkcgmo.supabase.co
- [ ] `ANTHROPIC_API_KEY` set in .env.local ✅
- [ ] `NEXT_PUBLIC_VAPI_API_KEY` set in .env.local ✅
- [ ] Clerk keys set ✅
- [ ] `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'bi_%'` → empty (tables don't exist yet)

## SUCCESS CRITERIA
1. Navigate to /dashboard/inbox → thread list renders with unread badge in sidebar nav
2. Click any thread → message history renders with inbound/outbound bubbles, source tag, "Draft AI Reply" button
3. Click "Draft AI Reply" → spinner → AI reply in textarea within 5 seconds
4. Send reply → saved to bi_messages as outbound, thread unread count decrements
5. POST to /api/inbox/leads → new thread + message created, appears in inbox
6. Unread badge in sidebar shows correct count
7. Mark thread as read → unread count decrements immediately
8. Quick reply template dropdown shows CCW-specific templates when active company = CCW
9. Mobile responsive at 375px — no overflow
10. `npx tsc --noEmit` → zero errors after all micro-prompts

---

## READ BEFORE TOUCHING ANYTHING
- `lib/supabase/server.ts` — createClient() is the correct function (NOT createServiceSupabase)
- `components/dashboard/Sidebar.tsx` — three-company NavGroup structure
- `lib/database.types.ts` — add bi_ types here after migration runs
- `app/api/ai-chat/route.ts` — existing AI route pattern to follow (Anthropic SDK, non-streaming)
- `middleware.ts` — /api/* routes are NOT protected; auth check must happen inside each route handler
- `equipment-rental-engine/src/app/api/owner/leads/[id]/draft-response/route.ts` — AI draft pattern to port

---

## USER JOURNEY

**STATE: NEW USER (zero threads)**
- Centered MessageSquare icon + "No messages yet" + "Messages from VAPI calls, contact forms, and direct inquiries will appear here" + CTA "Set up VAPI integration →" → /dashboard/settings
- No empty stat cards, no search bar

**STATE: IN PROGRESS (1-10 threads)**
- Left panel: thread list, unread = bold sender name + blue dot
- Right panel: click thread → message bubbles + AI draft button
- Primary CTA: "Draft AI Reply" on every thread

**STATE: ESTABLISHED (active inbox)**
- Full split-panel layout: thread list left, conversation right
- Filter bar: All | Unread | VAPI Chat | Contact Form | Email | Phone
- Quick reply templates dropdown
- Mark read/unread toggle
- Assign to team member dropdown

---

## DATABASE CHANGES

### Migration 011: `bi_` Inbox Tables
File: `supabase/migrations/011_inbox.sql`

```sql
CREATE TABLE bi_threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_name TEXT NOT NULL,
  contact_email TEXT,
  contact_phone TEXT,
  contact_company TEXT,
  source TEXT NOT NULL CHECK (source IN ('vapi_chat', 'contact_form', 'email', 'phone', 'direct')),
  company TEXT NOT NULL DEFAULT 'CCW' CHECK (company IN ('CCW', 'TSI', 'SBL')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'snoozed')),
  unread_count INTEGER NOT NULL DEFAULT 0,
  assigned_to TEXT,
  last_message_at TIMESTAMPTZ,
  last_message_preview TEXT,
  agency_id UUID REFERENCES bus_agencies(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE bi_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID NOT NULL REFERENCES bi_threads(id) ON DELETE CASCADE,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  body TEXT NOT NULL,
  channel TEXT NOT NULL CHECK (channel IN ('vapi_chat', 'contact_form', 'email', 'phone', 'direct')),
  status TEXT NOT NULL DEFAULT 'delivered' CHECK (status IN ('queued', 'sent', 'delivered', 'failed', 'received')),
  sent_by TEXT,
  ai_draft TEXT,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE bi_reply_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL CHECK (company IN ('CCW', 'TSI', 'SBL', 'ALL')),
  name TEXT NOT NULL,
  body TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO bi_reply_templates (company, name, body, sort_order) VALUES
('CCW', 'Fleet Rebuild Interest', 'Thank you for your interest in fleet rebuilds with Complete Coach Works. We''d love to learn more about your fleet needs. Can you share the number of buses and your target delivery window? Our team will follow up within one business day.', 1),
('CCW', 'ZEPS Electric Inquiry', 'Thanks for reaching out about ZEPS electric conversions. CCW has completed 70+ conversions with 4M+ miles logged. We can deliver in approximately 6 months at roughly $580K — about $250K less than a new EV bus. I''ll have our team send over a full proposal. What''s the best number to reach you?', 2),
('TSI', 'Inventory Available', 'Thank you for contacting Transit Sales International. We currently have 1,000+ pre-owned transit buses in stock — 30 to 60 ft, diesel, CNG, electric, and hybrid. Can you share your spec requirements and timeline? We can often deliver within 60 days.', 1),
('TSI', 'FTA Compliance Question', 'Great question on FTA compliance. All TSI buses are inspected and certified to meet federal standards. Happy to pull the full vehicle history and compliance docs for any unit you''re considering. What bus type and year range are you looking for?', 2),
('SBL', 'Lease Programs', 'Thank you for inquiring about Shuttle Bus Leasing programs. We offer short-term, long-term, and lease-to-own options with immediate availability. Can you tell me the duration you need and your expected passenger count? I''ll put together our current lease programs for you.', 1),
('SBL', 'Gap Fleet Coverage', 'Thanks for reaching out about gap fleet coverage. SBL specializes in exactly this — we''ve covered fleet gaps for events, seasonal needs, and emergency replacements since the 2002 and 2010 Olympics. What''s your timeline and how many vehicles do you need?', 2);

CREATE INDEX bi_threads_last_message_at ON bi_threads(last_message_at DESC);
CREATE INDEX bi_threads_unread_count ON bi_threads(unread_count) WHERE unread_count > 0;
CREATE INDEX bi_messages_thread_id ON bi_messages(thread_id, created_at);
```

### Migration Strategy:
- EXISTING TABLES TOUCHED: bus_agencies (FK reference only — no schema change)
- TRANSITION: additive, non-breaking
- ROLLBACK: `DROP TABLE bi_messages; DROP TABLE bi_reply_templates; DROP TABLE bi_threads;`

---

## SKELETON CODE CONTRACTS

### `app/api/inbox/threads/route.ts`
```typescript
// GET → list all threads, sorted by last_message_at DESC
// Returns: { threads: BIThread[], unread_total: number }
// POST → create new thread + first message

interface BIThread {
  id: string; contact_name: string; contact_email: string | null
  contact_phone: string | null; contact_company: string | null
  source: 'vapi_chat' | 'contact_form' | 'email' | 'phone' | 'direct'
  company: 'CCW' | 'TSI' | 'SBL'
  status: 'open' | 'closed' | 'snoozed'
  unread_count: number; assigned_to: string | null
  last_message_at: string | null; last_message_preview: string | null
  agency_id: string | null; created_at: string
}

export async function GET(_req: NextRequest): Promise<Response>
export async function POST(req: NextRequest): Promise<Response>
```

### `app/api/inbox/threads/[id]/route.ts`
```typescript
// GET → thread + messages array
// PATCH → update status, assigned_to, mark_read
interface ThreadDetailResponse { thread: BIThread; messages: BIMessage[] }
interface BIMessage {
  id: string; thread_id: string; direction: 'inbound' | 'outbound'
  body: string; channel: string; status: string; sent_by: string | null
  ai_draft: string | null; read_at: string | null; created_at: string
}
```

### `app/api/inbox/threads/[id]/messages/route.ts`
```typescript
// POST → send outbound message
const sendMessageSchema = z.object({
  body: z.string().min(1).max(2000),
  channel: z.enum(['email', 'direct']).default('direct'),
})
```

### `app/api/inbox/threads/[id]/draft/route.ts`
```typescript
// POST → generate AI draft reply using Anthropic
// Context: thread.contact_name, thread.source, thread.company, last 5 messages
// Returns: { draft: string }
// Model: claude-haiku-4-5-20251001 (match existing ai-chat route)
// System prompt: "You are a professional sales representative for {company_name}.
//   Draft a concise, professional reply (2-3 paragraphs) to this lead inquiry.
//   Match the tone and context of the conversation. End with a clear CTA."
// Include CCW/TSI/SBL service context (midlife overhaul $300-400K, ZEPS ~$580K, TSI 1000+ buses, SBL lease-to-own)
// Do NOT save draft to DB — client saves when user sends
```

### `app/api/inbox/leads/route.ts`
```typescript
// POST → VAPI webhook endpoint. Creates bi_thread + bi_message from VAPI call-end payload
// Auth: x-inbox-secret header = INBOX_WEBHOOK_SECRET env var (skip check if env var not set)
const vapiLeadSchema = z.object({
  contact_name: z.string().min(1),
  contact_email: z.string().email().optional(),
  contact_phone: z.string().optional(),
  contact_company: z.string().optional(),
  message: z.string().min(1),
  source: z.enum(['vapi_chat', 'contact_form', 'email', 'phone']).default('vapi_chat'),
  company: z.enum(['CCW', 'TSI', 'SBL']).default('CCW'),
})
// Returns: { thread_id, message_id }
```

### `app/api/inbox/templates/route.ts`
```typescript
// GET ?company=CCW → returns CCW + ALL templates, ordered by sort_order ASC
```

---

## MICRO-PROMPTS

### MP1: DB Migration + Types (2 files)
1. `supabase/migrations/011_inbox.sql` (CREATE) — full SQL above
2. `lib/database.types.ts` (MODIFY) — add BIThread, BIMessage, BIReplyTemplate row/insert/update types following existing bus_ table pattern

Run migration via `supabase db push` or Supabase MCP.

Verify:
1. `npx tsc --noEmit` → zero errors
2. `SELECT table_name FROM information_schema.tables WHERE table_name LIKE 'bi_%'` → 3 rows
3. `SELECT count(*) FROM bi_reply_templates` → 6

---

### MP2: API Routes — Threads CRUD + VAPI Webhook (3 files)
1. `app/api/inbox/threads/route.ts` (CREATE — GET list + POST create)
2. `app/api/inbox/threads/[id]/route.ts` (CREATE — GET detail + PATCH update)
3. `app/api/inbox/leads/route.ts` (CREATE — POST webhook, no Clerk auth)

Key: Use `import { createClient } from '@/lib/supabase/server'`. No tryAuth().

Verify:
1. `npx tsc --noEmit` → zero errors
2. POST to `/api/inbox/leads` with sample payload → HTTP 201 with `{thread_id, message_id}`
3. GET `/api/inbox/threads` → HTTP 200 with `{threads: [...], unread_total: 1}`

---

### MP3: API Routes — Messages + AI Draft + Templates (3 files)
1. `app/api/inbox/threads/[id]/messages/route.ts` (CREATE — POST send)
2. `app/api/inbox/threads/[id]/draft/route.ts` (CREATE — POST AI draft)
3. `app/api/inbox/templates/route.ts` (CREATE — GET list by company)

AI draft: use claude-haiku-4-5-20251001, fetch last 5 messages for context, include company-specific service context, return `{ draft: string }`. Do NOT save draft to DB.

Verify:
1. `npx tsc --noEmit` → zero errors
2. POST to `/api/inbox/threads/{id}/draft` → HTTP 200 with non-empty AI draft
3. GET `/api/inbox/templates?company=CCW` → 2 CCW templates

---

### MP4: Inbox Page + Client UI (2 files)
1. `app/dashboard/inbox/page.tsx` (CREATE — Server Component with `export const dynamic = 'force-dynamic'`)
2. `app/dashboard/inbox/inbox-client.tsx` (CREATE — "use client")

InboxClient layout:
- Split panel: left 1/3 thread list, right 2/3 conversation
- Thread list: contact_name (bold if unread), last_message_preview (80 chars), timeAgo, source badge (VAPI=purple, contact_form=blue, email=indigo, phone=amber)
- Filter bar: All | Unread | VAPI | Form | Email | Phone
- Conversation panel:
  - Header: contact_name, contact_company, source badge, assigned_to dropdown (hardcoded: ['Unassigned', 'Dale', 'Brad'])
  - Message bubbles: inbound = left gray, outbound = right blue
  - Reply area: textarea (simple useState — no RHF needed), "Quick Templates" dropdown, "Draft AI Reply" button (Sparkles icon)
  - "Draft AI Reply" flow: POST → spinner → populate textarea. Button text becomes "Regenerate" after first draft.
  - "Send Reply": POST messages → optimistic add → clear textarea → PATCH thread mark_read
- Mobile at 375px: thread list full-width, conversation full-width with back button when thread selected
- All API calls use fetch() — no SWR/React Query
- Loading: skeleton lines on thread select
- Error: "Could not load messages. Retry?" with retry button

Verify:
1. `npx tsc --noEmit` → zero errors
2. `/dashboard/inbox` renders (empty state or thread list)
3. Click thread → messages render in right panel
4. "Draft AI Reply" → textarea populates within 5s

---

### MP5: Sidebar Nav + Unread Badge (1 file)
1. `components/dashboard/Sidebar.tsx` (MODIFY)

Changes:
- Add `MessageSquare` to lucide-react import
- Add "Comms" NavGroup to CCW_GROUPS, TSI_GROUPS, AND SBL_GROUPS (all three), after Operations group:
  ```
  { label: 'Comms', items: [{ label: 'Inbox', href: '/dashboard/inbox', icon: MessageSquare }] }
  ```
- Add state: `const [unreadCount, setUnreadCount] = useState(0)`
- useEffect on mount: fetch('/api/inbox/threads').then → setUnreadCount(d.unread_total || 0). Refetch every 30s via setInterval.
- In NavLink render, when `item.href === '/dashboard/inbox'` AND `unreadCount > 0` AND `!collapsed`:
  ```
  <span className="ml-auto bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
    {unreadCount > 9 ? '9+' : unreadCount}
  </span>
  ```

Verify:
1. `npx tsc --noEmit` → zero errors
2. Sidebar shows "Inbox" under "Comms" group in all three company views
3. With unread threads: badge number appears next to Inbox nav item

---

### MP6: Lint, Build, Commit, Deploy
1. `npx tsc --noEmit` → zero errors
2. `npm run build` → zero errors
3. `git add app/api/inbox/ app/dashboard/inbox/ components/dashboard/Sidebar.tsx lib/database.types.ts supabase/migrations/011_inbox.sql`
4. `git commit -m "feat(inbox): two-way message inbox + AI writing assistant\n\nAdds bi_ tables (threads, messages, reply_templates), /api/inbox/* routes,\n/dashboard/inbox split-panel UI with AI draft, VAPI lead webhook,\nand sidebar nav with unread badge for CCW/TSI/SBL.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"`
5. `git pull --rebase origin main && git push origin main`
6. Confirm Vercel deploy triggered

---

## ERROR HANDLING
- GET /api/inbox/threads failure: pass empty array to client — user sees empty state, not crash
- POST /api/inbox/leads DB failure: return 500 (VAPI retries). Log `console.error('[inbox/leads]', err)`
- POST /api/inbox/threads/[id]/draft Anthropic unavailable: return 503 with `{ error: "AI draft unavailable — please write your reply manually" }`. Client shows error toast, textarea stays empty.
- POST /api/inbox/threads/[id]/messages DB failure: return 500, client shows toast "Failed to send — try again", remove from optimistic UI
- No silent catch blocks. Every catch logs with route identifier prefix.

---

## ENV VARS

**New (add to .env.local + Vercel):**
- `INBOX_WEBHOOK_SECRET` — generate with `openssl rand -hex 16`. Optional — if not set, webhook auth skipped in dev.

**Already present — verify, do not recreate:**
- `ANTHROPIC_API_KEY` ✅
- `NEXT_PUBLIC_SUPABASE_URL` ✅
- `SUPABASE_SERVICE_ROLE_KEY` ✅
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` ✅
- `CLERK_SECRET_KEY` ✅

## INSTALL
No new packages needed. All dependencies already in package.json:
- `@anthropic-ai/sdk ^0.79.0` ✅
- `zod ^4.3.6` ✅
- `lucide-react ^0.577.0` ✅ (MessageSquare available)
- `sonner ^2.0.7` ✅ (toasts)

---

## DO NOT
- Do NOT use tryAuth() — does not exist in bus-engine
- Do NOT use createServiceSupabase() — function is createClient() in this codebase
- Do NOT add Twilio — no TWILIO env vars set. Outbound = 'direct' (in-app only)
- Do NOT show empty stat cards — use full-page empty CTA
- Do NOT add Inbox only to CCW nav — must appear in TSI and SBL nav groups too
- Do NOT install twilio, swr, react-query, axios
- Do NOT commit with failing build
- Do NOT auto-merge threads by phone/email — one thread per bi_thread.id

---

## LOCKED IMPLEMENTATION PROMPT

```
You are building the Inbox + AI Writing Assistant for bus-engine.
Project: C:\Users\bradp\dev\bus-engine
SPEC: C:\Users\bradp\dev\bus-engine\SPEC-inbox-ai-assistant-2026-03-18.md

Stack: Next.js 16 App Router, Supabase (service role via lib/supabase/server.ts createClient()),
Clerk (middleware protects /dashboard/**, but /api/* is NOT protected — use auth() inline if needed),
TypeScript strict, Tailwind, shadcn/ui, sonner for toasts.
AI: @anthropic-ai/sdk already installed — use claude-haiku-4-5-20251001, non-streaming.

CRITICAL PATTERNS:
- Supabase: import { createClient } from '@/lib/supabase/server' (NOT createServiceSupabase)
- No tryAuth() helper exists in this codebase
- /api/inbox/leads is a webhook — NO Clerk auth on this route
- AI draft: read app/api/ai-chat/route.ts first — replicate its Anthropic pattern exactly
- New tables: bi_threads, bi_messages, bi_reply_templates (migration 011_inbox.sql)

Execute in order. Max 3 files per pass. Stop after each pass and verify npx tsc --noEmit before continuing.

MP1: supabase/migrations/011_inbox.sql + lib/database.types.ts
MP2: app/api/inbox/threads/route.ts + app/api/inbox/threads/[id]/route.ts + app/api/inbox/leads/route.ts
MP3: app/api/inbox/threads/[id]/messages/route.ts + app/api/inbox/threads/[id]/draft/route.ts + app/api/inbox/templates/route.ts
MP4: app/dashboard/inbox/page.tsx + app/dashboard/inbox/inbox-client.tsx
MP5: components/dashboard/Sidebar.tsx (add Comms group + MessageSquare + unread badge)
MP6: lint + build + commit + deploy

After all MPs pass tsc and build:
- git commit -m "feat(inbox): two-way message inbox + AI writing assistant (bi_ tables, /api/inbox/*, sidebar badge)"
- git pull --rebase origin main && git push origin main
- Confirm Vercel deploy URL
```
