"use client";

import { Zap } from "lucide-react";

export function FTAPipelineBanner() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-[#0D2B45] to-[#1565A0] px-6 py-5 flex items-start gap-4 shadow-md">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/20 mt-0.5">
        <Zap className="h-5 w-5 text-amber-300" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold tracking-widest text-amber-300 uppercase mb-1">
          FTA Pipeline Intelligence
        </p>
        <p className="text-sm font-semibold text-white leading-relaxed">
          "This isn't about changing how you win contracts you're already in. It's about making sure
          the right agencies find you before they call someone else. The{" "}
          <span className="text-amber-300 font-bold">$2.14B sitting in FTA Low-No</span> right now
          is going to get spent whether ZEPS is visible or not. We're making sure ZEPS is the first
          name they see."
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 px-3 py-1 text-[11px] font-semibold text-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse inline-block" />
            $2.14B FTA Low-No — FY2026
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[11px] font-semibold text-white/70">
            Proterra — Bankrupt Aug 2023
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[11px] font-semibold text-white/70">
            54,000 eligible buses in US fleet
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[11px] font-semibold text-white/70">
            HVIP: $165K/bus voucher available
          </span>
        </div>
      </div>
    </div>
  );
}
