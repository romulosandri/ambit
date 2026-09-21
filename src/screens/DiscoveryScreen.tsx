import {
  FeaturedArticleCard,
  PlaylistCard,
  SourceCard,
  Tabs,
  TopicItem,
} from "@ds"
import {
  AppShell,
  ArticleSection,
  BottomContainer,
  CardRail,
  CenterContainer,
  PageHeader,
  RailArrows,
  ScrimFrame,
  SectionHeader,
  ToolBar,
  useRail,
} from "@/layout"
import {
  articleDuration,
  articlesForCategory,
  featuredDiscoveryArticle,
  sourceLogo,
  sourceName,
  suggestedSources,
  discoveryTopics,
  trendingTopics,
  type DiscoveryCategory,
} from "@/data"
import { useAppNav } from "@/navigation"
import { AppSidebar } from "./AppSidebar"
import { FeedArticle } from "./FeedArticle"
import { useComposer } from "./useComposer"

const discoveryTabs: { value: DiscoveryCategory; label: string }[] = [
  { value: "for-you", label: "For You" },
  { value: "technology", label: "Technology" },
  { value: "ai", label: "AI" },
  { value: "business", label: "Business" },
  { value: "science", label: "Science" },
  { value: "health", label: "Health" },
  { value: "climate", label: "Climate" },
  { value: "policy", label: "Policy" },
  { value: "markets", label: "Markets" },
  { value: "culture", label: "Culture" },
  { value: "sports", label: "Sports" },
  { value: "world", label: "World" },
]

function PanelCard({
  header,
  children,
}: {
  header: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="bg-bg-card border-border-default flex flex-col gap-8 overflow-hidden rounded-card-md border p-8">
      {header}
      {children}
    </div>
  )
}

export function DiscoveryScreen() {
  const { route, navigate } = useAppNav()
  const composer = useComposer()
  const tabsRail = useRail()
  const sourcesRail = useRail()
  const topicsRail = useRail()
  const tab: DiscoveryCategory =
    route.name === "discovery" ? (route.category ?? "for-you") : "for-you"
  const feed = articlesForCategory(tab)
  const featured =
    tab === "for-you"
      ? featuredDiscoveryArticle
      : feed.length > 1
        ? feed[0]
        : undefined
  const list = feed
    .filter((article) => article.id !== featured?.id)
    .slice(0, 8)

  return (
    <AppShell
      sidebar={<AppSidebar activeItem="discovery" />}
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
        <PageHeader
          title="Discover what the world is reading"
          toolbar={
            <ToolBar
              actions={
                <RailArrows
                  rail={tabsRail}
                  prevLabel="Previous categories"
                  nextLabel="Next categories"
                />
              }
            >
              <ScrimFrame rail={tabsRail} className="min-w-0 flex-1">
                <Tabs
                  ref={tabsRail.trackRef}
                  shape="rail"
                  items={discoveryTabs}
                  value={tab}
                  onValueChange={(value) =>
                    navigate({
                      name: "discovery",
                      category: value as DiscoveryCategory,
                    })
                  }
                  className="min-w-0"
                />
              </ScrimFrame>
            </ToolBar>
          }
        />

        {featured ? (
          <FeaturedArticleCard
            title={featured.title}
            description={featured.dek ?? featured.body[0] ?? ""}
            source={sourceName(featured.source)}
            logoSrc={sourceLogo(featured.source)}
            sources={featured.sourceCount}
            readTime={featured.readTime}
            time={featured.time}
            duration={articleDuration(featured)}
            imageSrc={featured.imageSrc}
            href={`#/article/${featured.id}`}
          />
        ) : null}

        {tab === "for-you" ? (
          <>
            <PanelCard header={<SectionHeader>Trending Topics</SectionHeader>}>
              <div className="flex flex-col">
                {trendingTopics.map((topic) => (
                  <TopicItem
                    key={topic.id}
                    title={topic.title}
                    meta={topic.meta}
                    href={`#/topic/${topic.id}`}
                  />
                ))}
              </div>
            </PanelCard>

            <PanelCard
              header={
                <SectionHeader
                  actions={
                    <RailArrows
                      rail={sourcesRail}
                      prevLabel="Previous sources"
                      nextLabel="Next sources"
                    />
                  }
                >
                  Suggested Sources
                </SectionHeader>
              }
            >
              <CardRail rail={sourcesRail} scrim="card" bleed>
                {suggestedSources.map((source) => {
                  const kind = "photoSrc" in source ? "person" : "publisher"
                  const logoSrc =
                    "photoSrc" in source ? source.photoSrc : source.logoSrc
                  return (
                    <SourceCard
                      key={`${kind}-${source.id}`}
                      name={source.name}
                      logoSrc={logoSrc}
                      href={`#/source/${kind}-${source.id}`}
                    />
                  )
                })}
              </CardRail>
            </PanelCard>

            <PanelCard
              header={
                <SectionHeader
                  actions={
                    <RailArrows
                      rail={topicsRail}
                      prevLabel="Previous topics"
                      nextLabel="Next topics"
                    />
                  }
                >
                  Explore Topics
                </SectionHeader>
              }
            >
              <CardRail rail={topicsRail} scrim="card" bleed>
                {discoveryTopics.map((topic) => (
                  <PlaylistCard
                    key={topic.id}
                    title={topic.title}
                    imageSrc={topic.imageSrc}
                    href={`#/topic/${topic.id}`}
                    className="w-180"
                  />
                ))}
              </CardRail>
            </PanelCard>
          </>
        ) : null}

        <ArticleSection label={tab === "for-you" ? "Today" : "Selected"}>
          {list.map((article) => (
            <FeedArticle key={article.id} article={article} />
          ))}
        </ArticleSection>
      </CenterContainer>
    </AppShell>
  )
}
