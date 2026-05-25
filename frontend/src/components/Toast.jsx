import React from 'react'

export default function Toast({ message, type = 'success' }) {
  const bgColor = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
  }[type] || 'bg-gray-600'

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-fade-in`}>
      {message}
    </div>
  )
}
