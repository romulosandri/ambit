import {
  type ReactNode,
  type RefCallback,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"
import { Button } from "@ds"
import { cx } from "@ds/components/cx"

export type ScrollEdges = {
  atStart: boolean
  atEnd: boolean
  overflow: boolean
}

export type RailControls = ScrollEdges & {
  trackRef: RefCallback<HTMLDivElement>
  scrollPrev: () => void
  scrollNext: () => void
}

function measureEdges(el: HTMLElement): ScrollEdges {
  const max = el.scrollWidth - el.clientWidth
  const overflow = max > 1
  return {
    overflow,
    atStart: !overflow || el.scrollLeft <= 1,
    atEnd: !overflow || el.scrollLeft >= max - 1,
  }
}

export function useRail(): RailControls {
  const nodeRef = useRef<HTMLDivElement | null>(null)
  const [node, setNode] = useState<HTMLDivElement | null>(null)
  const [edges, setEdges] = useState<ScrollEdges>({
    atStart: true,
    atEnd: true,
    overflow: false,
  })

  const trackRef = useCallback<RefCallback<HTMLDivElement>>((el) => {
    nodeRef.current = el
    setNode(el)
  }, [])

  useLayoutEffect(() => {
    if (!node) {
      setEdges({ atStart: true, atEnd: true, overflow: false })
      return
    }

    const update = () => setEdges(measureEdges(node))
    update()
    node.addEventListener("scroll", update, { passive: true })
    node.addEventListener("load", update, true)
    const observer = new ResizeObserver(update)
    observer.observe(node)
    const mutations = new MutationObserver(update)
    mutations.observe(node, { childList: true, subtree: true })
    return () => {
      node.removeEventListener("scroll", update)
      node.removeEventListener("load", update, true)
      observer.disconnect()
      mutations.disconnect()
    }
  }, [node])

  const scrollByPage = useCallback((direction: -1 | 1) => {
    const track = nodeRef.current
    if (!track) return
    const delta = Math.max(120, Math.round(track.clientWidth * 0.75))
    track.scrollBy({ left: direction * delta, behavior: "smooth" })
  }, [])

  const scrollPrev = useCallback(() => scrollByPage(-1), [scrollByPage])
  const scrollNext = useCallback(() => scrollByPage(1), [scrollByPage])

  return {
    trackRef,
    ...edges,
    scrollPrev,
    scrollNext,
  }
}

function EdgeScrims({
  from,
  atStart,
  atEnd,
}: {
  from: "subtle" | "card"
  atStart: boolean
  atEnd: boolean
}) {
  const tone = from === "card" ? "from-bg-card" : "from-bg-subtle"
  return (
    <>
      <div
        aria-hidden
        className={cx(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-64 bg-gradient-to-r to-transparent transition-opacity",
          tone,
          atStart && "opacity-0",
        )}
      />
      <div
        aria-hidden
        className={cx(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-64 bg-gradient-to-l to-transparent transition-opacity",
          tone,
          atEnd && "opacity-0",
        )}
      />
    </>
  )
}

export function RailArrows({
  rail,
  prevLabel,
  nextLabel,
}: {
  rail: RailControls
  prevLabel: string
  nextLabel: string
}) {
  return (
    <>
      <Button
        iconOnly
        size="sm"
        style="ghost"
        leadIcon={CaretLeft}
        aria-label={prevLabel}
        disabled={rail.atStart}
        onClick={rail.scrollPrev}
      />
      <Button
        iconOnly
        size="sm"
        style="ghost"
        leadIcon={CaretRight}
        aria-label={nextLabel}
        disabled={rail.atEnd}
        onClick={rail.scrollNext}
      />
    </>
  )
}

export function ScrimFrame({
  children,
  rail,
  scrim = "subtle",
  className,
}: {
  children: ReactNode
  rail: RailControls
  scrim?: "subtle" | "card"
  className?: string
}) {
  return (
    <div className={cx("relative min-w-0", className)}>
      {children}
      <EdgeScrims from={scrim} atStart={rail.atStart} atEnd={rail.atEnd} />
    </div>
  )
}

export type CardRailProps = {
  children: ReactNode
  /** Perspectives use 12px; every other rail uses 4px. */
  gap?: 4 | 12
  className?: string
  /** Match the surface the rail sits on so the fade only reads over cards. */
  scrim?: "subtle" | "card"
  /** Pull the rail to the card edges when nested in a padded panel. */
  bleed?: boolean
  rail?: RailControls
}

/**
 * Horizontal rail with edge fades. The scrims match Figma, where `left-scrim`
 * is hidden at the start of every instance and reappears once scrolled.
 */
export function CardRail({
  children,
  gap = 4,
  className,
  scrim = "subtle",
  bleed = false,
  rail,
}: CardRailProps) {
  const internal = useRail()
  const active = rail ?? internal

  return (
    <div className={cx("relative", bleed && "-mx-8", className)}>
      <div
        ref={active.trackRef}
        className={cx(
          "flex overflow-x-auto scrollbar-none [&>*]:shrink-0 [&::-webkit-scrollbar]:hidden",
          gap === 12 ? "gap-12" : "gap-4",
          bleed && "px-8",
        )}
      >
        {children}
      </div>
      <EdgeScrims
        from={scrim}
        atStart={active.atStart}
        atEnd={active.atEnd}
      />
    </div>
  )
}
