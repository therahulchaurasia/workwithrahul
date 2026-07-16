"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, CircleDot, Plus } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Container from "@/components/container"
import ScrollLink from "@/components/scroll-link"
import { useAnatomy } from "@/components/anatomy/anatomy-provider"
import { EASE, LOGO_DELAY } from "@/lib/motion"

const LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#why-me", label: "Why me" },
  { href: "#faq", label: "FAQs" },
  { href: "#contact", label: "Contact" },
]

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { on: anatomyOn, toggle: toggleAnatomy } = useAnatomy()
  const lastY = useRef(0)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 80) {
        setHidden(false)
      } else if (Math.abs(y - lastY.current) > 6) {
        const goingDown = y > lastY.current
        setHidden(goingDown)
        if (goingDown) setOpen(false)
      }
      lastY.current = y
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <Container divider={false}>
        <nav className="flex h-14 w-full items-center justify-between">
          {/* Logo skips the bar's slide-down and lands last in the load
              choreography, rising from below after the hero carousel. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: LOGO_DELAY }}
          >
            <ScrollLink
              href="#hero"
              className="text-2xl leading-none font-medium tracking-[-0.03em]"
            >
              Rah<span className="italic">ul</span>®
            </ScrollLink>
          </motion.div>

          <div className="flex items-center gap-2.5">
            {/* Anatomy toggle: turns the design-commentary layer on/off.
                Primary-filled when active so the mode is legible at a glance. */}
            <motion.div
              initial={{ y: -80 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <button
                type="button"
                aria-pressed={anatomyOn}
                aria-label="Toggle design anatomy"
                onClick={toggleAnatomy}
                className={`flex size-11 cursor-pointer items-center justify-center rounded-full transition-[background-color,translate] duration-200 ease-out hover:-translate-y-0.5 active:-translate-y-0.5 active:scale-[0.97] ${
                  anatomyOn
                    ? "bg-primary text-white"
                    : "bg-foreground text-background"
                }`}
              >
                <CircleDot className="size-4.5" strokeWidth={2} />
              </button>
            </motion.div>

            <motion.div
              ref={menuRef}
              initial={{ y: -80 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="relative"
            >
              <button
                type="button"
                aria-expanded={open}
                aria-haspopup="menu"
                onClick={() => setOpen((v) => !v)}
                className="flex cursor-pointer items-center gap-2 rounded-full bg-foreground py-2.5 pr-4 pl-5 text-base font-medium text-background transition-transform duration-200 ease-out hover:-translate-y-0.5 active:-translate-y-0.5 active:scale-[0.97]"
              >
                Menu
                <Plus
                  className={`size-4 transition-transform duration-200 ${
                    open ? "rotate-45" : ""
                  }`}
                  strokeWidth={2.5}
                />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    role="menu"
                    // Grows from the trigger's corner (origin top right), never
                    // from nothing — scale starts at 0.97. Exit is faster than
                    // entry: leaving needs less ceremony than arriving.
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.97,
                      transition: { duration: 0.12, ease: EASE },
                    }}
                    transition={{ duration: 0.18, ease: EASE }}
                    className="absolute top-full right-0 mt-3 w-72 origin-top-right rounded-2xl border-[3px] border-background bg-foreground px-6 py-2 shadow-[0_16px_40px_rgba(18,18,18,0.35)]"
                  >
                    {LINKS.map((link) => (
                      <ScrollLink
                        key={link.href}
                        role="menuitem"
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="group/link flex items-center justify-between border-b border-white/10 py-3.5 text-lg text-white/60 transition-colors duration-150 last:border-b-0 hover:text-white"
                      >
                        {link.label}
                        <span className="flex size-5 items-center justify-center overflow-hidden">
                          <ArrowUpRight className="size-5 translate-y-[150%] opacity-0 transition-[translate,opacity] duration-300 delay-100 ease-snap group-hover/link:translate-y-0 group-hover/link:opacity-100 group-hover/link:delay-0 group-hover/link:duration-[700ms] group-hover/link:ease-spring" />
                        </span>
                      </ScrollLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
