"use client"

import { motion, type Transition, type Variants } from "motion/react"
import type { BoopIconProps } from "@/lib/use-boop"

// Card 3 of "Why work with me". Lucide's `target`, unpacked so the three rings
// can move independently. Node data copied from lucide-react (ISC).
//
// Boop the card and the rings tighten inward, outer first, so the contraction
// travels toward the middle. At the tightest point the bullseye fills, then
// everything springs back out. Sighting in on the target, which is the card's
// claim: the goal comes first and the work closes around it.

// Outer to inner, which is also the order they fire in.
//
// `min` is how far each ring contracts. The outer one moves most: an even
// contraction across all three would just look like the whole icon shrinking,
// and it's the rings closing the gaps between each other that reads as aiming.
//
// `over` is the rebound past rest on the way back, and it runs the other way,
// biggest on the smallest ring. Same reason as the phone arcs: a long stroke
// sweeps more pixels for the same number, so matching the values would make
// the outer ring land hardest.
const RINGS = [
  { r: 10, min: 0.78, over: 1.02 },
  { r: 6, min: 0.86, over: 1.035 },
  { r: 2, min: 0.94, over: 1.05 },
]

const CONTRACT = 0.52
const STAGGER = 0.07

// Fast in, slow out. Aiming is decisive and settling is not, so the tighten
// takes a third of the time and the release gets the rest.
//
// Built fresh per call rather than shared as a constant: Motion's Transition
// wants mutable arrays, so a hoisted object would have to give up `as const`
// and then `ease` widens to string[] and stops type-checking.
const shape = (i: number): Transition => ({
  duration: CONTRACT,
  delay: i * STAGGER,
  times: [0, 0.34, 0.66, 1],
  ease: ["easeOut", "easeInOut", "easeOut"],
})

const RING: Variants = {
  rest: { scale: 1 },
  boop: (i: number) => ({
    scale: [1, RINGS[i].min, RINGS[i].over, 1],
    transition: shape(i),
  }),
}

// The bullseye carries the same contraction as the others plus the fill, which
// lands on the tightest frame and is gone before the ring finishes settling. A
// fill that outlasted the movement would read as a state the icon had entered
// rather than a moment it passed through.
const BULLSEYE: Variants = {
  rest: { scale: 1, fillOpacity: 0 },
  boop: (i: number) => ({
    scale: [1, RINGS[i].min, RINGS[i].over, 1],
    fillOpacity: [0, 1, 0.35, 0],
    transition: {
      scale: shape(i),
      // Spelled out rather than inherited: a per-property transition replaces
      // the parent's outright, so anything left off here is silently a default
      // rather than the value above.
      fillOpacity: {
        duration: CONTRACT,
        delay: i * STAGGER,
        times: [0, 0.34, 0.66, 1],
        ease: "easeOut",
      },
    },
  }),
}

export default function Target({
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
      {RINGS.map(({ r }, i) => {
        const bullseye = i === RINGS.length - 1
        return (
          <motion.circle
            key={r}
            cx={12}
            cy={12}
            r={r}
            fill={bullseye ? "currentColor" : undefined}
            // No origin override needed anywhere here: every ring is centred
            // on (12,12), so each one's own bounding-box centre is already the
            // point they all have to scale about.
            variants={bullseye ? BULLSEYE : RING}
            custom={i}
          />
        )
      })}
    </motion.svg>
  )
}
