import React from 'react'

export default function TermsOfService() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto">
        <article className="bg-[#111827] border border-white/10 rounded-2xl shadow-2xl shadow-black/30 p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#e5e7eb] tracking-tight mb-6">
            Terms of Service
          </h1>

          <div className="space-y-7 text-[#cbd5e1] text-base sm:text-lg leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#e5e7eb] mb-2">Reference Information</h2>
              <p>
                Deal Scraper provides game price information for general reference only. Prices can change quickly
                and may differ by region, currency, or timing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#e5e7eb] mb-2">Accuracy Disclaimer</h2>
              <p>
                While we try to keep data up to date, we cannot guarantee that all price information is always
                accurate, complete, or current.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#e5e7eb] mb-2">Verify on Official Stores</h2>
              <p>
                Before purchasing, always verify final prices and terms directly on official store pages such as
                Steam, Epic Games, and Xbox.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#e5e7eb] mb-2">Changes to Terms</h2>
              <p>
                We may revise these terms at any time. By continuing to use the site, you agree to the latest
                version.
              </p>
            </section>
          </div>
        </article>
      </div>
    </section>
  )
}
