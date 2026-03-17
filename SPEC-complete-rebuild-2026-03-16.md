━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPEC: Complete Bus-Engine Rebuild — Three Exceptional Websites + Operations Dashboard
Project: bus-engine | Path: C:\Users\bradp\dev\bus-engine | Industry: transit-bus-manufacturing
Research passes: 3 (codebase audit + competitive research + SEO/website research)
Gaps closed: 11 | Blockers: NONE
Generated: 2026-03-16
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## DECISION LOG
| Assumption | Reality | Impact |
|---|---|---|
| Build was live | Code complete but dashboards are mostly stubs; client components empty or placeholder | Must rebuild most dashboard pages from scratch |
| ccw_ table prefix | Migrations use ccw_ but ALL queries and types use bus_ prefix | All migrations must be rewritten with bus_ prefix OR all queries updated — choosing bus_ prefix (matches types) |
| Three equal brands | CCW is the mothership; TSI/SBL are sub-brands sharing one platform | Build one Next.js project with /tsi and /sbl sub-routes, not separate repos |
| Simple marketing site | Needs cinematic design, AI chat, SEO-optimized content, interactive ZEPS calculator | Full rebuild of all three websites with wow-factor design |
| Generic dashboard | CEO of 10-location operation needs: production throughput, contract burn rates, DSO, parts shortages | Rebuild dashboard with these 4 as the Day-1 Layer 1 |

---

## HEALTH ISSUES FOUND (fix as first micro-prompt)
- **CRITICAL — Table prefix mismatch**: Migrations create `ccw_*` tables; all queries and `database.types.ts` reference `bus_*` tables → EVERY Supabase query fails. Fix: rewrite migrations 001–004 with `bus_` prefix.
- **MEDIUM — Stub client components**: `WorkOrdersClient`, `FleetClient`, `FinanceClient`, `PartsClient`, `PipelineClient`, `TechDetailClient`, `WODetailClient` are empty or skeleton stubs. Must be fully implemented.
- **MEDIUM — Clerk middleware disabled**: `middleware.ts` is bare `NextResponse.next()`. Dashboard routes are fully public. Must add Clerk protection for `/dashboard/*`.
- **LOW — Missing Unsplash image domain**: `images.unsplash.com` not in `next.config.ts` — fallback images will 500.

---

## ENVIRONMENT VERIFICATION
Run before writing any code. Stop if any fail.
- [ ] Node version: `node --version` → expected: `v18+`
- [ ] Build passes: `npm run build` → expected: zero errors (already confirmed clean)
- [ ] Env var `NEXT_PUBLIC_SUPABASE_URL` present in `.env.local` → already seeded ✅
- [ ] Env var `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` present in `.env.local` → already seeded ✅
- [ ] Env var `ANTHROPIC_API_KEY` present in `.env.local` → ADD before AI chat micro-prompt

---

## SUCCESS CRITERIA
1. All three website sections (CCW, TSI, SBL) render with cinematic design, scroll animations, and "wow factor"
2. AI chat widget operational on all three sites — answers procurement questions using CCW/TSI/SBL knowledge base
3. Dashboard Command Center shows real KPI tiles: Buses in Production, Contract Backlog, DSO/AR, Parts Alerts
4. All 12 dashboard pages fully implemented with demo data (not stubs)
5. ZEPS interactive cost calculator works — inputs fleet size/fuel cost, outputs savings vs. diesel and vs. new OEM electric
6. SEO: every page has title, description, canonical, og:image, schema markup (Organization, Service, LocalBusiness)
7. Clerk middleware protects `/dashboard/*`; public routes unprotected
8. `npx tsc --noEmit` → zero errors
9. `npm run build` → zero errors
10. Mobile responsive at 375px — all pages
11. Bus prefix mismatch fixed — all migrations use `bus_` prefix matching `database.types.ts`

---

## READ BEFORE TOUCHING ANYTHING
- `lib/demo-data.ts` — 266-line complete demo dataset. Read before touching any dashboard page.
- `lib/database.types.ts` — 18 tables with `bus_` prefix. Migrations must match this EXACTLY.
- `supabase/migrations/001-004` — Will be REWRITTEN with `bus_` prefix in Micro-Prompt 1.
- `components/dashboard/Sidebar.tsx` — Already built and complete. Do NOT rewrite.
- `components/dashboard/MorningHuddle.tsx` — Already built and complete. Do NOT rewrite.
- `app/(marketing)/layout.tsx` — Marketing layout with NavBar. Keep, replace NavBar content.
- `package.json` — Installed: Next.js 16, Clerk 7, Supabase 2.98, Recharts, react-hook-form, zod, Tailwind 4. Do NOT install any of these again.

---

## ARCHITECTURE DECISIONS

### Three Brands — One Codebase
All three sites live in the same Next.js project. Routing:
- `/` → CCW homepage (Complete Coach Works)
- `/tsi` → TSI homepage (Transit Sales International)
- `/tsi/inventory` → Bus inventory listing
- `/sbl` → SBL homepage (Shuttle Bus Leasing)
- `/sbl/fleet` → Available lease fleet

This allows one deployment, one AI chat instance, shared component library.

### Design System
- **CCW Colors:** Navy `#003087`, Amber `#E8A020`, Dark Steel `#0A1628`, White `#FFFFFF`
- **TSI Colors:** Government Blue `#1a5fa8`, Clean White, Steel Gray `#64748b`
- **SBL Colors:** Forest Green `#2d7a3a`, Deep Earth `#1a2e1a`, Amber accent shared with CCW
- **Font:** Geist Sans (already in Next.js 16) — no new font install needed
- **Animation:** Framer Motion (install) — scroll-triggered section reveals, counter animations
- **Hero video overlay pattern:** Full-viewport section with dark overlay gradient, white text

### AI Chat
- Powered by `claude-sonnet-4-6` (Anthropic SDK already available; needs `ANTHROPIC_API_KEY`)
- System prompt pre-loaded with CCW/TSI/SBL knowledge base (services, certifications, FTA programs, ZEPS specs, pricing signals)
- Widget appears bottom-right on all marketing pages
- B2G-aware: structured prompts for procurement officers ("Are you looking to refurbish, purchase, or lease?")
- No aggressive lead capture on first message — earns trust first
- After 2+ exchanges, surfaces "Request a Quote" CTA

---

## DATABASE CHANGES

### THE FIX (Micro-Prompt 1): Rewrite migrations with bus_ prefix

All four migration files must be recreated using `bus_` prefix to match `database.types.ts`.

```sql
-- 001 becomes:
CREATE TABLE bus_agencies (...);
CREATE TABLE bus_contracts (...);
CREATE TABLE bus_milestones (...);

-- 002 becomes:
CREATE TABLE bus_locations (...);
CREATE TABLE bus_vehicles (...);
CREATE TABLE bus_work_orders (...);

-- 003 becomes:
CREATE TABLE bus_technicians (...);
CREATE TABLE bus_parts (...);
CREATE TABLE bus_part_usage (...);

-- 004 becomes:
CREATE TABLE bus_invoices (...);
CREATE TABLE bus_insurance_policies (...);
CREATE TABLE bus_compliance_docs (...);
CREATE TABLE bus_rfp_pipeline (...);
```

### Complete Table Schemas (bus_ prefix)

```sql
-- Migration 001: Agencies + Contracts
CREATE TABLE bus_agencies (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  short_name text,
  contact_name text,
  contact_email text,
  contact_phone text,
  state text,
  city text,
  address text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE bus_contracts (
  id bigserial PRIMARY KEY,
  contract_number text UNIQUE NOT NULL,
  agency_id bigint REFERENCES bus_agencies(id),
  title text NOT NULL,
  value numeric(12,2),
  bus_count int,
  start_date date,
  end_date date,
  status text DEFAULT 'active',
  labor_budget_hours numeric(10,2),
  labor_hours_used numeric(10,2) DEFAULT 0,
  total_cost numeric(12,2) DEFAULT 0,
  total_revenue numeric(12,2) DEFAULT 0,
  total_invoiced numeric(12,2) DEFAULT 0,
  total_collected numeric(12,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE bus_milestones (
  id bigserial PRIMARY KEY,
  contract_id bigint REFERENCES bus_contracts(id),
  title text NOT NULL,
  due_date date,
  billing_amount numeric(12,2),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bus_agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON bus_agencies TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON bus_contracts TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON bus_milestones TO service_role USING (true) WITH CHECK (true);

-- Migration 002: Locations + Vehicles + Work Orders
CREATE TABLE bus_locations (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  city text,
  state text,
  address text,
  phone text,
  type text DEFAULT 'satellite',
  active_wo_count int DEFAULT 0,
  utilization_pct numeric(5,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE bus_vehicles (
  id bigserial PRIMARY KEY,
  vin text,
  agency_id bigint REFERENCES bus_agencies(id),
  contract_id bigint REFERENCES bus_contracts(id),
  location_id bigint REFERENCES bus_locations(id),
  make text,
  model text,
  year int,
  length_ft int,
  fuel_type text DEFAULT 'diesel',
  status text DEFAULT 'in_shop',
  intake_date date,
  target_completion date,
  delivered_at date,
  tech_assigned text,
  days_in_shop int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE bus_work_orders (
  id bigserial PRIMARY KEY,
  wo_number text UNIQUE NOT NULL,
  vehicle_id bigint REFERENCES bus_vehicles(id),
  contract_id bigint REFERENCES bus_contracts(id),
  location_id bigint REFERENCES bus_locations(id),
  status text DEFAULT 'open',
  service_type text,
  tech_assigned text,
  opened_at timestamptz DEFAULT now(),
  target_date date,
  completed_at timestamptz,
  labor_hours numeric(8,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bus_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_work_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON bus_locations TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON bus_vehicles TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON bus_work_orders TO service_role USING (true) WITH CHECK (true);

-- Migration 003: Parts + Technicians
CREATE TABLE bus_technicians (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  location_id bigint REFERENCES bus_locations(id),
  email text,
  phone text,
  years_experience int DEFAULT 0,
  active_wo_count int DEFAULT 0,
  certifications jsonb DEFAULT '[]',
  cert_expiry date,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE bus_parts (
  id bigserial PRIMARY KEY,
  part_number text,
  description text NOT NULL,
  category text,
  supplier text,
  unit_cost numeric(10,2),
  qty_on_hand int DEFAULT 0,
  reorder_point int DEFAULT 5,
  status text DEFAULT 'ok',
  location_id bigint REFERENCES bus_locations(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE bus_part_usage (
  id bigserial PRIMARY KEY,
  work_order_id bigint REFERENCES bus_work_orders(id),
  part_id bigint REFERENCES bus_parts(id),
  qty_used int DEFAULT 1,
  unit_cost_at_time numeric(10,2),
  used_at timestamptz DEFAULT now()
);

ALTER TABLE bus_technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_part_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON bus_technicians TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON bus_parts TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON bus_part_usage TO service_role USING (true) WITH CHECK (true);

-- Migration 004: Finance + Compliance + Pipeline
CREATE TABLE bus_invoices (
  id bigserial PRIMARY KEY,
  invoice_number text UNIQUE NOT NULL,
  contract_id bigint REFERENCES bus_contracts(id),
  milestone_id bigint REFERENCES bus_milestones(id),
  invoice_type text DEFAULT 'milestone',
  amount numeric(12,2) NOT NULL,
  status text DEFAULT 'draft',
  issued_at date,
  due_date date,
  paid_at date,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE bus_insurance_policies (
  id bigsereal PRIMARY KEY,
  policy_type text NOT NULL,
  carrier text,
  policy_number text,
  coverage_limit numeric(14,2),
  effective_date date,
  expiry_date date,
  status text DEFAULT 'active',
  days_until_expiry int,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE bus_compliance_docs (
  id bigserial PRIMARY KEY,
  vehicle_id bigint REFERENCES bus_vehicles(id),
  contract_id bigint REFERENCES bus_contracts(id),
  doc_type text NOT NULL,
  status text DEFAULT 'pending',
  document_url text,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE bus_rfp_pipeline (
  id bigserial PRIMARY KEY,
  agency_name text NOT NULL,
  rfp_title text,
  deadline date,
  est_value numeric(12,2),
  status text DEFAULT 'opportunity',
  win_probability int DEFAULT 50,
  bd_owner text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bus_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_insurance_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_compliance_docs ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_rfp_pipeline ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON bus_invoices TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON bus_insurance_policies TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON bus_compliance_docs TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON bus_rfp_pipeline TO service_role USING (true) WITH CHECK (true);
```

Migration files:
- `supabase/migrations/001_bus_agencies_contracts.sql` (replaces 001_ccw_*)
- `supabase/migrations/002_bus_vehicles_workorders.sql` (replaces 002_ccw_*)
- `supabase/migrations/003_bus_parts_technicians.sql` (replaces 003_ccw_*)
- `supabase/migrations/004_bus_finance_compliance.sql` (replaces 004_ccw_*)

---

## FILE MANIFEST

### FILES TO CREATE (new — full path):
**CCW Marketing Site (rebuild):**
- `app/(marketing)/page.tsx` — CCW homepage REBUILD (cinematic hero, scroll animations, stats, ZEPS callout, AI chat)
- `app/(marketing)/about/page.tsx` — About REBUILD (leadership, ESOP story, 38-year history, 350 employees)
- `app/(marketing)/tsi/page.tsx` — TSI homepage (NEW — government blue, inventory-first, 1,000+ buses)
- `app/(marketing)/tsi/inventory/page.tsx` — TSI inventory listing (filterable, searchable)
- `app/(marketing)/sbl/page.tsx` — SBL homepage (NEW — lease types, use cases, Olympics credential)
- `app/(marketing)/sbl/fleet/page.tsx` — SBL available fleet (lease-focused card layout)
- `app/(marketing)/zeps/page.tsx` — ZEPS dedicated page (cinematic, 6-stage process, cost calculator)
- `app/(marketing)/compliance/page.tsx` — FTA/government procurement hub page
- `app/(marketing)/case-studies/page.tsx` — Agency case studies index
- `app/(marketing)/case-studies/trimet/page.tsx` — TriMet 60-ft articulated ZEPS story
- `app/(marketing)/case-studies/indygo/page.tsx` — IndyGo 21-bus story
- `app/(marketing)/case-studies/mountain-line/page.tsx` — Mountain Line refurb story

**Marketing Components (new/rebuilt):**
- `components/marketing/CinematicHero.tsx` — Full-viewport video/image hero with scroll reveal
- `components/marketing/StatsBar.tsx` — Animated counter stats (38 yrs, 350 employees, 70+ conversions, 4M miles)
- `components/marketing/ServiceCards.tsx` — 6 service cards with hover animations
- `components/marketing/ZEPSCalculator.tsx` — Interactive savings calculator (fleet size → savings vs diesel/OEM EV)
- `components/marketing/AgencyLogos.tsx` — Scrolling client logo ticker
- `components/marketing/AIChat.tsx` — AI chat widget (bottom-right, Claude-powered, B2G aware)
- `components/marketing/TSIInventoryFilter.tsx` — Filter/search bar for bus inventory
- `components/marketing/SBLLeaseTypes.tsx` — Lease type explainer cards with icons
- `components/marketing/TrustBar.tsx` — FTA/DBE/APTA/ESOP trust badges
- `components/marketing/NavBar.tsx` — REBUILD: CCW nav + TSI nav + SBL nav (context-aware)

**Dashboard Pages (full implementation):**
- `app/dashboard/page.tsx` — Command Center REBUILD (real Supabase queries with demo fallback)
- `app/dashboard/work-orders/page.tsx` — Work orders REBUILD (real kanban)
- `app/dashboard/fleet/page.tsx` — Fleet REBUILD (real vehicle table)
- `app/dashboard/contracts/page.tsx` — Contracts REBUILD (real contract cards)
- `app/dashboard/finance/page.tsx` — Finance REBUILD (real invoice ledger)
- `app/dashboard/parts/page.tsx` — Parts REBUILD (real inventory table)
- `app/dashboard/pipeline/page.tsx` — Pipeline REBUILD (real RFP CRM)
- `app/dashboard/technicians/page.tsx` — Technicians REBUILD (real roster)
- `app/dashboard/locations/page.tsx` — Locations REBUILD (real utilization grid)
- `app/dashboard/compliance/page.tsx` — Compliance REBUILD (real doc tracker)
- `app/dashboard/zeps/page.tsx` — ZEPS REBUILD (real fleet stats + calculator)
- `app/dashboard/insurance/page.tsx` — Insurance REBUILD (real policy expiry)

**Dashboard Client Components (full implementation):**
- `components/dashboard/WorkOrdersClient.tsx` — REBUILD with real kanban + demo fallback
- `components/dashboard/FleetClient.tsx` — REBUILD with real vehicle table + filters
- `components/dashboard/FinanceClient.tsx` — REBUILD with invoice ledger + aging buckets
- `components/dashboard/PartsClient.tsx` — REBUILD with inventory table + low-stock alerts
- `components/dashboard/PipelineClient.tsx` — REBUILD with RFP CRM kanban
- `components/dashboard/TechDetailClient.tsx` — REBUILD with cert tracking
- `components/dashboard/WODetailClient.tsx` — REBUILD with work order detail

**API Routes:**
- `app/api/ai-chat/route.ts` — Claude AI chat endpoint (POST, streams response)
- `app/api/tsi/inventory/route.ts` — GET bus inventory (demo data with real Supabase fallback)

**Config:**
- `lib/site-config.ts` — CCW/TSI/SBL brand config (colors, taglines, nav items)

**Infrastructure:**
- `supabase/migrations/001_bus_agencies_contracts.sql` — REPLACE ccw_ version
- `supabase/migrations/002_bus_vehicles_workorders.sql` — REPLACE ccw_ version
- `supabase/migrations/003_bus_parts_technicians.sql` — REPLACE ccw_ version
- `supabase/migrations/004_bus_finance_compliance.sql` — REPLACE ccw_ version

### FILES TO MODIFY (existing):
- `middleware.ts` — Add Clerk auth protecting `/dashboard/*`
- `next.config.ts` — Add `images.unsplash.com` to allowedDomains
- `app/layout.tsx` — Add ClerkProvider wrapper
- `lib/feature-flags.ts` — Wire flags to actual components

### MIGRATION WATERMARK: migrations/004_* → next is 005_*

### ENV VARS ALREADY PRESENT (verify, do not recreate):
- `NEXT_PUBLIC_SUPABASE_URL` ✅
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✅
- `SUPABASE_SERVICE_ROLE_KEY` ✅
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` ✅
- `CLERK_SECRET_KEY` ✅

### ENV VARS MISSING (add before AI chat micro-prompt):
- `ANTHROPIC_API_KEY` — Claude API for AI chat widget (add to .env.local + Vercel)
- `AGENCY_SNAPSHOT_SECRET` — Secret for NuStack agency-engine integration (generate 32-char random)

---

## SEO STRATEGY

### Per-Page SEO Implementation
Every page gets:
```tsx
export const metadata: Metadata = {
  title: "{page title} | Complete Coach Works",
  description: "{140-char description with primary keyword}",
  keywords: ["{kw1}", "{kw2}", ...],
  openGraph: { title, description, images: [{ url: "{og-image-url}" }] },
  alternates: { canonical: "https://bus-engine.vercel.app/{path}" },
}
```

### Schema Markup (JSON-LD, inject in layout.tsx)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Complete Coach Works",
  "description": "North America's leading transit bus refurbishment, repower, and electric conversion company",
  "url": "https://completecoach.com",
  "telephone": "+18003003751",
  "address": { "@type": "PostalAddress", "streetAddress": "1863 Service Court", "addressLocality": "Riverside", "addressRegion": "CA", "postalCode": "92507" },
  "foundingDate": "1987",
  "numberOfEmployees": "350",
  "sameAs": ["https://zepsdrive.com", "https://transitsales.com", "https://sblbus.com"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Transit Bus Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Transit Bus Midlife Refurbishment", "description": "Complete midlife rehabilitation extending bus life from 12 to 18 years at half the cost of new" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CNG Engine Repower", "description": "CARB-certified Cummins L9N Near-Zero CNG engine replacement for transit buses" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ZEPS Electric Bus Conversion", "description": "Proprietary zero-emission electric drivetrain conversion for existing transit buses" } }
    ]
  }
}
```

### AI Search Optimization (LLM-Ready Content)
Every page includes:
- `public/llms.txt` — Already exists, update with accurate content
- FAQ sections with Q&A format (LLMs pull from FAQ schema)
- Clear factual claims with numbers (LLMs prefer citable statistics)
- `FAQPage` schema markup on service pages

### Target Keywords Per Page
| Page | Primary Keyword | Secondary Keywords |
|---|---|---|
| CCW Homepage | transit bus refurbishment company | bus midlife overhaul, bus remanufacturing |
| ZEPS Page | electric bus conversion | diesel to electric bus conversion, zero emission bus retrofit |
| CNG Repower | CNG bus repower | bus engine replacement, CARB certified bus repower |
| Midlife Overhaul | bus midlife rehabilitation | transit bus life extension, bus refurbishment cost |
| TSI Homepage | used transit bus for sale | pre-owned transit bus, Gillig bus for sale |
| TSI Inventory | 40 ft transit bus for sale | used low floor bus, alternative fuel bus |
| SBL Homepage | transit bus leasing | gap bus lease, seasonal bus leasing |
| Compliance | FTA compliant bus refurbishment | Buy America transit bus, DBE bus contractor |
| Case Studies | transit bus refurbishment results | ZEPS case study, TriMet electric bus |

---

## AI CHAT SPECIFICATION

### System Prompt (inject via API route)
```
You are the CCW Fleet Advisor, an expert assistant for Complete Coach Works, Transit Sales International, and Shuttle Bus Leasing. You help transit agency fleet managers and procurement officers make smart fleet decisions.

You have expert knowledge of:
- CCW Services: Midlife refurbishment (half cost of new, half delivery time), CNG repower (CARB L9N certified), ZEPS electric conversion (70+ conversions, 4M miles, 6-month delivery), collision/structural repair
- ZEPS specs: 403/504/605 kWh battery options, works on 30/35/40/60-ft buses, Voith partnership for articulated
- TSI Inventory: 1,000+ pre-owned transit buses, 30-60ft, all fuel types (electric/CNG/hybrid/hydrogen/diesel), accelerated delivery program (60-day delivery available)
- SBL Leasing: Seasonal/contract/gap/employee shuttle lease types, lease-to-own available, Olympics supplier (2002/2010), 1,000+ bus inventory
- FTA Programs: Section 5307, 5339, Buy America requirements, useful life standards (12yr/500K miles for 40-ft), pre-award and post-delivery reviews
- Cost math: Refurb at ~$300-400K vs new bus at $700K-900K; ZEPS conversion at ~$580K vs new EV at $780K-880K+

Your communication style:
- Professional, direct, technically accurate — you're talking to fleet managers and procurement officers
- Lead with facts and numbers — government buyers need citable data
- NEVER be a generic chatbot — always know the specific product/service
- After 2+ substantive exchanges, offer: "Would you like me to set up a consultation with our team?"
- Do not capture email/contact in chat — earn trust first

Opening message: "I'm the CCW Fleet Advisor. Are you exploring fleet refurbishment, purchasing pre-owned buses, or looking at leasing options?"
```

### AI Chat API Route (`app/api/ai-chat/route.ts`)
```typescript
// POST /api/ai-chat
// Body: { messages: { role: 'user'|'assistant', content: string }[] }
// Returns: streamed text response

import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: Request) {
  const { messages } = await req.json()
  // validate with zod
  // stream response from claude-sonnet-4-6
  // return streaming Response
}
```

---

## ZEPS COST CALCULATOR SPEC

### Inputs
- Fleet size (number of buses to convert)
- Current fuel type (diesel / CNG / hybrid)
- Average miles per bus per year
- Current diesel cost per gallon OR CNG cost per DGE

### Calculations
```
New OEM electric bus cost: $830,000 per bus (midpoint of $780K-$880K)
ZEPS conversion cost: $580,000 per bus
Savings per bus at purchase: $250,000
Total purchase savings for fleet: fleetSize × $250,000

Annual fuel savings per bus (diesel to electric):
  - Diesel: avg 5-6 MPG for 40-ft bus; assume 5.5 MPG
  - Electric equivalent: ~2.6 kWh/mile
  - Annual diesel cost per bus: (miles / 5.5) × dieselPricePerGallon
  - Annual electric cost per bus: miles × 2.6 × 0.12 (avg kWh rate)
  - Annual fuel savings: dieselCost - electricCost

Annual maintenance savings per bus: $15,000 (industry estimate: fewer moving parts)

10-year total savings: (fuelSavings + maintenanceSavings) × 10 + purchaseSavings

Delivery advantage: 6 months vs 18-24 months OEM = up to 18 months of revenue service sooner
```

### Output Display
- "Your {N}-bus fleet saves **${X}M** over 10 years with ZEPS vs new OEM electric"
- Breakdown: Purchase savings | Fuel savings (10yr) | Maintenance savings (10yr)
- Timeline bar: ZEPS delivery (6mo) vs OEM (18-24mo)
- CTA: "Get a ZEPS Assessment for Your Fleet"

---

## MICRO-PROMPTS

### MICRO-PROMPT 1: Fix Table Prefix Mismatch + Core Infrastructure
Files:
- `supabase/migrations/001_bus_agencies_contracts.sql` (REPLACE — delete ccw_ version, write bus_ version)
- `supabase/migrations/002_bus_vehicles_workorders.sql` (REPLACE)
- `supabase/migrations/003_bus_parts_technicians.sql` (REPLACE)
- `supabase/migrations/004_bus_finance_compliance.sql` (REPLACE)

What to do:
1. Delete the four existing `ccw_*` migration files
2. Create four new migration files using the `bus_` prefix schemas defined in this spec's DATABASE CHANGES section. Copy the SQL EXACTLY from this spec.
3. Fix the typo in migration 004: `bus_insurance_policies` has `id bigsereal` — should be `id bigserial`
4. Modify `middleware.ts` to protect `/dashboard/*` routes with Clerk:
   ```typescript
   import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
   const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])
   export default clerkMiddleware(async (auth, req) => {
     if (isProtectedRoute(req)) await auth.protect()
   })
   export const config = { matcher: ['/((?!_next|.*\\..*).*)'] }
   ```
5. Modify `next.config.ts` — add `images.unsplash.com` to remotePatterns
6. Add `ANTHROPIC_API_KEY` placeholder to `.env.local`

Verify by:
1. `npx tsc --noEmit` → zero errors
2. `ls supabase/migrations/` → shows 4 files all starting with `bus_` (not `ccw_`)
3. `grep -r "ccw_" supabase/migrations/` → zero results

DO NOT proceed to micro-prompt 2 until both verification steps pass.

---

### MICRO-PROMPT 2: CCW Homepage Rebuild (Cinematic)
Files:
- `app/(marketing)/page.tsx` (REWRITE — cinematic homepage)
- `components/marketing/CinematicHero.tsx` (CREATE)
- `components/marketing/StatsBar.tsx` (CREATE)

What to do:
Build a cinematic CCW homepage that makes a transit agency procurement officer say "wow."

**CinematicHero.tsx** (`"use client"`):
- Full viewport height (min-h-screen)
- Background: dark overlay (bg-gradient: from-[#0A1628]/90 to-[#003087]/70) over a bus yard image from Unsplash (`https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920` — bus/transit)
- White text centered
- Headline: `"The Nation's Largest Transit Bus"` then animated typewriter cycling: `"Refurbishment Company"` / `"Electric Conversion Company"` / `"Fleet Life Extension Company"`
- Subheadline: `"Refurbished at half the cost of new. Delivered in half the time."`
- Two CTA buttons: `"Request an Assessment"` (amber bg) + `"Explore ZEPS Electric"` (outline white)
- Scroll indicator arrow at bottom center
- `"100% Employee-Owned · Est. 1987 · Riverside, CA"` badge top of hero
- On scroll: hero fades to next section (use Framer Motion `useScroll` + `useTransform`)

**StatsBar.tsx** (`"use client"`):
- Dark navy bar below hero
- 4 stat counters that animate up when scrolled into view (use Intersection Observer or Framer Motion `whileInView`)
- Stats: `38+` Years / `350+` Employees / `70+` Electric Conversions / `4M+` ZEPS Miles
- Each stat: large number in amber, label in white/70

**Homepage page.tsx** (Server Component):
Structure:
1. `<CinematicHero />`
2. `<StatsBar />`
3. Services grid (3 columns, 6 cards: Midlife Overhaul, CNG Repower, ZEPS Electric, Body/Paint, Interior Rehab, CNG Retanking — each links to service page, hover reveals description)
4. ZEPS spotlight section: dark section, `"The Future Is Already Here"`, ZEPS stats (70+ buses, 4M miles, $250K savings per bus vs OEM EV), CTA to /zeps
5. Agency logos section: `"Trusted by America's Leading Transit Agencies"` — grid of 8 agency names/logos
6. Trust bar: FTA registered badge, APTA member, DBE program, ESOP
7. CTA section: `"Ready to extend your fleet's life?"` + form link

Add metadata:
```tsx
export const metadata = {
  title: "Complete Coach Works | Transit Bus Refurbishment, Repower & Electric Conversion",
  description: "North America's leading transit bus refurbishment company. Midlife overhauls, CNG repowers, and ZEPS electric conversions. Half the cost of new, half the delivery time.",
}
```

Verify by:
1. `npx tsc --noEmit` → zero errors
2. Navigate to `http://localhost:3000` → CinematicHero renders full viewport, StatsBar visible below, 6 service cards visible

DO NOT proceed to micro-prompt 3 until verified.

---

### MICRO-PROMPT 3: Marketing NavBar + TSI Homepage
Files:
- `components/marketing/NavBar.tsx` (REWRITE)
- `components/marketing/TrustBar.tsx` (CREATE)
- `app/(marketing)/tsi/page.tsx` (CREATE)

What to do:

**NavBar.tsx** (REWRITE, `"use client"`):
- Sticky top nav with backdrop blur (bg-white/80 backdrop-blur-md on scroll, transparent at top)
- Left: CCW logo (text-based: `"CCW"` in bold navy, full name below in small text)
- Center nav links: Services (dropdown: 6 services), ZEPS, Locations, About, Compliance
- Right: Brand switcher (TSI | SBL links in their brand colors) + `"Dashboard"` button (dark navy) + `"Request a Quote"` button (amber)
- Mobile: hamburger menu that slides down

**TrustBar.tsx** (Server Component):
- Small bar at very bottom of every marketing page, above footer
- 5 trust badges inline: FTA Registered TVM | APTA Member | DBE Program Compliant | 100% Employee-Owned | CARB Certified
- Each badge: small icon + text, separated by dividers

**TSI Homepage** (`app/(marketing)/tsi/page.tsx`):
- Government blue (#1a5fa8) color scheme
- Hero: `"The Nation's Largest Selection of Pre-Owned Transit Buses"` — search bar prominently in hero (fuel type dropdown, size dropdown, "Search Inventory" button)
- Stats bar: `1,000+` Makes & Models | `30–60ft` Bus Sizes | `6` Fuel Types | `60-Day` Accelerated Delivery
- Quick filter grid: by fuel type (Electric / CNG / Hybrid / Diesel / Hydrogen / Propane)
- By size: 30ft / 35ft / 40ft / 60ft visual cards
- Services section: Training, Technical Support, Updated Manuals
- Procurement section: `"Government Procurement Made Simple"` — statewide contracts, FTA compliance, DBE documentation
- CTA: `"Submit an RFP"` + `"Browse Full Inventory"`

Add TSI metadata:
```tsx
export const metadata = {
  title: "Used Transit Buses for Sale | Transit Sales International (TSI)",
  description: "The nation's largest selection of pre-owned transit buses. 1,000+ makes and models, all fuel types including electric, CNG, and hybrid. 60-day accelerated delivery available.",
}
```

Verify by:
1. `npx tsc --noEmit` → zero errors
2. Navigate to `http://localhost:3000/tsi` → TSI homepage renders with blue color scheme, search bar in hero

---

### MICRO-PROMPT 4: ZEPS Page + SBL Homepage
Files:
- `app/(marketing)/zeps/page.tsx` (CREATE)
- `components/marketing/ZEPSCalculator.tsx` (CREATE)
- `app/(marketing)/sbl/page.tsx` (CREATE)

What to do:

**ZEPS Page** (`"use client"` sections with calculator):
- Dark cinematic hero: `"Zero Emissions. Same Trusted Chassis. 6-Month Delivery."` on near-black background with electric blue accents
- vs. Comparison table (sticky on scroll):
  | | ZEPS Conversion | New OEM Electric |
  |---|---|---|
  | Cost | ~$580,000 | $780,000–$880,000 |
  | Delivery | 6 months | 18–24 months |
  | Infrastructure | Standard 480V 3-phase | May require upgrades |
  | Buy America | ✅ Qualifies | Varies |
  | Maintenance Staff | Same chassis — no retraining | New platform |
- 6-Stage Process: animated scroll journey showing each stage as user scrolls down (use Framer Motion `motion.div` with `whileInView`)
  1. Chassis Qualification
  2. Full Strip-Down
  3. Diesel Removal
  4. ZEPS Drivetrain Install
  5. Interior Rebuild
  6. FTA QA Inspection
- Deployment map: simple CSS grid of states/cities with ZEPS buses (TriMet OR, IndyGo IN, McAllen TX, Twin Transit WA, Fresno CA)
- `<ZEPSCalculator />` section
- Bottom CTA: `"Get Your ZEPS Assessment"` → contact form

**ZEPSCalculator.tsx** (`"use client"`):
- Inputs: fleet size slider (1-50), fuel type select (diesel/CNG), avg annual miles per bus, fuel cost per gallon/DGE
- Real-time calculation output using the formula in this spec
- Output cards: Total Purchase Savings | 10-Year Fuel Savings | 10-Year Maintenance Savings | **Total 10-Year Advantage**
- Delivery timeline bar: ZEPS (6 mo, green) vs OEM (18-24 mo, gray)
- CTA button below calculator

**SBL Homepage** (`app/(marketing)/sbl/page.tsx`):
- Forest green (#2d7a3a) color scheme
- Hero: `"Need Buses Now? 1,000+ Ready to Lease."` — quick quote form inline (use type, fleet size needed, start date, duration)
- Use-case grid (6 icons): National Parks | Airports | Universities | Ski Resorts | Construction | Events/Olympics
- Lease types section (4 cards with visual icons):
  - Seasonal: `"Pay only for peak months"` — park/ski imagery
  - Gap: `"Bridge the wait for new bus deliveries"` — transit/construction imagery
  - Contract: `"Fixed-term operational stability"` — university imagery
  - Employee Shuttle: `"Corporate campus transport"` — tech campus imagery
- Olympics credential: `"Official Bus Supplier — 2002 Salt Lake City & 2010 Vancouver Winter Olympics"`
- Maintenance programs: `"We don't just hand you keys — we keep you moving"` — on-site training, driver assistance, bundled maintenance
- CTA: `"Get a Lease Quote"` button (green)

Add SBL metadata:
```tsx
export const metadata = {
  title: "Transit Bus Leasing | Seasonal, Gap & Contract Leases | SBL Bus Leasing",
  description: "Flexible transit bus leasing with 1,000+ buses available. Seasonal, gap, contract, and employee shuttle options. Official supplier for 2002 and 2010 Winter Olympics.",
}
```

Verify by:
1. `npx tsc --noEmit` → zero errors
2. Navigate to `/zeps` → ZEPS hero renders, calculator visible with inputs and outputs
3. Navigate to `/sbl` → SBL homepage renders with green color scheme, lease type cards visible

---

### MICRO-PROMPT 5: AI Chat Widget
Files:
- `app/api/ai-chat/route.ts` (CREATE)
- `components/marketing/AIChat.tsx` (CREATE)
- `app/(marketing)/layout.tsx` (MODIFY — add AIChat)

What to do:

**`app/api/ai-chat/route.ts`** (POST handler):
```typescript
import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import { NextResponse } from 'next/server'

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().max(2000),
})
const RequestSchema = z.object({
  messages: z.array(MessageSchema).max(20),
})

const SYSTEM_PROMPT = `[full system prompt from this spec's AI CHAT SPECIFICATION section]`

export async function POST(req: Request) {
  const body = await req.json()
  const { messages } = RequestSchema.parse(body)

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages,
  })

  return NextResponse.json({
    content: response.content[0].type === 'text' ? response.content[0].text : ''
  })
}
```

**`components/marketing/AIChat.tsx`** (`"use client"`):
- Floating button bottom-right: amber circle with chat icon, `"CCW Fleet Advisor"` tooltip
- Click opens chat drawer (slides up from bottom-right, 380px wide, 500px tall)
- Header: `"CCW Fleet Advisor"` with CCW navy color + close button
- Opening message pre-loaded from system prompt spec
- Message input at bottom with send button
- Messages scroll up as conversation grows
- Loading state: three animated dots while waiting for response
- After 2 user messages: subtly show `"Want to connect with our team? →"` link
- Stores conversation in `useState` (no persistence needed for demo)
- Calls `/api/ai-chat` POST with messages array
- Error handling: if API fails, show `"I'm having trouble connecting. Please call (800) 300-3751."`

**`app/(marketing)/layout.tsx`** (MODIFY):
- Import and render `<AIChat />` after the main content, before closing tag

Verify by:
1. `npx tsc --noEmit` → zero errors
2. Navigate to any marketing page → amber chat bubble appears bottom-right
3. Click it → chat drawer opens with opening message
4. Type "What is ZEPS?" → within 3 seconds, response appears citing specs

---

### MICRO-PROMPT 6: Dashboard Command Center (Real Data)
Files:
- `app/dashboard/page.tsx` (REWRITE — real Supabase queries)
- `app/dashboard/work-orders/page.tsx` (REWRITE)
- `components/dashboard/WorkOrdersClient.tsx` (REWRITE)

What to do:

**Dashboard Command Center** (`app/dashboard/page.tsx`):
Server Component. Parallel Supabase queries with demo fallback.
```typescript
const supabase = createClient()

const [workOrders, invoices, pipeline, contracts, parts] = await Promise.all([
  supabase.from('bus_work_orders').select('*, bus_vehicles(make, model, year), bus_locations(name)').eq('status', 'open').order('opened_at', { ascending: false }).limit(8),
  supabase.from('bus_invoices').select('*').in('status', ['sent', 'overdue']).order('due_date'),
  supabase.from('bus_rfp_pipeline').select('*').neq('status', 'awarded'),
  supabase.from('bus_contracts').select('*').eq('status', 'active'),
  supabase.from('bus_parts').select('*').lt('qty_on_hand', 'reorder_point'),
])

// Fall back to demo data if Supabase returns empty
const wo = workOrders.data?.length ? workOrders.data : demoWorkOrders
// ... etc
```

KPI tiles (4):
1. **Buses in Production** — count of open work orders; trend vs last 30 days
2. **Contract Backlog** — sum of active contract values remaining (totalRevenue - totalInvoiced)
3. **Overdue Invoices** — count + total amount of status='overdue' invoices; color red if > 0
4. **Parts Alerts** — count of parts below reorder point; color amber if > 0

Below KPIs: open work orders table (WO#, Bus, Agency, Service Type, Days Open, Status badge, Location)

Right sidebar: urgent items (overdue invoices list with amounts, parts shortage names, insurance expiring within 60 days)

**Work Orders Page** (`app/dashboard/work-orders/page.tsx`):
Server Component fetching work orders with vehicle/location joins. Passes to `WorkOrdersClient`.

**WorkOrdersClient.tsx** (REWRITE, `"use client"`):
- 5-column Kanban board: Open | In Progress | QA Hold | Ready for Delivery | Completed (last 30 days)
- Each card: WO number, bus make/model, agency, service type, days open (amber badge if > 14 days, red if > 30), assigned tech, location
- Cards are draggable (use HTML5 drag API, not a library)
- Filter bar at top: by location, by service type
- Stats row above kanban: total open | avg days open | overdue (>30 days) | completed this month

Verify by:
1. `npx tsc --noEmit` → zero errors
2. Navigate to `/dashboard` → 4 KPI tiles render with numbers from demo data
3. Navigate to `/dashboard/work-orders` → kanban columns visible with cards

---

### MICRO-PROMPT 7: Dashboard Fleet + Finance + Parts
Files:
- `components/dashboard/FleetClient.tsx` (REWRITE)
- `components/dashboard/FinanceClient.tsx` (REWRITE)
- `components/dashboard/PartsClient.tsx` (REWRITE)

What to do:

**FleetClient.tsx** (`"use client"`):
- Table with columns: VIN, Year/Make/Model, Agency, Location, Service Type, Status (badge), Days in Shop, Tech Assigned
- Status badges with colors: in_shop=blue, qa_hold=amber, delivery_ready=green, delivered=gray
- Row click → expands inline (or links to [id] page) showing contract, target completion, intake date
- Filter bar: status, location, fuel type
- Summary row: total buses | avg days in shop | buses > 30 days (alert)
- Fuel type icons: diesel=gray, CNG=blue, electric=green

**FinanceClient.tsx** (`"use client"`):
- Two tabs: Invoices | Revenue Recognition
- **Invoices tab**: table with Invoice#, Contract/Agency, Amount, Status (badge), Issued, Due, Days Outstanding
  - Status badges: draft=gray, sent=blue, overdue=red, paid=green
  - Aging buckets header: Current | 30-60 days | 60-90 days | 90+ days (amber/red alerts)
  - Sum row at bottom per bucket
- **Revenue Recognition tab**: contract-by-contract progress bars
  - Contract name | Total Value | % Complete (labor hours) | Revenue Recognized | Remaining Backlog
  - Visual progress bar (navy fill on gray track)

**PartsClient.tsx** (`"use client"`):
- Parts inventory table: Part#, Description, Category, Supplier, On Hand, Reorder Point, Status
- Status badges: ok=green, low_stock=amber, out_of_stock=red
- Alert banner at top if any out_of_stock: `"⚠️ {N} parts out of stock — {N} buses may be delayed"`
- Filter: by category, by status, by location
- Search: filter by description or part number
- Quick "mark as ordered" action on low_stock rows

Verify by:
1. `npx tsc --noEmit` → zero errors
2. Navigate to `/dashboard/fleet` → vehicle table renders with status badges
3. Navigate to `/dashboard/finance` → two tabs work, invoices show with aging
4. Navigate to `/dashboard/parts` → inventory table shows, alert banner visible if demo has low-stock items

---

### MICRO-PROMPT 8: Dashboard Pipeline + Technicians + Locations
Files:
- `components/dashboard/PipelineClient.tsx` (REWRITE)
- `app/dashboard/technicians/page.tsx` (REWRITE)
- `app/dashboard/locations/page.tsx` (REWRITE)

What to do:

**PipelineClient.tsx** (`"use client"`):
- 4-column Kanban: Opportunity | Proposal | Submitted | Awarded
- Each card: Agency name, RFP title, Est. Value, Deadline (days remaining), Win Probability (%)
- Win probability badge: >70%=green, 40-70%=amber, <40%=gray
- Summary stats: Total pipeline value | Weighted pipeline (sum of value × probability) | Average win rate
- `"Add RFP"` button opens a simple modal form: agency name, title, est value, deadline, win probability

**Technicians page** (Server Component fetching real data with demo fallback):
- Tech roster cards (grid): Name, Location, Years Experience, Active WOs, Cert status
- Cert expiry badge: expired=red, expiring soon (<90 days)=amber, current=green
- Click tech → `/dashboard/technicians/[id]` (stub detail page — simple card with cert list)
- Summary: total techs | active WOs | techs with expiring certs

**Locations page** (Server Component):
- 10-location grid (2 columns on desktop, 1 on mobile)
- Each location card: Location name, City/State, Active WOs, Utilization % (progress bar), Phone
- Utilization color: >90%=red, 70-90%=amber, <70%=green
- Aggregate row: total active WOs across all locations | avg utilization

Verify by:
1. `npx tsc --noEmit` → zero errors
2. Navigate to `/dashboard/pipeline` → kanban with 4 columns, cards from demo data
3. Navigate to `/dashboard/technicians` → tech grid with cert status badges
4. Navigate to `/dashboard/locations` → 10 location cards with utilization bars

---

### MICRO-PROMPT 9: ZEPS Dashboard + Compliance + Insurance
Files:
- `app/dashboard/zeps/page.tsx` (REWRITE)
- `app/dashboard/compliance/page.tsx` (REWRITE)
- `app/dashboard/insurance/page.tsx` (REWRITE)

What to do:

**ZEPS dashboard page** (Server Component):
- Header stats: Total ZEPS conversions in fleet | Total ZEPS miles | Avg range per charge
- Conversion queue: table of vehicles in queue for ZEPS conversion (status: qualifying, approved, scheduled, in_conversion)
- Battery pack inventory: 403kWh | 504kWh | 605kWh — packs in stock, packs on order
- Completed ZEPS fleet table: vehicle, agency, conversion date, miles to date, battery health %
- CTA: `"Schedule a New Assessment"` button

**Compliance page** (Server Component):
- Tab view: Buy America | ADA/Section 504 | CARB | DBE
- Each tab: table of vehicles/contracts with compliance doc status
- Status badges: certified=green, in_review=amber, pending=gray, expired=red
- Alert banner: `"⚠️ {N} vehicles pending Buy America certification before delivery"`
- `"Pre-Award"` vs `"Post-Delivery"` columns for each contract (the FTA two-phase review)

**Insurance page** (Server Component):
- Policy cards grid: policy type, carrier, policy number, coverage limit, expiry date
- Days remaining countdown badge: >180 days=green, 60-180 days=amber, <60 days=red
- Alert banner if any policy <60 days: `"⚠️ {policy type} expires in {N} days — renewal action required"`
- List of demo policies: General Liability, Commercial Auto, Workers Comp, Umbrella, Garage Keepers (32 days — the alert from the original build), Professional Liability

Verify by:
1. `npx tsc --noEmit` → zero errors
2. Navigate to `/dashboard/zeps` → ZEPS stats and conversion queue render
3. Navigate to `/dashboard/compliance` → tabs work, status badges visible
4. Navigate to `/dashboard/insurance` → policy cards with expiry countdowns; Garage Keepers shows amber/red alert

---

### MICRO-PROMPT 10: TSI Inventory + SBL Fleet + Schema Markup + SEO
Files:
- `app/(marketing)/tsi/inventory/page.tsx` (CREATE)
- `components/marketing/TSIInventoryFilter.tsx` (CREATE)
- `app/layout.tsx` (MODIFY — add Organization schema markup)

What to do:

**TSI Inventory page** (`app/(marketing)/tsi/inventory/page.tsx`):
Server Component using TSI demo inventory. Create `demoTSIInventory` array in `lib/demo-data.ts` if not exists:
```typescript
// 12 demo TSI buses:
{ id:1, year:2012, make:'Gillig', model:'Low Floor', length:40, fuelType:'diesel', seats:40, mileage:380000, price:null, condition:'refurbished', status:'available', image:'https://images.unsplash.com/...' },
{ id:2, year:2015, make:'New Flyer', model:'Xcelsior', length:40, fuelType:'cng', seats:38, mileage:290000, price:null, condition:'refurbished', status:'available', image:'...' },
// ... 10 more across all fuel types and sizes
```
Page renders:
- Filter bar (TSIInventoryFilter — client component): fuel type checkboxes, size select, make select, condition select
- Bus cards grid (3 col desktop, 2 tablet, 1 mobile): photo, year/make/model, fuel type badge, length, seats, mileage, condition, `"Get Quote"` button
- `"Submit Requested Inventory"` CTA: `"Don't see what you need? Submit an RFP — we source to spec."`

**TSIInventoryFilter.tsx** (`"use client"`):
- Filter state using `useState`
- Filters: Fuel Type (checkboxes), Length (select), Make (select), Condition (select)
- `"Clear Filters"` button
- Passes filtered results back up via prop callback

**`app/layout.tsx`** (MODIFY):
Add JSON-LD schema in `<head>`:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Complete Coach Works",
    // ... full schema from SEO STRATEGY section
  })}}
/>
```
Also add FAQPage schema to `app/(marketing)/zeps/page.tsx` and `app/(marketing)/services/*/page.tsx`.

Verify by:
1. `npx tsc --noEmit` → zero errors
2. Navigate to `/tsi/inventory` → 12 bus cards visible, filter bar works (selecting "CNG" shows only CNG buses)
3. View page source of homepage → JSON-LD schema present in `<head>`

---

### MICRO-PROMPT 11: Final — lint, build, commit, deploy
Files: none — commands only

What to do:
1. `npm run lint` → fix any warnings or errors
2. `npm run build` → must pass zero errors
3. Stage files: `git add supabase/migrations/ app/ components/ lib/ middleware.ts next.config.ts`
4. `git commit -m "feat(bus-engine): complete rebuild — cinematic three-brand marketing sites, AI chat, full dashboard, SEO, ZEPS calculator, bus_ table prefix fix"`
5. `git pull --rebase origin main`
6. `git push origin main`
7. Confirm Vercel auto-deploy triggered

Verify by:
1. Build URL live at `https://bus-engine.vercel.app`
2. Navigate to `/` → cinematic hero renders
3. Navigate to `/tsi` → TSI site renders in blue
4. Navigate to `/sbl` → SBL site renders in green
5. Navigate to `/zeps` → ZEPS page with calculator renders
6. Navigate to `/dashboard` → Clerk login gate (demo mode: redirect or bypass)
7. AI chat bubble visible bottom-right on all marketing pages

---

## AUTOMATION WIRING
- No new Inngest events needed — bus-engine is in demo/pitch mode
- Agency snapshot already wired at `/api/agency/status`
- Add to agency snapshot: `zeps_conversions_total`, `active_contracts_count`, `open_work_orders` KPIs

## AGENCY ENGINE SURFACES
- New KPI: Buses in Production count on CommandCenter card
- New KPI: Contract Backlog value on client detail tab
- Alert: when any bus_invoices.status='overdue' → opsAlert severity=warning

## ERROR HANDLING
- AI chat API: transient fail → show "I'm having trouble connecting. Please call (800) 300-3751."
- Supabase queries: all wrapped in try/catch → fall through to demo data (never show empty)
- Image load fails: Next.js `onError` → hide image, show gray placeholder with bus icon

## TEST MODE
No test mode needed — all Supabase falls back to demo data automatically when tables don't exist or return empty.

Verify steps:
1. Set `NEXT_PUBLIC_SUPABASE_URL` to a bad URL → dashboard loads with demo data, no errors visible
2. `ANTHROPIC_API_KEY` missing → AI chat shows fallback phone number message

## ENV VARS
New (add values):
- `ANTHROPIC_API_KEY`: Claude API key (get from console.anthropic.com)
- `AGENCY_SNAPSHOT_SECRET`: generate with `openssl rand -base64 32`
Already present (verify, do not recreate):
- `NEXT_PUBLIC_SUPABASE_URL` ✅
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✅
- `SUPABASE_SERVICE_ROLE_KEY` ✅
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` ✅
- `CLERK_SECRET_KEY` ✅

## INSTALL
```bash
npm install framer-motion @anthropic-ai/sdk
# framer-motion: scroll animations, counter animations, section reveals
# @anthropic-ai/sdk: AI chat widget
# Everything else already in package.json
```

## DO NOT
- Do NOT rewrite `Sidebar.tsx` — it is complete and correct
- Do NOT rewrite `MorningHuddle.tsx` — extend it, not replace it
- Do NOT rewrite `demo-data.ts` — add to it, not replace it
- Do NOT install recharts again — already in package.json
- Do NOT install react-hook-form or zod — already in package.json
- Do NOT show empty stat cards anywhere — all async operations have demo data fallback
- Do NOT commit with failing build or lint
- Do NOT add Stripe — this project uses Square per NuStack standards
- Do NOT improvise on AI chat system prompt — use the exact one in this spec

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
