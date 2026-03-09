import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Bus Engine launch checklist — checks against real DB state where possible
// Falls back gracefully when DB is not connected

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseConnected = !!(supabaseUrl && serviceRoleKey);

  const checks: Record<string, boolean | null> = {
    supabaseConnected,
    businessInfoComplete: true, // Pre-filled: Complete Coach Works, Riverside CA
    hasVehicle: false,
    hasTechnician: false,
    hasContract: false,
    hasWorkOrder: false,
    hasParts: false,
    hasFinance: false,
    pipelineConfirmed: false,
    nutstackSignoff: false,
  };

  const meta: { goLiveAt?: string | null } = { goLiveAt: null };

  if (supabaseConnected) {
    try {
      const supabase = createClient();

      const [vehicleRes, techRes, contractRes, woRes, partsRes, financeRes] = await Promise.all([
        supabase.from("bus_vehicles").select("id", { count: "exact", head: true }),
        supabase.from("bus_technicians").select("id", { count: "exact", head: true }),
        supabase.from("bus_contracts").select("id", { count: "exact", head: true }),
        supabase.from("bus_work_orders").select("id", { count: "exact", head: true }),
        supabase.from("bus_parts").select("id", { count: "exact", head: true }),
        supabase.from("bus_invoices").select("id", { count: "exact", head: true }),
      ]);

      checks.hasVehicle = (vehicleRes.count ?? 0) > 0;
      checks.hasTechnician = (techRes.count ?? 0) > 0;
      checks.hasContract = (contractRes.count ?? 0) > 0;
      checks.hasWorkOrder = (woRes.count ?? 0) > 0;
      checks.hasParts = (partsRes.count ?? 0) > 0;
      checks.hasFinance = (financeRes.count ?? 0) > 0;
    } catch {
      // DB tables not yet seeded — all checks remain false
    }
  }

  const checkEntries = Object.entries(checks);
  const greenCount = checkEntries.filter(([, v]) => v === true).length;
  const totalCount = checkEntries.length;

  return NextResponse.json({ checks: { ...checks, goLiveAt: meta.goLiveAt }, greenCount, totalCount });
}

export async function POST() {
  // Placeholder — bus engine settings persistence handled via DB migration later
  return NextResponse.json({ ok: true });
}
