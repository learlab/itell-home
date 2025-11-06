import { type Metadata } from 'next'
import { Roboto_Slab, Roboto } from 'next/font/google'
import clsx from 'clsx'
import { GoogleAnalytics } from '@next/third-parties/google'

import '@/styles/tailwind.css'
import { Toaster } from 'sonner'
import { Header } from '@/components/Header' // Import your Header
import { Footer } from '@/components/Footer' // Import your Footer if you have one

export const metadata: Metadata = {
  title: {
    template: '%s - iTELL',
    default: 'iTELL',
  },
  description:
    'iTELL provides a framework for building and deploymeng AI-powered, personalized texts for all businesses. ',
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
        <Header />
        <main className="flex-1 pt-32 md:pt-40"> {/* Added pt-32 md:pt-40 for header spacing */}
          {children}
        </main>
        {/* Add Footer here if you have one */}
        {/* <Footer /> */}
        <Toaster />
      </body>
      {/* Add the GoogleAnalytics component here */}
      <GoogleAnalytics gaId="G-CM4LYDKT2M" />
    </html>
  )
}