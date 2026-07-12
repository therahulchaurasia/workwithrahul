import { Text } from "@/components/text"
import Eyebrow from "@/components/eyebrow"

export default function SectionHeading({
  title,
  subtext,
  eyebrow,
}: {
  title: string
  subtext: string
  eyebrow?: string
}) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
      <div className="flex flex-col gap-[5px]">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Text variant="title">{title}</Text>
      </div>
      <Text muted className="max-w-xs">
        {subtext}
      </Text>
    </div>
  )
}
