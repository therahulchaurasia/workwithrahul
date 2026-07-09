import Image from "next/image"
import Section from "@/components/section"
import Container from "@/components/container"
import SectionHeading from "@/components/section-heading"
import { Text } from "@/components/text"
import { ArrowUpRight } from "lucide-react"

type Project = { title: string; image?: string }

const projects: Project[] = [
  { title: "With Sam", image: "/showcase/mockup-5.png" },
  { title: "Leafe Studio" },
  { title: "Northwind Labs" },
  { title: "Atlas Ventures" },
  { title: "Cadence Audio" },
  { title: "Vanta Studio" },
]

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
            {/* <div
              aria-hidden
              className="pointer-events-none fixed inset-0 z-40 bg-black/85 opacity-0 transition-opacity duration-300 group-has-[[data-work-card]:hover]/work:opacity-100"
            /> */}
            {projects.map(({ title, image }) => (
              <div
                key={title}
                data-work-card
                className="group/card relative aspect-[5/4] cursor-pointer overflow-hidden rounded-2xl bg-[#eaeaea] hover:z-45"
              >
                {image && (
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                )}
                <Text as="h3" variant="subtitle" className="absolute bottom-5 left-5">
                  {title}
                </Text>
                <span className="absolute bottom-5 right-5 flex size-11 translate-y-[150%] items-center justify-center rounded-full bg-background opacity-0 transition-[translate,opacity] duration-300 delay-100 ease-[cubic-bezier(0.513,0,0.989,0.146)] group-hover/card:translate-y-0 group-hover/card:opacity-100 group-hover/card:delay-0 group-hover/card:duration-[700ms] group-hover/card:ease-[linear(0,0.029_1.3%,0.118_2.8%,0.631_8.6%,0.843_11.6%,0.985_14.8%,1.028_16.5%,1.055_18.3%,1.066_20.2%,1.066_22.3%,1.012_32.4%,0.996_39.4%,1)]">
                  <ArrowUpRight className="size-4 text-primary" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </Container>
  )
}
