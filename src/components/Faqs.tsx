import {
  SectionDescription,
  SectionHeading,
  SectionShell,
} from './section-shell'

const faqs = [
  {
    question: 'How can I create my iTELL deployment?',
    answer: (
      <>
        iTELL is currently offered as a concierge product to select early
        adopters.{' '}
        <a
          href="#contacts"
          className="font-semibold underline underline-offset-4"
        >
          Contact us
        </a>{' '}
        today for a free trial!
      </>
    ),
  },
  {
    question: 'What materials can iTELL handle?',
    answer:
      'iTELL is content agnostic, meaning that it can convert any static text training document into an interactive learning journey, regardless of the topic! Just provide a document with text, images, and videos, and iTELL does the rest!',
  },
  {
    question:
      ' I am interested in using iTELL for my company, how can I get in touch?',
    answer: (
      <>
        <a
          href="#contacts"
          className="font-semibold underline underline-offset-4"
        >
          Contact us
        </a>{' '}
        today for a free trial!
      </>
    ),
  },
]

export function Faqs() {
  return (
    <SectionShell id="faq" className = "scroll-mt-32 md:scroll-mt-36 lg:scroll-mt-40">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionHeading>FAQs</SectionHeading>
          <SectionDescription className="text-left">
            If you can’t find what you’re looking for, email our support team
            and we will get back to you!
          </SectionDescription>
        </div>
        <div className="mt-10 lg:col-span-7 lg:mt-0">
          <dl className="space-y-10">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </SectionShell>
  )
}
