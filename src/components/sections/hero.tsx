import Section from "@/components/section"
import Container from "../container"

// Hero — headline + its own carousel (carousel to be built later).
export default function Hero() {
  return (
    <Container>
      <Section id="hero" className="min-h-[90dvh] flex items-center">
        <h2 className="text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
          Hero with its own carousel
        </h2>
      </Section>
    </Container>
  )
}
