import React, { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import {
  ArrowLeft,
  RefreshCw,
  TrendingDown,
  History,
  ShoppingBag,
  CalendarDays,
} from 'lucide-react'
import { getGamePrices, getGameHistory } from '../api/api'
import StorePriceCard from '../components/StorePriceCard'
import PriceChart from '../components/PriceChart'
import LoadingSpinner from '../components/LoadingSpinner'
import AdBanner from '../components/AdBanner'
import { getGameEditorialCopy } from '../content/gameEditorialCopy'

const DAY_OPTIONS = [7, 30, 90]
const STORES = ['steam', 'epic', 'xbox']

function formatCurrency(price, currency = 'INR') {
  if (!hasValidPrice(price)) return 'Not available'

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(Number(price))
}

function formatDateTime(str) {
  if (!str) return 'Unknown'
  return new Date(str).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function hasValidPrice(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0
}

function formatRelativeDate(value) {
  if (!value) return 'Unavailable'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Unavailable'

  const diff = Date.now() - date.getTime()
  const hours = Math.floor(diff / 3_600_000)
  const days = Math.floor(diff / 86_400_000)

  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours}h ago`
  if (days < 30) return `${days}d ago`

  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function buildHistoryInsights(history) {
  if (!history || typeof history !== 'object') {
    return {
      lowestRecorded: 'Unavailable',
      currentBest: 'Unavailable',
      lastDrop: 'Unavailable',
      note: 'Price history will appear once enough snapshots have been collected.',
    }
  }

  let lowestRecorded = null
  let currentBest = null
  let lastDrop = null

  for (const [store, points] of Object.entries(history)) {
    if (!Array.isArray(points) || points.length === 0) continue

    const sortedPoints = [...points]
      .filter((point) => hasValidPrice(point?.price))
      .sort((a, b) => new Date(a.scrapedAt).getTime() - new Date(b.scrapedAt).getTime())

    if (sortedPoints.length === 0) continue

    const latestPoint = sortedPoints[sortedPoints.length - 1]

    if (!currentBest || Number(latestPoint.price) < Number(currentBest.price)) {
      currentBest = { store, ...latestPoint }
    }

    for (let index = 1; index < sortedPoints.length; index += 1) {
      const previousPoint = sortedPoints[index - 1]
      const currentPoint = sortedPoints[index]

      if (
        hasValidPrice(currentPoint.price) &&
        hasValidPrice(previousPoint.price) &&
        Number(currentPoint.price) < Number(previousPoint.price)
      ) {
        if (!lastDrop || new Date(currentPoint.scrapedAt).getTime() > new Date(lastDrop.scrapedAt).getTime()) {
          lastDrop = { store, ...currentPoint, previousPrice: previousPoint.price }
        }
      }
    }

    for (const point of sortedPoints) {
      if (!lowestRecorded || Number(point.price) < Number(lowestRecorded.price)) {
        lowestRecorded = { store, ...point }
      }
    }
  }

  return {
    lowestRecorded: lowestRecorded ? `${formatCurrency(lowestRecorded.price)} on ${lowestRecorded.store}` : 'Unavailable',
    currentBest: currentBest ? `${formatCurrency(currentBest.price)} on ${currentBest.store}` : 'Unavailable',
    lastDrop: lastDrop ? `${formatRelativeDate(lastDrop.scrapedAt)} on ${lastDrop.store}` : 'No recent drop recorded',
    note:
      lowestRecorded || currentBest || lastDrop
        ? 'These figures are derived from the latest collected snapshots and may change after the next crawl.'
        : 'No stable historical pattern is available yet, so this page uses a fallback explanation instead of a blank card.',
  }
}

export default function Game() {
  const { id } = useParams()
  const location = useLocation()

  const [prices, setPrices]     = useState(null)
  const [history, setHistory]   = useState(null)
  const [pricesLoading, setPricesLoading] = useState(true)
  const [histLoading, setHistLoading]     = useState(true)
  const [pricesError, setPricesError]     = useState(null)
  const [histError, setHistError]         = useState(null)
  const [days, setDays] = useState(90)

  // Optimistic name from search navigation state
  const nameFromState = location.state?.gameName
  const baseTitle = nameFromState ?? getGameEditorialCopy({ id }).title

  // Update page meta tags for SEO
  useEffect(() => {
    const displayName = prices?.gameName ?? baseTitle
    const cheapestPrice = prices?.cheapestPrice
    const cheapestStore = prices?.cheapestStore ?? 'store'
    const storeResults = prices?.results ?? []
    
    document.title = `${displayName} Prices | Steam, Epic, Xbox Comparison`
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.content = `Compare prices for ${displayName} across Steam, Epic Games, and Xbox. Best price: ${cheapestPrice != null ? `${cheapestPrice} on ${cheapestStore}` : 'Check now'}.`
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDescription = document.querySelector('meta[property="og:description"]')
    const canonical = document.querySelector('link[rel="canonical"]')
    
    if (ogTitle) ogTitle.content = `Compare ${displayName} Prices`
    if (ogDescription) ogDescription.content = `Find the best price for ${displayName} across all major gaming stores.`
    if (canonical) canonical.href = `https://deal-scraper.vercel.app/game/${id}`
    
    // Add JSON-LD structured data
    const existingScript = document.getElementById('game-schema')
    if (existingScript) existingScript.remove()
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": displayName,
      "url": `https://deal-scraper.vercel.app/game/${id}`,
      "offers": storeResults.map(item => ({
        "@type": "Offer",
        "priceCurrency": prices?.currency || "USD",
        "price": item.price,
        "seller": {
          "@type": "Organization",
          "name": item.store
        }
      })),
      "aggregateOffer": {
        "@type": "AggregateOffer",
        "priceCurrency": prices?.currency || "USD",
        "lowPrice": prices?.cheapestPrice,
        "highPrice": storeResults.length > 0 ? Math.max(...storeResults.map(r => r.price)) : prices?.cheapestPrice,
        "offerCount": storeResults.length
      }
    }
    
    const scriptTag = document.createElement('script')
    scriptTag.id = 'game-schema'
    scriptTag.type = 'application/ld+json'
    scriptTag.innerHTML = JSON.stringify(schema)
    document.head.appendChild(scriptTag)
    
    return () => {
      const script = document.getElementById('game-schema')
      if (script) script.remove()
    }
  }, [prices, id, baseTitle])

  useEffect(() => {
    let cancelled = false
    setPricesLoading(true)
    setPricesError(null)
    getGamePrices(id)
      .then((d) => { if (!cancelled) {  setPrices(d); console.log("Game prices:", d); } })
      .catch((e) => { if (!cancelled) setPricesError(e.message) })
      .finally(() => { if (!cancelled) setPricesLoading(false) })
    return () => { cancelled = true }
  }, [id])

  useEffect(() => {
    let cancelled = false
    setHistLoading(true)
    setHistError(null)
    getGameHistory(id, days)
      .then((d) => { if (!cancelled) setHistory(d) })
      .catch((e) => { if (!cancelled) setHistError(e.message) })
      .finally(() => { if (!cancelled) setHistLoading(false) })
    return () => { cancelled = true }
  }, [id, days])

  const displayName = prices?.gameName ?? baseTitle
  const editorialCopy = getGameEditorialCopy({ id, title: displayName, description: prices?.description })
  const storeResults = prices?.results ?? []
  const availableStoreResults = storeResults.filter((item) => hasValidPrice(item?.price))
  const cheapestResult = availableStoreResults.reduce((best, item) => {
    if (!best) return item
    return Number(item.price) < Number(best.price) ? item : best
  }, null)
  const cheapestKey = cheapestResult?.store?.toLowerCase()
  const storeLinks = prices?.storeLinks ?? {}
  const historyInsights = buildHistoryInsights(history)
  const currentBestLabel = cheapestResult?.price != null
    ? `${formatCurrency(cheapestResult.price, prices?.currency)} on ${cheapestResult.store}`
    : historyInsights.currentBest

  const insightCards = [
    {
      label: 'Lowest recorded price',
      value: historyInsights.lowestRecorded,
      detail: 'Based on collected historical snapshots across stores.',
    },
    {
      label: 'Current best deal',
      value: currentBestLabel,
      detail: prices?.lastUpdatedAt ? `Last refreshed ${formatRelativeDate(prices.lastUpdatedAt)}` : 'Waiting for the next update.',
    },
    {
      label: 'Last price drop',
      value: historyInsights.lastDrop,
      detail: historyInsights.note,
    },
  ]

  const reloadPrices = async () => {
    setPricesLoading(true)
    setPricesError(null)
    try {
      const data = await getGamePrices(id)
      setPrices(data)
    } catch (error) {
      setPricesError(error.message)
    } finally {
      setPricesLoading(false)
    }
  }


  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-[#9ca3af] hover:text-white text-sm font-medium transition-colors mb-8 group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to Deals
      </Link>

      <section className="mb-8 animate-fade-in">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20">
            <TrendingDown size={11} />
            Price comparison across Steam, Epic, Xbox
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#6366f1]/10 text-[#a5b4fc] border border-[#6366f1]/20 capitalize">
            {cheapestResult?.store ? cheapestResult.store : 'Tracking live feeds'}
          </span>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl font-black text-[#e5e7eb] leading-tight mb-3 tracking-tight">
              {displayName}
            </h1>
            <div className="space-y-4 text-[#cbd5e1] text-sm sm:text-[15px] leading-7">
              <p>{editorialCopy.summary}</p>
              <p>{editorialCopy.whyTrack}</p>
              <p>{prices?.description || editorialCopy.priceFallback}</p>
            </div>
          </div>

          {prices?.lastUpdatedAt && (
            <div className="flex items-center gap-2 bg-[#111827] border border-white/5 rounded-xl px-4 py-3 self-start flex-shrink-0">
              <CalendarDays size={14} className="text-[#6366f1]" />
              <div>
                <p className="text-[#6b7280] text-[10px] font-semibold uppercase tracking-wider">Last Updated</p>
                <p className="text-[#e5e7eb] text-xs font-medium mt-0.5">
                  {formatDateTime(prices.lastUpdatedAt)}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mb-12 bg-[#111827] border border-white/5 rounded-2xl p-6 sm:p-7">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingBag size={16} className="text-[#6366f1]" />
          <h2 className="text-base font-bold text-[#e5e7eb]">Price Insight</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {insightCards.map((card) => (
            <div key={card.label} className="rounded-xl border border-white/5 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wider text-[#6b7280] font-semibold mb-2">{card.label}</p>
              <p className="text-sm sm:text-base font-bold text-[#e5e7eb] mb-2 leading-6">{card.value}</p>
              <p className="text-[#94a3b8] text-xs sm:text-sm leading-6">{card.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="flex items-center gap-2 text-base font-bold text-[#e5e7eb]">
            <ShoppingBag size={16} className="text-[#6366f1]" />
            Price Comparison
          </h2>
          <button
            onClick={reloadPrices}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#9ca3af] hover:text-white transition-colors"
          >
            <RefreshCw size={12} className={pricesLoading ? 'animate-spin' : ''} />
            Refresh prices
          </button>
        </div>

        {pricesError && (
          <div className="bg-[#ef4444]/8 border border-[#ef4444]/20 rounded-2xl p-6 mb-4">
            <p className="text-[#fecaca] font-semibold mb-1">Price data is currently unavailable</p>
            <p className="text-[#fca5a5] text-sm leading-6">
              {pricesError}. The page still shows the written overview and price-insight context so the screen never feels empty.
            </p>
          </div>
        )}

        {pricesLoading ? (
          <LoadingSpinner text="Loading game prices…" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
            {storeResults.length > 0
              ? storeResults.map((item) => (
                  <StorePriceCard
                    key={item.store}
                    store={item.store}
                    price={hasValidPrice(item.price) ? item.price : null}
                    scrapedAt={item.scrapedAt}
                    isCheapest={item.store?.toLowerCase() === cheapestKey}
                    currency={prices?.currency}
                    store_link={storeLinks}
                  />
                ))
              : STORES.map((s) => (
                  <StorePriceCard
                    key={s}
                    store={s}
                    price={null}
                    isCheapest={false}
                    currency={prices?.currency}
                    store_link={storeLinks}
                  />
                ))}
          </div>
        )}
      </section>

      <AdBanner className="mt-10 mb-10" />

      {/* ── Price history chart ── */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="flex items-center gap-2 text-base font-bold text-[#e5e7eb]">
            <History size={16} className="text-[#6366f1]" />
            Price History
          </h2>
          {/* Days toggle */}
          <div className="flex items-center gap-1 bg-[#0f172a] border border-white/5 rounded-lg p-1">
            {DAY_OPTIONS.map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all duration-200 ${
                  days === d
                    ? 'bg-[#6366f1] text-white shadow shadow-indigo-500/30'
                    : 'text-[#9ca3af] hover:text-white'
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>

        {histLoading ? (
          <LoadingSpinner size="sm" text="Loading price history…" />
        ) : histError ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
            <p className="text-[#ef4444] text-sm font-medium">Failed to load history</p>
            <p className="text-[#6b7280] text-xs max-w-md leading-6">
              {histError}. The page still provides live comparison context and buying guidance so the content remains useful while the chart feed recovers.
            </p>
          </div>
        ) : (
          <PriceChart history={history} />
        )}
      </div>

      {/* ── SEO content block ── */}
      <section className="mt-10 bg-[#111827] border border-white/5 rounded-2xl p-6 sm:p-7">
        <h2 className="text-lg font-bold text-[#e5e7eb] mb-3">About {displayName} Price Tracking</h2>
        <div className="space-y-4 text-[#cbd5e1] text-sm sm:text-[15px] leading-7">
          <p>{editorialCopy.bestTime}</p>
          <p>{editorialCopy.platformInsight}</p>
        </div>
      </section>

      <AdBanner className="mt-10" />
    </div>
  )
}
