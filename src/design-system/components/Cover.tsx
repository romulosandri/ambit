import { useRef } from "react"
import { gsap, prefersReducedMotion, useGSAP } from "@/motion"
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
  /** Slow random zoom and pan, so the artwork feels like it is drifting. */
  kenBurns?: boolean
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

function CoverImage({
  src,
  alt,
  kenBurns,
}: {
  src: string
  alt: string
  kenBurns: boolean
}) {
  const imageRef = useRef<HTMLImageElement>(null)

  useGSAP(
    (_, contextSafe) => {
      const image = imageRef.current
      if (!image || !kenBurns || prefersReducedMotion()) return

      const drift = contextSafe(() => {
        gsap.to(image, {
          scale: gsap.utils.random(1.22, 1.55),
          xPercent: gsap.utils.random(-12, 12),
          yPercent: gsap.utils.random(-16, 8),
          duration: gsap.utils.random(16, 24),
          ease: "sine.inOut",
          overwrite: "auto",
          onComplete: drift,
        })
      })

      gsap.set(image, {
        scale: 1.28,
        xPercent: gsap.utils.random(-6, 6),
        yPercent: gsap.utils.random(-10, 2),
        transformOrigin: "50% 38%",
      })
      drift()
    },
    { dependencies: [kenBurns, src] },
  )

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      className={cx(
        "absolute inset-0 size-full object-cover",
        kenBurns && "origin-[50%_38%] scale-125",
      )}
    />
  )
}

export function Cover({
  src,
  alt = "",
  size = "full",
  caption,
  overline,
  radius = "md",
  kenBurns = false,
  className,
}: CoverProps) {
  const stacked = overline !== undefined

  return (
    <div
      className={cx(
        "bg-bg-basic-gray-subtle shadow-card relative flex min-w-0 shrink-0 flex-col overflow-hidden p-12",
        radiusClass[radius],
        stacked
          ? "items-start justify-between"
          : "items-center justify-center",
        sizeClass[size],
        className,
      )}
    >
      {src ? (
        kenBurns ? (
          <CoverImage src={src} alt={alt} kenBurns />
        ) : (
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 size-full object-cover"
          />
        )
      ) : null}
      {overline ? (
        <span className="text-body-large text-text-default relative">
          {overline}
        </span>
      ) : null}
      {caption ? (
        <span className="bg-bg-inverted text-text-inverted-default text-body-large relative min-w-0 max-w-full px-4 py-2 text-center wrap-break-word">
          {caption}
        </span>
      ) : null}
    </div>
  )
}
