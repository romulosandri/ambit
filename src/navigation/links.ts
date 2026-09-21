import type { MouseEvent } from "react"

export function handleAppLinkClick(event: MouseEvent<HTMLElement>) {
  const target = (event.target as HTMLElement | null)?.closest("a")
  if (!target) return
  const href = target.getAttribute("href")
  if (!href?.startsWith("#/")) return
  event.preventDefault()
  window.location.hash = href
}
