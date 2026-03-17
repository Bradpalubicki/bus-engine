'use client'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 38, suffix: '', label: 'Years in Business', prefix: '' },
  { value: 350, suffix: '+', label: 'Employees', prefix: '' },
  { value: 70, suffix: '+', label: 'ZEPS Conversions', prefix: '' },
  { value: 4, suffix: 'M+', label: 'Electric Miles', prefix: '' },
  { value: 102, suffix: 'M', label: 'Annual Revenue', prefix: '$' },
  { value: 10, suffix: '', label: 'Locations Nationwide', prefix: '' },
]

function Counter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const steps = 60
          const increment = value / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, 2000 / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return <div ref={ref}>{prefix}{count}{suffix}</div>
}

export default function StatsBar() {
  return (
    <section className="py-16 bg-[#003087] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-bold text-[#E8A020]">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="text-sm text-blue-200 mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
