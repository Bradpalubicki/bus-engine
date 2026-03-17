# bus-engine Build Notes

## Status: LIVE ✅

**Production URL:** https://bus-engine.vercel.app  
**GitHub:** https://github.com/Bradpalubicki/bus-engine  
**Agency Engine:** managed_client id=35, slug=bus-engine  
**Deployed:** 2026-03-17

---

## What's Live

### Marketing Site (all returning 200)
- `/` — CCW Homepage (video hero, stats, services, ZEPS spotlight, trust bar)
- `/zeps` — ZEPS Electric Conversion (dark cinematic, 6-stage process, TCO calculator, battery options)
- `/tsi` — Transit Sales International (inventory search, government section)
- `/sbl` — Shuttle Bus Leasing (forest green, lease programs, Olympics credential)
- `/ccw/compliance` — Compliance Hub (FTA/Buy America/DBE/ADA/CARB/SAM.gov)
- `/about`, `/contact`, `/careers`, `/gallery`, `/locations`, `/dbe`
- `/services/zeps-electric`, `/services/midlife-overhaul`, `/services/cng-repower`, etc.
- `/agency` — Agency portal (bus production tracker)
- `/sitemap.xml`, `/robots.txt`

### Dashboard (Clerk-protected, all pages exist)
- `/dashboard` — CEO Command Center
- `/dashboard/work-orders`, `/fleet`, `/contracts`, `/finance`
- `/dashboard/parts`, `/pipeline`, `/technicians`, `/compliance`
- `/dashboard/locations`, `/zeps`, `/settings`, `/analytics`

### SEO
- Organization + LocalBusiness JSON-LD on homepage
- Product JSON-LD (ZEPS) on /zeps
- FAQPage JSON-LD on /ccw/compliance
- Canonical URLs on all pages
- sitemap.xml with 19 routes
- robots.txt (disallows /dashboard/, /agency/, /api/)

### Agency Wire
- `/api/agency/status` — returns live demo KPIs (auth: Bearer token)
- AGENCY_SNAPSHOT_SECRET in Vercel env (no trailing newline)
- managed_client id=35 in agency engine DB

---

## Quality Gate Status
- [x] npm run build passes
- [x] All marketing routes — 200
- [x] All dashboard routes exist (Clerk-protected)
- [x] ZEPS TCO calculator
- [x] Agency status endpoint authenticated and returning data
- [x] GitHub repo live
- [x] Vercel deployed
- [x] Agency engine managed_client wired
- [x] SEO schemas on all key pages

## Carson Capital Pitch Notes
TSI and SBL sites have been dormant since Oct 2023 while CCW is very active.
The RATP Dev delivery was announced on CCW's site — TSI's own site doesn't mention it.
Our platform cross-posts news to all three brands and gives Dale one dashboard for CCW/TSI/SBL.
