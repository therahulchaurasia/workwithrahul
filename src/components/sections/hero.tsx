"use client";

import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import Section from "@/components/section";
import Container from "../container";
import WorkCarousel from "../work-carousel";
import ScrollLink from "@/components/scroll-link";
import { Text } from "@/components/text";
import { SITE } from "@/lib/site";
import { CAROUSEL_DELAY, EASE } from "@/lib/motion";

// Travel grows down the column (chip 24 -> heading 34 -> subheading 44 ->
// buttons 54) so the stack fans out as it settles.
const rise = (y: number): Variants => ({
  hidden: { opacity: 0, y },
  shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
});

// Chip + headline: transform, no fade. The headline is the page's LCP
// element; fading it from 0 defers LCP to hydration + stagger slot
// (measured 69 mobile vs 90+).
const riseSolid = (y: number): Variants => ({
  hidden: { y },
  shown: { y: 0, transition: { duration: 0.55, ease: EASE } },
});

// Carousel lands last, after the whole text column has settled; delay lives
// in the variant so it doesn't override the shared duration/ease.
const riseCarousel: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: CAROUSEL_DELAY },
  },
};

const stagger: Variants = {
  shown: { transition: { staggerChildren: 0.08 } },
};

export default function Hero() {
  return (
    <Container>
      <Section id="hero" className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial="hidden"
          animate="shown"
          variants={stagger}
          className="flex flex-col gap-[30px] pt-28 lg:pt-[150px] lg:pb-[100px]"
        >
          <div className="flex flex-col gap-[15px]">
            <motion.span
              variants={riseSolid(24)}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-3 py-1"
            >
              <span className="relative flex size-[5px] shrink-0 items-center justify-center">
                <span className="absolute inset-0 aspect-square animate-status-ping rounded-full bg-green-500" />
                <span className="size-[5px] aspect-square shrink-0 rounded-full bg-green-500" />
              </span>
              <Text as="span" variant="label" className="text-background">
                Open for projects
              </Text>
            </motion.span>
            <motion.div variants={riseSolid(34)}>
              <Text variant="display" className="lg:max-w-[450px]">
                Websites that turn clicks into clients
              </Text>
            </motion.div>
            <motion.div variants={rise(44)}>
              <Text muted className="max-w-md lg:max-w-[450px]">
                Cause your brand deserves more than a template.
              </Text>
            </motion.div>
          </div>
          <motion.div
            variants={rise(54)}
            className="flex flex-wrap items-center gap-[10px]"
          >
            <ScrollLink
              href="#contact"
              className="flex items-center gap-3 rounded-full bg-gradient-to-b from-[#4d4dda] to-primary p-2 pl-6 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_24px_-8px_rgba(51,51,204,0.6)] transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <Text
                as="span"
                variant="label"
                className="text-base! font-semibold"
              >
                Start a project
              </Text>
              <span className="flex size-9 items-center justify-center rounded-full bg-white">
                <ArrowRight className="size-4 text-primary" strokeWidth={2.5} />
              </span>
            </ScrollLink>
            <a
              href={SITE.twitter}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-full bg-foreground p-2 pl-6 text-white transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <Text
                as="span"
                variant="label"
                className="text-base! font-semibold"
              >
                Get in touch
              </Text>
              <span className="flex size-9 items-center justify-center rounded-full bg-primary">
                <ArrowRight className="size-4 text-white" strokeWidth={2.5} />
              </span>
            </a>
          </motion.div>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="shown"
          variants={riseCarousel}
          className="h-[400px] md:h-[600px] lg:h-full"
        >
          <WorkCarousel className="h-full" />
        </motion.div>
      </Section>
    </Container>
  );
}
