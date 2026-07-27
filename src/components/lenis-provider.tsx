"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { ReactLenis, useLenis } from "lenis/react"
import { MotionConfig } from "motion/react"
import type { ReactNode } from "react"

// Lenis owns the scroll position, so the App Router's own scroll reset never
// reaches it: opening a project from halfway down the home page dropped you
// halfway down the project page. Snap to the top on every route change,
// unless the URL carries a hash — those navigations are asking for a
// specific section (/#work), and jumping to the top would fight them.
function ScrollResetOnRouteChange() {
  const lenis = useLenis()
  const pathname = usePathname()

  useEffect(() => {
    if (window.location.hash) return
    lenis?.scrollTo(0, { immediate: true })
  }, [lenis, pathname])

  return null
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        touchMultiplier: 2,
        wheelMultiplier: 1,
        smoothWheel: true,
      }}
    >
      <ScrollResetOnRouteChange />
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  )
}
