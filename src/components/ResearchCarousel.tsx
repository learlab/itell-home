// src/components/ResearchCarousel.tsx
'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

interface ResearchArticle {
  id: number
  title: string
  excerpt: string
  date: string
  slug: string
  image: string
  category: string
  readTime: string
  authors: string[]
  journal: string
  citation: string
  externalUrl: string
}

interface ResearchCarouselProps {
  articles: ResearchArticle[]
}

export default function ResearchCarousel({ articles }: ResearchCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  const handleImageError = (articleId: number) => {
    setImageErrors(prev => new Set(prev).add(articleId))
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="flex justify-end gap-2 mb-6">
        <button
          onClick={scrollLeft}
          className="p-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
          aria-label="Scroll left"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={scrollRight}
          className="p-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Carousel Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto py-4 px-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex-shrink-0 w-80 md:w-96 scroll-snap-align-start"
          >
            <article className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full border border-gray-100">
              {/* Image Section */}
              <div className="h-48 bg-gradient-to-br from-green-50 to-slate-100 relative">
                {imageErrors.has(article.id) ? (
                  // Fallback UI
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-slate-400 text-center">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12m0-12a2 2 0 012-2h2a2 2 0 012 2m-6 5h6m-6 3h6m-6 3h6" />
                      </svg>
                      <span className="text-sm">Research Image</span>
                    </div>
                  </div>
                ) : (
                  // Actual Image
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(article.id)}
                  />
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <time dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium mb-4">
                  {article.category}
                </span>
                
                {/* Title linking to external URL */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                  <a 
                    href={article.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors group"
                  >
                    {article.title}
                    <svg 
                      className="w-4 h-4 ml-1 inline-block opacity-0 group-hover:opacity-100 transition-opacity" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </h3>
                
                <p className="text-gray-600 mb-4 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                  {article.excerpt}
                </p>
                
                <div className="text-xs text-gray-500 mb-3">
                  <strong>By:</strong> {article.authors.join(', ')}
                </div>
                
                <a 
                  href={article.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm group"
                >
                  Read Study
                  <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  )
}