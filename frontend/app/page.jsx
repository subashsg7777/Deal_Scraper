import Link from 'next/link'
import { TrendingDown, Activity } from 'lucide-react'
import { getAllGames, getDeals } from './lib/api'
import DealCard from './components/DealCard'
import AdBanner from './components/AdBanner'

export const revalidate = 21600

function isAvailableDeal(deal) {
  const newPrice = Number(deal?.newPrice)
  const oldPrice = Number(deal?.oldPrice)
  return Number.isFinite(newPrice) && Number.isFinite(oldPrice) && newPrice > 0 && oldPrice > 0
}

export default async function HomePage() {
  const [dealsData, gamesData] = await Promise.allSettled([getDeals(), getAllGames()])

  const deals = dealsData.status === 'fulfilled' && Array.isArray(dealsData.value) ? dealsData.value : []
  const games = gamesData.status === 'fulfilled' && Array.isArray(gamesData.value) ? gamesData.value : []
  const visibleDeals = deals.filter(isAvailableDeal).slice(0, 16)

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-4 pt-20 pb-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#6366f1]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#22c55e]/6 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#6366f1]/10 border border-[#6366f1]/25 rounded-full px-4 py-1.5 mb-7 text-[#a5b4fc] text-sm font-medium">
            <Activity size={13} />
            Real-time price tracking across 3 platforms
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-5 leading-[1.05]">
            <span className="text-gradient-white">Game Deals</span>
            <br />
            <span className="text-gradient-indigo">Tracker</span>
          </h1>

          <p className="text-[#9ca3af] text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Find the cheapest price across <span className="text-[#1d9bf0] font-semibold">Steam</span>, <span className="text-[#a78bfa] font-semibold">Epic Games</span>, and <span className="text-[#22c55e] font-semibold">Xbox</span> all in one place.
          </p>

          <div className="space-y-4 max-w-3xl mx-auto mb-8 text-[#cbd5e1] text-sm sm:text-base leading-7 text-left sm:text-center">
            <p>
              DealScraper is built for buyers who want more than a raw price widget. Each game page explains what the game is, why its current price matters, and how its recent history compares across the major stores. That keeps the site useful even when a feed is slow or a store snapshot is delayed.
            </p>
            <p>
              Use this homepage to scan active offers, then open each game page for server-rendered descriptions, current deal context, and a compact price insight summary before any charts or widgets.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-[#e5e7eb]">
              Tracking {games.length || '500+'} games
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-[#e5e7eb]">
              Updated every 6 hours
            </span>
            <span className="inline-flex items-center rounded-full border border-[#22c55e]/20 bg-[#22c55e]/10 px-3 py-1.5 text-xs font-semibold text-[#dcfce7]">
              {visibleDeals.length} latest deals
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-7">
          <h2 className="text-2xl font-black text-[#e5e7eb] mb-4">Popular Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/game/69b52f0660f9e6d7a4183316?name=Cyberpunk%202077" className="rounded-xl border border-[#1d9bf0]/30 bg-[#1d9bf0]/10 px-4 py-3 text-[#dbeafe] font-semibold hover:bg-[#1d9bf0]/20 hover:border-[#1d9bf0]/50 transition">Cyberpunk 2077</Link>
            <Link href="/game/69b7713923c3b3b3ff8a4ca2?name=Elden%20Ring" className="rounded-xl border border-[#22c55e]/30 bg-[#22c55e]/10 px-4 py-3 text-[#dcfce7] font-semibold hover:bg-[#22c55e]/20 hover:border-[#22c55e]/50 transition">Elden Ring</Link>
            <Link href="/game/69b52f0660f9e6d7a4183327?name=Red%20Dead%20Redemption%202" className="rounded-xl border border-[#a78bfa]/30 bg-[#8b5cf6]/10 px-4 py-3 text-[#ede9fe] font-semibold hover:bg-[#8b5cf6]/20 hover:border-[#a78bfa]/50 transition">Red Dead Redemption 2</Link>
            <Link href="/game/69b52f0660f9e6d7a4183326?name=Hogwarts%20Legacy" className="rounded-xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-4 py-3 text-[#fef3c7] font-semibold hover:bg-[#f59e0b]/20 hover:border-[#f59e0b]/50 transition">Hogwarts Legacy</Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center gap-3 mb-7">
          <div className="w-9 h-9 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center">
            <TrendingDown size={17} className="text-[#22c55e]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#e5e7eb]">Latest Deals</h2>
            <p className="text-[#9ca3af] text-xs mt-0.5">{visibleDeals.length} active deals</p>
          </div>
        </div>

        {visibleDeals.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#9ca3af] text-lg mb-1 font-medium">No deals right now</p>
            <p className="text-[#6b7280] text-sm">The page still includes descriptive content and value signals while deal feeds refresh.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
            {visibleDeals.map((deal, idx) => (
              <div key={deal.gameId ?? idx}>
                <DealCard deal={deal} />
                {(idx + 1) % 8 === 0 && (idx + 1) < visibleDeals.length ? (
                  <AdBanner className="mt-4" />
                ) : null}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
