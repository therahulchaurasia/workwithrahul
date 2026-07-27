"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLenis } from "lenis/react"
import type { ComponentProps } from "react"

type ScrollLinkProps = Omit<ComponentProps<"a">, "href"> & { href: string }

export default function ScrollLink({
  href,
  onClick,
  ...props
}: ScrollLinkProps) {
  const lenis = useLenis()
  const pathname = usePathname()

  // Anywhere but the home page there is no #section to scroll to, so
  // hijacking the click only pushed the hash onto the current URL and left
  // you where you were. Route home and let the anchor land.
  if (pathname !== "/") {
    return <Link href={`/${href}`} onClick={onClick} {...props} />
  }

  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented) return
        e.preventDefault()
        // Absolute, not a bare "#work": this branch only runs on the home
        // page, and a relative hash pushed onto a URL that already had one
        // came back as "/#work#work".
        history.pushState(null, "", `/${href}`)
        if (lenis) lenis.scrollTo(href)
        else document.querySelector(href)?.scrollIntoView()
      }}
      {...props}
    />
  )
}
