"use client";

/**
 * Expansion Analysis — Win Analytics + East Coast Opportunity
 * 
 * TWO WAYS TO USE THIS:
 * 
 * OPTION A — Standalone page (simplest):
 *   Drop at: app/dashboard/expansion-analysis/page.tsx
 * 
 * OPTION B — Tab inside Fleet Intelligence (recommended):
 *   In fleet-intelligence/page.tsx, add a tab bar at the top and
 *   conditionally render <ExpansionAnalysis /> when tab === "expansion"
 *   Export the component from this file and import it there.
 * 
 * No new dependencies. React + Tailwind only.
 * All data sourced from USAspending.gov API (live pull Mar 19 2026),
 * FTA Federal Register 91 FR 12902, press releases, BUSRide profile.
 */

import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface WinRecord {
  agency: string;
  state: string;
  region: "west" | "southwest" | "midwest" | "east" | "hawaii";
  year: number;
  buses: number;
  value: number;       // estimated contract value
  company: "ccw" | "tsi" | "sbl" | "zeps";
  path: "direct" | "coop" | "federal";
  distFromRiverside: number;
  note: string;
}

interface EastCoastOpp {
  agency: string;
  state: string;
  city: string;
  fleet: number;
  ftaGrant: number;
  scope: string;
  company: "ccw" | "tsi" | "sbl" | "zeps" | "multi";
  distRiverside: number;
  distMemphis: number;    // distance from Memphis TN (potential hub)
  viableFromRiverside: boolean;
  viableFromMemphis: boolean;
  urgency: "hot" | "warm" | "watch";
  revenueEstimate: string;
  barrier: string;
  opportunity: string;
}

interface HubScenario {
  city: string;
  state: string;
  lat: number;
  lon: number;
  capitalCost: string;
  leasePerMo: string;
  marketUnlocked: string;   // total FTA $ in reach
  agenciesUnlocked: number;
  annualRevPotential: string;
  paybackYears: number;
  evidence: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const WIN_RECORDS: WinRecord[] = [
  // CALIFORNIA — CCW core
  { agency:"SFMTA", state:"CA", region:"west", year:2022, buses:219, value:101659122, company:"ccw", path:"direct", distFromRiverside:400, note:"Sole bidder. $101.7M. CCW's anchor contract." },
  { agency:"Long Beach Transit", state:"CA", region:"west", year:2024, buses:13, value:1950000, company:"ccw", path:"direct", distFromRiverside:40, note:"60ft CNG midlife. Repeat customer." },
  { agency:"SunLine Transit", state:"CA", region:"west", year:2025, buses:10, value:1500000, company:"ccw", path:"direct", distFromRiverside:80, note:"New Flyer XN40 rehab." },
  { agency:"Fresno Area Express", state:"CA", region:"west", year:2024, buses:11, value:1650000, company:"ccw", path:"direct", distFromRiverside:220, note:"40ft CNG buses." },
  { agency:"Foothill Transit", state:"CA", region:"west", year:2023, buses:56, value:840000, company:"ccw", path:"direct", distFromRiverside:30, note:"56 buses repainted." },
  { agency:"OCTA", state:"CA", region:"west", year:1986, buses:175, value:2100000, company:"ccw", path:"direct", distFromRiverside:50, note:"CCW's founding contract. 175 GMC buses." },
  // WASHINGTON — CCW via coop
  { agency:"Everett Transit", state:"WA", region:"west", year:2024, buses:5, value:750000, company:"ccw", path:"coop", distFromRiverside:1100, note:"WA State DES cooperative." },
  { agency:"WA State agency (unnamed)", state:"WA", region:"west", year:2024, buses:5, value:750000, company:"ccw", path:"coop", distFromRiverside:1100, note:"WA State DES coop." },
  // OREGON — CCW + ZEPS
  { agency:"Josephine County Transit", state:"OR", region:"west", year:2023, buses:4, value:80000, company:"zeps", path:"direct", distFromRiverside:700, note:"ZEPS refurb at Riverside. Buses transported from Portland." },
  { agency:"TriMet", state:"OR", region:"west", year:2019, buses:12, value:180000, company:"zeps", path:"direct", distFromRiverside:950, note:"ZEPS fleet, transferred to Josephine County." },
  { agency:"Yamhill County", state:"OR", region:"west", year:2022, buses:6, value:900000, company:"ccw", path:"direct", distFromRiverside:980, note:"5 rehab + 1 follow-on. OR statewide contract." },
  // NEW YORK — CCW via coop (furthest east confirmed)
  { agency:"Rochester RTS", state:"NY", region:"east", year:2025, buses:5, value:750000, company:"ccw", path:"coop", distFromRiverside:2700, note:"WA State DES coop. Furthest east confirmed CCW rehab." },
  // INDIANA — ZEPS east of Mississippi
  { agency:"IndyGo", state:"IN", region:"midwest", year:2015, buses:21, value:6300000, company:"zeps", path:"direct", distFromRiverside:1900, note:"21 ZEPS buses. Largest single ZEPS deployment. Buses transported to Riverside." },
  // MARYLAND — ZEPS
  { agency:"TransIT Frederick", state:"MD", region:"east", year:2021, buses:5, value:1500000, company:"zeps", path:"direct", distFromRiverside:2500, note:"5 ZEPS buses." },
  // TEXAS — ZEPS + SBL
  { agency:"McAllen Metro", state:"TX", region:"southwest", year:2018, buses:2, value:600000, company:"zeps", path:"direct", distFromRiverside:1700, note:"2 ZEPS + WAVE charging. South TX." },
  // FEDERAL — SBL
  { agency:"CBP T42 (DHS)", state:"TX", region:"southwest", year:2022, buses:0, value:24602213, company:"sbl", path:"federal", distFromRiverside:1700, note:"$24.6M bus lease. Expired May 2025. No re-award found." },
  { agency:"CBP CA lease (DHS)", state:"CA", region:"west", year:2023, buses:0, value:8899427, company:"sbl", path:"federal", distFromRiverside:300, note:"$8.9M lease of buses and vans." },
  { agency:"US Army Fort McCoy", state:"WI", region:"midwest", year:2005, buses:0, value:1134279, company:"sbl", path:"federal", distFromRiverside:2000, note:"IDV W911SA04A0020. 13 delivery orders 2005-2008." },
  // MIDWEST — historical CCW
  { agency:"Des Moines Area RTA", state:"IA", region:"midwest", year:2015, buses:6, value:900000, company:"ccw", path:"direct", distFromRiverside:1800, note:"6 low-floor bus rebuilds." },
  { agency:"City Utilities Springfield", state:"MO", region:"midwest", year:2016, buses:7, value:1050000, company:"ccw", path:"direct", distFromRiverside:1600, note:"7 × 35ft buses." },
  // HAWAII — historical
  { agency:"Honolulu (historical)", state:"HI", region:"hawaii", year:1983, buses:91, value:1365000, company:"ccw", path:"direct", distFromRiverside:2550, note:"Dale Carson's first major project. Origin of CCW." },
];

const EAST_COAST_OPPS: EastCoastOpp[] = [
  {
    agency:"DART First State", state:"DE", city:"Wilmington",
    fleet:250, ftaGrant:14260000,
    scope:"Midlife rehabilitation of 51 buses. 40ft: 12→18yr life. $150K/bus confirmed.",
    company:"ccw", distRiverside:2600, distMemphis:1050,
    viableFromRiverside:false, viableFromMemphis:true,
    urgency:"hot",
    revenueEstimate:"$7.65M rehab contract",
    barrier:"2,600 mi from Riverside. Transport $510K for 51 buses = 6.7% of budget. Margin squeeze.",
    opportunity:"If Memphis facility is active: 1,050 mi, transport ~$200K, margin restored. RFP not yet issued — call Delaware Transit today.",
  },
  {
    agency:"NORTA", state:"LA", city:"New Orleans",
    fleet:160, ftaGrant:27200000,
    scope:"Replacement buses + rehabilitate 2 O&M facilities. New RTA board — governance reset.",
    company:"multi", distRiverside:1800, distMemphis:400,
    viableFromRiverside:false, viableFromMemphis:true,
    urgency:"hot",
    revenueEstimate:"TSI: $3-8M used buses. SBL: gap leasing while new buses on order.",
    barrier:"O&M facility rehab is construction, not bus rehab. Bus replacement = TSI, not CCW.",
    opportunity:"Memphis at 400 miles = SBL gap lease + TSI used bus combo. New board = open vendor relationships.",
  },
  {
    agency:"Petersburg Area Transit", state:"VA", city:"Petersburg",
    fleet:25, ftaGrant:23820750,
    scope:"Replacement buses + construct O&M facility. Small agency with large grant.",
    company:"tsi", distRiverside:2700, distMemphis:1100,
    viableFromRiverside:false, viableFromMemphis:true,
    urgency:"warm",
    revenueEstimate:"TSI: $2-5M used buses (20-25 buses at $80-200K each)",
    barrier:"Small fleet — not worth CCW rehab at any distance. TSI used bus sale is the play.",
    opportunity:"TSI has no facility constraint. Ships buses anywhere. Petersburg's $24M grant is large for 25-bus fleet = likely buying new + some used.",
  },
  {
    agency:"Hampton Roads Transit", state:"VA", city:"Hampton",
    fleet:205, ftaGrant:10620000,
    scope:"Purchase replacement buses.",
    company:"tsi", distRiverside:2700, distMemphis:1000,
    viableFromRiverside:false, viableFromMemphis:false,
    urgency:"warm",
    revenueEstimate:"TSI: $4-8M used buses",
    barrier:"Pure bus replacement — TSI play, no CCW rehab angle. 205-bus fleet is meaningful inventory.",
    opportunity:"TSI ships anywhere. Reach out before RFP issued. Medium-size fleet buys used regularly.",
  },
  {
    agency:"SRTA New Bedford", state:"MA", city:"New Bedford",
    fleet:85, ftaGrant:0,
    scope:"RFP 26-01 OPEN — Joint procurement heavy-duty transit buses. Due May 8 2026.",
    company:"tsi", distRiverside:3000, distMemphis:1400,
    viableFromRiverside:false, viableFromMemphis:false,
    urgency:"hot",
    revenueEstimate:"TSI: $2-6M if used buses qualify under spec",
    barrier:"Need to verify spec allows used/remanufactured. CalACT/MBTA joint procurement.",
    opportunity:"Multiple agencies can piggyback on this contract. One win = multiple buyers.",
  },
  {
    agency:"Durham Transit", state:"NC", city:"Durham",
    fleet:65, ftaGrant:6142400,
    scope:"Purchase replacement buses.",
    company:"tsi", distRiverside:2500, distMemphis:950,
    viableFromRiverside:false, viableFromMemphis:false,
    urgency:"warm",
    revenueEstimate:"TSI: $2-4M used buses",
    barrier:"Small fleet, replacement only — TSI.",
    opportunity:"NC cluster (Durham + Chapel Hill + GoTriangle) = $32M+ in grants. TSI could approach as package.",
  },
  {
    agency:"Chapel Hill Transit", state:"NC", city:"Chapel Hill",
    fleet:70, ftaGrant:8802268,
    scope:"Replacement vehicles + safety equipment.",
    company:"tsi", distRiverside:2500, distMemphis:950,
    viableFromRiverside:false, viableFromMemphis:false,
    urgency:"warm",
    revenueEstimate:"TSI: $2-4M used buses",
    barrier:"Small fleet.",
    opportunity:"Part of NC cluster. TSI combined outreach with Durham.",
  },
  {
    agency:"Pasco County / Zephyrhills", state:"FL", city:"Zephyrhills",
    fleet:55, ftaGrant:501582,
    scope:"Existing ZEPS customer — multiple grant cycles 2018-2025. $7.8M total.",
    company:"zeps", distRiverside:2600, distMemphis:850,
    viableFromRiverside:false, viableFromMemphis:true,
    urgency:"warm",
    revenueEstimate:"ZEPS follow-on: $1-3M as fleet ages",
    barrier:"Small fleet. Long-term customer relationship already established.",
    opportunity:"Fleet ages toward replacement. ZEPS re-conversion or new ZEPS buses as FTA Low-No grants continue.",
  },
  {
    agency:"MTA New York City", state:"NY", city:"New York",
    fleet:5800, ftaGrant:0,
    scope:"Largest transit bus fleet in the US. 5,800+ buses.",
    company:"tsi", distRiverside:3000, distMemphis:1350,
    viableFromRiverside:false, viableFromMemphis:false,
    urgency:"watch",
    revenueEstimate:"TSI: $20-50M+ used buses over time (they buy continuously)",
    barrier:"NEBR home turf. PE-backed. Complex procurement. Not a cold-call market.",
    opportunity:"TSI as alternative vendor when NEBR capacity is maxed. Long game.",
  },
  {
    agency:"SEPTA", state:"PA", city:"Philadelphia",
    fleet:1400, ftaGrant:0,
    scope:"3rd largest US fleet. Major procurement activity ongoing.",
    company:"tsi", distRiverside:2700, distMemphis:1100,
    viableFromRiverside:false, viableFromMemphis:false,
    urgency:"watch",
    revenueEstimate:"TSI: $10-30M used buses over time",
    barrier:"No existing relationship. Large agency, complex procurement.",
    opportunity:"TSI long game. Philadelphia + Baltimore corridor = high-density bus market.",
  },
];

const HUB_SCENARIOS: HubScenario[] = [
  {
    city:"Memphis", state:"TN",
    lat:35.15, lon:-90.05,
    capitalCost:"$500K–$1.5M",
    leasePerMo:"$15K–$35K/mo",
    marketUnlocked:"$180M+ FTA grants in reach",
    agenciesUnlocked:12,
    annualRevPotential:"$8–$15M/yr",
    paybackYears:2,
    evidence:"CCW had a confirmed Memphis facility in 2018 (BUSRide). May still exist. 400 miles from New Orleans. 950 miles from NC cluster. 1,050 miles from Delaware. The single highest-ROI facility investment.",
  },
  {
    city:"Charlotte", state:"NC",
    lat:35.22, lon:-80.84,
    capitalCost:"$800K–$2M",
    leasePerMo:"$20K–$45K/mo",
    marketUnlocked:"$120M+ FTA grants in reach",
    agenciesUnlocked:8,
    annualRevPotential:"$5–$10M/yr",
    paybackYears:3,
    evidence:"Covers NC cluster (Durham/Chapel Hill/GoTriangle $32M), VA agencies (Petersburg, Hampton Roads), SC, and GA. Growing Sun Belt transit markets. No competitors with local presence.",
  },
  {
    city:"Dallas/Fort Worth", state:"TX",
    lat:32.77, lon:-96.79,
    capitalCost:"$600K–$1.5M",
    leasePerMo:"$18K–$40K/mo",
    marketUnlocked:"$95M+ FTA grants in reach",
    agenciesUnlocked:7,
    annualRevPotential:"$4–$9M/yr",
    paybackYears:3,
    evidence:"Covers TX, OK, AR, LA. SBL already has Texas federal operations (CBP corridor). ZEPS existing in McAllen. Natural extension of existing Texas footprint.",
  },
  {
    city:"Atlanta", state:"GA",
    lat:33.75, lon:-84.39,
    capitalCost:"$700K–$1.8M",
    leasePerMo:"$20K–$45K/mo",
    marketUnlocked:"$85M+ FTA grants in reach",
    agenciesUnlocked:6,
    annualRevPotential:"$4–$8M/yr",
    paybackYears:4,
    evidence:"MARTA (900 buses, no current CCW relationship). Covers GA, SC, AL, TN. NEBR has no presence here. Open territory.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const CO_COLOR: Record<string, string> = {
  ccw:"#4ade80", tsi:"#60a5fa", sbl:"#f59e0b", zeps:"#a78bfa", multi:"#f87171"
};
const CO_BG: Record<string, string> = {
  ccw:"rgba(74,222,128,.1)", tsi:"rgba(96,165,250,.1)", sbl:"rgba(245,158,11,.1)", zeps:"rgba(167,139,250,.1)", multi:"rgba(248,113,113,.1)"
};
const REGION_ORDER = ["west","southwest","midwest","east","hawaii"];
const REGION_LABEL: Record<string, string> = {
  west:"West Coast & Pacific NW", southwest:"Southwest & Texas", midwest:"Midwest", east:"East of Mississippi", hawaii:"Hawaii / Pacific"
};

function fmt(n: number): string {
  if (n >= 1e6) return "$" + (n/1e6).toFixed(1) + "M";
  if (n >= 1e3) return "$" + (n/1e3).toFixed(0) + "K";
  return "$" + n;
}

function Badge({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded border" style={{ color, background: bg, borderColor: color + "55" }}>
      {label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WIN ANALYTICS PANEL
// ─────────────────────────────────────────────────────────────────────────────

function WinAnalytics() {
  const [groupBy, setGroupBy] = useState<"region"|"company"|"year">("region");
  const [selectedRegion, setSelectedRegion] = useState<string|null>(null);

  // Aggregate wins
  const byRegion = REGION_ORDER.map(r => ({
    region: r,
    label: REGION_LABEL[r],
    wins: WIN_RECORDS.filter(w => w.region === r),
    totalValue: WIN_RECORDS.filter(w => w.region === r).reduce((s,w) => s+w.value, 0),
    totalBuses: WIN_RECORDS.filter(w => w.region === r).reduce((s,w) => s+w.buses, 0),
  }));

  const totalValue = WIN_RECORDS.reduce((s,w) => s+w.value, 0);
  const westValue = WIN_RECORDS.filter(w => w.region === "west").reduce((s,w) => s+w.value, 0);
  const eastValue = WIN_RECORDS.filter(w => w.region === "east" || w.region === "midwest").reduce((s,w) => s+w.value, 0);
  const westPct = Math.round((westValue / totalValue) * 100);

  const byCompany = (["ccw","tsi","sbl","zeps"] as const).map(co => ({
    co,
    wins: WIN_RECORDS.filter(w => w.company === co),
    total: WIN_RECORDS.filter(w => w.company === co).reduce((s,w) => s+w.value, 0),
  }));

  const displayed = selectedRegion
    ? WIN_RECORDS.filter(w => w.region === selectedRegion)
    : WIN_RECORDS;

  return (
    <div className="space-y-5">

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label:"Total verified revenue", value: fmt(totalValue), sub:"All companies, all time" },
          { label:"West Coast share", value: westPct + "%", sub:`${fmt(westValue)} of ${fmt(totalValue)}` },
          { label:"East of Mississippi", value: fmt(eastValue), sub:"Midwest + East wins" },
          { label:"Confirmed wins", value: WIN_RECORDS.length.toString(), sub:"Press + USAspending confirmed" },
        ].map(s => (
          <div key={s.label} className="bg-white/[0.03] border border-white/[0.07] rounded-lg p-3">
            <div className="text-[11px] text-[#7a7870] mb-1">{s.label}</div>
            <div className="text-[20px] font-mono font-medium">{s.value}</div>
            <div className="text-[10px] text-[#4a4845] mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* By company bar */}
      <div className="bg-white/[0.03] border border-white/[0.07] rounded-lg p-4">
        <div className="text-[10px] uppercase tracking-widest text-[#4a4845] font-medium mb-3">Revenue by company</div>
        <div className="space-y-2">
          {byCompany.map(({ co, total }) => {
            const pct = Math.round((total / totalValue) * 100);
            return (
              <div key={co} className="flex items-center gap-3">
                <span className="text-[10px] font-mono w-10 text-right" style={{ color: CO_COLOR[co] }}>{co.toUpperCase()}</span>
                <div className="flex-1 h-5 bg-white/[0.04] rounded overflow-hidden relative">
                  <div
                    className="h-full rounded transition-all duration-500"
                    style={{ width: `${pct}%`, background: CO_COLOR[co], opacity: 0.7 }}
                  />
                  <span className="absolute inset-0 flex items-center px-2 text-[10px] font-mono text-white/70">
                    {fmt(total)}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#7a7870] w-10">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* By region */}
      <div className="bg-white/[0.03] border border-white/[0.07] rounded-lg p-4">
        <div className="text-[10px] uppercase tracking-widest text-[#4a4845] font-medium mb-3">Revenue concentration by region</div>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {byRegion.map(({ region, label, wins, totalValue: tv }) => {
            const pct = Math.round((tv / totalValue) * 100);
            const isSelected = selectedRegion === region;
            return (
              <button
                key={region}
                onClick={() => setSelectedRegion(isSelected ? null : region)}
                className={`rounded-lg p-3 text-left border transition-all ${
                  isSelected
                    ? "bg-white/[0.08] border-white/[0.2]"
                    : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]"
                }`}
              >
                <div className="text-[18px] font-mono font-medium mb-0.5">{pct}%</div>
                <div className="text-[9px] text-[#7a7870] leading-tight mb-1">{label}</div>
                <div className="text-[9px] font-mono text-[#4a4845]">{wins.length} wins</div>
                <div className="text-[9px] font-mono text-[#4a4845]">{fmt(tv)}</div>
              </button>
            );
          })}
        </div>

        {/* Win list filtered by selected region */}
        <div className="text-[9px] uppercase tracking-widest text-[#4a4845] font-medium mb-2">
          {selectedRegion ? REGION_LABEL[selectedRegion] + " — all wins" : "All wins"}
          {selectedRegion && (
            <button onClick={() => setSelectedRegion(null)} className="ml-2 text-[#4a4845] hover:text-[#7a7870]">
              × clear
            </button>
          )}
        </div>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          {displayed.map((w, i) => (
            <div key={i} className="flex items-start gap-3 py-1.5 border-b border-white/[0.05] last:border-0 text-[11px]">
              <Badge label={w.company.toUpperCase()} color={CO_COLOR[w.company]} bg={CO_BG[w.company]} />
              <div className="flex-1 min-w-0">
                <span className="font-medium">{w.agency}</span>
                <span className="text-[#7a7870] ml-1">· {w.state} · {w.year}</span>
              </div>
              <div className="text-right shrink-0">
                <div className="font-mono">{fmt(w.value)}</div>
                {w.buses > 0 && <div className="text-[#4a4845]">{w.buses} buses</div>}
              </div>
              <div className="text-[10px] text-[#4a4845] w-24 shrink-0 text-right">{w.distFromRiverside.toLocaleString()} mi</div>
            </div>
          ))}
        </div>
      </div>

      {/* Geographic insight */}
      <div className="bg-[rgba(248,113,113,.06)] border border-[rgba(248,113,113,.2)] rounded-lg p-4">
        <div className="text-[11px] font-medium text-[#f87171] mb-2">Geographic concentration finding</div>
        <p className="text-[11px] text-[#7a7870] leading-relaxed">
          <strong className="text-[#e8e6e0]">{westPct}% of all verified revenue is West Coast.</strong>{" "}
          The only confirmed east-of-Mississippi CCW rehab win is Rochester NY (5 buses, WA State coop, Aug 2025 — 2,700 miles from Riverside).
          East-of-Mississippi revenue exists only through{" "}
          <strong className="text-[#e8e6e0]">ZEPS conversions</strong> (IndyGo IN, TransIT Frederick MD) where the higher per-bus value
          ($300K+) absorbs transport costs. Standard midlife rehab ($150K/bus) cannot support $10–14K round-trip transport at long distances.
          A Memphis or Charlotte facility changes this math entirely.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EAST COAST OPPORTUNITY PANEL
// ─────────────────────────────────────────────────────────────────────────────

function EastCoastOpps() {
  const [selected, setSelected] = useState<EastCoastOpp | null>(null);
  const [memphisActive, setMemphisActive] = useState(false);

  const hot = EAST_COAST_OPPS.filter(o => o.urgency === "hot");
  const warm = EAST_COAST_OPPS.filter(o => o.urgency === "warm");
  const watch = EAST_COAST_OPPS.filter(o => o.urgency === "watch");

  const totalFTA = EAST_COAST_OPPS.reduce((s,o) => s+o.ftaGrant, 0);

  function OppCard({ o }: { o: EastCoastOpp }) {
    const viable = memphisActive ? o.viableFromMemphis : o.viableFromRiverside;
    const dist = memphisActive ? o.distMemphis : o.distRiverside;
    const urgencyColor = o.urgency === "hot" ? "#f87171" : o.urgency === "warm" ? "#f59e0b" : "#94a3b8";
    const isSelected = selected?.agency === o.agency;
    return (
      <button
        onClick={() => setSelected(isSelected ? null : o)}
        className={`w-full text-left rounded-lg border p-3 transition-all ${
          isSelected ? "bg-white/[0.07] border-white/[0.2]" : "bg-white/[0.02] border-white/[0.07] hover:bg-white/[0.05]"
        }`}
      >
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div>
            <span className="text-[12px] font-medium">{o.agency}</span>
            <span className="text-[10px] text-[#7a7870] ml-1">{o.city}, {o.state}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded" style={{ color: urgencyColor, background: urgencyColor+"18", border: `1px solid ${urgencyColor}44` }}>
              {o.urgency.toUpperCase()}
            </span>
            <Badge label={(o.company === "multi" ? "MULTI" : o.company).toUpperCase()} color={CO_COLOR[o.company]} bg={CO_BG[o.company]} />
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-[#7a7870]">
          {o.ftaGrant > 0 && <span className="font-mono text-[#e8e6e0]">{fmt(o.ftaGrant)} FTA grant</span>}
          <span>{o.fleet} bus fleet</span>
          <span className={viable ? "text-green-400" : "text-red-400"}>
            {dist.toLocaleString()} mi · {viable ? "✓ viable" : "✗ too far"}
          </span>
        </div>
        {isSelected && (
          <div className="mt-3 pt-3 border-t border-white/[0.07] space-y-2 text-[11px]">
            <div>
              <div className="text-[9px] uppercase tracking-widest text-[#4a4845] mb-1">Scope</div>
              <p className="text-[#7a7870] leading-relaxed">{o.scope}</p>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-widest text-[#4a4845] mb-1">Revenue estimate</div>
              <p className="text-[#4ade80] font-medium">{o.revenueEstimate}</p>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-widest text-[#4a4845] mb-1">Barrier</div>
              <p className="text-[#f87171] leading-relaxed">{o.barrier}</p>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-widest text-[#4a4845] mb-1">Opportunity path</div>
              <p className="text-[#7a7870] leading-relaxed">{o.opportunity}</p>
            </div>
          </div>
        )}
      </button>
    );
  }

  return (
    <div className="space-y-5">

      {/* Memphis toggle — the key insight */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4 flex items-center justify-between">
        <div>
          <div className="text-[13px] font-medium mb-0.5">Memphis TN facility — on/off toggle</div>
          <p className="text-[11px] text-[#7a7870]">
            CCW had a confirmed Memphis satellite in 2018 (BUSRide profile). If active today, it changes
            which east coast contracts are viable. Toggle to see the difference.
          </p>
        </div>
        <button
          onClick={() => setMemphisActive(!memphisActive)}
          className={`ml-6 shrink-0 w-14 h-7 rounded-full border transition-all relative ${
            memphisActive
              ? "bg-[rgba(74,222,128,.2)] border-[#4ade80]"
              : "bg-white/[0.04] border-white/[0.15]"
          }`}
        >
          <span
            className={`absolute top-0.5 w-6 h-6 rounded-full transition-all ${
              memphisActive ? "left-7 bg-[#4ade80]" : "left-0.5 bg-[#4a4845]"
            }`}
          />
        </button>
        <div className="ml-3 text-[11px] shrink-0">
          {memphisActive
            ? <span className="text-[#4ade80]">Memphis ACTIVE<br/><span className="text-[#7a7870]">Showing distances from Memphis</span></span>
            : <span className="text-[#7a7870]">Memphis UNKNOWN<br/>Showing from Riverside</span>
          }
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label:"Total FTA grants on table", value: fmt(totalFTA), sub:"Announced 2026, RFPs pending" },
          { label:"Viable from Riverside", value: EAST_COAST_OPPS.filter(o=>o.viableFromRiverside).length.toString(), sub:"of " + EAST_COAST_OPPS.length + " identified opportunities" },
          { label:memphisActive ? "Viable with Memphis hub" : "Viable with Memphis hub*", value: EAST_COAST_OPPS.filter(o=>o.viableFromMemphis).length.toString(), sub: memphisActive ? "Memphis toggled ON" : "*if confirmed active" },
        ].map(s => (
          <div key={s.label} className="bg-white/[0.03] border border-white/[0.07] rounded-lg p-3">
            <div className="text-[11px] text-[#7a7870] mb-1">{s.label}</div>
            <div className="text-[20px] font-mono font-medium">{s.value}</div>
            <div className="text-[10px] text-[#4a4845] mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Opportunity cards */}
      {[
        { label:"🔴 Act now", opps: hot },
        { label:"🟡 Monitor — RFP likely Q2/Q3 2026", opps: warm },
        { label:"⚪ Watch — long game", opps: watch },
      ].map(({ label, opps }) => opps.length > 0 && (
        <div key={label}>
          <div className="text-[10px] font-medium uppercase tracking-widest text-[#4a4845] mb-2">{label}</div>
          <div className="space-y-2">
            {opps.map(o => <OppCard key={o.agency} o={o} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HUB EXPANSION ANALYSIS
// ─────────────────────────────────────────────────────────────────────────────

function HubExpansion() {
  const [selected, setSelected] = useState<HubScenario | null>(HUB_SCENARIOS[0]);

  return (
    <div className="space-y-5">

      <div className="bg-[rgba(96,165,250,.06)] border border-[rgba(96,165,250,.2)] rounded-lg p-4">
        <div className="text-[11px] font-medium text-[#60a5fa] mb-1.5">The core question</div>
        <p className="text-[11px] text-[#7a7870] leading-relaxed">
          CCW's West Coast concentration is not a weakness — it's a structural fact.
          Every bus must travel to a repair facility. At $150K/bus rehab, a $12K transport cost is 8% of revenue.
          At $300K/bus (ZEPS conversion), the same transport is 4%. The question is whether the
          <strong className="text-[#e8e6e0]"> east coast market is large enough to justify a satellite facility</strong> —
          and whether CCW already has one sitting dormant in Memphis.
        </p>
      </div>

      {/* Hub cards */}
      <div className="grid grid-cols-2 gap-3">
        {HUB_SCENARIOS.map(hub => (
          <button
            key={hub.city}
            onClick={() => setSelected(selected?.city === hub.city ? null : hub)}
            className={`text-left rounded-lg border p-4 transition-all ${
              selected?.city === hub.city
                ? "bg-white/[0.07] border-white/[0.2]"
                : "bg-white/[0.02] border-white/[0.07] hover:bg-white/[0.05]"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-[13px] font-medium">{hub.city}, {hub.state}</div>
                <div className="text-[10px] text-[#7a7870] mt-0.5">{hub.agenciesUnlocked} agencies unlocked</div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-mono text-[#4ade80]">{hub.annualRevPotential}</div>
                <div className="text-[10px] text-[#7a7870]">annual potential</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div>
                <div className="text-[#4a4845]">Capital cost</div>
                <div className="font-mono text-[#e8e6e0]">{hub.capitalCost}</div>
              </div>
              <div>
                <div className="text-[#4a4845]">Monthly lease</div>
                <div className="font-mono text-[#e8e6e0]">{hub.leasePerMo}</div>
              </div>
              <div>
                <div className="text-[#4a4845]">Market unlocked</div>
                <div className="font-mono text-[#e8e6e0]">{hub.marketUnlocked}</div>
              </div>
              <div>
                <div className="text-[#4a4845]">Payback</div>
                <div className={`font-mono ${hub.paybackYears <= 2 ? "text-[#4ade80]" : hub.paybackYears <= 3 ? "text-[#f59e0b]" : "text-[#94a3b8]"}`}>
                  ~{hub.paybackYears} years
                </div>
              </div>
            </div>
            {selected?.city === hub.city && (
              <div className="mt-3 pt-3 border-t border-white/[0.07]">
                <p className="text-[11px] text-[#7a7870] leading-relaxed">{hub.evidence}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* The Memphis priority call-out */}
      <div className="bg-[rgba(74,222,128,.06)] border border-[rgba(74,222,128,.2)] rounded-lg p-4">
        <div className="text-[12px] font-medium text-[#4ade80] mb-2">Memphis first — before building anything new</div>
        <p className="text-[11px] text-[#7a7870] leading-relaxed mb-3">
          CCW confirmed a Memphis facility in 2018. It may be dormant, not closed.
          Before investing $500K–$2M in a new east coast hub, Dale needs to answer one question:
          <strong className="text-[#e8e6e0]"> Is the Memphis facility still under lease?</strong>
          If yes, reactivating it costs $50K–$150K in equipment and staffing — not $1.5M.
          It would make DART Delaware ($14.3M), NORTA New Orleans ($27.2M), Petersburg VA ($23.8M),
          and the NC cluster ($32M+) all viable immediately.
        </p>
        <div className="grid grid-cols-3 gap-2 text-[10px]">
          {[
            { label:"If Memphis already leased", value:"$50–150K to reactivate", color:"#4ade80" },
            { label:"Contracts unlocked", value:"$70M+ pipeline", color:"#4ade80" },
            { label:"Payback at 10% win rate", value:"< 6 months", color:"#4ade80" },
          ].map(s => (
            <div key={s.label} className="bg-white/[0.03] rounded p-2">
              <div className="text-[#4a4845]">{s.label}</div>
              <div className="font-mono mt-0.5" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

type Tab = "wins" | "east" | "hubs";

export default function ExpansionAnalysis() {
  const [tab, setTab] = useState<Tab>("wins");

  const TABS: { key: Tab; label: string; sub: string }[] = [
    { key:"wins",  label:"Win Analytics",          sub:"Where have we actually won?" },
    { key:"east",  label:"East Coast Opportunities", sub:"What's on the table right now?" },
    { key:"hubs",  label:"Facility Expansion",      sub:"What would it take to go national?" },
  ];

  return (
    <div className="min-h-screen bg-[#0e0f11] text-[#e8e6e0] font-sans">

      {/* Header */}
      <div className="px-6 py-4 border-b border-white/[0.07]">
        <div className="text-[10px] font-medium tracking-widest uppercase text-[#7a7870] mb-0.5">Carson Capital — Fleet Intelligence</div>
        <h1 className="text-[16px] font-medium">Expansion Analysis</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/[0.07]">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-6 py-3 text-left border-b-2 transition-all ${
              tab === t.key
                ? "border-[#4ade80] text-[#e8e6e0]"
                : "border-transparent text-[#7a7870] hover:text-[#e8e6e0]"
            }`}
          >
            <div className="text-[12px] font-medium">{t.label}</div>
            <div className="text-[10px] text-[#4a4845]">{t.sub}</div>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 max-w-5xl">
        {tab === "wins" && <WinAnalytics />}
        {tab === "east" && <EastCoastOpps />}
        {tab === "hubs" && <HubExpansion />}
      </div>
    </div>
  );
}
