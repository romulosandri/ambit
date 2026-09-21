import { type ReactNode, useId } from "react"
import { AnimatePresence } from "motion/react"
import { cx } from "@ds/components/cx"
import { SectionHeader } from "./SectionHeader"

export type ArticleSectionProps = {
  /** The date grouping — "Today", "Yesterday", "Mon, 14 Sep". */
  label: string
  children: ReactNode
  className?: string
}

export function ArticleSection({
  label,
  children,
  className,
}: ArticleSectionProps) {
  const labelId = useId()

  return (
    <section
      aria-labelledby={labelId}
      className={cx("flex flex-col gap-12", className)}
    >
      <SectionHeader id={labelId}>{label}</SectionHeader>
      <div className="flex flex-col gap-20">
        <AnimatePresence mode="popLayout" initial={false}>
          {children}
        </AnimatePresence>
      </div>
    </section>
  )
}
