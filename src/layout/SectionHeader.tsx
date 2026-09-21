import type { ReactNode } from "react"
import { cx } from "@ds/components/cx"

export type SectionHeaderProps = {
  children: ReactNode
  /** Sits beside the label — the home rails put a `DropdownButton` here. */
  trailing?: ReactNode
  /** Right-aligned cluster, usually the rail's prev/next buttons. */
  actions?: ReactNode
  id?: string
  className?: string
}

export function SectionHeader({
  children,
  trailing,
  actions,
  id,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cx(
        "bg-bg-state-ghost flex items-center gap-4 rounded-sm px-8 py-4",
        className,
      )}
    >
      <div className="flex items-center gap-6 px-2">
        <span id={id} className="text-body-default text-text-subtle">
          {children}
        </span>
        {trailing}
      </div>
      {actions ? (
        <div className="ml-auto flex items-center gap-4">{actions}</div>
      ) : null}
    </div>
  )
}
