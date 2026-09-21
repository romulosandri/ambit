import type { InputHTMLAttributes } from "react"
import { motion } from "motion/react"
import { microTransition } from "@/motion/config"
import { cx } from "./cx"

export type RadioProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> & {
  onChange?: (checked: boolean) => void
}

export function Radio({
  checked,
  defaultChecked,
  onChange,
  disabled,
  className,
  ...rest
}: RadioProps) {
  return (
    <span className={cx("relative inline-flex size-16 shrink-0", className)}>
      <input
        type="radio"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.currentTarget.checked)}
        className="peer absolute inset-0 z-1 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        {...rest}
      />
      <span
        aria-hidden
        className={cx(
          "pointer-events-none inline-flex size-16 items-center justify-center overflow-hidden rounded-full",
          "bg-bg-checkbox-default border-border-darker border",
          "shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)]",
          "peer-hover:border-border-strong",
          "peer-checked:bg-bg-checkbox-active peer-checked:border-transparent",
          "peer-checked:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.25)]",
          "[input:checked:hover~&]:bg-bg-checkbox-active-hover",
          "peer-focus-visible:shadow-misc-focus",
          "peer-disabled:bg-bg-checkbox-disabled peer-disabled:border-border-default",
          checked === undefined && "[&>span]:hidden peer-checked:[&>span]:block",
        )}
      >
        {checked === undefined ? (
          <span className="bg-bg-switch-handle size-6 rounded-full" />
        ) : (
          <motion.span
            initial={false}
            animate={checked ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
            transition={microTransition}
            className="bg-bg-switch-handle size-6 rounded-full"
          />
        )}
      </span>
    </span>
  )
}
