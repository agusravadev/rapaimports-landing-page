import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Products } from '@/components/sections/Products'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { Map as MapSection } from '@/components/sections/Map'
import { CTAFinal } from '@/components/sections/CTAFinal'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <MapSection />
        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}
