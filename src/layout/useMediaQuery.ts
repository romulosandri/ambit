import { useEffect, useState } from "react"

/** Subscribes to a CSS media query. Safe to call during SSR — starts `false`. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const media = window.matchMedia(query)
    function update() {
      setMatches(media.matches)
    }
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [query])

  return matches
}

/** Tablet and phone: the persistent 280px sidebar no longer fits. */
export const COMPACT_NAV_QUERY = "(max-width: 1023px)"
