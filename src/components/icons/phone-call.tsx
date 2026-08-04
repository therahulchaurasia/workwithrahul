"use client"

import { motion, type Variants } from "motion/react"
import type { BoopIconProps } from "@/lib/use-boop"

// Card 2 of "Why work with me". Lucide's `phone-call`, unpacked so the two
// signal arcs can move on their own. Node data copied from lucide-react (ISC).
//
// Boop the card and the handset rocks while the two signal arcs push outward,
// inner leading. The shake starts first and is mostly spent before the arcs
// are: the phone has to look like the cause of the signal, not a reaction to
// it. It rotates rather than shifts, because a handset is a long diagonal
// shape and rotation shows along its whole length where a couple of pixels of
// travel just reads as a wobble in the rendering.

const HANDSET =
  "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"

// Both arcs are struck from (13,11), so "outward" is the same 45 degrees for
// each: up and to the right, along the bisector. Inner first, because a signal
// leaves the handset before it reaches the far arc.
//
// They travel the same distance but do not stop the same way. The outer arc is
// nearly twice the length of the inner one, so an identical recoil sweeps
// nearly twice as many pixels and lands visibly harder. `back` is how far past
// rest it swings, `settleAt` when that swing peaks: pulling both down on the
// outer arc is what makes the two stops read as the same weight.
const ARCS = [
  { d: "M13 6a5 5 0 0 1 5 5", back: 0.18, settleAt: 0.68 },
  { d: "M13 2a9 9 0 0 1 9 9", back: 0.07, settleAt: 0.58 },
]

// User units, so 3px at a 24px render. Bigger than it sounds: an arc is a long
// thin shape and its whole length shifts at once, which reads far louder than
// a small dot moving the same distance.
const PUSH = 3
const DIAG = +(PUSH * Math.SQRT1_2).toFixed(2)
const STAGGER = 0.09
const TRAVEL = 0.46
// Arcs come in just behind the shake, so the phone is already moving when the
// first one leaves it.
const ARC_LEAD = 0.06

// A function variant, so the two arcs share one definition and differ only by
// their offset. It has to be the delay *inside* the variant: a transition
// declared in a variant overrides the one on the element, so a `transition`
// prop alongside this would simply be ignored.
// Degrees of the first swing. Everything after is it losing energy, and the
// alternating sign is what makes it a rattle instead of a lean.
const SWING = 8
const SHAKE: Variants = {
  rest: { rotate: 0 },
  boop: {
    rotate: [0, -SWING, SWING * 0.75, -SWING * 0.44, SWING * 0.19, 0],
    transition: {
      duration: 0.42,
      times: [0, 0.14, 0.32, 0.5, 0.72, 1],
      // Hard out on the first swing, so it lands like a knock rather than a
      // wind-up. Everything after eases both ways, the way a rattle does.
      ease: ["easeOut", "easeInOut", "easeInOut", "easeInOut", "easeOut"],
    },
  },
}

// Comes back a little past where it started before settling. Same lesson as
// icon 1: an overshoot bezier alone tops out too shallow to read, so the
// recoil is spelled out as keyframes.
const PULSE: Variants = {
  rest: { x: 0, y: 0 },
  boop: (i: number) => {
    const { back, settleAt } = ARCS[i]
    return {
      x: [0, DIAG, -DIAG * back, 0],
      y: [0, -DIAG, DIAG * back, 0],
      transition: {
        duration: TRAVEL,
        delay: ARC_LEAD + i * STAGGER,
        // An earlier settleAt leaves a longer final segment, so the arc spends
        // more of its time decelerating into rest. That, more than the size of
        // the bounce, is what takes the thud out of the bigger one.
        times: [0, 0.34, settleAt, 1],
        ease: ["easeOut", "easeInOut", "easeOut"],
      },
    }
  },
}

export default function PhoneCall({
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
      // The arcs travel past the top-right corner of the viewBox, and an <svg>
      // clips to its viewport by default. The layout box is unaffected.
      style={{ overflow: "visible" }}
      // Without an explicit initial, Motion has no base value to animate from
      // on the first boop and warns about animating from "undefined".
      initial="rest"
      animate={booped ? "boop" : "rest"}
    >
      {/* Pivot low and left rather than centre. Rotating about the middle
          makes the handset swim in place; anchoring it down here swings the
          earpiece end furthest and reads as the thing rocking where it sits.
          Origin has to go through Motion, which computes transform-origin from
          the bounding box and overwrites anything set in CSS. */}
      <motion.g variants={SHAKE} style={{ originX: 0.3, originY: 0.7 }}>
        <path d={HANDSET} />
      </motion.g>
      {ARCS.map(({ d }, i) => (
        <motion.path key={d} d={d} variants={PULSE} custom={i} />
      ))}
    </motion.svg>
  )
}
