import type { ArticleType } from "@ds"
import type { SocialName } from "@ds/components/brands"
import { articles } from "./articles"
import { briefs } from "./briefs"
import { people, peopleById } from "./people"
import { publishers, publishersById } from "./publishers"
import { topics } from "./topics"
import type { Article, DiscoveryCategory, Person, Publisher, SourceRef } from "./types"

export const subscribedPeople = people.filter((person) => person.subscribed)
export const suggestedPeople = people.filter((person) => !person.subscribed)

export const subscribedPublishers = publishers.filter(
  (publisher) => publisher.subscribed,
)
export const suggestedPublishers = publishers.filter(
  (publisher) => !publisher.subscribed,
)

export const subscribedSources: Array<Person | Publisher> = [
  ...subscribedPeople,
  ...subscribedPublishers,
]

export const suggestedSources: Array<Person | Publisher> = [
  ...suggestedPeople.slice(0, 6),
  ...suggestedPublishers.slice(0, 6),
]

export const subscriptionCount = subscribedSources.length

export const todayArticles = articles.filter(
  (article) => article.surface === "home" && article.day === "today",
)
export const yesterdayArticles = articles.filter(
  (article) => article.surface === "home" && article.day === "yesterday",
)
export const savedArticles = articles.filter((article) => article.saved)
export const featuredArticle =
  articles.find((article) => article.featured && article.surface === "home") ??
  articles[0]
export const featuredDiscoveryArticle =
  articles.find(
    (article) => article.featured && article.surface === "discovery",
  ) ?? articles.find((article) => article.surface === "discovery") ??
  articles[0]

export const trendingTopics = topics
  .filter((topic) => topic.surface === "discovery" && topic.trending)
  .map((topic) => ({
    id: topic.id,
    title: topic.title,
    meta: `${topic.articleCount} Selected Articles`,
  }))

export function sourceName(ref: SourceRef): string {
  switch (ref.kind) {
    case "person":
      return peopleById[ref.id]?.name ?? ref.id
    case "publisher":
      return publishersById[ref.id]?.name ?? ref.id
    default: {
      const exhaustive: never = ref
      return exhaustive
    }
  }
}

export function sourceLogo(ref: SourceRef): string | undefined {
  switch (ref.kind) {
    case "person":
      return peopleById[ref.id]?.photoSrc
    case "publisher":
      return publishersById[ref.id]?.logoSrc
    default: {
      const exhaustive: never = ref
      return exhaustive
    }
  }
}

export function sourceKey(ref: SourceRef): string {
  switch (ref.kind) {
    case "person":
      return `person-${ref.id}`
    case "publisher":
      return `publisher-${ref.id}`
    default: {
      const exhaustive: never = ref
      return exhaustive
    }
  }
}

export function sourceHref(ref: SourceRef): string {
  return `#/source/${sourceKey(ref)}`
}

export type ArticleFilter = {
  topicIds: string[]
  sourceIds: string[]
  channels: SocialName[]
}

export function matchesArticleFilter(
  article: Article,
  filter: ArticleFilter,
): boolean {
  if (filter.topicIds.length > 0) {
    const hit = article.topicIds.some((id) => filter.topicIds.includes(id))
    if (!hit) return false
  }

  if (filter.sourceIds.length > 0) {
    const keys = [
      sourceKey(article.source),
      ...(article.perspectives?.map((perspective) =>
        sourceKey(perspective.source),
      ) ?? []),
    ]
    if (!keys.some((key) => filter.sourceIds.includes(key))) return false
  }

  if (filter.channels.length > 0) {
    const channels = [
      article.channel,
      ...(article.perspectives?.map((perspective) => perspective.channel) ?? []),
    ].filter((channel): channel is SocialName => Boolean(channel))
    if (!channels.some((channel) => filter.channels.includes(channel))) {
      return false
    }
  }

  return true
}

export function parseSourceParam(
  param: string,
): { kind: SourceRef["kind"]; id: string } | undefined {
  if (param.startsWith("person-")) {
    return { kind: "person", id: param.slice("person-".length) }
  }
  if (param.startsWith("publisher-")) {
    return { kind: "publisher", id: param.slice("publisher-".length) }
  }
  if (peopleById[param]) return { kind: "person", id: param }
  if (publishersById[param]) return { kind: "publisher", id: param }
  return undefined
}

export function getSourceEntity(ref: SourceRef): Person | Publisher | undefined {
  switch (ref.kind) {
    case "person":
      return peopleById[ref.id]
    case "publisher":
      return publishersById[ref.id]
    default: {
      const exhaustive: never = ref
      return exhaustive
    }
  }
}

export type ArticleCardModel = {
  id: string
  title: string
  source: string
  logoSrc?: string
  type: ArticleType
  person?: boolean
  channel?: SocialName
  sources?: number
  readTime: string
  time: string
  duration: string
  imageSrc: string
  saved?: boolean
  href: string
}

/** Spoken duration for an article. Uses an explicit value when present. */
export function articleDuration(
  article: Pick<Article, "duration" | "readTime">,
): string {
  return article.duration ?? durationFromReadTime(article.readTime)
}

export function durationFromReadTime(readTime: string): string {
  const minutes = Number.parseInt(readTime, 10)
  const mm = Number.isFinite(minutes) && minutes > 0 ? minutes : 4
  const ss = (mm * 17 + 11) % 60
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`
}

export function toCard(article: Article): ArticleCardModel {
  return {
    id: article.id,
    title: article.title,
    source: sourceName(article.source),
    logoSrc: sourceLogo(article.source),
    type: article.type,
    person: article.source.kind === "person",
    channel: article.channel,
    sources: article.sourceCount,
    readTime: article.readTime,
    time: article.time,
    duration: articleDuration(article),
    imageSrc: article.imageSrc,
    saved: article.saved,
    href: `#/article/${article.id}`,
  }
}

export function articlesForTopic(topicId: string): Article[] {
  return articles.filter((article) => article.topicIds.includes(topicId))
}

export function articlesForSource(ref: SourceRef): Article[] {
  return articles.filter((article) => {
    if (article.source.kind === ref.kind && article.source.id === ref.id) {
      return true
    }
    return article.perspectives.some(
      (perspective) =>
        perspective.source.kind === ref.kind &&
        perspective.source.id === ref.id,
    )
  })
}

export function articlesForCategory(category: DiscoveryCategory): Article[] {
  const pool = articles.filter((article) => article.surface === "discovery")
  if (category === "for-you") return pool
  return pool.filter((article) => article.categories.includes(category))
}

export function articleOriginalHref(article: Article): string | undefined {
  if (article.url) return article.url
  return getSourceEntity(article.source)?.url
}

export function articlesForBrief(briefId: string): Article[] {
  const brief = briefs.find((item) => item.id === briefId)
  if (!brief) return []
  return brief.articleIds
    .map((id) => articles.find((article) => article.id === id))
    .filter((article): article is Article => Boolean(article))
}

export function matchChatForPrompt(prompt: string): string | undefined {
  const text = prompt.toLowerCase()
  if (text.includes("huang") || text.includes("nvidia") || text.includes("doom")) {
    return "c-huang"
  }
  if (
    text.includes("article 55") ||
    text.includes("openai") ||
    text.includes("wiki")
  ) {
    return "c-article-55"
  }
  if (text.includes("eu") || text.includes("brussels") || text.includes("act")) {
    return "c-eu-act"
  }
  if (text.includes("climate") || text.includes("carbon") || text.includes("energy")) {
    return "c-climate"
  }
  if (text.includes("copilot") || text.includes("microsoft") || text.includes("agent")) {
    return "c-copilot"
  }
  if (text.includes("california") || text.includes("sb 53") || text.includes("newsom")) {
    return "c-sb53"
  }
  if (text.includes("apple") || text.includes("dma") || text.includes("intelligence")) {
    return "c-apple"
  }
  if (text.includes("chip") || text.includes("blackwell") || text.includes("gpu")) {
    return "c-chips"
  }
  return undefined
}
