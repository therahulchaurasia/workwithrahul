"use client"

import { useState } from "react"
import SendButton, { type SendStatus } from "@/components/send-button"

const FRONT_SHADOW =
  "rgba(0, 0, 0, 0.12) 0px 0.602187px 0.602187px -0.916667px, rgba(0, 0, 0, 0.14) 0px 2.28853px 2.28853px -1.83333px, rgba(0, 0, 0, 0.18) 0px 10px 10px -2.75px"

const FIELD =
  "w-full rounded-xl bg-[#1e1e1e] px-4 py-3.5 text-base font-medium text-white placeholder:text-[#8a8a8a] outline-1 outline-[#ffffff14] transition-[outline-color] focus:outline-primary"
const LABEL = "text-sm font-semibold text-white"

export default function ContactForm() {
  const [status, setStatus] = useState<SendStatus>("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === "sending" || status === "success") return

    const form = e.currentTarget

    // Trim every field first so whitespace-only values fail `required` (this
    // also validates the textarea, which can't take a `pattern`), then let the
    // browser's constraint API surface the first error.
    for (const el of Array.from(form.elements)) {
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)
        el.value = el.value.trim()
    }
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const data = Object.fromEntries(new FormData(form))
    setStatus("sending")
    try {
      // Send + minimum flight time: even an instant API response keeps the
      // plane flying 2s so the choreography can breathe.
      const [res] = await Promise.all([
        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ])
      if (!res.ok) throw new Error(`send failed: ${res.status}`)
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <form
      // Validation runs in the handler (trim first, then constraint API), so
      // the native pre-submit pass stays off.
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-[20px] bg-[#121212] p-6 text-white md:p-8"
      style={{ boxShadow: FRONT_SHADOW }}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className={LABEL}>
          Your name<span className="text-primary">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          placeholder="Your name"
          className={FIELD}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={LABEL}>
          E-mail<span className="text-primary">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          title="Enter a valid email, e.g. you@example.com"
          placeholder="Your email"
          className={FIELD}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={LABEL}>
          Message<span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          minLength={10}
          placeholder="Your message"
          className={`${FIELD} resize-y`}
        />
      </div>

      <SendButton status={status} />
    </form>
  )
}
