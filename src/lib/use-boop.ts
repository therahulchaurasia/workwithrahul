"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"

/** What every boop-aware icon takes. Shared so the six stay interchangeable. */
export type BoopIconProps = {
  /** Whether the card holding this icon is currently booped. */
  booped: boolean
  className?: string
  strokeWidth?: number
}

// A boop is a one-shot poke, not a hover state: the element springs into a
// displaced pose and comes home on its own, so holding the cursor still does
// nothing more. Adapted from Josh Comeau's useBoop, with two changes.
//
// His version is react-spring; this one just reports a boolean and lets the
// caller animate however it likes, since our icons move several parts on a
// stagger rather than transforming one element.
//
// The intent guard is the other addition. Without it, sweeping the pointer
// across a grid of cards sets every icon off at once. Requiring the pointer to
// settle for a moment first means a fast sweep triggers nothing, and a card you
// actually stopped on boops.
export function useBoop({
  // How long the booped pose holds before it's released. Read it as a
  // re-trigger floor, not a duration: every boop ends where it started, so
  // releasing late costs nothing but how soon the card can be booped again.
  // It only has to outlast the longest icon, currently the pencil at 860ms.
  timing = 1100,
  // Pointer dwell before a boop counts as deliberate. Measured against a grid
  // sweep: 70ms let a medium-paced drag set off every card it crossed. This
  // holds through roughly 140ms per card, which covers a sweep without making
  // a hover you meant feel like it's lagging.
  intent = 110,
} = {}) {
  const [booped, setBooped] = useState(false)
  const intentTimer = useRef<number | undefined>(undefined)
  // Boops are decorative, so reduced motion gets nothing at all rather than a
  // gentler version. Gating here instead of in each icon covers the properties
  // MotionConfig's reducedMotion="user" leaves alone: it drops transforms, but
  // a fill or opacity pulse would still play.
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!booped) return
    const id = window.setTimeout(() => setBooped(false), timing)
    return () => window.clearTimeout(id)
  }, [booped, timing])

  useEffect(() => () => window.clearTimeout(intentTimer.current), [])

  const onPointerEnter = useCallback(() => {
    if (reduced) return
    intentTimer.current = window.setTimeout(() => setBooped(true), intent)
  }, [intent, reduced])

  // Cancels a boop that hasn't started yet. One already running is left alone
  // on purpose: that's the whole point of a boop over a hover state, and it's
  // what stops a half-finished animation snapping back when you look away.
  const onPointerLeave = useCallback(() => {
    window.clearTimeout(intentTimer.current)
  }, [])

  // Fires a boop with no intent guard, for triggers that are already
  // deliberate. The guard exists to tell a pointer sweeping past from one that
  // stopped, a question a click or a keypress has already answered.
  const boop = useCallback(() => {
    if (reduced) return
    setBooped(true)
  }, [reduced])

  return { booped, boop, onPointerEnter, onPointerLeave }
}
