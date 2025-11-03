// src/components/learner-features.tsx
'use client'

import { useRef } from 'react'
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
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
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

        {/* Carousel Container - Fixed height and padding */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto py-8 px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-h-[320px]" // Added min-h and increased padding
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {features.map((feature) => (
            <div
              key={feature.name}
              className="flex-shrink-0 w-64 scroll-snap-align-start"
            >
              <div className="flex flex-col items-center rounded-lg bg-white p-8 text-center shadow-sm transition-all hover:shadow-md h-full min-h-[280px] justify-center"> {/* Increased padding and min-height */}
                <feature.icon
                  aria-hidden="true"
                  className="size-20 flex-none stroke-primary mb-4" // Slightly smaller icon with margin
                />
                <h3 className="text-lg font-semibold text-gray-900 lg:text-xl leading-tight">
                  {feature.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}