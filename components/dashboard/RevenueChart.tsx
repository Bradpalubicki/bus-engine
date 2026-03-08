'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type DataPoint = { month: string; earned: number; invoiced: number; collected: number }

function formatK(v: number) {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`
  return `$${v}`
}

export function RevenueChart({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
        <YAxis tickFormatter={formatK} tick={{ fontSize: 10 }} width={55} />
        <Tooltip formatter={(v) => formatK(Number(v ?? 0))} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Bar dataKey="earned" name="Earned" fill="#003087" radius={[2, 2, 0, 0]} />
        <Bar dataKey="invoiced" name="Incurred" fill="#E8A020" radius={[2, 2, 0, 0]} />
        <Bar dataKey="collected" name="Collected" fill="#16a34a" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
