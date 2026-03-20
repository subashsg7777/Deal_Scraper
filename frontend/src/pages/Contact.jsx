import React from 'react'

export default function Contact() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto">
        <article className="bg-[#111827] border border-white/10 rounded-2xl shadow-2xl shadow-black/30 p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#e5e7eb] tracking-tight mb-6">
            Contact
          </h1>

          <div className="space-y-6 text-[#cbd5e1] text-base sm:text-lg leading-relaxed">
            <p>
              Have a question, feedback, or suggestion? We would love to hear from you.
            </p>
            <p>
              Email: <a href="mailto:hello@dealscraper.app" className="text-[#93c5fd] hover:text-[#bfdbfe] transition-colors duration-200">hello@dealscraper.app</a>
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
