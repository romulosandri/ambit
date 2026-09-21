import { cx } from "./cx"
import { Image } from "./Image"

export type AvatarSize = "xs" | "md"

export type AvatarProps = {
  src?: string
  /** Used for `alt` and to derive the initials fallback. Empty means decorative. */
  name?: string
  size?: AvatarSize
  className?: string
}

const sizeClass: Record<AvatarSize, string> = {
  xs: "size-20",
  md: "size-56",
}

const initialsClass: Record<AvatarSize, string> = {
  xs: "text-body-small",
  md: "text-body-default",
}

function initialsOf(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function Avatar({ src, name = "", size = "xs", className }: AvatarProps) {
  return (
    <span
      className={cx(
        "bg-bg-basic-gray-subtle border-border-default text-text-subtle inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border",
        sizeClass[size],
        className,
      )}
    >
      {src ? (
        <Image src={src} alt={name} className="size-full object-cover" />
      ) : (
        <span className={initialsClass[size]}>{initialsOf(name)}</span>
      )}
    </span>
  )
}
