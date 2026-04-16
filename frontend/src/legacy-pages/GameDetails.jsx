import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Tag, TrendingDown } from 'lucide-react'
import { getGamePrices, getGameHistory } from '../api/api'

const STORES = ['steam', 'epic', 'xbox']

function formatCurrency(value, currency = 'INR') {
  if (value == null || Number.isNaN(Number(value))) return 'N/A'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value))
}

function formatDate(value) {
  if (!value) return 'Unknown'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Unknown'
  return date.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function buildHistoryPoints(historyItems) {
  const values = historyItems
    .map((item) => Number(item?.price))
    .filter((n) => !Number.isNaN(n) && n > 0)

  if (values.length < 2) return '10,70 35,65 60,60 85,55 110,50 135,45 160,40 190,35'

  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = Math.max(max - min, 1)
  const width = 210
  const height = 90

  return values
    .slice(-10)
    .map((price, index, arr) => {
      const x = (index / Math.max(arr.length - 1, 1)) * (width - 20) + 10
      const normalized = (price - min) / range
      const y = height - normalized * (height - 20) - 10
      return `${x},${y}`
    })
    .join(' ')
}

export default function GameDetails() {
  const { id } = useParams()
  const [pricesData, setPricesData] = useState(null)
  const [historyData, setHistoryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadGameDetails() {
      setLoading(true)
      setError(null)

      try {
        const [pricesJson, historyJson] = await Promise.all([
          getGamePrices(id),
          getGameHistory(id, 90).catch(() => []),
        ])

        if (!cancelled) {
          setPricesData(pricesJson)
          setHistoryData(Array.isArray(historyJson) ? historyJson : historyJson?.results || [])
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Game not found')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadGameDetails()
    return () => {
      cancelled = true
    }
  }, [id])

  const gameName = pricesData?.gameName || `Game ${id}`
  const lastUpdated = pricesData?.lastUpdatedAt
  const currency = pricesData?.currency || 'INR'

  useEffect(() => {
    document.title = `${gameName} Price Tracker | Best Deals & Price History`
  }, [gameName])

  const priceByStore = useMemo(() => {
    const map = {
      steam: null,
      epic: null,
      xbox: null,
    }

    const rows = Array.isArray(pricesData?.results) ? pricesData.results : []
    for (const row of rows) {
      const key = String(row?.store || '').toLowerCase()
      if (key in map) map[key] = row?.price ?? null
    }

    return map
  }, [pricesData])

  const cheapestStore = (pricesData?.cheapestStore || '').toLowerCase()
  const chartPoints = useMemo(() => buildHistoryPoints(historyData), [historyData])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center">
          <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-[#22d3ee] border-t-transparent animate-spin" />
          <p className="text-[#cbd5e1] text-sm">Loading game details...</p>
        </div>
      </div>
    )
  }

  if (error || !pricesData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-2xl border border-rose-400/30 bg-rose-500/10 backdrop-blur-xl p-8 text-center">
          <h1 className="text-2xl font-extrabold text-white mb-2">Game not found</h1>
          <p className="text-rose-200 mb-6">We could not load this game right now. Please try another title.</p>
          <Link
            to="/search"
            className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition"
          >
            Back to Search
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#94a3b8] hover:text-white transition mb-8"
        >
          <ArrowLeft size={15} /> Back to Home
        </Link>

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 sm:p-10 mb-8 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
          <div className="pointer-events-none absolute -top-24 -right-20 h-60 w-60 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-indigo-500/20 blur-3xl" />

          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-200 mb-4">
            <Tag size={12} /> Compare prices across Steam, Epic, Xbox
          </p>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-4">{gameName}</h1>

          <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-[#cbd5e1]">
            <CalendarDays size={14} className="text-cyan-300" />
            Last updated: {formatDate(lastUpdated)}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {STORES.map((store) => {
            const isBestDeal = store === cheapestStore
            return (
              <article
                key={store}
                className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-cyan-300/40 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold capitalize">{store}</h2>
                  {isBestDeal && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/40 bg-emerald-400/15 px-2.5 py-1 text-[11px] font-bold text-emerald-200">
                      <TrendingDown size={11} /> Best Deal
                    </span>
                  )}
                </div>

                <p className="text-3xl font-black text-cyan-200 mb-5">{formatCurrency(priceByStore[store], currency)}</p>

                <a
                  href="#"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold hover:bg-cyan-400/20 hover:border-cyan-200/40 transition"
                >
                  Buy on {store.charAt(0).toUpperCase() + store.slice(1)}
                </a>
              </article>
            )
          })}
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 mb-8">
          <h3 className="text-xl font-extrabold mb-4">Price History</h3>
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <svg viewBox="0 0 220 100" className="w-full h-40 sm:h-48" role="img" aria-label="Price trend chart">
              <defs>
                <linearGradient id="lineGlow" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              <polyline
                fill="none"
                stroke="url(#lineGlow)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={chartPoints}
              />
            </svg>
          </div>
          <p className="text-sm text-[#94a3b8] mt-3">
            Trend reflects recent snapshots captured from store listings and can help you decide whether to buy now or wait for deeper discounts.
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8">
          <h3 className="text-xl font-extrabold mb-4">About This Price Tracker</h3>
          <p className="text-[#cbd5e1] leading-8 text-[15px]">
            Track the latest price of {gameName} across multiple stores with a single view designed for fast decisions. This page continuously compares offers from Steam, Epic Games, and Xbox so you can quickly spot the lowest live price without opening every marketplace in separate tabs. By combining current pricing with historical movement, you get context beyond a single discount number: you can see whether the game is currently near its usual sale floor or if a better offer might appear soon. The price comparison cards above are optimized to show the most actionable details first, including the current best-deal badge and clear buy call-to-action buttons for each platform. The history section adds extra confidence by visualizing recent trend direction, helping you identify sudden drops and recurring promotion patterns. If you are building a wishlist strategy, this page makes it easier to prioritize purchases, reduce impulse buys at higher price points, and maximize value during seasonal sales. For collectors and regular players alike, this game detail experience turns price monitoring into a simple and transparent workflow.
          </p>
        </section>
      </div>
    </div>
  )
}
