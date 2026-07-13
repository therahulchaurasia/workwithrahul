import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import "lenis/dist/lenis.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import LenisProvider from "@/components/lenis-provider"
import { SITE } from "@/lib/site"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "web designer",
    "web developer",
    "landing pages",
    "freelance web design",
    "custom websites",
    "conversion focused design",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    creator: SITE.twitterHandle,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#f5f5f5",
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  jobTitle: "Web Designer & Developer",
  sameAs: [SITE.twitter],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col overflow-x-clip">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LenisProvider>
          <Navbar />
          {children}
          <Footer />
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}
