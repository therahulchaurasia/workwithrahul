"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { motion } from "motion/react";
import Container from "@/components/container";
import ScrollLink from "@/components/scroll-link";
import { EASE, LOGO_DELAY } from "@/lib/motion";

const LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#why-me", label: "Why me" },
  { href: "#faq", label: "FAQs" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) {
        setHidden(false);
      } else if (Math.abs(y - lastY.current) > 6) {
        const goingDown = y > lastY.current;
        setHidden(goingDown);
        if (goingDown) setOpen(false);
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

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
              className="flex cursor-pointer items-center gap-2 rounded-full bg-foreground py-2.5 pr-4 pl-5 text-base font-medium text-background transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Menu
              <Plus
                className={`size-4 transition-transform duration-200 ${
                  open ? "rotate-45" : ""
                }`}
                strokeWidth={2.5}
              />
            </button>

            {open && (
              <div
                role="menu"
                className="absolute top-full right-0 mt-3 w-72 rounded-2xl border-[3px] border-background bg-foreground px-6 py-2 shadow-[0_16px_40px_rgba(18,18,18,0.35)]"
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
                      <ArrowUpRight className="size-5 translate-y-[150%] opacity-0 transition-[translate,opacity] duration-300 delay-100 ease-[cubic-bezier(0.513,0,0.989,0.146)] group-hover/link:translate-y-0 group-hover/link:opacity-100 group-hover/link:delay-0 group-hover/link:duration-[700ms] group-hover/link:ease-[linear(0,0.029_1.3%,0.118_2.8%,0.631_8.6%,0.843_11.6%,0.985_14.8%,1.028_16.5%,1.055_18.3%,1.066_20.2%,1.066_22.3%,1.012_32.4%,0.996_39.4%,1)]" />
                    </span>
                  </ScrollLink>
                ))}
              </div>
            )}
          </motion.div>
        </nav>
      </Container>
    </header>
  );
}
