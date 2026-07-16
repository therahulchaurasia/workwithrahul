"use client"

import { useEffect, useRef } from "react"
import { AnimatePresence, motion, type Variants } from "motion/react"
import usePrefersReducedMotion from "@/hooks/use-prefers-reduced-motion"

export type SendStatus = "idle" | "sending" | "success" | "error"

/* ------------------------------ animation data ------------------------------ */

const POP = { type: "spring", stiffness: 500, damping: 30 } as const

// Screen-space position of the plane: centering, in-flight sway, and the two
// exits. Rotation here composes with PaperPlane's -30° flight tilt, so the
// error exit reads as 75 - 30 = +45 nose-dive.
const planeVariants: Variants = {
  enter: { scale: 0, opacity: 0, x: 0, y: 0, rotate: 0 },
  idle: { scale: 1, opacity: 1, x: 0, y: 0, rotate: 0 },
  sending: {
    scale: 1,
    opacity: 1,
    y: 0,
    x: [0, 2.2, 0.8, -1.4, -2.2, -0.5, 0],
    transition: {
      ...POP,
      x: {
        duration: 1.3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.1,
        times: [0, 0.18, 0.34, 0.55, 0.72, 0.88, 1],
      },
    },
  },
  exit: (status: SendStatus) =>
    status === "error"
      ? {
          x: 34,
          y: 60,
          rotate: 75,
          transition: { duration: 0.45, ease: "easeIn" },
        }
      : {
          x: 60,
          y: -35,
          rotate: 0,
          transition: { duration: 0.4, ease: "easeIn" },
        },
}

// Paper plane paths. All three shapes share one path structure so `d` can
// tween between them: rest <-> flex is the in-flight wing flap, flare is the
// wings-spread takeoff pose.
const PLANE = {
  outline: {
    rest: "M21.5 12 L3.6 4.6 L6.8 12 L3.6 19.4 Z",
    flex: "M21.5 12 L5.4 6.8 L8.4 12 L5.4 17.2 Z",
    flare: "M21.5 12 L2.9 3.4 L6.6 12 L2.9 20.6 Z",
  },
  fold: {
    rest: "M6.8 12 L21.5 12",
    flex: "M8.4 12 L21.5 12",
    flare: "M6.6 12 L21.5 12",
  },
}

// Fixed positions (not random: SSR hydration + art direction), kept out of
// the 40-60% band so no streak crosses the plane.
const STREAKS = [
  { left: "10%", width: 16, delay: 0, duration: 0.7 },
  { left: "22%", width: 7, delay: 0.3, duration: 0.55 },
  { left: "30%", width: 10, delay: 0.15, duration: 0.6 },
  { left: "80%", width: 20, delay: 0.1, duration: 0.8 },
  { left: "90%", width: 5, delay: 0.45, duration: 0.5 },
]

/* --------------------------------- button ---------------------------------- */

export default function SendButton({ status }: { status: SendStatus }) {
  const failed = status === "error"
  const flying = status === "sending"
  const buttonRef = useRef<HTMLButtonElement>(null)
  // Streaks are pure decoration, and under reduced motion the global
  // MotionConfig strips their x/y travel but keeps the opacity keyframes —
  // stationary blinking dashes. Skip rendering them instead.
  const reducedMotion = usePrefersReducedMotion()

  // Takeoff flare on success. The exiting plane's React props are frozen by
  // AnimatePresence, so the flare can't render conditionally — instead the
  // SMIL <animate> elements sit in the SVG with begin="indefinite" and get
  // kicked imperatively here (the DOM node lives on through the exit).
  // Because they begin later than the looping flap, SMIL gives them priority.
  useEffect(() => {
    if (status !== "success") return
    buttonRef.current
      ?.querySelectorAll<SVGAnimateElement>("animate[data-plane-flare]")
      .forEach((a) => a.beginElement())
  }, [status])

  return (
    <button
      ref={buttonRef}
      type="submit"
      data-status={status}
      disabled={status === "sending" || status === "success"}
      // Shadow cross-fades slowly (error state), the press scale snaps in
      // 160ms — hence the split transition. :active never fires while
      // disabled, so the sending/success states stay still.
      className={`relative mt-1 w-full cursor-pointer overflow-hidden rounded-full py-4 font-semibold text-white [transition:box-shadow_500ms,scale_160ms_cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] disabled:cursor-default ${
        failed
          ? "shadow-[0_10px_24px_-8px_rgba(217,48,54,0.7)]"
          : "shadow-[0_10px_24px_-8px_rgba(51,51,204,0.6)]"
      }`}
    >
      <Gradient show={!failed} className="from-[#4d4dda] to-primary" />
      <Gradient show={failed} className="from-[#ff6369] to-[#d93036]" />

      <AnimatePresence>
        {flying && !reducedMotion && <Slipstream />}
      </AnimatePresence>

      <span className="relative flex h-6 items-center justify-center gap-2.5">
        <AnimatePresence mode="popLayout" custom={status} initial={false}>
          {status === "idle" && (
            <motion.span
              key="label"
              exit={{ scale: 0, opacity: 0 }}
              transition={POP}
            >
              Send it
            </motion.span>
          )}
          {(status === "idle" || flying) && (
            <motion.span
              key="plane"
              layout
              custom={status}
              variants={planeVariants}
              initial="enter"
              animate={status}
              exit="exit"
              transition={POP}
            >
              {/* Under reduced motion the plane stays flat and still: tilt,
                  wobble and the SMIL flap all key off this prop. */}
              <PaperPlane flying={flying && !reducedMotion} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      <ResultMessage status={status} />
    </button>
  )
}

/* --------------------------------- layers ---------------------------------- */

// Backgrounds swap via opacity because gradients can't cross-fade.
function Gradient({ show, className }: { show: boolean; className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute inset-0 bg-gradient-to-b shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] transition-opacity duration-500 ${className} ${
        show ? "opacity-100" : "opacity-0"
      }`}
    />
  )
}

// White speed lines falling along the plane's 30° flight axis.
function Slipstream() {
  return (
    <motion.span
      aria-hidden
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.1 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      {STREAKS.map((s, i) => (
        <motion.span
          key={i}
          className="absolute h-[3px] rounded-full"
          style={{
            top: -10,
            left: s.left,
            width: s.width,
            rotate: -30,
            background:
              "linear-gradient(to right, rgba(255,255,255,0.7), rgba(255,255,255,0))",
          }}
          initial={{ opacity: 0 }}
          animate={{ x: [0, -130], y: [0, 75], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "linear",
            opacity: {
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.15, 0.7, 1],
            },
          }}
        />
      ))}
    </motion.span>
  )
}

// Three stacked transform layers, one job each, so none of them fight:
// tilt (springs to -30° for flight) > wobble (banking loop around 0) > svg.
// Sway lives further up in planeVariants, outside the tilt, so it stays
// horizontal on screen.
function PaperPlane({ flying }: { flying: boolean }) {
  return (
    <motion.span
      className="flex"
      animate={{ rotate: flying ? -30 : 0 }}
      transition={POP}
    >
      <motion.span
        className="flex"
        animate={flying ? { rotate: [0, 3, -1.5, 2, 0] } : { rotate: 0 }}
        transition={
          flying ? { duration: 1.7, repeat: Infinity, ease: "easeInOut" } : POP
        }
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="plane-svg size-5"
        >
          <style>{planeCss}</style>
          <path d={PLANE.outline.rest}>
            {flying && <Flap values={PLANE.outline} />}
            <Flare to={PLANE.outline.flare} />
          </path>
          <path d={PLANE.fold.rest}>
            {flying && <Flap values={PLANE.fold} />}
            <Flare to={PLANE.fold.flare} />
          </path>
        </svg>
      </motion.span>
    </motion.span>
  )
}

// The flap and takeoff-flare morphs run on SMIL (<animate> inside the SVG)
// instead of CSS `d: path()`, which Safari/WebKit doesn't support — SMIL
// morphs work in every engine. Motion can't tween `d` either, hence native.

// In-flight wing flap: rest <-> flex, looping while mounted (mounted only
// while `flying`; if props freeze mid-exit it keeps flapping, which is the
// wanted look for the error fall — the success flare out-prioritizes it).
function Flap({ values }: { values: { rest: string; flex: string } }) {
  return (
    <animate
      attributeName="d"
      values={`${values.rest};${values.flex};${values.rest}`}
      keyTimes="0;0.5;1"
      calcMode="spline"
      keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
      dur="1.1s"
      repeatCount="indefinite"
    />
  )
}

// Wings-spread takeoff pose. begin="indefinite" parks it until SendButton's
// success effect calls beginElement(); a to-animation starts from whatever
// the flap is showing mid-cycle, so there is no snap back to rest first.
function Flare({ to }: { to: string }) {
  return (
    <animate
      data-plane-flare=""
      attributeName="d"
      to={to}
      begin="indefinite"
      dur="0.35s"
      calcMode="spline"
      keyTimes="0;1"
      keySplines="0.33 0 0.2 1"
      fill="freeze"
    />
  )
}

// Hover boop stays CSS — it's a transform, safe everywhere. Media query
// instead of the hook because this channel never touches React.
const planeCss = `
  @keyframes plane-boop {
    0%, 100% { transform: translateX(0); }
    35% { transform: translateX(5px); }
    70% { transform: translateX(-1px); }
  }
  @media (prefers-reduced-motion: no-preference) {
    button[data-status="idle"]:hover .plane-svg {
      animation: plane-boop 0.5s cubic-bezier(0.34, 1.2, 0.64, 1);
    }
  }
`

function ResultMessage({ status }: { status: SendStatus }) {
  return (
    <span
      aria-live="polite"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <AnimatePresence initial={false}>
        {status === "success" && (
          <motion.span
            key="success"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...POP, delay: 0.15 }}
          >
            I&apos;ll reply within 24-48 hours
          </motion.span>
        )}
        {status === "error" && (
          <motion.span
            key="error"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{
              y: 40,
              opacity: 0,
              transition: { duration: 0.25, ease: "easeIn" },
            }}
            transition={{ ...POP, delay: 0.2 }}
          >
            Try again later or email me directly
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
