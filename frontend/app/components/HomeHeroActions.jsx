'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, RefreshCw } from 'lucide-react'
import { useState } from 'react'

export default function HomeHeroActions() {
  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    router.refresh()
    setRefreshing(false)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
      <Link
        href="/search"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#4f46e5] px-8 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-indigo-500/50 active:translate-y-0 sm:w-auto"
      >
        Search Games
        <ArrowRight size={15} />
      </Link>
      <button
        type="button"
        onClick={handleRefresh}
        disabled={refreshing}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 font-semibold text-[#e5e7eb] transition-all duration-200 hover:border-white/20 hover:bg-white/10 disabled:opacity-50 sm:w-auto"
      >
        <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
        Refresh Deals
      </button>
    </div>
  )
}
