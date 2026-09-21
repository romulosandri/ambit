import { Check } from "@phosphor-icons/react"
import { flowerCovers } from "../assets"
import { cx } from "./cx"
import { Image } from "./Image"

export type BackgroundPickerProps = {
  value?: number
  onChange?: (index: number) => void
  className?: string
}

export function BackgroundPicker({
  value = 0,
  onChange,
  className,
}: BackgroundPickerProps) {
  return (
    <div className={cx("flex w-full flex-col gap-8", className)} role="radiogroup" aria-label="Background">
      <span className="text-heading-subsection text-text-default">Background</span>
      <div className="grid grid-cols-6 gap-8 max-md:grid-cols-4">
        {flowerCovers.map((src, index) => {
          const selected = index === value
          return (
            <button
              key={src}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`Background ${index + 1}`}
              onClick={() => onChange?.(index)}
              className={cx(
                "relative flex h-72 min-w-0 flex-col items-center justify-center overflow-hidden rounded-md",
                selected ? "bg-bg-state-primary p-2" : "p-0",
                "focus-visible:shadow-misc-focus outline-none",
              )}
            >
              <span
                className={cx(
                  "relative min-h-0 w-full flex-1 overflow-hidden",
                  selected
                    ? "border-border-white rounded-sm border"
                    : "rounded-md",
                )}
              >
                <Image
                  src={src}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                />
              </span>
              {selected ? (
                <span className="bg-bg-state-primary border-border-white absolute right-4 bottom-4 flex size-18 items-center justify-center overflow-hidden rounded-full border">
                  <Check size={10} weight="bold" className="text-icon-white-default" />
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
