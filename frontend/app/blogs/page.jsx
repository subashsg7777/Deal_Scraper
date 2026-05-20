import fs from 'node:fs/promises'
import path from 'node:path'
import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'

const BLOG_CATALOG = [
  {
    slug: 'best_classic_games',
    href: '/best_classic_games',
    title: 'The Best Classic Games Of All Time',
    sourceFile: 'src/pages/best_classic_games.jsx',
  },
  {
    slug: 'best_games_2025',
    href: '/best_games_2025',
    title: 'Top 10 Games That Defined 2025',
    sourceFile: 'src/pages/best_games_2025.jsx',
  },
  {
    slug: 'steam_sales',
    href: '/steam_sales',
    title: 'Steam Sale Calendar 2026',
    sourceFile: 'src/pages/steam_sales.jsx',
  },
  {
    slug: 'steam_sales_article',
    href: '/steam_sales_article',
    title: 'Steam Summer Sale Guide',
    sourceFile: 'src/pages/steam_sales_article.jsx',
  },
]

async function getBlogs() {
  const blogs = await Promise.all(
    BLOG_CATALOG.map(async (blog) => {
      const fullPath = path.join(process.cwd(), blog.sourceFile)
      try {
        await fs.access(fullPath)
        return blog
      } catch {
        return null
      }
    }),
  )

  return blogs.filter(Boolean)
}

export const metadata = {
  title: 'Blogs | DealScraper',
  description: 'Browse all available DealScraper blog posts and open any article.',
}

export default async function BlogsPage() {
  const blogs = await getBlogs()

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full px-3.5 py-1.5 mb-4 text-[#a5b4fc] text-xs font-semibold">
          <BookOpen size={12} />
          Blog Library
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#e5e7eb] mb-2 tracking-tight">All Blogs</h1>
        <p className="text-[#9ca3af] text-sm">Choose any article to read details and insights.</p>
      </div>

      {blogs.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-[#e5e7eb] font-semibold mb-1">No blogs published yet</p>
          <p className="text-[#9ca3af] text-sm">No valid blog pages were found in the curated catalog.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={blog.href}
              className="group rounded-2xl border border-white/10 bg-[#111827] p-5 hover:border-[#6366f1]/40 hover:bg-[#6366f1]/5 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[#e5e7eb] font-semibold text-base mb-1 group-hover:text-white transition-colors">
                    {blog.title}
                  </p>
                  <p className="text-[#6b7280] text-xs">{blog.href}</p>
                </div>
                <ArrowRight size={16} className="text-[#6b7280] group-hover:text-[#6366f1] group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
