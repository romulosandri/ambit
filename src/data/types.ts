import type { ArticleType } from "@ds"
import type { SocialName } from "@ds/components/brands"

export type DiscoveryCategory =
  | "for-you"
  | "technology"
  | "ai"
  | "business"
  | "science"
  | "health"
  | "climate"
  | "policy"
  | "markets"
  | "culture"
  | "sports"
  | "world"

export type Person = {
  id: string
  name: string
  role: string
  bio: string
  photoSrc: string
  url: string
  channels: SocialName[]
  subscribed?: boolean
}

export type Publisher = {
  id: string
  name: string
  logoSrc: string
  url: string
  subscribed?: boolean
}

export type SourceRef =
  | { kind: "person"; id: string }
  | { kind: "publisher"; id: string }

export type Perspective = {
  id: string
  source: SourceRef
  channel?: SocialName
  imageSrc: string
  quote: string
}

export type Article = {
  id: string
  title: string
  dek?: string
  type: ArticleType
  source: SourceRef
  channel?: SocialName
  topicIds: string[]
  categories: DiscoveryCategory[]
  sourceCount?: number
  readTime: string
  /** Display time in the feed, e.g. "1h ago". */
  time: string
  /** Calendar grouping for feeds. */
  day: "today" | "yesterday"
  imageSrc: string
  duration?: string
  body: string[]
  perspectives: Perspective[]
  url?: string
  featured?: boolean
  saved?: boolean
  /** Home is the subscribed AI beat. Discovery is new coverage. */
  surface: "home" | "discovery"
}

export type Topic = {
  id: string
  title: string
  blurb: string
  imageSrc: string
  articleCount: number
  /** Home is what you follow. Discovery is new beats outside that feed. */
  surface: "home" | "discovery"
  trending?: boolean
  saved?: boolean
}

export type Brief = {
  id: string
  title: string
  month: string
  date: string
  headline: string
  summary: string
  duration: string
  imageSrc: string
  articleIds: string[]
  featured?: boolean
  saved?: boolean
}

export type ChatMessage = {
  id: string
  role: "user" | "ai"
  text: string
  timestamp?: string
  sourceLabel?: string
  citationIds?: string[]
}

export type Chat = {
  id: string
  title: string
  date: string
  unread?: boolean
  messages: ChatMessage[]
}

export type UserProfile = {
  name: string
  firstName: string
  avatarSrc?: string
}
