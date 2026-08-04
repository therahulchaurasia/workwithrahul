"use client"

import { motion, type Variants } from "motion/react"
import type { BoopIconProps } from "@/lib/use-boop"

// Card 4 of "Why work with me". Lucide's `pencil-ruler`, unpacked into its two
// tools. Node data copied from lucide-react (ISC).
//
// Boop the card and the icon acts out the card: the ruler swings flat and
// settles low, the pencil stands on its top edge and runs left to right along
// it, then the whole thing unwinds. Designed, then developed.
//
// No mark is left behind. A drawn line was the obvious payoff and it doesn't
// survive this size: seven units of hairline lying against the ruler's edge at
// the same stroke weight reads as the edge thickening, not as a line. The
// pencil travelling the straightedge is the action; the artifact was cost with
// no return.
//
// The ruler is a continuous straightedge here rather than lucide's two halves.
// Lucide breaks it to fake the pencil lying on top; that only holds while the
// pencil is actually over the hole, which this animation spends most of its
// time not being. Instead the pencil is filled with the surface colour and
// really does occlude what runs behind it, which works from every position.
//
// This is the long one. Roughly a second against 400-600ms for the others,
// because it's a sequence rather than a gesture. That's deliberate for this
// card, but it is the reason useBoop's re-trigger floor had to go up.

// Lucide draws the ruler in two halves with a four-unit hole in each long
// edge, so the pencil can appear to lie on top of it. That hole is only
// hidden while the pencil is over it, which this animation spends most of its
// time not being, so the ruler is closed up here instead.
//
// Both long edges are exactly 45 degrees, y = x - 6 and y = x + 6, so closing
// the gap is just moving two endpoints further along lines they were already
// on: the first half now starts at (17,11) rather than (13,7) and ends at
// (11,17) rather than (7,13), which is precisely where the second half begins
// and ends. The halves meet, and with round caps of equal weight on collinear
// ends the joins are invisible.
// The middle tick is added, not lucide's. Its two hang off the same edge at
// 1.8 and 16.0 units along an edge 17.8 long, so the halfway mark is 8.9,
// which is (15,9), and it runs the same 2.83 units inward as the others.
// Lucide leaves it out because at rest the pencil covers that spot exactly;
// with the ruler swinging out from under the pencil, the bare middle shows.
const RULER = [
  "M17 11 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L11 17",
  "m8 6 2-2",
  "m13 11 2-2",
  "m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17",
  "m18 16 2-2",
]

// One closed outline: cap, barrel and tip are all the same subpath, which is
// why filling it is a single attribute rather than any surgery on the geometry.
const PENCIL_BODY =
  "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
// The band across the barrel where the wood meets the ferrule.
const FERRULE = "m15 5 4 4"

// Which side the pencil works from isn't a free choice. Its body runs up and
// to the right of the tip, so the tip has to meet the ruler's *top* edge with
// the body leaning away from it. Tip on the underside would drag the whole
// pencil across the straightedge, which is not how anyone has ever used one.
//
// That fixes everything else. The ruler has to sit low enough that a pencil
// standing on it still fits: the cap rides 14 units above the tip, so the edge
// being drawn against can't be higher than about y = 15. Rotating flat leaves
// the ruler centred, so it also drops.
const DROP = 7.2
// Where the ruler's upper edge lands once it has swung flat and dropped.
const EDGE_Y = 15
// The pencil's actual point, which is not the corner of its bounding box: the
// outline runs down to (2.02, 21.36), flicks round a half-unit arc and
// finishes at (2.64, 21.98). Reading the tip off the bounding box instead put
// this 1.2 units high and drove the point down into the ruler.
const TIP_Y = 21.98
// Half a stroke of daylight, so the point rests on the edge rather than
// sinking through it. Both are stroked, so their outlines meet before their
// paths do.
const CLEARANCE = 0.9
const LIFT = EDGE_Y - TIP_Y - CLEARANCE
// How far the pencil runs. The pencil is 18.9 units wide inside a 24-unit box,
// so about 5 is all that fits edge to edge. This overruns that deliberately:
// the cap finishes ~4 units past the right of the viewBox, which the card has
// plenty of room for, and buys a line worth looking at.
const TRAVEL = 7

// Phases as fractions of the whole: swing the ruler flat and stand the pencil
// on it, run, a short beat at full extension, then unwind everything.
const FLAT = 0.28
const RUN_END = 0.62
const HELD = 0.68

// Shorter than it was with the mark in it. The held beat existed to let you
// look at what had been drawn, and there's nothing to look at now.
const DURATION = 0.86

const SWING: Variants = {
  rest: { rotate: 0, y: 0 },
  boop: {
    rotate: [0, -45, -45, 0],
    y: [0, DROP, DROP, 0],
    transition: {
      duration: DURATION,
      times: [0, FLAT, HELD, 1],
      ease: ["easeInOut", "linear", "easeInOut"],
    },
  },
}

// Degrees the pencil leans back over the course of the run. Negative is
// counter-clockwise in SVG, where y points down. Nobody holds a pencil at a
// fixed angle while drawing, and the lean is what sells a hand rather than a
// machine doing this.
const TILT = -5

// Drop first, then run and lean together. Three properties on three clocks,
// which is why they're spelled out separately rather than sharing one
// transition.
const DRAW: Variants = {
  rest: { x: 0, y: 0, rotate: 0 },
  boop: {
    x: [0, 0, TRAVEL, TRAVEL, 0],
    y: [0, LIFT, LIFT, LIFT, 0],
    rotate: [0, 0, TILT, TILT, 0],
    transition: {
      duration: DURATION,
      x: {
        duration: DURATION,
        times: [0, FLAT, RUN_END, HELD, 1],
        ease: ["linear", "easeInOut", "linear", "easeInOut"],
      },
      y: {
        duration: DURATION,
        times: [0, FLAT, HELD, 1],
        ease: ["easeOut", "linear", "easeInOut"],
      },
      // Same clock as the run: the lean is a consequence of drawing, so it has
      // to start and stop with it rather than reading as its own move.
      rotate: {
        duration: DURATION,
        times: [0, FLAT, RUN_END, HELD, 1],
        ease: ["linear", "easeInOut", "linear", "easeInOut"],
      },
    },
  },
}

export default function PencilRuler({
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
      // The pencil finishes its run outside the viewBox on purpose, and an
      // <svg> clips to its viewport. Layout box is unchanged either way.
      style={{ overflow: "visible" }}
      initial="rest"
      animate={booped ? "boop" : "rest"}
    >
      {/* The group's bounding box is already centred on (12,12), so the
          default origin is the right pivot and nothing has to be set. */}
      <motion.g variants={SWING}>
        {RULER.map((d) => (
          <path key={d} d={d} />
        ))}
      </motion.g>
      {/* Pivot on the tip, not the middle. The tip is the contact point, so
          leaning about it is both what a hand does and the only way the point
          stays on the ruler: swinging about the centre would move the tip
          nearly a unit, which is the whole clearance it has. In bounding-box
          fractions the tip at (2.64, 21.98) is essentially the bottom-left
          corner. */}
      <motion.g variants={DRAW} style={{ originX: 0.06, originY: 1 }}>
        {/* Filled with the surface colour, so the pencil genuinely covers what
            passes behind it and the ruler can stay a continuous straightedge.
            This is the one thing in here that assumes what it's sitting on: if
            the icon ever lands on something other than the card background, the
            fill has to come in as a prop rather than read the token directly. */}
        <path d={PENCIL_BODY} fill="var(--background)" />
        <path d={FERRULE} />
      </motion.g>
    </motion.svg>
  )
}
