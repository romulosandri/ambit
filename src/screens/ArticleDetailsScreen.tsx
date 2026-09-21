import { ArrowSquareOut, BookmarkSimple } from "@phosphor-icons/react"
import { useMemo, useState } from "react"
import {
  ArticleCardSmall,
  AudioButton,
  Badge,
  Button,
  DropdownButton,
  LinkButton,
  SourceLine,
  socialLogos,
} from "@ds"
import {
  AppShell,
  BottomContainer,
  CardRail,
  CenterContainer,
  RailArrows,
  SectionHeader,
  useRail,
} from "@/layout"
import {
  articleDuration,
  articleOriginalHref,
  articlesById,
  featuredArticle,
  sourceHref,
  sourceLogo,
  sourceName,
} from "@/data"
import { useAppNav } from "@/navigation"
import { AppBackButton } from "./AppBackButton"
import { AppSidebar } from "./AppSidebar"
import { useComposer } from "./useComposer"

const perspectiveFilters = [
  { value: "all", label: "All" },
  { value: "publishers", label: "Publishers" },
  { value: "people", label: "People" },
  { value: "social", label: "Social" },
] as const

type PerspectiveFilter = (typeof perspectiveFilters)[number]["value"]

const typeBadge = {
  news: { label: "News", color: "cyan" as const },
  articles: { label: "Analysis", color: "violet" as const },
  post: { label: "Post", color: "pink" as const },
}

export function ArticleDetailsScreen() {
  const { route, savedIds, toggleSaved } = useAppNav()
  const composer = useComposer()
  const perspectivesRail = useRail()
  const [perspectiveFilter, setPerspectiveFilter] =
    useState<PerspectiveFilter>("all")
  const articleId = route.name === "article" ? route.id : featuredArticle.id
  const article = articlesById[articleId] ?? featuredArticle
  const badge = typeBadge[article.type]
  const saved = savedIds.has(article.id)
  const originalHref = articleOriginalHref(article)
  const perspectives = useMemo(() => {
    const list = article.perspectives ?? []
    switch (perspectiveFilter) {
      case "all":
        return list
      case "publishers":
        return list.filter((item) => item.source.kind === "publisher")
      case "people":
        return list.filter((item) => item.source.kind === "person")
      case "social":
        return list.filter((item) => Boolean(item.channel))
      default: {
        const exhaustive: never = perspectiveFilter
        return exhaustive
      }
    }
  }, [article.perspectives, perspectiveFilter])

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
      <CenterContainer hasDock className="px-40 max-md:px-16">
        <div className="flex flex-col gap-16">
          <div className="flex h-28 items-center gap-12">
            <a href={sourceHref(article.source)}>
              <SourceLine
                source={sourceName(article.source)}
                logoSrc={sourceLogo(article.source)}
                person={article.source.kind === "person"}
                social={
                  article.source.kind !== "person" && article.type === "post"
                }
              />
            </a>
            <Badge color={badge.color}>{badge.label}</Badge>
          </div>
          <h1 className="text-heading-article text-text-default">{article.title}</h1>
          <p className="text-body-small text-text-muted">
            {article.readTime} · {article.time}
          </p>
          <div className="flex items-center gap-8">
            <AudioButton duration={articleDuration(article)} />
            <Button
              iconOnly
              size="sm"
              style="soft"
              leadIcon={BookmarkSimple}
              aria-label={saved ? "Remove from saved" : "Save article"}
              aria-pressed={saved}
              onClick={() => toggleSaved(article.id)}
            />
            {originalHref ? (
              <LinkButton
                href={originalHref}
                leadIcon={ArrowSquareOut}
                tone="informative"
                target="_blank"
                rel="noreferrer"
              >
                Original
              </LinkButton>
            ) : null}
          </div>
        </div>

        <section className="flex w-full flex-col gap-12">
            <SectionHeader
              trailing={
                <DropdownButton
                  options={[...perspectiveFilters]}
                  value={perspectiveFilter}
                  onChange={(next) =>
                    setPerspectiveFilter(next as PerspectiveFilter)
                  }
                />
              }
              actions={
                <RailArrows
                  rail={perspectivesRail}
                  prevLabel="Previous perspectives"
                  nextLabel="Next perspectives"
                />
              }
            >
              Perspectives
            </SectionHeader>
            <CardRail rail={perspectivesRail} gap={12}>
              {perspectives.map((perspective) => (
                <ArticleCardSmall
                  key={perspective.id}
                  title={perspective.quote}
                  source={sourceName(perspective.source)}
                  logoSrc={
                    perspective.channel
                      ? socialLogos[perspective.channel]
                      : sourceLogo(perspective.source)
                  }
                  person={false}
                  social={Boolean(perspective.channel)}
                  imageSrc={perspective.imageSrc}
                  href={sourceHref(perspective.source)}
                />
              ))}
            </CardRail>
          </section>

        <img
          src={article.imageSrc}
          alt=""
          className="rounded-md h-260 w-full object-cover max-md:h-180"
        />

        {article.body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="text-body-article text-text-default">
            {paragraph}
          </p>
        ))}
      </CenterContainer>
    </AppShell>
  )
}
