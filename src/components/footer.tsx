import Container from "./container"
import { Text } from "@/components/text"
import { SITE } from "@/lib/site"

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

type FooterItem = { label: string; href?: string }

const groups: {
  heading: string
  shortHeading?: string
  items: FooterItem[]
}[] = [
  {
    heading: "Built by",
    items: [{ label: "Rahul" }],
  },
  {
    heading: "Get in touch",
    items: [
      { label: "Email", href: `mailto:${SITE.email}` },
      { label: "Twitter", href: SITE.twitter },
    ],
  },
]

function FooterGroup({
  heading,
  shortHeading,
  items,
}: {
  heading: string
  shortHeading?: string
  items: FooterItem[]
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
        {items.map(({ label, href }) =>
          href ? (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="transition-colors duration-200 hover:text-white"
            >
              <Text as="span" variant="body" className="font-normal!">
                {label}
              </Text>
            </a>
          ) : (
            <Text as="span" variant="body" key={label} className="font-normal!">
              {label}
            </Text>
          )
        )}
      </div>
    </div>
  )
}
