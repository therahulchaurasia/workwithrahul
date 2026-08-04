"use client"

import { useEffect, useState } from "react"
import type { ComponentType } from "react"
import { useBoop, type BoopIconProps } from "@/lib/use-boop"
import Waypoints from "@/components/icons/waypoints"
import PhoneCall from "@/components/icons/phone-call"
import Target from "@/components/icons/target"
import PencilRuler from "@/components/icons/pencil-ruler"
import Gauge from "@/components/icons/gauge"
import Sliders from "@/components/icons/sliders"

const ICONS: { name: string; icon: ComponentType<BoopIconProps> }[] = [
  { name: "waypoints", icon: Waypoints },
  { name: "phone-call", icon: PhoneCall },
  { name: "target", icon: Target },
  { name: "pencil-ruler", icon: PencilRuler },
  { name: "gauge", icon: Gauge },
  { name: "sliders", icon: Sliders },
]

// Ship size, matching the cards exactly. Nothing here degrades when scaled,
// it's all vector and the stroke is in viewBox units, but the *motion* scales
// with it: a 3-unit hop tuned to read as a hint at 24px reads as a shove at
// 112px. The animations were judged at this size, so this is the size that
// tells the truth about them.
//
// The frame is much wider than the icon on purpose. Several of these animate
// past the edge of their own viewBox, so the slack is what keeps the pencil's
// cap and the phone's arcs from being cut off mid-boop.
const ICON = "size-6"
const FRAME = "size-20"

function Tile({
  icon: Icon,
  signal,
}: {
  icon: ComponentType<BoopIconProps>
  /** Bumped by the parent to fire every tile at once. */
  signal: number
}) {
  const { booped, boop, onPointerEnter, onPointerLeave } = useBoop()

  useEffect(() => {
    if (signal > 0) boop()
  }, [signal, boop])

  return (
    <div
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={`flex ${FRAME} items-center justify-center`}
    >
      <Icon
        booped={booped}
        className={`${ICON} text-foreground`}
        strokeWidth={1.75}
      />
    </div>
  )
}

export default function IconGallery() {
  const [signal, setSignal] = useState(0)

  return (
    <div className="flex flex-col items-center gap-14">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {ICONS.map(({ name, icon }) => (
          <Tile key={name} icon={icon} signal={signal} />
        ))}
      </div>
      {/* Sits well below the icons, so firing all six doesn't put the cursor
          anywhere near the frame being recorded. */}
      <button
        type="button"
        onClick={() => setSignal((n) => n + 1)}
        className="rounded-full bg-foreground px-5 py-2.5 text-sm text-background transition-transform duration-200 ease-out hover:-translate-y-0.5"
      >
        Boop all
      </button>
    </div>
  )
}
