const viteEnv = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};
const nodeEnv = typeof process !== 'undefined' && process.env ? process.env : {};

const rawBaseUrl = (
  viteEnv.VITE_API_BASE_URL ||
  nodeEnv.NEXT_PUBLIC_API_BASE_URL ||
  nodeEnv.API_URL ||
  ''
).trim();

// In production default to Render backend; allow override via env vars.
const defaultOrigin = (viteEnv.PROD || nodeEnv.NODE_ENV === 'production')
  ? 'https://deal-scraper-1q5s.onrender.com'
  : 'http://localhost:8080';

const normalizedOrigin = (rawBaseUrl || defaultOrigin).replace(/\/$/, '');
const BASE_URL = normalizedOrigin.endsWith('/api')
  ? normalizedOrigin
  : `${normalizedOrigin}/api`;

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(msg || `Request failed: ${res.status}`);
  }
  return res.json();
}

function normalizeSearchResults(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.result)) return data.result;
  return [];
}

export function getDeals() {
  return request('/deals');
}

export function searchGames(term) {
  return request(`/games?term=${encodeURIComponent(term)}`).then(normalizeSearchResults);
}

export function getGamePrices(gameId) {
  return request(`/games/${gameId}/prices`);
}

export function getGameHistory(gameId, days = 90) {
  return request(`/games/${gameId}/history?days=${days}`);
}
