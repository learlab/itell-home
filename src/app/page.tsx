import Contacts from '@/components/contacts'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import PrimaryFeaturesCustom from '@/components/primary-features-custom'

export default function Home() {
  return (
    <>
      <main>
        <div className="flex h-screen min-h-[1000px] flex-col">
          <Header />
          <Hero />
        </div>
        <PrimaryFeaturesCustom />
        {/*<PrimaryFeatures />*/}
        {/*<SecondaryFeatures />*/}
        {/*<CallToAction />*/}
        {/*<Testimonials />*/}
        {/*<Pricing />*/}
        <Contacts />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
