import Section from "@/components/section";
import Container from "@/components/container";
import FaqAccordion from "@/components/faq-accordion";
import Reveal from "@/components/reveal";
import { Text } from "@/components/text";
import Eyebrow from "@/components/eyebrow";

export default function Faq() {
  return (
    <Container>
      <Section id="faq" className="py-15 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-3">
            <div className="flex flex-col gap-[5px]">
              <Eyebrow>FAQ</Eyebrow>
              <Text variant="title">Questions.</Text>
            </div>
            <Text muted className="max-w-xs">
              The things clients usually ask before starting.
            </Text>
          </Reveal>

          <Reveal delay={0.1}>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </Section>
    </Container>
  );
}

const faqs = [
  {
    q: "How long does a project take?",
    a: "Most landing pages ship in 1–2 weeks. CMS sites and custom builds usually land between 2–4 weeks depending on scope. You'll get a concrete timeline before we start.",
  },
  {
    q: "What do you need from me to start?",
    a: "Your goal, your content (or a rough draft of it), and any brand assets you have. Missing pieces aren't a blocker. We sort them in the first call.",
  },
  {
    q: "Can I update the site myself after launch?",
    a: "Yes, CMS builds are made for exactly that. You'll be able to edit text, images, and pages without touching code. I'll walk you through it.",
  },
  {
    q: "What does it cost?",
    a: "It depends on scope, so I quote per project: one fixed price, no surprises. Tell me what you need and you'll have a number within a day.",
  },
  {
    q: "What happens after launch?",
    a: "You get a support window for fixes and tweaks. After that, I'm available for updates and improvements whenever you need them.",
  },
  {
    q: "Do you do both the design and the development?",
    a: "Yes, that's the point. One person takes it from blank Figma file to live site, so nothing gets lost between design and code.",
  },
];
