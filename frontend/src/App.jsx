import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Search from './pages/Search'
import Game from './pages/Game'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import About from './pages/About'
import FAQ from './pages/FAQ'

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
