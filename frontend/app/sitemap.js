import { getAllGames } from './lib/api.js'
import { getBlogs } from './lib/blogs.js'
import { SITE_URL } from './lib/site.js'

export const revalidate = 21600

const staticPages = [
  { url: '/', changeFrequency: 'daily', priority: 1.0 },
  { url: '/blogs', changeFrequency: 'weekly', priority: 0.8 },
  { url: '/about', changeFrequency: 'yearly', priority: 0.4 },
  { url: '/contact', changeFrequency: 'yearly', priority: 0.4 },
  { url: '/faq', changeFrequency: 'yearly', priority: 0.4 },
  { url: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { url: '/terms-of-service', changeFrequency: 'yearly', priority: 0.3 },
]

function toAbsoluteUrl(pathname) {
  return new URL(pathname, SITE_URL).toString()
}

function normalizeDate(value, fallback = new Date()) {
  const date = value ? new Date(value) : fallback
  return Number.isNaN(date.getTime()) ? fallback : date
}

export default async function sitemap() {
  const [gamesData] = await Promise.allSettled([getAllGames()])
  const blogs = getBlogs()

  const entries = [
    ...staticPages.map((page) => ({
      url: toAbsoluteUrl(page.url),
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...blogs.map((blog) => ({
      url: toAbsoluteUrl(`/blog/${blog.slug}`),
      lastModified: normalizeDate(blog.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.75,
    })),
  ]

  if (gamesData.status === 'fulfilled' && Array.isArray(gamesData.value)) {
    const seen = new Set(entries.map((entry) => entry.url))

    for (const game of gamesData.value) {
      const gameId = String(game?.id || game?._id || game?.gameId || '').trim()
      if (!gameId) continue

      const url = toAbsoluteUrl(`/game/${gameId}`)
      if (seen.has(url)) continue

      seen.add(url)
      entries.push({
        url,
        lastModified: normalizeDate(game?.updatedAt || game?.lastUpdatedAt || game?.scrapedAt || game?.createdAt),
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  }

  return entries.sort((a, b) => a.url.localeCompare(b.url))
}
