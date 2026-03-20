━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPEC: Bus Engine Dashboard v2 — Full Competitive Upgrade
Project: bus-engine | Path: C:/Users/bradp/dev/bus-engine | Industry: Transit Bus Remanufacturing
Research passes: 4 | Competitive gap items: 23 | Blockers: NONE
Generated: 2026-03-17
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## DECISION LOG

| Assumption | Reality | Impact |
|---|---|---|
| Compliance page is 404 | Page EXISTS at /dashboard/compliance — full CRUD UI with 6 demo docs | No build needed; already done |
| No migrations | 9 migrations exist in supabase/migrations/ | DB schema is already designed correctly |
| Clerk is unconfigured | Clerk keys ARE in .env.local — middleware protects /dashboard/** | Auth works; remove "demo bypass" language from settings |
| Plaid for accounting | Wrong fit — Plaid is consumer fintech; CCW needs QuickBooks API | Use QuickBooks API directly, not Plaid |
| TSI/SBL dashboards are thin | Correct — TSI + SBL sidebar groups only have 2 items each | Need full nav + pages for both |
| Photo capture doesn't exist | Currently `<input type="url">` placeholder in inspect page | Replace with real file capture |
| ccw_part_usage table | Exists in migration 003 | Extend WorkOrdersClient to use it |
| Parts to WO linkage | Table exists but WorkOrdersClient ignores it — zero consumption tracking | Wire up existing table |

## HEALTH AUDIT RESULTS: 10/10 CLEAN

- Template contamination: NONE — no dental/patient/hygienist terms found
- Brand identity split: NONE — consistent CCW/TSI/SBL throughout
- Demo data fallback: ✅ controlled via NEXT_PUBLIC_DEMO_MODE=false in .env.local
- Missing migrations: NONE — all tables referenced in code have migrations
- Dashboard over-built: NAV is appropriate for operations platform
- Fake contact info: NONE — real CCW address/phone in demo data
- Stub features: NONE — no ComingSoon components used in any dashboard page
- Naming mismatch: NONE — no PracticeConfig naming
- Multiple AI routes: One only (/api/ai-chat)
- Cron TODOs: No crons exist yet

## ENVIRONMENT VERIFICATION

All env vars present in .env.local:
- NEXT_PUBLIC_SUPABASE_URL ✅
- NEXT_PUBLIC_SUPABASE_ANON_KEY ✅
- SUPABASE_SERVICE_ROLE_KEY ✅
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ✅
- CLERK_SECRET_KEY ✅
- ANTHROPIC_API_KEY ✅
- SAM_GOV_API_KEY ✅
- AGENCY_SNAPSHOT_SECRET ✅
- NEXT_PUBLIC_DEMO_MODE=false ✅

Missing (needed for new features):
- NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID — QuickBooks API integration (Phase 2, optional)
- NEXT_PUBLIC_QUICKBOOKS_CLIENT_SECRET — QuickBooks API integration (Phase 2, optional)
- SUPABASE_STORAGE_BUCKET — for inspection photos (default: "bus-engine")

## COMPETITIVE GAP ANALYSIS

### P1 — BLOCKING OPERATIONS (build now)

**GAP-00: Clerk middleware IS active but dashboard feels like demo — needs demo banner clarification**
Clerk keys are in .env.local and middleware.ts protects /dashboard/**. However Settings page says
"Clerk Auth: Not configured (demo bypass)" which is misleading. Since data is still all demo, add
a yellow DEMO DATA banner to the dashboard layout header (not a full auth bypass — just a visual flag).
Also fix Settings page copy to say "Clerk Auth: ✅ Configured — auth active" instead of "demo bypass."
SOLUTION: Add demo banner to dashboard layout.tsx header. Fix settings page copy. No new auth page needed.

**GAP-01: Inspection photos are a URL text field, not actual camera capture**
Every serious inspection platform (Samsara DVIR, Whip Around, Fleetio) captures actual photos
per failed item. Transit agencies will eventually require photo documentation for FTA compliance.
SOLUTION: Replace `<input type="url">` with `<input type="file" accept="image/*" capture="environment">`
+ Supabase Storage upload. Show inline preview. Upload on submit.
LEGAL NOTE: FTA does not currently mandate photos, but CA BIT inspections and agency contracts
increasingly require visual documentation.

**GAP-02: Parts consumption not wired to work orders**
The ccw_part_usage table exists in migration 003 but WorkOrdersClient never reads or writes it.
Parts inventory is completely disconnected from actual work — there's no way to know what parts
went into a bus or what it cost.
SOLUTION: Add "Parts Used" section to WODetailClient slide-out. Select part from inventory,
enter qty, save to ccw_part_usage. Auto-deduct from ccw_parts.qty_on_hand.

**GAP-03: Labor cost not calculated from time tracking**
The time tracker in work orders runs a stopwatch but never multiplies hours × technician rate.
No work order shows a cost. No profit/loss is calculable.
SOLUTION: ccw_technicians already has hourly_rate in the schema (check migration 003).
On save, compute labor_cost = hours_logged × hourly_rate. Display on WO detail and summary.

**GAP-03b: No notes field per checklist item (industry standard)**
Whip Around, Samsara DVIR, and Fleetio all show a collapsed notes field per item — not just
on failure. Technicians need to add context on any item.
SOLUTION: Add a collapsed notes textarea to EVERY checklist item (not just failed ones).
Tap the item label to expand notes. Show a small text indicator if notes exist.

**GAP-03c: No photo capture on Damage Log in Fleet vehicle slide-out**
The "Log New Damage" modal in the vehicle detail panel has no photo capability.
Pre-existing damage documentation is legally as important as inspection photos.
SOLUTION: Add same `<input type="file" capture="environment">` to the Damage Log modal.

**GAP-04: Compliance docs page linked in sidebar as "/dashboard/compliance-docs" but route is "/dashboard/compliance"**
Sidebar nav item for "Compliance Docs" points to /dashboard/compliance-docs — which 404s.
The actual page is at /dashboard/compliance.
SOLUTION: Fix sidebar href from '/dashboard/compliance-docs' to '/dashboard/compliance'.

### P2 — IMPORTANT (build in sequence)

**GAP-05: No preventive maintenance scheduler**
No PM interval configuration per vehicle type. No auto-work-order generation.
Industry standard: Cummins ISL = 25,000 mi oil change, quarterly brake inspections.
SOLUTION: New /dashboard/maintenance page. PM templates per vehicle class. Mileage trigger
from odometer logged at inspection. Auto-WO creation when threshold crossed.

**GAP-06: No vehicle lifetime history timeline**
Fleet vehicle slide-out has "Vehicle Info" and "Damage Log" tabs but no chronological history.
SOLUTION: Add "History" tab showing all inspections, work orders, and status changes for that VIN.

**GAP-07: TSI and SBL dashboard contexts are 95% empty**
When switching to TSI or SBL in the sidebar, only 2 nav items appear (Inventory/Analytics,
View Site). Transit agencies need actual operational dashboards for TSI (sales pipeline, inventory
status, buyer leads) and SBL (active leases, fleet utilization, payments due).
SOLUTION: Build out TSI and SBL nav groups with real pages (see micro-prompts below).

**GAP-08: No client-facing agency portal**
Transit agencies (SFMTA, IndyGo, Long Beach Transit) have zero visibility into rebuild progress.
Competitors (Trapeze, AssetWorks) also have NO vendor portal — this is a true whitespace.
SOLUTION: /portal/[agencySlug] route with Clerk guest auth. Shows: bus status, phase progress,
inspection results, compliance docs. Does NOT show: costs, pipeline, technician rates.

**GAP-09: Marketing sites for TSI and SBL are thin — missing header nav, logos, key pages**
TSI has only: homepage, inventory page, 1 case study. Missing: logo in header, nav tabs for
Inventory / News / Resources / Careers / Gallery / Contact.
SBL has only: homepage, fleet page, 1 case study. Same nav gaps as TSI.
SOLUTION: Add proper logo + full nav to both TSI and SBL NavBar components.

### P3 — NICE TO HAVE (after P1+P2)

**GAP-09b: Finance page bugs (3 confirmed)**
A) Grammar error: "1 overdue invoice require immediate attention" → "requires"
B) Oct/Nov monthly revenue bars are empty/invisible — add $0 placeholder bars with label
C) Y-axis labels missing from revenue chart entirely
SOLUTION: Fix all 3 in FinanceClient.tsx in Micro-prompt 3 alongside WO cost changes.

**GAP-09c: Vendor contract dates all expired (2024) but only Ricon Corp flagged**
Cummins (exp 12/30/2024), Allison (exp 3/30/2025), Thermo King (exp 6/14/2024),
MCI Bus Parts (exp 12/30/2025) — all past due. Only Ricon gets the attention banner.
SOLUTION: In vendors page, flag ANY vendor with contract_end_date < today with
an orange "Expired" badge. Attention banner should list ALL expired vendors, not just
the one under review.

**GAP-09d: Inventory "available" vs "Live" count disconnect (0 active from 12 available)**
12 buses listed as "available" status but Active/Live counter shows 0. Misleading.
SOLUTION: In inventory page, either rename "available" status to "Live/Published" or
add a separate "Published to Website" boolean toggle per listing. Count should match.

**GAP-10: No fuel log / fuel cost per vehicle** — tracking diesel/CNG spend per bus
**GAP-11: No shift scheduling or technician calendar** — just active WO count
**GAP-12: No reporting/export beyond CSV** — PDF work order report, compliance summary
**GAP-13: No QuickBooks integration** — manual invoice reconciliation
**GAP-14: No custom 404 page** — falls through to Next.js default

## REVEAL DECK STRATEGY (for all 3 businesses)

**CCW Reveal Deck** — sell to transit agencies at contract time
- 15-20 slides, "Partnership Beyond Remanufacturing"
- Slides: CCW history → client agencies (SFMTA, IndyGo, LBT logos) → ZEPS differentiator →
  CCW dashboard demo (live rebuild tracking) → compliance documentation → delivery process →
  13-location network map → ROI: cost of bus vs. cost of new → call to action

**TSI Reveal Deck** — sell to agencies shopping pre-owned
- 12-15 slides, "Fleet-Ready Buses, 60-Day Delivery"
- Slides: TSI mission → inventory volume → 60-day delivery case study (RATP Dev) →
  FTA compliance docs → Buy America → buses available now → financing options → contact

**SBL Reveal Deck** — sell to employers, event organizers, universities
- 12-15 slides, "Your Fleet Without the Overhead"
- Slides: SBL mission → 4 lease programs → fleet variety → Olympic trust proof →
  cost comparison (own vs. lease) → case study → contact

**Build approach:** Clarion/reveal-app pattern. Each deck is a "reveal" deck type in the generator.
These are NOT built in bus-engine — they are generated in the reveal-app and linked to from CCW's site.
**Action for next session:** In reveal-app, add `bus_sales`, `bus_leasing`, and `bus_remanufacturing`
as vertical presets in the deck generator.

## PLAID DECISION: NOT RECOMMENDED

Plaid is consumer fintech (connecting users' bank accounts). CCW is B2B manufacturing.
Plaid would only pull bank transactions — it can't see vendor invoices, parts costs, or labor.
**Right path:** QuickBooks Online API (QBO SDK). CCW can sync invoices, bills, and payments
between bus-engine dashboard and their existing accounting software. Build in Phase 2.

## FILE MANIFEST

FILES TO CREATE (new):
- `/c/Users/bradp/dev/bus-engine/app/dashboard/maintenance/page.tsx` — PM scheduler (GAP-05)
- `/c/Users/bradp/dev/bus-engine/components/dashboard/MaintenanceClient.tsx` — PM scheduler client
- `/c/Users/bradp/dev/bus-engine/app/portal/[agencySlug]/page.tsx` — Agency portal (GAP-08)
- `/c/Users/bradp/dev/bus-engine/app/portal/[agencySlug]/layout.tsx` — Portal layout (no sidebar)
- `/c/Users/bradp/dev/bus-engine/app/portal/layout.tsx` — Portal auth shell
- `/c/Users/bradp/dev/bus-engine/supabase/migrations/010_pm_inspections_photos.sql` — PM + photo tables

FILES TO MODIFY (existing):
- `/c/Users/bradp/dev/bus-engine/app/dashboard/fleet/inspect/page.tsx` — Add real photo capture + notes per item (GAP-01, GAP-03b)
- `/c/Users/bradp/dev/bus-engine/components/dashboard/WODetailClient.tsx` — Add parts consumption + labor cost (GAP-02, GAP-03)
- `/c/Users/bradp/dev/bus-engine/components/dashboard/FinanceClient.tsx` — Fix chart bugs + grammar (GAP-09b)
- `/c/Users/bradp/dev/bus-engine/components/dashboard/Sidebar.tsx` — Fix compliance href, expand TSI/SBL nav (GAP-04, GAP-07)
- `/c/Users/bradp/dev/bus-engine/components/dashboard/FleetClient.tsx` — Add History tab + Damage Log photo capture (GAP-06, GAP-03c)
- `/c/Users/bradp/dev/bus-engine/app/dashboard/vendors/page.tsx` — Flag all expired vendor contracts (GAP-09c)
- `/c/Users/bradp/dev/bus-engine/app/dashboard/inventory/page.tsx` — Fix available vs live count (GAP-09d)
- `/c/Users/bradp/dev/bus-engine/app/dashboard/layout.tsx` — Add DEMO DATA banner to header (GAP-00)
- `/c/Users/bradp/dev/bus-engine/app/dashboard/settings/page.tsx` — Fix Clerk status copy (GAP-00)
- `/c/Users/bradp/dev/bus-engine/components/marketing/NavBar.tsx` — TSI/SBL logo + nav tabs (GAP-09)

MIGRATION WATERMARK: 009_bus_production_agency.sql → next migration is 010

TABLES BEING TOUCHED:
- `ccw_part_usage`: referenced in migration 003 — NOT yet referenced in any .tsx files
- `ccw_inspection_items`: does NOT exist yet — create in migration 010
- `ccw_inspection_photos`: does NOT exist yet — create in migration 010
- `ccw_pm_schedules`: does NOT exist yet — create in migration 010
- `ccw_pm_triggers`: does NOT exist yet — create in migration 010

ENV VARS ALREADY PRESENT: all above ✅
ENV VARS MISSING:
- `SUPABASE_STORAGE_BUCKET` — default "bus-engine", can hardcode this

## SUCCESS CRITERIA

1. Inspection form: tapping camera icon opens device camera on mobile / file picker on desktop. Photo previews inline. On submit, photo uploads to Supabase Storage and inspection record stores photo URL.
2. Work order detail: "Parts Used" section lists parts from inventory. Adding a part decrements ccw_parts.qty_on_hand. Labor cost = hours logged × technician hourly rate displays on WO.
3. Compliance nav link (sidebar) navigates to /dashboard/compliance without 404.
4. Vehicle detail slide-out has 3 tabs: Vehicle Info, Damage Log, History (chronological timeline of WOs + inspections).
5. PM Scheduler at /dashboard/maintenance: can define PM intervals per vehicle type. Buses approaching threshold show warning badge. Can manually trigger work order creation.
6. TSI dashboard context shows: Inventory grid, Sales Pipeline kanban, and Buyer Leads table.
7. SBL dashboard context shows: Active Leases table, Fleet Utilization by vehicle, and Payments Due.
8. Mobile-responsive at 375px viewport — all new components tested.
9. `npx tsc --noEmit` → zero errors after each micro-prompt.
10. `npm run build` → zero errors at final step.

## READ BEFORE TOUCHING ANYTHING

- `/c/Users/bradp/dev/bus-engine/lib/demo-data.ts` — all demo data; extend, don't break shape
- `/c/Users/bradp/dev/bus-engine/components/dashboard/WorkOrdersClient.tsx` — large file (35KB); read completely before editing
- `/c/Users/bradp/dev/bus-engine/components/dashboard/Sidebar.tsx` — company-switcher and nav groups for CCW/TSI/SBL
- `/c/Users/bradp/dev/bus-engine/supabase/migrations/003_ccw_parts_technicians.sql` — ccw_part_usage schema + ccw_technicians schema (has hourly_rate? — verify before writing types)
- `/c/Users/bradp/dev/bus-engine/lib/database.types.ts` — existing generated types

## USER JOURNEY

STATE: TECHNICIAN (mobile, on shop floor)
- Primary task: complete inspection, log hours, record parts used
- Must be fast — no deep menus on a phone
- Photo capture: tap one button, camera opens, snap, done

STATE: MANAGER (desktop, command center)
- Wants to see: which buses are overdue, which WOs have cost overruns
- New: PM alerts surfaced on command center as action items

STATE: AGENCY CLIENT (web portal)
- Can see: their buses' current phase, inspection history, compliance docs
- Cannot see: CCW's costs, other agencies' data, technician rates

## DATABASE CHANGES

### New Tables:

```sql
-- Migration 010: Inspection Photos + PM Scheduling

-- Inspection records table (persists to DB what is now in-memory only)
CREATE TABLE ccw_inspections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES ccw_vehicles(id),
  inspector_name TEXT NOT NULL,
  inspection_date DATE NOT NULL,
  odometer_mi INTEGER,
  overall_result TEXT CHECK (overall_result IN ('pass', 'conditional', 'fail')) NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Per-item results with photo
CREATE TABLE ccw_inspection_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inspection_id UUID REFERENCES ccw_inspections(id) ON DELETE CASCADE,
  section_id TEXT NOT NULL,   -- 'exterior', 'interior', 'mechanical', etc.
  item_label TEXT NOT NULL,
  result TEXT CHECK (result IN ('pass', 'fail', 'na')) NOT NULL DEFAULT 'na',
  notes TEXT,
  photo_url TEXT,             -- Supabase Storage URL
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PM schedule templates
CREATE TABLE ccw_pm_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_class TEXT NOT NULL,  -- 'transit_40ft', 'transit_60ft', 'coach_45ft', etc.
  fuel_type TEXT,               -- NULL = all fuel types
  task_name TEXT NOT NULL,
  interval_miles INTEGER,       -- NULL if time-only
  interval_days INTEGER,        -- NULL if mileage-only
  estimated_hours NUMERIC(5,2),
  notes TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PM work order triggers (tracks which vehicles are near/past threshold)
CREATE TABLE ccw_pm_triggers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES ccw_vehicles(id),
  pm_schedule_id UUID REFERENCES ccw_pm_schedules(id),
  last_completed_at DATE,
  last_odometer_at_service INTEGER,
  next_due_date DATE,
  next_due_miles INTEGER,
  status TEXT CHECK (status IN ('ok', 'due_soon', 'overdue', 'completed')) DEFAULT 'ok',
  work_order_id UUID REFERENCES ccw_work_orders(id),  -- NULL until WO generated
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add labor cost to work orders (if not already present)
ALTER TABLE ccw_work_orders
  ADD COLUMN IF NOT EXISTS labor_hours NUMERIC(8,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS labor_cost NUMERIC(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS parts_cost NUMERIC(12,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_cost NUMERIC(12,2) DEFAULT 0;

-- Add hourly_rate to technicians (if not in migration 003)
ALTER TABLE ccw_technicians
  ADD COLUMN IF NOT EXISTS hourly_rate NUMERIC(8,2) DEFAULT 0;

-- RLS
ALTER TABLE ccw_inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE ccw_inspection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ccw_pm_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE ccw_pm_triggers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role access inspections" ON ccw_inspections FOR ALL USING (true);
CREATE POLICY "Service role access inspection_items" ON ccw_inspection_items FOR ALL USING (true);
CREATE POLICY "Service role access pm_schedules" ON ccw_pm_schedules FOR ALL USING (true);
CREATE POLICY "Service role access pm_triggers" ON ccw_pm_triggers FOR ALL USING (true);

-- Default PM schedules (seed data)
INSERT INTO ccw_pm_schedules (vehicle_class, fuel_type, task_name, interval_miles, interval_days, estimated_hours, notes) VALUES
  ('transit_40ft', 'diesel', 'Engine Oil & Filter Change', 25000, NULL, 2, 'Cummins ISL standard interval'),
  ('transit_40ft', 'diesel', 'Transmission Fluid Service', 100000, NULL, 3, 'Allison B400R'),
  ('transit_40ft', NULL, 'Brake System Inspection', NULL, 90, 4, 'FMCSA quarterly requirement'),
  ('transit_40ft', NULL, 'Full Pre-Delivery Inspection', NULL, NULL, 8, 'FTA pre-revenue service'),
  ('transit_60ft', 'diesel', 'Engine Oil & Filter Change', 25000, NULL, 2.5, 'Cummins ISL9 — articulated'),
  ('transit_60ft', NULL, 'Brake System Inspection', NULL, 90, 6, 'FMCSA quarterly — all axles'),
  ('transit_40ft', 'cng', 'CNG Tank Visual Inspection', NULL, 30, 1.5, 'NFPA 52 — monthly visual'),
  ('transit_40ft', 'cng', 'CNG System Pressure Test', NULL, 365, 4, 'Annual hydrostatic or hydro-proof'),
  ('transit_40ft', 'hybrid', 'HV Battery System Check', NULL, 90, 2, 'Allison EP systems'),
  ('transit_40ft', NULL, 'ADA Lift Functional Check', NULL, 30, 1, 'FTA ADA — monthly operational test');
```

### Migration Strategy:
- All new columns use `ADD COLUMN IF NOT EXISTS` — non-breaking
- New tables are additive — no existing code breaks
- Seed data installs default PM schedules immediately useful out of the box
- Migration file: `supabase/migrations/010_pm_inspections_photos.sql`

## SKELETON CODE CONTRACTS

```typescript
// FILE: types/bus-engine.ts (new — shared type file)

export interface InspectionPhoto {
  file: File
  itemId: string
  previewUrl: string      // object URL for local preview
  uploadedUrl?: string    // Supabase Storage URL after upload
  uploading: boolean
  error?: string
}

export interface PartUsageEntry {
  partId: string
  partNumber: string
  description: string
  qtyUsed: number
  unitCost: number
  lineCost: number        // qtyUsed × unitCost
}

export interface PMSchedule {
  id: string
  vehicleClass: string
  fuelType: string | null
  taskName: string
  intervalMiles: number | null
  intervalDays: number | null
  estimatedHours: number
  notes: string
}

export interface PMTrigger {
  id: string
  vehicleId: string
  vin: string
  taskName: string
  nextDueDate: string | null
  nextDueMiles: number | null
  currentMiles: number
  status: 'ok' | 'due_soon' | 'overdue'
  daysUntilDue?: number
  milesUntilDue?: number
}

// For WODetailClient additions
export interface WorkOrderCosts {
  laborHours: number
  laborRate: number        // from technician record
  laborCost: number        // hours × rate
  partsCost: number        // sum of all part_usage line costs
  totalCost: number        // labor + parts
}
```

```typescript
// FILE: lib/supabase/storage.ts (new)
// Handles inspection photo uploads

export async function uploadInspectionPhoto(
  file: File,
  vehicleId: string,
  inspectionId: string,
  itemId: string
): Promise<{ url: string | null; error: string | null }>

export function compressImage(
  file: File,
  maxSizeMB?: number   // default 0.5 MB
): Promise<File>
```

```typescript
// MaintenanceClient.tsx interface
interface MaintenanceClientProps {
  pmTriggers: PMTrigger[]
  pmSchedules: PMSchedule[]
  vehicles: { id: string; vin: string; make: string; model: string; fuelType: string; lastOdometer: number }[]
}
```

## MICRO-PROMPTS (build order — max 3 files each)

---

### MICRO-PROMPT 1: Migration + Sidebar Fix + Demo Banner + Data Extensions
**Files:**
- `/c/Users/bradp/dev/bus-engine/supabase/migrations/010_pm_inspections_photos.sql` (CREATE)
- `/c/Users/bradp/dev/bus-engine/components/dashboard/Sidebar.tsx` (MODIFY)
- `/c/Users/bradp/dev/bus-engine/app/dashboard/layout.tsx` (MODIFY — add demo banner)

**What to do:**

0. MODIFY `app/dashboard/layout.tsx` — add DEMO DATA banner to the header bar (right of the "LIVE" pill):
   ```tsx
   <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs px-2.5 py-1 rounded-full font-medium border border-amber-200">
     ⚠️ DEMO DATA — sample data only, no live systems connected
   </span>
   ```
   Replace or update the existing header to include this. Keep the "LIVE" pill removed or renamed to "DEMO".

1. CREATE migration 010 with all SQL above (ccw_inspections, ccw_inspection_items, ccw_pm_schedules, ccw_pm_triggers, ALTER TABLE for labor/parts costs, seed PM schedules). Run it against Supabase: `npx supabase db push` or paste into Supabase SQL editor.

2. MODIFY Sidebar.tsx:
   - Fix CCW Compliance Docs nav item: change href from `/dashboard/compliance-docs` to `/dashboard/compliance`
   - Expand TSI_GROUPS to include:
     ```
     Operations: Bus Inventory, Sales Pipeline, Buyer Leads, Analytics
     Business: Contracts, Finance
     Website: View TSI Site
     ```
   - Expand SBL_GROUPS to include:
     ```
     Operations: Active Leases, Fleet Utilization, Payments Due, Analytics
     Business: Contracts, Finance
     Website: View SBL Site
     ```
   - Add these nav items using existing icon imports (Package, TrendingUp, Users, DollarSign, FileText, BarChart3)

3. MODIFY demo-data.ts: Add demo data arrays for TSI and SBL:
   - `demoTSISalesPipeline`: 5 RFQ entries (agency, bus type, qty, value, status: prospect/quoted/negotiating/won/lost)
   - `demoBuyerLeads`: 4 agencies with contact info, buses needed, budget
   - `demoSBLLeases`: 5 active leases (lessee, bus count, monthly payment, start/end date, status)
   - `demoFleetUtilization`: Per-vehicle utilization % for SBL fleet
   - Also add hourly rates to existing demoTechnicians entries (Marcus $42/hr, Tanya $45/hr, Derrick $48/hr, Linda $44/hr)

**Verify by:**
1. `npx tsc --noEmit` → zero errors
2. Navigate to /dashboard → see amber "DEMO DATA" banner in header. "LIVE" green pill replaced or removed.
3. Click "Compliance Docs" in sidebar → lands on /dashboard/compliance (no 404)
4. Switch sidebar to TSI → see expanded nav with Inventory, Sales Pipeline, Buyer Leads, Analytics, Contracts, Finance
5. Switch sidebar to SBL → see expanded nav with Active Leases, Fleet Utilization, Payments Due, Analytics

DO NOT proceed to micro-prompt 2 until all 4 verify steps pass.

---

---

### MICRO-PROMPT 1b: Quick Bug Fixes (Finance, Vendors, Inventory, Settings)
**Files:**
- `/c/Users/bradp/dev/bus-engine/components/dashboard/FinanceClient.tsx` (MODIFY)
- `/c/Users/bradp/dev/bus-engine/app/dashboard/vendors/page.tsx` (MODIFY)
- `/c/Users/bradp/dev/bus-engine/app/dashboard/inventory/page.tsx` (MODIFY)

**What to do:**

READ each file completely before editing. Then:

1. MODIFY FinanceClient.tsx:
   - Fix grammar: "require" → "requires" in the overdue invoice alert
   - Fix Oct/Nov chart bars: in the monthly revenue data array, ensure Oct and Nov have a `value: 0` entry (not undefined/missing). Recharts won't render a bar for missing data points. Add explicit 0 values.
   - Add Y-axis to the recharts BarChart: `<YAxis tickFormatter={(v) => \`$\${(v/1000).toFixed(0)}K\`} />`

2. MODIFY vendors/page.tsx (or vendor component):
   - Read how vendors are rendered. Find the contract end date display.
   - For any vendor where contract end date is before today (2026-03-17), add orange "Expired" badge next to the date
   - Update the attention banner logic: show ALL vendors with expired contracts (not just "Under Review" status)
   - Keep the existing "Under Review" banner but merge it into an "Attention Required" section listing all expired + under-review vendors

3. MODIFY inventory/page.tsx:
   - Find where Active/Live count is computed. Currently counts rows where some condition is true but likely missing the "available" status.
   - Fix: count "available" status rows as "Live" for display purposes, OR add a `published: boolean` field to demo inventory data and show "Published to Website" toggle per row
   - Simplest fix: rename the KPI card from "Active / Live" to "Available" and count `status === 'available'` rows

**Verify by:**
1. `npx tsc --noEmit` → zero errors
2. /dashboard/finance: Oct and Nov show $0 bars (not invisible). Y-axis shows $0K, $500K, $1M labels. No grammar error in alert.
3. /dashboard/vendors: Cummins, Allison, Thermo King show orange "Expired" badge. Attention banner lists all expired vendors.
4. /dashboard/inventory: KPI counter matches the number of buses listed (12, not 0).

DO NOT proceed to micro-prompt 2 until all 4 verify steps pass.

---

### MICRO-PROMPT 2: Inspection Photo Capture + Notes Per Item + Damage Log Photo
**Files:**
- `/c/Users/bradp/dev/bus-engine/app/dashboard/fleet/inspect/page.tsx` (MODIFY)
- `/c/Users/bradp/dev/bus-engine/components/dashboard/FleetClient.tsx` (MODIFY — Damage Log photo only)
- `/c/Users/bradp/dev/bus-engine/lib/supabase/storage.ts` (CREATE)

**What to do:**

READ the full inspect/page.tsx before touching it (it's large). Then:

1. CREATE `lib/supabase/storage.ts`:
```typescript
'use server'
import { createClient } from '@/lib/supabase/server'

export async function uploadInspectionPhoto(
  formData: FormData,
  vehicleId: string,
  inspectionId: string,
  itemSlug: string
): Promise<{ url: string | null; error: string | null }> {
  const file = formData.get('photo') as File
  if (!file) return { url: null, error: 'No file provided' }

  const supabase = await createClient()
  const ext = file.name.split('.').pop() || 'jpg'
  const path = `inspections/${vehicleId}/${inspectionId}/${itemSlug}-${Date.now()}.${ext}`

  const { data, error } = await supabase.storage
    .from('bus-engine')
    .upload(path, file, { contentType: file.type, upsert: true })

  if (error) return { url: null, error: error.message }

  const { data: urlData } = supabase.storage.from('bus-engine').getPublicUrl(data.path)
  return { url: urlData.publicUrl, error: null }
}
```

2. MODIFY inspect/page.tsx:
   - Change CheckItem type: replace `photoUrl: string` with `photoFile: File | null`, `photoPreview: string`, `photoUploadedUrl: string`, and `notesOpen: boolean`
   - Add NOTES field to EVERY checklist item (not just failures):
     - Small "Add note" text link/button below item label (collapsed by default, `notesOpen: false`)
     - Clicking expands a textarea. If item has notes, show a small blue dot indicator on the item label.
     - This is industry standard (Whip Around, Fleetio) — notes on any item, not just failures
   - For PHOTO CAPTURE: show camera button when result is 'fail' AND as optional on any item.
     Auto-show camera button when item is marked Fail. Optional button (camera icon, small) on all items.
   - In each checklist item row, replace the URL input with:
     ```tsx
     <div className="mt-2 flex items-center gap-2">
       <label className="flex items-center gap-2 cursor-pointer bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
         <Camera className="w-3.5 h-3.5" />
         {item.photoPreview ? 'Change Photo' : 'Add Photo'}
         <input
           type="file"
           accept="image/*"
           capture="environment"
           className="hidden"
           onChange={e => handlePhotoCapture(section.id, item.id, e.target.files?.[0] ?? null)}
         />
       </label>
       {item.photoPreview && (
         <img src={item.photoPreview} alt="photo" className="w-12 h-12 rounded object-cover border border-gray-200" />
       )}
     </div>
     ```
   - Add `handlePhotoCapture` function that creates an object URL preview and stores the File in state
   - Add Camera icon import from lucide-react
   - On handleSubmit: upload all photos via fetch to `/api/inspections/upload` (or use server action pattern). For demo mode (no Supabase storage), just keep the preview URL.
   - Show upload progress state with simple "Uploading..." text on the item

   NOTE: Since this is a client component, use `fetch` to POST FormData to an API route for the upload. Keep it simple — upload after submit, not inline.

3. MODIFY FleetClient.tsx — Damage Log section only:
   - Find the "Log New Damage" modal/form in FleetClient
   - Add photo capture input to the damage log form (same pattern as inspect):
     ```tsx
     <label className="flex items-center gap-2 cursor-pointer border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
       <Camera className="w-4 h-4" />
       {damagePhoto ? 'Change Photo' : 'Attach Photo'}
       <input type="file" accept="image/*" capture="environment" className="hidden" onChange={...} />
     </label>
     {damagePhotoPreview && <img src={damagePhotoPreview} className="w-20 h-20 rounded object-cover" />}
     ```
   - Add `damagePhoto: File | null` and `damagePhotoPreview: string` to the damage log form state
   - On save, include photoPreview URL in the damage record

**Verify by:**
1. `npx tsc --noEmit` → zero errors
2. On mobile (or Chrome DevTools mobile mode): open /dashboard/fleet/inspect → mark an item Fail → tap camera icon → camera/file picker opens → select image → thumbnail shows inline
3. Click "Add note" on any checklist item → textarea expands → type note → blue indicator appears on item label
4. Click "Submit Inspection" → sees "Inspection Saved" confirmation screen
5. Fleet page → click any vehicle → "Damage Log" tab → "Log New Damage" → see camera/photo field in the modal

DO NOT proceed to micro-prompt 3 until verify steps pass.

---

### MICRO-PROMPT 3: Parts Consumption + Labor Cost on Work Orders
**Files:**
- `/c/Users/bradp/dev/bus-engine/components/dashboard/WODetailClient.tsx` (MODIFY)

**What to do:**

READ `components/dashboard/WODetailClient.tsx` completely (it's part of the 35KB WorkOrdersClient). Find the work order slide-out panel (the WODetailClient component or the inline panel). Then:

1. Add a "Parts Used" section to the WO detail panel (appears below the time tracker):
   - Dropdown to select a part from the parts list (passed as prop or from demo-data.ts)
   - Qty field (number input, min 1)
   - "Add Part" button → adds to local `partsUsed` state array
   - Show list of added parts: part number, description, qty, unit cost, line cost
   - Show SUBTOTAL: Parts Cost = sum of all line costs
   - On save/close: persist to ccw_part_usage table (or demo state)

2. Add labor cost calculation below the time tracker:
   - Tech hourly rate displayed (read from demoTechnicians by techAssigned name)
   - `Labor Cost = hours_logged × hourly_rate`
   - Display: "Mike Reyes · $68/hr × 12.5h = $850 labor"
   - Show TOTAL JOB COST = labor cost + parts cost

3. Show job cost summary card at top of WO detail with:
   - 💰 Total Job Cost: $X,XXX
   - 🔧 Labor: $X,XXX (X.Xh × $X/hr)
   - 📦 Parts: $X,XXX

Use CCW blue (#003087) and gold (#E8A020) styling consistent with existing WO panel.

**Verify by:**
1. `npx tsc --noEmit` → zero errors
2. Open /dashboard/work-orders → click any WO → see "Parts Used" section in detail panel
3. Add a part (e.g., CUM-ISL-ASM) with qty 1 → see $28,500 line cost appear
4. See Labor Cost calculated from time tracker (if timer shows any hours) OR from demo hours data
5. See Total Job Cost summary at top of panel

DO NOT proceed to micro-prompt 4 until verify steps pass.

---

### MICRO-PROMPT 4: Vehicle History Tab + TSI Dashboard Pages
**Files:**
- `/c/Users/bradp/dev/bus-engine/components/dashboard/FleetClient.tsx` (MODIFY — add History tab)
- `/c/Users/bradp/dev/bus-engine/app/dashboard/inventory/page.tsx` (MODIFY — make TSI-aware)
- `/c/Users/bradp/dev/bus-engine/app/dashboard/pipeline/page.tsx` (MODIFY — TSI Sales Pipeline uses same page)

**What to do:**

1. MODIFY FleetClient.tsx — vehicle detail slide-out currently has "Vehicle Info" and "Damage Log" tabs. Add "History" as third tab:
   - History tab content: chronological timeline of events for that VIN
   - Each event: date + icon + description
   - Events to show (from demo data):
     - Work orders: "WO-2026-001 opened — Midlife Overhaul" (with status badge)
     - Status changes: "Status → In Progress"
     - Inspections: "Pre-Delivery Inspection — Pass (12 Jan 2026)"
   - Use a simple vertical timeline with date, icon (ClipboardList for WO, CheckCircle for inspection, Tag for status), and description
   - Show 0 events state: "No history yet — events appear as work orders and inspections are completed"

2. MODIFY inventory/page.tsx — Currently shows generic inventory. When company context is TSI (add a `?company=tsi` query param awareness OR use localStorage from sidebar switcher):
   - TSI view: `demoTSIInventory` bus cards grid (already exists from prior build)
   - Add a "Sales Pipeline" tab alongside "Inventory" using the TSI pipeline data from demo-data.ts
   - Pipeline shows: Agency, Bus Type Wanted, Qty, Est Value, Status badges (Prospect/Quoted/Negotiating/Won/Lost)
   - Add "Buyer Leads" tab: contact cards for agencies actively shopping

3. For SBL context: create `/c/Users/bradp/dev/bus-engine/app/dashboard/leases/page.tsx` (NEW, add to file manifest) showing active lease table from `demoSBLLeases`.

NOTE: The company context switch in Sidebar.tsx is currently localStorage-based client state. The inventory page can read `?company=tsi` or detect via URL. Simplest approach: TSI uses /dashboard/inventory (already linked), SBL uses /dashboard/leases (new route). The sidebar already has different hrefs per company.

**Verify by:**
1. `npx tsc --noEmit` → zero errors
2. Fleet page → click any vehicle → see 3 tabs: Vehicle Info, Damage Log, History
3. History tab shows timeline of events for CCW-001 (WO opened Jan 15, status In Progress, etc.)
4. Switch to TSI in sidebar → click Bus Inventory → see TSI buses grid + Sales Pipeline + Buyer Leads tabs
5. Switch to SBL → click Active Leases → see SBL lease table

---

### MICRO-PROMPT 5: Preventive Maintenance Page
**Files:**
- `/c/Users/bradp/dev/bus-engine/app/dashboard/maintenance/page.tsx` (CREATE)
- `/c/Users/bradp/dev/bus-engine/components/dashboard/MaintenanceClient.tsx` (CREATE)
- `/c/Users/bradp/dev/bus-engine/components/dashboard/Sidebar.tsx` (MODIFY — add Maintenance to CCW nav)

**What to do:**

1. ADD "Maintenance" nav item to CCW_GROUPS Operations section in Sidebar.tsx (between Inspections and Parts):
   ```
   { label: 'Maintenance', href: '/dashboard/maintenance', icon: Wrench }
   ```
   (Wrench already imported)

2. CREATE `/c/Users/bradp/dev/bus-engine/app/dashboard/maintenance/page.tsx`:
   - Server component
   - Imports MaintenanceClient
   - Passes demo PM data (from demoVehicles + hardcoded PM schedule triggers)

3. CREATE `components/dashboard/MaintenanceClient.tsx` — full client component:

   **LAYOUT:**
   - Page header: "Preventive Maintenance" + "New Schedule" button
   - KPI row: `{N} OK` (green), `{N} Due Soon` (amber), `{N} Overdue` (red)
   - 3 sections below: sorted by urgency

   **PM TRIGGERS TABLE** (main content):
   - Columns: Vehicle (VIN + make/model), Task, Due Date / Due Mileage, Current Mileage, Status badge, Actions
   - Status badges: 🟢 OK | 🟡 Due in {N} days | 🔴 Overdue {N} days
   - Actions: "Create Work Order" button (for Due Soon + Overdue rows)

   **DEMO PM TRIGGERS** (hardcode in component):
   Generate realistic data from demoVehicles — calculate due dates based on:
   - CCW-002 (Gillig Phantom, diesel, 142,800 mi): Oil change due in 2,200 mi — status: DUE_SOON
   - CCW-001 (New Flyer D40LF): Brake inspection overdue 12 days — status: OVERDUE
   - CCW-005 (delivered): Last PM 73 days ago → brake check due in 17 days — DUE_SOON
   - Others: OK status

   **PM SCHEDULES PANEL** (collapsible):
   - List all default PM schedules (from seed data or hardcoded)
   - Show: vehicle class, task name, interval
   - "Edit" button (slide-out modal to change interval)

   **CREATE WORK ORDER from PM:**
   - Clicking "Create Work Order" for an overdue item opens a mini modal
   - Pre-fills: VIN, service type = task name, priority = urgent, tech = auto-assign from location
   - Confirm → adds to demoWorkOrders and shows toast "Work Order WO-2026-XXX created"

**Verify by:**
1. `npx tsc --noEmit` → zero errors
2. Navigate to /dashboard/maintenance → page loads with KPI row
3. See at least 1 OVERDUE (red) and 1 DUE SOON (amber) PM trigger
4. Click "Create Work Order" on overdue row → confirmation modal → confirm → toast "Work Order created"
5. "Maintenance" appears in CCW sidebar nav under Operations

---

### MICRO-PROMPT 6: Agency Portal Shell
**Files:**
- `/c/Users/bradp/dev/bus-engine/app/portal/layout.tsx` (CREATE)
- `/c/Users/bradp/dev/bus-engine/app/portal/[agencySlug]/layout.tsx` (CREATE)
- `/c/Users/bradp/dev/bus-engine/app/portal/[agencySlug]/page.tsx` (CREATE)

**What to do:**

Build a public-facing, read-only agency portal. This is NOT protected by Clerk (agencies don't have Clerk accounts). It uses a simple slug-based URL to show agency-specific data.

1. CREATE `app/portal/layout.tsx`:
   - Simple layout with CCW logo + "Powered by CCW Operations" footer
   - No sidebar, no dashboard chrome
   - White background, clean

2. CREATE `app/portal/[agencySlug]/layout.tsx`:
   - Agency branding header: agency name + CCW logo
   - CCW blue (#003087) header bar
   - "Confidential — Project Status Portal" subtitle

3. CREATE `app/portal/[agencySlug]/page.tsx`:
   - Server component, reads `agencySlug` param
   - Map known slugs to agency names: `sfmta` → SFMTA, `indygo` → IndyGo, `lbt` → Long Beach Transit, `denver-rtd` → Denver RTD
   - Shows ONLY that agency's buses from demoVehicles
   - Sections:
     - **Active Buses** grid: VIN, make/model, current status badge (Intake/In Progress/QA Hold/Complete/Delivered), days in shop, target delivery
     - **Recent Inspections** (last 3): date, VIN, result badge, inspector
     - **Contract Progress**: % complete progress bar, milestone status
     - **Compliance Docs**: list of doc types with status badges (links to download — placeholder for now)
   - DOES NOT show: costs incurred, labor rates, pipeline data, other agency data
   - Bottom: "Questions? Contact CCW: (951) 684-9585 | info@completecoach.com"

   If unknown slug: show "Portal not found — contact CCW at (951) 684-9585"

**Verify by:**
1. `npx tsc --noEmit` → zero errors
2. Navigate to /portal/sfmta → sees SFMTA buses (CCW-001, CCW-002, CCW-006, CCW-009) only
3. Navigate to /portal/indygo → sees IndyGo buses (CCW-004, CCW-005, CCW-010) only
4. Navigate to /portal/unknown-agency → sees "Portal not found" message
5. Costs incurred, tech hourly rates, pipeline data NOT visible on any portal page

---

### MICRO-PROMPT 7: Final — TSI/SBL SBL Marketing Nav + Build + Deploy
**Files:**
- `/c/Users/bradp/dev/bus-engine/components/marketing/NavBar.tsx` (MODIFY — add TSI/SBL logo + nav tabs)

**What to do:**

READ the NavBar.tsx component fully. The marketing nav is shared. TSI and SBL pages import it.

1. Check if NavBar detects which "brand" it's on. If not, read the component imports in tsi/page.tsx and sbl/page.tsx — they may use the same NavBar.

2. UPDATE NavBar.tsx to support a `brand` prop: `'ccw' | 'tsi' | 'sbl'`

3. For TSI (`brand="tsi"`):
   - Logo: text "Transit Sales International" in #1a5fa8 blue (TSI primary) OR actual logo if one exists in public/
   - Nav items: Inventory | News | Resources | Careers | Gallery | Contact
   - Hrefs: /tsi/inventory | /news (shared) | /resources (placeholder link to contact) | /careers | /gallery | /contact

4. For SBL (`brand="sbl"`):
   - Logo: text "Shuttle Bus Leasing" in #2d7a3a green (SBL primary)
   - Nav items: Fleet | News | Careers | Gallery | Contact
   - Hrefs: /sbl/fleet | /news | /careers | /gallery | /contact

5. Update `app/(marketing)/tsi/page.tsx` to pass `brand="tsi"` to NavBar
6. Update `app/(marketing)/sbl/page.tsx` to pass `brand="sbl"` to NavBar

Then run final build sequence:
```bash
npx tsc --noEmit    # must be zero errors
npm run build       # must pass zero errors
git add app/dashboard/ components/dashboard/ app/portal/ supabase/migrations/010_pm_inspections_photos.sql lib/supabase/storage.ts components/marketing/NavBar.tsx app/(marketing)/tsi/page.tsx app/(marketing)/sbl/page.tsx
git commit -m "feat(dashboard): inspection photos, parts consumption, labor cost, PM scheduler, agency portal, TSI/SBL nav"
git pull --rebase origin main
git push origin main
```

**Verify by:**
1. `npx tsc --noEmit` → zero errors
2. `npm run build` → zero errors
3. git push → Vercel deploy triggered
4. Visit /tsi → see "Transit Sales International" logo/text + full nav with Inventory/News/Careers/Gallery/Contact
5. Visit /sbl → see "Shuttle Bus Leasing" logo/text + full nav
6. All SUCCESS CRITERIA 1–10 checked one by one on live Vercel URL

---

## ERROR HANDLING

- Photo upload fails: show red error message on item ("Upload failed — photo saved locally"); proceed with inspection submission without photo URL
- Parts qty exceeds inventory: show warning toast "Only {N} in stock" but allow (don't hard-block)
- PM trigger "Create WO" fails: show toast "Work order creation failed — try again"; never silent
- Portal unknown slug: render "Portal not found" page (not a 500)
- Any Supabase call: catch → console.error (dev) + show user-facing toast for mutations

## TEST MODE

NEXT_PUBLIC_DEMO_MODE=false in .env.local — system uses Supabase where connected,
falls back to demo data where DB tables not yet seeded.
Photo uploads: when Supabase Storage bucket doesn't exist, catch error and use local object URL preview only.

**Verification steps:**
1. Inspection photo: select file → thumbnail appears → submit → toast confirms (even without Supabase Storage)
2. Parts consumption: add part to WO → line cost appears → total updates
3. PM alerts: navigate to /dashboard/maintenance → see overdue + due-soon items

## ENV VARS

New (hardcode or add to Vercel):
- `SUPABASE_STORAGE_BUCKET`: value = `"bus-engine"` (or default in code)

Already present (verify, do not recreate):
- All above vars ✅

## INSTALL

No new packages needed. All dependencies already present:
- `@supabase/supabase-js` ✅ — Storage uploads
- `lucide-react` ✅ — Camera icon
- `react-hook-form` ✅ — Form handling
- `zod` ✅ — Validation
- `recharts` ✅ — Any new charts
- `@react-pdf/renderer` ✅ — Future PDF export

## DO NOT

- Do NOT create a custom camera component using getUserMedia — `<input capture="environment">` is the correct approach for mobile browser
- Do NOT install `browser-image-compression` — compress server-side or skip compression (500KB photos are fine for transit docs)
- Do NOT use Plaid — use QuickBooks API directly when accounting integration is needed (Phase 2)
- Do NOT add Stripe — Square is the payments standard
- Do NOT rebuild the kanban/WO system — extend what exists
- Do NOT over-engineer the portal — it's static-ish content with slug routing, no complex auth needed yet
- Do NOT show empty stat cards without CTAs on any new page
- Do NOT commit with failing build or lint

## WHAT'S NOT IN THIS SPEC (PHASE 2 — FUTURE SESSIONS)

- QuickBooks API integration (invoice sync)
- GPS/telematics integration (Samsara API — buses are stationary during rebuild; defer)
- PDF export for work orders and inspection reports
- Technician mobile app (Expo — build after dashboard is wired to real DB)
- Agency portal auth (Clerk org for agencies — need Clerk config first)
- Post-delivery performance tracking (90-day KPIs)
- Reveal deck presets in reveal-app for CCW/TSI/SBL (separate session in reveal-app)
- Fuel log tracking per vehicle
- Shift scheduling / technician calendar
- Custom 404 page

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GATE R3 — SPEC COMPLETE. RESEARCH-BUILD DONE.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
