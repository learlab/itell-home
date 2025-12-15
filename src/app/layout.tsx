import { type Metadata } from 'next'
import { Roboto_Slab, Roboto } from 'next/font/google'
import clsx from 'clsx'
import { GoogleAnalytics } from '@next/third-parties/google'
// import TermlyCMP from '@/components/TermlyCMP'
import '@/styles/tailwind.css'
import { Toaster } from 'sonner'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer' // Import your Footer if you have one
import { QueryProvider } from '@/components/providers/query-provider'
import { Suspense } from 'react'

// const WEBSITE_UUID = 'c97ff573-1139-4e61-aa4c-11639c6818c5'

export const metadata: Metadata = {
  title: {
    template: '%s - iTELL',
    default: 'iTELL',
  },
  description:
    'iTELL provides a framework for building and deploying AI-powered, personalized texts for all businesses. ',
}

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const slab = Roboto_Slab({
  weight: ['400', '700'],
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
      <body className="flex h-full flex-col">
        {/* Cookie Consent Banner */}
        {/* <Suspense fallback={null}>
          <TermlyCMP 
            websiteUUID={WEBSITE_UUID}
            autoBlock={true}
            masterConsentsOrigin="https://app.termly.io"
          />
        </Suspense> */}
        
        <QueryProvider>
          <Header />
          <main className="flex-1 pt-32 md:pt-40">
            {children}
          </main>
          {/* Add Footer here if you have one */}
          {/* <Footer /> */}
          <Toaster />
        </QueryProvider>
      </body>
      {/* Add the GoogleAnalytics component here */}
      <GoogleAnalytics gaId="G-CM4LYDKT2M" />
    </html>
  )
}