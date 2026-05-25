import React, { useState } from 'react'
import { subscribeEmail } from '../api/api'
import Toast from './Toast'

export default function SubscriberModal({ onClose }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim()) {
      showToast('Please enter a valid email', 'error')
      return
    }

    setLoading(true)

    try {
      await subscribeEmail(email)
      showToast('Successfully subscribed to deals!', 'success')
      // Close modal after successful subscription
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (error) {
      const errorMsg = error.message || 'Failed to subscribe'
      // Show info toast for duplicate emails, don't close modal
      if (errorMsg.includes('already subscribed')) {
        showToast(errorMsg, 'info')
      } else {
        showToast(errorMsg, 'error')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#1e293b] rounded-lg shadow-2xl p-8 w-full max-w-md mx-4 border border-[#334155]">
          <h2 className="text-2xl font-bold text-white mb-2">Get Best Deals</h2>
          <p className="text-[#cbd5e1] mb-6">
            Subscribe to our newsletter and never miss out on the best game deals!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f172a] border border-[#475569] rounded-lg text-white placeholder-[#94a3b8] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={loading}
            />

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-[#334155] text-white rounded-lg hover:bg-[#475569] transition disabled:opacity-50"
                disabled={loading}
              >
                Maybe Later
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-semibold"
                disabled={loading}
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  )
}
