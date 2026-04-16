import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search as SearchIcon, Gamepad2, ChevronRight, Sparkles } from 'lucide-react'
import { searchGames } from '../api/api'
import SearchBar from '../components/SearchBar'
import LoadingSpinner from '../components/LoadingSpinner'
import AdBanner from '../components/AdBanner'

const MIN_SEARCH_LENGTH = 4

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  const debouncedQuery = useDebounce(query, 420)

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim()

    if (!trimmedQuery || trimmedQuery.length < MIN_SEARCH_LENGTH) {
      setResults([])
      setHasSearched(false)
      setError(null)
      return
    }
    let cancelled = false
    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await searchGames(trimmedQuery)
        if (!cancelled) {
          setResults(Array.isArray(data) ? data : [])
          setHasSearched(true)
        }
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [debouncedQuery])

  const gameName = (g) => g.name ?? g.gameName ?? g.title ?? 'Unknown Game'
  const gameId   = (g) => g.id ?? g.gameId

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full px-3.5 py-1.5 mb-4 text-[#a5b4fc] text-xs font-semibold">
          <Sparkles size={12} />
          Smart Search
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#e5e7eb] mb-2 tracking-tight">
          Search Games
        </h1>
        <p className="text-[#9ca3af] text-sm">
          Instantly compare prices across Steam, Epic Games, and Xbox
        </p>
      </div>

      {/* Search input */}
      <div className="mb-8">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="e.g. Cyberpunk 2077, Elden Ring…"
          onClear={() => setQuery('')}
        />
      </div>

      {/* Content states */}
      {loading ? (
        <LoadingSpinner text="Searching games…" />
      ) : error ? (
        <div className="bg-[#ef4444]/8 border border-[#ef4444]/20 rounded-2xl p-7 text-center">
          <p className="text-[#ef4444] font-semibold mb-1">Search failed</p>
          <p className="text-[#9ca3af] text-sm">{error}</p>
        </div>
      ) : !query.trim() ? (
        /* Empty state */
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <SearchIcon size={28} className="text-[#6366f1]" />
          </div>
          <p className="text-[#e5e7eb] font-semibold mb-1.5">Start typing to search</p>
          <p className="text-[#6b7280] text-sm max-w-xs mx-auto">
            We'll search across all three platforms and show you the best deal
          </p>
        </div>
      ) : query.trim().length < MIN_SEARCH_LENGTH ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <SearchIcon size={28} className="text-[#6366f1]" />
          </div>
          <p className="text-[#e5e7eb] font-semibold mb-1.5">Type at least 4 characters</p>
          <p className="text-[#6b7280] text-sm max-w-xs mx-auto">
            Search will start automatically after 4 or more characters
          </p>
        </div>
      ) : hasSearched && results.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[#9ca3af] text-lg font-medium mb-1">No results found</p>
          <p className="text-[#6b7280] text-sm">Try a different search term</p>
        </div>
      ) : results.length > 0 ? (
        <div className="animate-fade-in">
          <p className="text-[#6b7280] text-xs font-semibold uppercase tracking-wider mb-3">
            {results.length} result{results.length !== 1 ? 's' : ''}
          </p>
          <div className="flex flex-col gap-2">
            {results.map((game, index) => (
              <React.Fragment key={gameId(game)}>
                <Link
                  to={`/game/${gameId(game)}`}
                  state={{ gameName: gameName(game) }}
                  className="flex items-center justify-between bg-[#111827] border border-white/5 rounded-xl px-5 py-4
                    hover:border-[#6366f1]/30 hover:bg-[#6366f1]/5
                    transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#6366f1]/15 transition-colors">
                      <Gamepad2 size={17} className="text-[#6366f1]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[#e5e7eb] font-semibold text-sm truncate group-hover:text-white transition-colors">
                        {gameName(game)}
                      </p>
                      {game.genre && (
                        <p className="text-[#6b7280] text-xs mt-0.5 truncate">{game.genre}</p>
                      )}
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-[#6b7280] group-hover:text-[#6366f1] group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 ml-3"
                  />
                </Link>

                {(index + 1) % 5 === 0 && <AdBanner className="mt-2" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
