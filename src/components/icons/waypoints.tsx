"use client"

import { motion, type Variants } from "motion/react"
import type { BoopIconProps } from "@/lib/use-boop"

// Card 1 of "Why work with me". Lucide's `waypoints`, unpacked: the packaged
// component renders one opaque <svg> with no addressable innards, and the four
// nodes have to light independently. Node data copied from lucide-react (ISC).
//
// The shape is a route: (12,4) -> (4,12) -> (20,12) -> (12,20). Boop the card
// and the nodes light in that order, each one staying lit, until the route is
// complete. Then all four clear together. One continuous path, start to
// finish, which is the card's claim.
//
// The icon stretches downward as it goes, keyed to the same moments the nodes
// light, so the route visibly extends as it completes. The instant the last
// node lands, the fills clear and the stretch is let go.

const LINKS = [
  "m10.586 5.414-5.172 5.172",
  "M6 12h12",
  "m18.586 13.414-5.172 5.172",
]

// In route order. Index drives the delay, so this order is the animation.
const NODES = [
  { cx: 12, cy: 4 },
  { cx: 4, cy: 12 },
  { cx: 20, cy: 12 },
  { cx: 12, cy: 20 },
]

// Seconds. The gap between nodes is what makes the order readable; the ramp is
// short so each one arrives rather than swells.
const STAGGER = 0.11
const RAMP = 0.09
// How long the fills take to go once released.
const CLEAR = 0.16
// The stretch takes considerably longer to let go than the fills do. It is the
// only part with any bounce in it, and a recoil needs room to read as one.
const SETTLE = 0.34

// When the last node finishes lighting. No hold after it: the release starts
// on that instant, so the completed route is the turnaround rather than a
// state the icon sits in.
const FILLED = (NODES.length - 1) * STAGGER + RAMP

// The fills and the stretch share that turnaround but not their tails, so they
// run on separate clocks. Everything below is in absolute seconds and gets
// divided by whichever total it belongs to.
const FILL_TOTAL = FILLED + CLEAR
const GROW_TOTAL = FILLED + SETTLE

/** Seconds from the start of the boop at which node `i` is fully lit. */
const litAt = (i: number) => i * STAGGER + RAMP

// Total vertical stretch at full route. It's a transform, so nothing around it
// reflows no matter how far this goes.
const STRETCH = 0.3

// The recoil, as fractions of the stretch: the icon squashes under its own
// height, comes back a little over, then settles. Spelled out as keyframes
// because a single overshoot curve can't do it. backOut tops out near 3% of
// the travel, which still reads as being driven home rather than let go.
const RECOIL = [-0.2, 0.08]
// Where those land inside the settle. Front-loaded, so the first bounce is the
// big one and the rest is it running out of energy.
const RECOIL_AT = [0.47, 0.76]

// A keyframe per node, at the exact moment that node lights, so the height
// tracks the fill rather than running alongside it on its own clock. Growth
// stays linear: it's tracking something, and easing each step would turn
// steady progress into four separate lurches. All the give is in the release.
const GROW: Variants = {
  rest: { scaleY: 1 },
  boop: {
    scaleY: [
      1,
      ...NODES.map((_, i) => 1 + (STRETCH * (i + 1)) / NODES.length),
      ...RECOIL.map((r) => 1 + STRETCH * r),
      1,
    ],
    transition: {
      duration: GROW_TOTAL,
      times: [
        0,
        ...NODES.map((_, i) => litAt(i) / GROW_TOTAL),
        ...RECOIL_AT.map((at) => (FILLED + SETTLE * at) / GROW_TOTAL),
        1,
      ],
      ease: [
        ...NODES.map(() => "linear" as const),
        "easeInOut" as const,
        "easeInOut" as const,
        "easeOut" as const,
      ],
    },
  },
}

function keyframes(i: number) {
  const start = i * STAGGER
  const lit = litAt(i) / FILL_TOTAL
  // Every node releases when the last one lands, which for that last node
  // means its own arrival is also its cue to go.
  const clearAt = FILLED / FILL_TOTAL

  // Built up rather than written out, because both ends have a degenerate
  // case: node one has no wait before its ramp, and the last node lights on
  // the very frame the release begins. Either would put a repeated timestamp
  // in the array.
  const values = [0]
  const times = [0]
  if (start > 0) {
    values.push(0)
    times.push(start / FILL_TOTAL)
  }
  values.push(1)
  times.push(lit)
  if (clearAt > lit) {
    values.push(1)
    times.push(clearAt)
  }
  values.push(0)
  times.push(1)

  return { values, times }
}

export default function Waypoints({
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
      // An <svg> clips to its viewport by default, and a stretched route runs
      // past 24 units. The layout box stays 24px either way, so the overflow
      // costs nothing: the card has room below the icon and nothing reflows.
      style={{ overflow: "visible" }}
      // Without an explicit initial, Motion has no base value to animate from
      // on the first boop and warns about animating from "undefined".
      initial="rest"
      animate={booped ? "boop" : "rest"}
    >
      {/* The stretch lives on a <g> rather than the <svg>, which has its own
          width/height/viewBox semantics to fight with.

          originY: 0 pins the top edge so the icon only ever grows downward,
          the way the route runs. It has to go through Motion rather than CSS:
          Motion computes transform-origin from the bounding box and writes it
          itself, so a transform-origin in `style` gets overwritten and the
          scale silently falls back to growing from the centre. */}
      <motion.g variants={GROW} style={{ originX: 0.5, originY: 0 }}>
        {LINKS.map((d) => (
          <path key={d} d={d} />
        ))}
        {NODES.map(({ cx, cy }, i) => {
          const { values, times } = keyframes(i)
          return (
            <motion.circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={2}
              // fillOpacity rather than an animated fill colour, so the dot
              // stays tied to the icon's own currentColor instead of
              // hardcoding the foreground token here.
              fill="currentColor"
              variants={{
                rest: { fillOpacity: 0 },
                boop: {
                  fillOpacity: values,
                  transition: {
                    duration: FILL_TOTAL,
                    times,
                    ease: "easeOut",
                  },
                },
              }}
            />
          )
        })}
      </motion.g>
    </motion.svg>
  )
}
