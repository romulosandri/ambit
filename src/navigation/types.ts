import type { SubscriptionStep } from "@ds"
import type { DiscoveryCategory } from "@/data"

export type AppRoute =
  | { name: "auth" }
  | { name: "home"; tab?: "topics" | "sources" }
  | { name: "discovery"; category?: DiscoveryCategory }
  | { name: "briefs" }
  | { name: "brief"; id: string }
  | { name: "chats" }
  | { name: "chat"; id: string }
  | {
      name: "subscriptions"
      tab?: "topics" | "sources"
      modal?: SubscriptionStep
    }
  | { name: "saved" }
  | { name: "topic"; id: string }
  | { name: "source"; id: string }
  | { name: "article"; id: string }

export type PreviewTab =
  | "auth"
  | "home"
  | "discovery"
  | "briefs"
  | "chats"
  | "chatDetails"
  | "subscriptions"
  | "newSubscription"
  | "newTopic"
  | "newSource"
  | "saved"
  | "topic"
  | "source"
  | "article"
  | "briefDetails"
