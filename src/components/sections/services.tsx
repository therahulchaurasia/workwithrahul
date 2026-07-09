import {
  Aperture,
  ArrowUpRight,
  Folder,
  Frame,
  Monitor,
  type LucideIcon,
} from "lucide-react"
import Section from "@/components/section"
import Container from "@/components/container"
import SectionHeading from "@/components/section-heading"
import { Text } from "@/components/text"

const FRONT_SHADOW =
  "rgba(0, 0, 0, 0.08) 0px 0.602187px 0.602187px -0.916667px, rgba(0, 0, 0, 0.08) 0px 2.28853px 2.28853px -1.83333px, rgba(0, 0, 0, 0.07) 0px 10px 10px -2.75px"

type Service = { title: string; desc: string }

const services: Service[] = [
  {
    title: "Brand Identity",
    desc: "Elevate your visual presence with standout branding.",
  },
  {
    title: "Logo Design",
    desc: "Logos built to be memorable and recognizable across every touchpoint.",
  },
  {
    title: "Brand Guidelines",
    desc: "Your brandbook to keep your brand consistent across platforms.",
  },
]

type ServiceV2 = {
  title: string
  desc: string
  icon: LucideIcon
  featured?: boolean
}

const servicesV2: ServiceV2[] = [
  {
    title: "Branding Design",
    icon: Aperture,
    desc: "A strong brand is more than just a logo—it's the foundation of how your audience perceives you. I create cohesive and impactful brand identities that ensure consistency across all touchpoints.",
  },
  {
    title: "Framer Development",
    icon: Frame,
    featured: true,
    desc: "Transforming designs into fully responsive, interactive websites with Framer. Whether it's a landing page or a full-scale web experience, I build fast, modern sites optimized for seamless performance.",
  },
  {
    title: "UI/UX Design",
    icon: Monitor,
    desc: "Designing user-centered experiences that are both functional and visually engaging. From concept to final prototype, I focus on intuitive interfaces that enhance experiences and usability.",
  },
]

const HEADING = "text-lg font-semibold tracking-[-0.02em] lg:text-xl"

function ServiceHeader({ title, icon: Icon }: Pick<ServiceV2, "title" | "icon">) {
  return (
    <>
      {/* Grid-stack both lines in one cell so the box sizes to the wider text (no chop) */}
      <span
        className={`grid overflow-hidden text-left [&>span]:[grid-area:1/1] ${HEADING}`}
      >
        <span className="transition-transform duration-300 ease-out group-hover/head:-translate-y-full">
          {title}
        </span>
        <span className="translate-y-full transition-transform duration-300 ease-out group-hover/head:translate-y-0">
          Start a project
        </span>
      </span>
      <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary/10 text-primary">
        <Icon
          className="size-4.5 transition-transform duration-300 ease-out group-hover/head:-translate-y-[150%]"
          strokeWidth={1.75}
        />
        <ArrowUpRight
          className="absolute size-4.5 translate-y-[150%] transition-transform duration-300 ease-out group-hover/head:translate-y-0"
          strokeWidth={1.75}
        />
      </span>
    </>
  )
}

function ServiceContent({ desc, blur = false }: { desc: string; blur?: boolean }) {
  return (
    <div
      className={`flex flex-col gap-4 transition-[filter,opacity] duration-300 ${
        blur ? "peer-hover/head:opacity-90 peer-hover/head:blur-[2px]" : ""
      }`}
    >
      <p className="text-base font-medium leading-[1.4em] tracking-[-0.02em] text-foreground-muted">
        {desc}
      </p>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-[10px] bg-[#e2e2e2]" />
        ))}
      </div>
    </div>
  )
}

function ServiceCardV2({ title, desc, icon }: ServiceV2) {
  // Detached header + body, both sitting on an #e5e5e5 panel (like the FAQ wrapper).
  return (
    <div className="flex flex-col gap-1.75 rounded-[20px] bg-[#e5e5e5] p-1.75">
      <button
        type="button"
        className="peer/head group/head relative flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-background px-4 py-3 text-foreground outline-1 outline-[#e2e2e2] [outline-offset:-3px]"
        style={{ boxShadow: FRONT_SHADOW }}
      >
        <ServiceHeader title={title} icon={icon} />
      </button>
      <div
        className="relative rounded-2xl bg-background p-4 outline-1 outline-[#e2e2e2] [outline-offset:-3px]"
        style={{ boxShadow: FRONT_SHADOW }}
      >
        <ServiceContent desc={desc} blur />
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <Container>
      <Section id="services" className="py-15 md:py-20">
        <div className="flex flex-col gap-8 md:gap-12">
          <SectionHeading
            title="Services"
            subtext="End-to-end design and development, tailored to what your business needs."
          />
          <div className="grid grid-cols-1 gap-1.75 rounded-[20px] bg-[#e5e5e5] p-1.75 md:grid-cols-3">
            {services.map(({ title, desc }) => (
              <div
                key={title}
                className="relative flex flex-col rounded-2xl bg-background p-6 outline-1 outline-[#e2e2e2] [outline-offset:-3px]"
                style={{ boxShadow: FRONT_SHADOW }}
              >
                <Folder className="size-9 fill-foreground text-foreground" strokeWidth={1.5} />
                <Text as="h3" variant="subtitle" className="mt-6">
                  {title}
                </Text>
                <Text muted className="mt-2 max-w-[28ch]">
                  {desc}
                </Text>
                <button
                  type="button"
                  className="mt-8 w-full cursor-pointer rounded-full bg-gradient-to-b from-[#2f8bff] to-primary py-3.5 text-center font-semibold text-white shadow-[0_10px_24px_-8px_rgba(6,86,186,0.7)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]"
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>

          {/* Variant 2 — for compare/contrast */}
          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-3">
            {servicesV2.map((s) => (
              <ServiceCardV2 key={s.title} {...s} />
            ))}
          </div>
        </div>
      </Section>
    </Container>
  )
}
