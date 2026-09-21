import { Cover, SearchInput } from "@ds"
import {
  ArticleSection,
  CenterContainer,
  ToolBar,
} from "@/layout"
import { articlesForTopic, topicsById } from "@/data"
import { gsap, prefersReducedMotion, PresenceItem, useGSAP } from "@/motion"
import { useAppNav } from "@/navigation"
import { FeedArticle } from "./FeedArticle"
import { useFeedFilter } from "./useFeedFilter"
import { useMemo, useRef, useState } from "react"

export function TopicDetailsScreen() {
  const { route } = useAppNav()
  const [query, setQuery] = useState("")
  const filter = useFeedFilter()
  const rootRef = useRef<HTMLDivElement>(null)
  const topicId = route.name === "topic" ? route.id : "ai-agents"
  const topic = topicsById[topicId] ?? topicsById["ai-agents"]
  const feed = useMemo(() => {
    const list = articlesForTopic(topic.id)
    return list.filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) &&
        filter.match(article),
    )
  }, [topic.id, query, filter.match])
  const today = feed.filter((article) => article.day === "today")
  const yesterday = feed.filter((article) => article.day === "yesterday")

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from("[data-read-stage='hero']", { y: 18, opacity: 0, duration: 0.5 })
      tl.from(
        "[data-read-stage='feed']",
        { y: 14, opacity: 0, duration: 0.4 },
        "-=0.22",
      )
    },
    { scope: rootRef },
  )

  return (
    <CenterContainer ref={rootRef} hasDock>
      <div data-read-stage="hero" className="flex flex-col gap-24 px-8">
        <div className="flex items-center gap-12 max-md:items-start">
          <Cover src={topic.imageSrc} size="sm" />
          <h1 className="text-display-small text-text-default">{topic.title}</h1>
        </div>
        <ToolBar
          actions={filter.control}
        >
          <SearchInput
            placeholder="Find in this topic..."
            shortcut="/"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            className="flex-1"
          />
        </ToolBar>
      </div>
      <div data-read-stage="feed" className="flex flex-col gap-24">
        {today.length > 0 ? (
          <ArticleSection label="Today">
            {today.map((article) => (
              <PresenceItem key={article.id}>
                <FeedArticle article={article} />
              </PresenceItem>
            ))}
          </ArticleSection>
        ) : null}
        {yesterday.length > 0 ? (
          <ArticleSection label="Yesterday">
            {yesterday.map((article) => (
              <PresenceItem key={article.id}>
                <FeedArticle article={article} />
              </PresenceItem>
            ))}
          </ArticleSection>
        ) : null}
      </div>
    </CenterContainer>
  )
}
