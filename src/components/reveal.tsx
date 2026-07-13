"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

// Scroll-triggered entrance for below-fold content. Plays once, when the
// element is ~60px into the viewport. Below-fold reveals never touch LCP,
// so a full fade is free here (unlike the hero headline).
export default function Reveal({
  children,
  className,
  y = 28,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.55, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
