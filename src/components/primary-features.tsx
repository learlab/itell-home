import { DemoButton } from './demo-button'
import {
  SectionDescription,
  SectionHeader,
  SectionHeading,
  SectionShell,
  SectionTitle,
} from './section-shell'
import { EditIcon, LibraryBigIcon, Link2Icon } from 'lucide-react'

const features = [
  {
    name: 'Seamless Integration with Zero Disruption',
    description:
      'Your domain is our domain. Launch interactive training quickly, no migrations or extra costs required. iTELL integrates with the LMS you already use, making adoption faster, insights clearer, and your systems more valuable.',
    href: '#',
    icon: LibraryBigIcon,
  },
  {
    name: 'Ensure Understanding, Not Just Completion.',
    description:
      'Gain clear visibility into comprehension and progress across your organization, so you can prove impact and close learning gaps with confidence. iTELL uses AI-powered feedback to show you exactly what learners understand and where they need support.',
    href: '#',
    icon: EditIcon,
  },
  {
    name: 'Save Resources Without Sacrificing Quality',
    description:
      'Reduces the time, effort, and specialized expertise needed to build training. With iTELL, you don’t need expensive production cycles or outside vendors to build effective training. You can turn existing documents into interactive courses quickly and scale learning across your organization.',
    href: '#',
    icon: Link2Icon,
  },
]

export default function PrimaryFeatures() {
  return (
    <SectionShell id="features">
      <SectionHeader>
        <SectionTitle>Build intelligent texts faster</SectionTitle>
        <SectionHeading>What iTELL Offers</SectionHeading>
        <SectionDescription>
          iTELL allows organizations to automatically convert static text
          training documents into bespoke, scalable, interactive learning
          journeys with a comprehensive feature set to make digital learning
          effective, engaging and fun for users. For instructors and managers,
          it also provides tools and dashboards to help you monitor and optimize
          learning experiences.
        </SectionDescription>
      </SectionHeader>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-lg font-semibold text-pretty text-gray-900 lg:text-xl">
                <feature.icon
                  aria-hidden="true"
                  className="size-5 flex-none stroke-primary"
                />
                {feature.name}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base/7 text-gray-600 dark:text-gray-400">
                <p className="flex-auto text-base/7 lg:text-lg">
                  {feature.description}
                </p>
                {/*<p className="mt-6">
                  <a
                    href={feature.href}
                    className="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </p>*/}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <SectionHeading className="mt-20 text-center text-gray-900 sm:text-3xl">
        Ready to try out iTELL?
      </SectionHeading>

      <div className="mt-4 flex justify-center">
        <DemoButton text="Try a Demo Now" />
      </div>
    </SectionShell>
  )
}
