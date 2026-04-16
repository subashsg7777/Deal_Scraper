import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Ghost } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      {/* Icon */}
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-3xl flex items-center justify-center mx-auto">
          <Ghost size={40} className="text-[#6366f1]" />
        </div>
        <span className="absolute -top-2 -right-2 w-8 h-8 bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-full flex items-center justify-center text-[#ef4444] text-[11px] font-extrabold">
          404
        </span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-black text-[#e5e7eb] mb-3 tracking-tight">
        Page Not Found
      </h1>
      <p className="text-[#9ca3af] text-base mb-9 max-w-sm leading-relaxed">
        This page doesn't exist or has been moved. Let's get you back to tracking deals.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white px-7 py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-200"
      >
        <Home size={16} />
        Back to Home
      </Link>
    </div>
  )
}
