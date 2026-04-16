import React from 'react'

export default function About() {
  return (
    <div className="pt-24 overflow-hidden">
      {/* Hero Section: Editorial & Atmospheric */}
      <section className="relative min-h-[819px] flex items-center px-8 lg:px-24">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-20" 
            alt="abstract tech visualization with glowing blue and purple light paths in a dark server room atmosphere" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS7Vhh9NQTUdqUFbqhCRiDb4AsalbEaFLk9ipeI6CQnkeiVsvcsh-EMndKYMXps6gBGEcdr0tvnNvkQECQr3K2k-Tfu4zgO68OPQGxauEJnrZO77OB4Gw5Pg4VKacv74b3wLg0bT7CEjEutCdi7J2N1UY5G7A-l5dmnXYYY926QcvgirM4SeDgAn5j4RzRxSgXwN7x_i1m0fzf2I6F9uqXA6eiUiHP7WX-2_-6E5s02SAanslR5_om9Z19lpvx5PydDy1DpoylFtWf"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface"></div>
        </div>
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-label uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
            </span>
            Next-Gen Price Intel
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-on-surface leading-[1.1] mb-8">
            Track Game Prices <br/>
            <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">Smarter.</span>
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl font-light leading-relaxed mb-12">
            We’ve built a high-tech observatory for your gaming library. DealScraper automates tracking across Steam, Epic, and Xbox, ensuring you never pay more than necessary for your next adventure.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="neon-gradient px-8 py-4 rounded-xl font-bold text-white shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
              Start Tracking Free
            </button>
            <button className="glass ghost-border px-8 py-4 rounded-xl font-bold text-on-surface hover:bg-surface-container-high transition-colors">
              How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section className="py-24 px-8 lg:px-24 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold tracking-tight mb-4">Precision-Engineered Tracking</h2>
              <p className="text-on-surface-variant text-lg">Our engine processes millions of data points hourly to give you the tactical advantage.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="glass ghost-border p-8 rounded-xl group hover:bg-surface-container-highest transition-all duration-300">
              <div className="mb-20 text-primary">
                <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>speed</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Real-time price tracking</h3>
              <p className="text-on-surface-variant leading-relaxed">Latency is the enemy. Our scrapers update price points in near real-time, catching flash sales before they disappear into the void.</p>
            </div>
            {/* Card 2 */}
            <div className="glass ghost-border p-8 rounded-xl group hover:bg-surface-container-highest transition-all duration-300 relative overflow-hidden">
              <div className="mb-20 text-secondary">
                <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>compare_arrows</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Multi-store comparison</h3>
              <p className="text-on-surface-variant leading-relaxed">Fragmentation ends here. Compare live data from Steam, Epic, Xbox, and GoG in a single, unified digital dashboard.</p>
            </div>
            {/* Card 3 */}
            <div className="glass ghost-border p-8 rounded-xl group hover:bg-surface-container-highest transition-all duration-300">
              <div className="mb-20 text-tertiary">
                <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>monitoring</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Historical price insights</h3>
              <p className="text-on-surface-variant leading-relaxed">Know the true value. Access comprehensive historical charts to see if that 'deal' is actually an all-time low.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters: Editorial Layout */}
      <section className="py-32 px-8 lg:px-24">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
            <div className="relative glass ghost-border rounded-xl overflow-hidden aspect-video shadow-2xl">
              <img 
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700" 
                alt="dramatic close-up of a high-end gaming PC setup with glowing neon RGB lighting in a dark room" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNlbzlyfywZMPRPVkoMJLuNqKoTX1tTNHlkUtLRDsbqKTboLOiHZ1FApc8tNTpN_19nZPiNtlM4sxakto9rc5CAVNqAA9IRWEgXhykI5T5v4u1BKQu_AL0R5fEXLvvprFgqTX21eLVgsg6E_ykjtouzJNZLXK_PhxbKkPEc2jqMk9q4VtGxB-kR0JzeYHiSjZF3O1Cr26WXOwy9MBgVsHe2BHw714-mmxeuonn13PsHTJDoECXOccf77yGqc7RpRG43NzZKjVkcyE9"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Why This Matters</h2>
            <p className="text-xl text-on-surface-variant mb-10 leading-relaxed">
              Gaming is an art form, but its economy is complex. We believe that your gaming budget should go further. By utilizing DealScraper, users save an average of 42% on their digital library annually.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-secondary">savings</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold">Maximized Savings</h4>
                  <p className="text-on-surface-variant">Automated alerts mean you never miss the absolute lowest entry point.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-tertiary">verified_user</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold">Verified Sources</h4>
                  <p className="text-on-surface-variant">We only track authorized retailers, keeping your account and data secure.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section: Developers & Gamers */}
      <section className="py-24 px-8 lg:px-24 bg-surface-container-highest/30">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Built for gamers, by developers</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-16">
            Our core team consists of software engineers who spent too much time manually checking tabs for sales. We built the tool we wanted to use.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 opacity-60 hover:opacity-100 transition-opacity">
            <div className="flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-4xl">code</span>
              <span className="text-xs font-label uppercase tracking-widest">Open Logic</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-4xl">videogame_asset</span>
              <span className="text-xs font-label uppercase tracking-widest">Core Passion</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-4xl">security</span>
              <span className="text-xs font-label uppercase tracking-widest">Data Integrity</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-4xl">terminal</span>
              <span className="text-xs font-label uppercase tracking-widest">Swift Execution</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 px-8 lg:px-24">
        <div className="max-w-screen-2xl mx-auto neon-gradient rounded-3xl p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              className="w-full h-full object-cover" 
              alt="abstract wireframe landscape with glowing purple grid lines stretching into infinity" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHFmihd0aep5WlRzcps0aPRW-geDCS5Amg_rno_H-20H0JAf1CfVSckOVN8IfHLhB1lEZsWJw2JqQNPUrMegcji_AcRBlmljYkye-KM3K43-NSgxM3S7SpXL66QjI8BEFKEia09LaLsdUDFpnsKyACUFGjEKarY7oAdS5x8YRK7GsO34PAsEB--u9xeSCI-qI3BRWf5FjDIGcpNyD5ftl72cripl9CtYKIbZh1U_QxynAkSYu_OgRaQLbhNxjKPUJ5SFkJYXnDoGNi"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">Ready to upgrade your intel?</h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12">
              Join 50,000+ gamers who use DealScraper to manage their collections and save money every single day.
            </p>
            <button className="bg-white text-secondary-container px-12 py-5 rounded-xl font-black text-lg uppercase tracking-wider hover:bg-secondary-fixed transition-colors active:scale-95 shadow-2xl">
              Deploy Tracker
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
