import Hero from "@/components/sections/hero"
import Work from "@/components/sections/work"
import Services from "@/components/sections/services"
import WhyMe from "@/components/sections/why-me"
import Faq from "@/components/sections/faq"
import Contact from "@/components/sections/contact"
import ProgressiveBlur from "@/components/progressive-blur"

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Work />
      <Services />
      <WhyMe />
      <Faq />
      <Contact />
      {/* TODO: demo placement — move/remove once final position is decided */}
      <ProgressiveBlur tint={false} className="fixed inset-x-0 bottom-0 z-50 h-[10svh]" />
    </main>
  )
}
