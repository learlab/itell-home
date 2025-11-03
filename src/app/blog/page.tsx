// src/app/blog/page.tsx
import { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer' // Make sure you have a Footer component
import BlogCarousel from '@/components/BlogCarousel'

export const metadata: Metadata = {
  title: 'Blog - iTELL',
  description: 'Read the latest insights and updates from iTELL',
}

// Mock blog posts data - replace with your actual data source
const blogPosts = [
  {
    id: 1,
    title: 'The Future of AI in Education',
    excerpt: 'Exploring how artificial intelligence is transforming learning experiences and making education more accessible.',
    date: '2025-11-03',
    slug: 'future-of-ai-in-education',
    image: '/blog/itell-logo.png',
    category: 'Technology',
    readTime: '11 min read',
  },
  {
    id: 2,
    title: 'Best Practices for Employee Training',
    excerpt: 'Learn how to create effective training programs that stick and drive real business results.',
    date: '2024-11-03',
    slug: 'best-practices-employee-training',
    image: '/blog/employee-training.webp',
    category: 'Training',
    readTime: '4 min read',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      

      {/* Blog Carousel Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Latest Articles
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover our latest insights on education technology and learning strategies
            </p>
          </div>
          
          <BlogCarousel posts={blogPosts} />
        </div>
      </section>

      {/* Additional Blog Content Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center sm:text-4xl mb-12">
              More From Our Blog
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <article key={post.id} className="flex flex-col items-start bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6">
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.date} className="text-gray-500">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{post.readTime}</span>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href={`/blog/${post.slug}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-gray-600 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <div className="text-sm">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}