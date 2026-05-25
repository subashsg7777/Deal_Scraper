import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, Clock3, Tag } from 'lucide-react'
import { getBlogBySlug, getBlogs } from '../../lib/blogs'

export const revalidate = 21600

export function generateStaticParams() {
  return getBlogs().map((blog) => ({ slug: blog.slug }))
}

export function generateMetadata({ params }) {
  const blog = getBlogBySlug(params.slug)

  if (!blog) {
    return {
      title: 'Blog Not Found | DealScraper',
    }
  }

  return {
    title: blog.title,
    description: blog.description,
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `/blog/${blog.slug}`,
      type: 'article',
    },
  }
}

export default function BlogPostPage({ params }) {
  const blog = getBlogBySlug(params.slug)

  if (!blog) notFound()

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-4xl">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-medium text-[#9ca3af] transition-colors hover:text-white mb-8">
          <ArrowLeft size={14} />
          Back to blogs
        </Link>

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#0b1326] p-8 sm:p-10 mb-8">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute -top-16 right-[-40px] h-48 w-48 rounded-full bg-[#6366f1]/15 blur-3xl" />
            <div className="absolute bottom-[-50px] left-[-30px] h-40 w-40 rounded-full bg-[#22c55e]/10 blur-3xl" />
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6366f1]/20 bg-[#6366f1]/10 px-3 py-1 text-xs font-semibold text-[#a5b4fc] mb-4">
              {blog.category}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#e5e7eb] leading-tight mb-5">
              {blog.title}
            </h1>
            <p className="max-w-3xl text-[#cbd5e1] text-base sm:text-lg leading-8">
              {blog.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-[#9ca3af]">
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={14} />
                {new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={14} />
                {blog.readTime}
              </span>
            </div>
          </div>
        </section>

        <article className="rounded-3xl border border-white/10 bg-[#111827] p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/20">
          <div className="space-y-10 text-[#dae2fd]/90 leading-8">
            {blog.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold text-[#d0bcff] mb-4">{section.heading}</h2>
                <div className="space-y-4 text-base sm:text-lg">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            <section>
              <h2 className="text-2xl font-bold text-[#d0bcff] mb-4">Conclusion</h2>
              <p className="text-base sm:text-lg">{blog.conclusion}</p>
            </section>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-wider text-[#9ca3af] mb-4">
              <Tag size={14} />
              <span>Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-[#e5e7eb]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
