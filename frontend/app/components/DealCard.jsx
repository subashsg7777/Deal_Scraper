import Link from 'next/link'
import { TrendingDown, ArrowUpRight } from 'lucide-react'

const STORE_STYLES = {
  steam: {
    label: 'Steam',
    dot: 'bg-[#1d9bf0]',
    badge: 'text-[#1d9bf0] bg-[#1d9bf0]/10 border-[#1d9bf0]/20',
    glow: 'group-hover:shadow-[#1d9bf0]/10',
    gradient: 'from-[#1d9bf0]/8',
  },
  epic: {
    label: 'Epic Games',
    dot: 'bg-[#a78bfa]',
    badge: 'text-[#a78bfa] bg-[#a78bfa]/10 border-[#a78bfa]/20',
    glow: 'group-hover:shadow-[#a78bfa]/10',
    gradient: 'from-[#a78bfa]/8',
  },
  xbox: {
    label: 'Xbox',
    dot: 'bg-[#22c55e]',
    badge: 'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/20',
    glow: 'group-hover:shadow-[#22c55e]/10',
    gradient: 'from-[#22c55e]/8',
  },
}

function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

export default function DealCard({ deal }) {
  const { gameId, gameName, store, oldPrice, newPrice, discountPercent } = deal
  const key = store?.toLowerCase()
  const style = STORE_STYLES[key] ?? {
    label: store ?? 'Store',
    dot: 'bg-[#9ca3af]',
    badge: 'text-[#9ca3af] bg-white/5 border-white/10',
    glow: '',
    gradient: 'from-white/5',
  }

  return (
    <Link href={`/game/${gameId}?name=${encodeURIComponent(gameName || '')}`} className="block group">
      <article
        className={`relative bg-[#111827] border border-white/5 rounded-2xl p-5 overflow-hidden
          transition-all duration-300
          hover:-translate-y-1.5 hover:border-white/[0.08]
          hover:shadow-2xl hover:shadow-black/50 ${style.glow}`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${style.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400`}
        />

        <div className="relative flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20">
            <TrendingDown size={11} />
            -{discountPercent}%
          </span>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {style.label}
          </span>
        </div>

        <h3 className="relative text-[#e5e7eb] font-semibold text-sm leading-snug line-clamp-2 mb-5 group-hover:text-white transition-colors duration-200">
          {gameName}
        </h3>

        <div className="relative flex items-end justify-between">
          <div>
            <p className="text-[#6b7280] text-xs line-through mb-0.5">{formatPrice(oldPrice)}</p>
            <p className="text-[#22c55e] text-xl font-extrabold tracking-tight">{formatPrice(newPrice)}</p>
          </div>
          <span className="flex items-center gap-1 text-[#6366f1] text-xs font-semibold opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
            View deal
            <ArrowUpRight size={13} />
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6366f1]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </article>
    </Link>
  )
}
