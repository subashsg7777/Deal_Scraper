import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Search from './pages/Search'
import GameDetails from './pages/GameDetails'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import SubscriberModal from './components/SubscriberModal'

export default function App() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('subscriberModalShown')
    if (!hasVisited) {
      setShowModal(true)
      localStorage.setItem('subscriberModalShown', 'true')
    }
  }, [])

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0f172a] flex flex-col">
        <Navbar />
        <main className="pt-16 pb-8 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/game/:id" element={<GameDetails />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        {showModal && <SubscriberModal onClose={closeModal} />}
      </div>
    </BrowserRouter>
  )
}
