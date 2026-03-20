# CCW Operations Dashboard — Competitive Analysis
# Complete Coach Works vs. Bus Fleet Software Market
# Generated: 2026-03-17

---

## EXECUTIVE SUMMARY

The bus fleet management software market has a critical blind spot: **it only serves operators, never vendors.**

Every platform (Trapeze, AssetWorks, Fleetio, Samsara) is built for transit agencies managing their own fleets. **Nobody builds for remanufacturers** — companies like CCW that work on buses for 60–180 days then hand them back.

This is CCW's moat. Transit agencies have $3M–$8M contracts with CCW and track project status via phone calls and email. The vendor portal that doesn't exist yet IS the product.

---

## MARKET MAP

```
ENTERPRISE TIER ($10K+/mo)          MID-MARKET TIER ($500–$3K/mo)       SMB TIER ($20–$200/mo)
────────────────────────────────    ──────────────────────────────────   ────────────────────────
Trapeze Fleet                       Cetaris Fleet                        Fleetio ($4–10/bus/mo)
 → 100+ bus agencies                 → AI predictive maintenance          → Modern UI, best UX
 → Legacy UI, slow innovation        → Warranty automation                → Shop portal (shops only)
 → No vendor portal                  → Cloud-native                       → No telematics (extra $)
 → 12-24mo implementation            → No vendor portal                   → QuickBooks/Xero ✅

AssetWorks FleetFocus               RTA Fleet Management
 → SFMTA, Chapel Hill Transit        → #1 public sector fleet
 → À la carte pricing (expensive)    → Legacy UI, govt only
 → Legacy Windows UI                 → No mobile, no vendor portal
 → No vendor portal

                                                                         DVIR-ONLY TOOLS
                                                                         Whip Around ($10/bus)
                                                                          → Best mobile DVIR
                                                                          → Photo + voice-to-text
                                                                          → NOT full fleet mgmt

                                    TELEMATICS
                                    Samsara ($40–60/bus/mo)
                                     → GPS + DVIR + dash cams
                                     → Predatory contracts ⚠️
                                     → Billing fraud complaints ⚠️

                                    Motive ($25/bus + hardware)
                                     → Cheapest ELD
                                     → Contract traps ⚠️
                                     → Support collapsed ⚠️
```

**WHITE SPACE: Vendor/Supplier Dashboards — $0 solutions exist today.**

---

## HEAD-TO-HEAD: CCW DASHBOARD vs. EACH COMPETITOR

### vs. Fleetio (closest SaaS competitor)

| Feature | Fleetio | CCW Dashboard |
|---|---|---|
| Work order management | ✅ | ✅ (exists) |
| Mobile inspections + DVIR | ✅ | ⚠️ (no photo capture yet) |
| Parts consumption on WOs | ✅ | ❌ (table exists, not wired) |
| Labor cost tracking | ✅ | ❌ (timer exists, not calculated) |
| PM scheduling + auto-WO | ✅ | ❌ (not built yet) |
| Accounting (QuickBooks) | ✅ | ❌ (Phase 2) |
| Vehicle lifetime history | ✅ | ❌ (not built yet) |
| Modern SaaS UI | ✅ Best-in-class | ✅ CCW is competitive |
| Vendor/customer portal | ✅ (shops only) | ❌ (agency portal planned) |
| **Multi-brand (3 businesses)** | ❌ | ✅ CCW only |
| **Remanufacturing workflow** | ❌ | ✅ CCW only |
| **FTA/CARB/ADA compliance docs** | ❌ | ✅ (exists, needs photos/upload) |
| **Government contract P&L** | ❌ | ✅ CCW only |
| **Pricing** | $4–10/bus/mo (external) | Internal tool (CCW owns it) |

**Gap to close:** Photo capture on inspections, parts-to-WO linkage, labor cost, PM scheduler.
**CCW advantage:** The entire remanufacturing business model; Fleetio can't replicate.

---

### vs. Trapeze Fleet (enterprise incumbent at transit agencies)

| Feature | Trapeze | CCW Dashboard |
|---|---|---|
| PM scheduling | ✅ | ❌ (building) |
| Work orders | ✅ | ✅ |
| Predictive maintenance | ✅ | ❌ (Layer 2) |
| Modern UI | ❌ (legacy) | ✅ CCW wins |
| Mobile app | ✅ (limited) | ❌ (web only now) |
| Vendor/supplier portal | ❌ | ✅ CCW building |
| Implementation time | 12–24 months | Already built |
| Cost | $10K+/mo | CCW owns it |

**CCW advantage:** Trapeze serves the agency, not the vendor. CCW can ship what Trapeze fundamentally cannot.

---

### vs. Samsara (telematics leader)

| Feature | Samsara | CCW Dashboard |
|---|---|---|
| GPS tracking | ✅ | ❌ (buses are stationary in shop) |
| AI DVIR | ✅ | ❌ (building) |
| Dash cams | ✅ | ❌ (not relevant for shop) |
| Modern UI | ✅ | ✅ |
| Contract trap | ⚠️ 3–5yr required | N/A (internal tool) |
| Billing complaints | ⚠️ Major pattern | N/A |
| Cost | $40–60/bus/mo | CCW owns it |

**Why Samsara is irrelevant:** GPS telematics for moving vehicles. CCW buses are stationary during rebuild. Samsara would charge $40–60/bus/month to track buses that don't move.

---

### vs. Whip Around (best DVIR app)

| Feature | Whip Around | CCW Dashboard |
|---|---|---|
| Mobile DVIR | ✅ Best-in-class | ⚠️ (no photo capture yet) |
| Photo per failed item | ✅ | ❌ (building) |
| Voice-to-text notes | ✅ | ❌ |
| Work order management | ✅ | ✅ (more complete) |
| Parts inventory | ⚠️ | ✅ |
| Contracts + financials | ❌ | ✅ |
| Multi-brand support | ❌ | ✅ |
| Cost | $10/bus/mo | Internal |

**Gap to close:** Photo capture on inspections. One micro-prompt closes this.

---

## FEATURE PRIORITY MATRIX (BASED ON COMPETITIVE GAPS)

### MUST HAVE (table stakes — competitors have these)

| Feature | Missing From CCW? | Priority | Competitive Benchmark |
|---|---|---|---|
| Photo capture on inspections | YES | P1 🔴 | Whip Around, Samsara, Fleetio |
| Parts consumption on work orders | YES | P1 🔴 | Fleetio, Dossier, RTA |
| Labor cost on work orders | YES | P1 🔴 | Fleetio, RTA, Cetaris |
| PM scheduling + auto-WO | YES | P1 🔴 | Fleetio, RTA, Trapeze, Cetaris |
| Vehicle lifetime history | YES | P2 🟡 | Fleetio, AssetWorks |
| Accounting integration (QB) | YES | P2 🟡 | Fleetio (QB/Xero) |

### UNIQUE DIFFERENTIATORS (CCW can own these)

| Feature | Status in Market | Priority | CCW Opportunity |
|---|---|---|---|
| Agency vendor portal | ZERO competitors | P1 🔴 | Build /portal/[agencySlug] |
| Multi-brand dashboard (CCW/TSI/SBL) | ZERO competitors | P2 🟡 | Sidebar switcher (exists, needs full nav) |
| FTA/CARB/ADA compliance doc workflow | ZERO competitors | P2 🟡 | /dashboard/compliance (exists, needs upload) |
| Government contract P&L | ZERO competitors | P2 🟡 | /dashboard/contracts (exists) |
| Remanufacturing project lifecycle | ZERO competitors | P1 🔴 | Core WO + fleet workflow |

---

## CCW POSITIONING STATEMENT

**For transit agencies** managing bus remanufacturing contracts:

> "CCW is the only remanufacturing partner that gives your team live project visibility — status, photos, compliance docs, delivery ETAs — all in one portal. No phone calls. No email threads. Just a link."

**For CCW operations:**

> "Every competitor you'd consider buying was built for the agency side. CCW runs the shop. This dashboard was built for you."

---

## PRICING POSITION

CCW is not selling this software — they're using it internally.
But the agency portal IS a competitive differentiator that justifies contract wins.

**The business case for building it:**
- Trapeze (agency incumbent) has no vendor portal → agencies that use Trapeze still need to communicate with CCW manually
- A CCW portal that integrates with agency workflow = switching cost for the agency (they'd lose visibility if they switched vendors)
- Goal: Make CCW's portal so useful that agencies request CCW over competitors specifically because of it

---

## REVENUE MODEL (IF CCW EVER PRODUCTIZES THIS)

If NuStack ever wanted to turn bus-engine into a product:

| Tier | Price | Target |
|---|---|---|
| Remanufacturer Dashboard | $2,500/mo | Bus remanufacturers (5–10 in the US) |
| Agency Vendor Portal | $500/agency/mo | Transit agencies wanting vendor visibility |
| TSI Sales Module | $750/mo | Pre-owned bus dealers |
| SBL Leasing Module | $1,000/mo | Bus leasing companies |

**TAM:** ~50 bus remanufacturers and 600+ transit agencies in the US.
**Realistic SAM:** $15M–$25M/year for a specialized vertical SaaS.
This is a niche market — valuable to CCW as internal tool; harder to productize.

---

## TOP GAPS TO CLOSE (CURRENT vs. COMPETITION)

### Gap 1: Inspection Photo Capture 🔴 CRITICAL
**Status:** CCW has a text input for photo URL (useless on mobile).
**Competitor benchmark:** Whip Around, Samsara DVIR, Fleetio — all have native camera capture per failed item.
**Fix:** One micro-prompt. `<input type="file" capture="environment">` + Supabase Storage.

### Gap 2: Parts-to-Work-Order Linkage 🔴 CRITICAL
**Status:** Parts inventory exists. `ccw_part_usage` table exists. Nothing connects them.
**Competitor benchmark:** Fleetio, Dossier, RTA, Cetaris — all auto-deduct inventory when parts are logged on WO.
**Fix:** One micro-prompt. Add "Parts Used" section to WO detail panel.

### Gap 3: Labor Cost Calculation 🔴 CRITICAL
**Status:** Time tracker runs. Technician hourly rates are in the data ($42–48/hr). Nothing multiplies them.
**Competitor benchmark:** Fleetio, RTA, Cetaris — all show labor cost on every work order.
**Fix:** One micro-prompt alongside Gap 2.

### Gap 4: PM Scheduler 🟡 IMPORTANT
**Status:** No PM scheduling. No auto-WO generation. Mileage from inspections goes nowhere.
**Competitor benchmark:** Fleetio, RTA, Trapeze, Cetaris — all do this.
**Fix:** One micro-prompt. New /dashboard/maintenance page.

### Gap 5: Agency Vendor Portal 🟡 DIFFERENTIATOR
**Status:** Not built. No competitor has it.
**Value:** Transit agencies with $3M+ contracts would find this compelling.
**Fix:** One micro-prompt. /portal/[agencySlug] static page per agency.

---

## COMPETITOR HEALTH WARNINGS (AVOID THESE VENDORS)

⚠️ **Samsara:** Multiple BBB complaints for unauthorized billing, auto-renewal traps. Cancellation requires legal action in some cases. Avoid recommending to clients.

⚠️ **Motive (KeepTruckin):** Customer service collapsed post-acquisition. Hardware replacement unfulfilled. Contract trap — must pay even if you sell the vehicles.

⚠️ **AssetWorks:** À la carte pricing with no transparency. Customers pay for components separately, bill grows unexpectedly.

✅ **Fleetio:** Safe recommendation for general fleet management. Good billing transparency, no contract trap. Clear SaaS pricing. Weakness: no native telematics.

✅ **Whip Around:** Safe for DVIR-only. Solid mobile DVIR. Not a full fleet management system.

---

## SPEC REFERENCE

The build spec that addresses these gaps:
`C:/Users/bradp/dev/bus-engine/SPEC-bus-engine-dashboard-v2-2026-03-17.md`

8 micro-prompts to close all critical gaps.
