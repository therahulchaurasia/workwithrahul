import Image from "next/image"

type Project = {
  name: string
  ratio: string
  background: string
  image?: string
}

const columnA: Project[] = [
  {
    name: "With Sam",
    ratio: "5 / 4",
    background: "#eaeaea",
    image: "/showcase/mockup-5.png",
  },
  {
    name: "Random1",
    ratio: "4 / 5",
    background: "linear-gradient(150deg, #1b3bd8, #0a1230)",
  },
  {
    name: "Random2",
    ratio: "3 / 4",
    background: "radial-gradient(120% 90% at 50% 30%, #2a2a2e, #0c0c0e)",
  },
  {
    name: "Random3",
    ratio: "1 / 1",
    background: "linear-gradient(160deg, #ffd9c2, #ff9d76)",
  },
  {
    name: "Random4",
    ratio: "4 / 5",
    background: "linear-gradient(200deg, #d7d7db, #9a9aa2)",
  },
]

const columnB: Project[] = [
  {
    name: "Random4",
    ratio: "5 / 4",
    background: "radial-gradient(120% 100% at 70% 40%, #3a2b6b, #0b0b16)",
  },
  {
    name: "Random3",
    ratio: "4 / 5",
    background: "linear-gradient(160deg, #2f6bff, #0656ba)",
  },
  {
    name: "Random2",
    ratio: "1 / 1",
    background: "linear-gradient(200deg, #14161c, #05060a)",
  },
  {
    name: "Random1",
    ratio: "3 / 4",
    background: "linear-gradient(150deg, #4a5568, #1a1f2b)",
  },
]

export default function WorkCarousel({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <div className="absolute inset-0 flex gap-[10px]">
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

function Card({ name, ratio, background, image }: Project) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{ aspectRatio: ratio, background }}
    >
      {image && (
        <Image src={image} alt={name} fill sizes="50vw" className="object-cover" />
      )}
    </div>
  )
}
