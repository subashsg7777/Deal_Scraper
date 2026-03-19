import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { TrendingDown, Zap, ArrowRight, RefreshCw, Activity } from 'lucide-react'
import { getDeals } from '../api/api'
import DealCard from '../components/DealCard'
import LoadingSpinner from '../components/LoadingSpinner'

const STATS = [
  { label: 'Platforms Tracked', value: '3' },
  { label: 'Price Updates / Day', value: '24' },
  { label: 'Games Indexed', value: '500+' },
]

export default function Home() {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchDeals = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getDeals()
      setDeals(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDeals()
  }, [fetchDeals])

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 pt-20 pb-24">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#6366f1]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#22c55e]/6 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 bg-[#6366f1]/10 border border-[#6366f1]/25 rounded-full px-4 py-1.5 mb-7 text-[#a5b4fc] text-sm font-medium">
            <Activity size={13} />
            Real-time price tracking across 3 platforms
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-5 leading-[1.05]">
            <span className="text-gradient-white">Game Deals</span>
            <br />
            <span className="text-gradient-indigo">Tracker</span>
          </h1>

          <p className="text-[#9ca3af] text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Find the cheapest price across{' '}
            <span className="text-[#1d9bf0] font-semibold">Steam</span>,{' '}
            <span className="text-[#a78bfa] font-semibold">Epic Games</span>, and{' '}
            <span className="text-[#22c55e] font-semibold">Xbox</span> — all in one place.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 w-full sm:w-auto justify-center"
            >
              Search Games
              <ArrowRight size={15} />
            </Link>
            <button
              onClick={fetchDeals}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-[#e5e7eb] px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-200 disabled:opacity-50 w-full sm:w-auto justify-center"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
              Refresh Deals
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-3 gap-3 sm:gap-5">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-[#111827] border border-white/5 rounded-2xl px-5 py-5 text-center"
            >
              <p className="text-2xl sm:text-3xl font-extrabold text-gradient-indigo mb-1">{s.value}</p>
              <p className="text-[#9ca3af] text-xs sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Deals grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Section header */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center">
              <TrendingDown size={17} className="text-[#22c55e]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#e5e7eb]">Latest Deals</h2>
              <p className="text-[#9ca3af] text-xs mt-0.5">
                {loading ? 'Fetching…' : `${deals.length} active deal${deals.length !== 1 ? 's' : ''}`}
              </p>
            </div>
          </div>
          <Link
            to="/search"
            className="hidden sm:inline-flex items-center gap-1.5 text-[#6366f1] hover:text-indigo-300 text-sm font-medium transition-colors"
          >
            Browse all
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* States */}
        {loading ? (
          <LoadingSpinner text="Loading latest deals…" />
        ) : error ? (
          <div className="bg-[#ef4444]/8 border border-[#ef4444]/20 rounded-2xl p-10 max-w-md mx-auto text-center">
            <Zap size={28} className="text-[#ef4444] mx-auto mb-3" />
            <p className="text-[#ef4444] font-semibold mb-1">Failed to load deals</p>
            <p className="text-[#9ca3af] text-sm mb-5">{error}</p>
            <button
              onClick={fetchDeals}
              className="inline-flex items-center gap-2 bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20 px-5 py-2 rounded-xl text-sm font-medium hover:bg-[#ef4444]/20 transition"
            >
              <RefreshCw size={13} />
              Try again
            </button>
          </div>
        ) : deals.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#9ca3af] text-lg mb-1 font-medium">No deals right now</p>
            <p className="text-[#6b7280] text-sm">Check back later for fresh discounts</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
            {deals.map((deal, idx) => (
              <DealCard key={deal.gameId ?? idx} deal={deal} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
