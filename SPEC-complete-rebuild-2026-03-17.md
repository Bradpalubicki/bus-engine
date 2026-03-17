━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPEC: Complete Bus-Engine Rebuild v2 — Three Exceptional Websites + Full Operations Dashboard
Project: bus-engine | Path: C:\Users\bradp\dev\bus-engine | Industry: transit-bus-manufacturing
Research passes: 6 (codebase + competitive + SEO + media harvest + new modules + ENGINE-UPGRADE-RESEARCH)
Gaps closed: 17 → 32 | Blockers: NONE
Generated: 2026-03-17 | Last updated: 2026-03-17 (ENGINE-UPGRADE-RESEARCH pass added MPs 16-21, 4 new DB tables, Plaid bank integration)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## RESEARCH UPDATE 2026-03-17 (ENGINE-UPGRADE-RESEARCH Pass)

Full research output: `C:\Users\bradp\dev\bus-engine\ENGINE-RESEARCH-bus-engine-2026-03-17.md`

### What This Pass Found and Added to the Spec

**P1 Gaps Closed (6 new — would cost a deal or lose a bid):**
1. **FTA Compliance Library (website)** — No competitor publicly hosts Buy America, TVM, ADA, FMVSS certs. First mover wins the spec-writing phase. → Added to MP-19 (new).
2. **Cooperative Contract Directory (website)** — CCW is on WA State DES cooperative. "No new RFP required" = deals currently invisible to agencies. → Added to MP-20 (new).
3. **Named Agency Case Studies with dollar values** — GILLIG's partnership page is the benchmark. Without this, CCW loses the pre-call qualification. → Added to MP-20 (new).
4. **⭐ Agency/Client Portal for bus production tracking** — CONFIRMED WHITESPACE. No competitor (zero) offers this. Buildertrend's client portal is the analogue. First mover owns this permanently. → Added as MPs 16-17 (new).
5. **8-stage production pipeline per bus** — Current spec has WO kanban. Agency portal needs production pipeline view (bus as entity moving through stages). Separate from WO. → Added to MP-16 (new DB tables).
6. **FTA documentation package auto-assembly + change order workflow** — Manual today. Automate in portal. Change order audit trail required for FTA-funded overhaul compliance. → Added to MP-18 (new).

**New DB Tables (4 additions — migrations 009-010):**
- `bus_production_stages` — tracks each bus through 8 refurb stages
- `bus_agency_users` — transit agency fleet manager portal accounts (Clerk magic link auth)
- `bus_change_orders` — scope changes with agency approval workflow and audit trail
- `bus_compliance_certs` — downloadable cert assets per bus (Buy America, FMVSS, ADA, CARB)

**New Columns Added to `bus_vehicles`:**
- ADA: `ada_lift_type`, `ada_ramp_compliant`, `ada_securement_type`, `doorway_clearance_inches`
- NTD A-30: `vehicle_type_code`, `vehicle_length_ft`, `year_last_rebuild`, `funding_source`, `dedicated_use`
- ULB: `useful_life_miles` (default 500000), `odometer_at_last_overhaul`, `in_service_date_original`

**New Columns Added to `bus_work_orders`:**
- `vmrs_failure_code` (varchar, nullable) — for VMRS coding when data volume supports it

**Plaid Integration (Brad's suggestion — Dale's real-time bank data):**
- Added to `bus_financials_snapshot`: Plaid bank account balance feed (real-time cash position)
- Revenue - Expenses from Plaid output = real-time cash flow indicator (less detail than Sage Intacct but instant)
- Dale sees: Plaid live balance + Sage detailed P&L (when connected) OR Plaid live balance + manual entry
- Migration: `bus_plaid_config` table (new in migration 010)
- See Financial Dashboard section below for Plaid implementation spec

**New Micro-Prompts Added (MPs 16-21):**
- MP-16: Agency Portal Foundation (portal auth, production stages DB, agency home view)
- MP-17: Bus Detail View + Stage Progress (stage bar, activity feed, photo gallery by stage)
- MP-18: FTA Documentation Package + Change Order Workflow (compliance docs, change order approvals, pre-delivery gap check)
- MP-19: CCW Website Compliance Hub (FTA TVM badge, Buy America, DBE, ADA, CARB, SAM.gov, downloadable certs)
- MP-20: CCW Website Social Proof + Procurement Tools (agency case studies, cooperative contracts, "How to Buy" guide)
- MP-21: NTD Export + Compliance Gap Detector (pre-delivery cert audit, color-coded gap report, NTD A-30 CSV export)

**Open Questions for Dale (must answer before MPs 16-21):**
1. Is CCW on the FTA TVM Eligible List? (hard gate for agency procurement — verify at transit.dot.gov/TVM)
2. Full list of cooperative contracts CCW is enrolled in? (WA State DES confirmed — what else?)
3. Buy America documentation — does CCW have existing certs in digital form?
4. DBE goal status — currently submitted? (2025 interim rule temporarily paused annual submission)
5. ZEPS CARB certification docs — do they exist in digital form?
6. Which transit agencies would be initial agency portal users?
7. Which fleet management systems do CCW's key agency clients use? (AssetWorks, Trapeze, RTA — determines NTD export format)

**New Success Criteria (additions to list below):**
16. Agency portal: transit agency fleet manager can log in via magic link and see all their buses in production by stage
17. Bus detail view: stage progress bar, activity feed, photo gallery by stage, compliance doc downloads
18. Change order workflow: CCW submits → agency receives email → approves/rejects in portal → audit trail saved
19. CCW compliance hub page live with FTA TVM, Buy America, ADA, CARB, SAM.gov badges and downloadable certs
20. Named agency case studies page live (6 agencies: TriMet, IndyGo, OCTA, Foothill, AVTA, SF Muni)
21. Cooperative contracts section live: WA State DES prominently with "No new RFP required" messaging
22. NTD A-30 export: generates CSV of post-overhaul bus data for agency import to AssetWorks/Trapeze
23. Compliance gap detector: pre-delivery scan color-codes buses as green/yellow/red by cert completeness
24. Plaid live bank balance visible in Dale-only financial dashboard (real-time cash position)

---

## WHAT'S NEW IN THIS VERSION (vs 2026-03-16 spec)

1. **Harvested media assets** — drone video, CCW MP4, 243+ images now used as hero backgrounds and gallery content (SEO-labeled)
2. **HR Module** — job postings (CRUD), public /careers page, resume upload, policy document library, vendor management
3. **Financial Dashboard (Dale-only)** — P&L, balance sheet, ESOP loan tracker ($22M), Sage Intacct integration scaffold
4. **SAM.gov Federal Contracts** — UEI QN7UN15K9NP2 wired, real opportunity feed, SAM registration expiry alert (Aug 25, 2026)
5. **Company switcher** — CCW / TSI / SBL tabs in dashboard header with DEMO banner
6. **Website performance in dashboard** — GSC integration showing all 3 sites' keyword rankings and crawl health
7. **Self-insurance dashboard** — coverage tracker, claims in progress, reserve fund, renewal alerts
8. **Payroll placeholder** — ADP/Paychex API hook ready, headcount + labor cost by location
9. **4 new DB migrations** — bus_hr_*, bus_finance_owner, bus_sam_opportunities, bus_vendor tables
10. **4 new micro-prompts** (MPs 12-15) for the new modules
11. **Inventory Management from Dashboard** — add/edit/remove TSI bus listings and SBL lease fleet directly from dashboard; status-driven visibility on public websites (available → pending → sold/leased)

---

## DECISION LOG

| Assumption | Reality | Impact |
|---|---|---|
| Build was live | Code complete but dashboards are mostly stubs | Must rebuild most dashboard pages from scratch |
| ccw_ table prefix | Migrations use ccw_ but ALL queries and types use bus_ prefix | All migrations must be rewritten with bus_ prefix |
| Three equal brands | CCW is mothership; TSI/SBL are sub-brands | One Next.js project, /tsi and /sbl sub-routes |
| Simple marketing site | Needs cinematic design, AI chat, SEO, ZEPS calculator | Full rebuild with wow-factor |
| Generic dashboard | CEO of 10-location $102M company needs real KPIs | Rebuild with production throughput, contract burn, DSO, parts |
| Media needed from stock | 243+ images and 9 MP4s harvested from existing sites | Use CCW.mp4 as CCW hero, drone video as TSI hero |
| TSI drone video just a nice touch | Most powerful visual asset — 1,000-bus yard aerial with American flag | Full-viewport hero background on TSI homepage |
| CCW does govt work through agencies | UEI confirmed (QN7UN15K9NP2), only 2 direct federal awards found | CCW's govt work flows through transit agency FTA grants, not direct awards |
| Sage 200 (on-prem) | Sage Intacct likely (US cloud version at $102M revenue) | Build Intacct API scaffold + fallback to manual P&L entry |
| Dale sees everything | Dale-only financial toggle — his kids running ops don't see P&L | Implement as role-gated toggle in dashboard (demo shows it, notes it) |

---

## HEALTH ISSUES FOUND (fix as first micro-prompt)

- **CRITICAL — Table prefix mismatch**: Migrations create `ccw_*` tables; all queries and `database.types.ts` reference `bus_*` tables → EVERY Supabase query fails silently
- **MEDIUM — Stub client components**: `WorkOrdersClient`, `FleetClient`, `FinanceClient`, `PartsClient`, `PipelineClient`, `TechDetailClient`, `WODetailClient` are empty stubs
- **MEDIUM — Clerk middleware disabled**: `middleware.ts` is bare `NextResponse.next()`. Dashboard routes fully public.
- **LOW — Missing Unsplash image domain**: `images.unsplash.com` not in `next.config.ts`

---

## ENVIRONMENT VERIFICATION

- [ ] Node version: `node --version` → v18+
- [ ] Build passes: `npm run build` → zero errors
- [ ] `NEXT_PUBLIC_SUPABASE_URL` present ✅
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` present ✅
- [ ] `ANTHROPIC_API_KEY` — ADD before AI chat micro-prompt
- [ ] `SAM_GOV_API_KEY=SAM-7edda156-1cdd-46aa-ba6c-791a7fb4da07` — ADD before SAM.gov micro-prompt

---

## SUCCESS CRITERIA

1. All three website sections (CCW, TSI, SBL) render with cinematic design, real video heroes, scroll animations
2. TSI drone video playing as full-viewport hero background (Murrieta Bus Yard aerial)
3. CCW.mp4 playing as CCW homepage hero background
4. AI chat widget operational on all three sites
5. Dashboard Command Center shows real KPIs with company switcher (CCW/TSI/SBL)
6. DEMO banner (amber) visible on all dashboard pages with note
7. All 12 original dashboard pages + 4 new module pages fully implemented
8. HR module: /careers page live, job postings manageable in dashboard
9. Financial dashboard: P&L, balance sheet, ESOP loan tracker (Dale-only toggle in demo mode)
10. SAM.gov: federal opportunity feed pulling live data for CCW's NAICS codes
11. Self-insurance dashboard: 6+ policy types with coverage amounts, expiry alerts
12. SEO: every page has title, description, canonical, og:image, schema markup
13. `npx tsc --noEmit` → zero errors
14. `npm run build` → zero errors
15. Mobile responsive at 375px

---

## READ BEFORE TOUCHING ANYTHING

- `lib/demo-data.ts` — 266-line complete demo dataset. Read before touching any dashboard page.
- `lib/database.types.ts` — 18 tables with `bus_` prefix. Migrations must match this EXACTLY.
- `supabase/migrations/001-004` — Will be REWRITTEN with `bus_` prefix in Micro-Prompt 1.
- `components/dashboard/Sidebar.tsx` — Already built and complete. Do NOT rewrite.
- `components/dashboard/MorningHuddle.tsx` — Already built and complete. Do NOT rewrite.
- `public/assets/ccw-media-inventory.md` — 59 images, 6 MP4s harvested from completecoach.com
- `public/assets/tsi-media-inventory.md` — 95+ images, 2 MP4s harvested from transitsales.com
- `public/assets/sbl-media-inventory.md` — 89 images, 1 video from sblbus.com
- `package.json` — Installed: Next.js 16, Clerk 7, Supabase 2.98, Recharts, react-hook-form, zod, Tailwind 4. Do NOT install again.

---

## ARCHITECTURE DECISIONS

### Three Brands — One Codebase
- `/` → CCW homepage (Complete Coach Works)
- `/tsi` → TSI homepage + `/tsi/inventory`
- `/sbl` → SBL homepage + `/sbl/fleet`
- `/dashboard` → Shared operations dashboard with company switcher

### Design System
- **CCW:** Navy `#003087`, Amber `#E8A020`, Dark Steel `#0A1628`
- **TSI:** Government Blue `#1a5fa8`, Clean White, Steel Gray `#64748b`
- **SBL:** Forest Green `#2d7a3a`, Deep Earth `#1a2e1a`, Amber accent
- **Font:** Geist Sans (already in Next.js 16)
- **Animation:** Framer Motion — scroll-triggered reveals, counter animations
- **Video heroes:** `<video>` autoplay loop muted with dark gradient overlay, fallback image

### Media Asset Strategy
**CCW Hero video:** `https://completecoach.com/wp-content/uploads/2024/04/CCW.mp4`
- Use as full-viewport autoplay video background on CCW homepage
- Dark overlay: `bg-gradient from-[#0A1628]/90 to-[#003087]/60`
- Alt/fallback: `https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920`

**TSI Drone video (THE WOW FACTOR):** `https://transitsales.com/wp-content/uploads/2018/12/Murrieta-Bus-Yard-Drone-Video1.mp4`
- Use as full-viewport autoplay video background on TSI homepage
- Aerial footage of Murrieta bus yard — 1,000+ buses, American flag
- Dark overlay: `bg-gradient from-[#1a5fa8]/80 to-[#0f3a6e]/60`
- This drone video is what makes TSI say "wow" — the physical scale is undeniable

**SBL Hero:** Same drone video URL reused (same bus yard)
- or: `https://transitsales.com/wp-content/uploads/2018/11/CCW-11_8-hd-1080.mp4` as alternative

**Gallery/Content images:** Use harvested images from media inventory files with SEO-optimized filenames
- Key: leadership headshots (Patrick Scully, James Carson, Jay Raber, Shah Remtula, Mark Hollenbeck)
- ZEPS before/after photos from gallery
- Agency delivery photos (TriMet, IndyGo, OCTA, SF Muni, Foothill Transit)

### Company Switcher in Dashboard
```tsx
// Header of all dashboard pages:
<div className="flex items-center gap-2">
  <button className={active === 'CCW' ? 'bg-navy text-white' : 'text-gray'} onClick={() => setActive('CCW')}>CCW</button>
  <button className={active === 'TSI' ? 'bg-blue-600 text-white' : 'text-gray'} onClick={() => setActive('TSI')}>TSI</button>
  <button className={active === 'SBL' ? 'bg-green-700 text-white' : 'text-gray'} onClick={() => setActive('SBL')}>SBL</button>
</div>
// DEMO banner: amber bar below header
<div className="bg-amber-400 text-amber-900 text-center py-1 text-xs font-medium">
  DEMO MODE — Data shown is illustrative. Live data requires Sage Intacct + Supabase connection.
</div>
```

### Financial Dashboard — Dale-Only Toggle
- Default: hidden (other dashboard users see operations only)
- In demo mode: visible with "OWNER VIEW" label and amber border
- Dale sees: P&L, Balance Sheet, ESOP Loan Tracker, Cash Position
- Sage Intacct scaffold: settings field for API key + company ID; shows "Not connected — enter Sage credentials to sync" when not configured

---

## DATABASE CHANGES

### Existing Tables (bus_ prefix — from 2026-03-16 spec, carry forward)

All 4 original migrations rewritten with bus_ prefix. See 2026-03-16 spec for full SQL.

Migration files:
- `supabase/migrations/001_bus_agencies_contracts.sql`
- `supabase/migrations/002_bus_vehicles_workorders.sql`
- `supabase/migrations/003_bus_parts_technicians.sql`
- `supabase/migrations/004_bus_finance_compliance.sql`

### NEW Tables (added in this spec — migrations 005-008)

```sql
-- Migration 005: HR Module
CREATE TABLE bus_job_postings (
  id bigserial PRIMARY KEY,
  title text NOT NULL,
  department text,
  location text,
  type text DEFAULT 'full_time',  -- full_time, part_time, contract
  description text,
  requirements text,
  salary_min numeric(10,2),
  salary_max numeric(10,2),
  status text DEFAULT 'draft',    -- draft, active, paused, filled
  posted_at timestamptz,
  filled_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE bus_applications (
  id bigserial PRIMARY KEY,
  job_posting_id bigint REFERENCES bus_job_postings(id),
  applicant_name text NOT NULL,
  applicant_email text NOT NULL,
  applicant_phone text,
  resume_url text,  -- Supabase Storage path
  cover_letter text,
  status text DEFAULT 'new',  -- new, reviewing, interview, offer, rejected, hired
  notes text,
  submitted_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE bus_policies (
  id bigserial PRIMARY KEY,
  title text NOT NULL,
  category text,  -- hr, safety, compliance, operations
  description text,
  document_url text,
  version text DEFAULT '1.0',
  effective_date date,
  review_date date,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bus_job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_policies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON bus_job_postings TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON bus_applications TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON bus_policies TO service_role USING (true) WITH CHECK (true);

-- Migration 006: Vendor Management
CREATE TABLE bus_vendors (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  category text,  -- parts_supplier, subcontractor, service_provider, equipment
  contact_name text,
  contact_email text,
  contact_phone text,
  address text,
  website text,
  contract_number text,
  contract_value numeric(12,2),
  contract_start date,
  contract_end date,
  status text DEFAULT 'active',  -- active, inactive, under_review
  payment_terms text,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bus_vendors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON bus_vendors TO service_role USING (true) WITH CHECK (true);

-- Migration 007: Owner Financial View (Dale-only)
CREATE TABLE bus_financials_snapshot (
  id bigserial PRIMARY KEY,
  period_year int NOT NULL,
  period_month int NOT NULL,
  company text NOT NULL DEFAULT 'CCW',  -- CCW, TSI, SBL, CONSOLIDATED
  -- Income Statement
  revenue_total numeric(14,2) DEFAULT 0,
  revenue_refurb numeric(14,2) DEFAULT 0,
  revenue_zeps numeric(14,2) DEFAULT 0,
  revenue_parts_sales numeric(14,2) DEFAULT 0,
  cogs_total numeric(14,2) DEFAULT 0,
  gross_profit numeric(14,2) DEFAULT 0,
  gross_margin_pct numeric(5,2) DEFAULT 0,
  operating_expenses numeric(14,2) DEFAULT 0,
  ebitda numeric(14,2) DEFAULT 0,
  net_income numeric(14,2) DEFAULT 0,
  -- Balance Sheet
  cash_on_hand numeric(14,2) DEFAULT 0,
  accounts_receivable numeric(14,2) DEFAULT 0,
  accounts_payable numeric(14,2) DEFAULT 0,
  total_assets numeric(14,2) DEFAULT 0,
  total_debt numeric(14,2) DEFAULT 0,
  -- ESOP
  esop_loan_balance numeric(14,2) DEFAULT 0,
  esop_annual_payment numeric(14,2) DEFAULT 0,
  esop_payoff_year int,
  -- Source
  source text DEFAULT 'manual',  -- manual, sage_intacct, sage_200
  synced_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(period_year, period_month, company)
);

CREATE TABLE bus_sage_config (
  id bigserial PRIMARY KEY,
  sender_id text,  -- Sage Intacct Web Services sender ID
  company_id text,  -- Sage company ID
  user_id text,
  client_secret_encrypted text,  -- stored encrypted, never in plaintext
  connected_at timestamptz,
  last_sync_at timestamptz,
  sync_status text DEFAULT 'not_connected',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bus_financials_snapshot ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_sage_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON bus_financials_snapshot TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON bus_sage_config TO service_role USING (true) WITH CHECK (true);

-- Migration 008: SAM.gov Opportunities
CREATE TABLE bus_sam_opportunities (
  id bigserial PRIMARY KEY,
  notice_id text UNIQUE NOT NULL,
  title text NOT NULL,
  solicitation_number text,
  department text,
  sub_tier text,
  naics_code text,
  posted_date date,
  response_deadline date,
  award_date date,
  estimated_value numeric(14,2),
  set_aside text,  -- SDVOSB, 8(a), Total SB, etc.
  synopsis text,
  active boolean DEFAULT true,
  bid_decision text DEFAULT 'pending',  -- pending, pursuing, no_bid, submitted, awarded
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bus_sam_opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON bus_sam_opportunities TO service_role USING (true) WITH CHECK (true);
```

Migration files:
- `supabase/migrations/005_bus_hr_vendors.sql`
- `supabase/migrations/006_bus_owner_financials.sql`
- `supabase/migrations/007_bus_sam_opportunities.sql`

### Demo Data Additions to `lib/demo-data.ts`

```typescript
// Job postings (6 demo jobs)
export const demoJobPostings = [
  { id: 1, title: 'Transit Bus Technician — Level II', department: 'Production', location: 'Riverside, CA', type: 'full_time', status: 'active', posted_at: '2026-03-01' },
  { id: 2, title: 'ZEPS Electric Systems Technician', department: 'ZEPS', location: 'Riverside, CA', type: 'full_time', status: 'active', posted_at: '2026-03-10' },
  { id: 3, title: 'Bus Sales Representative — Pacific Northwest', department: 'TSI', location: 'Remote', type: 'full_time', status: 'active', posted_at: '2026-02-20' },
  { id: 4, title: 'Fleet Lease Manager', department: 'SBL', location: 'Riverside, CA', type: 'full_time', status: 'active', posted_at: '2026-03-05' },
  { id: 5, title: 'Body & Paint Technician', department: 'Production', location: 'Riverside, CA', type: 'full_time', status: 'filled', filled_at: '2026-03-12' },
  { id: 6, title: 'Federal Contracts Administrator', department: 'Business Development', location: 'Riverside, CA', type: 'full_time', status: 'draft' },
]

// Vendors (8 demo vendors)
export const demoVendors = [
  { id: 1, name: 'Cummins Inc.', category: 'parts_supplier', contact_name: 'Mark T.', status: 'active', contract_end: '2027-06-30' },
  { id: 2, name: 'Voith GmbH', category: 'parts_supplier', contact_name: 'Klaus R.', status: 'active', contract_end: '2027-12-31' },
  { id: 3, name: 'Muncie Power Products', category: 'parts_supplier', status: 'active' },
  { id: 4, name: 'Wilson Electric', category: 'subcontractor', status: 'active' },
  { id: 5, name: 'Industrial Safety Supplies Co.', category: 'service_provider', status: 'active' },
  { id: 6, name: 'AutoCad Fleet Systems', category: 'service_provider', status: 'under_review' },
  { id: 7, name: 'Pacific Metal Works', category: 'parts_supplier', status: 'active' },
  { id: 8, name: 'National Transit Training', category: 'service_provider', status: 'active' },
]

// Owner financials — demo P&L (consolidated, full year 2025)
export const demoFinancials = {
  company: 'CONSOLIDATED',
  period: '2025 Full Year',
  revenue_total: 102000000,
  revenue_refurb: 68000000,
  revenue_zeps: 22000000,
  revenue_parts_sales: 12000000,
  cogs_total: 72000000,
  gross_profit: 30000000,
  gross_margin_pct: 29.4,
  operating_expenses: 14000000,
  ebitda: 18000000,
  net_income: 15000000,
  cash_on_hand: 8500000,
  accounts_receivable: 12300000,
  accounts_payable: 4200000,
  total_assets: 45000000,
  total_debt: 26500000,
  esop_loan_balance: 22000000,
  esop_annual_payment: 2200000,
  esop_payoff_year: 2036,
}

// SAM.gov opportunities (5 demo opportunities matching CCW NAICS codes)
export const demoSAMOpportunities = [
  { id: 1, title: 'Bus Rehabilitation Services — Tri-County Transit Authority', naics_code: '336999', department: 'FTA Grant Program', posted_date: '2026-03-10', response_deadline: '2026-04-10', estimated_value: 8500000, set_aside: 'Total Small Business', bid_decision: 'pursuing' },
  { id: 2, title: 'Zero Emission Bus Conversion Program — Pacific Northwest', naics_code: '336999', department: 'US Dept of Transportation', posted_date: '2026-03-05', response_deadline: '2026-04-30', estimated_value: 15200000, set_aside: null, bid_decision: 'pursuing' },
  { id: 3, title: 'CNG Repower Services IDIQ — Southwest Region', naics_code: '811310', department: 'Defense Logistics Agency', posted_date: '2026-02-20', response_deadline: '2026-03-25', estimated_value: 4200000, set_aside: 'SDVOSB', bid_decision: 'no_bid' },
  { id: 4, title: 'Transit Bus Parts and Accessories', naics_code: '336212', department: 'GSA Schedule', posted_date: '2026-03-12', response_deadline: '2026-05-15', estimated_value: null, set_aside: null, bid_decision: 'pending' },
  { id: 5, title: 'Pre-Owned Transit Bus Acquisition — 20 Units', naics_code: '336211', department: 'City of Phoenix', posted_date: '2026-03-14', response_deadline: '2026-04-14', estimated_value: 1800000, set_aside: null, bid_decision: 'pending' },
]

// TSI Inventory (12 demo buses)
export const demoTSIInventory = [
  { id: 1, year: 2012, make: 'Gillig', model: 'Low Floor', length: 40, fuelType: 'diesel', seats: 40, mileage: 380000, condition: 'refurbished', status: 'available' },
  { id: 2, year: 2015, make: 'New Flyer', model: 'Xcelsior XD40', length: 40, fuelType: 'cng', seats: 38, mileage: 290000, condition: 'refurbished', status: 'available' },
  { id: 3, year: 2014, make: 'New Flyer', model: 'Xcelsior XDE40', length: 40, fuelType: 'diesel-electric', seats: 37, mileage: 315000, condition: 'as-is', status: 'available' },
  { id: 4, year: 2016, make: 'Gillig', model: 'Advantage', length: 35, fuelType: 'cng', seats: 35, mileage: 245000, condition: 'refurbished', status: 'available' },
  { id: 5, year: 2018, make: 'Proterra', model: 'Catalyst E2', length: 40, fuelType: 'electric', seats: 40, mileage: 180000, condition: 'refurbished', status: 'available' },
  { id: 6, year: 2013, make: 'Gillig', model: 'Low Floor', length: 30, fuelType: 'diesel', seats: 30, mileage: 420000, condition: 'as-is', status: 'available' },
  { id: 7, year: 2017, make: 'New Flyer', model: 'Xcelsior XD60', length: 60, fuelType: 'diesel', seats: 55, mileage: 310000, condition: 'refurbished', status: 'available' },
  { id: 8, year: 2015, make: 'Van Hool', model: 'AG300', length: 60, fuelType: 'cng', seats: 52, mileage: 280000, condition: 'refurbished', status: 'pending' },
  { id: 9, year: 2019, make: 'Gillig', model: 'Low Floor', length: 40, fuelType: 'diesel', seats: 40, mileage: 195000, condition: 'refurbished', status: 'available' },
  { id: 10, year: 2016, make: 'New Flyer', model: 'Xcelsior XHE40', length: 40, fuelType: 'hydrogen', seats: 37, mileage: 220000, condition: 'as-is', status: 'available' },
  { id: 11, year: 2014, make: 'Gillig', model: 'Advantage', length: 40, fuelType: 'cng', seats: 40, mileage: 355000, condition: 'refurbished', status: 'available' },
  { id: 12, year: 2020, make: 'BYD', model: 'K9M', length: 40, fuelType: 'electric', seats: 38, mileage: 120000, condition: 'refurbished', status: 'available' },
]
```

---

## FILE MANIFEST (ALL files — original + new)

### FILES TO CREATE (new — full path):

**CCW Marketing Site:**
- `app/(marketing)/page.tsx` — CCW homepage REBUILD (video hero, scroll animations, stats, ZEPS callout, AI chat)
- `app/(marketing)/about/page.tsx` — About REBUILD (leadership headshots, ESOP story, 38-year history)
- `app/(marketing)/tsi/page.tsx` — TSI homepage (drone video hero, inventory-first, government blue)
- `app/(marketing)/tsi/inventory/page.tsx` — TSI inventory listing (filterable, 12+ buses)
- `app/(marketing)/sbl/page.tsx` — SBL homepage (drone video or CCW video, green, lease types)
- `app/(marketing)/sbl/fleet/page.tsx` — SBL available fleet
- `app/(marketing)/zeps/page.tsx` — ZEPS dedicated page (dark, cinematic, 6-stage process, cost calculator)
- `app/(marketing)/compliance/page.tsx` — FTA/government procurement hub
- `app/(marketing)/case-studies/page.tsx` — Case studies index
- `app/(marketing)/case-studies/trimet/page.tsx` — TriMet 60-ft articulated ZEPS story
- `app/(marketing)/careers/page.tsx` — **NEW** Public careers page with active job listings
- `app/(marketing)/careers/[id]/page.tsx` — **NEW** Individual job posting detail + apply form

**Marketing Components (new/rebuilt):**
- `components/marketing/CinematicHero.tsx` — Full-viewport video hero with scroll reveal
- `components/marketing/VideoHero.tsx` — **NEW** Video background variant with video element + fallback image
- `components/marketing/StatsBar.tsx` — Animated counter stats
- `components/marketing/ServiceCards.tsx` — 6 service cards with hover animations
- `components/marketing/ZEPSCalculator.tsx` — Interactive savings calculator
- `components/marketing/AgencyLogos.tsx` — Scrolling client logo ticker
- `components/marketing/AIChat.tsx` — AI chat widget (bottom-right, Claude-powered, B2G aware)
- `components/marketing/TSIInventoryFilter.tsx` — Filter/search bar for bus inventory
- `components/marketing/SBLLeaseTypes.tsx` — Lease type cards
- `components/marketing/TrustBar.tsx` — FTA/DBE/APTA/ESOP trust badges
- `components/marketing/NavBar.tsx` — REBUILD: context-aware nav + brand switcher

**Dashboard Pages (full implementation):**
- `app/dashboard/page.tsx` — Command Center REBUILD (company switcher, real Supabase + demo fallback)
- `app/dashboard/work-orders/page.tsx` — Work orders REBUILD
- `app/dashboard/fleet/page.tsx` — Fleet REBUILD
- `app/dashboard/contracts/page.tsx` — Contracts REBUILD
- `app/dashboard/finance/page.tsx` — Finance REBUILD (invoice ledger)
- `app/dashboard/parts/page.tsx` — Parts REBUILD
- `app/dashboard/pipeline/page.tsx` — Pipeline REBUILD (RFP CRM)
- `app/dashboard/technicians/page.tsx` — Technicians REBUILD
- `app/dashboard/locations/page.tsx` — Locations REBUILD
- `app/dashboard/compliance/page.tsx` — Compliance REBUILD
- `app/dashboard/zeps/page.tsx` — ZEPS REBUILD
- `app/dashboard/insurance/page.tsx` — Insurance REBUILD
- `app/dashboard/inventory/page.tsx` — **NEW** Inventory management (TSI + SBL, add/edit/sell/lease)
- `app/dashboard/hr/page.tsx` — **NEW** HR hub (job postings, applications, policies)
- `app/dashboard/hr/postings/page.tsx` — **NEW** Job postings management (CRUD)
- `app/dashboard/hr/applications/page.tsx` — **NEW** Application review queue
- `app/dashboard/hr/policies/page.tsx` — **NEW** Policy document library
- `app/dashboard/vendors/page.tsx` — **NEW** Vendor management
- `app/dashboard/owner/page.tsx` — **NEW** Financial dashboard (Dale-only in prod; visible in demo with note)
- `app/dashboard/federal/page.tsx` — **NEW** SAM.gov federal opportunity tracker
- `app/dashboard/website/page.tsx` — **NEW** Website performance (CCW/TSI/SBL SEO health)

**Dashboard Client Components:**
- `components/dashboard/WorkOrdersClient.tsx` — REBUILD
- `components/dashboard/FleetClient.tsx` — REBUILD
- `components/dashboard/FinanceClient.tsx` — REBUILD
- `components/dashboard/PartsClient.tsx` — REBUILD
- `components/dashboard/PipelineClient.tsx` — REBUILD
- `components/dashboard/TechDetailClient.tsx` — REBUILD
- `components/dashboard/WODetailClient.tsx` — REBUILD
- `components/dashboard/CompanySwitcher.tsx` — **NEW** CCW/TSI/SBL tab switcher + demo banner
- `components/dashboard/InventoryManagerClient.tsx` — **NEW** Inventory table + add/edit panel + photo upload
- `components/dashboard/HRJobsClient.tsx` — **NEW** Job postings CRUD with modal
- `components/dashboard/VendorTableClient.tsx` — **NEW** Vendor table with add/edit
- `components/dashboard/OwnerFinanceClient.tsx` — **NEW** P&L + balance sheet + ESOP tracker
- `components/dashboard/SAMOpportunitiesClient.tsx` — **NEW** Federal opportunity board

**API Routes:**
- `app/api/ai-chat/route.ts` — Claude AI chat (POST)
- `app/api/tsi/inventory/route.ts` — GET bus inventory
- `app/api/sam/opportunities/route.ts` — **NEW** GET SAM.gov opportunities (proxies SAM API)
- `app/api/careers/route.ts` — **NEW** GET active job postings (public)
- `app/api/careers/apply/route.ts` — **NEW** POST job application (public, with file upload)
- `app/api/inventory/route.ts` — **NEW** GET bus inventory (public with status filter, RLS-gated)
- `app/api/inventory/[id]/route.ts` — **NEW** PATCH inventory item status (dashboard-only, Clerk auth)

**Config:**
- `lib/site-config.ts` — CCW/TSI/SBL brand config (colors, taglines, nav items)
- `lib/sam-client.ts` — **NEW** SAM.gov API client (CCW UEI: QN7UN15K9NP2, NAICS: 336999, 811310, 336212)

**Infrastructure:**
- `supabase/migrations/001_bus_agencies_contracts.sql` — REPLACE ccw_ version
- `supabase/migrations/002_bus_vehicles_workorders.sql` — REPLACE ccw_ version
- `supabase/migrations/003_bus_parts_technicians.sql` — REPLACE ccw_ version
- `supabase/migrations/004_bus_finance_compliance.sql` — REPLACE ccw_ version
- `supabase/migrations/005_bus_hr_vendors.sql` — **NEW** HR + vendor tables
- `supabase/migrations/006_bus_owner_financials.sql` — **NEW** Financial snapshot + Sage config
- `supabase/migrations/007_bus_sam_opportunities.sql` — **NEW** SAM.gov opportunities table
- `supabase/migrations/008_bus_inventory.sql` — **NEW** TSI/SBL inventory with public RLS policy

### FILES TO MODIFY (existing):
- `middleware.ts` — Add Clerk auth protecting `/dashboard/*`
- `next.config.ts` — Add `images.unsplash.com` + `transitsales.com` + `completecoach.com` to remotePatterns
- `app/layout.tsx` — Add ClerkProvider wrapper + Organization schema markup
- `lib/demo-data.ts` — Add demoJobPostings, demoVendors, demoFinancials, demoSAMOpportunities, demoTSIInventory

### MIGRATION WATERMARK: current is 004_* → new migrations are 005-007

### ENV VARS ALREADY PRESENT:
- `NEXT_PUBLIC_SUPABASE_URL` ✅
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✅
- `SUPABASE_SERVICE_ROLE_KEY` ✅
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` ✅
- `CLERK_SECRET_KEY` ✅

### ENV VARS MISSING:
- `ANTHROPIC_API_KEY` — Claude API for AI chat widget
- `SAM_GOV_API_KEY` — `SAM-7edda156-1cdd-46aa-ba6c-791a7fb4da07` (Brad provided — add to Vercel)
- `AGENCY_SNAPSHOT_SECRET` — generate with `openssl rand -base64 32`

---

## SEO STRATEGY (unchanged from 2026-03-16 spec — see original for full keyword table)

### Photo SEO Labels (NEW — apply to harvested media)

All harvested images used in the rebuild should have:
- **Filename:** descriptive-keyword-rich name (e.g., `ccw-trimet-60ft-articulated-zeps-bus-delivery.jpg`)
- **Alt text:** specific, descriptive (e.g., `"TriMet 60-foot articulated bus after ZEPS electric conversion at Complete Coach Works facility in Riverside CA"`)

Key image→filename mapping:
```
CCW gallery/trimet-bus.jpg → ccw-trimet-lf60-zeps-electric-bus-conversion.jpg
CCW gallery/indygo-bus.jpg → transit-sales-indygo-gillig-used-bus-sale.jpg
CCW gallery/octa-rehab.jpg → ccw-octa-bus-midlife-rehabilitation-riverside-ca.jpg
CCW team/patrick-scully.jpg → patrick-scully-ceo-complete-coach-works.jpg
TSI yard/buses-for-sale.jpg → transit-sales-international-used-bus-inventory-murrieta-ca.jpg
Drone video thumbnail → transit-sales-murrieta-bus-yard-aerial-1000-buses.jpg (for og:image)
```

---

## AI CHAT SPECIFICATION

### System Prompt
```
You are the CCW Fleet Advisor, an expert assistant for Complete Coach Works, Transit Sales International, and Shuttle Bus Leasing.

You have expert knowledge of:
- CCW Services: Midlife refurbishment (~$300-400K, half cost of new, half delivery time), CNG repower (CARB L9N certified), ZEPS electric conversion (70+ conversions, 4M miles, $580K vs $830K OEM, 6-month delivery), collision/structural repair
- ZEPS specs: 403/504/605 kWh battery options, works on 30/35/40/60-ft buses, Voith partnership for articulated
- TSI Inventory: 1,000+ pre-owned transit buses, 30-60ft, all fuel types, 60-day accelerated delivery
- SBL Leasing: Seasonal/contract/gap/employee shuttle, lease-to-own available, 2002/2010 Olympics supplier, 1,000+ bus inventory
- FTA Programs: Section 5307, 5339, Buy America, useful life standards (12yr/500K miles for 40-ft)
- Cost math: Refurb ~$300-400K vs new bus ~$700-900K; ZEPS ~$580K vs new EV ~$780-880K+
- Company: CCW UEI QN7UN15K9NP2 | CAGE 1QA89 | SAM registered through Aug 25, 2026 | Riverside, CA | Est 1987 | 350 employees | ESOP

Style: Professional, direct, technically accurate. Lead with facts and numbers. After 2+ exchanges, offer a consultation.

Opening message: "I'm the CCW Fleet Advisor. Are you exploring fleet refurbishment, purchasing pre-owned buses, or looking at leasing options?"
```

---

## ZEPS COST CALCULATOR SPEC (unchanged from 2026-03-16 spec)

```
New OEM electric: $830,000/bus
ZEPS conversion: $580,000/bus
Savings per bus: $250,000
Annual fuel savings: (miles / 5.5 MPG × dieselPPG) - (miles × 2.6 kWh/mi × $0.12/kWh)
Annual maintenance savings: $15,000/bus
10-year total: (fuelSavings + maintenanceSavings) × 10 + purchaseSavings
```

---

## HR MODULE SPECIFICATION

### Dashboard HR Hub (`/dashboard/hr`)
Three tabs: Job Postings | Applications | Policies

**Job Postings tab:**
- Table: Title, Department, Location, Type, Status badge (draft/active/paused/filled), Posted Date, Application Count
- `"New Posting"` button → modal form (title, dept, location, type, description, salary range, requirements)
- Status actions: Activate / Pause / Mark Filled
- Link to public posting: `/careers/[id]`

**Applications tab:**
- Table: Applicant Name, Job Title, Submitted Date, Status badge
- Status pipeline: New → Reviewing → Interview → Offer → Hired/Rejected
- Click row → expand to show cover letter, resume download link, notes field
- Quick actions: Move to Interview | Reject | Add Note

**Policies tab:**
- Document library grid: Title, Category (HR/Safety/Compliance/Operations), Effective Date, Review Date, Status
- Upload new policy button (Supabase Storage upload)
- Color-coded review date: overdue=red, <90 days=amber, current=green
- Download link for each document

### Vendor Management (`/dashboard/vendors`)
- Table: Vendor Name, Category, Contact, Contract End Date, Status badge (active/inactive/under_review)
- Status badges: active=green, inactive=gray, under_review=amber
- `"Add Vendor"` button → modal
- Contract expiry alert: `"⚠️ {N} vendor contracts expiring in 90 days"`
- Click row → expand showing all contact info, contract details, notes

### Public Careers Page (`/careers`)
- Grid of active job postings with clean card layout
- Each card: Title, Department, Location, Type (Full Time / Contract), `"Apply Now"` button
- Filter by department or location
- Empty state: `"No openings right now — check back or submit a general inquiry"`

### Job Application Route (`/careers/[id]`)
- Job details section (full description, requirements, salary range if set)
- Application form: Name, Email, Phone, Resume upload, Cover letter textarea
- Submit → Supabase insert to bus_applications + resume upload to Supabase Storage
- Confirmation: `"Application received. We review all applications and will be in touch within 2 weeks."`

---

## FINANCIAL DASHBOARD SPECIFICATION

### Owner View (`/dashboard/owner`) — Demo mode: visible with amber "OWNER VIEW" label

**Company selector (tabs):** CCW | TSI | SBL | Consolidated

**P&L Section:**
| Metric | 2025 Full Year | 2024 Full Year |
|---|---|---|
| Revenue | $102,000,000 | ~$95,000,000 |
| COGS | $72,000,000 | |
| Gross Profit | $30,000,000 (29.4%) | |
| Operating Expenses | $14,000,000 | |
| EBITDA | $18,000,000 | |
| Net Income | $15,000,000 (14.7%) | |

**Balance Sheet Section:**
- Cash on Hand: $8.5M
- Accounts Receivable: $12.3M
- Accounts Payable: $4.2M
- Total Assets: $45M
- Total Debt: $26.5M

**ESOP Loan Tracker (featured section):**
```
╔═══════════════════════════════════════════════════╗
║  ESOP LOAN — DALE CARSON                          ║
║  Original Balance: $22,000,000                    ║
║  Current Balance: $22,000,000 (Year 1)            ║
║  Annual Payment: $2,200,000                       ║
║  Est. Payoff: 2036                                ║
║  [Progress bar: 0% of 10 years]                   ║
║  Next Payment Due: [date]                         ║
╚═══════════════════════════════════════════════════╝
```

**Sage Intacct Integration Widget:**
- "Not Connected" card with instructions to enter:
  1. Sender ID (Web Services)
  2. Company ID
  3. User ID
  4. API Password
- Save → attempts connection → shows last sync timestamp
- Shows "Manual Entry Mode" toggle when not connected

---

## SAM.GOV FEDERAL CONTRACTS SPECIFICATION

### CCW Entity Details (pre-populated)
- UEI: `QN7UN15K9NP2`
- CAGE Code: `1QA89`
- SAM Registration Expiry: `2026-08-25`
- Primary NAICS: `336999` (All Other Transportation Equipment Manufacturing)
- Secondary NAICS: `811310` (Commercial and Industrial Machinery and Equipment Repair and Maintenance), `336212`, `336211`

### Dashboard Federal Page (`/dashboard/federal`)
**SAM Registration Status Card:**
- Entity: Complete Coach Works
- UEI: QN7UN15K9NP2
- SAM Expiry: Aug 25, 2026 — **countdown badge** (calculated from today)
- `"Renew SAM Registration"` button → links to SAM.gov
- Alert if < 90 days: `"⚠️ SAM registration expires in {N} days — renew at sam.gov to maintain contract eligibility"`

**Opportunity Feed:**
- Pulls from `bus_sam_opportunities` table (populated by `/api/sam/opportunities` cron)
- Columns: Title, Agency/Department, NAICS, Posted, Deadline (days remaining), Value, Set-Aside, Decision badge
- Decision badge: pursuing=blue, no_bid=gray, submitted=amber, awarded=green, pending=default
- `"Refresh Opportunities"` button → calls /api/sam/opportunities to pull latest
- Filter by: NAICS code, Set-Aside type, Decision status

**`lib/sam-client.ts`:**
```typescript
// SAM.gov API client for CCW
const SAM_API_KEY = process.env.SAM_GOV_API_KEY
const CCW_UEI = 'QN7UN15K9NP2'
const CCW_NAICS = ['336999', '811310', '336212', '336211']

export async function fetchSAMOpportunities(naicsCodes: string[] = CCW_NAICS) {
  const today = new Date().toISOString().split('T')[0].replace(/-/g, '/')
  // Date 365 days ago for the postedFrom parameter
  const yearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0].replace(/-/g, '/')

  const url = `https://api.sam.gov/opportunities/v2/search?api_key=${SAM_API_KEY}&naicsCode=${naicsCodes.join(',')}&postedFrom=${yearAgo}&postedTo=${today}&ptype=o&limit=25`

  const res = await fetch(url)
  if (!res.ok) return { opportunities: [], error: res.statusText }
  const data = await res.json()
  return { opportunities: data.opportunitiesData || [], error: null }
}

export async function fetchEntityDetails(uei: string = CCW_UEI) {
  const url = `https://api.sam.gov/entity-information/v3/entities?api_key=${SAM_API_KEY}&ueiSAM=${uei}`
  const res = await fetch(url)
  if (!res.ok) return null
  const data = await res.json()
  return data.entityData?.[0] || null
}
```

---

## SELF-INSURANCE DASHBOARD (included in enhanced Insurance page)

CCW self-insures for essentially everything. The insurance dashboard (`/dashboard/insurance`) expanded:

**Coverage Categories (demo data — what a self-insured transit rehab company typically carries):**
```typescript
export const demoInsurancePolicies = [
  { id: 1, policy_type: 'General Liability', carrier: 'Self-Insured', coverage_limit: 10000000, expiry_date: '2026-12-31', status: 'active' },
  { id: 2, policy_type: 'Commercial Auto', carrier: 'Self-Insured', coverage_limit: 5000000, expiry_date: '2026-12-31', status: 'active' },
  { id: 3, policy_type: 'Workers Compensation', carrier: 'Self-Insured Fund', coverage_limit: null, expiry_date: '2026-06-30', status: 'active' },
  { id: 4, policy_type: 'Umbrella / Excess Liability', carrier: 'Excess Policy', coverage_limit: 25000000, expiry_date: '2026-09-30', status: 'active' },
  { id: 5, policy_type: 'Garage Keepers Legal Liability', carrier: 'Self-Insured', coverage_limit: 2000000, expiry_date: '2026-04-18', status: 'active' },  // 32 days
  { id: 6, policy_type: 'Professional Liability (E&O)', carrier: 'Self-Insured', coverage_limit: 5000000, expiry_date: '2026-11-30', status: 'active' },
  { id: 7, policy_type: 'Property / Equipment', carrier: 'Self-Insured Fund', coverage_limit: 15000000, expiry_date: '2026-12-31', status: 'active' },
  { id: 8, policy_type: 'Employment Practices Liability', carrier: 'Self-Insured', coverage_limit: 2000000, expiry_date: '2026-08-31', status: 'active' },
]
```

**Self-Insurance Reserve Fund Widget:**
- Display: "Self-Insurance Reserve Fund: $4.2M" (demo)
- 12-month loss history bar chart (Recharts)
- Active claims table: claim type, open date, reserved amount, status

**Note in demo:** "Self-insurance reserve fund and claims data must be connected to CCW's risk management system."

---

## INVENTORY MANAGEMENT SPECIFICATION

This replaces the previous static demo inventory approach. TSI and SBL inventory is managed by Dale's team directly from the dashboard. The public websites pull live from Supabase — no WordPress, no WooCommerce, no developer needed to add or remove a bus.

### DB Table (add to migration 005 or as its own migration 008)

```sql
CREATE TABLE bus_inventory (
  id bigserial PRIMARY KEY,
  brand text NOT NULL DEFAULT 'TSI',  -- TSI or SBL
  year int NOT NULL,
  make text NOT NULL,
  model text,
  vin text,
  length_ft int,
  fuel_type text,   -- diesel, cng, hybrid, electric, hydrogen, propane
  seats int,
  mileage int,
  condition text DEFAULT 'refurbished',  -- refurbished, as-is, parts-only
  price numeric(12,2),                   -- NULL = "Request Quote"
  price_display text,                    -- e.g. "Starting at $85,000" or NULL
  description text,
  features jsonb DEFAULT '[]',           -- ["ADA ramp", "AC", "Kneeling"]
  photos jsonb DEFAULT '[]',             -- array of Supabase Storage URLs
  primary_photo_url text,                -- first/featured photo
  status text DEFAULT 'draft',           -- draft, active, pending, sold, leased
  sbl_lease_type text,                   -- seasonal, gap, contract, shuttle (SBL only)
  sbl_min_term_months int,               -- minimum lease term (SBL only)
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz,
  sold_at timestamptz
);

ALTER TABLE bus_inventory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON bus_inventory TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "public_read_active" ON bus_inventory FOR SELECT TO anon USING (status = 'active');
```

> Note: The `public_read_active` RLS policy means the public website API can read listings without auth. Only service_role can create/update/delete.

### Dashboard Inventory Page (`/dashboard/inventory`)

**Two tabs: TSI Buses for Sale | SBL Lease Fleet**

**Table columns:**
Year | Make/Model | Fuel | Length | Mileage | Price (or "RFQ") | Status | Photos | Actions

**Status badges:**
- `draft` = gray (not visible on website)
- `active` = green (visible on `/tsi/inventory` or `/sbl/fleet`)
- `pending` = amber (marked as pending, still shows on site with "Pending Sale" badge)
- `sold` / `leased` = strikethrough gray (auto-hides from public website)

**Actions per row:**
- Edit (opens modal)
- View on Site (links to public URL)
- Mark as Sold / Mark as Leased (one-click status update)
- Archive (removes from all views)

**"Add Bus" button → modal form:**
```
Brand:          [TSI ▼ / SBL]
Year:           [____]
Make:           [Gillig / New Flyer / BYD / Proterra / Other]
Model:          [____]
Fuel Type:      [Diesel / CNG / Hybrid / Electric / Hydrogen / Propane]
Length:         [30ft / 35ft / 40ft / 60ft]
Seats:          [____]
Mileage:        [____]
Condition:      [Refurbished / As-Is]
Price:          [____] or [ ] Request Quote Only
Price Display:  [____] (optional — e.g. "Starting at $85,000")
Description:    [textarea]
Photos:         [drag-drop upload → Supabase Storage]
Status:         [Draft / Active]

[For SBL only:]
Lease Type:     [Seasonal / Gap / Contract / Shuttle]
Min Term:       [__ months]
```

**Photo upload:** Multiple files → each uploads to Supabase Storage bucket `bus-inventory-photos` → stored as URL array in `bus_inventory.photos` jsonb field. First uploaded photo = `primary_photo_url`.

**Public website integration:** The `/tsi/inventory` and `/sbl/fleet` pages call `/api/inventory?brand=TSI&status=active` (Supabase query). When a bus is marked sold, it disappears from the website automatically — no developer needed.

### API Routes for Inventory

**`/api/inventory/route.ts` (GET — public):**
```typescript
// GET /api/inventory?brand=TSI&status=active&fuelType=&length=
// Returns bus_inventory rows matching filters (public RLS allows anon reads of active)
```

**`/api/inventory/[id]/route.ts` (PATCH — authenticated dashboard only):**
```typescript
// PATCH /api/inventory/[id] — update status (mark sold, mark leased, activate, etc.)
// Requires Clerk auth (dashboard only — not public)
```

### Files Added for Inventory Module

New files:
- `supabase/migrations/008_bus_inventory.sql` — new table
- `app/dashboard/inventory/page.tsx` — inventory management hub (two tabs)
- `components/dashboard/InventoryManagerClient.tsx` — inventory table + add/edit modal + photo upload
- `app/api/inventory/route.ts` — public GET with filters
- `app/api/inventory/[id]/route.ts` — authenticated PATCH for status updates

Modify:
- `app/(marketing)/tsi/inventory/page.tsx` — switch from demoTSIInventory to live Supabase call via `/api/inventory?brand=TSI&status=active`
- `app/(marketing)/sbl/fleet/page.tsx` — switch from demo to live Supabase call via `/api/inventory?brand=SBL&status=active`
- `lib/demo-data.ts` — keep demoTSIInventory as fallback when Supabase returns empty

This replaces MICRO-PROMPT 14's website page and adds a new MICRO-PROMPT 16 (or folds into MP12). The inventory micro-prompt is MP 12 in the revised ordering below.

---

## WEBSITE PERFORMANCE DASHBOARD SPECIFICATION

### Website Health Page (`/dashboard/website`)
Shows SEO performance for all 3 sites using current audit findings + GSC integration scaffold.

**Current State Cards (from audit data, pre-populated):**
```
CCW completecoach.com    → Audit Score: 48/100  → Status: CRITICAL (Divi JS)
TSI transitsales.com     → Audit Score: 52/100  → Status: HIGH (Yoast misconfigured)
SBL sblbus.com           → Audit Score: 41/100  → Status: CRITICAL (17-month stale blog)
```

**GSC Integration widget:**
- "Connect Google Search Console" → OAuth flow placeholder
- Shows: Impressions, Clicks, CTR, Avg Position for each site
- Demo data showing improvement trajectory (before vs projected after rebuild)

**Fix Tracker:**
- Checkbox list pulling directly from audit findings in audit-summary-dale-carson.md
- Categories: Critical | High | Quick Wins
- Check off fixes as they're implemented

---

## MICRO-PROMPTS (complete list — 15 total)

### MICRO-PROMPT 1: Fix Table Prefix Mismatch + Core Infrastructure
Files:
- `supabase/migrations/001_bus_agencies_contracts.sql` (REPLACE — use bus_ schemas from 2026-03-16 spec)
- `supabase/migrations/002_bus_vehicles_workorders.sql` (REPLACE)
- `supabase/migrations/003_bus_parts_technicians.sql` (REPLACE — fix `bigsereal` typo → `bigserial`)
- `supabase/migrations/004_bus_finance_compliance.sql` (REPLACE)

Also in this pass:
- `middleware.ts` — Add Clerk auth protecting `/dashboard/*`
- `next.config.ts` — Add `images.unsplash.com`, `transitsales.com`, `completecoach.com` to remotePatterns

Verify by:
1. `npx tsc --noEmit` → zero errors
2. `ls supabase/migrations/` → 4 files, all starting with `001-004`, prefixed with `bus_`
3. `grep -r "ccw_" supabase/migrations/` → zero results

DO NOT proceed to MP2 until verified.

---

### MICRO-PROMPT 2: CCW Homepage Rebuild (Video Hero + Stats)
Files:
- `app/(marketing)/page.tsx` (REWRITE)
- `components/marketing/VideoHero.tsx` (CREATE)
- `components/marketing/StatsBar.tsx` (CREATE)

**VideoHero.tsx** (`"use client"`):
- `<video>` element: `autoPlay muted loop playsInline` with `src="https://completecoach.com/wp-content/uploads/2024/04/CCW.mp4"`
- Fallback: `<img>` with Unsplash bus transit photo if video fails to load
- Overlay: `bg-gradient-to-b from-[#0A1628]/90 via-[#003087]/60 to-[#0A1628]/80` positioned absolute over video
- Props: `videoSrc, fallbackImage, overlayClassName, children`
- Full viewport: `min-h-screen relative overflow-hidden`
- Content positioned `relative z-10` over the overlay

**Homepage page.tsx** — exact structure:
1. `<VideoHero videoSrc="https://completecoach.com/wp-content/uploads/2024/04/CCW.mp4">` with headline, subheadline, 2 CTAs, scroll arrow
2. `<StatsBar />` — 4 counters animating on scroll: 38+ Years | 350+ Employees | 70+ Electric Conversions | 4M+ ZEPS Miles
3. Services grid: 6 cards (Midlife Overhaul, CNG Repower, ZEPS Electric, Body/Paint, Interior Rehab, CNG Retanking)
4. ZEPS spotlight: dark section, stats, CTA to /zeps
5. Agency logos: TriMet, IndyGo, OCTA, SF Muni, Foothill Transit, AVTA, Mountain Line, Twin Transit
6. Trust bar: FTA Registered | APTA Member | DBE Compliant | 100% Employee-Owned | CARB Certified
7. CTA section

Verify by:
1. `npx tsc --noEmit` → zero errors
2. Navigate to `/` → Video playing in hero background, StatsBar visible below

---

### MICRO-PROMPT 3: NavBar + TSI Homepage (Drone Video Hero)
Files:
- `components/marketing/NavBar.tsx` (REWRITE)
- `app/(marketing)/tsi/page.tsx` (CREATE)
- `components/marketing/TrustBar.tsx` (CREATE)

**TSI Homepage** — use drone video as hero:
```tsx
<VideoHero videoSrc="https://transitsales.com/wp-content/uploads/2018/12/Murrieta-Bus-Yard-Drone-Video1.mp4">
  <h1>"The Nation's Largest Selection of Pre-Owned Transit Buses"</h1>
  // search bar in hero: fuel type + size + "Search Inventory" button
</VideoHero>
```

TSI color scheme: `#1a5fa8` government blue throughout.
Stats bar: 1,000+ Makes & Models | 30–60ft Sizes | 6 Fuel Types | 60-Day Delivery

Verify by:
1. `npx tsc --noEmit` → zero errors
2. Navigate to `/tsi` → Drone video playing as hero, blue color scheme, search bar in hero

---

### MICRO-PROMPT 4: ZEPS Page + SBL Homepage
Files:
- `app/(marketing)/zeps/page.tsx` (CREATE)
- `components/marketing/ZEPSCalculator.tsx` (CREATE)
- `app/(marketing)/sbl/page.tsx` (CREATE)

(Instructions identical to 2026-03-16 spec — see that spec for full ZEPS and SBL page details)

Verify by:
1. `npx tsc --noEmit` → zero errors
2. Navigate to `/zeps` → dark hero, comparison table, 6-stage process, calculator with live output
3. Navigate to `/sbl` → green hero with drone/CCW video, lease type cards, Olympics credential

---

### MICRO-PROMPT 5: AI Chat Widget
Files:
- `app/api/ai-chat/route.ts` (CREATE)
- `components/marketing/AIChat.tsx` (CREATE)
- `app/(marketing)/layout.tsx` (MODIFY — add AIChat)

(Instructions identical to 2026-03-16 spec — use full system prompt from this spec's AI CHAT SPECIFICATION section)

Verify by:
1. `npx tsc --noEmit` → zero errors
2. Amber chat bubble bottom-right on all marketing pages
3. Click → chat opens with opening message
4. Type "What is ZEPS?" → response within 3 seconds with specs

---

### MICRO-PROMPT 6: Dashboard Command Center + Company Switcher
Files:
- `app/dashboard/page.tsx` (REWRITE)
- `components/dashboard/CompanySwitcher.tsx` (CREATE)
- `app/dashboard/work-orders/page.tsx` + `components/dashboard/WorkOrdersClient.tsx` (REWRITE)

**CompanySwitcher.tsx** (`"use client"`):
- Three tab buttons: CCW (navy) | TSI (blue) | SBL (green)
- Active tab fills with brand color
- Stores selected company in `useState` + exports via context or prop callback
- DEMO banner: `<div className="bg-amber-400 text-amber-900 text-center py-1.5 px-4 text-sm font-medium">DEMO MODE — All data is illustrative. Connect Supabase + Sage Intacct for live data.</div>`
- DEMO banner renders BELOW the company tabs, ABOVE the main content

**Command Center** — 4 KPIs, open work orders table, urgent items sidebar, all with demo fallback

**WorkOrdersClient.tsx** — 5-column kanban: Open | In Progress | QA Hold | Ready | Completed (last 30 days)
- HTML5 drag API (no library)
- Cards show WO#, bus, agency, service type, days open (amber>14, red>30)

Verify by:
1. `npx tsc --noEmit` → zero errors
2. Navigate to `/dashboard` → DEMO banner visible, company switcher visible, 4 KPI tiles from demo data
3. Navigate to `/dashboard/work-orders` → 5-column kanban with cards

---

### MICRO-PROMPT 7: Dashboard Fleet + Finance + Parts
Files:
- `components/dashboard/FleetClient.tsx` (REWRITE)
- `components/dashboard/FinanceClient.tsx` (REWRITE)
- `components/dashboard/PartsClient.tsx` (REWRITE)

(Instructions identical to 2026-03-16 spec)

Verify by:
1. `npx tsc --noEmit` → zero errors
2. `/dashboard/fleet` → vehicle table with status badges
3. `/dashboard/finance` → two tabs (Invoices, Revenue Recognition), aging buckets visible
4. `/dashboard/parts` → inventory table, alert banner if low-stock items present

---

### MICRO-PROMPT 8: Dashboard Pipeline + Technicians + Locations
Files:
- `components/dashboard/PipelineClient.tsx` (REWRITE)
- `app/dashboard/technicians/page.tsx` (REWRITE)
- `app/dashboard/locations/page.tsx` (REWRITE)

(Instructions identical to 2026-03-16 spec)

Verify by:
1. `npx tsc --noEmit` → zero errors
2. `/dashboard/pipeline` → 4-column kanban with RFP cards
3. `/dashboard/technicians` → tech grid with cert status
4. `/dashboard/locations` → 10 location cards with utilization bars

---

### MICRO-PROMPT 9: Dashboard ZEPS + Compliance + Insurance (Enhanced)
Files:
- `app/dashboard/zeps/page.tsx` (REWRITE)
- `app/dashboard/compliance/page.tsx` (REWRITE)
- `app/dashboard/insurance/page.tsx` (REWRITE — include self-insurance reserve widget)

**Insurance page** additions beyond 2026-03-16 spec:
- Add "Self-Insurance Reserve Fund" widget: $4.2M balance (demo), 12-month loss history chart (Recharts BarChart)
- Active claims table: claim type, open date, reserved amount, status
- All 8 demo insurance policies from this spec's SELF-INSURANCE section

Verify by:
1. `npx tsc --noEmit` → zero errors
2. `/dashboard/insurance` → 8 policy cards, Garage Keepers shows 32-day alert, reserve fund widget visible
3. `/dashboard/compliance` → 4 tabs (Buy America, ADA, CARB, DBE)

---

### MICRO-PROMPT 10: New DB Migrations (HR + Finance + SAM.gov + Inventory)
Files:
- `supabase/migrations/005_bus_hr_vendors.sql` (CREATE — HR + vendor tables)
- `supabase/migrations/006_bus_owner_financials.sql` (CREATE — financial snapshot + Sage config)
- `supabase/migrations/007_bus_sam_opportunities.sql` (CREATE — SAM.gov opportunities)

Use the SQL exactly from this spec's DATABASE CHANGES section.

Also:
- Add demo data to `lib/demo-data.ts`: demoJobPostings (6), demoVendors (8), demoFinancials, demoSAMOpportunities (5), demoTSIInventory (12)

Verify by:
1. `npx tsc --noEmit` → zero errors
2. `ls supabase/migrations/` → 7 files (001-007)

DO NOT proceed until verified.

---

### MICRO-PROMPT 10b: Inventory DB Migration
Files:
- `supabase/migrations/008_bus_inventory.sql` (CREATE — bus inventory table with public RLS policy)

Use the SQL from INVENTORY MANAGEMENT SPECIFICATION section.

Verify by:
1. `npx tsc --noEmit` → zero errors
2. `grep "public_read_active" supabase/migrations/008_bus_inventory.sql` → policy exists

---

### MICRO-PROMPT 11: Inventory Management Dashboard
Files:
- `app/dashboard/inventory/page.tsx` (CREATE)
- `components/dashboard/InventoryManagerClient.tsx` (CREATE — table + add/edit modal + photo upload)
- `app/api/inventory/route.ts` (CREATE — public GET with filters)

**InventoryManagerClient.tsx** (`"use client"`):
- Two tabs: TSI Buses for Sale | SBL Lease Fleet
- Table: Year, Make/Model, Fuel type badge, Length, Mileage, Price (or "RFQ" badge), Status badge, # Photos, Actions
- Status badges: draft=gray, active=green, pending=amber, sold/leased=strikethrough gray
- Actions per row: Edit button | "Mark Sold" / "Mark Leased" quick-action buttons | "View on Site" link
- "Add Bus" button → slide-over panel (not a small modal — use full right panel, 600px wide)
  - Fields: Brand selector (TSI/SBL), Year, Make, Model, Fuel Type, Length, Seats, Mileage, Condition, Price, Price Display text, Description, Status toggle (Draft/Active)
  - For SBL: Lease Type + Min Term fields appear
  - Photo upload: multiple file input → each calls `/api/inventory/upload` → stores URL array in photos field
  - Primary photo: first uploaded, or user can click to set primary

**`/api/inventory/route.ts`:**
```typescript
// GET: returns bus_inventory where status='active' (or all if ?all=true for dashboard)
// Filters: ?brand=TSI, ?fuelType=electric, ?length=40
// For public website: Supabase anon key, RLS policy filters to active only
// For dashboard: uses service role, returns all statuses
```

**Modify `app/(marketing)/tsi/inventory/page.tsx`:**
Switch from demoTSIInventory array to `fetch('/api/inventory?brand=TSI')` call. Keep demoTSIInventory as fallback if response is empty.

Verify by:
1. `npx tsc --noEmit` → zero errors
2. Navigate to `/dashboard/inventory` → two tabs, add button, empty state with "Add your first bus" CTA if demo inventory empty
3. Add a demo bus → it appears in the table with green "active" badge
4. Navigate to `/tsi/inventory` → the newly added bus appears in the public listing

DO NOT proceed to MP12 until verified.

---

### MICRO-PROMPT 12: HR Module Dashboard Pages
Files:
- `supabase/migrations/005_bus_hr_vendors.sql` (CREATE)
- `supabase/migrations/006_bus_owner_financials.sql` (CREATE)
- `supabase/migrations/007_bus_sam_opportunities.sql` (CREATE)

Use the SQL exactly from this spec's DATABASE CHANGES section (migrations 005-007).

Also:
- Add demo data to `lib/demo-data.ts`: demoJobPostings (6), demoVendors (8), demoFinancials, demoSAMOpportunities (5), demoTSIInventory (12)

Verify by:
1. `npx tsc --noEmit` → zero errors
2. `ls supabase/migrations/` → 7 files (001-007)
3. `grep -c "CREATE TABLE" supabase/migrations/005_bus_hr_vendors.sql` → 3 tables (job_postings, applications, policies, vendors = 4 actually — split as 005 and 006 per this spec)

---

### MICRO-PROMPT 11: HR Module Dashboard Pages
Files:
- `app/dashboard/hr/page.tsx` (CREATE)
- `components/dashboard/HRJobsClient.tsx` (CREATE)
- `app/dashboard/vendors/page.tsx` + `components/dashboard/VendorTableClient.tsx` (CREATE)

**HR hub page** — 3 tabs: Job Postings | Applications | Policies
- All specified in HR MODULE SPECIFICATION section above
- HRJobsClient.tsx: job postings table + "New Posting" modal + status actions

**Vendors page** — vendor table + "Add Vendor" modal + contract expiry alerts

Verify by:
1. `npx tsc --noEmit` → zero errors
2. `/dashboard/hr` → 3 tabs, job postings table shows 5 active demo postings
3. `/dashboard/vendors` → 8 vendor rows, "Add Vendor" button opens modal

---

### MICRO-PROMPT 12: Public Careers Page
Files:
- `app/(marketing)/careers/page.tsx` (CREATE)
- `app/(marketing)/careers/[id]/page.tsx` (CREATE)
- `app/api/careers/route.ts` (CREATE)
- `app/api/careers/apply/route.ts` (CREATE)

**`/careers`**: Grid of active job cards. Pulls from demoJobPostings (or Supabase fallback). Each card: title, dept, location, type, "Apply" button.

**`/careers/[id]`**: Job detail + application form (react-hook-form + zod). On submit → POST to `/api/careers/apply` → inserts to bus_applications + uploads resume to Supabase Storage bucket `job-resumes`.

**API routes:**
- `GET /api/careers` → returns `bus_job_postings` where status='active' (or demo fallback)
- `POST /api/careers/apply` → validates with zod (name, email required; resume optional) → inserts to bus_applications

Verify by:
1. `npx tsc --noEmit` → zero errors
2. Navigate to `/careers` → 5 active job cards render (not the draft or filled ones)
3. Click a job → detail page renders with apply form
4. Submit form → success confirmation message appears

---

### MICRO-PROMPT 13: Financial Dashboard (Dale-only / Owner View)
Files:
- `app/dashboard/owner/page.tsx` (CREATE)
- `components/dashboard/OwnerFinanceClient.tsx` (CREATE)
- `lib/sam-client.ts` (CREATE)

**Owner page** (`"use client"` for tabs):
- DEMO: `<div className="border-2 border-amber-400 rounded-lg p-1 mb-4"><span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded">OWNER VIEW — Dale Carson Only</span></div>`
- Company tabs: CCW | TSI | SBL | Consolidated
- P&L section using demoFinancials — table format with YoY comparison columns
- Balance sheet section — two-column layout (assets | liabilities)
- ESOP Loan tracker — featured card with loan balance, annual payment, payoff timeline, progress bar
- Sage Intacct widget — "Not Connected" state with instructions to enter 4 credentials

**`lib/sam-client.ts`:**
Use the TypeScript from this spec's SAM.GOV section above.

Verify by:
1. `npx tsc --noEmit` → zero errors
2. Navigate to `/dashboard/owner` → amber "OWNER VIEW" label, P&L table, ESOP tracker, Sage widget

---

### MICRO-PROMPT 14: SAM.gov Federal Contracts + Website Performance
Files:
- `app/dashboard/federal/page.tsx` (CREATE)
- `components/dashboard/SAMOpportunitiesClient.tsx` (CREATE)
- `app/dashboard/website/page.tsx` (CREATE)
- `app/api/sam/opportunities/route.ts` (CREATE)

**Federal page:**
- SAM registration status card: UEI QN7UN15K9NP2, CAGE 1QA89, expiry Aug 25 2026 — countdown badge (>90 days=green, 30-90 days=amber, <30 days=red)
- Alert if < 90 days to expiry
- Opportunity feed table using demoSAMOpportunities (or Supabase fallback)
- "Refresh" button calls `/api/sam/opportunities`
- Decision status badges: pursuing=blue, no_bid=gray, submitted=amber, awarded=green

**`/api/sam/opportunities` route:**
```typescript
// GET: fetch from SAM.gov API, upsert to bus_sam_opportunities, return all
// Handles API quota gracefully: if SAM API fails (quota/network), return existing Supabase records with last_refreshed timestamp
```

**Website performance page:**
- 3 site health cards (CCW/TSI/SBL) with current audit scores (48/52/41 pre-rebuild, projected post-rebuild: ~75/80/78)
- Issue checklist pulled from audit findings
- GSC integration placeholder: "Connect Google Search Console" button (OAuth stub)
- Note: "These scores reflect the pre-rebuild audit. Scores will update after launch."

Verify by:
1. `npx tsc --noEmit` → zero errors
2. Navigate to `/dashboard/federal` → SAM registration card visible, UEI displayed, opportunity table with 5 demo rows
3. Navigate to `/dashboard/website` → 3 site health cards with scores

---

### MICRO-PROMPT 15: TSI Inventory + Schema Markup + Final SEO + Lint/Build/Deploy
Files:
- `app/(marketing)/tsi/inventory/page.tsx` (CREATE)
- `components/marketing/TSIInventoryFilter.tsx` (CREATE)
- `app/layout.tsx` (MODIFY — add Organization schema markup + ClerkProvider)

(TSI inventory instructions from 2026-03-16 spec MP10 — use demoTSIInventory from this spec's demo data)

**Schema markup in `app/layout.tsx`:**
Full Organization schema from 2026-03-16 spec SEO section.

Then: `npm run lint` → zero warnings. `npm run build` → zero errors.

Git:
```bash
git add supabase/migrations/ app/ components/ lib/ middleware.ts next.config.ts
git commit -m "feat(bus-engine): complete rebuild v2 — cinematic three-brand sites, video heroes, AI chat, full dashboard, HR module, owner financials, SAM.gov, careers page, self-insurance, vendor management"
git pull --rebase origin main
git push origin main
```

Verify by:
1. Vercel deploy URL live
2. `/` → CCW video hero plays
3. `/tsi` → Drone video hero plays
4. `/sbl` → SBL homepage with green color scheme
5. `/zeps` → ZEPS calculator works
6. `/careers` → 5 job cards visible
7. `/dashboard` → DEMO banner + company switcher
8. `/dashboard/owner` → OWNER VIEW with P&L and ESOP tracker
9. `/dashboard/federal` → SAM registration + opportunity feed
10. AI chat bubble bottom-right on all marketing pages
11. Page source on `/` → JSON-LD schema present

---

## AUTOMATION WIRING

No new Inngest events — bus-engine in demo/pitch mode.

## ERROR HANDLING

- AI chat: transient fail → "I'm having trouble connecting. Please call (800) 300-3751."
- Supabase queries: all wrapped in try/catch → fall through to demo data (never empty)
- SAM.gov API quota exceeded → return existing DB records with `⚠️ Data from {last_refresh_date}` notice
- Image load fails → Next.js `onError` → gray placeholder with bus icon
- Resume upload fails → "Upload failed — please email your resume to careers@completecoach.com"

## TEST MODE

No test mode needed — all Supabase falls back to demo data automatically.

## ENV VARS

New (add values):
- `ANTHROPIC_API_KEY` — Claude API key
- `SAM_GOV_API_KEY` — `SAM-7edda156-1cdd-46aa-ba6c-791a7fb4da07` (Brad provided)
- `AGENCY_SNAPSHOT_SECRET` — generate: `openssl rand -base64 32`

Already present (verify):
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

- Do NOT rewrite `Sidebar.tsx` — complete and correct
- Do NOT rewrite `MorningHuddle.tsx` — extend, not replace
- Do NOT rewrite `demo-data.ts` — ADD to it using demo data from this spec
- Do NOT install recharts, react-hook-form, or zod — already in package.json
- Do NOT show empty stat cards — all async operations have demo data fallback
- Do NOT commit with failing build or lint
- Do NOT add Stripe — Square per NuStack standards (no payments needed in this build)
- Do NOT improvise on AI chat system prompt — use exact one from this spec
- Do NOT put real financial data in code — use demo approximations, real data comes from Sage

---

## NEW DB MIGRATIONS (009-012) — Added by Research Pass 6

### Migration 009: Production Stages + Agency Users

```sql
-- bus_production_stages: tracks each bus through 8 refurbishment stages
CREATE TABLE bus_production_stages (
  id bigserial PRIMARY KEY,
  bus_id bigint REFERENCES bus_vehicles(id) ON DELETE CASCADE,
  contract_id bigint REFERENCES bus_contracts(id),
  stage text NOT NULL DEFAULT 'intake',
  -- enum: intake, disassembly, structural, mechanical, systems, paint, qc, ready, delivered
  entered_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  completed_by text,  -- technician/PM name
  notes text,
  photos jsonb DEFAULT '[]',  -- array of Supabase Storage URLs for this stage
  created_at timestamptz DEFAULT now()
);

-- bus_agency_users: transit agency fleet manager portal accounts
CREATE TABLE bus_agency_users (
  id bigserial PRIMARY KEY,
  agency_id bigint REFERENCES bus_agencies(id),
  agency_name text NOT NULL,
  contact_name text NOT NULL,
  contact_email text NOT NULL UNIQUE,
  contact_title text,
  portal_access_active boolean DEFAULT true,
  invited_at timestamptz DEFAULT now(),
  last_login_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bus_production_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_agency_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON bus_production_stages TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON bus_agency_users TO service_role USING (true) WITH CHECK (true);
-- Agency portal RLS: agency users can only read their own buses
CREATE POLICY "agency_read_own" ON bus_production_stages FOR SELECT TO authenticated
  USING (bus_id IN (
    SELECT v.id FROM bus_vehicles v
    JOIN bus_contracts c ON c.agency_id = (
      SELECT agency_id FROM bus_agency_users WHERE contact_email = auth.jwt()->>'email'
    )
    WHERE v.id = bus_production_stages.bus_id
  ));
```

### Migration 010: Change Orders + Compliance Certs + Plaid Config

```sql
-- bus_change_orders: scope changes with agency approval workflow
CREATE TABLE bus_change_orders (
  id bigserial PRIMARY KEY,
  bus_id bigint REFERENCES bus_vehicles(id),
  contract_id bigint REFERENCES bus_contracts(id),
  change_number text,  -- e.g. "CO-001"
  description text NOT NULL,
  scope_delta text,  -- what's changing in scope
  cost_delta numeric(10,2),  -- positive = add cost, negative = credit
  submitted_by text,  -- CCW PM name
  submitted_at timestamptz DEFAULT now(),
  agency_approved_at timestamptz,
  agency_approved_by text,  -- agency contact name
  status text DEFAULT 'pending',  -- pending, approved, rejected
  notes text,
  created_at timestamptz DEFAULT now()
);

-- bus_compliance_certs: downloadable cert assets per bus
CREATE TABLE bus_compliance_certs (
  id bigserial PRIMARY KEY,
  bus_id bigint REFERENCES bus_vehicles(id),
  contract_id bigint REFERENCES bus_contracts(id),
  cert_type text NOT NULL,
  -- enum: buy_america_pre_award, buy_america_post_delivery, fmvss_cert,
  --       purchaser_req_pre_award, purchaser_req_post_delivery, ada_cert,
  --       carb_cert, road_test_report, resident_inspector_report
  cert_date date,
  expiry_date date,
  document_url text,  -- Supabase Storage URL (PDF)
  issued_by text,
  status text DEFAULT 'pending',  -- pending, complete, expired
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- bus_plaid_config: Plaid bank account integration for Dale's real-time cash view
CREATE TABLE bus_plaid_config (
  id bigserial PRIMARY KEY,
  company text NOT NULL DEFAULT 'CCW',  -- CCW, TSI, SBL, CONSOLIDATED
  plaid_access_token_encrypted text,  -- encrypted, never in plaintext
  plaid_item_id text,
  plaid_institution_name text,
  plaid_account_name text,
  plaid_account_mask text,  -- last 4 digits only, for display
  connected_at timestamptz,
  last_sync_at timestamptz,
  sync_status text DEFAULT 'not_connected',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bus_change_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_compliance_certs ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_plaid_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON bus_change_orders TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON bus_compliance_certs TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON bus_plaid_config TO service_role USING (true) WITH CHECK (true);
```

### Migration 011: Enhanced bus_vehicles Columns

```sql
-- ADA compliance fields
ALTER TABLE bus_vehicles
  ADD COLUMN ada_lift_type text,                -- electric, hydraulic, fold-out, none
  ADD COLUMN ada_ramp_compliant boolean DEFAULT false,
  ADD COLUMN ada_securement_type text,          -- four-point, clamp
  ADD COLUMN doorway_clearance_inches numeric(4,1);  -- FTA requires >= 32"

-- NTD A-30 Required Fields
ALTER TABLE bus_vehicles
  ADD COLUMN vehicle_type_code text,            -- FTA NTD vehicle type code
  ADD COLUMN vehicle_length_ft int,
  ADD COLUMN year_last_rebuild int,
  ADD COLUMN funding_source text,               -- federal, state, local, mixed
  ADD COLUMN dedicated_use boolean DEFAULT false;

-- FTA Useful Life Benchmark (ULB) tracking
ALTER TABLE bus_vehicles
  ADD COLUMN useful_life_miles int DEFAULT 500000,
  ADD COLUMN odometer_at_last_overhaul int,
  ADD COLUMN in_service_date_original date;

-- VMRS coding on work orders (add to bus_work_orders)
ALTER TABLE bus_work_orders
  ADD COLUMN vmrs_failure_code text;  -- VMRS code for failure/reason
```

---

## NEW MICRO-PROMPTS (16-21) — Agency Portal + Compliance Hub

### MICRO-PROMPT 16: Agency Portal Foundation + New DB Migrations
Files:
- `supabase/migrations/009_bus_production_agency.sql` (CREATE — production stages + agency users)
- `supabase/migrations/010_bus_change_orders_certs_plaid.sql` (CREATE — change orders + compliance certs + Plaid config)
- `supabase/migrations/011_bus_vehicles_new_columns.sql` (CREATE — ADA + NTD + ULB columns)
- `app/agency/layout.tsx` (CREATE — separate layout from dashboard, no sidebar)

**Agency portal:** Completely separate from the dashboard. Different layout. Auth via Clerk magic link. URL: `/agency/*`

**`app/agency/layout.tsx`:**
- Simple layout: CCW logo top-left, "Agency Portal" label, user email top-right, sign out link
- No dashboard sidebar
- Mobile-first (transit fleet managers check on phones)
- Background: white, navy accent header

**Verify by:**
1. `npx tsc --noEmit` → zero errors
2. `ls supabase/migrations/` → 11 files (001-011)
3. `grep "bus_production_stages" supabase/migrations/009_bus_production_agency.sql` → exists
4. Navigate to `/agency` → simple header, not the dashboard sidebar

---

### MICRO-PROMPT 17: Agency Portal — Bus Dashboard + Detail View
Files:
- `app/agency/page.tsx` (CREATE — agency home: all buses in production)
- `app/agency/[busId]/page.tsx` (CREATE — bus detail: stage bar + feed + photos + docs)
- `components/agency/StageProgressBar.tsx` (CREATE)
- `components/agency/BusActivityFeed.tsx` (CREATE)

**`app/agency/page.tsx`:**
- Header: "Your Buses in Production at CCW" with total count badge
- Bus cards grid (2-col mobile, 3-col desktop): unit number, model year, bus type, current stage badge, estimated return date, days in shop
- Stage badge colors: intake=gray, disassembly=orange, structural=red, mechanical=blue, systems=blue, paint=purple, qc=amber, ready=green, delivered=gray
- Alert banner: buses needing attention (change orders pending, certs missing) → amber banner at top
- Empty state: "No buses currently in production. Contact your CCW account manager."
- All data from `bus_production_stages` + `bus_vehicles` joined — demo data fallback

**`app/agency/[busId]/page.tsx`:**
- Header: Bus #[unitNum] — [Year] [Make] [Model] — Back to all buses link
- `<StageProgressBar />`: 8 stage dots with connecting line, current stage highlighted, completed stages checked, dates under each completed stage
- Overview cards row: Current Stage | Est. Return Date | Days in Shop | Contract Value
- Tabs: Activity | Photos | Documents | Change Orders | Messages
  - **Activity tab:** timestamped feed of stage transitions, milestone notes, CCW PM comments
  - **Photos tab:** gallery organized by stage (select stage → see all photos for that stage). Click to enlarge. Download button on each.
  - **Documents tab:** compliance certs table (cert type, date, status=complete/pending/expired, download PDF button). Bulk download button for full package.
  - **Change Orders tab:** list of scope changes with status (pending/approved/rejected). Each has: description, cost delta, "Approve" / "Reject" buttons (if pending and current user is authorized)
  - **Messages tab:** threaded conversation. "Send message to CCW" form. PM replies visible here.

**Demo data for agency portal (add to `lib/demo-data.ts`):**
```typescript
export const demoAgencyBuses = [
  { id: 1, unit_number: 'BUS-4417', year: 2015, make: 'New Flyer', model: 'Xcelsior', stage: 'mechanical', entered_stage_at: '2026-03-01', est_return_date: '2026-04-15', days_in_shop: 44 },
  { id: 2, unit_number: 'BUS-4418', year: 2015, make: 'New Flyer', model: 'Xcelsior', stage: 'paint', entered_stage_at: '2026-03-10', est_return_date: '2026-04-08', days_in_shop: 35 },
  { id: 3, unit_number: 'BUS-4419', year: 2014, make: 'Gillig', model: 'Advantage', stage: 'qc', entered_stage_at: '2026-03-14', est_return_date: '2026-03-25', days_in_shop: 55 },
]
```

**Verify by:**
1. `npx tsc --noEmit` → zero errors
2. Navigate to `/agency` → 3 demo bus cards with stage badges
3. Click a bus → detail view renders with stage progress bar, 5 tabs
4. Photos tab → gallery renders (demo placeholders)
5. Change Orders tab → pending CO shows Approve/Reject buttons

---

### MICRO-PROMPT 18: Agency Portal — FTA Docs + Change Order Workflow + Plaid Bank Feed
Files:
- `app/api/agency/change-orders/[id]/route.ts` (CREATE — PATCH approve/reject)
- `app/api/agency/buses/route.ts` (CREATE — GET buses for agency)
- `components/agency/ComplianceDocDownloader.tsx` (CREATE)
- `components/dashboard/PlaidBankWidget.tsx` (CREATE — for owner financial dashboard)

**Change order approval API (`/api/agency/change-orders/[id]`):**
```typescript
// PATCH: { action: 'approve' | 'reject', approver_name: string }
// Validates: agency user owns the bus this CO belongs to
// Updates bus_change_orders: status, agency_approved_at, agency_approved_by
// On approve: sends notification email to CCW PM via Resend
// On reject: sends notification email with rejection reason
```

**Pre-delivery compliance gap check (built into the agency portal):**
- When a bus enters `qc` stage, dashboard PM view shows alert: "Pre-delivery compliance check"
- Scan `bus_compliance_certs` for this bus: any cert with status='pending' or status='expired' → flag
- Color-coded: green (all certs complete), yellow (expiring within 60 days), red (missing/expired)
- One-click: generate draft remediation work order for each flagged cert (AI Draft → Pending Review label)

**Plaid Bank Widget for Dale's Owner View:**
```typescript
// PlaidBankWidget.tsx — shows in /dashboard/owner
// "Connect Bank Account" button → POST /api/plaid/link-token → opens Plaid Link
// After connection: shows live account balance with last-sync timestamp
// Displays: Account name (masked), Current Balance, Available Balance, Last Synced
// "Refresh" button → POST /api/plaid/sync → fetches latest balances + last 30 days transactions
// Transactions summary: total credits (revenue proxy), total debits (expense proxy), net
// Note (always visible): "Plaid provides real-time balance visibility. Detailed P&L comes from Sage Intacct."
// Not connected state: "Connect a bank account for real-time cash position"
// ⚠️ Plaid OAuth requires Brad to authenticate with Dale's bank on behalf of Dale — this is a one-time manual step
```

**ENV VARS to add for Plaid:**
- `PLAID_CLIENT_ID` — from Plaid dashboard
- `PLAID_SECRET` — from Plaid dashboard (use sandbox for testing, production for Dale)
- `PLAID_ENV` — `sandbox` or `production`
- Note: NuStack already has Plaid production keys in agency-engine (from MEMORY.md)

**Verify by:**
1. `npx tsc --noEmit` → zero errors
2. Agency portal: click "Approve" on a change order → status updates to "Approved" with timestamp
3. Compliance gap check: bus in qc stage → red/yellow/green banner appears based on cert completeness
4. Owner dashboard: Plaid widget visible with "Connect bank account" CTA

---

### MICRO-PROMPT 19: CCW Website Compliance Hub + SAM.gov Badge
Files:
- `app/(marketing)/ccw/compliance/page.tsx` (CREATE)
- `components/marketing/ComplianceBadge.tsx` (CREATE)
- `components/marketing/SAMGovBadge.tsx` (CREATE)
- Modify: `app/(marketing)/page.tsx` — add trust bar with compliance badges

**`/ccw/compliance` page structure:**
- Page hero: "FTA Compliance & Certifications" — navy background, concise intro paragraph
- Section 1 — FTA Transit Vehicle Manufacturer Status:
  - Badge: "FTA Eligible TVM" with link to transit.dot.gov/TVM
  - Statement: "Complete Coach Works is listed on the FTA Eligible Transit Vehicle Manufacturer list, meeting all requirements for FTA-assisted bus procurement."
  - Contact for verification: Patrick Scully, CEO
- Section 2 — Buy America (49 USC 5323(j)):
  - Regulatory citation
  - Plain-English compliance statement: "All CCW refurbishments achieve >70% domestic component content. Final assembly performed at our Riverside, CA facility."
  - "Pre-Award Buy America Certificate available upon request — contact us to receive documentation for your procurement file."
  - Download CTA (Supabase Storage PDF if document provided, otherwise "Request Certificate" form)
- Section 3 — DBE Program (49 CFR 26.49):
  - Annual DBE goal % (placeholder — replace with actual)
  - DBE subcontracting opportunities contact
  - Current compliance status note
- Section 4 — ADA / Section 504 (49 CFR Parts 27, 37, 38):
  - Statement: all refurbished vehicles meet 49 CFR Part 38 specs
  - Key specs: 32" doorway clearance, 30" ramp width, 4-point securement systems
  - ADA cert available upon request
- Section 5 — CARB Emissions:
  - ZEPS zero-emission system as CARB ICT-compliant solution
  - HVIP voucher availability: "Zero-emission ZEPS conversions may qualify for HVIP incentives"
  - CNG CARB compliance posture
- Section 6 — SAM.gov Registration:
  - `<SAMGovBadge />`: entity name, UEI QN7UN15K9NP2, CAGE 1QA89, primary NAICS 336999, registration status (active), expiry date Aug 25, 2026
  - NAICS codes listed: 336999, 811310, 336212, 336211
  - "Verify our registration at sam.gov" link
- Section 7 — Pre-Award & Post-Delivery Support:
  - Explains FTA 49 CFR Part 663 process
  - "We support transit agencies through the complete FTA pre-award and post-delivery review process, including resident inspector accommodations and complete documentation packages."
- Contact bar: "Questions about compliance documentation? Contact our compliance team." → mailto or form

**Trust bar additions to CCW homepage:**
Add to existing trust bar: `FTA Registered TVM | APTA Member | Buy America Compliant | DBE Program | CARB Certified | SAM.gov Registered`

**Verify by:**
1. `npx tsc --noEmit` → zero errors
2. Navigate to `/ccw/compliance` → 7 compliance sections render, SAM badge shows UEI and NAICS
3. CCW homepage trust bar → 6 items visible
4. Mobile: compliance page readable on 375px

---

### MICRO-PROMPT 20: CCW Website — Agency Case Studies + Cooperative Contracts
Files:
- `app/(marketing)/ccw/agencies/page.tsx` (CREATE)
- `app/(marketing)/ccw/procurement/page.tsx` (CREATE)
- `components/marketing/AgencyCaseStudyCard.tsx` (CREATE)
- `components/marketing/CoopContractBadge.tsx` (CREATE)

**`/ccw/agencies` page — "Our Agency Partners":**
- Page hero: "Trusted by Transit Agencies Across North America" — dark navy, agency logos
- Agency logo grid: TriMet, IndyGo, OCTA, Foothill Transit, SF Muni, AVTA, Mountain Line, Twin Transit, McAllen TX, Fresno (use images from media inventory)
- Case study cards (6 total) using `<AgencyCaseStudyCard />`:
  ```
  Card structure:
  - Agency name + state badge
  - Year
  - "The Challenge" (1-2 sentences)
  - "The Solution" (1-2 sentences + bus count/scope)
  - "The Result" (stat-forward: cost savings %, useful life extension, audit outcome)
  - Fast facts sidebar: contract value, buses, timeline, certifications
  ```
  Demo content (to be replaced with real data from Dale):
  - TriMet (OR): 15 buses, mid-life overhaul, $3.2M contract
  - IndyGo (IN): 8 ZEPS electric conversions, $4.6M, CARB-compliant
  - OCTA (CA): 22 buses, CNG repower + ADA update, $5.1M
  - Foothill Transit (CA): 18 buses mid-life overhaul, passed FTA post-delivery first review
  - AVTA (CA): 6 ZEPS conversions, $3.5M
  - SF Muni (CA): body/paint + interior, 12 buses, accelerated delivery

**`/ccw/procurement` page — "How to Work With CCW":**
- Page hero: "Government Procurement Made Simple" — includes "No new RFP required" prominently
- Section 1 — Cooperative Purchasing:
  - "Agencies can procure CCW services without a new RFP using an existing cooperative contract vehicle."
  - `<CoopContractBadge />` for Washington State DES:
    - Logo + "Washington State DES"
    - Contract number (get from Dale)
    - "Participating agencies can piggyback on this contract — no new solicitation required"
    - "Valid for: [states that can use WA DES]"
  - Placeholder cards for future cooperatives (H-GAC, OMNIA, NASPO) with "Coming Soon" state
- Section 2 — Standard Procurement:
  - "How to write an RFP that includes CCW services"
  - Downloadable: "Sample RFP Language for Bus Refurbishment Services" (PDF — create a template)
  - "Request specification sheets formatted for solicitation inclusion"
  - "We support agencies through pre-award requirements including FTA documentation, resident inspector accommodations, and Buy America certification"
- Section 3 — Get Started:
  - Timeline: typical refurbishment procurement timeline (RFP → award → refurb → delivery: 6-12 months)
  - Contact form (react-hook-form + zod): agency name, state, fleet size, service interest, contact info
  - Submit → email notification to CCW via Resend + confirmation to agency contact

**Verify by:**
1. `npx tsc --noEmit` → zero errors
2. Navigate to `/ccw/agencies` → 6 case study cards, 10 agency logos
3. Navigate to `/ccw/procurement` → WA DES cooperative contract badge, RFP download CTA
4. Contact form: submit → success state shows

---

### MICRO-PROMPT 21: NTD Export + Compliance Gap Detector + Final Lint/Build
Files:
- `app/dashboard/compliance/gap-detector/page.tsx` (CREATE)
- `app/api/compliance/gap-scan/route.ts` (CREATE)
- `app/api/compliance/ntd-export/route.ts` (CREATE)
- `components/dashboard/ComplianceGapReport.tsx` (CREATE)

**Compliance Gap Detector (`/dashboard/compliance/gap-detector`):**
- Page header: "Pre-Delivery Compliance Gap Scan" with AI badge ("AI-Assisted — Pending CCW Review")
- Bus selector: filter by contract, by stage (show all buses in qc or ready stages)
- "Run Gap Scan" button → POST `/api/compliance/gap-scan` with bus IDs
- `<ComplianceGapReport />` renders result:
  - For each bus: unit number + color-coded status (green/yellow/red)
  - Green: all required certs present and valid
  - Yellow: any cert expiring within 60 days
  - Red: any cert status=pending or missing entirely
  - Expandable row: shows which certs are problematic with cert type and status
  - "Create Remediation WO" button for red/yellow buses → creates draft work order with AI-generated description ("AI Draft — Pending Review" label)

**`/api/compliance/gap-scan` (POST):**
```typescript
// Input: { busIds: number[] }
// For each bus: query bus_compliance_certs
// Required certs: buy_america_post_delivery, purchaser_req_post_delivery, fmvss_cert, ada_cert
// Logic: missing cert = red; cert expiring within 60 days = yellow; all present + valid = green
// Return: { busId, unitNumber, status: 'green'|'yellow'|'red', issues: CertIssue[] }
```

**NTD A-30 Export (`/api/compliance/ntd-export` GET):**
```typescript
// Query string: ?contractId=X or ?dateFrom=YYYY-MM-DD&dateTo=YYYY-MM-DD
// Returns all delivered buses in range with NTD A-30 required fields:
// vehicle_type_code, vehicle_length_ft, year/make/model, fuel_type,
// seating_capacity_total, seating_capacity_ada, ada_lift_type,
// year_last_rebuild (= current year), odometer_at_delivery, funding_source, dedicated_use
// Format: CSV download with Content-Disposition: attachment; filename="ntd-a30-export-{date}.csv"
```

**Add to `lib/demo-data.ts`:**
```typescript
export const demoCertGapReport = [
  { bus_id: 1, unit_number: 'BUS-4417', status: 'green', issues: [] },
  { bus_id: 2, unit_number: 'BUS-4418', status: 'yellow', issues: [{ cert_type: 'buy_america_post_delivery', status: 'pending' }] },
  { bus_id: 3, unit_number: 'BUS-4419', status: 'red', issues: [{ cert_type: 'fmvss_cert', status: 'pending' }, { cert_type: 'ada_cert', status: 'pending' }] },
]
```

**Final lint/build pass:**
```bash
npm run lint  # → zero warnings
npx tsc --noEmit  # → zero errors
npm run build  # → zero errors
git add supabase/migrations/ app/ components/ lib/
git commit -m "feat(bus-engine): agency portal, compliance hub, cooperative contracts, NTD export, Plaid bank feed, gap detector — MPs 16-21"
git pull --rebase origin main
git push origin main
```

**Verify by:**
1. `npx tsc --noEmit` → zero errors
2. `npm run build` → zero errors
3. Navigate to `/dashboard/compliance/gap-detector` → 3 demo buses render: 1 green, 1 yellow, 1 red
4. Click "Create Remediation WO" on red bus → draft WO created with "AI Draft — Pending Review" label
5. Click NTD Export on any delivered bus contract → CSV downloads with correct A-30 headers
6. Vercel deploy URL live after push

---

## PLAID BANK INTEGRATION — DALE'S REAL-TIME CASH POSITION

Brad's insight: Plaid gives Dale real-time bank balance data immediately. Sage Intacct gives detailed P&L. They complement each other.

### The Value Prop for Dale

- Plaid: "What's in the bank right now?" — instant, no accountant needed, refreshes live
- Sage Intacct (when connected): "Why is that number what it is?" — full P&L, cost centers, EBITDA
- The two together: real-time cash awareness + detailed accounting understanding

### What Plaid Shows in the Owner Dashboard

1. **Live Balance Card** (green border, refreshes on click):
   - Account name + bank name (masked account number last 4)
   - Current Balance: $X,XXX,XXX
   - Available Balance: $X,XXX,XXX
   - Last synced: [timestamp]
   - "Refresh" button

2. **30-Day Cash Flow Summary** (below the balance card):
   - Total Credits (money in): $X,XXX,XXX
   - Total Debits (money out): $X,XXX,XXX
   - Net Cash Movement: +/- $XXX,XXX
   - Note: "This reflects total account activity, not net income. Detailed P&L available from Sage Intacct."

3. **"Connect Bank Account"** setup flow:
   - Plaid Link opens (handles bank OAuth)
   - After success: access token stored encrypted in `bus_plaid_config`
   - ⚠️ **Manual step required**: Dale must physically authenticate with his bank through Plaid Link. Brad facilitates but cannot do this for Dale.

### ENV VARS for Plaid

```
PLAID_CLIENT_ID=     (from Plaid dashboard)
PLAID_SECRET=        (from Plaid dashboard — use sandbox for testing)
PLAID_ENV=sandbox    (switch to production when ready for Dale)
```

Note: NuStack already has Plaid production credentials in the agency-engine. Check `.env.local` for `PLAID_CLIENT_ID` and `PLAID_SECRET` — same keys work for bus-engine.

### API Routes for Plaid

```typescript
// POST /api/plaid/link-token → creates Plaid Link token for OAuth flow
// POST /api/plaid/exchange-token → exchanges public token for access token (encrypted + stored in bus_plaid_config)
// POST /api/plaid/sync → fetches latest balances + 30-day transactions → returns to PlaidBankWidget
```

### Install (if not already present)

```bash
npm install plaid react-plaid-link
```

### Plaid Implementation Note

Plaid's output (credits vs debits) is NOT the same as Revenue vs Expenses in accounting terms. Credits include both customer payments AND loan draws AND transfers. Debits include payroll, materials, and loan payments. Always display the disclaimer in the UI.

---

## ENV VARS (Updated — all vars needed for MPs 1-21)

New vars from research pass (add to Vercel + `.env.local`):
- `ANTHROPIC_API_KEY` — Claude API (for AI chat + gap detector remediation drafts)
- `SAM_GOV_API_KEY` — `SAM-7edda156-1cdd-46aa-ba6c-791a7fb4da07`
- `AGENCY_SNAPSHOT_SECRET` — generate: `openssl rand -base64 32`
- `PLAID_CLIENT_ID` — from Plaid (check agency-engine .env.local first — same keys)
- `PLAID_SECRET` — from Plaid
- `PLAID_ENV` — `sandbox` (testing) or `production` (Dale's live bank)
- `RESEND_API_KEY` — for change order notification emails and procurement form

Already present (verify):
- `NEXT_PUBLIC_SUPABASE_URL` ✅
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✅
- `SUPABASE_SERVICE_ROLE_KEY` ✅
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` ✅
- `CLERK_SECRET_KEY` ✅

## INSTALL (Updated)

```bash
npm install framer-motion @anthropic-ai/sdk plaid react-plaid-link
# framer-motion: scroll animations
# @anthropic-ai/sdk: AI chat + remediation draft generation
# plaid: Plaid API client
# react-plaid-link: Plaid Link OAuth component
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GATE R3 — SPEC COMPLETE. READY FOR BUILD.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Spec saved to: C:\Users\bradp\dev\bus-engine\SPEC-complete-rebuild-2026-03-17.md
Feature: Complete Bus-Engine Rebuild v2
Micro-prompts: 21 (MPs 1-15 original + MPs 16-21 added by ENGINE-UPGRADE-RESEARCH pass)
Research: 6 passes complete — ready for /build-from-spec in a fresh session
