import { ambitLogo } from "../assets"
import { cx } from "./cx"

export type LogoProps = {
  /** Overrides the bundled wordmark. */
  src?: string
  className?: string
}

/** The Ambit wordmark, 85 × 18 in the Figma sidebar (`15151:20712`). */
export function Logo({ src = ambitLogo, className }: LogoProps) {
  return (
    <img
      src={src}
      alt="Ambit"
      className={cx("h-18 w-auto shrink-0 object-contain", className)}
    />
  )
}
