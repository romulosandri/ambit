import { useRef } from "react"
import { gsap, prefersReducedMotion, useGSAP } from "@/motion"
import { cx } from "./cx"
import { Image } from "./Image"

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
  /** Slow drift across the artwork. Pans the photo through the frame so a
   *  small circular crop still reads as moving. */
  kenBurns?: boolean
  /**
   * White inner rim from the home daily-brief cover. Painted on a layer above
   * the artwork — an inset shadow on the tile itself sits behind the image.
   */
  insetHighlight?: boolean
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

/** Figma album-cover on the home daily brief: white inner glow plus the card's bottom inset. */
const insetHighlightClass =
  "pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.64),inset_0px_-1px_0px_0px_rgba(0,0,0,0.1)]"

const sineInOut = gsap.parseEase("sine.inOut")

/** Curved timing that slows into a turn without coming to rest. */
function driftEase(progress: number) {
  return sineInOut(progress) * 0.62 + progress * 0.38
}

const zoom = 9

function randomStep(fromX: number, fromY: number) {
  let nextX = fromX
  let nextY = fromY
  for (let attempt = 0; attempt < 8; attempt++) {
    nextX = gsap.utils.random(0, 100)
    nextY = gsap.utils.random(0, 100)
    if (Math.hypot(nextX - fromX, nextY - fromY) >= 28) break
  }
  return [nextX, nextY] as const
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
      if (!image || !kenBurns || !contextSafe) return

      const setX = gsap.quickSetter(image, "x", "px")
      const setY = gsap.quickSetter(image, "y", "px")

      // object-cover plus a scale only slides the middle of a tall photo.
      // Size the bitmap to the zoom and translate it so every edge can enter the frame.
      const place = (px: number, py: number) => {
        const frame = image.parentElement
        if (!frame || !image.naturalWidth || frame.clientWidth === 0) return
        const width = frame.clientWidth * zoom
        const height = width * (image.naturalHeight / image.naturalWidth)
        image.style.width = `${width}px`
        image.style.height = `${height}px`
        const rangeX = Math.max(0, width - frame.clientWidth)
        const rangeY = Math.max(0, height - frame.clientHeight)
        setX(-(gsap.utils.clamp(0, 100, px) / 100) * rangeX)
        setY(-(gsap.utils.clamp(0, 100, py) / 100) * rangeY)
      }

      let x = 50
      let y = 42

      const drift = contextSafe(() => {
        const [nextX, nextY] = randomStep(x, y)
        const dx = nextX - x
        const dy = nextY - y
        const distance = Math.hypot(dx, dy) || 1
        const bend = gsap.utils.random(12, 20) * (Math.random() < 0.5 ? -1 : 1)
        const controlX = (x + nextX) / 2 + (-dy / distance) * bend
        const controlY = (y + nextY) / 2 + (dx / distance) * bend
        const fromX = x
        const fromY = y
        const progress = { t: 0 }
        x = nextX
        y = nextY

        gsap.to(progress, {
          t: 1,
          duration: distance / 18,
          ease: driftEase,
          overwrite: "auto",
          onUpdate: () => {
            const t = progress.t
            const u = 1 - t
            place(
              u * u * fromX + 2 * u * t * controlX + t * t * nextX,
              u * u * fromY + 2 * u * t * controlY + t * t * nextY,
            )
          },
          onComplete: drift,
        })
      })

      const begin = () => {
        place(x, y)
        if (prefersReducedMotion()) return
        drift()
      }

      if (image.complete && image.naturalWidth) {
        begin()
        return
      }

      const onLoad = contextSafe(begin)
      image.addEventListener("load", onLoad, { once: true })
      return () => image.removeEventListener("load", onLoad)
    },
    { dependencies: [kenBurns, src] },
  )

  return (
    <Image
      ref={imageRef}
      src={src}
      alt={alt}
      className="absolute top-0 left-0 max-w-none"
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
  insetHighlight = false,
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
          <Image
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
      {insetHighlight ? <div aria-hidden className={insetHighlightClass} /> : null}
    </div>
  )
}
