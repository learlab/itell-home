import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'AI Powered feedback',
    description:
      'iTELL drives better learning outcomes by leveraging Large Language Models to understand learning behavior and provide personalized feedback.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Content Management',
    description:
      'iTELL offers a content management system that allows you to easily edit and update live deployments, manage media assets, etc.',
    icon: LockClosedIcon,
  },
  {
    name: 'Adaptive Scoring',
    description:
      "iTELL provides several scoring algorithms to evaluate learner performance through interleaved practice and end-of-page activities that are personalized to each user in each workplace.",
    icon: ArrowPathIcon,
  },
  {
    name: 'LMS Integration',
    description:
      'iTELL can be easily integrated into any SCORM-compatible Learning Management Systems (LMS) such as Canvas, Blackboard, Moodle, Workday, etc.',
    icon: FingerPrintIcon,
  },
]

export default function PrimaryFeaturesCustom() {
  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-gray-900" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
            Build intelligent texts faster
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
            What iTELL Offers
          </p>
          <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
            iTELL offers a comphrehensive feature set to make digital learning
            effective, engaging and fun for users. For instructors and managers, it also provides tools
            and dashboards to help you monitor and optimize learning experiences.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
                    <feature.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
