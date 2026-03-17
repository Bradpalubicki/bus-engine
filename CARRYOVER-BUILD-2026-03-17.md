# Bus-Engine Parallel Build Session
## Date: 2026-03-17 | FULL AUTO — NO APPROVALS NEEDED. EVER.

---

## CONTEXT

You are Claude Code, elite full-stack dev for Brad Palubicki (NuStack Digital Ventures). This is a parallel build session for bus-engine. The SPEC is complete with 21 micro-prompts. You will launch 3 worktree agents simultaneously to build the three most important demo pieces tonight, then run MPs 1-9 sequentially on the main branch after.

**Project:** `C:\Users\bradp\dev\bus-engine`
**SPEC:** `C:\Users\bradp\dev\bus-engine\SPEC-complete-rebuild-2026-03-17.md`
**Stack:** Next.js 16 (App Router), Supabase, Clerk, Tailwind, shadcn, TypeScript strict, react-hook-form + zod, Anthropic Claude SDK, Plaid

---

## STEP 1 — READ THE SPEC FIRST

Read the full SPEC at `C:\Users\bradp\dev\bus-engine\SPEC-complete-rebuild-2026-03-17.md` before doing anything. It is the single source of truth. Pay special attention to:
- HEALTH ISSUES FOUND (fix in MP1)
- ARCHITECTURE DECISIONS (three brands, one codebase)
- DATABASE CHANGES (bus_ prefix — ALL tables)
- The RESEARCH UPDATE 2026-03-17 section at the top (new MPs 16-21 added by research pass)
- DO NOT section at the bottom

---

## STEP 2 — LAUNCH 3 PARALLEL WORKTREE AGENTS

Launch all three simultaneously in a single message (do not wait between them). Each agent gets its own git worktree so there are zero merge conflicts.

### AGENT A — Websites (MPs 1-5)
**Worktree branch:** `feat/bus-websites`
**Files owned:** `app/(marketing)/`, `components/marketing/`, `middleware.ts`, `next.config.ts`, `supabase/migrations/001-004`

Prompt for Agent A:
```
You are building the bus-engine project at C:\Users\bradp\dev\bus-engine.
Read the SPEC at SPEC-complete-rebuild-2026-03-17.md.
Execute MICRO-PROMPTS 1 through 5 in order. Stop and verify after each MP with `npx tsc --noEmit`.

MP1: Fix table prefix mismatch (ccw_ → bus_), fix middleware.ts Clerk auth, fix next.config.ts image domains.
MP2: CCW homepage rebuild — CCW.mp4 video hero, StatsBar with counters, 6 service cards, ZEPS spotlight, agency logos, trust bar.
MP3: NavBar + TSI homepage — drone video hero, government blue scheme, inventory search bar in hero.
MP4: ZEPS page (dark cinematic, 6-stage process, cost calculator) + SBL homepage (forest green, lease cards, Olympics credential).
MP5: AI chat widget — Claude-powered "CCW Fleet Advisor" using exact system prompt from SPEC. Mounts on all marketing pages.

After all 5 MPs pass tsc and build: git add, git commit with "feat(bus-engine): cinematic three-brand websites, video heroes, AI chat (MPs 1-5)", do NOT push (worktree merge handled by main session).
```

### AGENT B — Agency Portal (MPs 16-17)
**Worktree branch:** `feat/bus-agency-portal`
**Files owned:** `app/agency/`, `components/agency/`, `supabase/migrations/009_bus_production_agency.sql`

Prompt for Agent B:
```
You are building the bus-engine project at C:\Users\bradp\dev\bus-engine.
Read the SPEC at SPEC-complete-rebuild-2026-03-17.md. Focus ONLY on MPs 16 and 17.

MP16:
- Create supabase/migrations/009_bus_production_agency.sql (bus_production_stages + bus_agency_users tables — exact SQL from spec's Migration 009 section)
- Create app/agency/layout.tsx (simple layout: CCW logo, "Agency Portal" label, user email top-right, sign out. NO dashboard sidebar. Mobile-first.)
- No other files.
- Verify: npx tsc --noEmit → zero errors.

MP17:
- Create app/agency/page.tsx (agency home — bus cards grid with stage badges, alert banner for attention-needed buses)
- Create app/agency/[busId]/page.tsx (bus detail — StageProgressBar, 5 tabs: Activity/Photos/Documents/Change Orders/Messages)
- Create components/agency/StageProgressBar.tsx (8 stage dots with connecting line, dates, completed=checked)
- Create components/agency/BusActivityFeed.tsx (timestamped feed component)
- Add demoAgencyBuses to lib/demo-data.ts (3 buses, different stages as spec shows)
- Verify: npx tsc --noEmit → zero errors. Navigate to /agency → 3 bus cards. Click one → detail with stage bar.

After both MPs: git add, git commit "feat(bus-engine): agency portal — bus production tracker, stage progress, detail view (MPs 16-17)". Do NOT push.
```

### AGENT C — Compliance Hub Page (MP-19)
**Worktree branch:** `feat/bus-compliance-hub`
**Files owned:** `app/(marketing)/ccw/compliance/`, `components/marketing/ComplianceBadge.tsx`, `components/marketing/SAMGovBadge.tsx`

Prompt for Agent C:
```
You are building the bus-engine project at C:\Users\bradp\dev\bus-engine.
Read the SPEC at SPEC-complete-rebuild-2026-03-17.md. Execute MICRO-PROMPT 19 ONLY.

MP19 — CCW Website Compliance Hub:
- Create app/(marketing)/ccw/compliance/page.tsx
- Create components/marketing/ComplianceBadge.tsx
- Create components/marketing/SAMGovBadge.tsx

The compliance page has 7 sections (exact structure in spec MP-19):
1. FTA TVM Status — badge + statement + contact
2. Buy America (49 USC 5323(j)) — citation + plain-English statement + cert request CTA
3. DBE Program (49 CFR 26.49) — goal % placeholder + subcontracting contact
4. ADA / Section 504 (49 CFR Parts 27, 37, 38) — spec: 32" doorway, 30" ramp, 4-point securement
5. CARB Emissions — ZEPS as ICT-compliant, HVIP vouchers mentioned
6. SAMGovBadge — UEI QN7UN15K9NP2, CAGE 1QA89, NAICS 336999/811310/336212/336211, expiry Aug 25 2026
7. Pre-Award & Post-Delivery Support section

Also modify app/(marketing)/page.tsx trust bar to add compliance badges:
"FTA Registered TVM | APTA Member | Buy America Compliant | DBE Program | CARB Certified | SAM.gov Registered"

Design: navy #003087, professional, each section has regulatory citation + plain-English statement + downloadable cert CTA (use a link styled as button — no actual PDF upload needed in this build, just the UI).

Verify: npx tsc --noEmit → zero errors. Navigate to /ccw/compliance → 7 sections render. SAMGovBadge shows correct UEI/CAGE. Mobile responsive at 375px.

After MP19: git add, git commit "feat(bus-engine): FTA compliance hub — Buy America, DBE, ADA, CARB, SAM.gov (MP 19)". Do NOT push.
```

---

## STEP 3 — WHILE AGENTS RUN, BUILD MPs 6-9 SEQUENTIALLY ON MAIN BRANCH

While the 3 agents run in parallel on their worktrees, run MPs 6-9 on the main branch:

**MP6:** Dashboard Command Center + Company Switcher + Work Orders kanban
**MP7:** FleetClient + FinanceClient + PartsClient (REWRITE from stubs)
**MP8:** PipelineClient + Technicians page + Locations page
**MP9:** ZEPS dashboard + Compliance dashboard (4 tabs: Buy America/ADA/CARB/DBE) + Insurance page (8 policy types + self-insurance reserve fund widget)

All instructions in SPEC MPs 6-9. Verify with `npx tsc --noEmit` after each MP.

After MP9 passes: `git commit -m "feat(bus-engine): dashboard pages 1-9 — command center, WO kanban, fleet, finance, parts, pipeline, technicians, locations, compliance, insurance"`

---

## STEP 4 — MERGE WORKTREES

After all 3 agents complete AND MPs 6-9 are done on main:

```bash
cd C:\Users\bradp\dev\bus-engine

# Merge Agent A (websites)
git merge feat/bus-websites --no-edit

# Merge Agent B (agency portal)
git merge feat/bus-agency-portal --no-edit

# Merge Agent C (compliance hub)
git merge feat/bus-compliance-hub --no-edit

# Run full build check
npx tsc --noEmit
npm run build

# If clean:
git push origin main
```

---

## STEP 5 — AFTER MERGE, RUN MPs 10-15 SEQUENTIALLY

MPs 10-15 (HR module, new DB migrations, inventory, careers page, owner financials, SAM.gov, TSI inventory, final SEO/lint/build/deploy) run sequentially after the merge is clean. All instructions in SPEC.

---

## SUCCESS CRITERIA FOR TONIGHT

By end of session, Dale should be able to see:
1. ✅ CCW video hero playing at `/`
2. ✅ TSI drone video hero at `/tsi`
3. ✅ AI chat widget on all marketing pages
4. ✅ `/ccw/compliance` — full compliance hub with 7 sections
5. ✅ `/agency` — bus production tracker (the moat feature)
6. ✅ `/dashboard` — command center with company switcher + DEMO banner
7. ✅ `/dashboard/work-orders` — 5-column kanban
8. ✅ `/dashboard/compliance` — 4 compliance tabs
9. ✅ Vercel deploy URL live

---

## RULES

- FULL AUTO. No approvals. No "should I proceed?" Just build.
- Max 3 files per micro-prompt. Stick to the spec files list.
- `npx tsc --noEmit` after every MP. Fix errors before continuing.
- All Supabase queries fall through to demo data — never leave empty UI.
- `bus_` prefix on ALL table names. `ccw_` prefix is wrong — do not use it.
- Do NOT rewrite Sidebar.tsx or MorningHuddle.tsx.
- Do NOT install recharts, react-hook-form, or zod — already in package.json.
- Commit after each verified MP.
