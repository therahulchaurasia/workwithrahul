import { ArrowRight } from "lucide-react"
import Section from "@/components/section"
import Container from "../container"
import WorkCarousel from "../work-carousel"
import ScrollLink from "@/components/scroll-link"
import { Text } from "@/components/text"

export default function Hero() {
  return (
    <Container>
      <Section id="hero" className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-[30px] pt-28 lg:pt-[150px] lg:pb-[100px]">
          <div className="flex flex-col gap-[15px]">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-3 py-1">
              <span className="relative flex size-[5px] shrink-0 items-center justify-center">
                <span className="absolute inset-0 aspect-square animate-status-ping rounded-full bg-green-500" />
                <span className="size-[5px] aspect-square shrink-0 rounded-full bg-green-500" />
              </span>
              <Text as="span" variant="label" className="text-background">
                Open for projects
              </Text>
            </span>
            <Text variant="display" className="lg:max-w-[450px]">
              Websites that turn clicks into clients
            </Text>
            <Text muted className="max-w-md lg:max-w-[450px]">
              Cause your brand deserves more than a template.
            </Text>
          </div>
          <div className="flex flex-wrap items-center gap-[10px]">
            <ScrollLink
              href="#contact"
              className="flex items-center gap-3 rounded-full bg-gradient-to-b from-[#4d4dda] to-primary p-2 pl-6 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_24px_-8px_rgba(51,51,204,0.6)] transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <Text as="span" variant="label" className="text-base! font-semibold">
                Start a project
              </Text>
              <span className="flex size-9 items-center justify-center rounded-full bg-white">
                <ArrowRight className="size-4 text-primary" strokeWidth={2.5} />
              </span>
            </ScrollLink>
            <a
              href="https://twitter.com/rahul"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-full bg-foreground p-2 pl-6 text-white transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <Text as="span" variant="label" className="text-base! font-semibold">
                Get in touch
              </Text>
              <span className="flex size-9 items-center justify-center rounded-full bg-primary">
                <ArrowRight className="size-4 text-white" strokeWidth={2.5} />
              </span>
            </a>
          </div>
        </div>
        <WorkCarousel className="h-[400px] md:h-[600px] lg:h-full" />
      </Section>
    </Container>
  )
}
