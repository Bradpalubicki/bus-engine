"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Building2, Bus, Users, ClipboardList, Rocket,
  CheckCircle2, ChevronRight, X, Sparkles,
  ArrowLeft, Loader2,
} from "lucide-react";
import Link from "next/link";

const WIZARD_KEY = "ccw-onboarding-dismissed";

const step1Schema = z.object({
  name: z.string().min(1, "Company name is required"),
  contact_name: z.string().min(1, "Contact name is required"),
  phone: z.string().min(10, "Phone number is required"),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
});
type Step1Data = z.infer<typeof step1Schema>;

const STEPS = [
  { label: "Company" },
  { label: "Fleet" },
  { label: "Team" },
  { label: "Work Order" },
  { label: "Go Live" },
];

export default function OnboardingPage() {
  const [visible, setVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [checks, setChecks] = useState<{
    hasVehicle?: boolean;
    hasTechnician?: boolean;
    hasWorkOrder?: boolean;
  }>({});

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: "Complete Coach Works",
      contact_name: "",
      phone: "(951) 684-9585",
      email: "info@completecoach.com",
      address: "1863 Service Court",
      city: "Riverside",
      state: "CA",
    },
  });

  useEffect(() => {
    const dismissed = localStorage.getItem(WIZARD_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  useEffect(() => {
    if (visible) {
      fetch("/api/onboarding/checks")
        .then((r) => r.json())
        .then((data) => setChecks(data))
        .catch(() => {});
    }
  }, [visible]);

  async function advanceStep(nextStep: number, payload?: object) {
    setSaving(true);
    try {
      await fetch("/api/onboarding/progress", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: nextStep, ...payload }),
      });
      setCurrentStep(nextStep);
    } catch {
      setCurrentStep(nextStep);
    } finally {
      setSaving(false);
    }
  }

  async function handleStep1(data: Step1Data) {
    await advanceStep(2, { companyData: data });
  }

  async function handleGoLive() {
    setSaving(true);
    try {
      await fetch("/api/onboarding/progress", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: 5, complete: true }),
      });
      localStorage.setItem(WIZARD_KEY, "true");
      setVisible(false);
      window.location.reload();
    } catch {
      setSaving(false);
    }
  }

  function handleDismiss() {
    localStorage.setItem(WIZARD_KEY, "true");
    setVisible(false);
  }

  if (!visible) {
    return (
      <div className="max-w-lg mx-auto py-16 text-center space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#003087]/10 mx-auto">
          <CheckCircle2 className="h-8 w-8 text-[#003087]" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Setup Complete</h1>
        <p className="text-sm text-gray-500">
          Your platform is configured. Visit the{" "}
          <Link href="/dashboard/launch-checklist" className="underline text-[#003087]">
            launch checklist
          </Link>{" "}
          to confirm everything is live.
        </p>
        <button
          onClick={() => {
            localStorage.removeItem(WIZARD_KEY);
            setVisible(true);
            setCurrentStep(1);
          }}
          className="text-xs text-gray-400 hover:text-gray-600 underline"
        >
          Re-run setup wizard
        </button>
      </div>
    );
  }

  const progress = Math.round(((currentStep - 1) / (STEPS.length - 1)) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003087] to-[#004aad] px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Welcome to CCW Operations</h2>
                <p className="text-sm text-blue-200">Let&apos;s get your platform ready in 5 steps</p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="rounded-lg p-1 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Skip setup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-blue-200">Step {currentStep} of {STEPS.length}</span>
              <span className="text-xs font-bold text-white">{progress}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/20 overflow-hidden">
              <div className="h-full rounded-full bg-[#E8A020] transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {/* Step dots */}
        <div className="flex border-b border-gray-100">
          {STEPS.map((s, i) => {
            const stepNum = i + 1;
            const done = stepNum < currentStep;
            const active = stepNum === currentStep;
            return (
              <div key={s.label} className={`flex-1 py-2 text-center text-[10px] font-bold uppercase tracking-wider relative transition-colors ${active ? "text-[#003087]" : done ? "text-emerald-600" : "text-gray-400"}`}>
                <span className="hidden sm:block truncate px-1">{stepNum}. {s.label}</span>
                <span className="sm:hidden">{stepNum}</span>
                {done && <CheckCircle2 className="h-3 w-3 mx-auto mt-0.5 text-emerald-500 hidden sm:block" />}
                {active && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#003087]" />}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <div className="px-6 py-6">
          {/* Step 1 — Company Setup */}
          {currentStep === 1 && (
            <form onSubmit={step1Form.handleSubmit(handleStep1)} className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-3">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Company Setup</h3>
              <p className="text-sm text-gray-500">Confirm Complete Coach Works details. This appears on invoices and work orders.</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 space-y-1">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">Company Name</label>
                  <input id="name" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" placeholder="Complete Coach Works" {...step1Form.register("name")} />
                  {step1Form.formState.errors.name && <p className="text-xs text-red-500">{step1Form.formState.errors.name.message}</p>}
                </div>
                <div className="space-y-1">
                  <label htmlFor="contact_name" className="text-sm font-medium text-gray-700">Contact Name</label>
                  <input id="contact_name" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" placeholder="John Smith" {...step1Form.register("contact_name")} />
                  {step1Form.formState.errors.contact_name && <p className="text-xs text-red-500">{step1Form.formState.errors.contact_name.message}</p>}
                </div>
                <div className="space-y-1">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
                  <input id="phone" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" placeholder="(951) 684-9585" {...step1Form.register("phone")} />
                  {step1Form.formState.errors.phone && <p className="text-xs text-red-500">{step1Form.formState.errors.phone.message}</p>}
                </div>
                <div className="col-span-2 space-y-1">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email (optional)</label>
                  <input id="email" type="email" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" placeholder="info@completecoach.com" {...step1Form.register("email")} />
                </div>
                <div className="col-span-2 space-y-1">
                  <label htmlFor="address" className="text-sm font-medium text-gray-700">Address (optional)</label>
                  <input id="address" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" placeholder="1863 Service Court" {...step1Form.register("address")} />
                </div>
                <div className="space-y-1">
                  <label htmlFor="city" className="text-sm font-medium text-gray-700">City</label>
                  <input id="city" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" placeholder="Riverside" {...step1Form.register("city")} />
                </div>
                <div className="space-y-1">
                  <label htmlFor="state" className="text-sm font-medium text-gray-700">State</label>
                  <input id="state" maxLength={2} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" placeholder="CA" {...step1Form.register("state")} />
                </div>
              </div>
              <button type="submit" disabled={saving} className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#003087] hover:bg-[#002060] text-white font-semibold text-sm px-5 py-3 transition-colors disabled:opacity-50">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Save & Continue <ChevronRight className="h-4 w-4" />
              </button>
            </form>
          )}

          {/* Step 2 — First Vehicle */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-[#E8A020] mb-3">
                <Bus className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Add Your First Vehicle</h3>
              <p className="text-sm text-gray-500">
                {checks.hasVehicle
                  ? "You already have vehicles in the fleet."
                  : "Add your first bus or vehicle to the fleet. Come back here when done — the wizard will resume."}
              </p>
              {checks.hasVehicle ? (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <p className="text-sm text-emerald-800">Vehicle already in fleet — you&apos;re good to go.</p>
                </div>
              ) : (
                <a
                  href="/dashboard/fleet"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#E8A020] hover:bg-[#d4921c] text-white font-semibold text-sm px-5 py-3 transition-colors"
                >
                  <Bus className="h-4 w-4" />
                  Add Vehicle in Fleet Manager
                  <ChevronRight className="h-4 w-4" />
                </a>
              )}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  onClick={() => advanceStep(3)}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#003087] hover:bg-[#002060] text-white font-semibold text-sm px-5 py-3 transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {checks.hasVehicle ? "Continue" : "Skip for Now"} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Team Setup */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 mb-3">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Team Setup</h3>
              <p className="text-sm text-gray-500">
                {checks.hasTechnician
                  ? "You have technicians in the system."
                  : "Add your technicians so you can assign them to work orders."}
              </p>
              {checks.hasTechnician ? (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <p className="text-sm text-emerald-800">Technicians added — you&apos;re good to go.</p>
                </div>
              ) : (
                <a
                  href="/dashboard/technicians"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#E8A020] hover:bg-[#d4921c] text-white font-semibold text-sm px-5 py-3 transition-colors"
                >
                  <Users className="h-4 w-4" />
                  Add Technicians
                  <ChevronRight className="h-4 w-4" />
                </a>
              )}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  onClick={() => advanceStep(4)}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#003087] hover:bg-[#002060] text-white font-semibold text-sm px-5 py-3 transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {checks.hasTechnician ? "Continue" : "Skip for Now"} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4 — First Work Order */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-3">
                <ClipboardList className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Create First Work Order</h3>
              <p className="text-sm text-gray-500">
                {checks.hasWorkOrder
                  ? "You already have work orders in the system."
                  : "Create your first work order to test the full workflow — select a vehicle, issue type, and assign a technician."}
              </p>
              {checks.hasWorkOrder ? (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <p className="text-sm text-emerald-800">Work order created — workflow verified.</p>
                </div>
              ) : (
                <a
                  href="/dashboard/work-orders"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#E8A020] hover:bg-[#d4921c] text-white font-semibold text-sm px-5 py-3 transition-colors"
                >
                  <ClipboardList className="h-4 w-4" />
                  Create First Work Order
                  <ChevronRight className="h-4 w-4" />
                </a>
              )}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  onClick={() => advanceStep(5)}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#003087] hover:bg-[#002060] text-white font-semibold text-sm px-5 py-3 transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {checks.hasWorkOrder ? "Continue" : "Skip for Now"} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 5 — Go Live */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-3">
                <Rocket className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Operations Ready</h3>
              <p className="text-sm text-gray-500">Your CCW platform is configured. Here&apos;s what&apos;s ready for you:</p>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  "Full fleet status tracking — in service, maintenance, QA hold",
                  "Work order management with technician assignment",
                  "Contract and pipeline tracking",
                  "Finance module for invoicing",
                  "Parts & inventory management",
                  "Analytics for operations reporting",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  onClick={handleGoLive}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#003087] to-[#004aad] hover:from-[#002060] hover:to-[#003087] text-white font-semibold text-sm px-5 py-3 transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />}
                  Launch My Dashboard
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Skip link */}
        {currentStep < 5 && (
          <div className="px-6 pb-4 text-center">
            <button onClick={handleDismiss} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Skip setup — I&apos;ll finish this later
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
