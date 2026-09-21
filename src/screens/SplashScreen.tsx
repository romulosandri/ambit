import { useRef } from "react"
import { ambitMark } from "@ds"
import { gsap, prefersReducedMotion, useGSAP } from "@/motion"

const WORD = "Ambit"

export function SplashScreen({
  onReveal,
  onComplete,
}: {
  onReveal: () => void
  onComplete: () => void
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const onRevealRef = useRef(onReveal)
  const onCompleteRef = useRef(onComplete)
  onRevealRef.current = onReveal
  onCompleteRef.current = onComplete

  useGSAP(
    (_, contextSafe) => {
      const root = rootRef.current
      if (!root || !contextSafe) return

      const items = gsap.utils.toArray<HTMLElement>("[data-splash-item]", root)
      const finish = contextSafe(() => {
        onCompleteRef.current()
      })
      const reveal = contextSafe(() => {
        onRevealRef.current()
      })

      if (prefersReducedMotion()) {
        reveal()
        gsap.to(root, { autoAlpha: 0, duration: 0.2, onComplete: finish })
        return
      }

      gsap.set(items, { yPercent: 110 })

      let started = false
      const play = contextSafe(() => {
        if (started) return
        started = true
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
        tl.to(items, {
          yPercent: 0,
          duration: 0.55,
          stagger: 0.08,
        })
        tl.call(reveal, undefined, "+=0.4")
        tl.to(root, {
          yPercent: -100,
          duration: 0.7,
          ease: "power3.inOut",
          onStart: () => {
            root.style.pointerEvents = "none"
          },
          onComplete: finish,
        })
      })

      const fonts = document.fonts
      if (!fonts) {
        play()
        return
      }

      const timeout = window.setTimeout(play, 800)
      void fonts.ready.then(play)
      return () => window.clearTimeout(timeout)
    },
    { scope: rootRef },
  )

  return (
    <div
      ref={rootRef}
      className="bg-bg-state-brand absolute inset-0 z-50 flex items-center justify-center overflow-hidden"
      role="img"
      aria-label="Ambit"
    >
      <div className="text-mojo-950 font-headline flex items-center gap-[0.1em] text-[clamp(64px,18vw,128px)] leading-none tracking-[-0.06em]">
        <div className="h-[0.72em] w-[0.72em] shrink-0 overflow-hidden">
          <img
            src={ambitMark}
            alt=""
            width={93}
            height={92}
            data-splash-item
            className="block h-[0.72em] w-[0.72em]"
          />
        </div>
        <p aria-hidden className="whitespace-nowrap">
          {WORD.split("").map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="inline-block overflow-hidden"
            >
              <span data-splash-item className="inline-block">
                {letter}
              </span>
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
