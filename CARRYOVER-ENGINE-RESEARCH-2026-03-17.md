# Bus-Engine Research Session — NuStack Digital Ventures
## Full carryover context + engine upgrade research prompt
## Date: 2026-03-17 | No approvals needed — full auto

---

## WHO YOU ARE

Elite full-stack dev and product researcher working with Brad Palubicki (President, NuStack Digital Ventures). Brad thinks big picture — you handle ALL implementation and research. You have built 50+ projects together.

**Stack:** Next.js 16 (App Router), Supabase (PostgreSQL + RLS), Clerk (auth), Vercel (hosting), Tailwind + shadcn/ui, TypeScript strict, react-hook-form + zod, Resend (email), Twilio (SMS), Anthropic Claude SDK.

**FULL AUTO — NO APPROVALS NEEDED. EVER.** Brad has approved every tool call in 50+ projects. Do not ask "should I proceed?" Just do it. The only 4 things that require a stop: (1) spending real money, (2) OAuth/2FA needed physically, (3) DROP TABLE on production, (4) sending external comms to real clients.

---

## WHAT THIS SESSION MUST DO

Run the full 9-section ENGINE-UPGRADE-RESEARCH output for the bus-engine vertical, then update the existing SPEC file with every gap found. Output must be saved to files — not just printed. This session ends with an updated SPEC and a written research log entry.

### The two deliverables:
1. **`C:\Users\bradp\dev\bus-engine\ENGINE-RESEARCH-bus-engine-2026-03-17.md`** — full 9-section research output
2. **`C:\Users\bradp\dev\bus-engine\SPEC-complete-rebuild-2026-03-17.md`** — updated with any P1/P2 gaps from research that are missing from the current spec

---

## PROJECT CONTEXT — READ THIS BEFORE RESEARCHING

### The Client: Dale Carson / Complete Coach Works Family

Dale Carson is Brad's neighbor. He owns three transit bus companies under one roof:

**1. Complete Coach Works (CCW)** — `completecoach.com`
- North America's LARGEST transit bus refurbishment company (their claim)
- $102M/year revenue | ~$15M net income | 350 employees | Est. 1987 | Riverside, CA
- 100% Employee-Owned (ESOP) — Dale sold the company to the employees. The company owes Dale ~$22M on an ESOP loan.
- Services: Midlife refurbishment (~$300-400K/bus, half cost of new), CNG engine repower (CARB-certified Cummins L9N), ZEPS electric conversion (proprietary — 70+ done, 4M miles, ~$580K vs $830K OEM new EV), body/paint, interior rehab, collision repair, CNG retanking
- Key clients: TriMet (OR), IndyGo (IN), OCTA (CA), Foothill Transit (CA), SF Muni (CA), AVTA (CA), Mountain Line (CO), Twin Transit (WA), McAllen TX, Fresno CA
- Federal ID: UEI `QN7UN15K9NP2` | CAGE `1QA89` | SAM registration expires Aug 25, 2026
- Primary NAICS: 336999 (Transportation Equipment Manufacturing), also 811310, 336212, 336211
- Patrick Scully = CEO/President. Dale's son James Carson runs operations.

**2. Transit Sales International (TSI)** — `transitsales.com`
- Used transit buses for sale — claims "1,000+ makes and models"
- All fuel types: diesel, CNG, hybrid, electric, hydrogen, propane
- 30–60ft buses | 60-day accelerated delivery program
- Services: training, technical support, updated manuals for purchased buses
- Government procurement focus: statewide contracts, FTA compliance, DBE documentation

**3. Shuttle Bus Leasing (SBL)** — `sblbus.com`
- Transit bus leasing: Seasonal, Gap (bridge while waiting for new delivery), Contract, Employee Shuttle
- Lease-to-own available
- Official bus supplier: 2002 Salt Lake City Winter Olympics + 2010 Vancouver Winter Olympics
- 1,000+ bus inventory
- Maintenance programs bundled with leases

**Shared details — all three companies:**
- Address: 1863 Service Court, Riverside, CA 92507
- Phone: (800) 300-3751 / (800) BUS-SALES
- Same Divi developer manages all three WordPress sites (being replaced)
- All three: Divi 4.27.6 + WooCommerce (dead) + WordPress

### Current Website Audit Scores (pre-rebuild)
| Site | Score | Critical Issue |
|---|---|---|
| completecoach.com | 48/100 | Divi JS makes content invisible to Google |
| transitsales.com | 52/100 | Yoast misconfigured, stale 2019 inventory, no pricing |
| sblbus.com | 41/100 | 17-month stale blog, "Prison Transports" in nav, copyright 2022 |

### Media Assets Harvested
- **CCW hero video:** `https://completecoach.com/wp-content/uploads/2024/04/CCW.mp4` — facility footage
- **TSI DRONE VIDEO (the wow):** `https://transitsales.com/wp-content/uploads/2018/12/Murrieta-Bus-Yard-Drone-Video1.mp4` — aerial flyover of Murrieta bus yard with American flag, 1,000+ buses visible
- 243+ images across all three sites (harvested, SEO-labeled)
- Key people: Patrick Scully (CEO), James Carson (ops), Jay Raber, Shah Remtula, Mark Hollenbeck

---

## WHAT'S ALREADY BEEN SPEC'D (do not re-research these)

The SPEC at `C:\Users\bradp\dev\bus-engine\SPEC-complete-rebuild-2026-03-17.md` already covers:

### Three Cinematic Websites (fully spec'd)
- CCW homepage: CCW.mp4 video hero, animated stats, 6 service cards, ZEPS spotlight, agency logos, AI chat
- TSI homepage: Drone video hero (the wow), inventory-first layout, govt procurement section
- SBL homepage: Forest green, lease type cards, Olympics credential
- ZEPS dedicated page: Dark cinematic, 6-stage process animation, interactive cost calculator
- Public careers page: `/careers` with job listings + application form + resume upload
- SEO: metadata, schema markup (Organization JSON-LD), keyword strategy per page
- AI chat: Claude-powered "CCW Fleet Advisor" on all 3 sites, B2G-aware, B2B system prompt

### Dashboard (fully spec'd)
- 15 micro-prompts already written
- Company switcher: CCW / TSI / SBL tabs + amber DEMO banner
- Command Center: 4 KPIs (Buses in Production, Contract Backlog, Overdue Invoices, Parts Alerts)
- Work Orders: 5-column kanban (draggable)
- Fleet: vehicle table with status badges
- Parts: inventory table with low-stock alerts
- Pipeline: RFP CRM kanban (Opportunity → Proposal → Submitted → Awarded)
- Contracts: active contract cards with burn rates
- Technicians: tech roster with cert expiry tracking
- Locations: 10-location utilization grid
- Compliance: Buy America / ADA / CARB / DBE tabs
- ZEPS: conversion queue, battery inventory
- Insurance: 8 coverage types, self-insurance reserve fund widget
- **HR module**: Job postings CRUD, application review, policy library, vendor management
- **Owner Financials** (Dale-only): P&L, balance sheet, ESOP $22M loan tracker, Sage Intacct scaffold
- **SAM.gov Federal Contracts**: UEI wired, opportunity feed, registration expiry alert
- **Inventory Management**: Add/edit/mark sold/leased buses directly from dashboard — public site auto-updates
- **Website Performance**: SEO health scores for all 3 sites, fix tracker, GSC scaffold

### DB Tables Already Spec'd (bus_ prefix)
001: bus_agencies, bus_contracts, bus_milestones
002: bus_locations, bus_vehicles, bus_work_orders
003: bus_technicians, bus_parts, bus_part_usage
004: bus_invoices, bus_insurance_policies, bus_compliance_docs, bus_rfp_pipeline
005: bus_job_postings, bus_applications, bus_policies, bus_vendors
006: bus_financials_snapshot, bus_sage_config
007: bus_sam_opportunities
008: bus_inventory (TSI/SBL listings — public RLS)

---

## WHAT THE RESEARCH MUST FIND

You are running the ENGINE-UPGRADE-RESEARCH-PROMPT for this engine. The variables are:

```
ENGINE:     bus-engine
VERTICAL:   transit-bus-manufacturing (B2G — government transit procurement)
CLIENT:     Complete Coach Works / Transit Sales International / Shuttle Bus Leasing (Dale Carson)
FOCUS AREA: all gaps — website conversion for B2G procurement, dashboard competition against transit fleet software, agency transit portal, mobile operator view, AI for transit/B2G
```

This is a B2G (business-to-government) vertical. CCW's customers are:
- Transit agency fleet managers and procurement officers (for CCW refurb/ZEPS)
- Transit agency procurement officers (for TSI bus purchases)
- Transit agency fleet managers, universities, airports, ski resorts (for SBL leases)

The "end customer" portal in this vertical is NOT a consumer portal — it's an **agency-facing portal** where transit agency fleet managers can track their buses in production at CCW, view delivery status, see compliance docs, and request quotes.

---

## THE RESEARCH TASK

Run ALL 9 sections below in full. Do not skip or abbreviate. Save output to `C:\Users\bradp\dev\bus-engine\ENGINE-RESEARCH-bus-engine-2026-03-17.md` as you go.

---

### SECTION 1: Competitive Landscape — Transit Bus Website + Software

Research the companies CCW, TSI, and SBL compete against — both on website conversion AND on software/dashboard. Two sub-tasks:

**1A: Website competitors (what sites do transit agencies compare CCW against before calling?)**
Find 3-5 transit bus refurbishment / used bus sales / bus leasing company websites. For each:
1. Company name + URL
2. What they do (refurb / sales / lease)
3. What their website does well that ours doesn't have yet
4. Key pages or tools on their site (fleet calculators? compliance doc downloads? procurement guides?)
5. Their content strategy (blog? case studies? white papers?)
6. What's missing that we can own

Target companies to research (search these):
- Motor Coach Industries (MCI)
- ABC Companies (bus sales/leasing)
- National Bus Sales & Leasing
- Creative Bus Sales
- First Transit / FirstGroup
- Transdev
- Gillig (manufacturer — what does their site do for fleets?)
- New Flyer / NFI Group
- RATP Dev (CCW did work for them — what does RATP's site look like?)
- Search: "transit bus refurbishment company website" and "used transit buses for sale"

**1B: Dashboard/software competitors (what do transit fleet managers use today?)**
Find the top transit fleet management / maintenance software platforms. For each:
1. Platform name + URL
2. Pricing (if public)
3. Their top 3 features
4. Top 3 complaints (G2/Capterra)
5. Client portal — do they have one? What's in it?
6. Mobile app — does it exist?
7. One thing they do that's genuinely impressive

Target platforms: AssetWorks, Trapeze Group, Dossier Fleet Management, Samsara (transit fleet), Fleetio, RTA Fleet Management, ManagerPlus, Chevin Fleet Solutions, Decisiv

---

### SECTION 2: Best-in-Class UX for B2G Transit Websites

Research what the BEST B2G procurement-focused websites do in 2025-2026:

1. **B2G procurement conversion UX** — what elements do government procurement officers need to see before they'll make contact? (compliance docs? certifications? past performance? pricing signals?)
2. **Technical specification presentation** — how do the best sites present specs for complex equipment (buses, military equipment, industrial equipment)?
3. **Case study / past performance format** — what does a compelling B2G case study look like? Length, structure, data points required?
4. **Government compliance page** — what does a winning FTA/Buy America/DBE compliance page include?
5. **Interactive tools** — do B2G sites use ROI calculators, fleet assessment tools, spec configurators? Who does it well?
6. **Social proof for government buyers** — what certifications, contract vehicles, agency logos, and testimonials convert government procurement?
7. **Content strategy** — what content types (white papers, technical briefs, NAICS lookup tools) do the best B2G sites publish?

---

### SECTION 3: The Unified Record — Transit Bus in Production

In this vertical, the atomic record is a **bus in production** at CCW's facility. Research what the best fleet maintenance / bus production tracking systems attach to a vehicle record:

1. What is the equivalent record in AssetWorks or Trapeze? (what's it called, what fields does it have?)
2. What attaches to a bus record in the best implementations?
   (work orders, compliance certs, photos, parts used, technician log, agency contact, FTA paperwork, delivery milestone, invoices)
3. How do the best platforms present a vehicle record on mobile? (for CCW techs on the shop floor)
4. What's the timeline/activity feed pattern for a bus going through a 6-month refurbishment?
5. What fields are always present vs optional in transit fleet software?
6. What does the AGENCY see about their bus while it's at CCW? (this is the portal question)

---

### SECTION 4: Agency Portal Standards

In this vertical, "the client portal" is not a consumer portal — it's an **agency-facing portal** where transit agency procurement officers and fleet managers track their buses while in production at CCW.

Research:
1. Do any transit fleet software platforms offer an agency/customer-facing portal? What's in it?
2. What do transit agency fleet managers say they want when they send buses out for major refurbishment? (search forums, LinkedIn, transit association content)
3. What is the standard auth model for B2B portals serving government agencies? (SSO? magic link? dedicated login?)
4. What pages/views would a transit agency fleet manager actually use? (delivery tracking, compliance docs, photos, invoices, contact their CCW rep)
5. What re-engagement looks like for B2G — these aren't daily users, they're project-based
6. What would make a transit agency choose CCW over a competitor specifically because of the portal?

---

### SECTION 5: AI Agents for B2G Transit

Research AI features standard or emerging in transit fleet management and B2G manufacturing:

1. What AI features do AssetWorks, Trapeze, Dossier, Fleetio already ship?
2. What AI agents would be high-value for CCW specifically?
   - RFP response assistant (draft technical proposal from CCW's past performance)
   - Parts failure prediction (flag buses likely to need unscheduled parts based on work order history)
   - Compliance gap detector (flag buses with missing certs before delivery)
   - Quote generator (fleet manager inputs fleet size/age/fuel type → generates refurb cost estimate)
3. What AI features do transit agencies actually want vs what vendors push?
4. What would be a genuine WOW AI demo for Dale to show a transit agency procurement officer?
5. What's the "pending approval" pattern for AI in B2G contexts (government buyers are risk-averse)?

---

### SECTION 6: Mobile Patterns for Transit Maintenance

Research mobile UX for bus manufacturing/fleet maintenance operations:

1. Do AssetWorks, Trapeze, Dossier, Fleetio have dedicated mobile apps? What do they include?
2. What are the 3 most common mobile tasks for a CCW floor technician? (update WO status, log parts used, scan VIN, photo the bus, view assigned WOs)
3. What are the 3 most common mobile tasks for a CCW project manager or location manager?
4. What are the 3 most common mobile tasks for a transit agency fleet manager checking on their buses remotely?
5. Bottom nav vs sidebar for fleet maintenance mobile — what's the industry standard?
6. What push notification types would be high-value in this context? (bus ready for delivery, compliance cert expiring, invoice issued, work order overdue)

---

### SECTION 7: NuStack Gap Analysis — What's Missing from the Current Spec

Compare the current spec (summarized above in "WHAT'S ALREADY BEEN SPEC'D") against best-in-class findings from Sections 1-6. Flag every gap.

Format:
| Feature | Best-in-Class Has It | Current Spec Has It | Gap Priority |
|---|---|---|---|
| ... | ✅/❌ | ✅/❌/⚠️ partial | P1/P2/P3/Defer |

Then:
- **P1 gaps** (missing from the website or dashboard that would cost a deal or lose a bid)
- **P2 gaps** (meaningful additions, build in first 30 days after launch)
- **P3 gaps** (Layer 2 — need data to be valuable, defer 90 days)
- **SKIP** (researched but not worth building for this client)

The most important P1 question: **What do competitor websites have that would make a transit agency procurement officer choose them over the new CCW/TSI/SBL sites?**

---

### SECTION 8: Legal/Compliance Flags for B2G Transit

| Requirement | Applies To | What It Means for the Build |
|---|---|---|
| Buy America (FTA) | All FTA-funded bus work | Compliance page + certification doc downloads |
| DBE Program | CCW as contractor | DBE percentage tracking, certification display |
| ADA / Section 504 | All transit vehicles | Compliance certification on each bus |
| CARB Emissions | CCW CNG/ZEPS work | CARB cert display |
| SAM.gov registration | CCW federal work | Already in spec — expiry Aug 25 2026 |
| A2P 10DLC | Twilio SMS | SMS opt-in consent before any SMS to agency contacts |
| FTA Pre-Award / Post-Delivery Reviews | CCW contracts | Two-phase compliance process per contract |
| Prevailing Wage (Davis-Bacon) | Govt-funded contracts | Labor cost tracking per contract |
| Small Business Certifications | TSI/SBL set-aside bids | Certification display and tracking |

Research any additional compliance requirements specific to bus refurbishment, used bus sales, or bus leasing that we may have missed. Especially: California-specific regulations, fleet disposal requirements, title/lien handling for used bus sales.

---

### SECTION 9: Research-Build Handoff Block

After completing Sections 1-8, produce the Section 9 output:

#### 9A — DECISIONS ALREADY MADE
(What the research confirmed — lock these so /research-build doesn't re-research)

#### 9B — COMPLIANCE REQUIREMENTS BAKED IN
(Every HIGH/MEDIUM flag from Section 8 → specific DB column or UI requirement)

#### 9C — OPEN DECISIONS
(What /research-build must still resolve — technical unknowns, file paths, migration watermarks)

#### 9D — PRELIMINARY MICRO-PROMPT SKETCH FOR GAPS
(For any P1 gaps found — rough MP breakdown. Current spec already has MPs 1-15 for the known scope. New MPs are additive.)

#### 9E — SPEC UPDATE INSTRUCTIONS
Specific instructions for what to ADD to `SPEC-complete-rebuild-2026-03-17.md` based on the research.
Format: "Add to micro-prompt N: [what to add]" or "Add new micro-prompt 16: [what to build]"

---

## AFTER RESEARCH IS COMPLETE — UPDATE THE SPEC

After all 9 sections are written and saved to `ENGINE-RESEARCH-bus-engine-2026-03-17.md`:

1. Read `C:\Users\bradp\dev\bus-engine\SPEC-complete-rebuild-2026-03-17.md`
2. For every P1 gap identified in Section 7 that is not already in the spec:
   - Add the feature to the appropriate section (DATABASE CHANGES, FILE MANIFEST, MICRO-PROMPTS)
   - If it's a website gap: add to the relevant marketing page micro-prompt
   - If it's a dashboard gap: add as a new micro-prompt or extend an existing one
   - If it requires a new DB table: add migration SQL
3. Save the updated spec (overwrite the file)
4. Write a summary of what was added at the top of the spec under "## RESEARCH UPDATE 2026-03-17"

---

## AFTER SPEC IS UPDATED — LOG THE RESEARCH

Add a row to `C:\Users\bradp\.claude\skills\research-build\ENGINE-RESEARCH-LOG.md`:

```
| bus-engine | transit-bus-manufacturing | 2026-03-17 | all gaps | C:\Users\bradp\dev\bus-engine\ENGINE-RESEARCH-bus-engine-2026-03-17.md | Complete |
```

If ENGINE-RESEARCH-LOG.md doesn't exist yet, create it with a header row first.

---

## RULES FOR THIS SESSION

- **No approvals.** Run all web searches, read all files, write all output files without asking.
- **Save as you go.** Write findings to the research output file in sections as they complete — don't wait until everything is done.
- **Be specific.** Exact feature names, exact platform names, exact URLs. No "some platforms do X."
- **Flag WOW lines** with ⭐ — things that would make Dale say "I didn't know software could do that"
- **Flag anti-patterns** with ⚠️ — things competitors do that we should explicitly NOT copy
- **The P1 test:** Would a transit agency procurement officer choose a competitor over CCW/TSI/SBL because of this missing feature? If yes → P1.
- **The website P1 test:** Is there a page, tool, or content type on a competitor site that would cause a procurement officer to stay on that site instead of calling CCW? If yes → must be in spec.
- **Layer discipline:** Features that need 90+ days of data → Layer 2, not Day 1.
- **Do not re-research** what's already in the spec (listed above). Jump to gaps only.
- **The goal:** An updated SPEC that Brad can hand to `/build-from-spec` in a fresh session with confidence that nothing important is missing.

---

## START NOW

Begin with Section 1 (competitive landscape). Use WebSearch and WebFetch tools in parallel where possible to maximize speed. Save Section 1 findings to the research file before starting Section 2. Continue through all 9 sections without stopping.

After Section 9, update the SPEC file, then log the research. Report what was added to the spec at the end.
