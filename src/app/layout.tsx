import { type Metadata } from 'next'
import { Roboto_Slab, Roboto } from 'next/font/google'
import clsx from 'clsx'
import { GoogleAnalytics } from '@next/third-parties/google' // Your existing import

import '@/styles/tailwind.css'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: {
    template: '%s - iTELL',
    default: 'iTELL',
  },
  description:
    'iTELL provides a framework for building and deploymeng AI-powered, personalized texts for all businesses. ',
}

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const slab = Roboto_Slab({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white font-sans antialiased',
        roboto.variable,
        slab.variable,
      )}
    >
      <Toaster />
      <body className="flex h-full flex-col">{children}</body>
      {/* Add the GoogleAnalytics component here */}
      <GoogleAnalytics gaId="G-CM4LYDKT2M" />
    </html>
  )
}
