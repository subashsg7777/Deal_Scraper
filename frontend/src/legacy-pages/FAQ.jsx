import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: "How does DealScraper work?",
      answer: "DealScraper utilizes advanced proprietary crawling technology to monitor hundreds of digital storefronts simultaneously. We index prices, regional variations, and coupon codes to ensure you see the absolute lowest price currently available for any game in our database."
    },
    {
      question: "Which stores are supported?",
      answer: "We currently support over 50+ major digital retailers including Steam, Epic Games Store, GOG, Humble Bundle, Fanatical, and PlayStation Store. We only track authorized retailers to ensure your keys are always legitimate and safe."
    },
    {
      question: "How often are prices updated?",
      answer: "Our high-frequency trackers update prices every 15 minutes for popular titles and at least once every 2 hours for our entire library. During major sales events (like the Steam Summer Sale), update frequency increases to near real-time."
    },
    {
      question: "Are the prices accurate?",
      answer: "Yes. We pull data directly from store APIs and public pages. We also calculate the \"all-time low\" and \"historical trend\" to give you context on whether a current price is truly a good deal or just a standard discount."
    },
    {
      question: "Do you sell games directly?",
      answer: "No. DealScraper is a price comparison engine and discovery platform. We never handle your payment information or sell games directly. When you find a deal, we redirect you to the official retailer to complete your purchase securely."
    },
    {
      question: "How can I get notified of deals?",
      answer: "You can create a free account to set up \"Price Watches\" for specific games. When a game hits your target price, we'll send you a push notification or an email immediately. You can also follow our \"Hype Pulse\" section for trending massive price drops."
    }
  ]

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      {/* Hero / Search Section */}
      <section className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-on-surface">
          Knowledge <span className="text-primary">Center</span>
        </h1>
        <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Everything you need to know about tracking the best gaming deals across the digital landscape.
        </p>

        {/* Search Bar with Neon Glow */}
        <div className="relative max-w-xl mx-auto">
          <div className="neon-glow flex items-center bg-surface-container-lowest rounded-full border border-outline-variant/20 px-6 py-4 focus-within:border-primary/40 transition-all">
            <span className="material-symbols-outlined text-primary mr-4">search</span>
            <input 
              type="text" 
              className="bg-transparent border-none focus:ring-0 text-on-surface placeholder-outline w-full text-base outline-none" 
              placeholder="Search for answers..." 
            />
          </div>
        </div>
      </section>

      {/* FAQ Accordion Content */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx
          return (
            <div key={idx} className="group overflow-hidden rounded-xl bg-surface-container-low transition-all duration-300">
              <button 
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-surface-container-high transition-colors"
                aria-expanded={isOpen}
              >
                <span className={`text-xl font-semibold transition-colors ${isOpen ? 'text-primary' : 'text-on-surface group-hover:text-primary'}`}>
                  {faq.question}
                </span>
                <span className={`material-symbols-outlined transition-all duration-300 ${isOpen ? 'text-primary rotate-180' : 'text-outline group-hover:text-primary'}`}>
                  expand_more
                </span>
              </button>
              <div 
                className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 text-on-surface-variant leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Call to Action Section */}
      <section className="mt-20 p-10 rounded-2xl glass-panel relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold text-on-surface mb-2">Still have questions?</h3>
            <p className="text-on-surface-variant">Our support team is active 24/7 for the gaming community.</p>
          </div>
          <Link to="/contact" className="px-8 py-4 rounded-xl bg-gradient-to-br from-primary to-secondary-container text-on-primary-container font-bold hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-primary/20">
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  )
}
