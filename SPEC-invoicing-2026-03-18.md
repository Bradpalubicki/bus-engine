# SPEC: bus-engine Invoicing System
**Date:** 2026-03-18
**Source reference:** equipment-rental-engine invoice system ported + adapted for three-company bus industry

---

## DECISION LOG

| Decision | Rationale |
|---|---|
| New `bi_` table prefix | "bi" = bus invoicing. Existing `bus_invoices` table in migration 004 is anemic (no line_items, no subtotal, no tax, no customer FK). New table replaces it functionally. |
| Keep existing `bus_invoices` table intact | It has FK references and data. New `bi_invoices` table is the full-featured replacement. `bus_invoices` can be deprecated later. |
| Three billing_type columns instead of three separate tables | CCW (milestone), TSI (per_unit), SBL (recurring) all share the same invoice shape — only the line-item template and UX differ. One table, one query, one list view. |
| `@react-pdf/renderer` for PDF, NOT pdfkit | bus-engine already has `@react-pdf/renderer: ^4.3.2` in package.json. equipment-rental-engine uses pdfkit. Use what's already installed. |
| No Square/Stripe wiring | Per spec: Record Payment button (manual) + payment_processor toggle in settings. Zero payment processor code this build. |
| Link to contract/proposal | `contract_id` FK to `bus_contracts`. For TSI (sales), optional `tsi_unit_id` FK to inventory. For SBL, optional `lease_id` FK to leases. |
| Company switcher integration | The Sidebar already has CCW / TSI / SBL company switcher. Invoices page reads a `?company=CCW` query param (or localStorage fallback) to filter by billing_type. |
| Supabase auth pattern | bus-engine uses `createClient()` from `lib/supabase/server.ts` (service role, no fleet_id isolation). Auth is Clerk via middleware. No `tryAuth()` wrapper exists — use `auth()` from `@clerk/nextjs/server` directly. |

---

## ARCHITECTURE OVERVIEW

```
/dashboard/invoices        → InvoicesPage (Server Component, fetches from bi_invoices)
  └── InvoicesClient.tsx   → Main list, AR aging, filters, create modal (Client Component)
  └── CreateInvoiceModal   → Inline in InvoicesClient — line items, billing type presets
  └── RecordPaymentModal   → Inline — amount + date + notes
/api/invoices/route.ts     → GET (list) + POST (create)
/api/invoices/[id]/route.ts → PATCH (status/payment) + DELETE (void)
/api/invoices/[id]/pdf/route.ts → GET → @react-pdf/renderer → PDF stream
/api/invoices/[id]/send/route.ts → POST → mark sent + Resend email
supabase/migrations/011_bi_invoices.sql → new tables
```

---

## DATABASE SCHEMA

### Migration 011: `bi_` Invoice Tables

```sql
-- Migration 011: Bus Invoicing (bi_ prefix)
-- Replaces anemic bus_invoices with full-featured invoice system

CREATE TABLE bi_invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Identity
  invoice_number TEXT UNIQUE NOT NULL,   -- e.g. CCW-INV-2026-001, TSI-INV-2026-001, SBL-INV-2026-001
  company TEXT NOT NULL CHECK (company IN ('CCW', 'TSI', 'SBL')),

  -- Billing type drives UX template
  billing_type TEXT NOT NULL CHECK (billing_type IN ('milestone', 'per_unit', 'recurring')),

  -- Customer (agency for CCW, buyer for TSI, lessee for SBL)
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_contact TEXT,

  -- Foreign keys (all optional — invoice can exist without a linked record)
  contract_id UUID REFERENCES bus_contracts(id) ON DELETE SET NULL,
  milestone_id UUID REFERENCES bus_contract_milestones(id) ON DELETE SET NULL,
  tsi_unit_ref TEXT,      -- e.g. "VIN: 1FVHG3DV5FHAB1234" for per-unit invoices
  sbl_lease_ref TEXT,     -- e.g. "LEASE-2026-007" for recurring invoices

  -- Line items (JSONB array)
  -- Shape: [{ description: string, quantity: number, unit_price: number, amount: number }]
  line_items JSONB NOT NULL DEFAULT '[]',

  -- Financial totals
  subtotal NUMERIC(15,2) NOT NULL DEFAULT 0,
  tax_rate NUMERIC(5,4) NOT NULL DEFAULT 0,   -- stored as decimal e.g. 0.0875 for 8.75%
  tax_amount NUMERIC(15,2) NOT NULL DEFAULT 0,
  total_amount NUMERIC(15,2) NOT NULL DEFAULT 0,
  paid_amount NUMERIC(15,2) NOT NULL DEFAULT 0,

  -- Status lifecycle
  status TEXT NOT NULL CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'void')) DEFAULT 'draft',

  -- Payment processor (manual for now)
  payment_processor TEXT,       -- null = manual, 'square', 'stripe' (future)
  payment_reference TEXT,       -- check number, wire ref, etc. for manual payments
  payment_recorded_by TEXT,     -- Clerk user ID or name

  -- Dates
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE,
  paid_at TIMESTAMPTZ,

  -- Metadata
  notes TEXT,
  po_number TEXT,               -- purchasing agency PO number (common in transit)
  internal_ref TEXT,            -- CCW job number, TSI stock number, SBL contract number

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: auto-update updated_at
CREATE OR REPLACE FUNCTION bi_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bi_invoices_updated_at
  BEFORE UPDATE ON bi_invoices
  FOR EACH ROW EXECUTE FUNCTION bi_set_updated_at();

-- Index for list queries
CREATE INDEX bi_invoices_company_status ON bi_invoices(company, status);
CREATE INDEX bi_invoices_contract_id ON bi_invoices(contract_id);
CREATE INDEX bi_invoices_issue_date ON bi_invoices(issue_date DESC);

-- RLS
ALTER TABLE bi_invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON bi_invoices FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Payment settings table (used by settings toggle)
CREATE TABLE bi_payment_settings (
  id BIGSERIAL PRIMARY KEY,
  payment_processor TEXT DEFAULT 'manual',  -- 'manual' | 'square' | 'stripe'
  square_location_id TEXT,
  stripe_account_id TEXT,
  default_due_days INTEGER DEFAULT 30,
  invoice_footer_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE bi_payment_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON bi_payment_settings FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Seed one settings row
INSERT INTO bi_payment_settings (payment_processor, default_due_days)
VALUES ('manual', 30);
```

---

## BILLING TYPE SPECIFICATIONS

### CCW — Milestone Billing
- **Trigger:** Milestone completion on a contract
- **Line items template:**
  - Row 1: `{Milestone title}` — quantity: 1 — unit_price: milestone.billing_amount
  - Row 2 (optional): Change order add-ons
  - Row 3 (optional): Retainage release
- **Invoice number:** `CCW-INV-YYYY-NNN`
- **Link:** contract_id + milestone_id (both required)
- **Customer:** contract.agency name
- **Typical amounts:** $200K – $1.4M per invoice

### TSI — Per-Unit (Bus Sales)
- **Trigger:** Bus sale delivery/deposit
- **Line items template:**
  - Row 1: `Bus Sale — {Year} {Make} {Model} VIN: {VIN}` — quantity: 1 — unit_price: sale_price
  - Row 2 (optional): Prep/delivery fee
  - Row 3 (optional): Warranty package
  - Row 4 (optional): Parts/accessories
- **Invoice number:** `TSI-INV-YYYY-NNN`
- **Link:** tsi_unit_ref (VIN string)
- **Customer:** buyer name (transit agency or private)
- **Typical amounts:** $50K – $500K per bus

### SBL — Monthly Recurring
- **Trigger:** Monthly billing cycle
- **Line items template:**
  - Row 1: `Monthly Lease — {Bus description} — {Month YYYY}` — quantity: 1 — unit_price: monthly_rate
  - Row 2 (optional): Fuel/maintenance surcharge
  - Row 3 (optional): Insurance add-on
- **Invoice number:** `SBL-INV-YYYY-NNN`
- **Link:** sbl_lease_ref (lease number string)
- **Customer:** lessee name
- **Typical amounts:** $3K – $15K/month per bus

---

## API ROUTES

### `GET /api/invoices` — List invoices
Query params: `?company=CCW` (required), `?status=all|draft|sent|paid|overdue|void`

Response: `{ invoices: BiInvoice[] }`

### `POST /api/invoices` — Create invoice
Zod schema:
```typescript
const createSchema = z.object({
  company: z.enum(['CCW', 'TSI', 'SBL']),
  billing_type: z.enum(['milestone', 'per_unit', 'recurring']),
  customer_name: z.string().min(1),
  customer_email: z.string().email().optional(),
  customer_contact: z.string().optional(),
  contract_id: z.string().uuid().optional(),
  milestone_id: z.string().uuid().optional(),
  tsi_unit_ref: z.string().optional(),
  sbl_lease_ref: z.string().optional(),
  line_items: z.array(z.object({
    description: z.string().min(1),
    quantity: z.coerce.number().min(0),
    unit_price: z.coerce.number().min(0),
  })).min(1),
  tax_rate: z.coerce.number().min(0).max(100).optional(),
  due_date: z.string().optional(),
  notes: z.string().optional(),
  po_number: z.string().optional(),
  internal_ref: z.string().optional(),
})
```

Logic:
1. Validate with zod
2. Generate invoice_number: query `bi_invoices` for max seq for `{company}-INV-{YEAR}-%`, increment
3. Calculate `amount` per line item = quantity × unit_price
4. Calculate subtotal, tax_amount, total_amount
5. Insert, return `{ invoice }`

### `PATCH /api/invoices/[id]` — Update status / record payment
When `paid_amount >= total_amount`, auto-set `status = 'paid'` and `paid_at = NOW()`.

### `DELETE /api/invoices/[id]` — Void invoice
Soft delete: set `status = 'void'`. Never hard delete.

### `GET /api/invoices/[id]/pdf` — Generate PDF
Uses `@react-pdf/renderer`. Add `export const runtime = 'nodejs'` to the route.

### `POST /api/invoices/[id]/send` — Send email + mark as sent

---

## COMPONENT LIST

### `app/dashboard/invoices/page.tsx` (Server Component)
Fetch `bi_invoices` + `bus_contracts` + `bus_contract_milestones`. Pass to `InvoicesClient`.

### `components/dashboard/InvoicesClient.tsx` (Client Component)
Ported from equipment-rental-engine. Key changes:
- Company filter tabs (CCW / TSI / SBL) above status filter
- Billing-type-aware Create modal (CCW: contract→milestone dropdown, TSI: VIN field, SBL: lease ref field)
- "Record Payment" modal instead of "Mark Paid"
- `po_number` field (important for transit agencies)
- Color-code company: CCW amber-left-border, TSI blue, SBL green

### `lib/types/invoices.ts`
```typescript
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'void'
export type BillingType = 'milestone' | 'per_unit' | 'recurring'
export type InvoiceCompany = 'CCW' | 'TSI' | 'SBL'

export interface BiInvoice {
  id: string
  invoice_number: string
  company: InvoiceCompany
  billing_type: BillingType
  customer_name: string
  customer_email: string | null
  customer_contact: string | null
  contract_id: string | null
  milestone_id: string | null
  tsi_unit_ref: string | null
  sbl_lease_ref: string | null
  line_items: LineItem[]
  subtotal: number
  tax_rate: number
  tax_amount: number
  total_amount: number
  paid_amount: number
  status: InvoiceStatus
  payment_processor: string | null
  payment_reference: string | null
  po_number: string | null
  internal_ref: string | null
  issue_date: string
  due_date: string | null
  paid_at: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface LineItem {
  description: string
  quantity: number
  unit_price: number
  amount: number
}

export interface BiPaymentSettings {
  payment_processor: string
  default_due_days: number
  invoice_footer_text: string | null
}
```

---

## SIDEBAR WIRING

In `components/dashboard/Sidebar.tsx`, add "Invoices" to the Business group for ALL THREE companies:

```typescript
// CCW_GROUPS, TSI_GROUPS, SBL_GROUPS — Business group — add after 'Finance':
{ label: 'Invoices', href: '/dashboard/invoices', icon: Receipt },
```

Import `Receipt` from lucide-react. Pass company as query param on navigation: `/dashboard/invoices?company=CCW`.

---

## PDF GENERATION

`components/pdf/InvoicePDF.tsx` — React component using only `@react-pdf/renderer` primitives (`Document`, `Page`, `View`, `Text`, `StyleSheet`). No shadcn, no Tailwind.

Company header bar colors: CCW `#003087`, TSI `#2563eb`, SBL `#16a34a`

PDF route requires: `export const runtime = 'nodejs'`

---

## DEPENDENCIES

| Dependency | Status |
|---|---|
| `@react-pdf/renderer` | Already in package.json |
| `react-hook-form` | Already in package.json |
| `zod` | Already in package.json |
| `@hookform/resolvers` | Already in package.json |
| `resend` | NOT in package.json — `npm install resend` in MP1 |
| `lucide-react` | Already in package.json |

---

## IMPLEMENTATION STEPS — MICRO-PROMPTS

### MP1: DB Migration + Types + Sidebar (3 files)
1. `supabase/migrations/011_bi_invoices.sql`
2. `lib/types/invoices.ts`
3. `components/dashboard/Sidebar.tsx` — add Invoices nav item + import Receipt

Run migration. `npx tsc --noEmit`. Also: `npm install resend`.

### MP2: API Routes (3 files)
1. `app/api/invoices/route.ts` — GET + POST
2. `app/api/invoices/[id]/route.ts` — PATCH + DELETE
3. `lib/resend.ts` — sendEmail wrapper (stub gracefully if RESEND_API_KEY not set)

`npx tsc --noEmit`.

### MP3: Invoice Page + Client Component (3 files)
1. `app/dashboard/invoices/page.tsx` — Server Component
2. `components/dashboard/InvoicesClient.tsx` — full client with list, AR aging, modals
3. `lib/utils/invoice-helpers.ts` — formatCurrency, formatDate, getInvoiceNumberPrefix, getCompanyColor, buildLineItems

`npx tsc --noEmit`. Load `/dashboard/invoices` in browser.

### MP4: PDF + Send (3 files)
1. `components/pdf/InvoicePDF.tsx`
2. `app/api/invoices/[id]/pdf/route.ts`
3. `app/api/invoices/[id]/send/route.ts`

`npx tsc --noEmit`. Test PDF download + send.

---

## NOTES

- **Company routing:** Pass `?company=CCW` as query param from sidebar nav links. Invoices page reads `searchParams.company` (SSR-compatible).
- **Milestone auto-population:** Add lightweight `/api/invoices/contracts/route.ts` GET in MP2 to fetch contracts + milestones for the Create modal dropdown.
- **Invoice number race condition:** UNIQUE constraint on `invoice_number` is the safety net. Low concurrent volume (B2B ops tool) makes SELECT MAX+1 acceptable.

---

## LOCKED IMPLEMENTATION PROMPT

```
You are building the invoicing system for bus-engine.
Project: C:\Users\bradp\dev\bus-engine
SPEC: C:\Users\bradp\dev\bus-engine\SPEC-invoicing-2026-03-18.md

Stack: Next.js 16 App Router, Supabase (service role client at lib/supabase/server.ts createClient()),
Clerk (middleware already protects /dashboard/**), TypeScript strict, react-hook-form + zod, Tailwind, shadcn/ui.
PDF: @react-pdf/renderer (already installed). Auth: use auth() from @clerk/nextjs/server in API routes.

Key patterns:
- Supabase: import { createClient } from '@/lib/supabase/server'
- No tryAuth() wrapper — use: const { userId } = await auth(); if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
- Table names: bi_invoices, bi_payment_settings (new migration 011)
- All three companies share one bi_invoices table, filtered by company column
- PDF uses @react-pdf/renderer renderToBuffer, NOT pdfkit
- PDF route requires: export const runtime = 'nodejs'

Execute in order. Max 3 files per pass. Stop after each pass and verify npx tsc --noEmit before continuing.

MP1: supabase/migrations/011_bi_invoices.sql + lib/types/invoices.ts + components/dashboard/Sidebar.tsx (also run: npm install resend)
MP2: app/api/invoices/route.ts + app/api/invoices/[id]/route.ts + lib/resend.ts (+ app/api/invoices/contracts/route.ts if milestone dropdown needed)
MP3: app/dashboard/invoices/page.tsx + components/dashboard/InvoicesClient.tsx + lib/utils/invoice-helpers.ts
MP4: components/pdf/InvoicePDF.tsx + app/api/invoices/[id]/pdf/route.ts + app/api/invoices/[id]/send/route.ts

After all 4 MPs pass tsc and build:
- git add relevant files
- git commit -m "feat(invoices): bi_ invoice system — milestone/per-unit/recurring, AR aging, PDF, email send"
- git pull --rebase origin main && git push origin main
- Confirm Vercel deploy triggered
```
