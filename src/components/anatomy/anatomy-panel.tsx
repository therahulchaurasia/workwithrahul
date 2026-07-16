"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Text } from "@/components/text";
import Eyebrow from "@/components/eyebrow";
import { EASE } from "@/lib/motion";
import { useAnatomy } from "./anatomy-provider";

export type AnatomyNote = {
  /** Must match a data-anatomy-id somewhere in the section. */
  id: string;
  title: string;
  body: string;
  /**
   * Override shown below the section's collapse breakpoint, for notes whose
   * desktop copy describes layout that doesn't exist on small screens (a
   * two-column grid that stacks, a hover effect that isn't there). Omit when
   * the copy is true everywhere.
   */
  bodyMobile?: string;
  /** Breakpoint where the described layout kicks in. Default "lg". */
  switchAt?: "md" | "lg";
};

const item = {
  hidden: { opacity: 0, y: 16 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
};

/**
 * The decision cards for one section. Rendered inside the (relative) section,
 * positioned by the caller via className (mobile docks as a fixed bottom
 * sheet, md+ wherever the caller puts it). No scrim: the spotlight works by
 * fading everything except the active card's target (see the sibling-walk in
 * anatomy-provider and .anatomy-faded in globals.css), so the section stays
 * clickable-looking only where it's lit. Clicking anywhere outside the
 * anatomy UI closes.
 *
 * Exactly one note is active while open: the first auto-activates on open so
 * the card->element link demonstrates itself, then hover (or tap) moves it.
 * Mobile swaps the vertical stack for a horizontal snap row, since a stack
 * would bury the section it annotates.
 */
export default function AnatomyPanel({
  section,
  notes,
  className,
}: {
  section: string;
  notes: AnatomyNote[];
  className?: string;
}) {
  const { openSection, setOpenSection, activeNote, setActiveNote } =
    useAnatomy();
  const open = openSection === section;

  useEffect(() => {
    if (open && notes.length > 0) setActiveNote(notes[0].id);
  }, [open, notes, setActiveNote]);

  // Outside close listens for click, not pointerdown: on touch, a scroll
  // gesture starts with pointerdown, so pointerdown-close made any attempt
  // to scroll (to look at the ringed element) dismiss the sheet. Click only
  // fires on a true tap/press, drags never close.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target;
      if (t instanceof Element && t.closest("[data-anatomy-ui]")) return;
      setOpenSection(null);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open, setOpenSection]);

  return (
    // Reduced-motion handling comes from the global MotionProvider in layout.
    <AnimatePresence>
      {open && (
        <motion.aside
          data-anatomy-ui
          key="cards"
          initial="hidden"
          animate="shown"
          exit="hidden"
          variants={{ shown: { transition: { staggerChildren: 0.06 } } }}
          // Positioning (including absolute vs fixed) is the caller's:
          // mobile wants a fixed bottom sheet, md+ an absolute placement
          // inside the section.
          className={`z-45 flex w-full flex-col gap-3 md:w-80 ${className ?? ""}`}
        >
          {/* Translucent backing so the header survives sitting on a lit
              (unfaded) part of the section. */}
          <motion.header
            variants={item}
            className="mx-5 rounded-2xl bg-background/80 p-4 backdrop-blur-md md:mx-0"
          >
            <Eyebrow>Anatomy</Eyebrow>
            <Text as="p" muted className="mt-0.5 text-sm!">
              Design decisions behind this section. Hover or tap a note to see
              what it explains.
            </Text>
          </motion.header>
          <div className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:flex-col md:overflow-visible md:px-0 md:pb-0">
            {notes.map((note) => {
              const active = activeNote === note.id;
              return (
                <motion.div
                  key={note.id}
                  variants={item}
                  // Keyboard path: cards are tabbable and activate on focus,
                  // mirroring hover — Tab walks the ring through the section
                  // the same way the mouse does. Enter/Space kept so the
                  // button role isn't a lie.
                  role="button"
                  tabIndex={0}
                  aria-pressed={active}
                  onFocus={() => setActiveNote(note.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveNote(note.id);
                    }
                  }}
                  onMouseEnter={() => setActiveNote(note.id)}
                  onClick={() => setActiveNote(note.id)}
                  className={`w-72 shrink-0 cursor-pointer snap-center rounded-2xl border bg-background p-5 shadow-[0_16px_40px_rgba(18,18,18,0.12)] transition-colors duration-200 outline-none md:w-full ${
                    active ? "border-primary" : "border-line"
                  }`}
                >
                  <Text as="h4" variant="label" className="block">
                    {note.title}
                  </Text>
                  {note.bodyMobile ? (
                    // Both variants render; the breakpoint picks one. CSS
                    // visibility keeps it SSR-safe and live across rotates.
                    <>
                      <Text
                        as="p"
                        muted
                        className={`mt-1.5 text-sm! ${note.switchAt === "md" ? "md:hidden" : "lg:hidden"}`}
                      >
                        {note.bodyMobile}
                      </Text>
                      <Text
                        as="p"
                        muted
                        className={`mt-1.5 hidden text-sm! ${note.switchAt === "md" ? "md:block" : "lg:block"}`}
                      >
                        {note.body}
                      </Text>
                    </>
                  ) : (
                    <Text as="p" muted className="mt-1.5 text-sm!">
                      {note.body}
                    </Text>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
