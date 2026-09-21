import { Pause, Play } from "@phosphor-icons/react"
import { AudioWave } from "./AudioWave"
import { Button } from "./Button"
import { cx } from "./cx"

export type AudioButtonProps = {
  duration: string
  playing?: boolean
  progress?: number
  disabled?: boolean
  onPlayPause?: () => void
  className?: string
}

const defaultProgress = 8 / 14

export function AudioButton({
  duration,
  playing = false,
  progress = defaultProgress,
  disabled = false,
  onPlayPause,
  className,
}: AudioButtonProps) {
  return (
    <div
      className={cx(
        "bg-bg-state-secondary hover:bg-bg-state-secondary-hover border-border-darker shadow-component",
        "inline-flex h-32 shrink-0 items-center justify-center gap-6 overflow-hidden rounded-sm border py-4 pr-8 pl-4",
        disabled && "bg-bg-state-disabled",
        className,
      )}
    >
      <Button
        iconOnly
        size="xs"
        style="soft"
        leadIcon={playing ? Pause : Play}
        aria-label={`${playing ? "Pause" : "Play"} — ${duration}`}
        disabled={disabled}
        onClick={onPlayPause}
      />
      <span className="flex items-center gap-4">
        <AudioWave progress={disabled ? 0 : progress} />
        <span
          className={cx(
            "text-heading-subsection px-2 whitespace-nowrap",
            disabled ? "text-text-hint" : "text-text-muted",
          )}
        >
          {duration}
        </span>
      </span>
    </div>
  )
}
