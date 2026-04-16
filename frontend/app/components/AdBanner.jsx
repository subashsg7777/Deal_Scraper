export default function AdBanner({ className = '' }) {
  return (
    <div
      className={`w-full h-[100px] sm:h-[120px] rounded-2xl border border-white/10 bg-[#131c2f] shadow-lg shadow-black/25 flex items-center justify-center transition-all duration-300 hover:border-[#64748b]/40 hover:shadow-black/40 ${className}`}
      aria-label="Advertisement placeholder"
    >
      <span className="text-gray-400 text-base sm:text-lg font-semibold tracking-wide">Ready to swap</span>
    </div>
  )
}
