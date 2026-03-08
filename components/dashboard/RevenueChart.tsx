'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { demoRevenueChart } from '@/lib/demo-data'

function formatK(v: number) {
  if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`
  return `$${(v / 1000).toFixed(0)}K`
}

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={demoRevenueChart} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
        <YAxis tickFormatter={formatK} tick={{ fontSize: 10 }} width={55} />
        <Tooltip formatter={(v) => formatK(Number(v ?? 0))} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Bar dataKey="earned" name="Earned" fill="#003087" radius={[2, 2, 0, 0]} />
        <Bar dataKey="invoiced" name="Invoiced" fill="#E8A020" radius={[2, 2, 0, 0]} />
        <Bar dataKey="collected" name="Collected" fill="#16a34a" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
