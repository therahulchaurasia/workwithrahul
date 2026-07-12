import { NextResponse } from "next/server"
import { Resend } from "resend"
import { SITE } from "@/lib/site"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { name, email, message } = await request
    .json()
    .catch(() => ({}) as Record<string, unknown>)

  // Server-side mirror of the form's constraints — the client check is UX,
  // this one is the actual gate.
  if (
    typeof name !== "string" ||
    name.trim().length < 2 ||
    typeof email !== "string" ||
    !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ||
    typeof message !== "string" ||
    message.trim().length < 10
  ) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: "Portfolio <hi@workwithrahul.com>",
    to: SITE.email,
    replyTo: email,
    subject: `New inquiry from ${name.trim()}`,
    text: `${message.trim()}\n\n— ${name.trim()} <${email}>`,
  })

  if (error) {
    console.error("resend:", error)
    return NextResponse.json({ error: "Send failed" }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
