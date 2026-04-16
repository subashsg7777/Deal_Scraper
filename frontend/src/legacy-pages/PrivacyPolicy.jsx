import React from 'react'

export default function PrivacyPolicy() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto">
        <article className="bg-[#111827] border border-white/10 rounded-2xl shadow-2xl shadow-black/30 p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#e5e7eb] tracking-tight mb-6">
            Privacy Policy
          </h1>

          <div className="space-y-7 text-[#cbd5e1] text-base sm:text-lg leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#e5e7eb] mb-2">Overview</h2>
              <p>
                Deal Scraper helps users compare game prices. We keep data collection minimal and focused on
                improving site performance and content quality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#e5e7eb] mb-2">Information We Process</h2>
              <p>
                We may process standard analytics signals such as page views, device type, and referral data so
                we can understand which game pages are useful and where the site needs better content coverage.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#e5e7eb] mb-2">Analytics and Ads</h2>
              <p>
                We use Google Analytics to understand usage trends. We may also use Google AdSense to show
                advertisements. These services can use cookies and similar technologies to operate.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#e5e7eb] mb-2">Your Choices</h2>
              <p>
                You can control cookies through your browser settings and can contact us if you want help
                understanding how the site uses third-party services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#e5e7eb] mb-2">Cookies</h2>
              <p>
                Cookies may be used for analytics, ad delivery, and improving user experience. You can control
                cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#e5e7eb] mb-2">Data We Do Not Collect</h2>
              <p>
                We do not intentionally collect sensitive personal data through this site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#e5e7eb] mb-2">Updates</h2>
              <p>
                This policy may be updated over time. Continued use of the site means you accept the latest
                version.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#e5e7eb] mb-2">Contact</h2>
              <p>
                If you have questions about privacy or advertising, use the contact page or email the site owner
                through the footer links.
              </p>
            </section>
          </div>
        </article>
      </div>
    </section>
  )
}
