import { Avatar, SearchInput } from "@ds"
import {
  AppShell,
  ArticleSection,
  BottomContainer,
  CenterContainer,
  ToolBar,
} from "@/layout"
import {
  articlesForSource,
  getSourceEntity,
  parseSourceParam,
} from "@/data"
import { useAppNav } from "@/navigation"
import { AppBackButton } from "./AppBackButton"
import { AppSidebar } from "./AppSidebar"
import { FeedArticle } from "./FeedArticle"
import { useComposer } from "./useComposer"
import { useFeedFilter } from "./useFeedFilter"
import { useMemo, useState } from "react"

export function SourceDetailsScreen() {
  const { route } = useAppNav()
  const composer = useComposer()
  const [query, setQuery] = useState("")
  const filter = useFeedFilter()
  const param = route.name === "source" ? route.id : "person-sarah-guo"
  const ref = parseSourceParam(param) ?? {
    kind: "person" as const,
    id: "sarah-guo",
  }
  const entity = getSourceEntity(ref)
  const photo = entity && "photoSrc" in entity ? entity.photoSrc : undefined
  const logo = entity && "logoSrc" in entity ? entity.logoSrc : undefined

  const feed = useMemo(() => {
    const list = articlesForSource(ref)
    return list.filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) &&
        filter.match(article),
    )
  }, [ref, query, filter.match])
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
        <div className="flex flex-col items-center gap-16 px-8">
          {ref.kind === "person" ? (
            <Avatar src={photo} name={entity?.name} size="md" className="size-72" />
          ) : (
            <Avatar src={logo} name={entity?.name} size="md" className="size-72" />
          )}
          <h1 className="text-display-small text-text-default text-center">
            {entity?.name ?? "Source"}
          </h1>
          {entity && "role" in entity ? (
            <p className="text-body-default text-text-muted text-center">
              {entity.role}
            </p>
          ) : null}
          <ToolBar
            actions={filter.control}
          >
            <SearchInput
              placeholder={`Find on ${entity?.name ?? "this source"}...`}
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
