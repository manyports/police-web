import Hero from "@/components/hero"
import ModulesSection from "@/components/modules-section"
import FeaturesSection from "@/components/features-section"
import TestimonialsSection from "@/components/testimonials-section"
import StatsSection from "@/components/stats-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <div className="mx-auto w-[90%] md:w-[80%] max-w-7xl space-y-16 md:space-y-24 py-8 md:py-16">
          <ModulesSection />
          <FeaturesSection />
          <StatsSection />
          <TestimonialsSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}

