// src/app/blog/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { blogPosts } from '@/data/blogPosts';

interface BlogPostProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} - iTELL Blog`,
    description: post.content.replace(/<[^>]*>/g, '').substring(0, 160),
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <article className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {/* Top Back to Blog Link */}
          <div className="mb-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors group"
            >
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium mb-4">
              {post.category}
            </span>
            
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
              {post.title}
            </h1>
          </header>

          {/* Article Image */}
          <div className="mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100 flex justify-center items-center py-8">
            <div className="relative w-full max-w-3xl h-80">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-scale-down"
              />
            </div>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-p:my-6 prose-p:leading-7 mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Bottom Back to Blog Link */}
          <div className="pt-8 border-t border-gray-200">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors group"
            >
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}