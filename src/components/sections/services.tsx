import { Folder } from "lucide-react";
import Section from "@/components/section";
import Container from "@/components/container";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";
import { Text } from "@/components/text";

const FRONT_SHADOW =
  "rgba(0, 0, 0, 0.08) 0px 0.602187px 0.602187px -0.916667px, rgba(0, 0, 0, 0.08) 0px 2.28853px 2.28853px -1.83333px, rgba(0, 0, 0, 0.07) 0px 10px 10px -2.75px";

type Service = { title: string; desc: string };

const services: Service[] = [
  {
    title: "Landing Pages",
    desc: "Pages with one job: turn visitors into customers. Designed around your offer, built to load fast and convert.",
  },
  {
    title: "CMS Websites",
    desc: "A site you can update yourself, no developer on speed dial. Clean design, easy editing, built to grow with you.",
  },
  {
    title: "Custom Builds",
    desc: "When a template can't do it, I build it from scratch. Custom design, custom code, exactly what your business needs.",
  },
];

export default function Services() {
  return (
    <Container>
      <Section id="services" className="py-15 md:py-20">
        <div className="flex flex-col gap-8 md:gap-12">
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title="Services"
              subtext="Three things, done properly. Narrow on purpose, so the quality never dips."
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {services.map(({ title, desc }, i) => (
              <Reveal
                key={title}
                delay={i * 0.08}
                className="rounded-[20px] bg-[#e5e5e5] p-1.75"
              >
                <div
                  className="relative flex h-full flex-col rounded-2xl bg-background p-6 outline-1 outline-[#e2e2e2] [outline-offset:-3px]"
                  style={{ boxShadow: FRONT_SHADOW }}
                >
                  <Folder
                    className="size-9 fill-foreground text-foreground"
                    strokeWidth={1.5}
                  />
                  <Text as="h3" variant="subtitle" className="mt-6">
                    {title}
                  </Text>
                  <Text muted className="mt-2 max-w-[28ch]">
                    {desc}
                  </Text>
                  <button
                    type="button"
                    className="mt-8 w-full cursor-pointer rounded-full bg-gradient-to-b from-[#4d4dda] to-primary py-3.5 text-center font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_24px_-8px_rgba(51,51,204,0.6)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]"
                  >
                    Start a project
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </Container>
  );
}
