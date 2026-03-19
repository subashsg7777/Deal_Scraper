import React from 'react'
import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search games...', onClear }) {
  return (
    <div className="relative group">
      <Search
        size={17}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af] group-focus-within:text-[#6366f1] transition-colors duration-200 pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#111827] border border-white/10 rounded-xl pl-11 pr-11 py-3.5 text-[#e5e7eb] placeholder-[#6b7280] text-sm
          focus:outline-none focus:border-[#6366f1]/50 focus:ring-2 focus:ring-[#6366f1]/10
          hover:border-white/20
          transition-all duration-200"
      />
      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-[#9ca3af] hover:text-white transition-all duration-150"
          aria-label="Clear search"
        >
          <X size={12} />
        </button>
      )}
    </div>
  )
}
