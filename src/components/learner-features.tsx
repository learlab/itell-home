'use client'; 

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
import { useEffect, useRef } from 'react'

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
  const swiperElRef = useRef(null);

  useEffect(() => {
    // Import and register Swiper on client side only
    import('swiper/element/bundle').then(({ register }) => {
      register();
    });
  }, []);

  return (
    <SectionShell id="learner-features">
      <SectionHeader>
        <SectionTitle>For your learners</SectionTitle>
        <SectionHeading>Features that Keep Learners Engaged</SectionHeading>
        <SectionDescription>
          Boost comprehension and retention for every employee through iTELL's
          proven reading strategies and AI support.
        </SectionDescription>
      </SectionHeader>
      <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
        <swiper-container
          ref={swiperElRef}
          slides-per-view="1"
          space-between="30"
          pagination="true"
          navigation="true"
          autoplay-delay="4000"
          breakpoints={JSON.stringify({
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          })}
          style={{
            '--swiper-navigation-color': '#000',
            '--swiper-pagination-color': '#000',
          } as React.CSSProperties}
        >
          {features.map((feature) => (
            <swiper-slide key={feature.name}>
              <div className="flex h-full flex-col items-center rounded-lg bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
                <feature.icon
                  aria-hidden="true"
                  className="size-24 flex-none stroke-primary"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-900 lg:text-xl">
                  {feature.name}
                </h3>
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </SectionShell>
  )
}