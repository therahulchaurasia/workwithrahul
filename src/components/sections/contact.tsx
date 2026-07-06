import Section from "@/components/section"
import Container from "@/components/container"

// Contact — final form + contact details (the last conversion push).
export default function Contact() {
  return (
    <Container divider={false}>
      <Section id="contact">
        <h2 className="text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
          Let&apos;s work together
        </h2>
      </Section>
    </Container>
  )
}
