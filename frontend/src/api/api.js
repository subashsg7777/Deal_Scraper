const rawBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();

// In production default to Render backend; allow override via VITE_API_BASE_URL.
const defaultOrigin = import.meta.env.PROD
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

async function postRequest(path, data) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const responseData = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(responseData.error || `Request failed: ${res.status}`);
  }
  return responseData;
}

export function getDeals() {
  return request('/deals');
}

export function searchGames(term) {
  return request(`/games?term=${encodeURIComponent(term)}`);
}

export function getGamePrices(gameId) {
  return request(`/games/${gameId}/prices`);
}

export function getGame(gameId) {
  return request(`/games/get-game?id=${encodeURIComponent(gameId)}`);
}

export function getGameHistory(gameId, days = 90) {
  return request(`/games/${gameId}/history?days=${days}`);
}

export function subscribeEmail(email) {
  return postRequest('/subscribers', { email });
}
export function subscribeToGame(email, gameId, gameName) {
  return postRequest('/game-subscriptions', { email, gameId, gameName })
}