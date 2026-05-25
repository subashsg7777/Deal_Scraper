import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { SITE_URL } from './lib/site'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'DealScraper - Track Game Prices on Steam, Epic, Xbox | Best Deals',
    template: '%s | DealScraper',
  },
  description: 'Compare game prices across Steam, Epic Games, and Xbox. Find the best deals, track price history, and get notifications on price drops.',
  applicationName: 'DealScraper',
  openGraph: {
    siteName: 'DealScraper',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-surface text-on-surface flex flex-col font-body selection:bg-primary/30">
        <Navbar />
        <main className="flex-1 mt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
