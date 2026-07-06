import Container from "@/components/container"

// Small top navbar. The <header> stays full-width and sticky; Container
// sits inside it (so stickiness isn't constrained by a short wrapper) and
// provides the rails, padding, and the full-viewport bottom divider.
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur-md">
      <Container>
        <nav className="flex h-14 w-full items-center justify-between">
          <a href="#hero" className="font-semibold tracking-[-0.03em]">
            Rahul
          </a>
          <div className="flex items-center gap-6 text-sm">
            <a href="#work" className="hover:text-primary">
              Work
            </a>
            <a href="#services" className="hover:text-primary">
              Services
            </a>
            <a href="#contact" className="hover:text-primary">
              Contact
            </a>
          </div>
        </nav>
      </Container>
    </header>
  )
}
