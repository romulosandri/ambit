import { cx } from "./cx"

export type DividerProps = {
  style?: "dashed" | "solid"
  orientation?: "horizontal" | "vertical"
  /** Text-center variant — the "or" rule on auth cards. */
  label?: string
  className?: string
}

function ruleClass(style: NonNullable<DividerProps["style"]>) {
  return cx(
    "border-border-default h-0 w-full border-0 border-t",
    style === "dashed" ? "border-dashed" : "border-solid",
  )
}

export function Divider({
  style = "dashed",
  orientation = "horizontal",
  label,
  className,
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cx(
          "border-border-default h-full w-0 border-0 border-l",
          style === "dashed" ? "border-dashed" : "border-solid",
          className,
        )}
      />
    )
  }

  if (label) {
    return (
      <div
        role="separator"
        className={cx("flex w-full items-center gap-8", className)}
      >
        <hr className={ruleClass(style)} />
        <span className="text-heading-subsection text-text-muted shrink-0">
          {label}
        </span>
        <hr className={ruleClass(style)} />
      </div>
    )
  }

  return <hr className={cx(ruleClass(style), className)} />
}
