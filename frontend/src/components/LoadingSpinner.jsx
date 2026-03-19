import React from 'react'

export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const spinnerSize = { sm: 'w-5 h-5', md: 'w-9 h-9', lg: 'w-14 h-14' }[size] ?? 'w-9 h-9'

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="relative">
        {/* Outer glow ring */}
        <div className={`${spinnerSize} rounded-full absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] opacity-20 blur-sm animate-pulse`} />
        {/* Spinner */}
        <div
          className={`${spinnerSize} rounded-full border-2 border-white/5 border-t-[#6366f1] animate-spin`}
        />
      </div>
      {text && (
        <p className="text-[#9ca3af] text-sm font-medium tracking-wide">{text}</p>
      )}
    </div>
  )
}
