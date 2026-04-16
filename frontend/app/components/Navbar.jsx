'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isActive = (path) => pathname === path

  const navLinks = [
    { name: 'Deals', path: '/' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/60 backdrop-blur-xl border-b border-slate-700/15 shadow-2xl shadow-slate-950/50' : 'bg-transparent'}`}>
      <div className="flex items-center justify-between px-8 py-4 max-w-screen-2xl mx-auto font-inter antialiased text-sm font-medium tracking-wide">
        <Link href="/" className="text-2xl font-bold tracking-tighter bg-gradient-to-br from-violet-300 to-blue-500 bg-clip-text text-transparent group hover:scale-105 transition-transform duration-200">
          DealScraper
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`transition-colors ${
                isActive(link.path)
                  ? 'text-violet-300 border-b-2 border-violet-500 pb-1'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="p-2 hover:bg-slate-800/40 rounded-lg transition-all active:scale-95 duration-200"
            aria-label="Go to deals"
          >
            <span className="material-symbols-outlined text-violet-400">search</span>
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 hover:bg-slate-800/40 rounded-lg transition-all active:scale-95 duration-200 text-violet-400"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden glass border-t border-slate-700/15 px-8 py-4 flex flex-col gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-lg transition-colors ${
                isActive(link.path) ? 'text-violet-300 font-bold' : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
