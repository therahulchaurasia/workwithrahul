"use client";

import { MotionConfig } from "motion/react";

// Site-wide prefers-reduced-motion handling for every Motion component:
// reducedMotion="user" drops transform animations (the y-rises, slides,
// plane exits) while keeping opacity fades, so reduced-motion visitors get
// gentle state changes instead of movement. CSS animations opt out
// separately via motion-reduce: utilities.
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
