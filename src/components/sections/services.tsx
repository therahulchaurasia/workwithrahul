import { Folder } from "lucide-react";
import Section from "@/components/section";
import Container from "@/components/container";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";
import { Text } from "@/components/text";
import AnatomyDot from "@/components/anatomy/anatomy-dot";
import AnatomyPanel, {
  type AnatomyNote,
} from "@/components/anatomy/anatomy-panel";
import { SITE } from "@/lib/site";

// Dummy anatomy cards — placeholder copy, Rahul writes the real notes.
const ANATOMY: AnatomyNote[] = [
  {
    id: "services-grid",
    title: "Placeholder: only three services",
    body: "Dummy copy about keeping the offer narrow on purpose. Real note comes later.",
  },
  {
    id: "services-card",
    title: "Placeholder: the framed card",
    body: "Dummy copy about the grey frame plus inner card treatment. Real note comes later.",
  },
  {
    id: "services-heading",
    title: "Placeholder: the section heading",
    body: "Dummy copy about the heading pattern here. Real note comes later.",
  },
];

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
    title: "Web Apps",
    desc: "For when a website isn't enough. Client logins, dashboards, custom tools, built around the way you work.",
  },
];

export default function Services() {
  return (
    <Container>
      <Section id="services" className="relative py-15 md:py-20">
        <div className="flex flex-col gap-8 md:gap-12">
          <Reveal anatomyId="services-heading">
            <SectionHeading
              eyebrow="Services"
              title="Services"
              subtext="Three things, done properly. Narrow on purpose, so the quality never dips."
            />
          </Reveal>
          <div
            data-anatomy-id="services-grid"
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {services.map(({ title, desc }, i) => (
              <Reveal
                key={title}
                anatomyId={i === 0 ? "services-card" : undefined}
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
                  <a
                    href={SITE.cal}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 w-full cursor-pointer rounded-full bg-gradient-to-b from-[#4d4dda] to-primary py-3.5 text-center font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_24px_-8px_rgba(51,51,204,0.6)] transition-transform duration-200 ease-out hover:-translate-y-0.5 active:-translate-y-0.5 active:scale-[0.97]"
                  >
                    Start a project
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <AnatomyDot
          section="services"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <AnatomyPanel
          section="services"
          notes={ANATOMY}
          className="fixed inset-x-0 bottom-0 pb-4 md:absolute md:inset-x-auto md:top-1/2 md:right-0 md:bottom-auto md:pb-0 md:-translate-y-1/2"
        />
      </Section>
    </Container>
  );
}
