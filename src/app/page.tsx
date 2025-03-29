import Hero from "@/components/hero"
import ModulesSection from "@/components/modules-section"
import FeaturesSection from "@/components/features-section"
import TestimonialsSection from "@/components/testimonials-section"
import StatsSection from "@/components/stats-section"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <div className="mx-auto w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] max-w-7xl space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-24 py-6 sm:py-8 md:py-12 lg:py-16">
          <ModulesSection />
          <FeaturesSection />
          <StatsSection />
          <TestimonialsSection />
        </div>
      </main>
    </div>
  )
}

