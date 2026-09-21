import { useRef } from "react"
import { gsap, prefersReducedMotion, useGSAP } from "@/motion"
import { cx } from "./cx"

export type AudioWaveBar = "lg" | "md" | "sm" | "xs" | "xxs"

export type AudioWaveProps = {
  bars?: AudioWaveBar[]
  /** Fraction of the wave rendered as played. Default matches the reference: 8 of 14. */
  progress?: number
  /** Equalizer bounce on the filled bars. */
  playing?: boolean
  className?: string
}

const barHeight: Record<AudioWaveBar, string> = {
  lg: "h-18",
  md: "h-12",
  sm: "h-8",
  xs: "h-4",
  xxs: "h-2",
}

/** The 14-bar pattern from the reference `audio-wave` frame (54px wide). */
const referenceBars: AudioWaveBar[] = [
  "lg",
  "md",
  "md",
  "sm",
  "lg",
  "lg",
  "xs",
  "md",
  "md",
  "xs",
  "md",
  "lg",
  "xs",
  "xxs",
]

function BarRow({
  bars,
  tone,
}: {
  bars: AudioWaveBar[]
  tone: "muted" | "played"
}) {
  return (
    <span className="inline-flex min-w-max items-center gap-2">
      {bars.map((bar, index) => (
        <span
          key={`${bar}-${index}`}
          data-wave-bar={tone === "played" ? "" : undefined}
          className={cx(
            "w-2 shrink-0 origin-bottom rounded-2xs",
            barHeight[bar],
            tone === "played" ? "bg-icon-default" : "bg-icon-default-muted",
          )}
        />
      ))}
    </span>
  )
}

export function AudioWave({
  bars = referenceBars,
  progress = 8 / 14,
  playing = false,
  className,
}: AudioWaveProps) {
  const rootRef = useRef<HTMLSpanElement>(null)
  const fill = Math.min(1, Math.max(0, progress))

  useGSAP(
    () => {
      const targets = rootRef.current?.querySelectorAll("[data-wave-bar]")
      if (!targets?.length) return

      gsap.killTweensOf(targets)
      gsap.set(targets, { scaleY: 1, transformOrigin: "center bottom" })

      if (!playing || prefersReducedMotion()) return

      gsap.to(targets, {
        scaleY: (index) => 0.35 + ((index * 17) % 10) / 14,
        duration: 0.32,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.05,
          from: "center",
        },
      })
    },
    { scope: rootRef, dependencies: [playing, bars], revertOnUpdate: true },
  )

  return (
    <span
      ref={rootRef}
      aria-hidden
      className={cx("relative inline-flex items-center", className)}
    >
      <BarRow bars={bars} tone="muted" />
      <span
        data-audio-fill=""
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${fill * 100}%` }}
      >
        <BarRow bars={bars} tone="played" />
      </span>
    </span>
  )
}
