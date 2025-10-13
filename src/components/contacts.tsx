'use client'

import { FormEvent, useTransition } from 'react'
import { SectionHeading, SectionShell } from './section-shell'
import { toast } from 'sonner'

import { Button } from './ui/button'
import { createContactSubmission } from '@/actions/contact_submissions'

export default function Contacts() {
  const [pending, startTransition] = useTransition()
  
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)

    startTransition(async () => {
      const result = await createContactSubmission({
        firstName: String(formData.get('first_name')),
        lastName: String(formData.get('last_name')) || undefined,
        email: String(formData.get('org_email')),
        name: String(formData.get('org_name')),
        message: String(formData.get('message')),
      })

      if (result.success) {
        toast.success('Thank you for your interest in iTELL. We will get back to you shortly.')
        // Optional: Reset the form
        ;(e.target as HTMLFormElement).reset()
      } else {
        toast.error('Failed to send message. Please try again or contact us directly.')
      }
    })
  }

  return (
    <SectionShell className="relative isolate" id="contacts">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pt-6 pb-20 lg:static lg:px-8 lg:py-12">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden lg:w-1/2">
              <svg
                aria-hidden="true"
                className="absolute inset-0 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200 dark:stroke-white/10"
              >
                <defs>
                  <pattern
                    x="100%"
                    y={-1}
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                  className="fill-white dark:fill-gray-900"
                />
                <svg
                  x="100%"
                  y={-1}
                  className="overflow-visible fill-gray-50 dark:fill-gray-800/20"
                >
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                />
              </svg>
              <div
                aria-hidden="true"
                className="absolute top-[calc(100%-13rem)] -left-56 hidden transform-gpu blur-3xl lg:top-[calc(50%-7rem)] lg:left-[max(-14rem,calc(100%-59rem))] dark:block"
              >
                <div
                  style={{
                    clipPath:
                      'polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)',
                  }}
                  className="aspect-1155/678 w-288.75 bg-linear-to-br from-[#80caff] to-[#4f46e5] opacity-10 dark:opacity-20"
                />
              </div>
            </div>
            <SectionHeading>Book a Demo with us Today!</SectionHeading>
            <div className="mt-12 flex flex-col gap-6 text-lg leading-relaxed text-gray-600 lg:text-xl">
              <p>
                Experience the full power of iTELL risk-free and sign up for a
                90-day pilot.
              </p>
              <p>
                During your 90-day pilot, you’ll upload one of your actual
                training documents and see how iTELL transforms them into
                adaptive, interactive learning experiences.
              </p>
              <p>
                You’ll have full access to the platform, real-time metrics, and
                onboarding support to make sure you get real results with your
                team.
              </p>
              <p className="font-semibold">
                See if iTELL is right for your organization without the
                long-term commitment.
              </p>
            </div>
          </div>
        </div>
        <form
          className="px-6 pt-6 pb-24 sm:pb-32 lg:px-8 lg:py-12"
          onSubmit={onSubmit}
        >
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm/6 font-semibold text-gray-900 dark:text-white"
                >
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    autoComplete="given-name"
                    required
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="org_email"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Organization Email
                </label>
                <div className="mt-2.5">
                  <input
                    id="org_email"
                    name="org_email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="org_name"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Organization Name
                </label>
                <div className="mt-2.5">
                  <input
                    id="org_name"
                    name="org_name"
                    autoComplete="organization"
                    required
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    defaultValue={''}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button type="submit" disabled={pending}>
                Send message
              </Button>
            </div>
          </div>
        </form>
      </div>
    </SectionShell>
  )
}
