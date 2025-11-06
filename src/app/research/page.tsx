// src/app/research/page.tsx
import { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import ResearchCarousel from '@/components/ResearchCarousel'
import { researchArticles } from '@/data/researchArticles';

export const metadata: Metadata = {
  title: 'Research - iTELL',
  description: 'Explore our latest research articles and studies on education technology and learning methodologies.',
}

// src/app/research/page.tsx
// ... (imports remain the same)

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              iTELL Research
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              iTELL is driven by evidence-based studies and academic research driving innovation in education technology and learning methodologies
            </p>
          </div>
        </div>
      </section>

      {/* Research Carousel Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Research
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Explore our latest peer-reviewed studies and academic publications
            </p>
          </div>
          
          {/* Pass researchArticles as prop */}
          <ResearchCarousel articles={researchArticles} />
        </div>
      </section>

      {/* Research Grid Section - Use researchArticles directly here */}
        
        <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center sm:text-4xl mb-12">
                All Research Publications
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                {researchArticles.map((article) => (
                <article key={article.id} className="flex flex-col items-start bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6">
                    <div className="flex items-center gap-x-4 text-xs mb-3">
                    <time dateTime={article.date} className="text-gray-500">
                        {new Date(article.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        })}
                    </time>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{article.readTime}</span>
                    </div>
                    
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium mb-4">
                    {article.category}
                    </span>
                    
                    <div className="group relative flex-1">
                    {/* Updated title to link to external URL */}
                    <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] mb-3">
                        <a 
                        href={article.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors"
                        >
                        {article.title}
                        </a>
                    </h3>
                    
                    <p className="text-sm leading-6 text-gray-600 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] mb-4">
                        {article.excerpt}
                    </p>
                    
                    <div className="text-xs text-gray-500 mb-2">
                        <strong>Authors:</strong> {article.authors.join(', ')}
                    </div>
                    
                    <div className="text-xs text-gray-500">
                        <strong>Published in:</strong> {article.journal}
                    </div>
                    </div>
                    
                    <a 
                    href={article.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm group mt-4"
                    >
                    Read Study
                    <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    </a>
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