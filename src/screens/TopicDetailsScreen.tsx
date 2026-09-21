import { Cover, SearchInput } from "@ds"
import {
  AppShell,
  ArticleSection,
  BottomContainer,
  CenterContainer,
  ToolBar,
} from "@/layout"
import { articlesForTopic, topicsById } from "@/data"
import { useAppNav } from "@/navigation"
import { AppBackButton } from "./AppBackButton"
import { AppSidebar } from "./AppSidebar"
import { FeedArticle } from "./FeedArticle"
import { useComposer } from "./useComposer"
import { useFeedFilter } from "./useFeedFilter"
import { useMemo, useState } from "react"

export function TopicDetailsScreen() {
  const { route } = useAppNav()
  const composer = useComposer()
  const [query, setQuery] = useState("")
  const filter = useFeedFilter()
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

  return (
    <AppShell
      sidebar={<AppSidebar />}
      topBar={<AppBackButton />}
      dock={
        <BottomContainer
          model="Claude Opus 5"
          value={composer.value}
          onChange={composer.onChange}
          onSubmit={composer.onSubmit}
        />
      }
    >
      <CenterContainer hasDock>
        <div className="flex flex-col gap-24 px-8">
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
        {today.length > 0 ? (
          <ArticleSection label="Today">
            {today.map((article) => (
              <FeedArticle key={article.id} article={article} />
            ))}
          </ArticleSection>
        ) : null}
        {yesterday.length > 0 ? (
          <ArticleSection label="Yesterday">
            {yesterday.map((article) => (
              <FeedArticle key={article.id} article={article} />
            ))}
          </ArticleSection>
        ) : null}
      </CenterContainer>
    </AppShell>
  )
}
