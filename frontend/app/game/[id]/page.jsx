import Link from 'next/link'
import { ArrowLeft, TrendingDown, History, ShoppingBag, CalendarDays } from 'lucide-react'
import StorePriceCard from '../../components/StorePriceCard'
import PriceChartClient from '../../components/PriceChartClient'
import AdBanner from '../../components/AdBanner'
import { getAllGames, getGame, getGameHistory, getGamePrices } from '../../lib/api'
import { getGameEditorialCopy } from '../../../src/content/gameEditorialCopy'

export const revalidate = 21600
export const dynamicParams = true

const DAY_OPTIONS = [7, 30, 90]
const STORES = ['steam', 'epic', 'xbox']

function hasValidPrice(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0
}

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

export async function generateStaticParams() {
  try {
    const games = await getAllGames()
    if (!Array.isArray(games)) return []

    return games
      .map((game) => ({ id: String(game.id || game._id || game.gameId || '') }))
      .filter((item) => item.id)
  } catch {
    return []
  }
}

export default async function GamePage({ params, searchParams }) {
  const id = params.id
  const rawDays = Number(searchParams?.days)
  const days = DAY_OPTIONS.includes(rawDays) ? rawDays : 90

  const gameInfo = await getGame(id).catch(() => null)
  const pricesResult = await getGamePrices(id).then(
    (value) => ({ status: 'fulfilled', value }),
    () => ({ status: 'rejected' }),
  )
  const historyResult = await getGameHistory(id, days).then(
    (value) => ({ status: 'fulfilled', value }),
    () => ({ status: 'rejected' }),
  )

  const prices = pricesResult.status === 'fulfilled' ? pricesResult.value : null
  const history = historyResult.status === 'fulfilled' ? historyResult.value : null

  const nameFromQuery = typeof searchParams?.name === 'string' ? searchParams.name : null
  const criticalTitle = gameInfo?.name?.trim() || prices?.gameName?.trim() || nameFromQuery || getGameEditorialCopy({ id }).title
  const criticalDescription = gameInfo?.description?.trim() || prices?.description?.trim() || null
  const editorialCopy = getGameEditorialCopy({
    id,
    title: criticalTitle,
    description: criticalDescription,
  })
  const displayName = criticalTitle

  const renderedDescription = criticalDescription || editorialCopy.summary

  const storeResults = Array.isArray(prices?.results) ? prices.results : []
  const availableStoreResults = storeResults.filter((item) => hasValidPrice(item?.price))

  const cheapestResult = availableStoreResults.reduce((best, item) => {
    if (!best) return item
    return Number(item.price) < Number(best.price) ? item : best
  }, null)

  const cheapestKey = cheapestResult?.store?.toLowerCase()
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

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/"
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
              <p>{renderedDescription}</p>
              <p>{editorialCopy.whyTrack}</p>
              <p>{editorialCopy.bestTime}</p>
            </div>
          </div>

          {prices?.lastUpdatedAt ? (
            <div className="flex items-center gap-2 bg-[#111827] border border-white/5 rounded-xl px-4 py-3 self-start flex-shrink-0">
              <CalendarDays size={14} className="text-[#6366f1]" />
              <div>
                <p className="text-[#6b7280] text-[10px] font-semibold uppercase tracking-wider">Last Updated</p>
                <p className="text-[#e5e7eb] text-xs font-medium mt-0.5">
                  {formatDateTime(prices.lastUpdatedAt)}
                </p>
              </div>
            </div>
          ) : null}
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
        <h2 className="flex items-center gap-2 text-base font-bold text-[#e5e7eb] mb-4">
          <ShoppingBag size={16} className="text-[#6366f1]" />
          Price Comparison
        </h2>

        {pricesResult.status === 'rejected' ? (
          <div className="bg-[#ef4444]/8 border border-[#ef4444]/20 rounded-2xl p-6 mb-4">
            <p className="text-[#fecaca] font-semibold mb-1">Price data is currently unavailable</p>
            <p className="text-[#fca5a5] text-sm leading-6">
              The page still shows server-rendered game context and buying insight, so it remains useful while price feeds recover.
            </p>
          </div>
        ) : null}

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
                />
              ))
            : STORES.map((s) => (
                <StorePriceCard
                  key={s}
                  store={s}
                  price={null}
                  isCheapest={false}
                  currency={prices?.currency}
                />
              ))}
        </div>
      </section>

      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="flex items-center gap-2 text-base font-bold text-[#e5e7eb]">
            <History size={16} className="text-[#6366f1]" />
            Price History
          </h2>

          <div className="flex items-center gap-1 bg-[#0f172a] border border-white/5 rounded-lg p-1">
            {DAY_OPTIONS.map((option) => (
              <Link
                key={option}
                href={`/game/${id}?days=${option}${nameFromQuery ? `&name=${encodeURIComponent(nameFromQuery)}` : ''}`}
                className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all duration-200 ${
                  days === option
                    ? 'bg-[#6366f1] text-white shadow shadow-indigo-500/30'
                    : 'text-[#9ca3af] hover:text-white'
                }`}
              >
                {option}d
              </Link>
            ))}
          </div>
        </div>

        {historyResult.status === 'rejected' ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
            <p className="text-[#ef4444] text-sm font-medium">Failed to load history</p>
            <p className="text-[#6b7280] text-xs max-w-md leading-6">
              The page still provides server-rendered comparison context and buying guidance while history data reloads.
            </p>
          </div>
        ) : (
          <PriceChartClient history={history} />
        )}
      </div>

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
