import Image from "next/image"

/**
 * GLOSSARY: how to prep an image for these cards
 *
 * Card width is not yours to set: each column is `flex-1`, so a card is always
 * as wide as its column. Height comes from the card's aspect ratio: CARD_RATIO
 * (7/5) by default, or a per-card `ratio` override. Columns tolerate mixed
 * heights — the marquee only cares that the list is duplicated, not that cards
 * match.
 *
 * `object-cover` scales the image until it covers the card, then clips the
 * overhang. It never squashes and never leaves a gap. It pays for that in
 * pixels:
 *
 *   image wider than the card  -> fills the height, clips the LEFT and RIGHT
 *   image taller than the card -> fills the width, clips the TOP and BOTTOM
 *   image ratio == card ratio  -> nothing clipped
 *
 * So for zero clipping, set `ratio` to the image's native pixel ratio (write
 * it as "width / height" verbatim — self-documenting). Use the override for
 * raw screenshots whose composition can't afford edge loss; leave mockups
 * exported at 7/5 on the default.
 *
 * Cheat sheet for what is in here now:
 *
 *   file           pixels       ratio   card
 *   organic.png    1440 x 839   1.72    ratio "1440 / 839", nothing clipped
 *   asahi.jpeg     1600 x 1275  1.25    7/5 default, loses ~10% top+bottom
 *   withsam.jpeg   1600 x 1275  1.25    7/5 default, loses ~10% top+bottom
 *   gpa.png        1400 x 1023  1.37    7/5 default, loses ~2% top+bottom
 *   mmp.png        1400 x 1021  1.37    7/5 default, loses ~2% top+bottom
 *   highrise.png   1400 x 956   1.46    7/5 default, loses ~4% left+right
 *
 * asahi and withsam were exported 5/4 for the work grid and reused here, so they
 * take a mild vertical crop. That is accepted for now, not an oversight.
 */

type Project = {
  name: string
  background: string
  image?: string
  /** Native "width / height" of a raw screenshot; omit for 7/5 mockups. */
  ratio?: string
}

/** Default card shape. Cards with a raw screenshot override via `ratio`. */
const CARD_RATIO = "7 / 5"

const columnA: Project[] = [
  {
    name: "With Sam",
    background: "#eaeaea",
    image: "/showcase/withsam.jpeg",
  },
  {
    name: "Asahi",
    background: "#eaeaea",
    image: "/showcase/asahi.jpeg",
  },
  {
    name: "Alberto Vance",
    background: "radial-gradient(120% 90% at 50% 30%, #2a2a2e, #0c0c0e)",
    image: "/showcase/organic.png",
    ratio: "1440 / 839",
  },
  {
    name: "gpa",
    background: "#eaeaea",
    image: "/showcase/gpa.png",
  },
  {
    name: "highrise",
    background: "#eaeaea",
    image: "/showcase/highrise.png",
  },
]

const columnB: Project[] = [
  {
    name: "Asahi",
    background: "#eaeaea",
    image: "/showcase/asahi.jpeg",
  },
  {
    name: "With Sam",
    background: "#eaeaea",
    image: "/showcase/withsam.jpeg",
  },
  {
    name: "Alberto Vance",
    background: "linear-gradient(200deg, #14161c, #05060a)",
    image: "/showcase/organic.png",
    ratio: "1440 / 839",
  },
  {
    name: "mmp",
    background: "#eaeaea",
    image: "/showcase/mmp.png",
  },
]

export default function WorkCarousel({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <div className="absolute inset-0 flex gap-2.5">
        <Column projects={columnA} animation="animate-marquee-up" />
        <Column projects={columnB} animation="animate-marquee-down" />
      </div>
    </div>
  )
}

function Column({
  projects,
  animation,
}: {
  projects: Project[]
  animation: string
}) {
  return (
    <div className="flex-1">
      <div
        className={`flex flex-col gap-[10px] ${animation} motion-reduce:animate-none`}
      >
        {[...projects, ...projects].map((p, i) => (
          <Card key={i} {...p} />
        ))}
      </div>
    </div>
  )
}

function Card({ name, background, image, ratio }: Project) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{ aspectRatio: ratio ?? CARD_RATIO, background }}
    >
      {image && (
        <Image
          src={image}
          alt={name}
          fill
          sizes="50vw"
          className="object-cover"
        />
      )}
    </div>
  )
}
