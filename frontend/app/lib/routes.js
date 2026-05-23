import { SITE_URL } from './site'

export function slugifySegment(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'game'
}

export function getGameTitle(game) {
  return String(game?.name || game?.gameName || game?.title || '').trim()
}

export function buildGamePath(gameId, title) {
  const id = String(gameId ?? '').trim()
  if (!id) return '/game'

  return `/game/${id}/${slugifySegment(title)}`
}

export function buildGameCanonicalPath(gameId, title) {
  return buildGamePath(gameId, title)
}

export function buildAbsoluteUrl(pathname) {
  return new URL(pathname, SITE_URL).toString()
}