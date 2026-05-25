import { SITE_URL } from './lib/site.js'

export default function robots() {
  return {
    host: SITE_URL,
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
