import type { ReactNode } from "react"
import { cx } from "@ds/components/cx"

export type PageHeaderProps = {
  title: string
  /** Rendered before the title — the home screens put an Avatar here. */
  lead?: ReactNode
  /** Source details stacks the avatar above the title. */
  leadLayout?: "inline" | "stack"
  /** Sits beside the title — daily-brief-details puts a FilterButton here. */
  titleActions?: ReactNode
  /** A `ToolBar`. */
  toolbar?: ReactNode
  className?: string
}

export function PageHeader({
  title,
  lead,
  leadLayout = "inline",
  titleActions,
  toolbar,
  className,
}: PageHeaderProps) {
  const stacked = leadLayout === "stack"

  return (
    <header className={cx("flex flex-col gap-24 p-8 max-md:gap-16", className)}>
      <div
        className={cx(
          "flex min-w-0",
          stacked ? "flex-col items-start gap-16" : "items-center gap-8",
        )}
      >
        {lead}
        <div className="flex min-w-0 items-center gap-24 max-md:gap-12">
          {/* Page titles are display-small (30px headline), not heading-page. */}
          <h1 className="text-display-small text-text-default min-w-0">
            {title}
          </h1>
          {titleActions}
        </div>
      </div>
      {toolbar}
    </header>
  )
}

export type ToolBarProps = {
  children: ReactNode
  /** Right-aligned action cluster. */
  actions?: ReactNode
  className?: string
}

export function ToolBar({ children, actions, className }: ToolBarProps) {
  return (
    <div
      className={cx(
        "flex w-full min-w-0 flex-wrap items-center gap-20 max-md:gap-12",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center">
        {children}
      </div>
      {actions ? (
        <div className="ml-auto flex shrink-0 items-center gap-8">{actions}</div>
      ) : null}
    </div>
  )
}
