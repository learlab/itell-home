import Contacts from '@/components/contacts'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import LearnerFeatures from '@/components/learner-features'
import PrimaryFeatures from '@/components/primary-features'
import { Testimonials } from '@/components/testimonials'

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-24 bg-white">
        <Header />
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CM4LYDKT2M"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-CM4LYDKT2M');
        </script>
        <div className="[&>section:nth-child(even)]:bg-slate-50 [&>section:nth-child(odd)]:bg-white">
          <Hero />
          <PrimaryFeatures />
          <LearnerFeatures />
          <Testimonials />
          <Contacts />
          <Faqs />
        </div>
      </main>
      <Footer />
    </>
  )
}
