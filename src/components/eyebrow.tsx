import type { ReactNode } from "react"

// Section kicker: blue "//" + bold label, sits above the section title.
export default function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit items-baseline gap-1 text-lg font-bold tracking-[-0.01em]">
      <span className="text-primary">{"//"}</span>
      <span>{children}</span>
    </span>
  )
}
