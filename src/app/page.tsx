import Contacts from '@/components/contacts'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import LearnerFeatures from '@/components/learner-features'
import PrimaryFeatures from '@/components/primary-features'
import { Testimonials } from '@/components/testimonials'
import { PdfUpload } from '@/components/upload/pdf-upload'

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-12 bg-white">
        <Header />
        <div className="[&>section:nth-child(even)]:bg-slate-50 [&>section:nth-child(odd)]:bg-white">
          <Hero />
          <PdfUpload />
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
