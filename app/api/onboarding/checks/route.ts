import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const checks = {
    hasVehicle: false,
    hasTechnician: false,
    hasWorkOrder: false,
  };

  try {
    const supabase = createClient();
    const [vehicleRes, techRes, woRes] = await Promise.all([
      supabase.from("bus_vehicles").select("id", { count: "exact", head: true }),
      supabase.from("bus_technicians").select("id", { count: "exact", head: true }),
      supabase.from("bus_work_orders").select("id", { count: "exact", head: true }),
    ]);

    checks.hasVehicle = (vehicleRes.count ?? 0) > 0;
    checks.hasTechnician = (techRes.count ?? 0) > 0;
    checks.hasWorkOrder = (woRes.count ?? 0) > 0;
  } catch {
    // DB not connected — all false
  }

  return NextResponse.json(checks);
}
