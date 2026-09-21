import { cx } from "./cx"

export type AudioWaveBar = "lg" | "md" | "sm" | "xs" | "xxs"

export type AudioWaveProps = {
  bars?: AudioWaveBar[]
  /** Fraction of bars rendered as played. Default matches the reference: 8 of 14. */
  progress?: number
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

export function AudioWave({
  bars = referenceBars,
  progress = 8 / 14,
  className,
}: AudioWaveProps) {
  const playedCount = Math.round(bars.length * progress)

  return (
    <span
      aria-hidden
      className={cx("inline-flex items-center gap-2", className)}
    >
      {bars.map((bar, index) => (
        <span
          key={`${bar}-${index}`}
          className={cx(
            "w-2 rounded-2xs",
            barHeight[bar],
            index < playedCount ? "bg-icon-default" : "bg-icon-default-muted",
          )}
        />
      ))}
    </span>
  )
}
