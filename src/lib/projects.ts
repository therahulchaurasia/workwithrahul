// Single source of truth for showcase projects: the Selected Work grid and
// the /work/[slug] case-study pages both read from here.

export type ProjectShot = {
  src: string
  alt: string
}

export type Project = {
  slug: string
  title: string
  // tags: [project type, scope/role] — max two, work-card chips get crowded
  // past that.
  tags: [string, string]
  year: string
  // One-liner used in the case-study hero and the page's meta description.
  summary: string
  liveUrl?: string
  // Credential strip under the title. Keep to 4-5 pairs: past that the row
  // wraps and stops being scannable at a glance.
  meta: { label: string; value: string }[]
  // 3-4 sentences. The page opens visual, so this stays short.
  overview: string
  // Every shot renders at the same size, two up on desktop. Shoot them at a
  // consistent ratio and the grid stays even. Typed non-empty because the
  // first shot doubles as the project's card image in Selected Work.
  gallery: [ProjectShot, ...ProjectShot[]]
}

export const PROJECTS: Project[] = [
  {
    slug: "with-sam",
    title: "With Sam",
    tags: ["Portfolio + CMS", "Development"],
    year: "2026",
    summary:
      "Placeholder summary. One sentence on what the project was and what it did for the client.",
    meta: [
      { label: "Client", value: "With Sam" },
      { label: "Role", value: "Design + Development" },
      { label: "Stack", value: "Next.js, Sanity" },
      { label: "Timeline", value: "3 weeks" },
    ],
    overview:
      "Placeholder overview. What the client came with, what the site had to do, and how the build answered it. Three or four sentences, no more, because the shots below carry the rest.",
    gallery: [
      { src: "/showcase/withsam.jpeg", alt: "With Sam home page" },
      { src: "/showcase/gpa.png", alt: "With Sam detail view" },
      { src: "/showcase/mmp.png", alt: "With Sam detail view" },
      { src: "/showcase/highrise.png", alt: "With Sam CMS view" },
    ],
  },
  {
    slug: "asahi",
    title: "Asahi",
    tags: ["Landing page + CMS", "Development"],
    year: "2026",
    summary:
      "Placeholder summary. One sentence on what the project was and what it did for the client.",
    meta: [
      { label: "Client", value: "Asahi" },
      { label: "Role", value: "Design + Development" },
      { label: "Stack", value: "Next.js, Sanity" },
      { label: "Timeline", value: "2 weeks" },
    ],
    overview:
      "Placeholder overview. What the client came with, what the site had to do, and how the build answered it. Three or four sentences, no more, because the shots below carry the rest.",
    gallery: [
      { src: "/showcase/asahi.jpeg", alt: "Asahi landing page" },
      { src: "/showcase/organic.png", alt: "Asahi detail view" },
      { src: "/showcase/highrise.png", alt: "Asahi detail view" },
      { src: "/showcase/mmp.png", alt: "Asahi detail view" },
    ],
  },
]

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug)
}
