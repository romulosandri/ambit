import { Avatar, SearchInput } from "@ds"
import {
  ArticleSection,
  CenterContainer,
  ToolBar,
} from "@/layout"
import {
  articlesForSource,
  getSourceEntity,
  parseSourceParam,
} from "@/data"
import { gsap, prefersReducedMotion, PresenceItem, useGSAP } from "@/motion"
import { useAppNav } from "@/navigation"
import { FeedArticle } from "./FeedArticle"
import { useFeedFilter } from "./useFeedFilter"
import { useMemo, useRef, useState } from "react"

export function SourceDetailsScreen() {
  const { route } = useAppNav()
  const [query, setQuery] = useState("")
  const filter = useFeedFilter()
  const rootRef = useRef<HTMLDivElement>(null)
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
      <div data-read-stage="hero" className="flex flex-col items-center gap-16 px-8">
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
