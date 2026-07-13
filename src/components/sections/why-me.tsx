import {
  Brain,
  Gauge,
  LifeBuoy,
  PhoneCall,
  Target,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/section";
import Container from "@/components/container";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";
import { Text } from "@/components/text";

const FRONT_SHADOW =
  "rgba(0, 0, 0, 0.08) 0px 0.602187px 0.602187px -0.916667px, rgba(0, 0, 0, 0.08) 0px 2.28853px 2.28853px -1.83333px, rgba(0, 0, 0, 0.07) 0px 10px 10px -2.75px";

type Reason = { icon: LucideIcon; title: string; desc: string };

const reasons: Reason[] = [
  {
    icon: Brain,
    title: "Design + code, one brain",
    desc: "No handoff between designer and developer. What gets designed is exactly what gets built.",
  },
  {
    icon: PhoneCall,
    title: "Direct line",
    desc: "You talk to the person doing the work. No account managers, no relay race.",
  },
  {
    icon: Zap,
    title: "Fast turnarounds",
    desc: "Small and focused means no agency queue. Your project moves every single day.",
  },
  {
    icon: Gauge,
    title: "Built for speed",
    desc: "Fast-loading, mobile-first pages. Slow sites lose sales. Yours won't.",
  },
  {
    icon: Target,
    title: "Conversion first",
    desc: "Every layout decision serves one question: does this help visitors say yes?",
  },
  {
    icon: LifeBuoy,
    title: "There after launch",
    desc: "Launch isn't goodbye. Fixes, tweaks, and support when you need them.",
  },
];

export default function WhyMe() {
  return (
    <Container>
      <Section id="why-me" className="py-15 md:py-20">
        <div className="flex flex-col gap-8 md:gap-12">
          <Reveal>
            <SectionHeading
              eyebrow="Benefits"
              title="Why work with me"
              subtext="You get a designer and a developer in one person. Nothing lost in translation, nothing marked up twice."
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-1.75 rounded-[20px] bg-[#e5e5e5] p-1.75 md:grid-cols-3">
            {reasons.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={(i % 3) * 0.08}>
                <div
                  className="relative flex h-full min-h-[220px] flex-col justify-between rounded-2xl bg-background p-6 outline-1 outline-[#e2e2e2] [outline-offset:-3px]"
                  style={{ boxShadow: FRONT_SHADOW }}
                >
                  <div className="flex items-start justify-between">
                    <Icon
                      className="size-6 text-foreground"
                      strokeWidth={1.75}
                    />
                    <span className="flex items-center gap-1">
                      {Array.from({ length: 6 }).map((_, d) => (
                        <span
                          key={d}
                          className={`size-2.5 rounded-full ${
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
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </Container>
  );
}
