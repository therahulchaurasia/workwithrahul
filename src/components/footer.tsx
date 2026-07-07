import Container from "./container"

function FooterRow({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-xl font-medium text-white/50">{label}</span>
      <div className="flex gap-5 text-primary">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <div className="w-full bg-[#121212] text-white">
      <Container divider={false}>
        <footer className="w-full py-3 text-sm lg:py-6">
          <div className="divide-y divide-white/10 lg:hidden">
            <FooterRow
              label="Designed &amp; developed by"
              items={["Yours Truly"]}
            />
            <FooterRow label="Get in touch" items={["Twitter", "Instagram"]} />
          </div>

          <div className="hidden w-full lg:flex">
            <div className="flex w-1/2 flex-col justify-between gap-6">
              <h3 className="text-xl font-semibold lg:text-2xl">
                Designed &amp; developed by
              </h3>
              <p className="text-white/50">Yours Truly</p>
            </div>

            <div className="flex w-1/2 flex-col justify-between gap-2">
              <h3 className="text-xl font-semibold lg:text-2xl">
                Get in touch
              </h3>
              <div className="flex gap-4 text-white/70">
                <span>Twitter</span>
                <span>Instagram</span>
              </div>
            </div>
          </div>
        </footer>
      </Container>
    </div>
  )
}
