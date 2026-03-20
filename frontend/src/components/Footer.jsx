import React from 'react'
import { Link } from 'react-router-dom'

const STORE_LOGOS = [
  {
    name: 'Steam',
    url: 'https://cdn.jsdelivr.net/npm/simple-icons@11.0.0/icons/steam.svg',
  },
  {
    name: 'Epic Games',
    url: 'https://cdn.jsdelivr.net/npm/simple-icons@11.0.0/icons/epicgames.svg',
  },
  {
    name: 'Xbox',
    url: 'https://cdn.jsdelivr.net/npm/simple-icons@11.0.0/icons/xbox.svg',
  },
]

export default function Footer() {
  return (
    <footer className="mt-auto bg-gradient-to-b from-[#111827] to-[#0f172a] py-8 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 sm:gap-6 text-center">
          <div className="flex justify-center -mt-14 sm:-mt-16">
            <img
              src="/logo.png"
              alt="Deal Scraper Logo"
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-[#111827] shadow-lg shadow-black/50 bg-gray-600"
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Deal Scraper
          </h2>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {STORE_LOGOS.map((store) => {
              const colors = {
                Steam: { bg: 'bg-blue-600', hover: 'hover:bg-blue-500' },
                'Epic Games': { bg: 'bg-purple-600', hover: 'hover:bg-purple-500' },
                Xbox: { bg: 'bg-green-600', hover: 'hover:bg-green-500' },
              }
              const color = colors[store.name] || { bg: 'bg-gray-600', hover: 'hover:bg-gray-500' }

              return (
                <div key={store.name} className="flex flex-col items-center gap-2 group">
                  <div className={`w-14 h-14 ${color.bg} ${color.hover} rounded-lg flex items-center justify-center transition-colors duration-200 shadow-lg`}>
                    <img
                      src={store.url}
                      alt={`${store.name} logo`}
                      className="h-8 w-8 filter invert opacity-100"
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-white/80 text-xs sm:text-sm">
            Contact us:{' '}
            <a
              href="mailto:subashanandaraj@outlook.com"
              className="text-white font-semibold hover:text-blue-200 transition-colors duration-200"
            >
              subashanandaraj@outlook.com
            </a>
          </p>

          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <nav className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-base sm:text-lg">
            <Link
              to="/privacy-policy"
              className="text-[#cbd5e1] hover:text-[#93c5fd] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span className="text-[#475569]" aria-hidden>|</span>
            <Link
              to="/terms-of-service"
              className="text-[#cbd5e1] hover:text-[#93c5fd] transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <span className="text-[#475569]" aria-hidden>|</span>
            <Link
              to="/contact"
              className="text-[#cbd5e1] hover:text-[#93c5fd] transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>

          <p className="text-sm text-[#94a3b8]">
            © {new Date().getFullYear()} Deal Scraper. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
