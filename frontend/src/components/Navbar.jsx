import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Home, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const isActive = (path) => location.pathname === path

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass border-b border-white/5 shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <img
              src="/logo.png"
              alt="Deal Scraper"
              className="w-9 h-9 rounded-lg object-cover shadow-lg shadow-black/40 group-hover:scale-105 transition-transform duration-200"
            />
            <span className="text-base font-bold text-gradient-white hidden sm:block">
              Deal_Scraper
            </span>
            <span className="text-base font-bold text-gradient-white sm:hidden">
              GPTracker
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/')
                  ? 'bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20'
                  : 'text-[#9ca3af] hover:text-[#e5e7eb] hover:bg-white/5'
              }`}
            >
              <Home size={14} />
              Home
            </Link>
            <Link
              to="/search"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/search')
                  ? 'bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20'
                  : 'text-[#9ca3af] hover:text-[#e5e7eb] hover:bg-white/5'
              }`}
            >
              <Search size={14} />
              Search
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-[#9ca3af] hover:text-white hover:bg-white/5 transition-all"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/5 px-4 py-3 flex flex-col gap-1 animate-fade-in">
          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              isActive('/') ? 'bg-[#6366f1]/10 text-[#6366f1]' : 'text-[#9ca3af] hover:text-white'
            }`}
          >
            <Home size={15} /> Home
          </Link>
          <Link
            to="/search"
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              isActive('/search') ? 'bg-[#6366f1]/10 text-[#6366f1]' : 'text-[#9ca3af] hover:text-white'
            }`}
          >
            <Search size={15} /> Search
          </Link>
        </div>
      )}
    </header>
  )
}
