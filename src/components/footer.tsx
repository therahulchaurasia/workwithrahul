import Container from "./container"

// Site footer. The body shell has no horizontal padding, so this full-width
// block bleeds edge to edge on its own — no translate / 100vw / negative
// margin. Container keeps content within the 1350px column (40px x-padding);
// 25px padding top and bottom.
export default function Footer() {
  return (
    <div className="w-full bg-[#121212] text-white">
      <Container divider={false}>
        <footer className="w-full">
          <div className="flex min-h-[120px] w-full py-6.25 text-sm">
            {/* Left half */}
            <div className="flex w-1/2 flex-col justify-between">
              <h3 className="text-2xl font-semibold">
                Designed &amp; developed by
              </h3>
              <p className="text-white/50">Yours Truly</p>
            </div>

            {/* Right half */}
            <div className="flex w-1/2 gap-2 flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold">Get in touch</h3>
                {/* <p className="mt-1 text-sm text-white/50">
                  Branding focused on making you more money and deliver real
                  results.
                </p> */}
              </div>
              <div className="flex gap-4 text-white/70">
                <a href="#" className="hover:text-white">
                  Twitter
                </a>
                <a href="#" className="hover:text-white">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </footer>
      </Container>
    </div>
  )
}
