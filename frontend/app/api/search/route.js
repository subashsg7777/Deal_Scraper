import { NextResponse } from 'next/server'

const rawApiUrl = process.env.API_URL || ''
const normalized = rawApiUrl.trim().replace(/\/$/, '')
const BASE_URL = normalized.endsWith('/api') ? normalized : `${normalized}/api`

export async function GET(request) {
  const term = new URL(request.url).searchParams.get('term')?.trim() || ''

  if (!normalized) {
    return NextResponse.json({ error: 'Missing API_URL environment variable' }, { status: 500 })
  }

  if (!term) {
    return NextResponse.json([])
  }

  const response = await fetch(`${BASE_URL}/games?term=${encodeURIComponent(term)}`)

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText)
    return NextResponse.json({ error: message || response.statusText }, { status: response.status })
  }

  return NextResponse.json(await response.json())
}