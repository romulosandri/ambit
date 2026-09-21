import type { ReactNode } from "react"
import { cx } from "./cx"

/** Position the card so a `CardLink` overlay can cover it. */
export const cardLinkRootClassName = "relative isolate"

/** Raise nested controls above the stretched card-link overlay. */
export const cardLinkControlClassName = "relative z-20"

export function CardLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      className={cx(
        "after:absolute after:inset-0 after:z-10 after:rounded-md after:content-['']",
        "focus-visible:after:shadow-misc-focus rounded-2xs outline-none",
      )}
    >
      {children}
    </a>
  )
}
