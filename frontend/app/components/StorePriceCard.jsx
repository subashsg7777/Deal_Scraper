import { CheckCircle2, Clock4 } from 'lucide-react'

const STORE_CONFIG = {
  steam: {
    name: 'Steam',
    color: '#1d9bf0',
    border: 'border-[#1d9bf0]/20',
    text: 'text-[#1d9bf0]',
    gradient: 'from-[#1d9bf0]/10',
    glow: 'shadow-[#1d9bf0]/15',
  },
  epic: {
    name: 'Epic Games',
    color: '#a78bfa',
    border: 'border-[#a78bfa]/20',
    text: 'text-[#a78bfa]',
    gradient: 'from-[#a78bfa]/10',
    glow: 'shadow-[#a78bfa]/15',
  },
  xbox: {
    name: 'Xbox',
    color: '#22c55e',
    border: 'border-[#22c55e]/20',
    text: 'text-[#22c55e]',
    gradient: 'from-[#22c55e]/10',
    glow: 'shadow-[#22c55e]/15',
  },
}

function formatPrice(price, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price)
}

function timeAgo(dateStr) {
  if (!dateStr) return null
  const diff = Date.now() - new Date(dateStr).getTime()
  const hrs = Math.floor(diff / 3_600_000)
  const days = Math.floor(diff / 86_400_000)
  if (hrs < 1) return 'Just now'
  if (hrs < 24) return `${hrs}h ago`
  if (days < 30) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

function hasValidPrice(price) {
  const parsed = Number(price)
  return Number.isFinite(parsed) && parsed > 0
}

export default function StorePriceCard({ store, price, scrapedAt, isCheapest, currency = 'INR' }) {
  const key = store?.toLowerCase()
  const cfg = STORE_CONFIG[key] ?? {
    name: store ?? 'Store',
    color: '#9ca3af',
    border: 'border-white/10',
    text: 'text-[#9ca3af]',
    gradient: 'from-white/5',
    glow: 'shadow-white/5',
  }
  const isAvailable = hasValidPrice(price)

  return (
    <div
      className={`relative bg-[#111827] border rounded-2xl p-5 overflow-hidden transition-all duration-300
        ${isCheapest
          ? `border-[#22c55e]/30 shadow-xl ${cfg.glow}`
          : `${cfg.border} hover:border-white/15 hover:shadow-lg hover:shadow-black/30`
        }`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${cfg.gradient} to-transparent ${
          isCheapest ? 'opacity-100' : 'opacity-0 hover:opacity-100'
        } transition-opacity duration-300`}
      />

      <div className="relative">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: cfg.color }}
            />
            <span className={`text-sm font-semibold ${cfg.text}`}>{cfg.name}</span>
          </div>
          {isCheapest && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20">
              <CheckCircle2 size={11} />
              Best Price
            </span>
          )}
        </div>

        <div className="mb-3">
          {isAvailable ? (
            <p
              className={`text-3xl font-extrabold tracking-tight ${
                isCheapest ? 'text-[#22c55e]' : 'text-[#e5e7eb]'
              }`}
            >
              {formatPrice(Number(price), currency)}
            </p>
          ) : (
            <p className="text-[#6b7280] text-base font-medium">Not Available</p>
          )}
        </div>

        {scrapedAt && (
          <div className="flex items-center gap-1.5 text-[#6b7280] text-xs">
            <Clock4 size={11} />
            <span>Updated {timeAgo(scrapedAt)}</span>
          </div>
        )}
      </div>
    </div>
  )
}
