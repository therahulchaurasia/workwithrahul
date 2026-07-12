import { Paperclip, MessageCircle, type LucideIcon } from "lucide-react"
import Section from "@/components/section"
import Container from "@/components/container"
import ContactForm from "@/components/contact-form"
import { Text } from "@/components/text"
import Eyebrow from "@/components/eyebrow"

const FRONT_SHADOW =
  "rgba(0, 0, 0, 0.08) 0px 0.602187px 0.602187px -0.916667px, rgba(0, 0, 0, 0.08) 0px 2.28853px 2.28853px -1.83333px, rgba(0, 0, 0, 0.07) 0px 10px 10px -2.75px"

type Contact = { icon: LucideIcon; label: string; value: string; href: string }

const channels: Contact[] = [
  {
    icon: Paperclip,
    label: "Email me",
    value: "therahulchaurasia@gmail.com",
    href: "mailto:therahulchaurasia@gmail.com",
  },
  {
    icon: MessageCircle,
    label: "Chat with me",
    value: "@rahul.designs",
    href: "https://instagram.com/rahul.designs",
  },
]

// Contact — final form + contact details (the last conversion push).
export default function Contact() {
  return (
    <Container divider={false}>
      <Section id="contact" className="py-15 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — heading + contact channels */}
          <div className="flex flex-col justify-between gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-[5px]">
                <Eyebrow>Contact</Eyebrow>
                <Text variant="title">Ready to start?</Text>
              </div>
              <Text muted className="max-w-sm">
                Let&apos;s build something people will remember.
              </Text>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {channels.map(({ icon: Icon, label, value, href }, i) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="rounded-[20px] bg-[#e5e5e5] p-1.75"
                >
                  <div
                    className="relative flex h-full flex-col justify-between gap-8 rounded-2xl bg-background p-5 outline-1 outline-[#e2e2e2] [outline-offset:-3px]"
                    style={{ boxShadow: FRONT_SHADOW }}
                  >
                    <div className="flex items-start justify-between">
                      <Icon
                        className="size-6 text-foreground"
                        strokeWidth={1.75}
                      />
                      <span className="flex items-center gap-1">
                        {Array.from({ length: 2 }).map((_, d) => (
                          <span
                            key={d}
                            className={`size-2.5 rounded-full ${
                              d <= i ? "bg-primary" : "bg-black/12"
                            }`}
                          />
                        ))}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Text
                        as="span"
                        variant="label"
                        muted
                        className="uppercase tracking-[0.08em]"
                      >
                        {label}
                      </Text>
                      <Text
                        as="span"
                        variant="subtitle-sm"
                        className="break-all"
                      >
                        {value}
                      </Text>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <ContactForm />
        </div>
      </Section>
    </Container>
  )
}
