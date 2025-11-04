// src/components/learner-features.tsx
'use client'

import { DemoButton } from './demo-button'
import {
  SectionDescription,
  SectionHeader,
  SectionHeading,
  SectionShell,
  SectionTitle,
} from './section-shell'
import {
  BookOpenIcon,
  BotIcon,
  CircleQuestionMark,
  EditIcon,
  FilePenLineIcon,
  FileTextIcon,
  GaugeIcon,
  MessageCircleIcon,
} from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

const features = [
  {
    name: 'Interactive guide-on-the-Side Chatbot',
    icon: BotIcon,
  },
  {
    name: 'Quizzes',
    icon: EditIcon,
  },
  {
    name: 'Short Constructed Response',
    icon: CircleQuestionMark,
  },
  {
    name: 'Structured Dialogues for Reading Support',
    icon: MessageCircleIcon,
  },
  {
    name: 'Summary Activity',
    icon: FileTextIcon,
  },
  {
    name: 'Cloze Test Activity',
    icon: BookOpenIcon,
  },
  {
    name: 'Highlighting and Notetaking',
    icon: FilePenLineIcon,
  },
  {
    name: 'Learner Dashboard',
    icon: GaugeIcon,
  },
]

export default function LearnerFeatures() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: false,
    skipSnaps: false,
    breakpoints: {
      '(min-width: 768px)': { align: 'center' },
      '(min-width: 1024px)': { align: 'start' },
    },
  })
  
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  // Auto-play functionality (optional)
  useEffect(() => {
    if (!emblaApi) return

    const autoScroll = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext()
      } else {
        emblaApi.scrollTo(0) // Restart from beginning
      }
    }, 4000) // Change every 4 seconds

    return () => clearInterval(autoScroll)
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

  return (
    <SectionShell id="learner-features">
      <SectionHeader>
        <SectionTitle>For your learners</SectionTitle>
        <SectionHeading>Features that Keep Learners Engaged</SectionHeading>
        <SectionDescription>
          Boost comprehension and retention for every employee through iTELL&apos;s
          proven reading strategies and AI support.
        </SectionDescription>
      </SectionHeader>
      
      <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
        {/* Mobile Navigation Buttons - Top Right (visible only on mobile) */}
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
          {/* Desktop Navigation Button - Left (hidden on mobile) */}
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

          {/* Embla Carousel Container */}
          <div className="overflow-hidden py-8 px-4 min-h-[320px] w-full max-w-6xl" ref={emblaRef}>
            <div className="flex touch-pan-y gap-6">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="flex-shrink-0 w-64 min-w-0 flex-[0_0_16rem] md:flex-[0_0_18rem] lg:flex-[0_0_16rem]"
                >
                  <div className="flex flex-col items-center rounded-lg bg-white p-8 text-center shadow-sm transition-all duration-300 hover:shadow-lg h-full min-h-[280px] justify-center hover:scale-105">
                    <feature.icon
                      aria-hidden="true"
                      className="size-20 flex-none stroke-primary mb-4 transition-transform duration-300 hover:scale-110"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 lg:text-xl leading-tight transition-colors duration-300 hover:text-blue-600">
                      {feature.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Navigation Button - Right (hidden on mobile) */}
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
    </SectionShell>
  )
}