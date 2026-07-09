"use client"

import { Accordion } from "@base-ui-components/react/accordion"
import { Plus } from "lucide-react"
import { Text } from "@/components/text"

type Faq = { q: string; a: string }

const FRONT_SHADOW =
  "rgba(0, 0, 0, 0.08) 0px 0.602187px 0.602187px -0.916667px, rgba(0, 0, 0, 0.08) 0px 2.28853px 2.28853px -1.83333px, rgba(0, 0, 0, 0.07) 0px 10px 10px -2.75px"

export default function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <Accordion.Root
      defaultValue={[0]}
      className="flex flex-col gap-1.75 rounded-[20px] bg-[#e5e5e5] p-1.75"
    >
      {items.map((item, i) => (
        <Accordion.Item
          key={item.q}
          value={i}
          className="relative rounded-2xl bg-background px-6 py-5 outline-1 outline-[#e2e2e2] [outline-offset:-3px]"
          style={{ boxShadow: FRONT_SHADOW }}
        >
          <Accordion.Header className="m-0">
            <Accordion.Trigger className="group/trigger flex w-full cursor-pointer items-center justify-between gap-4 text-left">
              <Text as="span" variant="subtitle-sm">
                {item.q}
              </Text>
              <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-black/5">
                <Plus className="size-4 [&_path]:origin-center [&_path]:[transform-box:fill-box] [&_path]:transition-transform [&_path]:duration-300 group-data-panel-open/trigger:[&_path:last-child]:scale-y-0" />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Panel className="group/panel h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ease-out data-ending-style:h-0 data-starting-style:h-0">
            <div className="overflow-hidden">
              <div className="pt-4 transition-[translate,opacity] duration-300 ease-out group-data-starting-style/panel:translate-y-2 group-data-starting-style/panel:opacity-0 group-data-ending-style/panel:translate-y-2 group-data-ending-style/panel:opacity-0 motion-reduce:transition-none">
                <Text muted>{item.a}</Text>
              </div>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
