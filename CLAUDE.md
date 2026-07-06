# Portfolio / Landing Page

## Goal
Personal portfolio + landing page. Primary purpose: **land clients**. Tone must be
**professional** (credible, trustworthy for prospects) but **creative** enough to
stand out and demonstrate design/dev skill. Balance polish with personality.

## Stack
- Next.js 16 (App Router, `src/app`)
- React 19 (React Compiler enabled — no manual memoization needed)
- TypeScript
- Tailwind CSS v4
- Lenis (smooth scroll)
- Fonts: Geist Sans + Geist Mono

## Conventions
- Path alias: `@/*` → `./src/*`
- Client components: mark with `"use client"`, keep in `src/components/`
- `layout.tsx` is a server component; wrap client-only providers in dedicated
  client components (see `LenisProvider`).

## Smooth Scroll
- `src/components/lenis-provider.tsx` — `LenisProvider`, a client provider that
  wraps the app in `ReactLenis root` with `lerp: 0.08`.
- Mounted globally in `src/app/layout.tsx` around `{children}`.
- Lenis CSS imported in layout via `lenis/dist/lenis.css`.

## Status
Early setup. Default create-next-app page still in `src/app/page.tsx` — to be
replaced with real portfolio content.
