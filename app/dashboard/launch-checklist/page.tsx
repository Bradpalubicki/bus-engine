"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CheckCircle2, XCircle, Rocket, RefreshCw, AlertTriangle,
  Building2, Bus, Users, ClipboardList, DollarSign, Settings, Lock,
} from "lucide-react";

interface ChecklistItem {
  key: string;
  label: string;
  description: string;
  group: string;
  link?: string;
  manual?: boolean;
}

const CHECKLIST: ChecklistItem[] = [
  // Setup
  { key: "supabaseConnected",    label: "Supabase connected",           description: "Database URL configured and reachable",                    group: "Setup",      link: "/dashboard/settings" },
  { key: "businessInfoComplete", label: "Company info complete",         description: "Name, phone, and address all filled in",                   group: "Setup",      link: "/dashboard/settings" },
  // Fleet
  { key: "hasVehicle",           label: "At least 1 vehicle added",      description: "First bus or coach in the fleet",                          group: "Fleet",      link: "/dashboard/fleet" },
  // Team
  { key: "hasTechnician",        label: "At least 1 technician added",   description: "First technician profile created",                         group: "Team",       link: "/dashboard/technicians" },
  // Operations
  { key: "hasContract",          label: "First contract added",          description: "At least 1 client contract in the system",                 group: "Operations", link: "/dashboard/contracts" },
  { key: "hasWorkOrder",         label: "Test work order created",       description: "At least 1 work order to confirm workflow works",          group: "Operations", link: "/dashboard/work-orders" },
  { key: "hasParts",             label: "Parts inventory initialized",   description: "At least 1 part or consumable logged",                     group: "Operations", link: "/dashboard/parts" },
  { key: "hasFinance",           label: "Finance/invoicing set up",      description: "At least 1 invoice or contract billing entry",             group: "Finance",    link: "/dashboard/finance" },
  // Go-Live
  { key: "pipelineConfirmed",    label: "Pipeline stages confirmed",     description: "Contract pipeline stages match actual business workflow",   group: "Go-Live",    link: "/dashboard/pipeline" },
  { key: "nutstackSignoff",      label: "NuStack sign-off",              description: "NuStack confirms everything is configured and ready",      group: "Go-Live",    manual: true },
];

const GROUPS = ["Setup", "Fleet", "Team", "Operations", "Finance", "Go-Live"];

const GROUP_ICONS: Record<string, typeof Building2> = {
  Setup: Settings,
  Fleet: Bus,
  Team: Users,
  Operations: ClipboardList,
  Finance: DollarSign,
  "Go-Live": Rocket,
};

interface Checks {
  supabaseConnected: boolean;
  businessInfoComplete: boolean;
  hasVehicle: boolean;
  hasTechnician: boolean;
  hasContract: boolean;
  hasWorkOrder: boolean;
  hasParts: boolean;
  hasFinance: boolean;
  pipelineConfirmed: boolean;
  nutstackSignoff: boolean;
  goLiveAt: string | null;
}

export default function LaunchChecklistPage() {
  const [checks, setChecks] = useState<Partial<Checks>>({});
  const [greenCount, setGreenCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [signingOff, setSigningOff] = useState(false);
  const [goingLive, setGoingLive] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const isNuStack = typeof window !== "undefined" && (
    window.location.hostname === "localhost" ||
    process.env.NODE_ENV === "development"
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/launch-checklist");
      if (res.ok) {
        const data = await res.json();
        setChecks(data.checks ?? {});
        setGreenCount(data.greenCount ?? 0);
        setTotalCount(data.totalCount ?? 0);
      }
    } catch {
      // leave zeroed
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  async function saveSetting(key: string, value: unknown) {
    await fetch("/api/launch-checklist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
  }

  async function handleNuStackSignoff() {
    setSigningOff(true);
    await saveSetting("nustack_signoff", true);
    setStatusMsg("NuStack sign-off recorded");
    await load();
    setSigningOff(false);
  }

  async function handleGoLive() {
    setGoingLive(true);
    await saveSetting("go_live_at", new Date().toISOString());
    setStatusMsg("Complete Coach Works is now live!");
    await load();
    setGoingLive(false);
  }

  function isGreen(item: ChecklistItem): boolean {
    const val = checks[item.key as keyof Checks];
    return val === true;
  }

  const pct = totalCount > 0 ? Math.round((greenCount / totalCount) * 100) : 0;
  const allGreen = greenCount === totalCount && totalCount > 0;
  const goLiveAt = checks.goLiveAt;

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087] flex items-center gap-2">
            <Rocket className="h-6 w-6 text-[#E8A020]" />
            Launch Checklist
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Complete all items before going live with real operations data.
          </p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Status message */}
      {statusMsg && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {statusMsg}
        </div>
      )}

      {/* Progress */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">{greenCount} / {totalCount} complete</span>
          <span className={`text-sm font-bold ${allGreen ? "text-emerald-600" : "text-[#003087]"}`}>{pct}%</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${allGreen ? "bg-emerald-500" : "bg-[#003087]"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        {allGreen && !goLiveAt && (
          <p className="text-emerald-600 text-sm font-semibold mt-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Everything is green — ready to go live!
          </p>
        )}
        {goLiveAt && (
          <p className="text-emerald-600 text-sm font-semibold mt-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Live since {new Date(goLiveAt).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Checklist groups */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-24 rounded-xl bg-gray-100 animate-pulse" />)}
        </div>
      ) : (
        GROUPS.map((group) => {
          const items = CHECKLIST.filter((c) => c.group === group);
          const groupGreen = items.filter((item) => isGreen(item)).length;
          const Icon = GROUP_ICONS[group] ?? Settings;
          return (
            <div key={group} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-800">{group}</h3>
                </div>
                <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${
                  groupGreen === items.length
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {groupGreen}/{items.length}
                </span>
              </div>
              <div className="divide-y divide-gray-50">
                {items.map((item) => {
                  const green = isGreen(item);
                  const isNuStackGated = item.key === "nutstackSignoff";
                  return (
                    <div key={item.key} className="flex items-start gap-3 px-5 py-3">
                      {green
                        ? <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                        : <XCircle className="h-4 w-4 text-gray-300 mt-0.5 shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${green ? "text-gray-500 line-through" : "text-gray-900"}`}>
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                        {isNuStackGated && !green && (
                          isNuStack ? (
                            <button
                              onClick={handleNuStackSignoff}
                              disabled={signingOff}
                              className="mt-2 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                            >
                              {signingOff ? "Signing off..." : "Record NuStack Sign-off"}
                            </button>
                          ) : (
                            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-400">
                              <Lock className="h-3 w-3" />
                              <span>NuStack will complete this before your go-live date</span>
                            </div>
                          )
                        )}
                      </div>
                      {item.link && (
                        <a href={item.link} className="text-[#003087] hover:text-[#002060] shrink-0 mt-0.5 text-xs underline">
                          Go
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}

      {/* Go Live */}
      {allGreen && !goLiveAt && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              All items complete — ready to go live!
            </p>
            <p className="text-sm text-emerald-700 mt-0.5">
              Click to officially launch Complete Coach Works Operations Platform.
            </p>
          </div>
          <button
            onClick={handleGoLive}
            disabled={goingLive}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm disabled:opacity-50 shrink-0"
          >
            <Rocket className="h-4 w-4" />
            {goingLive ? "Going Live..." : "Go Live"}
          </button>
        </div>
      )}

      {!allGreen && (
        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4">
          <AlertTriangle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-800">Not ready yet</p>
            <p className="text-sm text-blue-700 mt-0.5">
              {totalCount - greenCount} item{totalCount - greenCount !== 1 ? "s" : ""} remaining.
              Complete each item above, then refresh to confirm.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
