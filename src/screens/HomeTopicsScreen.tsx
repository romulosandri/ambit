import { Plus } from "@phosphor-icons/react"
import { useState } from "react"
import {
  Avatar,
  Button,
  DailyBriefHorizontalCard,
  Divider,
  DropdownButton,
  PlaylistCard,
  SourceCard,
  Tabs,
} from "@ds"
import {
  AppShell,
  ArticleSection,
  BottomContainer,
  CardRail,
  CenterContainer,
  PageHeader,
  RailArrows,
  SectionHeader,
  ToolBar,
  useRail,
} from "@/layout"
import {
  subscribedSources,
  todayArticles,
  todayBrief,
  homeTopics,
  user,
  yesterdayArticles,
} from "@/data"
import { useAppNav } from "@/navigation"
import { AppSidebar } from "./AppSidebar"
import { FeedArticle } from "./FeedArticle"
import { useComposer } from "./useComposer"
import { useFeedFilter } from "./useFeedFilter"

function sourceCardProps(source: (typeof subscribedSources)[number]) {
  const kind = "photoSrc" in source ? "person" : "publisher"
  const logoSrc = "photoSrc" in source ? source.photoSrc : source.logoSrc
  return {
    name: source.name,
    logoSrc,
    href: `#/source/${kind}-${source.id}`,
  }
}

export function HomeScreen() {
  const { route, navigate, savedIds, toggleSaved } = useAppNav()
  const composer = useComposer()
  const filter = useFeedFilter()
  const [topicRange, setTopicRange] = useState("Last 7 Days")
  const tab = route.name === "home" && route.tab === "sources" ? "sources" : "topics"
  const topicsRail = useRail()
  const sourcesRail = useRail()

  const visibleToday = todayArticles.filter(filter.match)
  const visibleYesterday = yesterdayArticles.filter(filter.match)

  return (
    <AppShell
      sidebar={<AppSidebar activeItem="home" />}
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
          title={`${user.firstName}, here is what you missed...`}
          lead={<Avatar name={user.name} src={user.avatarSrc} />}
          toolbar={
            <ToolBar
              actions={
                <>
                  {filter.control}
                  <Button
                    iconOnly
                    size="xs"
                    style="ghost"
                    leadIcon={Plus}
                    aria-label="Add topic"
                    onClick={() =>
                      navigate({ name: "subscriptions", modal: "topic" })
                    }
                  />
                </>
              }
            >
              <Tabs
                items={[
                  { value: "topics", label: "Topics" },
                  { value: "sources", label: "Sources" },
                ]}
                value={tab}
                onValueChange={(value) =>
                  navigate({
                    name: "home",
                    tab: value === "sources" ? "sources" : "topics",
                  })
                }
              />
            </ToolBar>
          }
        />

        {tab === "topics" ? (
          <>
            <DailyBriefHorizontalCard
              summary={todayBrief.summary}
              month={todayBrief.month}
              date={todayBrief.date}
              duration={todayBrief.duration}
              imageSrc={todayBrief.imageSrc}
              href={`#/brief/${todayBrief.id}`}
              saved={savedIds.has(todayBrief.id)}
              onSave={() => toggleSaved(todayBrief.id)}
            />
            <section className="flex flex-col gap-6">
              <SectionHeader
                trailing={
                  <DropdownButton
                    options={[
                      { value: "Last 7 Days", label: "Last 7 Days" },
                      { value: "Last 30 Days", label: "Last 30 Days" },
                      { value: "Last 90 Days", label: "Last 90 Days" },
                      { value: "This Year", label: "This Year" },
                      { value: "All Time", label: "All Time" },
                    ]}
                    value={topicRange}
                    onChange={setTopicRange}
                  />
                }
                actions={
                  <RailArrows
                    rail={topicsRail}
                    prevLabel="Previous topics"
                    nextLabel="Next topics"
                  />
                }
              >
                Topics
              </SectionHeader>
              <CardRail rail={topicsRail}>
                {homeTopics.map((topic) => (
                  <PlaylistCard
                    key={topic.id}
                    title={topic.title}
                    imageSrc={topic.imageSrc}
                    href={`#/topic/${topic.id}`}
                    className="w-180"
                  />
                ))}
              </CardRail>
            </section>
          </>
        ) : (
          <section className="flex flex-col gap-6">
            <SectionHeader
              actions={
                <RailArrows
                  rail={sourcesRail}
                  prevLabel="Previous sources"
                  nextLabel="Next sources"
                />
              }
            >
              Sources
            </SectionHeader>
            <CardRail rail={sourcesRail}>
              {subscribedSources.map((source) => (
                <SourceCard key={source.id} {...sourceCardProps(source)} />
              ))}
            </CardRail>
          </section>
        )}

        <Divider />

        <div className="flex flex-col gap-24">
          {visibleToday.length > 0 ? (
            <ArticleSection label="Today">
              {visibleToday.map((article) => (
                <FeedArticle key={article.id} article={article} />
              ))}
            </ArticleSection>
          ) : null}
          {visibleYesterday.length > 0 ? (
            <ArticleSection label="Yesterday">
              {visibleYesterday.map((article) => (
                <FeedArticle key={article.id} article={article} />
              ))}
            </ArticleSection>
          ) : null}
          {visibleToday.length === 0 && visibleYesterday.length === 0 ? (
            <p className="text-body-default text-text-muted px-8">
              No articles match these filters.
            </p>
          ) : null}
        </div>
      </CenterContainer>
    </AppShell>
  )
}
