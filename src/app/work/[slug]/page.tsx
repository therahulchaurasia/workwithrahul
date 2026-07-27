import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import Container from "@/components/container"
import { Text } from "@/components/text"
import { PROJECTS, getProject } from "@/lib/projects"

// Layout is real; the copy and shots in lib/projects.ts are still
// placeholders.

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return PROJECTS.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${project.slug}`,
      title: project.title,
      description: project.summary,
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug)
  if (!project) notFound()

  const index = PROJECTS.indexOf(project)
  const next = PROJECTS[(index + 1) % PROJECTS.length]

  return (
    <main className="flex flex-1 flex-col">
      <Container>
        {/* Top block stays tight — title, facts, overview read as one unit.
            The gallery below takes its own larger spacing. */}
        <div className="flex w-full flex-col gap-6 pt-28 pb-15 md:gap-8 md:pb-20">
          {/* --- Case-study hero -------------------------------------- */}
          <header className="flex flex-col items-start gap-6">
            <Link
              href="/#work"
              className="flex items-center gap-2 text-foreground-muted transition-colors duration-150 hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              <Text as="span" variant="label">
                All work
              </Text>
            </Link>
            <div className="flex w-full flex-col gap-4">
              <Text as="h1" variant="display">
                {project.title}
              </Text>
              <Text muted className="max-w-[48ch]">
                {project.summary}
              </Text>
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-gradient-to-b from-[#4d4dda] to-primary px-2.5 py-1.5 text-background shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"
              >
                <Text
                  as="span"
                  variant="label"
                  className="text-xs! leading-none text-background"
                >
                  Visit live site
                </Text>
                <ArrowUpRight className="size-3" />
              </a>
            )}
          </header>

          {/* --- Credential strip -------------------------------------- */}
          {/* Label/value pairs instead of a paragraph: the top of the page
              has to be scannable in a few seconds, and this carries the
              same facts the chips used to, without asking anyone to read. */}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-y border-dotted border-line py-5 md:grid-cols-4">
            {project.meta.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <Text as="dt" variant="label" muted className="text-xs!">
                  {label}
                </Text>
                <Text as="dd" className="text-sm">
                  {value}
                </Text>
              </div>
            ))}
          </dl>

          {/* --- Overview ---------------------------------------------- */}
          <Text muted className="max-w-[60ch]">
            {project.overview}
          </Text>

          {/* --- Gallery ------------------------------------------------ */}
          {/* No banner image: whoever lands here just clicked this project's
              cover on the home grid, so repeating it is a dead beat. Even
              sizing throughout — same two-column grid as Selected Work. */}
          <div className="mt-2 grid grid-cols-1 gap-2.5 md:mt-4 md:grid-cols-2">
            {project.gallery.map(({ src, alt }) => (
              <div
                key={src}
                className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#eaeaea]"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Next project sits in its own container: the dotted rule above it
          closes the case study, so this reads as the exit rather than one
          more content block. */}
      <Container divider={false}>
        <div className="w-full py-10 md:py-14">
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-between rounded-2xl bg-[#eaeaea] p-6 transition-transform duration-200 ease-out hover:-translate-y-0.5"
          >
            <div className="flex flex-col gap-1">
              <Text as="span" variant="label">
                Next project
              </Text>
              <Text as="span" variant="subtitle">
                {next.title}
              </Text>
            </div>
            <span className="flex size-11 items-center justify-center rounded-full bg-background">
              <ArrowUpRight className="size-4 text-primary" />
            </span>
          </Link>
        </div>
      </Container>
    </main>
  )
}
