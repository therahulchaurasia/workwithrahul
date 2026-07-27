import Image from "next/image"
import Link from "next/link"
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
import { PROJECTS } from "@/lib/projects"

// Design-commentary cards for this section; ids must match the
// data-anatomy-id attributes below.
const ANATOMY: AnatomyNote[] = [
  {
    id: "work-heading",
    title: "Every section has its own title",
    body: (
      <>
        <p>Titles allow people to scan the page quickly.</p>
        <p>
          Each section opens the same way: a tiny eyebrow word up top, one bold
          line, then a sentence to set it up. That eyebrow is the little label,
          and it tells you which part of the site you have landed on.
        </p>
      </>
    ),
  },
  {
    id: "work-section",
    title: "Let the work speak first",
    body: "I would rather let big, high res shots do the talking than bury you in text. So I keep things clean up front, and only bring out the details once you actually want a closer look.",
  },
  {
    id: "work-card",
    title: "The tags hide until you hover",
    body: "Hover a card and the title slides up by exactly the tags' height, so the chips appear without anything jumping around. No hover on a phone, so there the tags just stay put.",
  },
]

export default function Work() {
  return (
    <Container>
      <Section
        id="work"
        anatomyId="work-section"
        className="relative py-15 md:py-20"
      >
        <div className="flex flex-col gap-3.75 md:gap-6.25 xl:gap-12.5">
          <Reveal anatomyId="work-heading">
            <SectionHeading
              eyebrow="Work"
              title="Selected work"
              subtext="Real projects, built end to end, from design through deployment."
            />
          </Reveal>
          <div className="group/work grid grid-cols-1 gap-2.5 md:grid-cols-2">
            {/* <div
              aria-hidden
              className="pointer-events-none fixed inset-0 z-40 bg-black/85 opacity-0 transition-opacity duration-300 group-has-[[data-work-card]:hover]/work:opacity-100"
            /> */}
            {PROJECTS.map(({ slug, title, gallery, tags }, i) => (
              <Reveal
                key={title}
                anatomyId={i === 0 ? "work-card" : undefined}
                // Stagger within the row (2-col grid), not across the whole
                // list — rows further down trigger on their own scroll-in.
                delay={(i % 2) * 0.08}
                className="group/card relative aspect-[5/4] cursor-pointer overflow-hidden rounded-2xl bg-[#eaeaea] hover:z-45"
              >
                {/* Image zooms smoothly both ways — no spring, no snap:
                    photos read as material, and material doesn't bounce.
                    Slower in (depth), quicker but still soft out.
                    pointer-fine keeps touch taps from zooming a card they
                    can't un-hover. */}
                {/* First gallery shot doubles as the card image — one list
                    of images per project, no separate cover to keep in sync. */}
                <Image
                  src={gallery[0].src}
                  alt={title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] pointer-fine:group-hover/card:scale-[1.04] group-hover/card:duration-[900ms] motion-reduce:transition-none"
                />
                {/* Stretched link: whole card is the tap target, chips and
                    arrow stay decorative underneath. */}
                <Link
                  href={`/work/${slug}`}
                  aria-label={`${title} — case study`}
                  className="absolute inset-0 z-10"
                />
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
