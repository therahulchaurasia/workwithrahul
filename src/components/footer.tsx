import Container from "./container"
import { Text } from "@/components/text"

export default function Footer() {
  return (
    <Container
      divider={false}
      outerClassName="bg-[#121212] text-white [--line:#ffffff14] [--foreground-muted:#a1a1a1]"
    >
      <footer className="w-full py-2 text-sm lg:py-10">
        <div className="divide-y divide-dotted divide-line lg:flex lg:divide-y-0">
          {groups.map((group) => (
            <FooterGroup key={group.heading} {...group} />
          ))}
        </div>
      </footer>
    </Container>
  )
}

const groups = [
  {
    heading: "Built by",
    items: ["Rahul"],
  },
  { heading: "Get in touch", items: ["Email", "Twitter"] },
]

function FooterGroup({
  heading,
  shortHeading,
  items,
}: {
  heading: string
  shortHeading?: string
  items: string[]
}) {
  return (
    <div className="flex items-center justify-between py-2 lg:w-1/2 lg:flex-col lg:items-start lg:justify-between lg:gap-4 lg:py-0">
      <Text as="h3" variant="subtitle" className="text-white/50 lg:text-white">
        {shortHeading ? (
          <>
            <span className="sm:hidden">{shortHeading}</span>
            <span className="hidden sm:inline">{heading}</span>
          </>
        ) : (
          heading
        )}
      </Text>
      <div className="flex gap-5 text-white lg:gap-4 lg:text-white/70">
        {items.map((item) => (
          <Text as="span" variant="body" key={item} className="font-normal!">
            {item}
          </Text>
        ))}
      </div>
    </div>
  )
}
