import Section from "@/components/section"
import Container from "@/components/container"
import SectionHeading from "@/components/section-heading"

export default function Work() {
  return (
    <Container>
      <Section id="work" className="py-15 md:py-20">
        <div className="flex flex-col gap-3.75 md:gap-6.25 xl:gap-12.5">
          <SectionHeading
            title="Selected work"
            subtext="See how I've transformed brands and delivered real, measurable results."
          />
          <div className="group/work grid grid-cols-1 gap-2.5 md:grid-cols-2">
            <div
              aria-hidden
              className="pointer-events-none fixed inset-0 z-40 bg-black/85 opacity-0 transition-opacity duration-300 group-has-[[data-work-card]:hover]/work:opacity-100"
            />
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                data-work-card
                className="relative aspect-video rounded-2xl bg-[#eaeaea] hover:z-45"
              />
            ))}
          </div>
        </div>
      </Section>
    </Container>
  )
}
