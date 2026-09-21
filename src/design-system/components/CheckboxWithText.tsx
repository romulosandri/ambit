import type { ReactNode } from "react"
import { Checkbox } from "./Checkbox"
import { cx } from "./cx"

export type CheckboxWithTextProps = {
  title: ReactNode
  description?: string
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  checkboxPosition?: "left" | "right"
  disabled?: boolean
  className?: string
}

export function CheckboxWithText({
  title,
  description,
  checked,
  defaultChecked,
  onChange,
  checkboxPosition = "left",
  disabled = false,
  className,
}: CheckboxWithTextProps) {
  return (
    <label
      className={cx(
        "flex w-full gap-10",
        // A description makes the label two lines, so the box pins to the top.
        description ? "items-start" : "items-center",
        checkboxPosition === "right" && "flex-row-reverse",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      <span className="flex size-20 shrink-0 items-center justify-center">
        <Checkbox
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
        />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-4">
        <span
          className={cx(
            "text-heading-subsection",
            disabled ? "text-text-hint" : "text-text-default",
          )}
        >
          {title}
        </span>
        {description ? (
          <span
            className={cx(
              "text-body-default",
              disabled ? "text-text-hint" : "text-text-subtle",
            )}
          >
            {description}
          </span>
        ) : null}
      </span>
    </label>
  )
}
