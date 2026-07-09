import {
  Activity,
  BarChart3,
  DollarSign,
  Gem,
  MousePointer2,
  RefreshCw,
  type LucideIcon,
} from "lucide-react"
import Section from "@/components/section"
import Container from "@/components/container"
import SectionHeading from "@/components/section-heading"
import { Text } from "@/components/text"

const FRONT_SHADOW =
  "rgba(0, 0, 0, 0.08) 0px 0.602187px 0.602187px -0.916667px, rgba(0, 0, 0, 0.08) 0px 2.28853px 2.28853px -1.83333px, rgba(0, 0, 0, 0.07) 0px 10px 10px -2.75px"

type Reason = { icon: LucideIcon; title: string; desc: string }

const reasons: Reason[] = [
  {
    icon: DollarSign,
    title: "Easy Pricing",
    desc: "Simple pricing structure that gives you unlimited design.",
  },
  {
    icon: Activity,
    title: "Fast Turnarounds",
    desc: "Quick and reliable results to keep your business moving forward.",
  },
  {
    icon: RefreshCw,
    title: "Unlimited Requests",
    desc: "I fulfill and satisfy all your design needs while focusing on maximum conversion.",
  },
  {
    icon: MousePointer2,
    title: "Design Portal",
    desc: "Manage tasks, revisions, and updates inside a clean, organized dashboard.",
  },
  {
    icon: Gem,
    title: "Top-Tier Quality",
    desc: "Built with care — I treat your brand with the same attention I give my own.",
  },
  {
    icon: BarChart3,
    title: "Problem Solving",
    desc: "I solve your brand challenges with innovative solutions.",
  },
]

export default function WhyMe() {
  return (
    <Container>
      <Section id="why-me" className="py-15 md:py-20">
        <div className="flex flex-col gap-8 md:gap-12">
          <SectionHeading
            title="Why work with me"
            subtext="Get unlimited design work for a simple monthly price. No hidden costs. Pause or cancel whenever you want."
          />
          <div className="grid grid-cols-1 gap-1.75 rounded-[20px] bg-[#e5e5e5] p-1.75 md:grid-cols-3">
            {reasons.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="relative flex min-h-[220px] flex-col justify-between rounded-2xl bg-background p-6 outline-1 outline-[#e2e2e2] [outline-offset:-3px]"
                style={{ boxShadow: FRONT_SHADOW }}
              >
                <div className="flex items-start justify-between">
                  <Icon className="size-6 text-foreground" strokeWidth={1.75} />
                  <span className="flex items-center gap-1">
                    {Array.from({ length: 6 }).map((_, d) => (
                      <span
                        key={d}
                        className={`size-1.5 rounded-full ${
                          d <= i ? "bg-primary" : "bg-black/12"
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
            ))}
          </div>
        </div>
      </Section>
    </Container>
  )
}
