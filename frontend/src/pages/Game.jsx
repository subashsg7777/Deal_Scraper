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

const DAY_OPTIONS = [7, 30, 90]

function formatPrice(price, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price)
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

  // Update page meta tags for SEO
  useEffect(() => {
    const displayName = prices?.gameName ?? nameFromState ?? `Game #${id}`
    const cheapestPrice = prices?.cheapestPrice ?? 'best'
    const cheapestStore = prices?.cheapestStore ?? 'store'
    const storeResults = prices?.results ?? []
    
    document.title = `${displayName} Prices | Steam, Epic, Xbox Comparison`
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.content = `Compare prices for ${displayName} across Steam, Epic Games, and Xbox. Best price: ${cheapestPrice ? cheapestPrice + ' on ' + cheapestStore : 'Check now'}.`
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
  }, [prices, id, nameFromState])

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

  const displayName = prices?.gameName ?? nameFromState ?? `Game #${id}`
  const storeResults = prices?.results ?? []
  const cheapestKey = prices?.cheapestStore?.toLowerCase()
  const storeLinks = prices?.storeLinks ?? {}


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

      {/* ── Prices section ── */}
      {pricesLoading ? (
        <LoadingSpinner text="Loading game prices…" />
      ) : pricesError ? (
        <div className="bg-[#ef4444]/8 border border-[#ef4444]/20 rounded-2xl p-10 text-center max-w-md mx-auto mb-12">
          <p className="text-[#ef4444] font-semibold mb-2">Failed to load price data</p>
          <p className="text-[#9ca3af] text-sm">{pricesError}</p>
        </div>
      ) : (
        <>
          {/* Game header */}
          <div className="mb-10 animate-fade-in">
            {/* Cheap badge */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20">
                <TrendingDown size={11} />
                Best deal tracked
              </span>
              {prices?.cheapestStore && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#6366f1]/10 text-[#a5b4fc] border border-[#6366f1]/20 capitalize">
                  {prices.cheapestStore}
                </span>
              )}
            </div>

            {/* Title row */}
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-[#e5e7eb] leading-tight mb-2 tracking-tight">
                  {displayName}
                </h1>
                {prices?.cheapestPrice != null && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-[#9ca3af] text-sm">Best price:</span>
                    <span className="text-[#22c55e] text-2xl font-extrabold tracking-tight">
                      {formatPrice(prices.cheapestPrice, prices.currency)}
                    </span>
                    <span className="text-[#9ca3af] text-sm font-medium capitalize">
                      on {prices.cheapestStore}
                    </span>
                  </div>
                )}
              </div>

              {/* Last updated chip */}
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
          </div>


          {/* Store price cards */}
          <div className="mb-12">
            <h2 className="flex items-center gap-2 text-base font-bold text-[#e5e7eb] mb-4">
              <ShoppingBag size={16} className="text-[#6366f1]" />
              Price Comparison
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
              {storeResults.length > 0
                ? storeResults.map((item) => (
                    <StorePriceCard
                      key={item.store}
                      store={item.store}
                      price={item.price}
                      scrapedAt={item.scrapedAt}
                      isCheapest={item.store?.toLowerCase() === cheapestKey}
                      currency={prices?.currency}
                      store_link={storeLinks}
                    />
                  ))
                : ['steam', 'epic', 'xbox'].map((s) => (
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
          </div>
        </>
      )}

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
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <p className="text-[#ef4444] text-sm font-medium">Failed to load history</p>
            <p className="text-[#6b7280] text-xs">{histError}</p>
          </div>
        ) : (
          <PriceChart history={history} />
        )}
      </div>

      <AdBanner className="mt-10" />
    </div>
  )
}
