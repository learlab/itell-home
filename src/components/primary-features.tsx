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
    name: 'Enhanced learning',
    description:
      'iTELL drives better learning outcomes by leveraging Large Language Models to understand learning behavior and provide personalized feedback.',
    href: '#',
    icon: LibraryBigIcon,
  },
  {
    name: 'CMS Support',
    description:
      'iTELL offers a content management system that allows you to easily edit and update live deployments, manage media assets, etc.',
    href: '#',
    icon: EditIcon,
  },
  {
    name: 'LMS Integration',
    description:
      'iTELL can be easily launched from an external Learning Management System (LMS) and report results back. Whether your company uses Workday, Oracle or anything else, we got you covered.',
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
          iTELL allows organizations to automatically convert static text training documents into bespoke, scalable, interactive learning journeys 
          with a comprehensive feature set to make digital learning
          effective, engaging and fun for users. For instructors and managers,
          it also provides tools and dashboards to help you monitor and optimize
          learning experiences.
        </SectionDescription>
      </SectionHeader>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-lg font-semibold text-gray-900 lg:text-xl">
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
