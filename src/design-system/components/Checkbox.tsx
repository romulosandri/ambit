import { Check, Minus } from "@phosphor-icons/react"
import {
  useLayoutEffect,
  useRef,
  type InputHTMLAttributes,
} from "react"
import { motion } from "motion/react"
import { microTransition } from "@/motion/config"
import { cx } from "./cx"

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> & {
  onChange?: (checked: boolean) => void
  /** Mixed selection: dash glyph, filled box, `aria-checked="mixed"`. */
  indeterminate?: boolean
}

export function Checkbox({
  checked,
  defaultChecked,
  onChange,
  disabled,
  className,
  indeterminate = false,
  ...rest
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const filled = checked === true || indeterminate
  const Glyph = indeterminate ? Minus : Check

  useLayoutEffect(() => {
    const input = inputRef.current
    if (!input) return
    input.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <span className={cx("relative inline-flex size-16 shrink-0", className)}>
      <input
        {...rest}
        ref={inputRef}
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        aria-checked={indeterminate ? "mixed" : undefined}
        onChange={(event) => onChange?.(event.currentTarget.checked)}
        className="peer absolute inset-0 z-1 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
      />
      <span
        aria-hidden
        className={cx(
          "pointer-events-none inline-flex size-16 items-center justify-center overflow-hidden rounded-2xs",
          "bg-bg-checkbox-default border-border-darker border",
          "shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)]",
          "peer-hover:border-border-strong",
          "peer-checked:bg-bg-checkbox-active peer-checked:border-transparent",
          "peer-checked:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.25)]",
          "[input:checked:hover~&]:bg-bg-checkbox-active-hover",
          filled &&
            "bg-bg-checkbox-active border-transparent shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.25)] peer-hover:border-transparent peer-hover:bg-bg-checkbox-active-hover",
          "peer-focus-visible:shadow-misc-focus",
          "peer-disabled:bg-bg-checkbox-disabled peer-disabled:border-border-default",
          checked === undefined &&
            !indeterminate &&
            "[&>svg]:hidden peer-checked:[&>svg]:block",
          "peer-disabled:text-icon-default-disabled text-icon-white-default",
        )}
      >
        {checked === undefined && !indeterminate ? (
          <Check size={14} weight="bold" />
        ) : (
          <motion.span
            initial={false}
            animate={
              filled ? { scale: 1, opacity: 1 } : { scale: 0.45, opacity: 0 }
            }
            transition={microTransition}
            className="inline-flex"
          >
            <Glyph size={14} weight="bold" />
          </motion.span>
        )}
      </span>
    </span>
  )
}
