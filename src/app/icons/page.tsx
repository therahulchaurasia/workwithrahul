import type { Metadata } from "next"
import { notFound } from "next/navigation"
import IconGallery from "./icon-gallery"

// Scratch page: the six why-me icons laid out big, for screen recording. Not
// part of the site. Delete the whole `src/app/icons` folder once the captures
// are done.
//
// 404s outside development rather than relying on anyone remembering to remove
// it, so a stray deploy can't publish a page with no nav to it and no reason
// to be found.

export const metadata: Metadata = {
  title: "Icon sandbox",
  robots: { index: false, follow: false },
}

export default function IconsPage() {
  if (process.env.NODE_ENV === "production") notFound()

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-8 py-20">
      <IconGallery />
    </main>
  )
}
