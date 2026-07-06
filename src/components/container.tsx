import type { ReactNode } from "react"

export default function Container({
  children,
  className,
  divider = true,
}: {
  children: ReactNode
  className?: string
  divider?: boolean
}) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[1350px] border-x border-dotted border-line px-3.75 md:px-6.25 xl:px-10 ${className ?? ""}`}
    >
      {children}
      {divider && (
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 w-screen -translate-x-1/2 border-t border-dotted border-line"
        />
      )}
    </div>
  )
}
