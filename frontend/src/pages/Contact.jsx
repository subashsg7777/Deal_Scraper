import React from 'react'

export default function Contact() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      {/* Hero Section */}
      <section className="max-w-screen-xl mx-auto mb-20">
        <div className="flex flex-col items-center text-center">
          <span className="text-primary font-label text-xs tracking-[0.2em] uppercase mb-4">Direct Communication</span>
          <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tight mb-6">
            Get in <span className="bg-gradient-to-r from-primary to-secondary-container bg-clip-text text-transparent">touch</span>
          </h1>
          <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
            Have a technical question or found a bug in the matrix? Our team of digital scouts is ready to help you optimize your gaming budget.
          </p>
        </div>
      </section>

      {/* Main Content Area: Asymmetric Layout */}
      <section className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Form: Glassmorphism */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-xl p-8 md:p-12 border border-outline-variant/15">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">Identity</label>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-lg px-4 py-3 text-on-surface placeholder:text-outline/40 focus:ring-2 focus:ring-primary/30 focus:border-primary/40 outline-none transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">Gateway</label>
                  <input 
                    type="email" 
                    placeholder="email@example.com" 
                    className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-lg px-4 py-3 text-on-surface placeholder:text-outline/40 focus:ring-2 focus:ring-primary/30 focus:border-primary/40 outline-none transition-all duration-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">Transmission</label>
                <textarea 
                  rows={6} 
                  placeholder="How can we assist your hunt?" 
                  className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-lg px-4 py-3 text-on-surface placeholder:text-outline/40 focus:ring-2 focus:ring-primary/30 focus:border-primary/40 outline-none transition-all duration-300 resize-none"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary-container text-on-primary-container font-bold tracking-wide flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
              >
                Initialize Send
                <span className="material-symbols-outlined text-xl">send</span>
              </button>
            </form>
          </div>
        </div>

        {/* Alternative Contact & Info */}
        <div className="lg:col-span-5 space-y-8">
          {/* Support Tile */}
          <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/5">
            <h3 className="text-xl font-headline font-bold mb-6 text-slate-100">Direct Uplink</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary border border-outline-variant/15">
                  <span className="material-symbols-outlined">alternate_email</span>
                </div>
                <div>
                  <p className="text-xs font-label text-outline uppercase tracking-widest mb-1">Support Email</p>
                  <a href="mailto:support@dealscraper.app" className="text-lg font-medium text-primary-fixed-dim hover:text-primary transition-colors">
                    support@dealscraper.app
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-tertiary border border-outline-variant/15">
                  <span className="material-symbols-outlined">forum</span>
                </div>
                <div>
                  <p className="text-xs font-label text-outline uppercase tracking-widest mb-1">Response Time</p>
                  <p className="text-lg font-medium text-slate-200">Within 24 Cycles</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links Grid */}
          <div className="bg-surface-container rounded-xl p-8 border border-outline-variant/5">
            <h3 className="text-xl font-headline font-bold mb-6 text-slate-100">Network Presence</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href="#" className="flex items-center gap-3 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10 hover:bg-surface-variant transition-colors group">
                <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">share</span>
                <span className="text-sm font-medium">Twitter</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10 hover:bg-surface-variant transition-colors group">
                <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">groups</span>
                <span className="text-sm font-medium">Discord</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10 hover:bg-surface-variant transition-colors group">
                <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">video_library</span>
                <span className="text-sm font-medium">YouTube</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10 hover:bg-surface-variant transition-colors group">
                <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">rss_feed</span>
                <span className="text-sm font-medium">Reddit</span>
              </a>
            </div>
          </div>

          {/* Visual Asset/Decoration */}
          <div className="relative h-48 rounded-xl overflow-hidden group">
            <img 
              className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700" 
              alt="Retro gaming hardware and neon lights reflected on a metallic surface with deep purple and cyan atmospheric lighting" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2YuR6AUDqzsiksAlsXpFd8ZP1my6DTQjAEkpEfGjFfgNDh7Kb6G5rSTFvQYWND0WCvGQEpToiKhbTe4whbtpFI2eUCUcC2F6mBu8aT5u8FPq6-Ix-0zyOZ5vI-KAKLY8txJUkj_1p5SCH4drS4FpyHVJcfRDMwFIABiHgTIyD8llwTqKZ7kbqgr0MbBrT-NfTzEnxV-0_JjHcOB0vEyaV-yGFjer7vBKcbVKfLgQ1KzuxwYkapFhX0ArNnt6NFpjQKytVtU0MkwDb"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <span className="text-tertiary-fixed text-[10px] font-label uppercase tracking-[0.3em] bg-tertiary-container/20 px-2 py-1 rounded">System Online</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
