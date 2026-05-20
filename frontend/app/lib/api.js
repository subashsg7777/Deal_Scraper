const rawApiUrl = (process.env.API_URL || '').trim()
const defaultOrigin = process.env.NODE_ENV === 'production'
  ? 'https://deal-scraper-1q5s.onrender.com'
  : 'http://localhost:8080'

const normalized = (rawApiUrl || defaultOrigin).replace(/\/$/, '')
const BASE_URL = normalized.endsWith('/api') ? normalized : `${normalized}/api`

async function fetchJson(path, init = {}) {
  const response = await fetch(`${BASE_URL}${path}`, init)

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText)
    throw new Error(message || `Request failed with status ${response.status}`)
  }

  return response.json()
}

function normalizeSearchResults(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.result)) return data.result
  return []
}

export async function getDeals() {
  return fetchJson('/deals', {
    next: { revalidate: 21600 },
  })
}

export async function getAllGames() {
  return fetchJson('/games/all', {
    next: { revalidate: 21600 },
  })
}

export async function getGame(gameId) {
  return fetchJson(`/games/get-game?id=${encodeURIComponent(gameId)}`, {
    next: { revalidate: 21600 },
  })
}

export async function getGamePrices(gameId) {
  return fetchJson(`/games/${gameId}/prices`, {
    next: { revalidate: 21600 },
  })
}

export async function getGameHistory(gameId, days = 90) {
  return fetchJson(`/games/${gameId}/history?days=${days}`, {
    next: { revalidate: 21600 },
  })
}

export async function searchGames(term) {
  return fetchJson(`/games?term=${encodeURIComponent(term)}`, {
    next: { revalidate: 21600 },
  }).then(normalizeSearchResults)
}
