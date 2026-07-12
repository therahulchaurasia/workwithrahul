import Image from "next/image"

type Project = {
  name: string
  background: string
  image?: string
}

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
    name: "Random2",
    background: "radial-gradient(120% 90% at 50% 30%, #2a2a2e, #0c0c0e)",
  },
  {
    name: "Random3",
    background: "linear-gradient(160deg, #ffd9c2, #ff9d76)",
  },
  {
    name: "Random4",
    background: "linear-gradient(200deg, #d7d7db, #9a9aa2)",
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
    name: "Random2",
    background: "linear-gradient(200deg, #14161c, #05060a)",
  },
  {
    name: "Random1",
    background: "linear-gradient(150deg, #4a5568, #1a1f2b)",
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

function Card({ name, background, image }: Project) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{ aspectRatio: CARD_RATIO, background }}
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
