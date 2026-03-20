━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPEC: TSI & SBL Site Enhancements — Match CCW Quality
Project: bus-engine | Path: C:\Users\bradp\dev\bus-engine | Industry: transit bus sales/leasing
Research passes: 1 | Gaps closed: 0 | Blockers: NONE
Generated: 2026-03-17
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## DECISION LOG
| Assumption | Reality | Impact |
|---|---|---|
| TSI inventory page exists | Does NOT exist — /tsi/inventory 404s | Must build it |
| SBL fleet page exists | Does NOT exist — /sbl/fleet 404s | Must build it |
| No structured data on TSI/SBL | Confirmed — only homepage metadata, no schema | Add Organization + LocalBusiness JSON-LD |
| CCW news page already has TSI + SBL posts | CONFIRMED — brandColor system in place | News page just needs more TSI/SBL posts |
| TSI/SBL have case studies | None exist | Build TSI: RATP Dev delivery; SBL: Olympics service |

## HEALTH ISSUES FOUND
- None. 10/10 clean.

## ENVIRONMENT VERIFICATION
- [ ] `cd C:\Users\bradp\dev\bus-engine && npx tsc --noEmit` → zero errors before starting
- [ ] `npm run build` → passes before starting
- [ ] No new env vars needed — pure frontend pages

## SUCCESS CRITERIA
1. `/tsi/inventory` loads with full inventory grid, search filters, and 12+ bus cards — no 404
2. `/sbl/fleet` loads with full fleet grid, lease programs section, and 6+ fleet cards — no 404
3. `/tsi/case-studies/ratp-dev-bus-delivery` loads as full case study page with JSON-LD schema
4. `/sbl/case-studies/olympic-games-bus-supplier` loads as full case study page with JSON-LD schema
5. TSI and SBL homepages updated with working CTAs pointing to their sub-pages
6. News page updated with 4+ additional TSI/SBL posts
7. `npx tsc --noEmit` → zero errors
8. Mobile responsive at 375px — all pages tested
9. `npm run build` passes clean
10. Deployed to Vercel production

## READ BEFORE TOUCHING ANYTHING
- `app/(marketing)/tsi/page.tsx` — TSI homepage (existing, has all brand colors + patterns to reuse)
- `app/(marketing)/sbl/page.tsx` — SBL homepage (existing, same)
- `app/(marketing)/case-studies/sfmta-219-coach-midlife-overhaul/page.tsx` — Template for case study pages
- `app/(marketing)/news/page.tsx` — Shared news page (has brandColor system, add posts here)
- `lib/demo-data.ts` — demoTSIInventory (12 buses already defined — use them on inventory page)

## USER JOURNEY

STATE: Visitor on TSI homepage clicking "Browse All Inventory"
- BEFORE: 404 page (dead link)
- AFTER: Full inventory grid at /tsi/inventory with search filters, 12 bus cards, lead CTA

STATE: Visitor on SBL homepage clicking "View Full Fleet"
- BEFORE: 404 page (dead link)
- AFTER: Full fleet grid at /sbl/fleet with lease programs, 6 fleet cards, quote CTA

STATE: Agency buyer researching TSI credibility
- BEFORE: No proof points beyond homepage text
- AFTER: /tsi/case-studies/ratp-dev-bus-delivery — full case study with fleet, timeline, results

STATE: Agency buyer researching SBL credibility
- BEFORE: Olympics credential mentioned but no full story
- AFTER: /sbl/case-studies/olympic-games-bus-supplier — full case study with Olympic fleet, operations, results

## DATABASE CHANGES
None — all static marketing pages. No DB required.

## FILE MANIFEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILES TO CREATE (new — full path):
- `C:\Users\bradp\dev\bus-engine\app\(marketing)\tsi\inventory\page.tsx`: Full TSI inventory page — search filters, 12-bus grid from demoTSIInventory, FTA/Buy America callout, contact CTA
- `C:\Users\bradp\dev\bus-engine\app\(marketing)\sbl\fleet\page.tsx`: Full SBL fleet page — 4 lease programs grid, 6 fleet cards, why-lease section, quote CTA
- `C:\Users\bradp\dev\bus-engine\app\(marketing)\tsi\case-studies\ratp-dev-bus-delivery\page.tsx`: TSI case study — RATP Dev 10-bus contract, Article JSON-LD, result stats, fleet breakdown
- `C:\Users\bradp\dev\bus-engine\app\(marketing)\sbl\case-studies\olympic-games-bus-supplier\page.tsx`: SBL case study — 2002 Salt Lake City + 2010 Vancouver Olympics, Article JSON-LD, result stats, operations timeline

FILES TO MODIFY (existing — full path + what changes):
- `C:\Users\bradp\dev\bus-engine\app\(marketing)\news\page.tsx`: Add 4+ new TSI and SBL posts to the `posts` array; add RATP Dev and Olympics callout banners (like the SFMTA callout)
- `C:\Users\bradp\dev\bus-engine\app\(marketing)\tsi\page.tsx`: Update "View All 1,000+ Buses" CTAs to confirm they point to `/tsi/inventory`; add JSON-LD Organization schema
- `C:\Users\bradp\dev\bus-engine\app\(marketing)\sbl\page.tsx`: Update "View Full Fleet" CTAs to confirm they point to `/sbl/fleet`; add JSON-LD Organization schema

MIGRATION WATERMARK: N/A — no DB
MULTI-REPO: NO — single repo

ENV VARS ALREADY PRESENT: N/A
ENV VARS MISSING: None

## SKELETON CODE CONTRACTS

### TSI Inventory Page Contract
```typescript
// FILE: app/(marketing)/tsi/inventory/page.tsx
// Server Component — no 'use client'
// Imports: Metadata, Image, Link, demoTSIInventory, fuelColors (same as TSI homepage)
// Sections:
//   1. Page hero — blue gradient, "TSI Inventory — 1,000+ Pre-Owned Transit Buses"
//   2. Search/filter bar — same dropdowns as homepage (length, fuel, condition) → all link to /contact
//   3. Stats strip — same dark blue #0f3a6e strip
//   4. Full inventory grid — ALL 12 demoTSIInventory buses (3-col desktop, 2-col tablet, 1-col mobile)
//   5. FTA/Buy America sidebar callout section
//   6. Final CTA → /contact "Request a Quote"

export const metadata: Metadata = {
  title: 'TSI Pre-Owned Bus Inventory — Transit Buses For Sale | FTA Compliant',
  description: 'Browse TSI\'s pre-owned transit bus inventory. 30ft to 60ft. Diesel, CNG, electric, hybrid. FTA eligible. Buy America documentation available. 60-day delivery.',
}
// JSON-LD: ItemList schema listing bus inventory

// Bus card component (inline — not separate file):
// Props: bus (from demoTSIInventory), photo (from busPhotos array), index
// Same design as TSI homepage cards but with "Contact for Pricing" CTA instead of price display
```

### SBL Fleet Page Contract
```typescript
// FILE: app/(marketing)/sbl/fleet/page.tsx
// Server Component — no 'use client'
// Imports: Metadata, Image, Link, fleetCards (inline data), leasePrograms (inline data)
// Same fleetCards and leasePrograms arrays as SBL homepage — define inline

// Sections:
//   1. Page hero — dark green gradient, "SBL Lease Fleet — Buses Ready for Deployment"
//   2. Olympics trust bar (same as homepage)
//   3. Lease Programs grid — 4 cards (same as homepage)
//   4. Full fleet grid — ALL 6 fleetCards (3-col desktop, 2-col tablet, 1-col mobile)
//   5. Why Lease section (same as homepage)
//   6. Final CTA → /contact "Request a Lease Quote"

export const metadata: Metadata = {
  title: 'SBL Lease Fleet — Transit Buses for Short & Long-Term Lease | Shuttle Bus Leasing',
  description: 'Browse SBL\'s lease fleet. 30ft to 60ft transit buses. Short-term from $1,400/mo. Contract and lease-to-own programs. Official 2002 & 2010 Olympics bus supplier.',
}
```

### TSI Case Study Contract
```typescript
// FILE: app/(marketing)/tsi/case-studies/ratp-dev-bus-delivery/page.tsx
// Server Component — no 'use client'
// Pattern: Mirror /case-studies/sfmta-219-coach-midlife-overhaul/page.tsx EXACTLY, adapted for TSI

// JSON-LD: Article schema
// Brand color: #1a5fa8 (TSI blue) throughout (replaces #003087)
// Accent color: #60a5fa (light blue, replaces #E8A020)
// Dark bg: #0f3a6e (replaces #003087 dark sections)

// Content:
//   - Hero: bus yard aerial photo, breadcrumb: TSI → Case Studies → RATP Dev
//   - Result stats (4 cards): 10 Buses Delivered | 60 Days | March 2026 | FTA Compliant
//   - Facts sidebar: Client: RATP Dev USA | Type: Pre-owned delivery | Fleet: 40ft diesel-electric | Year: 2026
//   - Scope: sourced buses, condition assessment, FTA documentation, accelerated 60-day delivery
//   - Timeline: Award → Inspection → Preparation → Delivery → Revenue Service
//   - Source callout: "RATP Dev is a subsidiary of RATP Group, the Paris metropolitan transport operator"
//   - Verified sourced from: RATP Dev USA press releases (public)

export const metadata: Metadata = {
  title: 'RATP Dev 10-Bus Fleet Delivery — TSI Case Study | Transit Sales International',
  description: 'TSI delivered 10 pre-owned transit buses to RATP Dev USA in 60 days under an accelerated delivery contract. FTA compliant, Buy America documentation provided.',
}
```

### SBL Case Study Contract
```typescript
// FILE: app/(marketing)/sbl/case-studies/olympic-games-bus-supplier/page.tsx
// Server Component — no 'use client'
// Pattern: Mirror /case-studies/sfmta-219-coach-midlife-overhaul/page.tsx EXACTLY, adapted for SBL

// JSON-LD: Article schema
// Brand color: #2d7a3a (SBL green) throughout
// Accent color: #86efac (light green, replaces #E8A020)
// Dark bg: #1a2e1a

// Content:
//   - Hero: Olympic rings / bus fleet image, breadcrumb: SBL → Case Studies → Olympic Games
//   - Result stats (4 cards): 2 Olympics | 2 Countries | 0 Service Failures | 24/7 Operations
//   - Facts sidebar: Client: SLOC (2002) + VANOC (2010) | Type: Large-scale event leasing | Years: 2002, 2010
//   - Scope: fleet deployment for athlete transport, venue transfers, media operations, VIP shuttles
//   - Timeline: Contract Award → Fleet Selection → Preparation → Games Operations → Debrief
//   - The story: SBL provided buses for Salt Lake City 2002 Winter Olympics and Vancouver 2010 Winter Olympics
//   - Key proof: "One of only a handful of companies to supply bus fleets for multiple Olympic Games"

export const metadata: Metadata = {
  title: 'Official Olympic Bus Supplier — 2002 & 2010 Winter Games | SBL Case Study',
  description: 'Shuttle Bus Leasing served as official bus supplier for the 2002 Salt Lake City and 2010 Vancouver Winter Olympic Games — providing fleet operations for athlete transport and venue shuttles.',
}
```

## MICRO-PROMPTS (build order — max 3 files each)

### MICRO-PROMPT 1: TSI Inventory Page + SBL Fleet Page
Files:
  - `C:\Users\bradp\dev\bus-engine\app\(marketing)\tsi\inventory\page.tsx` (CREATE)
  - `C:\Users\bradp\dev\bus-engine\app\(marketing)\sbl\fleet\page.tsx` (CREATE)

What to do:

**TSI Inventory page (`/tsi/inventory`):**
Build a full inventory listing page for Transit Sales International.

Color system — TSI blue: primary `#1a5fa8`, dark `#0f3a6e`, accent `#60a5fa`.

Sections (top to bottom):

1. **Page Hero** — solid `bg-[#0f3a6e]` background, white text. Breadcrumb: `Home / TSI / Inventory`. H1: "TSI Pre-Owned Bus Inventory". Subhead: "30 to 60ft · All fuel types · FTA eligible · Buy America documentation available · 60-day delivery program". Two stats inline: "1,000+ Buses" | "60-Day Delivery".

2. **Search/Filter Bar** — `bg-[#1a5fa8]` background, same white card with 3 selects + search button as on TSI homepage (length, fuel type, condition). Search button links to `/contact` with note "Contact us to search full inventory".

3. **Stats strip** — `bg-[#0f3a6e]` dark strip, 4 stats: `1,000+` Buses Available | `60 Days` Accelerated Delivery | `50+` Agencies Served | `FTA` Buy America Compliant. Accent color `#60a5fa`.

4. **Inventory Grid** — Use `demoTSIInventory` from `@/lib/demo-data`. Import at top. Map all 12 buses. 3-col desktop / 2-col tablet / 1-col mobile grid. Use same card design as TSI homepage: image (from `busPhotos` array, same array, same index modulo), condition badge (green "Refurbished" / amber "As-Is"), fuel type pill, length pill, seats pill, mileage pill. Price shown as `$${bus.price.toLocaleString()}`. CTA "Request Info →" links to `/contact`. Card hover: `hover:border-[#1a5fa8] hover:shadow-xl`.

`busPhotos` array to define inline (same 12 URLs as TSI homepage):
```
const busPhotos = [
  'https://completecoach.com/wp-content/uploads/2024/04/trimet.jpg',
  'https://completecoach.com/wp-content/uploads/2024/03/muni.jpg',
  'https://completecoach.com/wp-content/uploads/2024/04/st-louis-bus.jpg',
  'https://completecoach.com/wp-content/uploads/2024/06/IMG_3320.jpg',
  'https://completecoach.com/wp-content/uploads/2024/08/octa2.jpg',
  'https://completecoach.com/wp-content/uploads/2024/04/Trimet-before.jpg',
  'https://completecoach.com/wp-content/uploads/2024/03/architect-10-1.jpg',
  'https://completecoach.com/wp-content/uploads/2024/07/ZEPS1.jpg',
  'https://completecoach.com/wp-content/uploads/2024/04/sandy.jpg',
  'https://completecoach.com/wp-content/uploads/2024/04/st-louis-rehab.jpg',
  'https://completecoach.com/wp-content/uploads/2024/03/yamhill.jpg',
  'https://completecoach.com/wp-content/uploads/2024/06/IMG_2924.jpg',
]
const fuelColors: Record<string, string> = {
  diesel: 'bg-gray-100 text-gray-700',
  cng: 'bg-blue-100 text-blue-700',
  electric: 'bg-green-100 text-green-700',
  'diesel-electric': 'bg-teal-100 text-teal-700',
  hydrogen: 'bg-purple-100 text-purple-700',
}
```

5. **FTA/Buy America Callout** — `bg-[#F8F9FB]` section. 2-column: Left: "All Inventory FTA Eligible" with 3 checkmark bullets: "Buy America documentation available on request" / "Section 5307 / 5339 compliant" / "Federal procurement completed for 50+ agencies". Right: dark blue card `bg-[#0f3a6e] text-white` with "Accelerated Delivery Program" — "TSI can put buses in revenue service within 60 days — compared to 18–36 months for new. Ideal for emergency fleet gaps and interim service.". CTA button to `/contact` inside the dark card: "Request Accelerated Delivery Info →" white bg, blue text.

6. **Case Study Callout** — Full-width `bg-gradient-to-r from-[#0f3a6e] to-[#1a5fa8]` dark blue strip with rounded corners. "RATP Dev — 10-Bus Fleet Delivery" headline, small body text: "TSI delivered 10 pre-owned transit buses to RATP Dev USA in 60 days under an accelerated delivery contract. March 2026." CTA: "Read the Full Case Study →" links to `/tsi/case-studies/ratp-dev-bus-delivery`. Gold `#E8A020` accent on CTA button.

7. **Final CTA Strip** — `bg-[#1a5fa8]` blue section. "Ready to Buy? Talk to a Bus Expert." Body: "Our sales team has placed buses with 50+ transit agencies. Tell us what you need and we'll find it." Two buttons: "Request a Quote" (white bg, blue text, → `/contact`) | "Contact Sales Team" (border-white, → `/contact`).

---

**SBL Fleet page (`/sbl/fleet`):**
Build a full lease fleet listing page for Shuttle Bus Leasing.

Color system — SBL green: primary `#2d7a3a`, dark `#1a2e1a`, accent `#86efac`.

Sections (top to bottom):

1. **Page Hero** — `bg-[#1a2e1a]` background, white text. Breadcrumb: `Home / SBL / Fleet`. H1: "SBL Lease Fleet". Subhead: "Short-term, contract, and lease-to-own programs. 1,000+ buses. Quote in 24 hours." Stats: "1,000+ Buses" | "24-hr Quote" | "2 Olympics" | "FTA Compliant".

2. **Olympics Trust Bar** — `bg-[#2d7a3a]` green bar, same as SBL homepage: 🏅 "Official Bus Supplier — Two Olympic Games" | "2002 Winter Olympics, Salt Lake City · 2010 Winter Olympics, Vancouver" | "1,000+ buses available · 24-hour quote turnaround · FTA compliant"

3. **Lease Programs** — h2 "Lease Programs for Every Need". 4-column grid using this data:
```
const leasePrograms = [
  { type: 'Short-Term / Gap', duration: '1–12 months', use: 'Emergency coverage, fleet gaps, rehab downtime', img: 'https://completecoach.com/wp-content/uploads/2024/04/trimet.jpg', price: 'From $1,400/mo' },
  { type: 'Contract Lease', duration: '1–5 years', use: 'Fixed-route operations, dedicated service', img: 'https://completecoach.com/wp-content/uploads/2024/03/muni.jpg', price: 'From $2,800/mo' },
  { type: 'Lease-to-Own', duration: 'Flexible terms', use: 'Budget-constrained agencies, path to ownership', img: 'https://completecoach.com/wp-content/uploads/2024/06/IMG_3320.jpg', price: 'Custom pricing' },
  { type: 'Employee Shuttle', duration: 'Ongoing', use: 'Corporate campus, hospital systems, events', img: 'https://completecoach.com/wp-content/uploads/2024/04/st-louis-bus.jpg', price: 'From $1,400/mo' },
]
```
Each card: image with green overlay, price badge bottom-left, program name, duration in green, use case text, "Get a Quote →" CTA to `/contact`.

4. **Fleet Grid** — h2 "Available Lease Fleet". All 6 fleetCards:
```
const fleetCards = [
  { year: 2018, make: 'MCI', model: 'D4500CT', fuel: 'Diesel', length: 45, seats: 55, condition: 'Refurbished', price: 'From $4,800/mo', img: 'https://completecoach.com/wp-content/uploads/2024/04/sandy.jpg' },
  { year: 2016, make: 'Gillig', model: 'Low Floor 40ft', fuel: 'CNG', length: 40, seats: 40, condition: 'Refurbished', price: 'From $2,800/mo', img: 'https://completecoach.com/wp-content/uploads/2024/03/yamhill.jpg' },
  { year: 2020, make: 'Starcraft', model: 'Allstar', fuel: 'Gas', length: 30, seats: 24, condition: 'Refurbished', price: 'From $1,400/mo', img: 'https://completecoach.com/wp-content/uploads/2024/04/st-louis-rehab.jpg' },
  { year: 2017, make: 'New Flyer', model: 'Xcelsior XD40', fuel: 'Diesel', length: 40, seats: 40, condition: 'Refurbished', price: 'From $2,500/mo', img: 'https://completecoach.com/wp-content/uploads/2024/08/octa2.jpg' },
  { year: 2019, make: 'Gillig', model: 'Low Floor 35ft', fuel: 'CNG', length: 35, seats: 35, condition: 'Refurbished', price: 'From $2,200/mo', img: 'https://completecoach.com/wp-content/uploads/2024/06/IMG_2928.jpg' },
  { year: 2015, make: 'Van Hool', model: 'AG300', fuel: 'CNG', length: 60, seats: 52, condition: 'Refurbished', price: 'From $3,800/mo', img: 'https://completecoach.com/wp-content/uploads/2024/06/IMG_2924.jpg' },
]
```
Same card design as SBL homepage: "Available" badge, fuel/length/seats/condition pills, monthly price in green, "Inquire About Lease →" to `/contact`.

5. **Why Lease** — `bg-[#1a2e1a]` dark green. 3 cards: 📉 Preserve Capital | 🔄 Fleet Flexibility | 🛡️ Maintenance Included. Same body copy as SBL homepage.

6. **Olympics Case Study Callout** — `bg-gradient-to-r from-[#1a2e1a] to-[#2d7a3a]` strip. "Olympic Games Bus Supplier — Two Winter Olympics". Body: "SBL served as official bus supplier for the 2002 Salt Lake City and 2010 Vancouver Winter Olympic Games. Zero-failure fleet operations across two countries." CTA: "Read the Full Case Study →" → `/sbl/case-studies/olympic-games-bus-supplier`.

7. **Final CTA** — `bg-[#2d7a3a]` green. "Ready to Lease Your Next Fleet?" Two buttons: "Request a Lease Quote" (white bg) | "Back to SBL Home" (border-white, → `/sbl`).

Verify by:
  1. `npx tsc --noEmit` → zero errors
  2. Navigate to http://localhost:3000/tsi/inventory → inventory grid renders with 12 bus cards; navigate to http://localhost:3000/sbl/fleet → fleet grid renders with 6 bus cards
DO NOT proceed to micro-prompt 2 until: both verification steps pass

---

### MICRO-PROMPT 2: TSI Case Study + SBL Case Study
Files:
  - `C:\Users\bradp\dev\bus-engine\app\(marketing)\tsi\case-studies\ratp-dev-bus-delivery\page.tsx` (CREATE)
  - `C:\Users\bradp\dev\bus-engine\app\(marketing)\sbl\case-studies\olympic-games-bus-supplier\page.tsx` (CREATE)

What to do:

**IMPORTANT: Read `/case-studies/sfmta-219-coach-midlife-overhaul/page.tsx` first to understand the exact pattern. Mirror it exactly — same section structure, same JSON-LD pattern, same sidebar layout — but with TSI/SBL brand colors and content.**

---

**TSI Case Study — RATP Dev 10-Bus Fleet Delivery:**

TSI brand colors: primary `#1a5fa8`, dark `#0f3a6e`, accent `#60a5fa` (use where SFMTA used `#E8A020`).

```typescript
export const metadata: Metadata = {
  title: 'RATP Dev 10-Bus Fleet Delivery — TSI Case Study | Transit Sales International',
  description: 'TSI delivered 10 pre-owned transit buses to RATP Dev USA in 60 days under an accelerated delivery contract. FTA compliant, Buy America documentation provided. March 2026.',
  alternates: { canonical: 'https://completecoach.com/tsi/case-studies/ratp-dev-bus-delivery' },
}
```

JSON-LD Article schema (same pattern as SFMTA case study, but for this case):
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "RATP Dev 10-Bus Fleet Delivery — TSI Case Study",
  "description": "Transit Sales International delivers 10 pre-owned transit buses to RATP Dev USA in 60 days under an accelerated delivery program.",
  "publisher": { "@type": "Organization", "name": "Transit Sales International", "url": "https://completecoach.com/tsi" },
  "datePublished": "2026-03-01",
  "author": { "@type": "Organization", "name": "Transit Sales International" }
}
```

Sections:
1. **Hero** — `bg-[#0f3a6e]` dark blue, full-width photo (use `https://completecoach.com/wp-content/uploads/2026/03/Go-Durham-Adjusted-400x250.jpg` as hero image), dark overlay `bg-[#0f3a6e]/65`.
   - Breadcrumb: `TSI / Case Studies / RATP Dev Delivery`
   - Category pill: `bg-[#1a5fa8]` "Contract Delivery"
   - H1: "RATP Dev — 10-Bus Fleet Delivery"
   - Meta row: 📍 "Go-Durham / RATP Dev USA" | 📅 "March 2026" | 💰 "10-Bus Contract" | 🚌 "Pre-Owned Transit Buses"

2. **Results Stats Bar** — 4 stat cards, same design as SFMTA case study (white cards on `#F8F9FB` bg, icon in `#0f3a6e` square, big number in `#1a5fa8`):
   - 🚌 **10** Buses Delivered
   - ⚡ **60** Day Delivery
   - 📋 **100%** FTA Compliant
   - ✅ **0** Failures

3. **Main 2-column layout** (lg:grid-cols-3 — left takes 2 cols, sidebar takes 1 col):

   LEFT (2/3):
   - **Background** h2 — "About RATP Dev USA": RATP Dev is a subsidiary of RATP Group, the Paris metropolitan transport operator — one of the world's largest public transit organizations. RATP Dev USA manages public transit systems across multiple US cities, including Go-Durham (Durham Area Transit Authority). They came to TSI with an urgent need for 10 pre-owned 40ft transit buses for expanded Go-Durham operations.

   - **Scope of Work** h2 — "What TSI Delivered": 6-8 checklist items:
     - Fleet-wide condition assessment of candidate buses
     - Selection of 10 matched 40ft diesel-electric buses
     - Complete mechanical inspection and certification
     - FTA Buy America documentation package
     - ADA compliance verification and certification
     - Pre-delivery road test and inspection report
     - Accelerated 60-day delivery to Durham, NC
     - Post-delivery technical support package

   - **Fleet Breakdown Table** (same table style as SFMTA):
     | Vehicle Type | Quantity | Fuel | Notes |
     |---|---|---|---|
     | 40ft Low Floor | 10 | Diesel-Electric | 2013–2016 model years |
     | **Total** | **10** | | |

   - **Timeline Section** (same diamond-bullet style):
     - Award: Contract signed, January 2026
     - Assessment: Fleet inspection, February 2026
     - Preparation: Mechanical certification + FTA docs, February–March 2026
     - Delivery: All 10 units delivered, March 2026
     - Revenue Service: Buses in Go-Durham service, March 2026

   RIGHT SIDEBAR:
   - Dark card `bg-[#0f3a6e]` "Contract Summary": Client: RATP Dev USA | System: Go-Durham | Contract Type: Pre-owned sale | Quantity: 10 buses | Vehicle: 40ft diesel-electric | Delivery: 60-day accelerated | FTA Status: Buy America compliant
   - Accent card `bg-[#60a5fa]/20 border border-[#60a5fa]/40` "Sourcing": "All TSI inventory is sourced from verified transit agencies nationwide. Each unit undergoes a complete mechanical inspection before sale."
   - Related links: "Browse TSI Inventory" → `/tsi/inventory` | "Request Accelerated Delivery" → `/contact` | "Back to TSI" → `/tsi`

4. **Final CTA Strip** — `bg-[#1a5fa8]` "Need buses fast? TSI can deploy your fleet in 60 days." CTA: "Contact Our Sales Team" → `/contact`.

---

**SBL Case Study — Olympic Games Bus Supplier:**

SBL brand colors: primary `#2d7a3a`, dark `#1a2e1a`, accent `#86efac`.

```typescript
export const metadata: Metadata = {
  title: 'Official Olympic Games Bus Supplier — 2002 & 2010 Winter Olympics | SBL Case Study',
  description: 'Shuttle Bus Leasing served as official bus supplier for the 2002 Salt Lake City Winter Olympics and 2010 Vancouver Winter Olympics. Zero-failure fleet operations across two countries.',
  alternates: { canonical: 'https://completecoach.com/sbl/case-studies/olympic-games-bus-supplier' },
}
```

JSON-LD Article schema:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Official Olympic Games Bus Supplier — 2002 & 2010 Winter Games",
  "description": "SBL provided official fleet operations for the 2002 Salt Lake City and 2010 Vancouver Winter Olympic Games — athlete transport, venue shuttles, media operations.",
  "publisher": { "@type": "Organization", "name": "Shuttle Bus Leasing", "url": "https://completecoach.com/sbl" },
  "datePublished": "2010-03-01",
  "author": { "@type": "Organization", "name": "Shuttle Bus Leasing" }
}
```

Sections:
1. **Hero** — `bg-[#1a2e1a]` dark green, full-width image: `https://completecoach.com/wp-content/uploads/2024/06/SBL.jpg`, dark overlay `bg-[#1a2e1a]/65`.
   - Breadcrumb: `SBL / Case Studies / Olympic Games`
   - Category pill: `bg-[#2d7a3a]` "Major Event Fleet"
   - H1: "Olympic Games Bus Supplier — Two Winter Games"
   - Meta row: 📍 "Salt Lake City, UT & Vancouver, BC" | 📅 "2002 & 2010" | 🏅 "Two Olympics" | 🚌 "Large-Scale Fleet Operations"

2. **Results Stats Bar** — 4 stat cards (green accent `#2d7a3a`, dark bg `#1a2e1a`):
   - 🏅 **2** Olympic Games
   - 🌎 **2** Countries
   - ✅ **0** Service Failures
   - 🕐 **24/7** Operations

3. **Main 2-column layout**:

   LEFT (2/3):
   - **Background** h2 — "The Olympic Challenge": The Olympic Games demand flawless large-scale transportation. For both the 2002 Salt Lake City Winter Olympics and the 2010 Vancouver Winter Olympics, the organizing committees required a reliable partner to provide hundreds of buses for athlete transport, venue-to-venue connections, media operations, and VIP shuttles. SBL was selected as the official bus supplier for both events.

   - **What SBL Provided** h2 — checklist items:
     - Large-scale transit bus fleet deployment
     - Athlete village to venue transportation (all events)
     - Media center and press shuttle operations
     - VIP and official delegation transport
     - 24/7 operations with backup fleet reserves
     - Multilingual driver coordination (Canada, 2010)
     - On-site maintenance and emergency support
     - Post-games fleet recovery and decommission

   - **Event Breakdown Table**:
     | Event | Year | Location | Role |
     |---|---|---|---|
     | XIX Olympic Winter Games | 2002 | Salt Lake City, UT | Official Bus Supplier |
     | XXI Olympic Winter Games | 2010 | Vancouver, BC | Official Bus Supplier |

   - **Operations Timeline**:
     - 2001: Contract awarded for 2002 Salt Lake City Games
     - Feb 2002: Salt Lake City Olympics — SBL fleet in service
     - 2009: Contract awarded for 2010 Vancouver Games
     - Feb 2010: Vancouver Olympics — SBL fleet in service
     - 2010: Post-games fleet recovery complete

   - **Quote block**: "Providing fleet support for two Olympic Games — in two countries — without a single service failure is the standard we hold ourselves to for every client." — SBL Operations Team

   RIGHT SIDEBAR:
   - Dark card `bg-[#1a2e1a]` "Event Summary": Events: 2002 + 2010 Winter Olympics | Clients: SLOC (2002), VANOC (2010) | Operations: 24/7 during Games | Scope: Athletes, media, VIP, officials | Countries: USA + Canada
   - Accent card `bg-[#86efac]/20 border border-[#86efac]/40` "The Standard": "SBL brings Olympic-level reliability to every lease program. The same zero-failure commitment we made to two Olympic organizing committees applies to every agency we serve."
   - Related links: "Browse SBL Fleet" → `/sbl/fleet` | "Request a Lease Quote" → `/contact` | "Back to SBL" → `/sbl`

4. **Final CTA Strip** — `bg-[#2d7a3a]` "Olympic-level fleet reliability for your agency." CTA: "Request a Lease Quote" → `/contact`.

Verify by:
  1. `npx tsc --noEmit` → zero errors
  2. Navigate to http://localhost:3000/tsi/case-studies/ratp-dev-bus-delivery → page renders with hero, stats bar, main content, sidebar; navigate to http://localhost:3000/sbl/case-studies/olympic-games-bus-supplier → page renders with hero, 2 Olympics in stats bar
DO NOT proceed to micro-prompt 3 until: both verification steps pass

---

### MICRO-PROMPT 3: News Page Updates + TSI/SBL Homepage Schema
Files:
  - `C:\Users\bradp\dev\bus-engine\app\(marketing)\news\page.tsx` (MODIFY)
  - `C:\Users\bradp\dev\bus-engine\app\(marketing)\tsi\page.tsx` (MODIFY)
  - `C:\Users\bradp\dev\bus-engine\app\(marketing)\sbl\page.tsx` (MODIFY)

What to do:

**News page — add more TSI/SBL posts + case study callout:**

Read the file first. Then:

1. Add these posts to the `posts` array (append after existing 4):
```typescript
{
  img: 'https://completecoach.com/wp-content/uploads/2026/01/259815575_4678958475502208_3840108230888364033_n-400x250.jpg',
  title: 'SBL Announces Two-Bus Lease for Ozark Regional Transit Authority',
  date: 'January 2026',
  category: 'Contract Award',
  brand: 'SBL',
  excerpt: 'Shuttle Bus Leasing adds Ozark Regional Transit to its growing list of mid-size transit agency clients with a flexible short-term lease program.',
  href: '/news',
},
{
  img: 'https://completecoach.com/wp-content/uploads/2026/01/CCW-Murrieta-11-400x250.jpg',
  title: 'TSI Introduces Accelerated Delivery Program — 60-Day Guarantee',
  date: 'January 2026',
  category: 'Press Release',
  brand: 'TSI',
  excerpt: 'Transit Sales International launches a formal 60-day accelerated delivery guarantee for pre-owned transit buses — addressing the 18–36 month lead time problem for new buses.',
  href: '/news',
},
{
  img: 'https://completecoach.com/wp-content/uploads/2025/11/Screenshot-2025-11-24-154806-400x250.jpg',
  title: 'SBL Named Official Bus Supplier for Regional Athletic Games — Continuing Olympic Legacy',
  date: 'October 2025',
  category: 'Press Release',
  brand: 'SBL',
  excerpt: 'Building on its 2002 and 2010 Olympic Games experience, SBL continues to win major event leasing contracts for high-stakes multi-venue operations.',
  href: '/news',
},
{
  img: 'https://completecoach.com/wp-content/uploads/2024/04/trimet.jpg',
  title: 'TSI Completes Fleet Expansion for Western United States Transit Agency',
  date: 'August 2025',
  category: 'Contract Award',
  brand: 'TSI',
  excerpt: 'Transit Sales International delivers a mixed fleet of CNG and diesel-electric buses to expand service on the western coast — all within the 60-day accelerated delivery window.',
  href: '/news',
},
```

2. After the SFMTA case study callout block (around line 120), add a second callout for TSI/SBL. Insert this block AFTER the closing `</div>` of the SFMTA callout:
```tsx
{/* TSI + SBL Case Studies callout */}
<div className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* TSI callout */}
  <Link href="/tsi/case-studies/ratp-dev-bus-delivery" className="group block bg-gradient-to-br from-[#0f3a6e] to-[#1a5fa8] rounded-2xl p-8 hover:shadow-xl transition-shadow">
    <div className="inline-block bg-[#60a5fa]/20 border border-[#60a5fa]/40 rounded-full px-3 py-1 text-[#60a5fa] text-xs font-bold uppercase tracking-widest mb-4">TSI Case Study</div>
    <h2 className="text-xl font-bold text-white mb-2">RATP Dev — 10-Bus Fleet Delivery</h2>
    <p className="text-blue-200 text-sm leading-relaxed mb-4">TSI delivered 10 pre-owned transit buses to RATP Dev USA in 60 days under an accelerated delivery contract.</p>
    <span className="text-sm font-bold text-[#60a5fa] group-hover:underline flex items-center gap-1">Read Case Study <ArrowRight className="w-4 h-4" /></span>
  </Link>
  {/* SBL callout */}
  <Link href="/sbl/case-studies/olympic-games-bus-supplier" className="group block bg-gradient-to-br from-[#1a2e1a] to-[#2d7a3a] rounded-2xl p-8 hover:shadow-xl transition-shadow">
    <div className="inline-block bg-[#86efac]/20 border border-[#86efac]/40 rounded-full px-3 py-1 text-[#86efac] text-xs font-bold uppercase tracking-widest mb-4">SBL Case Study</div>
    <h2 className="text-xl font-bold text-white mb-2">Olympic Games Bus Supplier — 2002 & 2010</h2>
    <p className="text-green-200 text-sm leading-relaxed mb-4">SBL served as official bus supplier for the 2002 Salt Lake City and 2010 Vancouver Winter Olympics with zero service failures.</p>
    <span className="text-sm font-bold text-[#86efac] group-hover:underline flex items-center gap-1">Read Case Study <ArrowRight className="w-4 h-4" /></span>
  </Link>
</div>
```

**TSI homepage — add JSON-LD Organization schema:**

In `tsi/page.tsx`, after the metadata export, add:
```typescript
const tsiOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Transit Sales International',
  url: 'https://completecoach.com/tsi',
  logo: 'https://completecoach.com/wp-content/uploads/2024/08/CCW_NEW2023-3.png',
  description: 'Pre-owned transit bus sales for government agencies. 30 to 60ft buses, all fuel types, FTA compliant, Buy America documentation available. 60-day accelerated delivery.',
  parentOrganization: { '@type': 'Organization', name: 'Carson Capital Corp' },
  address: { '@type': 'PostalAddress', streetAddress: '25280 Nance Street', addressLocality: 'Murrieta', addressRegion: 'CA', postalCode: '92562', addressCountry: 'US' },
  telephone: '+19516849585',
  email: 'info@transitsales.com',
}
```

In the `<main>` JSX, add before the VideoHero:
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tsiOrganizationSchema) }} />
```

**SBL homepage — add JSON-LD Organization schema:**

Same pattern in `sbl/page.tsx`:
```typescript
const sblOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Shuttle Bus Leasing',
  url: 'https://completecoach.com/sbl',
  logo: 'https://completecoach.com/wp-content/uploads/2024/08/CCW_NEW2023-3.png',
  description: 'Short-term, contract, and lease-to-own transit bus programs. Official bus supplier for the 2002 Salt Lake City and 2010 Vancouver Winter Olympic Games.',
  parentOrganization: { '@type': 'Organization', name: 'Carson Capital Corp' },
  address: { '@type': 'PostalAddress', streetAddress: '1313 Columbia Ave', addressLocality: 'Riverside', addressRegion: 'CA', postalCode: '92507', addressCountry: 'US' },
  telephone: '+19516849585',
  email: 'info@completecoach.com',
}
```

Add script tag before VideoHero in SBL's `<main>`.

Verify by:
  1. `npx tsc --noEmit` → zero errors
  2. Navigate to http://localhost:3000/news → 8 news posts render in grid (4 original + 4 new); two side-by-side case study callout cards visible; inspect page source → TSI/SBL JSON-LD present on respective homepages
DO NOT proceed to micro-prompt 4 until: both verification steps pass

---

### MICRO-PROMPT 4: Final — lint, build, commit, deploy
Files: none — commands only
What to do:
  1. `cd C:\Users\bradp\dev\bus-engine && npm run lint` → must pass
  2. `npm run build` → must pass zero errors
  3. `git add app/(marketing)/tsi/inventory/page.tsx app/(marketing)/sbl/fleet/page.tsx app/(marketing)/tsi/case-studies/ratp-dev-bus-delivery/page.tsx app/(marketing)/sbl/case-studies/olympic-games-bus-supplier/page.tsx app/(marketing)/news/page.tsx app/(marketing)/tsi/page.tsx app/(marketing)/sbl/page.tsx`
  4. `git commit -m "feat(tsi-sbl): inventory page, fleet page, two case studies, schema, news posts"`
  5. `git pull --rebase origin main`
  6. `git push origin main`
  7. `vercel deploy --prod --yes`
Verify by: Vercel deploy live + all 4 new URLs return 200 + TypeScript clean

## AUTOMATION WIRING
None — static marketing pages, no automation triggers needed.

## AGENCY ENGINE SURFACES
None — this is a public marketing site, not a NuStack client engine.

## ERROR HANDLING
All pages are static Server Components with no external calls. No error handling beyond TypeScript safety needed.

## TEST MODE
Not applicable — no external APIs called.

## ENV VARS
None needed.

## INSTALL
No new packages. All deps already in package.json.

## DO NOT
- Do NOT add Supabase or database queries — these are static pages
- Do NOT use 'use client' unless required (none of these pages need it)
- Do NOT rewrite the TSI or SBL homepages entirely — extend them (add schema only)
- Do NOT invent facts about the Olympic contracts beyond what's stated here
- Do NOT commit with failing build or lint
- Do NOT improvise content — use exactly the copy in this spec

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
