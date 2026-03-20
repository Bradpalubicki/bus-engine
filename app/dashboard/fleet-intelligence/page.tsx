"use client";

/**
 * Fleet Intelligence — Market Opportunity Dashboard
 * Route: /dashboard/fleet-intelligence
 *
 * Drop this file at:
 *   app/dashboard/fleet-intelligence/page.tsx
 *
 * No new dependencies needed — uses React, Tailwind, and inline SVG.
 * Tested against Next.js 14 App Router + Tailwind CSS.
 */

import { useState, useMemo, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type Company = "ccw" | "tsi" | "sbl" | "zeps";
type AgencyStatus = "existing" | "open" | "pre" | "prospect";
type FacilityStatus = "confirmed" | "unknown";
type FilterKey = "all" | "existing" | "open" | "pre" | "large" | "reachable";

interface Agency {
  id: string;
  name: string;
  city: string;
  state: string;
  lat: number;
  lon: number;
  fleet: number;
  companies: Company[];
  status: AgencyStatus;
  contract?: string;
  note?: string;
  ftaGrant?: string;
  ftaAmount?: number;
}

interface Facility {
  name: string;
  lat: number;
  lon: number;
  status: FacilityStatus;
  note: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA — sourced from USAspending.gov API (live pull Mar 19 2026),
//        FTA Federal Register 91 FR 12902, WHYY, Fox8, BUSRide, Mass Transit
// ─────────────────────────────────────────────────────────────────────────────

const FACILITIES: Facility[] = [
  { name: "Riverside CA (HQ)", lat: 33.95, lon: -117.39, status: "confirmed", note: "15 acres, primary production, 350+ staff. All bus rehab work performed here." },
  { name: "Alameda CA", lat: 37.77, lon: -122.27, status: "confirmed", note: "Bay Area delivery/finishing yard. Active for SFMTA $101.7M contract." },
  { name: "Memphis TN", lat: 35.15, lon: -90.05, status: "unknown", note: "Listed 2018. Unconfirmed 2026. If active, DART Delaware becomes viable." },
  { name: "Wisconsin (Fort McCoy area)", lat: 43.95, lon: -90.65, status: "unknown", note: "Listed 2018. Supported Army IDV W911SA04A0020. Unconfirmed 2026." },
  { name: "Arizona / Yuma", lat: 32.7, lon: -114.6, status: "unknown", note: "Listed 2018. SBL Yuma address (2150 E. Lincoln Rd) suggests possible activity." },
  { name: "South TX (El Paso / Del Rio / Laredo / San Benito)", lat: 26.1, lon: -97.7, status: "unknown", note: "4 locations listed 2018. CBP T42 border corridor. Status unconfirmed 2026." },
];

const AGENCIES: Agency[] = [
  // ── CALIFORNIA ──────────────────────────────────────────────────────────
  {
    id: "sfmta", name: "SFMTA", city: "San Francisco", state: "CA",
    lat: 37.78, lon: -122.42, fleet: 700, companies: ["ccw"],
    status: "existing",
    contract: "$101,659,122 — Contract CS-1227 — 219 coaches — CCW was the ONLY bidder. Deliveries ongoing through 2027.",
    note: "CCW's anchor contract. Sole-bid. Confirmed via SAM.gov and SFMTA board records.",
  },
  {
    id: "lbt", name: "Long Beach Transit", city: "Long Beach", state: "CA",
    lat: 33.77, lon: -118.19, fleet: 190, companies: ["ccw"],
    status: "existing",
    contract: "13 × 60ft CNG Xcelsior midlife rehab, Dec 2024. Repeat customer.",
  },
  {
    id: "sunline", name: "SunLine Transit", city: "Palm Springs", state: "CA",
    lat: 33.83, lon: -116.54, fleet: 80, companies: ["ccw"],
    status: "existing",
    contract: "10 × 2020 New Flyer XN40 rehab, Aug 2025.",
  },
  {
    id: "fresno", name: "Fresno Area Express", city: "Fresno", state: "CA",
    lat: 36.74, lon: -119.77, fleet: 115, companies: ["ccw"],
    status: "existing",
    contract: "11 × 40ft CNG buses, 2024.",
  },
  {
    id: "fthill", name: "Foothill Transit", city: "Arcadia", state: "CA",
    lat: 34.09, lon: -117.89, fleet: 330, companies: ["ccw"],
    status: "existing",
    contract: "56 buses repainted. Local to Riverside HQ.",
  },
  {
    id: "avta", name: "AVTA", city: "Lancaster", state: "CA",
    lat: 34.69, lon: -118.14, fleet: 95, companies: ["ccw", "zeps"],
    status: "pre",
    contract: "FTA FY2026 $16,640,000 — Construct O&M facility (D2026-BUSC-102).",
    note: "ZEPS existing customer. Facility grant may precede fleet expansion. Watch for ZEPS follow-on order.",
    ftaGrant: "D2026-BUSC-102", ftaAmount: 16640000,
  },
  {
    id: "octa", name: "OCTA", city: "Orange County", state: "CA",
    lat: 33.74, lon: -117.87, fleet: 550, companies: ["ccw"],
    status: "existing",
    contract: "CCW's first-ever contract (1986) — 175 GMC buses. Origin of the company.",
  },
  {
    id: "lametro", name: "LA Metro", city: "Los Angeles", state: "CA",
    lat: 34.05, lon: -118.25, fleet: 2300, companies: ["ccw", "tsi"],
    status: "prospect",
    note: "Largest CA fleet. 2,300 buses. Natural CCW expansion target — 60 miles from Riverside.",
  },
  {
    id: "sdmts", name: "San Diego MTS", city: "San Diego", state: "CA",
    lat: 32.72, lon: -117.15, fleet: 360, companies: ["tsi"],
    status: "pre",
    contract: "FTA FY2026 $14,680,000 — Construct bus transit center (D2026-BUSC-107).",
    note: "Large fleet, 100 miles from Riverside. Facility grant may precede fleet refresh.",
    ftaGrant: "D2026-BUSC-107", ftaAmount: 14680000,
  },
  {
    id: "rtcsnv", name: "RTC Southern Nevada", city: "Las Vegas", state: "NV",
    lat: 36.17, lon: -115.14, fleet: 440, companies: ["tsi", "ccw"],
    status: "pre",
    contract: "FTA FY2026 $8,843,449 — Replacement buses + equipment (D2026-BUSC-122).",
    note: "270 miles from Riverside. Large desert fleet. Bus replacement = TSI, rehab = CCW candidate.",
    ftaGrant: "D2026-BUSC-122", ftaAmount: 8843449,
  },
  // ── WASHINGTON ──────────────────────────────────────────────────────────
  {
    id: "everett", name: "Everett Transit", city: "Everett", state: "WA",
    lat: 47.97, lon: -122.20, fleet: 55, companies: ["ccw"],
    status: "existing",
    contract: "5 × 35ft Gillig via WA State DES cooperative, Aug 2024.",
    note: "WA State DES coop allows agencies to buy without competitive RFP.",
  },
  {
    id: "kitsap", name: "Kitsap Transit", city: "Bremerton", state: "WA",
    lat: 47.56, lon: -122.63, fleet: 110, companies: ["ccw"],
    status: "pre",
    contract: "FTA FY2026 $15,000,000 — Construct driver training facility (D2026-BUSC-133).",
    note: "WA State agency — CCW can access via DES coop. Facility grant may precede fleet refresh.",
    ftaGrant: "D2026-BUSC-133", ftaAmount: 15000000,
  },
  // ── OREGON ──────────────────────────────────────────────────────────────
  {
    id: "trimet", name: "TriMet", city: "Portland", state: "OR",
    lat: 45.52, lon: -122.68, fleet: 680, companies: ["ccw", "zeps"],
    status: "existing",
    contract: "ZEPS fleet transfer documented in FTA grant OR-2019-045. Josephine County received 4 TriMet ZEPS buses refurbed at Riverside CA.",
  },
  {
    id: "josephine", name: "Josephine County Transit", city: "Grants Pass", state: "OR",
    lat: 42.44, lon: -123.33, fleet: 12, companies: ["zeps"],
    status: "existing",
    contract: "7 ZEPS buses — 3 active, 4 being refurbed at Riverside CA. FTA grant OR-2019-045 ($2.5M).",
    note: "FTA grant narrative explicitly states: 'vehicles will be transported to the CCW manufacturing facility in Riverside CA.' Only public document confirming transport logistics.",
  },
  // ── NEW YORK ────────────────────────────────────────────────────────────
  {
    id: "rts", name: "Rochester RTS (RGRTA)", city: "Rochester", state: "NY",
    lat: 43.16, lon: -77.61, fleet: 285, companies: ["ccw"],
    status: "existing",
    contract: "5 buses via WA State DES cooperative, Aug 2025.",
    note: "Furthest confirmed east CCW rehab. 2,700 mi from Riverside. Small coop order justifies transport at this scale.",
  },
  {
    id: "mta", name: "MTA New York City", city: "New York City", state: "NY",
    lat: 40.71, lon: -74.01, fleet: 5800, companies: ["tsi"],
    status: "prospect",
    note: "Largest US transit bus fleet. 3,000 miles from Riverside — CCW rehab not viable. TSI used bus sales only.",
  },
  {
    id: "cnyrta", name: "Centro (CNYRTA)", city: "Syracuse", state: "NY",
    lat: 43.05, lon: -76.15, fleet: 140, companies: ["tsi"],
    status: "pre",
    contract: "FTA FY2026 $28,800,000 — Construct bus maintenance, storage & admin facility (D2026-BUSC-123).",
    ftaGrant: "D2026-BUSC-123", ftaAmount: 28800000,
  },
  {
    id: "nfta", name: "NFTA Metro", city: "Buffalo", state: "NY",
    lat: 42.88, lon: -78.88, fleet: 220, companies: ["tsi"],
    status: "pre",
    contract: "FTA FY2026 $21,600,000 — Rehabilitate three bus facilities (D2026-BUSC-125).",
    ftaGrant: "D2026-BUSC-125", ftaAmount: 21600000,
  },
  // ── DELAWARE — HOT ──────────────────────────────────────────────────────
  {
    id: "dart", name: "DART First State", city: "Wilmington", state: "DE",
    lat: 39.74, lon: -75.55, fleet: 250, companies: ["ccw", "tsi"],
    status: "pre",
    contract: "FTA FY2026 $14,260,000 — Rehabilitate 51 buses (D2026-BUSC-108). RFP NOT YET ISSUED as of Mar 19 2026.",
    note: "Agency confirmed $150K/bus rehab budget. 2,600 mi from Riverside. Transport ~$510K for 51 buses (6.7% of budget). CCW viable ONLY if Memphis TN satellite is active. Patrick Scully should call Delaware Transit today.",
    ftaGrant: "D2026-BUSC-108", ftaAmount: 14260000,
  },
  // ── LOUISIANA — HOT ─────────────────────────────────────────────────────
  {
    id: "norta", name: "NORTA", city: "New Orleans", state: "LA",
    lat: 29.95, lon: -90.07, fleet: 160, companies: ["tsi", "sbl"],
    status: "pre",
    contract: "FTA FY2026 $27,200,000 — Replacement buses + rehabilitate 2 O&M facilities (D2026-BUSC-114).",
    note: "Bus replacement = TSI used buses. SBL can provide gap leasing while new buses on order. New RTA board just appointed — governance reset creates vendor opening.",
    ftaGrant: "D2026-BUSC-114", ftaAmount: 27200000,
  },
  // ── VIRGINIA ────────────────────────────────────────────────────────────
  {
    id: "petersburg", name: "Petersburg Area Transit", city: "Petersburg", state: "VA",
    lat: 37.23, lon: -77.40, fleet: 25, companies: ["tsi"],
    status: "pre",
    contract: "FTA FY2026 $23,820,750 — Replacement buses + O&M facility (D2026-BUSC-131).",
    ftaGrant: "D2026-BUSC-131", ftaAmount: 23820750,
  },
  {
    id: "hampton", name: "Hampton Roads Transit", city: "Hampton", state: "VA",
    lat: 37.03, lon: -76.34, fleet: 205, companies: ["tsi"],
    status: "pre",
    contract: "FTA FY2026 $10,620,000 — Purchase replacement buses (D2026-BUSC-132).",
    ftaGrant: "D2026-BUSC-132", ftaAmount: 10620000,
  },
  // ── INDIANA ─────────────────────────────────────────────────────────────
  {
    id: "indygo", name: "IndyGo", city: "Indianapolis", state: "IN",
    lat: 39.77, lon: -86.16, fleet: 185, companies: ["zeps"],
    status: "existing",
    contract: "21 ZEPS buses, 2015 — largest single ZEPS deployment ever.",
    note: "Proves CCW/ZEPS can execute east of the Mississippi. 1,900 miles from Riverside.",
  },
  // ── MARYLAND ────────────────────────────────────────────────────────────
  {
    id: "transit_fred", name: "TransIT Frederick", city: "Frederick", state: "MD",
    lat: 39.41, lon: -77.41, fleet: 45, companies: ["zeps"],
    status: "existing",
    contract: "5 ZEPS buses. FTA FY2026 $336,000 replacement vehicle grant (D2026-BUSC-115).",
    note: "Existing ZEPS customer. Small fleet. Watch for ZEPS follow-on as fleet ages.",
    ftaGrant: "D2026-BUSC-115", ftaAmount: 336000,
  },
  // ── TEXAS ───────────────────────────────────────────────────────────────
  {
    id: "mcallen", name: "McAllen Metro", city: "McAllen", state: "TX",
    lat: 26.20, lon: -98.23, fleet: 35, companies: ["zeps", "sbl"],
    status: "existing",
    contract: "2 ZEPS buses + WAVE wireless charging. SBL CBP border corridor operations.",
  },
  // ── ILLINOIS ────────────────────────────────────────────────────────────
  {
    id: "cta", name: "CTA", city: "Chicago", state: "IL",
    lat: 41.88, lon: -87.63, fleet: 1750, companies: ["tsi"],
    status: "prospect",
    note: "2nd largest US bus fleet. Midwest Bus competitor home turf. 2,000+ mi from Riverside. TSI used bus sales only.",
  },
  // ── MASSACHUSETTS ────────────────────────────────────────────────────────
  {
    id: "mbta", name: "MBTA", city: "Boston", state: "MA",
    lat: 42.36, lon: -71.06, fleet: 1000, companies: ["tsi"],
    status: "prospect",
    note: "Large fleet. NEBR competitor home turf. 3,000 mi from Riverside. TSI only.",
  },
  {
    id: "srta", name: "SRTA", city: "New Bedford", state: "MA",
    lat: 41.64, lon: -70.93, fleet: 85, companies: ["tsi"],
    status: "open",
    contract: "RFP 26-01 OPEN — Joint procurement heavy-duty transit buses — Due May 8 2026.",
    note: "Verify if used/remanufactured buses qualify under spec. CalACT/MBTA joint procurement — multiple agencies can piggyback on result.",
  },
  // ── NORTH CAROLINA ──────────────────────────────────────────────────────
  {
    id: "durham", name: "Durham Transit", city: "Durham", state: "NC",
    lat: 35.99, lon: -78.90, fleet: 65, companies: ["tsi"],
    status: "pre",
    contract: "FTA FY2026 $6,142,400 — Replacement buses (D2026-BUSC-118).",
    ftaGrant: "D2026-BUSC-118", ftaAmount: 6142400,
  },
  {
    id: "chapel_hill", name: "Chapel Hill Transit", city: "Chapel Hill", state: "NC",
    lat: 35.91, lon: -79.05, fleet: 70, companies: ["tsi"],
    status: "pre",
    contract: "FTA FY2026 $8,802,268 — Replacement vehicles + safety equipment (D2026-BUSC-120).",
    ftaGrant: "D2026-BUSC-120", ftaAmount: 8802268,
  },
  // ── MISSOURI ────────────────────────────────────────────────────────────
  {
    id: "kcata", name: "Kansas City Area TA", city: "Kansas City", state: "MO",
    lat: 39.10, lon: -94.58, fleet: 200, companies: ["tsi"],
    status: "pre",
    contract: "FTA FY2026 $13,333,000 — Replacement buses + facility rehab (D2026-BUSC-117).",
    note: "Bus replacement component = TSI opportunity. CCW geography marginal at 1,600 mi.",
    ftaGrant: "D2026-BUSC-117", ftaAmount: 13333000,
  },
  {
    id: "springfield", name: "City Utilities Springfield", city: "Springfield", state: "MO",
    lat: 37.21, lon: -93.29, fleet: 55, companies: ["ccw"],
    status: "existing",
    contract: "7 × 35ft buses. Historical CCW win in Midwest.",
  },
  // ── IOWA ────────────────────────────────────────────────────────────────
  {
    id: "dart_dsm", name: "Des Moines Area RTA", city: "Des Moines", state: "IA",
    lat: 41.59, lon: -93.62, fleet: 130, companies: ["ccw", "tsi"],
    status: "pre",
    contract: "FTA FY2026 $20,000,000 — Expand bus facility (D2026-BUSC-112). Historical CCW customer (6 bus rebuilds 2015).",
    ftaGrant: "D2026-BUSC-112", ftaAmount: 20000000,
  },
  // ── FLORIDA ─────────────────────────────────────────────────────────────
  {
    id: "pasco", name: "Pasco County / Zephyrhills", city: "Zephyrhills", state: "FL",
    lat: 28.23, lon: -82.18, fleet: 55, companies: ["zeps"],
    status: "existing",
    contract: "Multiple ZEPS FTA grants 2018–2025. ~$7.8M total. Long-term customer.",
  },
  {
    id: "gainesville", name: "City of Gainesville", city: "Gainesville", state: "FL",
    lat: 29.65, lon: -82.32, fleet: 70, companies: ["tsi"],
    status: "pre",
    contract: "FTA FY2026 $10,263,750 — Replacement buses + transfer station + bus stops (D2026-BUSC-109).",
    ftaGrant: "D2026-BUSC-109", ftaAmount: 10263750,
  },
  {
    id: "lynx", name: "LYNX", city: "Orlando", state: "FL",
    lat: 28.54, lon: -81.38, fleet: 290, companies: ["tsi"],
    status: "pre",
    contract: "FTA FY2026 $9,270,640 — Purchase replacement buses (D2026-BUSC-110).",
    ftaGrant: "D2026-BUSC-110", ftaAmount: 9270640,
  },
  // ── HAWAII ──────────────────────────────────────────────────────────────
  {
    id: "honolulu", name: "Honolulu DTS", city: "Honolulu", state: "HI",
    lat: 21.31, lon: -157.86, fleet: 530, companies: ["ccw", "tsi"],
    status: "pre",
    contract: "FTA FY2026 $11,569,965 — Replacement buses + equipment (D2026-BUSC-111).",
    note: "CCW has historical roots in Hawaii — Dale Carson's career began with a 91-bus Honolulu project in 1983–85. Large island fleet. Ship lanes make transport predictable.",
    ftaGrant: "D2026-BUSC-111", ftaAmount: 11569965,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GEO HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function project(lat: number, lon: number): { x: number; y: number } {
  // Simple equirectangular for CONUS + HI/AK approximation
  if (lat < 25 && lon < -150) return { x: 150, y: 530 }; // HI
  const x = (lon + 130) * (700 / 60) + 70;
  const y = (55 - lat) * (460 / 30) + 60;
  return { x, y };
}

function distMiles(lat: number, lon: number): number {
  const rlat = 33.95, rlon = -117.39;
  const dlat = ((lat - rlat) * Math.PI) / 180;
  const dlon = ((lon - rlon) * Math.PI) / 180;
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos((lat * Math.PI) / 180) *
      Math.cos((rlat * Math.PI) / 180) *
      Math.sin(dlon / 2) ** 2;
  return Math.round(3959 * 2 * Math.asin(Math.sqrt(a)));
}

function transportCostStr(miles: number): string {
  if (miles < 200) return "$500–1,500";
  if (miles < 600) return "$2,000–4,000";
  if (miles < 1200) return "$4,000–6,000";
  if (miles < 2000) return "$6,000–10,000";
  return "$10,000–14,000";
}

function reachZone(miles: number): "core" | "extended" | "outside" {
  if (miles < 800) return "core";
  if (miles < 1800) return "extended";
  return "outside";
}

function dotRadius(fleet: number): number {
  if (fleet > 3000) return 14;
  if (fleet > 1000) return 11;
  if (fleet > 400) return 9;
  if (fleet > 150) return 7;
  if (fleet > 50) return 6;
  return 5;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPANY CONFIG
// ─────────────────────────────────────────────────────────────────────────────

const CO: Record<Company, { label: string; color: string; bg: string; border: string; desc: string }> = {
  ccw:  { label: "CCW",  color: "#4ade80", bg: "rgba(74,222,128,.08)",  border: "rgba(74,222,128,.35)",  desc: "Bus rehab — facility required" },
  tsi:  { label: "TSI",  color: "#60a5fa", bg: "rgba(96,165,250,.08)",  border: "rgba(96,165,250,.35)",  desc: "Used bus sales — ships anywhere" },
  sbl:  { label: "SBL",  color: "#f59e0b", bg: "rgba(245,158,11,.08)",  border: "rgba(245,158,11,.35)",  desc: "Bus leasing — ships anywhere" },
  zeps: { label: "ZEPS", color: "#a78bfa", bg: "rgba(167,139,250,.08)", border: "rgba(167,139,250,.35)", desc: "Electric conversion — facility required" },
};

function agencyDotColor(a: Agency, activeSet: Set<Company>): string {
  if (a.status === "open" || a.status === "pre") return "#f87171";
  const ordered: Company[] = ["ccw", "zeps", "sbl", "tsi"];
  for (const co of ordered) {
    if (a.companies.includes(co) && activeSet.has(co)) return CO[co].color;
  }
  return "#64748b";
}

// ─────────────────────────────────────────────────────────────────────────────
// PILL COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function Pill({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) {
  return (
    <span
      style={{ color, background: bg, border: `1px solid ${border}` }}
      className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded"
    >
      {label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function FleetIntelligencePage() {
  const [activeCompanies, setActiveCompanies] = useState<Set<Company>>(
    new Set(["ccw", "tsi", "sbl", "zeps"])
  );
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleCo = useCallback((co: Company) => {
    setActiveCompanies((prev) => {
      const next = new Set(prev);
      if (next.has(co) && next.size > 1) next.delete(co);
      else next.add(co);
      return next;
    });
  }, []);

  const visible = useMemo(() => {
    return AGENCIES.filter((a) => {
      if (!a.companies.some((c) => activeCompanies.has(c))) return false;
      if (activeFilter === "existing" && a.status !== "existing") return false;
      if (activeFilter === "open" && a.status !== "open") return false;
      if (activeFilter === "pre" && a.status !== "pre") return false;
      if (activeFilter === "large" && a.fleet < 500) return false;
      if (activeFilter === "reachable" && distMiles(a.lat, a.lon) >= 1800) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !a.name.toLowerCase().includes(q) &&
          !a.city.toLowerCase().includes(q) &&
          !a.state.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [activeCompanies, activeFilter, search]);

  const byState = useMemo(() => {
    const map: Record<string, Agency[]> = {};
    visible.forEach((a) => {
      (map[a.state] = map[a.state] || []).push(a);
    });
    return Object.keys(map)
      .sort()
      .map((s) => ({ state: s, agencies: map[s] }));
  }, [visible]);

  const totalFleet = useMemo(() => visible.reduce((s, a) => s + a.fleet, 0), [visible]);
  const openCount = useMemo(() => visible.filter((a) => a.status === "open" || a.status === "pre").length, [visible]);
  const grantTotal = useMemo(() => visible.reduce((s, a) => s + (a.ftaAmount || 0), 0), [visible]);

  const selected = selectedId ? AGENCIES.find((a) => a.id === selectedId) : null;

  const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All" },
    { key: "existing", label: "Existing clients" },
    { key: "open", label: "Open RFPs" },
    { key: "pre", label: "Pre-RFP" },
    { key: "large", label: "Fleet 500+" },
    { key: "reachable", label: "CCW reachable" },
  ];

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen bg-[#0e0f11] text-[#e8e6e0] font-sans overflow-hidden">

      {/* ── HEADER ── */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-white/[0.07] shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-medium tracking-widest uppercase text-[#7a7870]">
            Carson Capital
          </span>
          <span className="text-[14px] font-medium">Fleet Intelligence</span>
        </div>
        <div className="flex gap-2">
          {(Object.keys(CO) as Company[]).map((co) => (
            <button
              key={co}
              onClick={() => toggleCo(co)}
              style={{
                color: CO[co].color,
                borderColor: CO[co].border,
                background: activeCompanies.has(co) ? CO[co].bg : "transparent",
                opacity: activeCompanies.has(co) ? 1 : 0.35,
              }}
              className="text-[10px] font-mono font-medium px-2.5 py-1 rounded border transition-all"
            >
              {CO[co].label}
            </button>
          ))}
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT PANEL ── */}
        <aside className="w-[310px] shrink-0 border-r border-white/[0.07] flex flex-col overflow-hidden">

          {/* Search */}
          <div className="px-3 py-2.5 border-b border-white/[0.07]">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search agencies, cities, states…"
              className="w-full bg-white/[0.05] border border-white/[0.08] rounded-md px-3 py-1.5 text-[11px] text-[#e8e6e0] placeholder-[#4a4845] outline-none focus:border-white/[0.18] transition-colors"
            />
          </div>

          {/* Stat row */}
          <div className="flex border-b border-white/[0.07] shrink-0">
            {[
              { v: visible.length, l: "Agencies" },
              { v: totalFleet.toLocaleString(), l: "Buses" },
              { v: openCount, l: "Opportunities" },
              { v: grantTotal > 0 ? "$" + (grantTotal / 1e6).toFixed(0) + "M" : "—", l: "FTA grants" },
            ].map((s) => (
              <div key={s.l} className="flex-1 py-2 text-center border-r border-white/[0.07] last:border-r-0">
                <div className="text-[13px] font-mono font-medium">{s.v}</div>
                <div className="text-[9px] text-[#7a7870] uppercase tracking-wider mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-1.5 px-3 py-2 border-b border-white/[0.07] shrink-0">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`text-[10px] font-medium px-2 py-1 rounded border transition-all whitespace-nowrap ${
                  activeFilter === f.key
                    ? "bg-white/[0.08] border-white/[0.18] text-[#e8e6e0]"
                    : "bg-white/[0.03] border-white/[0.07] text-[#7a7870] hover:text-[#e8e6e0]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Agency list */}
          <div className="flex-1 overflow-y-auto">
            {byState.map(({ state, agencies }) => (
              <div key={state} className="border-b border-white/[0.05]">
                <div className="px-3 py-1.5 flex justify-between items-center sticky top-0 bg-[#0e0f11] z-10">
                  <span className="text-[9px] font-medium uppercase tracking-widest text-[#4a4845]">{state}</span>
                  <span className="text-[9px] font-mono text-[#4a4845]">
                    {agencies.length} · {agencies.reduce((s, a) => s + a.fleet, 0).toLocaleString()} buses
                  </span>
                </div>
                {agencies.map((a) => {
                  const d = distMiles(a.lat, a.lon);
                  const zone = reachZone(d);
                  const isSelected = selectedId === a.id;
                  return (
                    <button
                      key={a.id}
                      onClick={() => setSelectedId(isSelected ? null : a.id)}
                      className={`w-full text-left px-3 py-2 flex items-start justify-between gap-2 border-l-2 transition-all hover:bg-white/[0.03] ${
                        isSelected
                          ? "bg-white/[0.05] border-l-[#4ade80]"
                          : "border-l-transparent"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="text-[11px] font-medium text-[#e8e6e0] truncate">{a.name}</div>
                        <div className="text-[10px] text-[#7a7870] mt-0.5">
                          {a.city} ·{" "}
                          <span
                            className={
                              zone === "core"
                                ? "text-[#4ade80]"
                                : zone === "extended"
                                ? "text-[#f59e0b]"
                                : "text-[#f87171]"
                            }
                          >
                            {d.toLocaleString()} mi
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        {(a.status === "open" || a.status === "pre") && (
                          <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded border border-[rgba(248,113,113,.3)] bg-[rgba(248,113,113,.06)] text-[#f87171]">
                            {a.status === "open" ? "RFP" : "PRE"}
                          </span>
                        )}
                        <div className="flex gap-1">
                          {a.companies
                            .filter((c) => activeCompanies.has(c))
                            .map((c) => (
                              <span
                                key={c}
                                style={{ color: CO[c].color, borderColor: CO[c].border, background: CO[c].bg }}
                                className="text-[9px] font-mono px-1 py-0.5 rounded border"
                              >
                                {c.toUpperCase()}
                              </span>
                            ))}
                        </div>
                        {a.fleet > 0 && (
                          <span className="text-[9px] font-mono text-[#4a4845]">{a.fleet.toLocaleString()}</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
            {visible.length === 0 && (
              <div className="text-[12px] text-[#4a4845] text-center py-12">No agencies match filters</div>
            )}
          </div>
        </aside>

        {/* ── MAP PANEL ── */}
        <div className="flex-1 relative overflow-hidden">
          <svg
            viewBox="0 0 960 600"
            className="w-full h-full"
            style={{ background: "#0e0f11" }}
          >
            {/* State rect backgrounds */}
            {Object.entries({
              AL:{x:600,y:380,w:50,h:60},AK:{x:80,y:490,w:80,h:60},
              AZ:{x:175,y:340,w:65,h:70},AR:{x:545,y:355,w:55,h:50},
              CA:{x:90,y:270,w:75,h:130},CO:{x:260,y:290,w:70,h:55},
              CT:{x:760,y:200,w:22,h:18},DE:{x:742,y:228,w:14,h:18},
              FL:{x:618,y:430,w:82,h:90},GA:{x:628,y:385,w:60,h:65},
              HI:{x:260,y:510,w:80,h:40},ID:{x:195,y:175,w:60,h:80},
              IL:{x:555,y:260,w:48,h:75},IN:{x:580,y:265,w:38,h:60},
              IA:{x:505,y:225,w:65,h:50},KS:{x:418,y:300,w:75,h:50},
              KY:{x:590,y:300,w:80,h:35},LA:{x:528,y:415,w:60,h:55},
              ME:{x:775,y:130,w:38,h:48},MD:{x:710,y:225,w:48,h:23},
              MA:{x:758,y:178,w:48,h:22},MI:{x:578,y:195,w:70,h:65},
              MN:{x:488,y:155,w:70,h:70},MS:{x:558,y:385,w:45,h:65},
              MO:{x:510,y:295,w:68,h:60},MT:{x:243,y:145,w:95,h:60},
              NE:{x:413,y:255,w:80,h:50},NV:{x:143,y:235,w:65,h:85},
              NH:{x:755,y:162,w:23,h:38},NJ:{x:735,y:218,w:23,h:33},
              NM:{x:253,y:360,w:70,h:70},NY:{x:693,y:175,w:80,h:50},
              NC:{x:658,y:315,w:92,h:40},ND:{x:413,y:155,w:80,h:50},
              OH:{x:618,y:248,w:55,h:55},OK:{x:413,y:345,w:80,h:50},
              OR:{x:103,y:185,w:82,h:65},PA:{x:678,y:212,w:70,h:40},
              RI:{x:765,y:193,w:13,h:13},SC:{x:658,y:350,w:55,h:45},
              SD:{x:413,y:200,w:80,h:55},TN:{x:562,y:330,w:92,h:35},
              TX:{x:338,y:370,w:123,h:112},UT:{x:198,y:260,w:65,h:75},
              VT:{x:745,y:158,w:18,h:38},VA:{x:668,y:280,w:87,h:40},
              WA:{x:118,y:145,w:82,h:55},WV:{x:647,y:265,w:38,h:40},
              WI:{x:528,y:195,w:55,h:60},WY:{x:268,y:215,w:82,h:60},
            }).map(([st, c]) => (
              <g key={st}>
                <rect
                  x={c.x} y={c.y} width={c.w} height={c.h} rx={2}
                  fill="#1a1c1f" stroke="#23262b" strokeWidth={0.5}
                />
                <text
                  x={c.x + c.w / 2} y={c.y + c.h / 2 + 3}
                  textAnchor="middle" fill="#2e3035"
                  fontSize={8} fontFamily="DM Mono, monospace"
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {st}
                </text>
              </g>
            ))}

            {/* Riverside reach rings */}
            {[600, 1500].map((mi, i) => {
              const rx = mi * (700 / 60) / 69;
              const { x, y } = project(33.95, -117.39);
              return (
                <ellipse
                  key={mi}
                  cx={x} cy={y} rx={rx} ry={rx * 0.75}
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth={0.75}
                  strokeDasharray="4 3"
                  opacity={i === 0 ? 0.2 : 0.1}
                />
              );
            })}

            {/* Facility markers */}
            {FACILITIES.filter((f) => !(f.lat < 25)).map((f) => {
              const { x, y } = project(f.lat, f.lon);
              return (
                <rect
                  key={f.name}
                  x={x - 5} y={y - 5} width={10} height={10}
                  rx={1}
                  fill={f.status === "confirmed" ? "#e8e6e0" : "#2e3035"}
                  stroke={f.status === "confirmed" ? "#4ade80" : "#4a4845"}
                  strokeWidth={1.5}
                  transform={`rotate(45 ${x} ${y})`}
                  style={{ pointerEvents: "none" }}
                />
              );
            })}

            {/* Agency dots */}
            {visible.map((a) => {
              const { x, y } = project(a.lat, a.lon);
              const r = dotRadius(a.fleet);
              const color = agencyDotColor(a, activeCompanies);
              const isHot = a.status === "open" || a.status === "pre";
              const isSelected = selectedId === a.id;
              const isHovered = hoveredId === a.id;
              return (
                <g
                  key={a.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedId(selectedId === a.id ? null : a.id)}
                  onMouseEnter={() => setHoveredId(a.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {isHot && (
                    <circle
                      cx={x} cy={y} r={r + 5}
                      fill="none" stroke={color}
                      strokeWidth={1} opacity={0.35}
                    />
                  )}
                  {(isSelected || isHovered) && (
                    <circle
                      cx={x} cy={y} r={r + 4}
                      fill="none" stroke={color}
                      strokeWidth={1.5} opacity={0.5}
                    />
                  )}
                  <circle
                    cx={x} cy={y} r={r}
                    fill={color}
                    opacity={isSelected ? 1 : isHovered ? 0.95 : 0.75}
                  />
                </g>
              );
            })}
          </svg>

          {/* Map legend */}
          <div className="absolute bottom-4 left-4 bg-[rgba(14,15,17,0.88)] border border-white/[0.1] rounded-lg px-3 py-2.5 text-[10px] backdrop-blur-sm">
            {(Object.keys(CO) as Company[]).map((c) => (
              <div key={c} className="flex items-center gap-2 mb-1.5 last:mb-0 text-[#7a7870]">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: CO[c].color }} />
                <span>{CO[c].label} — {CO[c].desc}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-1.5 text-[#7a7870]">
              <span className="w-2 h-2 rounded-full shrink-0 bg-[#f87171]" />
              <span>Open contract / Pre-RFP</span>
            </div>
            <div className="border-t border-white/[0.07] mt-2 pt-2 text-[#4a4845]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 shrink-0" style={{ background: "transparent", border: "1px dashed #4ade80", borderRadius: "50%" }} />
                <span>CCW reach zones (600 mi / 1,500 mi)</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 shrink-0 rotate-45 border border-[#4ade80]" style={{ background: "#e8e6e0" }} />
                <span>CCW facility (confirmed / unknown)</span>
              </div>
            </div>
          </div>

          {/* Hovered tooltip */}
          {hoveredId && !selectedId && (() => {
            const a = AGENCIES.find((ag) => ag.id === hoveredId);
            if (!a) return null;
            const d = distMiles(a.lat, a.lon);
            const { x, y } = project(a.lat, a.lon);
            // Position relative to viewport — use SVG coords converted to %
            const svgW = 960, svgH = 600;
            const pctX = (x / svgW) * 100;
            const pctY = (y / svgH) * 100;
            return (
              <div
                className="absolute pointer-events-none bg-[#1e2023] border border-white/[0.12] rounded-lg px-3 py-2.5 text-[11px] max-w-[210px] z-20 shadow-xl"
                style={{ left: `${Math.min(pctX + 2, 70)}%`, top: `${Math.min(pctY, 70)}%` }}
              >
                <div className="font-medium text-[12px] mb-1">{a.name} — {a.state}</div>
                <div className="flex justify-between gap-4 text-[#7a7870]">
                  <span>Fleet</span>
                  <span className="font-mono text-[#e8e6e0]">{a.fleet.toLocaleString()} buses</span>
                </div>
                <div className="flex justify-between gap-4 text-[#7a7870]">
                  <span>From Riverside</span>
                  <span className="font-mono text-[#e8e6e0]">{d.toLocaleString()} mi</span>
                </div>
                <div className="flex justify-between gap-4 text-[#7a7870]">
                  <span>Transport/bus</span>
                  <span className="font-mono text-[#e8e6e0]">{transportCostStr(d)}</span>
                </div>
              </div>
            );
          })()}

          {/* Selected detail panel */}
          {selected && (() => {
            const d = distMiles(selected.lat, selected.lon);
            const zone = reachZone(d);
            const zoneColor = zone === "core" ? "text-green-400" : zone === "extended" ? "text-amber-400" : "text-red-400";
            const zoneLabel = zone === "core" ? "Within CCW core zone" : zone === "extended" ? "Extended reach — higher transport" : "Outside practical CCW rehab range";
            return (
              <div className="absolute right-0 top-0 bottom-0 w-[280px] bg-[#161719] border-l border-white/[0.1] overflow-y-auto p-4 z-30">
                <button
                  onClick={() => setSelectedId(null)}
                  className="float-right text-[#7a7870] hover:text-[#e8e6e0] text-lg leading-none px-1"
                >
                  ×
                </button>
                <h3 className="text-[14px] font-medium pr-5 mb-0.5">{selected.name}</h3>
                <p className="text-[11px] text-[#7a7870] mb-3">{selected.city}, {selected.state}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {selected.companies.map((c) => (
                    <Pill key={c} {...CO[c]} label={c.toUpperCase()} />
                  ))}
                  {selected.status === "open" && (
                    <Pill label="RFP OPEN" color="#f87171" bg="rgba(248,113,113,.08)" border="rgba(248,113,113,.3)" />
                  )}
                  {selected.status === "pre" && (
                    <Pill label="PRE-RFP" color="#fb923c" bg="rgba(251,146,60,.08)" border="rgba(251,146,60,.3)" />
                  )}
                  {selected.status === "existing" && (
                    <Pill label="EXISTING" color="#4ade80" bg="rgba(74,222,128,.08)" border="rgba(74,222,128,.3)" />
                  )}
                </div>

                <div className="mb-3">
                  <div className="text-[9px] uppercase tracking-widest text-[#4a4845] font-medium mb-2">Fleet & Geography</div>
                  {[
                    { l: "Bus fleet", v: `${selected.fleet.toLocaleString()} buses` },
                    { l: "From Riverside CA", v: `${d.toLocaleString()} mi` },
                    { l: "Transport cost / bus", v: transportCostStr(d) },
                  ].map(({ l, v }) => (
                    <div key={l} className="flex justify-between py-1.5 border-b border-white/[0.06] text-[11px]">
                      <span className="text-[#7a7870]">{l}</span>
                      <span className="font-mono">{v}</span>
                    </div>
                  ))}
                  <p className={`text-[10px] mt-2 ${zoneColor}`}>{zoneLabel}</p>
                </div>

                {selected.contract && (
                  <div className="mb-3">
                    <div className="text-[9px] uppercase tracking-widest text-[#4a4845] font-medium mb-1.5">Contract / Opportunity</div>
                    <p className="text-[11px] text-[#7a7870] bg-white/[0.04] rounded-md p-2.5 leading-relaxed">
                      {selected.contract}
                    </p>
                  </div>
                )}

                {selected.note && (
                  <div className="mb-3">
                    <div className="text-[9px] uppercase tracking-widest text-[#4a4845] font-medium mb-1.5">Analysis</div>
                    <p className="text-[11px] text-[#7a7870] bg-white/[0.04] rounded-md p-2.5 leading-relaxed">
                      {selected.note}
                    </p>
                  </div>
                )}

                {selected.ftaGrant && (
                  <div className="text-[10px] font-mono text-[#4a4845] mt-2">
                    FTA Grant ID: {selected.ftaGrant}
                    {selected.ftaAmount && (
                      <span className="ml-2 text-[#7a7870]">
                        ${(selected.ftaAmount / 1e6).toFixed(2)}M
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
