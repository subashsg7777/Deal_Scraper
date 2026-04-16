import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full py-12 px-8 border-t border-slate-800/30 bg-slate-950 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-screen-2xl mx-auto">
        <div className="space-y-4">
          <Link href="/" className="text-xl font-black text-slate-200 flex items-center gap-2 group">
            <img src="/logo.png" alt="Deal Scraper" className="w-8 h-8 rounded-lg shadow-lg group-hover:scale-105 transition-transform"/>
            DealScraper
          </Link>
          <p className="font-inter text-xs text-slate-500 uppercase tracking-widest leading-relaxed">
            © {new Date().getFullYear()} DealScraper. Built for gamers.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-slate-200 font-bold text-sm mb-2">Platform</h4>
          <Link href="/" className="font-inter text-xs text-slate-500 uppercase tracking-widest hover:text-violet-300 transition-colors">Deals</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-slate-200 font-bold text-sm mb-2">Support</h4>
          <Link href="/privacy-policy" className="font-inter text-xs text-slate-500 uppercase tracking-widest hover:text-violet-300 transition-colors">Privacy Policy</Link>
          <Link href="/terms-of-service" className="font-inter text-xs text-slate-500 uppercase tracking-widest hover:text-violet-300 transition-colors">Terms of Service</Link>
        </div>

        <div className="space-y-4">
          <h4 className="text-slate-200 font-bold text-sm mb-2">Connect</h4>
          <div className="flex gap-4">
            <a href="mailto:subashanandaraj@outlook.com" className="text-slate-500 hover:text-violet-300 transition-colors">
              <span className="material-symbols-outlined">mail</span>
            </a>
            <span className="material-symbols-outlined text-slate-500 hover:text-violet-300 transition-colors cursor-pointer">rss_feed</span>
            <span className="material-symbols-outlined text-slate-500 hover:text-violet-300 transition-colors cursor-pointer">share</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
