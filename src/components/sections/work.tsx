import Image from "next/image"
import Section from "@/components/section"
import Container from "@/components/container"
import SectionHeading from "@/components/section-heading"
import Reveal from "@/components/reveal"
import { Text } from "@/components/text"
import AnatomyDot from "@/components/anatomy/anatomy-dot"
import AnatomyPanel, {
  type AnatomyNote,
} from "@/components/anatomy/anatomy-panel"
import { ArrowUpRight } from "lucide-react"

// Dummy anatomy cards — placeholder copy, Rahul writes the real notes.
const ANATOMY: AnatomyNote[] = [
  {
    id: "work-grid",
    title: "Placeholder: the two column grid",
    body: "Dummy copy about why the projects sit in a two column grid instead of a list or masonry. Real note comes later.",
  },
  {
    id: "work-card",
    title: "Placeholder: the card hover",
    body: "Dummy copy about the chip reveal and the arrow spring on hover. Real note comes later.",
  },
  {
    id: "work-heading",
    title: "Placeholder: the section heading",
    body: "Dummy copy about the eyebrow plus title plus subtext pattern. Real note comes later.",
  },
]

// tags: [project type, scope/role] — max two, chips get crowded past that.
type Project = { title: string; image?: string; tags?: string[] }

const projects: Project[] = [
  {
    title: "With Sam",
    image: "/showcase/withsam.jpeg",
    tags: ["Portfolio + CMS", "Development"],
  },
  {
    title: "Asahi",
    image: "/showcase/asahi.jpeg",
    tags: ["Landing page + CMS", "Development"],
  },
]

export default function Work() {
  return (
    <Container>
      <Section id="work" className="relative py-15 md:py-20">
        <div className="flex flex-col gap-3.75 md:gap-6.25 xl:gap-12.5">
          <Reveal anatomyId="work-heading">
            <SectionHeading
              eyebrow="Work"
              title="Selected work"
              subtext="Real projects, built end to end, from design through deployment."
            />
          </Reveal>
          <div
            data-anatomy-id="work-grid"
            className="group/work grid grid-cols-1 gap-2.5 md:grid-cols-2"
          >
            {/* <div
              aria-hidden
              className="pointer-events-none fixed inset-0 z-40 bg-black/85 opacity-0 transition-opacity duration-300 group-has-[[data-work-card]:hover]/work:opacity-100"
            /> */}
            {projects.map(({ title, image, tags }, i) => (
              <Reveal
                key={title}
                anatomyId={i === 0 ? "work-card" : undefined}
                // Stagger within the row (2-col grid), not across the whole
                // list — rows further down trigger on their own scroll-in.
                delay={(i % 2) * 0.08}
                className="group/card relative aspect-[5/4] cursor-pointer overflow-hidden rounded-2xl bg-[#eaeaea] hover:z-45"
              >
                {image && (
                  /* Image zooms smoothly both ways — no spring, no snap:
                     photos read as material, and material doesn't bounce.
                     Slower in (depth), quicker but still soft out.
                     pointer-fine keeps touch taps from zooming a card they
                     can't un-hover. */
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] pointer-fine:group-hover/card:scale-[1.04] group-hover/card:duration-[900ms] motion-reduce:transition-none"
                  />
                )}
                <div className="absolute bottom-5 left-5 flex flex-col items-start">
                  <Text as="h3" variant="subtitle">
                    {title}
                  </Text>
                  {tags && (
                    /* Chips live in a 0fr->1fr grid row so the title rides up
                       by exactly the chips' height on hover — no hardcoded
                       offsets to break when tags wrap. Touch devices
                       (pointer-coarse) have no hover, so chips stay open. */
                    <div className="grid w-full grid-rows-[1fr] transition-[grid-template-rows] duration-300 delay-100 ease-snap pointer-fine:grid-rows-[0fr] pointer-fine:group-hover/card:grid-rows-[1fr] group-hover/card:delay-0 group-hover/card:duration-[700ms] group-hover/card:ease-spring">
                      <div className="min-h-0 overflow-hidden">
                        {/* Static pt wrapper doubles as overshoot headroom:
                            the bounce lifts chips ~1px past rest, and without
                            this buffer the pill tops clip flat mid-spring. */}
                        <div className="pt-2.5">
                          {/* will-change keeps this row on a persistent GPU
                              layer — without it the browser re-rasterizes the
                              chip text when the transition's temporary layer
                              drops, and glyphs visibly nudge ~1px on settle. */}
                          <div className="flex flex-wrap gap-1.5 will-change-[translate,opacity] transition-[opacity,translate] duration-300 delay-100 ease-snap pointer-fine:translate-y-2 pointer-fine:opacity-0 pointer-fine:group-hover/card:translate-y-0 pointer-fine:group-hover/card:opacity-100 group-hover/card:delay-0 group-hover/card:duration-[700ms] group-hover/card:ease-spring">
                            {/* Same pill recipe as the hero status chip / dark
                              buttons, minus the dot — one chip language. */}
                            {tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-full bg-foreground px-2.5 py-1.5"
                              >
                                <Text
                                  as="span"
                                  variant="label"
                                  className="text-xs! leading-none text-background"
                                >
                                  {tag}
                                </Text>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <span className="absolute bottom-5 right-5 flex size-11 translate-y-[150%] items-center justify-center rounded-full bg-background opacity-0 pointer-coarse:translate-y-0 pointer-coarse:opacity-100 transition-[translate,opacity] duration-300 delay-100 ease-snap group-hover/card:translate-y-0 group-hover/card:opacity-100 group-hover/card:delay-0 group-hover/card:duration-[700ms] group-hover/card:ease-spring">
                  <ArrowUpRight className="size-4 text-primary" />
                </span>
              </Reveal>
            ))}
          </div>
        </div>

        <AnatomyDot
          section="work"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <AnatomyPanel
          section="work"
          notes={ANATOMY}
          className="fixed inset-x-0 bottom-0 pb-4 md:absolute md:inset-x-auto md:top-1/2 md:right-0 md:bottom-auto md:pb-0 md:-translate-y-1/2"
        />
      </Section>
    </Container>
  )
}
