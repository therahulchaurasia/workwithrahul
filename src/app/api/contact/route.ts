import { NextResponse } from "next/server"
import { Resend } from "resend"
import { SITE } from "@/lib/site"

// Upper bounds on each field — the minimums live in the validation block
// below. Caps stop a single request from mailing megabytes or stuffing the
// subject line. 254 is the RFC max for an email address.
const MAX = { name: 100, email: 254, message: 5000 } as const

// Per-IP rate limit. In-memory, so it's per serverless instance rather than
// global — good enough to blunt a script hammering the form without standing
// up Redis. Swap for Upstash Ratelimit if this ever needs to be authoritative.
const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_HITS = 5 // submissions per IP per window
const hits = new Map<string, { count: number; resetAt: number }>()

function rateLimited(ip: string, now: number): boolean {
  // Opportunistic prune so the map can't grow without bound.
  for (const [key, entry] of hits) {
    if (entry.resetAt <= now) hits.delete(key)
  }

  const entry = hits.get(ip)
  if (!entry || entry.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > MAX_HITS
}

export async function POST(request: Request) {
  const now = Date.now()
  // Vercel puts the client IP first in x-forwarded-for. Fall back to a single
  // bucket when it's absent (local dev) rather than skipping the limit.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (rateLimited(ip, now)) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 },
    )
  }

  const { name, email, message, company } = await request
    .json()
    .catch(() => ({}) as Record<string, unknown>)

  // Honeypot: the hidden "company" field is invisible to humans, so any value
  // means a bot. Return a fake success so it doesn't learn it was caught, and
  // never send the mail.
  if (typeof company === "string" && company.trim() !== "") {
    return NextResponse.json({ ok: true })
  }

  // Server-side mirror of the form's constraints — the client check is UX,
  // this one is the actual gate. Enforces both min (real content) and max
  // (no oversized payloads) on every field.
  if (
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.trim().length > MAX.name ||
    typeof email !== "string" ||
    email.length > MAX.email ||
    !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ||
    typeof message !== "string" ||
    message.trim().length < 10 ||
    message.trim().length > MAX.message
  ) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 })
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("resend: RESEND_API_KEY is not set in this environment")
    return NextResponse.json({ error: "Send failed" }, { status: 502 })
  }

  // Strip control chars (incl. CR/LF) from the name before it goes into the
  // subject — a header line can't be split by user input.
  const cleanName = name.trim().replace(/[\x00-\x1f\x7f]/g, "")

  // Constructed per-request so the module can load without the secret —
  // `next build` evaluates route modules, and build environments have no key.
  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: "Portfolio <hi@workwithrahul.com>",
    to: SITE.email,
    replyTo: email,
    subject: `New inquiry from ${cleanName}`,
    text: `${message.trim()}\n\n— ${cleanName} <${email}>`,
  })

  if (error) {
    console.error("resend:", error)
    return NextResponse.json({ error: "Send failed" }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
