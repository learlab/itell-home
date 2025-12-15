// src/components/BlogCarousel.tsx
'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  slug: string
  image: string
  category: string
  readTime: string
}

interface BlogCarouselProps {
  posts: BlogPost[]
}

export default function BlogCarousel({ posts }: BlogCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'center', // Changed from 'start' to 'center' for better centering
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: false,
    skipSnaps: false,
  })
  
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  const handleImageError = (postId: number) => {
    setImageErrors(prev => new Set(prev).add(postId))
  }

  return (
    <div className="relative mx-auto"> {/* Added mx-auto for centering */}
      {/* Mobile Navigation Buttons - Top Right */}
      <div className="flex justify-end gap-2 mb-6 lg:hidden">
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="p-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="p-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Desktop Carousel Container with Side Navigation */}
      <div className="relative flex items-center justify-center">
        {/* Desktop Navigation Button - Left */}
        <div className="hidden lg:flex absolute left-0 z-10 -translate-x-12">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="p-4 rounded-full border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Embla Carousel Container - KEY FIXES HERE */}
        <div className="overflow-hidden py-4 px-2 min-h-[400px] w-full max-w-6xl" ref={emblaRef}>
          <div className="flex touch-pan-y gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex-shrink-0 w-80 md:w-96 min-w-0 flex-[0_0_20rem] md:flex-[0_0_24rem] flex justify-center" // Added flex justify-center
              >
                <article className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full border border-gray-100 max-w-sm md:max-w-md">
                  {/* Image Section - KEY FIX FOR IMAGE CENTERING */}
                  <div className="h-48 bg-gradient-to-br from-blue-50 to-slate-100 relative overflow-hidden">
                    {imageErrors.has(post.id) ? (
                      // Fallback UI - Centered
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-slate-400 text-center">
                          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12m0-12a2 2 0 012-2h2a2 2 0 012 2m-6 5h6m-6 3h6m-6 3h6" />
                          </svg>
                          <span className="text-sm">Featured Image</span>
                        </div>
                      </div>
                    ) : (
                      // Actual Image - Changed to object-cover and added positioning
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover" // Changed from object-contain
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onError={() => handleImageError(post.id)}
                          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium mb-4">
                      {post.category}
                    </span>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                      <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-4 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                      {post.excerpt}
                    </p>
                    
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors group"
                    >
                      Read more
                      <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Navigation Button - Right */}
        <div className="hidden lg:flex absolute right-0 z-10 translate-x-12">
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="p-4 rounded-full border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex 
                ? 'bg-blue-600 scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}