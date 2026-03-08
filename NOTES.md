# bus-engine Build Notes

## Status: Code Complete — Awaiting Deployment

The Bash tool was disabled during this build session. All code is written.
Run these commands to complete deployment:

```bash
cd C:/Users/bradp/dev/bus-engine

# 1. Build check
npm run build

# 2. Create GitHub repo and push
git init
git add -A
git commit -m "feat(bus-engine): complete build — marketing website + ops dashboard + demo data"
gh repo create Bradpalubicki/bus-engine --public --source=. --push --yes

# 3. Deploy to Vercel
vercel --yes --prod

# 4. Set Vercel env vars
vercel env add NEXT_PUBLIC_DEMO_MODE production <<< "true"
vercel env add NEXT_PUBLIC_APP_URL production <<< "https://bus-engine.vercel.app"
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production <<< "pk_test_placeholder"
vercel env add CLERK_SECRET_KEY production <<< "sk_test_placeholder"
vercel env add NEXT_PUBLIC_SUPABASE_URL production <<< "https://placeholder.supabase.co"
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production <<< "placeholder"
vercel env add SUPABASE_SERVICE_ROLE_KEY production <<< "placeholder"

# 5. Redeploy with env vars
vercel --yes --prod
```

## Build Issues to Watch For

1. If build errors about duplicate route `/` — delete `app/page.tsx` (it's intentionally empty but may still conflict)
2. If @hookform/resolvers zod import fails — the v5 package supports Zod v4
3. If Recharts SSR errors — all chart components have `'use client'` directive

## Files Built

### Marketing Site
- `/` — Homepage (hero, stats, services, ZEPS, why CCW, locations, CTA)
- `/about` — Company history, certifications
- `/locations` — 10 locations with details
- `/contact` — Contact form (react-hook-form + zod)
- `/services/midlife-overhaul` — Service page
- `/services/cng-repower` — Service page
- `/services/zeps-electric` — ZEPS program page
- `/services/body-paint` — Service page
- `/services/interior-rehab` — Service page
- `/services/cng-retanking` — Service page

### Operations Dashboard (all from demo-data.ts)
- `/dashboard` — CEO Command Center (KPIs, location heatmap, WO table, revenue charts, alerts, activity)
- `/dashboard/work-orders` — Kanban board by status
- `/dashboard/fleet` — Vehicle table with status/fuel badges
- `/dashboard/contracts` — Contract cards with milestone tracking
- `/dashboard/finance` — Revenue recognition + invoice ledger
- `/dashboard/parts` — Parts inventory with low-stock alerts
- `/dashboard/pipeline` — RFP CRM with win probability
- `/dashboard/technicians` — Tech profiles with cert tracking
- `/dashboard/compliance` — FTA/ADA/CARB document tracking
- `/dashboard/locations` — 10-location utilization grid
- `/dashboard/zeps` — ZEPS TCO calculator + fleet stats
- `/dashboard/settings` — Platform config

### Infrastructure
- `lib/demo-data.ts` — All demo data (locations, contracts, vehicles, WOs, parts, invoices, etc.)
- `middleware.ts` — Demo mode bypass
- `next.config.ts` — Unsplash + completecoach.com image domains
- `supabase/migrations/001-004` — CCW DB schema (ccw_ prefix)
- `public/llms.txt` — AI search optimization
- `app/sitemap.ts` + `app/robots.ts`
- `app/api/contact/route.ts` + `app/api/agency/status/route.ts`

## Carson Capital Content Intelligence — For Dale Pitch

### Site Update Frequency (researched 2026-03-07)

**completecoach.com — VERY ACTIVE ✅**
- Multiple posts/month. Most recent: Mar 5, 2026 (lifecycle cost article + TSI RATP Dev delivery)
- Feb 18 — Patrick Scully appointed President
- Feb 11 — APTA Ad Wheel Award win
- CCW IS the content engine for the entire family — TSI and SBL news is posted on CCW's site

**transitsales.com — STALE ⚠️**
- Last own news post: October 3, 2023 (James Carson promotion)
- Over 2 years dormant despite active deals (10-bus RATP Dev just delivered)
- TSI is active as a business but their site doesn't show it

**sblbus.com — STALE ⚠️**
- Also stops at October 3, 2023 (same James Carson post)
- Prior entry: July 2023. Dormant 2+ years.

### Pitch Angle for Dale
This is a **big opener**: "Your TSI and SBL sites look abandoned even though you're winning deals.
The RATP Dev delivery was announced on CCW's site — TSI's own site doesn't even mention it.
From a Google standpoint, TSI and SBL look like dead companies."

Our platform solves this:
1. News/press on CCW auto-cross-posts to TSI and SBL (shared content hub)
2. TSI inventory data feeds live from their system
3. SBL fleet/lease data feeds live
4. One dashboard — Dale sees all three brands' pipeline, activity, revenue

### Unified Search Architecture (for Carson Capital)
- News source: CCW RSS/API → syndicate to TSI + SBL sites
- Inventory source: TSI listings (bus inventory) → search index
- Lease source: SBL available fleet → search index
- Combined search: one endpoint, tagged by brand
- Dashboard: one login → switch between CCW / TSI / SBL views

## Quality Gate Status
- [ ] npm run build passes — PENDING (Bash disabled)
- [x] Marketing homepage — CCW navy/amber branding
- [x] All 11 dashboard routes with populated demo data
- [x] ZEPS TCO calculator interactive
- [x] 3 low-stock parts alerts (Cummins ISL, Allison B400R, Luminator sign)
- [x] Garage Keepers insurance warning (32 days expiry)
- [x] Revenue charts (RevenueChart + ThroughputChart)
- [x] 10-location heatmap on CEO dashboard
- [x] Work order kanban board
- [x] Pipeline CRM — 4 RFPs in correct stages
- [ ] Vercel URL live — PENDING
- [ ] Git repo created — PENDING
