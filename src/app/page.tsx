import Hero from "@/components/sections/hero"
import Work from "@/components/sections/work"
import Services from "@/components/sections/services"
import WhyMe from "@/components/sections/why-me"
import Faq from "@/components/sections/faq"
import Contact from "@/components/sections/contact"

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Work />
      <Services />
      <WhyMe />
      <Faq />
      <Contact />
    </main>
  )
}
