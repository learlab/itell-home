import Image from 'next/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const faqs = [
  [
    {
      question: 'How can I create my iTELL deployment?',
      children: (
        <>
          iTELL is currently offered as a concierge product to select early
          adopters.{' '}
          <a
            href="mailto:lear.lab.vu@gmail.com"
            className="font-black underline underline-offset-4"
          >
            Contact us
          </a>{' '}
          today for a free trial!
        </>
      ),
    },
  ],
  [
    {
      question: 'What materials can iTELL handle?',
      children:
        'iTELL is content agnostic, meaning that it can convert any static text training document into an interactive learning journey, regardless of the topic! Just provide a document with text, images, and videos, and iTELL does the rest!',
    },
  ],
  [
    {
      question:
        'I am interested in using iTELL for my company, how can I get in touch?',
      children: 'Email us today to arrange a free trial!',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can’t find what you’re looking for, email our support team
            and we will get back to you!
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg/7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700 lg:text-base">
                      {faq.children}
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
