import type { ReactNode } from "react"
import { Button } from "./Button"
import { Image } from "./Image"

export type SocialBrand = "apple" | "google" | "x" | "github"

export type SocialButtonProps = {
  brand: SocialBrand
  children?: ReactNode
  /** Brand mark asset. Third-party marks are never substituted with a UI glyph. */
  markSrc?: string
  size?: "lg" | "md"
  fullWidth?: boolean
  isLoading?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
}

const brandLabel: Record<SocialBrand, string> = {
  apple: "Sign in with Apple",
  google: "Sign in with Google",
  x: "Sign in with X",
  github: "Sign in with Github",
}

export function SocialButton({
  brand,
  children,
  markSrc,
  size = "lg",
  fullWidth = true,
  isLoading = false,
  disabled = false,
  onClick,
  className,
}: SocialButtonProps) {
  return (
    <Button
      size={size}
      style="secondary"
      fullWidth={fullWidth}
      isLoading={isLoading}
      disabled={disabled}
      onClick={onClick}
      className={className}
      leadIcon={undefined}
    >
      {markSrc ? (
        <Image src={markSrc} alt="" aria-hidden className="mr-2 size-16" />
      ) : null}
      {children ?? brandLabel[brand]}
    </Button>
  )
}
