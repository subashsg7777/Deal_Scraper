export const revalidate = 21600

export const metadata = {
  title: 'Privacy Policy | DealScraper',
  description: 'Privacy policy for DealScraper including analytics, ads, and cookie usage.',
}

export default function PrivacyPolicyPage() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto">
        <article className="bg-[#111827] border border-white/10 rounded-2xl shadow-2xl shadow-black/30 p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#e5e7eb] tracking-tight mb-6">Privacy Policy</h1>

          <div className="space-y-7 text-[#cbd5e1] text-base sm:text-lg leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#e5e7eb] mb-2">Overview</h2>
              <p>Deal Scraper helps users compare game prices. We keep data collection minimal and focused on improving site performance and content quality.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-[#e5e7eb] mb-2">Analytics and Ads</h2>
              <p>We may use analytics and Google AdSense to understand usage and serve ads. These services can use cookies and similar technologies.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-[#e5e7eb] mb-2">Cookies</h2>
              <p>Cookies may be used for analytics, ad delivery, and improving user experience. You can control cookies through your browser settings.</p>
            </section>
          </div>
        </article>
      </div>
    </section>
  )
}
