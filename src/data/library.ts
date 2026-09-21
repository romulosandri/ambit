import { useCallback, useSyncExternalStore } from "react"
import { articles } from "./articles"
import { briefs } from "./briefs"
import { topics } from "./topics"

/** In-memory saved library for the prototype. Resets on full page reload. */
export type SavedKind = "article" | "brief" | "topic"

type LibraryState = {
  article: Set<string>
  brief: Set<string>
  topic: Set<string>
}

export type LibrarySnapshot = {
  articles: ReadonlySet<string>
  briefs: ReadonlySet<string>
  topics: ReadonlySet<string>
}

function idsMarkedSaved<T extends { id: string; saved?: boolean }>(
  items: T[],
): Set<string> {
  return new Set(items.filter((item) => item.saved).map((item) => item.id))
}

function createState(): LibraryState {
  return {
    article: idsMarkedSaved(articles),
    brief: idsMarkedSaved(briefs),
    topic: idsMarkedSaved(topics),
  }
}

function toSnapshot(state: LibraryState): LibrarySnapshot {
  return {
    articles: state.article,
    briefs: state.brief,
    topics: state.topic,
  }
}

function collectionFor(state: LibraryState, kind: SavedKind): Set<string> {
  switch (kind) {
    case "article":
      return state.article
    case "brief":
      return state.brief
    case "topic":
      return state.topic
    default: {
      const exhaustive: never = kind
      return exhaustive
    }
  }
}

let state = createState()
let snapshot = toSnapshot(state)
const listeners = new Set<() => void>()

function emit() {
  snapshot = toSnapshot(state)
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot() {
  return snapshot
}

export function toggleSaved(kind: SavedKind, id: string) {
  const current = collectionFor(state, kind)
  const next = new Set(current)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  state = { ...state, [kind]: next }
  emit()
}

export function isSaved(kind: SavedKind, id: string) {
  return collectionFor(state, kind).has(id)
}

export function useSavedLibrary() {
  const library = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const saved = useCallback(
    (kind: SavedKind, id: string) => {
      switch (kind) {
        case "article":
          return library.articles.has(id)
        case "brief":
          return library.briefs.has(id)
        case "topic":
          return library.topics.has(id)
        default: {
          const exhaustive: never = kind
          return exhaustive
        }
      }
    },
    [library],
  )

  return { ...library, isSaved: saved, toggleSaved }
}
