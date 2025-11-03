// src/components/learner-features.tsx
'use client'

import { useRef, useState, useEffect } from 'react'
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
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const cardWidth = 256 // w-64 = 256px
  const gap = 24 // gap-6 = 24px
  const cardTotalWidth = cardWidth + gap

  const scrollToIndex = (index: number) => {
    if (containerRef.current && !isTransitioning) {
      setIsTransitioning(true)
      setCurrentIndex(index)
      
      // Transition ends after CSS animation completes
      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    }
  }

  const scrollLeft = () => {
    const newIndex = Math.max(0, currentIndex - 1)
    scrollToIndex(newIndex)
  }

  const scrollRight = () => {
    const newIndex = Math.min(features.length - 1, currentIndex + 1)
    scrollToIndex(newIndex)
  }

  // Calculate transform based on current index
  const getTransform = () => {
    return `translateX(-${currentIndex * cardTotalWidth}px)`
  }

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
        {/* Navigation Buttons */}
        <div className="flex justify-end gap-2 mb-6">
          <button
            onClick={scrollLeft}
            disabled={currentIndex === 0 || isTransitioning}
            className="p-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollRight}
            disabled={currentIndex === features.length - 1 || isTransitioning}
            className="p-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Carousel Container with overflow hidden */}
        <div className="overflow-hidden py-8 px-4 min-h-[320px]">
          <div
            ref={containerRef}
            className="flex gap-6 transition-transform duration-500 ease-out" // Smooth transform animation
            style={{ 
              transform: getTransform(),
              width: `${features.length * cardTotalWidth}px` // Total width of all cards
            }}
          >
            {features.map((feature) => (
              <div
                key={feature.name}
                className="flex-shrink-0 w-64" // Remove scroll-snap since we're using transforms
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

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              } ${isTransitioning ? 'pointer-events-none' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}