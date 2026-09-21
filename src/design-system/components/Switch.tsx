import type { ButtonHTMLAttributes } from "react"
import { cx } from "./cx"

export type SwitchProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange" | "role"
> & {
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export function Switch({
  checked = false,
  onChange,
  disabled,
  className,
  ...rest
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cx(
        "inline-flex h-20 w-32 shrink-0 items-center rounded-full p-3",
        "focus-visible:shadow-misc-focus outline-none",
        checked ? "justify-end bg-bg-switch-active" : "justify-start bg-bg-switch-default",
        checked
          ? "hover:bg-bg-switch-active-hover"
          : "hover:bg-bg-switch-default-hover",
        disabled &&
          (checked
            ? "bg-bg-switch-active-disabled hover:bg-bg-switch-active-disabled"
            : "bg-bg-switch-disabled hover:bg-bg-switch-disabled"),
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
      {...rest}
    >
      <span
        aria-hidden
        className={cx(
          "bg-bg-switch-handle shadow-switch-handle size-14 rounded-full",
          disabled && "bg-bg-switch-handle-disabled",
        )}
      />
    </button>
  )
}
