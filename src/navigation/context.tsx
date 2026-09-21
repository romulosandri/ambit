import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react"
import { matchChatForPrompt } from "@/data"
import { parseHash, serializeRoute } from "./routes"
import type { AppRoute } from "./types"

type NavigationValue = {
  route: AppRoute
  navigate: (route: AppRoute) => void
  goBack: () => void
  openPrompt: (prompt: string) => void
  savedIds: Set<string>
  toggleSaved: (articleId: string) => void
}

const NavigationContext = createContext<NavigationValue | null>(null)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<AppRoute>(() => parseHash())
  const [savedIds, setSavedIds] = useState<Set<string>>(
    () =>
      new Set([
        "huang-zero-percent",
        "openai-article-55",
        "newton-slowdown-week",
        "willison-wiki-agents",
        "apple-dma-delays",
      ]),
  )

  useEffect(() => {
    function sync() {
      setRoute(parseHash())
    }
    window.addEventListener("hashchange", sync)
    if (!window.location.hash) {
      window.location.hash = serializeRoute({ name: "auth" })
    }
    return () => window.removeEventListener("hashchange", sync)
  }, [])

  const navigate = useCallback((next: AppRoute) => {
    const hash = serializeRoute(next)
    if (window.location.hash === hash) {
      setRoute(next)
      return
    }
    window.location.hash = hash
  }, [])

  const goBack = useCallback(() => {
    if (window.history.length > 1) {
      window.history.back()
      return
    }
    navigate({ name: "home" })
  }, [navigate])

  const openPrompt = useCallback(
    (prompt: string) => {
      const match = matchChatForPrompt(prompt)
      navigate({ name: "chat", id: match ?? "c-huang" })
    },
    [navigate],
  )

  const toggleSaved = useCallback((articleId: string) => {
    setSavedIds((current) => {
      const next = new Set(current)
      if (next.has(articleId)) next.delete(articleId)
      else next.add(articleId)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ route, navigate, goBack, openPrompt, savedIds, toggleSaved }),
    [route, navigate, goBack, openPrompt, savedIds, toggleSaved],
  )

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useAppNav(): NavigationValue {
  const value = useContext(NavigationContext)
  if (!value) {
    throw new Error("useAppNav must be used inside NavigationProvider")
  }
  return value
}

export function handleAppLinkClick(event: MouseEvent<HTMLElement>) {
  const target = (event.target as HTMLElement | null)?.closest("a")
  if (!target) return
  const href = target.getAttribute("href")
  if (!href?.startsWith("#/")) return
  event.preventDefault()
  window.location.hash = href
}
