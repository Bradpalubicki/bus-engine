import Link from "next/link";
import {
  Sun, ClipboardList, Bus, FileText, DollarSign,
  Wrench, UserCheck, ArrowRight, CheckCircle2, BarChart3,
  Users,
} from "lucide-react";

export const metadata = {
  title: "Help & Quick Reference | Complete Coach Works",
};

const MORNING_HABITS = [
  { icon: ClipboardList, text: "Check open work orders — any jobs due today or past their estimated completion?" },
  { icon: Sun, text: "Review the QA hold queue — any vehicles blocked from dispatch needing sign-off?" },
  { icon: Bus, text: "Check fleet status — any buses out of service that affect today's contracts?" },
  { icon: FileText, text: "Review contract pipeline — any upcoming renewal dates or milestone payments due?" },
  { icon: DollarSign, text: "Check finance — any invoices past 30 days or open purchase orders to approve?" },
];

const WORKFLOWS = [
  {
    icon: ClipboardList,
    title: "Create a Work Order",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    href: "/dashboard/work-orders",
    steps: [
      "Go to Work Orders → New Work Order",
      "Select vehicle, issue type, and priority level",
      "Assign technician and set estimated hours",
      "Track status: Open → In Progress → QA Hold → Complete",
    ],
  },
  {
    icon: Bus,
    title: "Update Fleet Status",
    color: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-600",
    href: "/dashboard/fleet",
    steps: [
      "Go to Fleet → find the vehicle",
      "Click Edit Status → select In Service, Out of Service, or In Maintenance",
      "Add notes if removing from service (issue description)",
      "Status propagates to dispatch and contract availability views",
    ],
  },
  {
    icon: FileText,
    title: "Add a Contract",
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
    href: "/dashboard/contracts",
    steps: [
      "Go to Contracts → New Contract",
      "Enter client, term dates, vehicle assignment, and value",
      "Set milestone payment dates for recurring billing",
      "Contract appears in Finance pipeline for invoicing",
    ],
  },
  {
    icon: DollarSign,
    title: "Process an Invoice",
    color: "bg-violet-50 border-violet-200",
    iconColor: "text-violet-600",
    href: "/dashboard/finance",
    steps: [
      "Go to Finance → New Invoice",
      "Link to contract or work order",
      "Set amount, due date, and payment terms",
      "Mark as Sent → Paid when payment received",
    ],
  },
  {
    icon: Wrench,
    title: "Track Parts & Inventory",
    color: "bg-rose-50 border-rose-200",
    iconColor: "text-rose-600",
    href: "/dashboard/parts",
    steps: [
      "Go to Parts → Add to log a part used on a work order",
      "Parts usage automatically reduces inventory count",
      "Reorder alerts fire when stock falls below threshold",
      "Run monthly parts cost report from Analytics",
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#003087]">Help & Quick Reference</h1>
        <p className="text-gray-500 text-sm mt-1">
          Daily operations routine and step-by-step guides for common tasks.
        </p>
      </div>

      {/* Monday Morning Routine */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20">
            <Sun className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Daily Operations Check</h2>
            <p className="text-sm text-amber-700">5 things every morning — takes 5 minutes</p>
          </div>
        </div>
        <ol className="space-y-3">
          {MORNING_HABITS.map((habit, i) => {
            const Icon = habit.icon;
            return (
              <li key={i} className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-xs font-bold text-amber-700">
                  {i + 1}
                </div>
                <div className="flex items-start gap-2 flex-1">
                  <Icon className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-700">{habit.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="mt-5 flex items-center gap-2 text-xs text-amber-700">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Run this every morning and nothing slips through.</span>
        </div>
      </div>

      {/* Workflow Cards */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Common Workflows</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {WORKFLOWS.map((wf) => {
            const Icon = wf.icon;
            return (
              <div key={wf.title} className={`rounded-xl border p-5 ${wf.color}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-white/60 ${wf.iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-gray-900">{wf.title}</h3>
                </div>
                <ol className="space-y-2 mb-4">
                  {wf.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className={`text-xs font-bold shrink-0 mt-0.5 ${wf.iconColor}`}>{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <Link
                  href={wf.href}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold ${wf.iconColor} hover:underline`}
                >
                  Go to {wf.title.split(" ").slice(-1)[0]}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analytics quick ref */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
            <BarChart3 className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-gray-900">Analytics — What to Track Monthly</h3>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 text-sm text-gray-600">
          {[
            { label: "Work Order Throughput", when: "Total WOs opened vs. closed per month" },
            { label: "Fleet Utilization", when: "% of buses in-service vs. out-of-service or maintenance" },
            { label: "Contract Revenue", when: "Billed vs. received — catch payment delays early" },
            { label: "Parts Cost Trend", when: "Month-over-month parts spend per vehicle" },
            { label: "Technician Efficiency", when: "Hours estimated vs. hours actual on WOs" },
            { label: "QA Hold Rate", when: "% of work orders hitting QA hold — flag recurring issues" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-400">{item.when}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Link href="/dashboard/analytics" className="text-xs font-semibold text-[#003087] hover:underline inline-flex items-center gap-1">
            Open Analytics <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Support */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-start gap-3">
          <Users className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-bold text-gray-900">NuStack Support</h3>
            <p className="text-sm text-gray-500 mt-1">
              Email{" "}
              <a href="mailto:brad@nustack.digital" className="underline font-medium text-[#003087]">
                brad@nustack.digital
              </a>{" "}
              — typically responds within a few hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
