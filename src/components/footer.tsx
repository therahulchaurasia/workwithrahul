import Container from "./container"

export default function Footer() {
  return (
    <Container
      divider={false}
      outerClassName="bg-[#121212] text-white [--line:#ffffff14]"
    >
      <footer className="w-full py-2 text-sm lg:py-6">
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
    heading: "Designed & developed by",
    shortHeading: "Built by",
    items: ["Yours Truly"],
  },
  { heading: "Get in touch", items: ["Twitter", "Email"] },
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
    <div className="flex items-center justify-between py-2 lg:w-1/2 lg:flex-col lg:items-start lg:justify-between lg:gap-6 lg:py-0">
      <h3 className="text-xl font-medium text-white/50 lg:text-2xl lg:font-semibold lg:text-white">
        {shortHeading ? (
          <>
            <span className="sm:hidden">{shortHeading}</span>
            <span className="hidden sm:inline">{heading}</span>
          </>
        ) : (
          heading
        )}
      </h3>
      <div className="flex gap-5 text-white lg:gap-4 lg:text-white/70">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  )
}
