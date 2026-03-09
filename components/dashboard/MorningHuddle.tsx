"use client";

import Link from "next/link";
import {
  Bus,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronRight,
  Siren,
  Wrench,
} from "lucide-react";

interface WorkOrder {
  id: string;
  busNumber: string;
  status: string;
  technician: string;
  dueDate: string;
}

interface UrgentItem {
  type: string;
  label: string;
  detail: string;
  href: string;
  level: string;
}

interface HuddleData {
  workOrders: WorkOrder[];
  urgentItems: UrgentItem[];
  stats: {
    busesInProduction: number;
    pipelineValue: number;
    overdueInvoices: number;
    openWorkOrders: number;
    deliveriesThisWeek: number;
  };
}

function formatMoney(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

function KpiCards({ data }: { data: HuddleData }) {
  const cards = [
    {
      label: "Buses in Production",
      value: data.stats.busesInProduction,
      sub: data.stats.deliveriesThisWeek > 0
        ? `${data.stats.deliveriesThisWeek} deliveries this week`
        : "No deliveries this week",
      subColor: data.stats.deliveriesThisWeek > 0 ? "text-emerald-600" : "text-slate-400",
      icon: Bus,
      iconBg: "bg-blue-50",
      iconColor: "text-[#003087]",
      href: "/dashboard/fleet",
    },
    {
      label: "Pipeline Value",
      value: formatMoney(data.stats.pipelineValue),
      sub: "Active opportunities",
      subColor: "text-slate-500",
      icon: TrendingUp,
      iconBg: "bg-amber-50",
      iconColor: "text-[#E8A020]",
      href: "/dashboard/pipeline",
    },
    {
      label: "Overdue Invoices",
      value: data.stats.overdueInvoices,
      sub: data.stats.overdueInvoices > 0 ? "Needs collection follow-up" : "All invoices current",
      subColor: data.stats.overdueInvoices > 0 ? "text-red-600" : "text-emerald-600",
      icon: data.stats.overdueInvoices > 0 ? AlertCircle : CheckCircle,
      iconBg: data.stats.overdueInvoices > 0 ? "bg-red-50" : "bg-emerald-50",
      iconColor: data.stats.overdueInvoices > 0 ? "text-red-600" : "text-emerald-600",
      href: "/dashboard/finance",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Link
            key={card.label}
            href={card.href}
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm hover:border-blue-200 hover:shadow-md transition-all"
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.iconBg}`}>
              <Icon className={`h-6 w-6 ${card.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-2xl font-bold text-slate-900">{card.value}</p>
              <p className="text-xs font-medium text-slate-500 truncate">{card.label}</p>
              <p className={`text-[11px] font-medium ${card.subColor}`}>{card.sub}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-[#003087] transition-colors shrink-0" />
          </Link>
        );
      })}
    </div>
  );
}

function OpenWorkOrders({ data }: { data: HuddleData }) {
  const shown = data.workOrders.slice(0, 6);

  const statusColors: Record<string, string> = {
    in_progress: "bg-blue-50 text-blue-700 border border-blue-200",
    qa_hold: "bg-red-50 text-red-700 border border-red-200",
    pending_parts: "bg-amber-50 text-amber-700 border border-amber-200",
    open: "bg-slate-50 text-slate-700 border border-slate-200",
    scheduled: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Wrench className="h-4 w-4 text-[#003087]" />
          <h2 className="text-sm font-semibold text-slate-900">Open Work Orders</h2>
          {data.stats.openWorkOrders > 6 && (
            <span className="text-[10px] text-slate-400">+{data.stats.openWorkOrders - 6} more</span>
          )}
        </div>
        <Link href="/dashboard/work-orders" className="text-[11px] font-medium text-[#003087] hover:text-blue-800 transition-colors">
          View all →
        </Link>
      </div>
      {shown.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Wrench className="h-8 w-8 text-slate-300 mb-2" />
          <p className="text-sm font-medium text-slate-500">No open work orders</p>
          <Link href="/dashboard/work-orders" className="mt-2 text-xs text-[#003087] hover:underline">View work orders</Link>
        </div>
      ) : (
        <ul className="divide-y divide-slate-50">
          {shown.map((wo) => (
            <li key={wo.id} className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50/60 transition-colors">
              <div className="flex w-20 shrink-0 items-center gap-1.5 text-xs font-semibold text-slate-600">
                <Bus className="h-3 w-3 text-slate-400" />
                {wo.busNumber}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs text-slate-400">{wo.technician || "Unassigned"}</p>
                {wo.dueDate && (
                  <p className="text-[10px] text-slate-400">Due {wo.dueDate}</p>
                )}
              </div>
              <span className={`shrink-0 rounded-lg px-2.5 py-1 text-[10px] font-semibold capitalize ${statusColors[wo.status] || statusColors.open}`}>
                {wo.status.replace(/_/g, " ")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ActionItems({ data }: { data: HuddleData }) {
  const items = data.urgentItems;
  const levelStyles: Record<string, string> = {
    critical: "border-red-200 bg-red-50",
    warning: "border-amber-200 bg-amber-50",
    info: "border-blue-100 bg-blue-50",
  };
  const labelStyles: Record<string, string> = {
    critical: "text-red-800",
    warning: "text-amber-800",
    info: "text-blue-800",
  };
  const btnStyles: Record<string, string> = {
    critical: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-amber-500 hover:bg-amber-600 text-white",
    info: "bg-blue-600 hover:bg-blue-700 text-white",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          {items.some((i) => i.level === "critical")
            ? <Siren className="h-4 w-4 text-red-500 animate-pulse" />
            : <AlertCircle className="h-4 w-4 text-amber-500" />}
          <h2 className="text-sm font-semibold text-slate-900">Action Items</h2>
          {items.length > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-[10px] font-bold text-red-700">{items.length}</span>
          )}
        </div>
      </div>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <CheckCircle className="h-8 w-8 text-emerald-400 mb-2" />
          <p className="text-sm font-medium text-slate-500">All clear — nothing needs attention</p>
        </div>
      ) : (
        <ul className="divide-y divide-slate-50">
          {items.map((item, i) => (
            <li key={i} className={`flex items-center gap-3 px-4 py-3 border-l-4 ${levelStyles[item.level] || levelStyles.info}`}>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold truncate ${labelStyles[item.level] || labelStyles.info}`}>{item.label}</p>
                <p className="text-[11px] text-slate-500 truncate">{item.detail}</p>
              </div>
              <Link href={item.href} className={`shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-bold transition-colors ${btnStyles[item.level] || btnStyles.info}`}>
                Fix
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function MorningHuddle({ data }: { data: HuddleData }) {
  return (
    <div className="space-y-5">
      <KpiCards data={data} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <OpenWorkOrders data={data} />
        <ActionItems data={data} />
      </div>
    </div>
  );
}
