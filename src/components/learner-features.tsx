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
  FileText,
  FileTextIcon,
  GaugeIcon,
  GaugeCircleIcon,
  LibraryBigIcon,
  Link2Icon,
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
  return (
    <SectionShell id="learner-features">
      <SectionHeader>
        <SectionTitle>For your learners</SectionTitle>
        <SectionHeading>Features that Keep Learners Engaged</SectionHeading>
        <SectionDescription>
          Boost comprehension and retention for every employee through iTELL’s
          proven reading strategies and AI support.
        </SectionDescription>
      </SectionHeader>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col">
              <dt className="flex flex-col items-center gap-3 text-lg font-semibold text-gray-900 lg:text-xl">
                <feature.icon
                  aria-hidden="true"
                  className="size-24 flex-none stroke-primary"
                />
                <p className="text-center">{feature.name}</p>
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </SectionShell>
  )
}
