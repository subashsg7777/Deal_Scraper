import { NextResponse } from 'next/server'

const rawApiUrl = (process.env.API_URL || '').trim()
const defaultOrigin = process.env.NODE_ENV === 'production'
  ? 'https://deal-scraper-1q5s.onrender.com'
  : 'http://localhost:8080'

const normalized = (rawApiUrl || defaultOrigin).replace(/\/$/, '')
const BASE_URL = normalized.endsWith('/api') ? normalized : `${normalized}/api`

function normalizeSearchResults(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.result)) return data.result
  return []
}

export async function GET(request) {
  const term = new URL(request.url).searchParams.get('term')?.trim() || ''

  if (!term) {
    return NextResponse.json([])
  }

  const response = await fetch(`${BASE_URL}/games?term=${encodeURIComponent(term)}`)

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText)
    return NextResponse.json({ error: message || response.statusText }, { status: response.status })
  }

  return NextResponse.json(normalizeSearchResults(await response.json()))
}