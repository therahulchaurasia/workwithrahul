"use client"

import { useLenis } from "lenis/react"
import type { ComponentProps } from "react"

type ScrollLinkProps = Omit<ComponentProps<"a">, "href"> & { href: string }

export default function ScrollLink({
  href,
  onClick,
  ...props
}: ScrollLinkProps) {
  const lenis = useLenis()

  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented) return
        e.preventDefault()
        history.pushState(null, "", href)
        if (lenis) lenis.scrollTo(href)
        else document.querySelector(href)?.scrollIntoView()
      }}
      {...props}
    />
  )
}
