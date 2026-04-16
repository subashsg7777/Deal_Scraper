'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const STORE_COLORS = {
  steam: '#1d9bf0',
  epic: '#a78bfa',
  xbox: '#22c55e',
}

function formatPrice(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

function fmtDate(str) {
  const d = new Date(str)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

function mergeHistory(history) {
  const map = {}
  for (const [store, points] of Object.entries(history || {})) {
    if (!Array.isArray(points)) continue
    for (const pt of points) {
      if (!pt.scrapedAt) continue
      const label = fmtDate(pt.scrapedAt)
      if (!map[label]) map[label] = { date: label, _iso: pt.scrapedAt }
      map[label][store] = pt.price
    }
  }
  return Object.values(map).sort(
    (a, b) => new Date(a._iso).getTime() - new Date(b._iso).getTime(),
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1a2744] border border-white/10 rounded-xl px-4 py-3 shadow-2xl min-w-[160px]">
      <p className="text-[#9ca3af] text-xs font-semibold mb-2 uppercase tracking-wider">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4 text-sm py-0.5">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[#9ca3af] capitalize">{entry.dataKey}</span>
          </div>
          <span className="text-[#e5e7eb] font-bold">{formatPrice(entry.value)}</span>
        </div>
      ))}
    </div>
  )
}

export default function PriceChartClient({ history }) {
  if (!history) return null

  const stores = Object.keys(STORE_COLORS).filter(
    (s) => Array.isArray(history[s]) && history[s].length > 0,
  )
  const data = mergeHistory(history)

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-52 text-[#6b7280] text-sm">
        No price history available for the selected period.
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fill: '#6b7280', fontSize: 11 }}
          axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fill: '#6b7280', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          width={48}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.05)', strokeWidth: 1 }} />
        <Legend
          wrapperStyle={{ paddingTop: '20px' }}
          formatter={(value) => (
            <span style={{ color: '#9ca3af', textTransform: 'capitalize', fontSize: '12px', fontWeight: '500' }}>
              {value}
            </span>
          )}
        />
        {stores.map((store) => (
          <Line
            key={store}
            type="monotone"
            dataKey={store}
            stroke={STORE_COLORS[store]}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, strokeWidth: 0 }}
            connectNulls
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
