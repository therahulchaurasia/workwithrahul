"use client"

import { motion, type Variants } from "motion/react"
import type { BoopIconProps } from "@/lib/use-boop"

// Card 6 of "Why work with me". Lucide's `sliders-horizontal`, rebuilt so the
// handles can move. Node data derived from lucide-react (ISC).
//
// Boop the card and the three sliders get re-tuned, one after another, each
// arriving with a small overshoot before settling. Still available for tweaks,
// which is the card.
//
// Horizontal rather than vertical because horizontal is what a slider looks
// like in a product. Vertical faders read as a mixing desk, and this card is
// about refinements to a website.
//
// This card and card 2 both risk saying "you can reach me", so this one
// deliberately sits on a different axis: not availability, but adjustment
// after the fact. Nothing here is broken, it's being dialled in.

// Lucide breaks each track around its handle, the same trick it uses on the
// pencil-ruler. That only works while the handle never moves. Here the tracks
// run their full width and the handle rides on top as a crossbar, which is a
// standard way to draw a slider and needs no occlusion to hold up.
//
// `x` is where the handle rests, `to` where it gets pushed. Directions and
// distances differ so it reads as three separate adjustments rather than the
// whole set sliding.
const SLIDERS = [
  { y: 5, x: 14, to: 10 },
  { y: 12, x: 8, to: 13 },
  { y: 19, x: 16, to: 12 },
]

const TRACK_START = 3
const TRACK_END = 21
// Half the handle's height, so the crossbar reads as gripping the track.
const GRIP = 2

const STAGGER = 0.08
const DURATION = 0.62

const TWEAK: Variants = {
  rest: { x: 0 },
  boop: (i: number) => {
    const { x, to } = SLIDERS[i]
    return {
      x: [0, to - x, to - x, 0],
      transition: {
        duration: DURATION,
        delay: i * STAGGER,
        times: [0, 0.34, 0.62, 1],
        // backOut on the push, so the handle arrives slightly past its mark
        // and settles into it the way one under a thumb does. The return is
        // even, because letting go is not a second adjustment.
        ease: ["backOut", "linear", "easeInOut"],
      },
    }
  },
}

export default function Sliders({
  booped,
  className,
  strokeWidth = 2,
}: BoopIconProps) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      initial="rest"
      animate={booped ? "boop" : "rest"}
    >
      {SLIDERS.map(({ y }) => (
        <path key={y} d={`M${TRACK_START} ${y}H${TRACK_END}`} />
      ))}
      {SLIDERS.map(({ x, y }, i) => (
        <motion.path
          key={y}
          d={`M${x} ${y - GRIP}v${GRIP * 2}`}
          variants={TWEAK}
          custom={i}
        />
      ))}
    </motion.svg>
  )
}
