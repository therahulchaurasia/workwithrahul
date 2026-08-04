"use client"

import { motion, type Easing, type Variants } from "motion/react"
import type { BoopIconProps } from "@/lib/use-boop"

// Card 5 of "Why work with me". Lucide's `gauge`, which is only two paths.
// Node data copied from lucide-react (ISC).
//
// The dial is a 240 degree arc centred on (12,14) with radius 10, open at the
// bottom, and the needle's own start point is that same centre. So the pivot
// is exact rather than estimated, which is not true of any of the other icons
// in this set.
//
// Boop the card and the needle gets blipped: a short wind-up, a hard throw
// toward max, then it rings down through three diminishing swings. The housing
// recoils against it the whole way. Fast where it matters, which is the card.

// Pivot to (16,10), up and to the right. Reading the arc as a speedometer,
// zero is the left end and max the right, so this rests around 69% already.
const NEEDLE = "m12 14 4-4"
const DIAL = "M3.34 19a10 10 0 1 1 17.32 0"

// Degrees, clockwise, which on this dial is toward max. The needle rests at 45
// degrees and the arc's right-hand end is at -30, so 75 is exactly the end of
// the scale and anything beyond that is off it, swinging into the gap at the
// bottom of the dial where there's no longer any dial to read against.
const TO_END = 75
const OVERRUN = 10

// The shape of the whole movement, in order: a small counter-swing first,
// because nothing reads as fast without a wind-up ahead of it; the throw,
// which buries the needle past the end stop; then three diminishing swings
// either side of rest. A single overshoot and home reads as a hand moving the
// needle. Letting it ring down is what makes it a needle that was hit.
const BLIP_ANGLES = [0, -8, TO_END + OVERRUN, -11, 5, -2, 0]
const BLIP_TIMES = [0, 0.13, 0.36, 0.56, 0.72, 0.86, 1]
const DURATION = 0.78

// Fast out of the throw, everything after is energy draining away.
// Annotated, not inferred: hoisted out of the variant the array widens to
// string[] and stops matching Motion's Easing union.
const BLIP_EASE: Easing[] = [
  "easeInOut",
  "easeOut",
  "easeInOut",
  "easeInOut",
  "easeInOut",
  "easeOut",
]

// The housing reacting against the needle, derived from the needle's own
// movement rather than hand-keyed, so the two can never drift apart. Negative
// because it recoils the opposite way, and tiny because at any real size it
// stops looking like recoil and starts looking like the icon wobbling.
const SHUDDER_RATIO = -0.035

const BLIP: Variants = {
  rest: { rotate: 0 },
  boop: {
    rotate: BLIP_ANGLES,
    transition: {
      duration: DURATION,
      times: BLIP_TIMES,
      ease: BLIP_EASE,
    },
  },
}

const SHUDDER: Variants = {
  rest: { rotate: 0 },
  boop: {
    rotate: BLIP_ANGLES.map((a) => a * SHUDDER_RATIO),
    transition: {
      duration: DURATION,
      times: BLIP_TIMES,
      ease: BLIP_EASE,
    },
  },
}

export default function Gauge({
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
      {/* The dial's bounding box runs (3.34,4) to (20.66,19), so the centre
          (12,14) sits at 0.5 across and two thirds down it. */}
      <motion.g variants={SHUDDER} style={{ originX: 0.5, originY: 0.667 }}>
        <path d={DIAL} />
      </motion.g>
      {/* The needle's box is (12,10) to (16,14) and it pivots on (12,14), so
          the origin is exactly the bottom-left corner. No approximation. */}
      <motion.g variants={BLIP} style={{ originX: 0, originY: 1 }}>
        <path d={NEEDLE} />
      </motion.g>
    </motion.svg>
  )
}
