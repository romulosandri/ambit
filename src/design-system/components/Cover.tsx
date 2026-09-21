import { cx } from "./cx"

export type CoverSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"

export type CoverProps = {
  src?: string
  alt?: string
  size?: CoverSize
  /** White chip overlaid on the artwork, e.g. a topic or a date. */
  caption?: string
  /** Label above the chip. Present on brief covers ("September"), which pins
   *  the overline to the top and the chip to the bottom. */
  overline?: string
  /** Article thumbnails use `radius-sm`; topic/brief headers use `full`. */
  radius?: "md" | "sm" | "full"
  className?: string
}

const sizeClass: Record<CoverSize, string> = {
  xs: "size-28",
  sm: "size-40",
  md: "size-116",
  lg: "size-164",
  xl: "size-180",
  "2xl": "size-244",
  full: "aspect-square w-full",
}

const radiusClass: Record<NonNullable<CoverProps["radius"]>, string> = {
  md: "rounded-md",
  sm: "rounded-sm",
  full: "rounded-full",
}

export function Cover({
  src,
  alt = "",
  size = "full",
  caption,
  overline,
  radius = "md",
  className,
}: CoverProps) {
  const stacked = overline !== undefined

  return (
    <div
      className={cx(
        "bg-bg-basic-gray-subtle shadow-card relative flex shrink-0 flex-col overflow-hidden p-12",
        radiusClass[radius],
        stacked
          ? "items-start justify-between"
          : "items-center justify-center",
        sizeClass[size],
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 size-full object-cover"
        />
      ) : null}
      {overline ? (
        <span className="text-body-large text-text-default relative">
          {overline}
        </span>
      ) : null}
      {caption ? (
        <span className="bg-bg-inverted text-text-inverted-default text-body-large relative flex items-center justify-center px-4 py-2 whitespace-nowrap">
          {caption}
        </span>
      ) : null}
    </div>
  )
}
