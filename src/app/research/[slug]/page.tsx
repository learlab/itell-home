// src/app/research/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { researchArticles } from '@/data/researchArticles';


interface ResearchPostProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ResearchPostProps): Promise<Metadata> {
  const { slug } = await params
  const article = researchArticles.find((a) => a.slug === slug)
  
  if (!article) {
    return {
      title: 'Research Not Found',
    }
  }

  return {
    title: `${article.title} - iTELL Research`,
    description: article.excerpt,
  }
}

// Reusable BackToResearch component
function BackToResearch() {
  return (
    <Link 
      href="/research" 
      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors group"
    >
      <svg 
        className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to Research
    </Link>
  )
}

export default async function ResearchArticle({ params }: ResearchPostProps) {
  const { slug } = await params
  const article = researchArticles.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <article className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Top Back to Research Link */}
          <div className="mb-8">
            <BackToResearch />
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
            
            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium mb-4">
              {article.category}
            </span>
            
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
              {article.title}
            </h1>

            {/* Authors and Journal Info */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-700 mb-2">
                <strong>Authors:</strong> {article.authors.join(', ')}
              </div>
              <div className="text-sm text-gray-700 mb-2">
                <strong>Journal:</strong> {article.journal}
              </div>
              <div className="text-xs text-gray-600">
                <strong>Citation:</strong> {article.citation}
              </div>
            </div>
          </header>

          {/* Article Image */}
          <div className="mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-slate-100 flex justify-center items-center py-8">
            <div className="relative w-full max-w-3xl h-80">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-scale-down"
              />
            </div>
          </div>

          {/* Article Content - You would replace this with actual research content */}
          <div className="prose prose-lg max-w-none prose-p:my-6 prose-p:leading-7 mb-12">
            <p>This is where the full research article content would go. You can structure it with:</p>
            
            <h2>Abstract</h2>
            <p>{article.excerpt}</p>
            
            <h2>Introduction</h2>
            <p>Background information and research context would appear here...</p>
            
            <h2>Methodology</h2>
            <p>Details about the research methods, participants, and procedures...</p>
            
            <h2>Results</h2>
            <p>Research findings and data analysis would be presented here...</p>
            
            <h2>Discussion</h2>
            <p>Interpretation of results and implications for practice...</p>
            
            <h2>Conclusion</h2>
            <p>Summary of key findings and recommendations for future research...</p>
          </div>

          {/* Bottom Back to Research Link */}
          <div className="flex justify-center border-t border-gray-200 pt-8">
            <BackToResearch />
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  return researchArticles.map((article) => ({
    slug: article.slug,
  }))
}