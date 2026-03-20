# SPEC: Proposals — Reveal App Integration
**Project:** bus-engine | **Industry:** transit-bus
**Generated:** 2026-03-18

---

## DECISION LOG

| Assumption | Reality | Impact |
|---|---|---|
| /api/reveals POST is the deck creation endpoint | /api/reveals POST is a STUB. Real deck generation uses /api/deck-generator/generate POST | Must call deck-generator, not reveals |
| Deck generator requires Clerk user auth | Confirmed — userId from auth() is mandatory. No service key variant exists | Must add service-key API route to reveal-app. Pattern exists: REVEAL_AGENCY_SECRET used by generate-from-agency route |
| Polling happens on reveal-app side | Polling must happen on bus-engine side. Status endpoint /api/deck-generator/status/[id] also requires Clerk auth | Service route on reveal-app must expose status check with service key auth |
| PPTX download is a redirect URL | PPTX stored in Supabase Storage, downloaded via /api/deck-generator/download/[id] (requires Clerk auth) | Service route must proxy download or return signed storage URL |
| bus-engine has Supabase migrations up to 010 | Confirmed — next migration is 011 | Migration file: 011_bus_proposals.sql |
| verticalKey 'bus_transit' exists in reveal-app | Does NOT exist — needs to be seeded | Seed insert required before MP1 |

## HEALTH ISSUES FOUND
NONE — health audit passed 10/10.

## ENVIRONMENT VERIFICATION
Run before writing any code:
- [ ] `REVEAL_APP_URL` present in bus-engine `.env.local` — add: `REVEAL_APP_URL=https://reveal-app-beta.vercel.app`
- [ ] `REVEAL_SERVICE_KEY` present in bus-engine `.env.local` — generate and add; also add to reveal-app Vercel env
- [ ] Reveal-app DB: `SELECT * FROM rv_vertical_profiles WHERE vertical_key = 'bus_transit'` → must return 1 row (seed in MP1)
- [ ] reveal-app `/api/deck-generator/service/generate` route exists and returns 201 with `{deckId, status: 'queued'}` when called with valid service key

## SUCCESS CRITERIA
1. Clicking "Generate Proposal" creates a bp_proposals row and shows pulsing status indicator within 2 seconds
2. Status auto-updates from 'queued' → 'researching' → 'generating' → 'complete' every 10 seconds via polling
3. On complete: Gamma URL (opens new tab), PPTX download link, shareable link all render on card
4. Three company contexts (CCW/TSI/SBL) each produce distinct input forms with correct per-company fields
5. Proposals list shows history of all generated proposals with status badges
6. Mobile/responsive tested at 375px
7. No proposal can be accessed/polled without matching the bus-engine Supabase row (ownership verified server-side)

---

## READ BEFORE TOUCHING ANYTHING
- `C:\Users\bradp\dev\bus-engine\components\dashboard\Sidebar.tsx` — nav groups by company
- `C:\Users\bradp\dev\bus-engine\lib\database.types.ts` — existing bus_ table types — do NOT reuse these table names
- `C:\Users\bradp\dev\bus-engine\app\dashboard\pipeline\actions.ts` — canonical Server Action pattern
- `C:\Users\bradp\dev\reveal-app\src\app\api\reveals\generate-from-agency\route.ts` — **EXACT service-key auth pattern to replicate**
- `C:\Users\bradp\dev\reveal-app\src\app\api\deck-generator\generate\route.ts` — real deck creation route (Clerk auth, 201 returns {deckId, status: 'queued'})
- `C:\Users\bradp\dev\reveal-app\src\app\api\deck-generator\status\[id]\route.ts` — status polling shape
- `C:\Users\bradp\dev\reveal-app\src\types\deck-generator.ts` — DeckGenerationStatus union type, all valid status values

---

## MULTI-REPO NOTICE
- **PRIMARY:** `C:\Users\bradp\dev\bus-engine`
- **SECONDARY:** `C:\Users\bradp\dev\reveal-app` — two new service-key routes added

**DEPENDENCY RULE:** Reveal-app service route (MP1) must be built and deployed BEFORE bus-engine MP2 calls it.

---

## USER JOURNEY

**STATE: NEW USER (zero proposals)**
- Centered Bus icon, company-specific tagline, "Generate Your First Proposal" button
- No empty stat cards, no search bar

**STATE: IN PROGRESS (proposal generating)**
- Proposal card with pulsing amber badge showing current stage_label
- Auto-polls every 10 seconds — no manual refresh needed

**STATE: ESTABLISHED (1+ proposals complete)**
- Proposals list — each card: client name, company badge, date, status badge, three action buttons (Open in Gamma, Download PPTX, Copy Link)
- Failed cards: red badge + error message + "Retry" button

---

## DATABASE CHANGES

### New Table: `bp_proposals`
File: `C:\Users\bradp\dev\bus-engine\supabase\migrations\011_bus_proposals.sql`

```sql
CREATE TABLE IF NOT EXISTS bp_proposals (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company       TEXT NOT NULL CHECK (company IN ('CCW', 'TSI', 'SBL')),
  client_name   TEXT NOT NULL,
  service_type  TEXT NOT NULL,
  bus_count     INTEGER NOT NULL DEFAULT 1,
  est_value     NUMERIC(12,2),
  contact_name  TEXT,
  notes         TEXT,

  -- reveal-app deck generator fields
  reveal_deck_id   TEXT,
  reveal_status    TEXT NOT NULL DEFAULT 'pending'
                     CHECK (reveal_status IN (
                       'pending','queued','researching','outlining',
                       'generating','narrating','publishing',
                       'complete','failed','partially_completed'
                     )),
  reveal_stage_label TEXT,
  gamma_url        TEXT,
  pptx_ready       BOOLEAN NOT NULL DEFAULT FALSE,
  error_message    TEXT,

  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE bp_proposals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "all_authenticated" ON bp_proposals
  FOR ALL USING (auth.role() = 'authenticated');

CREATE OR REPLACE FUNCTION bp_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END $$;
CREATE TRIGGER bp_proposals_updated_at
  BEFORE UPDATE ON bp_proposals
  FOR EACH ROW EXECUTE FUNCTION bp_set_updated_at();
```

### Reveal-App Vertical Seed (run via Supabase MCP):
```sql
INSERT INTO rv_vertical_profiles (vertical_key, name, auto_publish, data_freshness_class, hipaa_required, financial_compliance_required, legal_disclaimer_required, human_approval_required, realtime_data_required)
VALUES ('bus_transit', 'Transit Bus — CCW/TSI/SBL', true, 'static', false, false, false, false, false)
ON CONFLICT (vertical_key) DO NOTHING;
```

---

## SKELETON CODE CONTRACTS

### `C:\Users\bradp\dev\bus-engine\lib\reveal-client.ts`
```typescript
interface CreateDeckInput {
  clientName:  string
  deckType:    'proposal'
  verticalKey: 'bus_transit'
  serviceType: string
  busCount:    number
  estValue?:   number
  contactName?: string
  company:     'CCW' | 'TSI' | 'SBL'
}

export async function createDeckViaService(input: CreateDeckInput): Promise<{ deckId: string; status: 'queued' }>
export async function getDeckStatusViaService(deckId: string): Promise<{
  id: string; status: string; stage_label: string;
  gamma_url: string | null; pptx_ready: boolean; error_message: string | null
}>
```

Per-company `recipientPriorities` to pass to reveal-app:
- CCW: `"Transit agency procurement teams evaluating rebuild/overhaul vs. new bus ROI. FTA compliance and ZEPS transition planning are top priorities."`
- TSI: `"Fleet managers and transit directors comparing pre-owned options. 60-day delivery and FTA compliance certifications are the decision drivers."`
- SBL: `"Transit operators evaluating fleet expansion without capital purchase. Flexible terms, monthly rate certainty, and fleet optionality are key."`

### `C:\Users\bradp\dev\bus-engine\components\dashboard\ProposalsClient.tsx`
```typescript
'use client'
interface BpProposal {
  id: string; company: 'CCW' | 'TSI' | 'SBL'
  client_name: string; service_type: string; bus_count: number
  est_value: number | null; contact_name: string | null
  reveal_status: string; reveal_stage_label: string | null
  gamma_url: string | null; pptx_ready: boolean
  error_message: string | null; created_at: string
}
export function ProposalsClient({ initialProposals }: { initialProposals: BpProposal[] }): JSX.Element
```

### `C:\Users\bradp\dev\bus-engine\components\dashboard\GenerateProposalDialog.tsx`
```typescript
'use client'
export function GenerateProposalDialog({
  company,
  onProposalCreated
}: {
  company: 'CCW' | 'TSI' | 'SBL'
  onProposalCreated: (proposal: BpProposal) => void
}): JSX.Element
```

Per-company `service_type` select options:
- CCW: `[overhaul, remanufacture, ZEPS, CNG, body_paint]`
- TSI: `[single_bus, fleet_purchase, FTA_compliant]`
- SBL: `[short_term, long_term, lease_to_own]`

---

## MICRO-PROMPTS

### MP1: Reveal-App Service Routes [REVEAL-APP REPO]

**Pre-condition:** Run reveal-app vertical seed SQL above first.

Files:
1. `src/app/api/deck-generator/service/route-utils.ts` (CREATE)
2. `src/app/api/deck-generator/service/generate/route.ts` (CREATE)
3. `src/app/api/deck-generator/service/status/[id]/route.ts` (CREATE)

Instructions:
- Read `generate-from-agency/route.ts` fully first — replicate its auth pattern exactly
- Read `deck-generator/generate/route.ts` fully — replicate insert logic, replace `auth()` with `REVEAL_DECK_SERVICE_USER_ID` env var
- `route-utils.ts`: `export function verifyServiceKey(req: Request): boolean` — checks `Authorization: Bearer {REVEAL_DECK_SERVICE_KEY}`
- `service/generate/route.ts`: validates with ServiceGenerateSchema, inserts to `rv_deck_generations` with `user_id = process.env.REVEAL_DECK_SERVICE_USER_ID ?? 'bus-engine-service'`, returns `{ deckId, status: 'queued' }`
- `service/status/[id]/route.ts`: service key auth, query `rv_deck_generations` by id via supabaseAdmin (no ownership check), return `{ id, status, stage_label, gamma_url, pptx_ready, error_message, slides_count }`

New env vars for reveal-app:
- `REVEAL_DECK_SERVICE_KEY` — generate with `openssl rand -hex 32`
- `REVEAL_DECK_SERVICE_USER_ID=bus-engine-service`

Verify:
1. `npx tsc --noEmit` in reveal-app → zero errors
2. POST to service/generate with service key → HTTP 201 with `{deckId, status: 'queued'}`
3. GET service/status/{deckId} with service key → HTTP 200 with status object

**Deploy reveal-app to Vercel before proceeding to MP2.**

---

### MP2: Bus-Engine DB Migration + Reveal Client + API Route [BUS-ENGINE REPO]

Files:
1. `supabase/migrations/011_bus_proposals.sql` (CREATE)
2. `lib/reveal-client.ts` (CREATE)
3. `app/api/proposals/route.ts` (CREATE — GET list + POST create)

Instructions:
- Run migration via `npx supabase db push` or Supabase MCP
- `reveal-client.ts`: uses `REVEAL_APP_URL` + `REVEAL_SERVICE_KEY` env vars. POST create builds `audience`, `verbatimStats`, and per-company `recipientPriorities` strings before calling service/generate
- `api/proposals/route.ts`: POST creates bp_proposals row with `reveal_status='pending'`, calls `createDeckViaService`, updates row with `reveal_deck_id` + `reveal_status='queued'`. On reveal error: set `reveal_status='failed'`, still return 201.

New env vars for bus-engine:
- `REVEAL_APP_URL=https://reveal-app-beta.vercel.app`
- `REVEAL_SERVICE_KEY={same value as REVEAL_DECK_SERVICE_KEY in reveal-app}`

Verify:
1. `npx tsc --noEmit` → zero errors
2. `SELECT count(*) FROM bp_proposals` in Supabase → table exists
3. POST `/api/proposals` with test data → HTTP 201 with `reveal_deck_id` populated

---

### MP3: Status Poll API + Proposals Page [BUS-ENGINE REPO]

Files:
1. `app/api/proposals/[id]/status/route.ts` (CREATE)
2. `app/dashboard/proposals/page.tsx` (CREATE — Server Component)
3. `components/dashboard/ProposalsClient.tsx` (CREATE)

Instructions:
- Status route: if status already terminal (`complete|failed|partially_completed`) return DB values immediately (no reveal call). If in-progress: call `getDeckStatusViaService`, update bp_proposals row, return updated values.
- Page: reads `?company` search param (fallback 'CCW'), queries all proposals, passes `initialProposals` to ProposalsClient
- ProposalsClient: empty state OR proposal list. Polling via `useEffect` per in-progress proposal every 10s. `clearInterval` cleanup. Company colors: CCW=#E8A020, TSI=#2563eb, SBL=#16a34a. Reads `company` from `useSearchParams()`.

Verify:
1. `npx tsc --noEmit` → zero errors
2. `/dashboard/proposals` renders — empty state OR card list

---

### MP4: Generate Dialog + Sidebar Nav [BUS-ENGINE REPO]

Files:
1. `components/dashboard/GenerateProposalDialog.tsx` (CREATE)
2. `app/api/proposals/[id]/download/route.ts` (CREATE — returns disabled stub, PPTX download deferred to MP5)
3. `components/dashboard/Sidebar.tsx` (MODIFY — add Proposals to Business group for CCW/TSI/SBL)

Instructions:
- Dialog: react-hook-form + zod. Per-company service_type options as specified above. On submit: POST /api/proposals → optimistic add → close dialog → `toast.success`. Loading state: spinner + "Generating..." while fetching.
- Download route: check `pptx_ready`. If false, return 404. If true: return redirect to reveal-app download (stub — note in response that service download route is MP5).
- Sidebar: add `{ label: 'Proposals', href: '/dashboard/proposals', icon: FileText }` to Business group in CCW_GROUPS, TSI_GROUPS, SBL_GROUPS. FileText already imported.

Verify:
1. `npx tsc --noEmit` → zero errors
2. Sidebar Business group has "Proposals" link
3. Click Proposals → Generate button → dialog opens → submit → toast + card appears + pulsing badge → 10s → badge updates

---

### MP5 (Optional): PPTX Download Service Route [REVEAL-APP REPO]

File: `src/app/api/deck-generator/service/download/[id]/route.ts`

- Service key auth
- Query `rv_deck_generations` by id via supabaseAdmin
- If `pptx_storage_path` null: return 404
- Generate Supabase Storage signed URL (60s expiry): `supabaseAdmin.storage.from('deck-pptx').createSignedUrl(pptx_storage_path, 60)`
- Return `{ download_url: signedUrl, filename: "${safeName}-proposal.pptx" }`
- Update bus-engine download route to call this instead of stubbing

---

### MP6: Lint, Build, Commit, Deploy (BOTH REPOS)

REVEAL-APP first:
1. `npm run lint` → zero warnings
2. `npm run build` → zero errors
3. `git add src/app/api/deck-generator/service/`
4. `git commit -m "feat(proposals): add service-key deck generator routes for bus-engine integration"`
5. `git push origin main` → Vercel deploys

BUS-ENGINE after reveal-app is live:
6. `npm run build` → zero errors
7. `git add supabase/migrations/011_bus_proposals.sql lib/reveal-client.ts app/api/proposals/ app/dashboard/proposals/ components/dashboard/ProposalsClient.tsx components/dashboard/GenerateProposalDialog.tsx components/dashboard/Sidebar.tsx`
8. `git commit -m "feat(proposals): add proposal generation via reveal-app deck generator (CCW/TSI/SBL)"`
9. `git push origin main` → Vercel deploys

---

## ERROR HANDLING

- `createDeckViaService` failure: set `reveal_status='failed'`, `error_message=err.message`. No auto-retry. User generates again.
- `getDeckStatusViaService` poll failure: skip silently (next poll retries in 10s). After 3 consecutive failures: show "Status check unavailable — deck may still be generating" in UI. Do NOT set DB status to failed.
- Supabase insert failure on POST: return HTTP 500, `toast.error("Failed to save proposal. Please try again.")`.
- All server errors logged with `console.error('[proposals]' ...)` prefix.

---

## ENV VARS

**Bus-engine (add):**
- `REVEAL_APP_URL=https://reveal-app-beta.vercel.app`
- `REVEAL_SERVICE_KEY={generate with openssl rand -hex 32}`

**Reveal-app (add):**
- `REVEAL_DECK_SERVICE_KEY={same value as REVEAL_SERVICE_KEY}`
- `REVEAL_DECK_SERVICE_USER_ID=bus-engine-service`

---

## INSTALL
No new packages needed for either repo. All dependencies already present.

---

## DO NOT
- Do NOT call `/api/reveals POST` — it is a stub
- Do NOT call `/api/deck-generator/generate` directly from bus-engine — requires Clerk auth
- Do NOT store `pptx_storage_path` in bp_proposals — reveal-app owns that
- Do NOT add empty stat cards on /dashboard/proposals — zero state uses full-page empty CTA only
- Do NOT commit with failing build in either repo
- Do NOT improvise slide count — `verticalKey: 'bus_transit'` + `deckType: 'proposal'` tells the pipeline everything
- Do NOT add Proposals to Company, Compliance, or Operations nav groups — Business group only
- Do NOT hard-code `REVEAL_SERVICE_KEY` value — env var only

---

## LOCKED IMPLEMENTATION PROMPT

```
You are building the Proposals feature for bus-engine (Reveal App integration).
Primary project: C:\Users\bradp\dev\bus-engine
Secondary project: C:\Users\bradp\dev\reveal-app (new service routes only)
SPEC: C:\Users\bradp\dev\bus-engine\SPEC-proposals-reveal-2026-03-18.md

CRITICAL READ FIRST:
- C:\Users\bradp\dev\reveal-app\src\app\api\reveals\generate-from-agency\route.ts — service key auth pattern
- C:\Users\bradp\dev\reveal-app\src\app\api\deck-generator\generate\route.ts — real deck creation logic
- C:\Users\bradp\dev\reveal-app\src\types\deck-generator.ts — status union types

Stack (bus-engine): Next.js 16 App Router, Supabase service role, Clerk middleware, TypeScript strict, react-hook-form + zod, shadcn/ui, sonner for toasts
Stack (reveal-app): Next.js, Supabase service role, TypeScript

Execute in order. Max 3 files per pass. Stop after each pass and verify npx tsc --noEmit before continuing.

DEPENDENCY ORDER:
MP1: reveal-app service routes → deploy reveal-app → THEN
MP2: bus-engine migration + reveal-client.ts + api/proposals/route.ts
MP3: bus-engine status route + proposals page + ProposalsClient
MP4: GenerateProposalDialog + download stub + Sidebar.tsx
MP5 (optional): reveal-app PPTX download service route
MP6: lint + build + commit + deploy both repos

After all MPs pass tsc and build: confirm Vercel deploy URLs for both repos.
```
