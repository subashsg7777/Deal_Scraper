import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './legacy-pages/Home'
import Search from './legacy-pages/Search'
import Game from './legacy-pages/Game'
import PrivacyPolicy from './legacy-pages/PrivacyPolicy'
import TermsOfService from './legacy-pages/TermsOfService'
import Contact from './legacy-pages/Contact'
import NotFound from './legacy-pages/NotFound'
import About from './legacy-pages/About'
import FAQ from './legacy-pages/FAQ'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface text-on-surface flex flex-col font-body selection:bg-primary/30">
        <Navbar />
        <main className="flex-1 mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/game/:id" element={<Game />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
