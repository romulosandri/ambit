import { Pause, Play } from "@phosphor-icons/react"
import { useEffect, useRef, useState, type MouseEvent } from "react"
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

/** Playground fill — long enough to read as playback, short enough to watch. */
const demoDurationSeconds = 8

function stopCardNavigation(event: MouseEvent<HTMLButtonElement>) {
  event.preventDefault()
  event.stopPropagation()
}

export function AudioButton({
  duration,
  playing: initialPlaying = false,
  progress: initialProgress = 0,
  disabled = false,
  onPlayPause,
  className,
}: AudioButtonProps) {
  const [playing, setPlaying] = useState(initialPlaying)
  const [progress, setProgress] = useState(initialProgress)
  const progressRef = useRef(initialProgress)

  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  useEffect(() => {
    if (!playing || disabled) return

    let frame = 0
    let last = performance.now()

    const tick = (now: number) => {
      const next = Math.min(
        1,
        progressRef.current + (now - last) / 1000 / demoDurationSeconds,
      )
      last = now
      progressRef.current = next
      setProgress(next)
      if (next >= 1) {
        setPlaying(false)
        return
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [disabled, playing])

  function handlePlayPause(event: MouseEvent<HTMLButtonElement>) {
    stopCardNavigation(event)
    if (disabled) return
    onPlayPause?.()
    setPlaying((current) => {
      if (current) return false
      if (progressRef.current >= 0.995) {
        progressRef.current = 0
        setProgress(0)
      }
      return true
    })
  }

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
        aria-pressed={playing}
        disabled={disabled}
        onClick={handlePlayPause}
        onMouseDown={stopCardNavigation}
        onPointerDown={stopCardNavigation}
      />
      <span className="flex items-center gap-4">
        <AudioWave
          playing={playing && !disabled}
          progress={disabled ? 0 : progress}
        />
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
