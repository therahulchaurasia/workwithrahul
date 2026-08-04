"use client"

import type { ComponentType } from "react"
import { useBoop, type BoopIconProps } from "@/lib/use-boop"
import Waypoints from "@/components/icons/waypoints"
import PhoneCall from "@/components/icons/phone-call"
import Target from "@/components/icons/target"
import PencilRuler from "@/components/icons/pencil-ruler"
import Gauge from "@/components/icons/gauge"
import Sliders from "@/components/icons/sliders"
import Section from "@/components/section"
import Container from "@/components/container"
import SectionHeading from "@/components/section-heading"
import Reveal from "@/components/reveal"
import { Text } from "@/components/text"
import AnatomyDot from "@/components/anatomy/anatomy-dot"
import AnatomyPanel, {
  type AnatomyNote,
} from "@/components/anatomy/anatomy-panel"

// Design-commentary cards for this section; ids must match the
// data-anatomy-id attributes below.
const ANATOMY: AnatomyNote[] = [
  {
    id: "why-me-card",
    title: "Counted the dots?",
    body: "Each card fills in one more. A tiny nudge to read all six, and yes, I know it's unnecessary.",
  },
]

const FRONT_SHADOW =
  "rgba(0, 0, 0, 0.08) 0px 0.602187px 0.602187px -0.916667px, rgba(0, 0, 0, 0.08) 0px 2.28853px 2.28853px -1.83333px, rgba(0, 0, 0, 0.07) 0px 10px 10px -2.75px"

// Every icon here is hand-animated and lives in components/icons. None are
// lucide components any more, though all six are built on lucide's node data.
type Reason = {
  icon: ComponentType<BoopIconProps>
  title: string
  desc: string
}

const reasons: Reason[] = [
  {
    icon: Waypoints,
    title: "One person, start to finish",
    desc: "Strategy, design, and development stay in one place. Nothing gets diluted in handoffs.",
  },
  {
    icon: PhoneCall,
    title: "Direct line",
    desc: "You speak directly with me throughout the project. Decisions happen faster and stay clear.",
  },
  {
    icon: Target,
    title: "Built around your goal",
    desc: "We start with what the site needs to achieve. Every page has a job to do.",
  },
  {
    icon: PencilRuler,
    title: "Designed, then developed",
    desc: "The final build follows the approved design closely. No “that can’t be built” surprises.",
  },
  {
    icon: Gauge,
    title: "Fast where it matters",
    desc: "Your website is responsive, mobile-first, and built to load quickly. Good work should not make people wait.",
  },
  {
    icon: Sliders,
    title: "Support beyond launch",
    desc: "Going live is not the last conversation. I’m here for refinements as your business grows.",
  },
]

// One card. Its own component only because the boop is per-card state and a
// hook can't live inside the map.
function ReasonCard({
  reason: { icon: Icon, title, desc },
  index,
}: {
  reason: Reason
  index: number
}) {
  const { booped, onPointerEnter, onPointerLeave } = useBoop()

  return (
    <div
      // The handlers are the card's only concession to the pointer. It stays
      // inert otherwise: no lift, no cursor, nothing that would read as "this
      // is clickable", because it isn't.
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className="relative flex h-full min-h-[220px] flex-col justify-between rounded-2xl bg-background p-6 outline-1 outline-[#e2e2e2] [outline-offset:-3px]"
      style={{ boxShadow: FRONT_SHADOW }}
    >
      <div className="flex items-start justify-between">
        <Icon
          booped={booped}
          className="size-6 text-foreground"
          strokeWidth={1.75}
        />
        <span className="flex items-center gap-1">
          {Array.from({ length: 6 }).map((_, d) => (
            <span
              key={d}
              className={`size-2.5 rounded-full ${
                d <= index ? "bg-primary" : "bg-black/12"
              }`}
            />
          ))}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Text as="h3" variant="subtitle-sm">
          {title}
        </Text>
        <Text muted className="max-w-[32ch] text-sm">
          {desc}
        </Text>
      </div>
    </div>
  )
}

export default function WhyMe() {
  return (
    <Container>
      <Section id="why-me" className="relative py-15 md:py-20">
        <div className="flex flex-col gap-8 md:gap-12">
          <Reveal>
            <SectionHeading
              eyebrow="Benefits"
              title="Why work with me"
              subtext="You get a designer and a developer in one person. Nothing lost in translation, nothing marked up twice."
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-1.75 rounded-[20px] bg-[#e5e5e5] p-1.75 md:grid-cols-3">
            {reasons.map((reason, i) => (
              <Reveal
                key={reason.title}
                anatomyId={i === 0 ? "why-me-card" : undefined}
                delay={(i % 3) * 0.08}
              >
                <ReasonCard reason={reason} index={i} />
              </Reveal>
            ))}
          </div>
        </div>

        <AnatomyDot
          section="why-me"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <AnatomyPanel
          section="why-me"
          notes={ANATOMY}
          className="fixed inset-x-0 bottom-0 pb-4 md:absolute md:inset-x-auto md:top-1/2 md:right-0 md:bottom-auto md:pb-0 md:-translate-y-1/2"
        />
      </Section>
    </Container>
  )
}
