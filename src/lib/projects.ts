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
  // One-liner used in the case-study hero and the page's meta description.
  summary: string
  liveUrl?: string
  // Credential strip under the title. Keep to 4-5 pairs: past that the row
  // wraps and stops being scannable at a glance.
  meta: { label: string; value: string }[]
  // 3-4 sentences. The page opens visual, so this stays short.
  overview: string
  // Card image for Selected Work: a device mockup, shot 5:4 to match the card.
  // Not a duplicate of gallery[0] — that's a raw capture, this is a rendered
  // mockup. Required, because a project with no card image is a bug worth
  // failing the build over rather than quietly falling back.
  cover: ProjectShot
  // Every shot renders at the same size, two up on desktop. Shoot them at a
  // consistent ratio and the grid stays even. Typed non-empty because the
  // first shot doubles as the project's card image in Selected Work.
  gallery: [ProjectShot, ...ProjectShot[]]
}

export const PROJECTS: Project[] = [
  {
    slug: "pandya-infra",
    title: "Pandya Infra",
    tags: ["Studio site", "Design + Development"],
    summary:
      "Placeholder summary. One sentence on what the project was and what it did for the client.",
    meta: [
      { label: "Client", value: "Pandya Infra" },
      { label: "Role", value: "Design + Development" },
      { label: "Stack", value: "Framer" },
      { label: "Timeline", value: "2 weeks" },
    ],
    overview:
      "Placeholder overview. What the client came with, what the site had to do, and how the build answered it. Three or four sentences, no more, because the shots below carry the rest.",
    cover: {
      src: "/showcase/pandya-infra-cover.jpg",
      alt: "Pandya Infra site shown on a laptop",
    },
    gallery: [
      { src: "/showcase/pandya-hero.webp", alt: "Pandya Infra home page hero" },
      {
        src: "/showcase/pandya-works.webp",
        alt: "Pandya Infra featured works",
      },
      {
        src: "/showcase/pandya-fill.webp",
        alt: "Pandya Infra scroll-filled statement section",
      },
      {
        src: "/showcase/pandya-services.webp",
        alt: "Pandya Infra services section",
      },
      {
        src: "/showcase/pandya-detail.webp",
        alt: "Pandya Infra project case-study page",
      },
      {
        src: "/showcase/pandya-footer.webp",
        alt: "Pandya Infra sketchbook carousel and footer",
      },
    ],
  },
  {
    slug: "with-sam",
    title: "With Sam",
    tags: ["Portfolio + CMS", "Development"],
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
    cover: {
      src: "/showcase/withsam.jpeg",
      alt: "With Sam site shown on a laptop",
    },
    gallery: [
      { src: "/showcase/withsam-home.webp", alt: "With Sam home page hero" },
      { src: "/showcase/withsam-work.webp", alt: "With Sam work section" },
      { src: "/showcase/withsam-videos.webp", alt: "With Sam videos index" },
      { src: "/showcase/withsam-blog.webp", alt: "With Sam blog article" },
      { src: "/showcase/withsam-about.webp", alt: "With Sam about page" },
      { src: "/showcase/withsam-connect.webp", alt: "With Sam footer" },
    ],
  },
  {
    slug: "asahi",
    title: "Asahi",
    tags: ["Landing page + CMS", "Development"],
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
    cover: { src: "/showcase/asahi.jpeg", alt: "Asahi site shown on a laptop" },
    gallery: [
      { src: "/showcase/asahi-hero.webp", alt: "Asahi Ramen home page hero" },
      { src: "/showcase/asahi-menu.webp", alt: "Asahi Ramen menu page" },
      { src: "/showcase/asahi-about.webp", alt: "Asahi Ramen about page" },
      { src: "/showcase/asahi-footer.webp", alt: "Asahi Ramen footer" },
    ],
  },
]

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug)
}
