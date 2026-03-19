const BASE_URL = 'http://localhost:8080/api';

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(msg || `Request failed: ${res.status}`);
  }
  return res.json();
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

export function getGameHistory(gameId, days = 90) {
  return request(`/games/${gameId}/history?days=${days}`);
}
