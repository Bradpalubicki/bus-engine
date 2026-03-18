"use client"

import { useEffect, useRef, useState } from "react"

interface ScoreItem {
  label: string
  current: number
  target: number
  status: string
  note: string
}

interface WebsiteHealthData {
  lastUpdated: string
  scores: ScoreItem[]
}

function getColor(score: number): string {
  if (score < 40) return "#ef4444"
  if (score < 65) return "#f59e0b"
  return "#22c55e"
}

function ArcGauge({ item, animate }: { item: ScoreItem; animate: boolean }) {
  const [displayed, setDisplayed] = useState(0)
  const [showTooltip, setShowTooltip] = useState(false)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!animate) return
    let start: number | null = null
    const duration = 900
    const target = item.current

    function step(ts: number) {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(Math.round(eased * target))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step)
      }
    }

    frameRef.current = requestAnimationFrame(step)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [animate, item.current])

  // Half-circle arc params
  const r = 44
  const cx = 56
  const cy = 56
  const strokeWidth = 8
  const circumference = Math.PI * r // half circle
  const currentPct = Math.min(item.current / 100, 1)
  const targetPct = Math.min(item.target / 100, 1)
  const currentOffset = circumference * (1 - currentPct)
  const targetOffset = circumference * (1 - targetPct)
  const color = getColor(item.current)

  // SVG arc: start at left (180°), sweep right (0°)
  const arcD = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`

  return (
    <div
      className="relative flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-4 pb-4 pt-3 shadow-sm cursor-default"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 z-10 mb-2 w-56 -translate-x-1/2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-lg">
          <p className="text-[11px] font-semibold text-slate-700 mb-1">{item.label}</p>
          <p className="text-[11px] text-slate-500 leading-relaxed">{item.note}</p>
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-200" />
        </div>
      )}

      {/* SVG arc gauge */}
      <svg width={112} height={64} className="overflow-visible">
        {/* Track */}
        <path d={arcD} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} strokeLinecap="round" />
        {/* Target ghost */}
        <path
          d={arcD}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeOpacity={0.18}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={targetOffset}
        />
        {/* Current fill */}
        <path
          d={arcD}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={circumference * (1 - (animate ? displayed / 100 : 0))}
          style={{ transition: "stroke-dashoffset 0.05s linear" }}
        />
        {/* Score text */}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          dominantBaseline="auto"
          fontSize="22"
          fontWeight="700"
          fill={color}
        >
          {animate ? displayed : 0}
        </text>
      </svg>

      <p className="mt-1 text-center text-[12px] font-semibold text-slate-800 leading-tight">{item.label}</p>
      <p className="mt-0.5 text-[10px] text-slate-400">target: {item.target}+</p>
    </div>
  )
}

export function WebsiteHealthScores({ data }: { data: WebsiteHealthData }) {
  const [animate, setAnimate] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {data.scores.map((score) => (
        <ArcGauge key={score.label} item={score} animate={animate} />
      ))}
    </div>
  )
}
