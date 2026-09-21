import type { SubscriptionStep } from "@ds"
import type { DiscoveryCategory } from "@/data"
import type { AppRoute, AppScreen, PreviewTab } from "./types"

const discoveryCategories: DiscoveryCategory[] = [
  "for-you",
  "technology",
  "ai",
  "business",
  "science",
  "health",
  "climate",
  "policy",
  "markets",
  "culture",
  "sports",
  "world",
]

function isDiscoveryCategory(value: string): value is DiscoveryCategory {
  return discoveryCategories.includes(value as DiscoveryCategory)
}

function isSubscriptionStep(value: string | null): value is SubscriptionStep {
  return value === "choose" || value === "topic" || value === "source"
}

function serializePath(route: AppRoute): string {
  switch (route.name) {
    case "auth":
      return "#/auth"
    case "home":
      return route.tab === "sources" ? "#/home/sources" : "#/home"
    case "discovery":
      return route.category && route.category !== "for-you"
        ? `#/discovery/${route.category}`
        : "#/discovery"
    case "briefs":
      return "#/briefs"
    case "brief":
      return `#/brief/${route.id}`
    case "chats":
      return "#/chats"
    case "chat":
      return `#/chat/${route.id}`
    case "subscriptions":
      return route.tab === "sources"
        ? "#/subscriptions/sources"
        : "#/subscriptions"
    case "saved":
      return "#/saved"
    case "topic":
      return `#/topic/${route.id}`
    case "source":
      return `#/source/${route.id}`
    case "article":
      return `#/article/${route.id}`
    default: {
      const exhaustive: never = route
      return exhaustive
    }
  }
}

export function serializeRoute(route: AppRoute): string {
  const path = serializePath(route)
  switch (route.modal) {
    case "topic":
      return `${path}?new=topic`
    case "source":
      return `${path}?new=source`
    case "choose":
      return `${path}?new=choose`
    case undefined:
      return path
    default: {
      const exhaustive: never = route.modal
      return exhaustive
    }
  }
}

export function withoutModal(route: AppRoute): AppRoute {
  if (!route.modal) return route
  const { modal: _modal, ...screen } = route
  return screen
}

function parseLegacyModal(parts: string[]): SubscriptionStep | undefined {
  if (parts[0] !== "subscriptions" || parts[1] !== "new") return undefined
  if (parts[2] === "topic") return "topic"
  if (parts[2] === "source") return "source"
  return "choose"
}

function parseScreen(parts: string[]): AppScreen {
  if (parts.length === 0 || parts[0] === "auth") {
    return { name: "auth" }
  }

  if (parts[0] === "home") {
    return { name: "home", tab: parts[1] === "sources" ? "sources" : "topics" }
  }

  switch (parts[0]) {
    case "discovery":
      return {
        name: "discovery",
        category:
          parts[1] && isDiscoveryCategory(parts[1]) ? parts[1] : "for-you",
      }
    case "briefs":
      return { name: "briefs" }
    case "brief":
      return parts[1] ? { name: "brief", id: parts[1] } : { name: "briefs" }
    case "chats":
      return { name: "chats" }
    case "chat":
      return parts[1] ? { name: "chat", id: parts[1] } : { name: "chats" }
    case "subscriptions":
      if (parts[1] === "new") {
        return { name: "subscriptions" }
      }
      return {
        name: "subscriptions",
        tab: parts[1] === "sources" ? "sources" : "topics",
      }
    case "saved":
      return { name: "saved" }
    case "topic":
      return parts[1] ? { name: "topic", id: parts[1] } : { name: "home" }
    case "source":
      return parts[1] ? { name: "source", id: parts[1] } : { name: "home" }
    case "article":
      return parts[1] ? { name: "article", id: parts[1] } : { name: "home" }
    default:
      return { name: "home" }
  }
}

export function parseHash(hash = window.location.hash): AppRoute {
  const raw = hash.replace(/^#\/?/, "")
  const queryIndex = raw.indexOf("?")
  const pathRaw = queryIndex === -1 ? raw : raw.slice(0, queryIndex)
  const queryRaw = queryIndex === -1 ? "" : raw.slice(queryIndex + 1)
  const path = pathRaw.replace(/\/+$/, "")
  const parts = path.split("/").filter(Boolean)
  const queryModal = new URLSearchParams(queryRaw).get("new")
  const modal = isSubscriptionStep(queryModal)
    ? queryModal
    : parseLegacyModal(parts)
  const screen = parseScreen(parts)
  return modal ? { ...screen, modal } : screen
}

export function previewTabFor(route: AppRoute): PreviewTab {
  switch (route.modal) {
    case "topic":
      return "newTopic"
    case "source":
      return "newSource"
    case "choose":
      return "newSubscription"
    case undefined:
      break
    default: {
      const exhaustive: never = route.modal
      return exhaustive
    }
  }

  switch (route.name) {
    case "auth":
      return "auth"
    case "home":
      return "home"
    case "discovery":
      return "discovery"
    case "briefs":
      return "briefs"
    case "brief":
      return "briefDetails"
    case "chats":
      return "chats"
    case "chat":
      return "chatDetails"
    case "subscriptions":
      return "subscriptions"
    case "saved":
      return "saved"
    case "topic":
      return "topic"
    case "source":
      return "source"
    case "article":
      return "article"
    default: {
      const exhaustive: never = route
      return exhaustive
    }
  }
}

export function routeForPreviewTab(tab: PreviewTab): AppRoute {
  switch (tab) {
    case "auth":
      return { name: "auth" }
    case "home":
      return { name: "home" }
    case "discovery":
      return { name: "discovery" }
    case "briefs":
      return { name: "briefs" }
    case "briefDetails":
      return { name: "brief", id: "brief-sep-21" }
    case "chats":
      return { name: "chats" }
    case "chatDetails":
      return { name: "chat", id: "c-climate" }
    case "subscriptions":
      return { name: "subscriptions" }
    case "newSubscription":
      return { name: "subscriptions", modal: "choose" }
    case "newTopic":
      return { name: "subscriptions", modal: "topic" }
    case "newSource":
      return { name: "subscriptions", modal: "source" }
    case "saved":
      return { name: "saved" }
    case "topic":
      return { name: "topic", id: "ai-agents" }
    case "source":
      return { name: "source", id: "person-sarah-guo" }
    case "article":
      return { name: "article", id: "huang-zero-percent" }
    default: {
      const exhaustive: never = tab
      return exhaustive
    }
  }
}
