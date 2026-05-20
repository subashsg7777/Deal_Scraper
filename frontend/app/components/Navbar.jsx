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

  const isActive = (path) => {
    if (path === '/blogs') {
      const legacyBlogPaths = new Set([
        '/best_classic_games',
        '/best_games_2025',
        '/steam_sales',
        '/steam_sales_article',
      ])
      return pathname === '/blogs' || pathname.startsWith('/articles/') || legacyBlogPaths.has(pathname)
    }
    return pathname === path
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blogs', path: '/blogs' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/60 backdrop-blur-xl border-b border-slate-700/15 shadow-2xl shadow-slate-950/50' : 'bg-slate-900/60 backdrop-blur-xl border-b border-slate-700/15 shadow-2xl shadow-slate-950/50'}`}>
      <div className="flex items-center justify-between px-6 sm:px-8 h-20 max-w-screen-2xl mx-auto font-medium tracking-wide">
        <Link href="/" className="text-2xl font-bold tracking-tighter bg-gradient-to-br from-violet-300 to-blue-500 bg-clip-text text-transparent transition-transform duration-200 hover:scale-105">
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
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden rounded-lg p-2 text-violet-400 transition-all duration-200 hover:bg-slate-800/40 active:scale-95"
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
