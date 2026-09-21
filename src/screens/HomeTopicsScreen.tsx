import { Plus } from "@phosphor-icons/react"
import { useRef, useState } from "react"
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
  ArticleSection,
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
import {
  clearAuthHandoff,
  Crossfade,
  EmptyCopy,
  gsap,
  peekAuthHandoff,
  prefersReducedMotion,
  PresenceItem,
  useGSAP,
} from "@/motion"
import { useAppNav } from "@/navigation"
import { FeedArticle } from "./FeedArticle"
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
  const filter = useFeedFilter()
  const [topicRange, setTopicRange] = useState("Last 7 Days")
  const tab = route.name === "home" && route.tab === "sources" ? "sources" : "topics"
  const topicsRail = useRail()
  const sourcesRail = useRail()
  const rootRef = useRef<HTMLDivElement>(null)

  const visibleToday = todayArticles.filter(filter.match)
  const visibleYesterday = yesterdayArticles.filter(filter.match)

  useGSAP(
    () => {
      if (!peekAuthHandoff() || prefersReducedMotion()) {
        clearAuthHandoff()
        return
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: clearAuthHandoff,
      })
      tl.from("[data-home-stage='header']", { y: 20, opacity: 0, duration: 0.5 })
      tl.from(
        "[data-home-stage='brief']",
        { y: 24, opacity: 0, duration: 0.45 },
        "-=0.28",
      )
      tl.from(
        "[data-home-stage='rail']",
        { y: 20, opacity: 0, duration: 0.4 },
        "-=0.24",
      )
      tl.from(
        "[data-home-stage='feed']",
        { y: 16, opacity: 0, duration: 0.4 },
        "-=0.2",
      )
    },
    { scope: rootRef },
  )

  return (
    <CenterContainer ref={rootRef} hasDock>
      <div data-home-stage="header">
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
      </div>

      <Crossfade id={tab}>
        {tab === "topics" ? (
          <>
            <div data-home-stage="brief">
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
            </div>
            <section data-home-stage="rail" className="flex flex-col gap-6">
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
          <section data-home-stage="rail" className="flex flex-col gap-6">
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
      </Crossfade>

      <Divider />

      <div data-home-stage="feed" className="flex flex-col gap-24">
        {visibleToday.length > 0 ? (
          <ArticleSection label="Today">
            {visibleToday.map((article) => (
              <PresenceItem key={article.id}>
                <FeedArticle article={article} />
              </PresenceItem>
            ))}
          </ArticleSection>
        ) : null}
        {visibleYesterday.length > 0 ? (
          <ArticleSection label="Yesterday">
            {visibleYesterday.map((article) => (
              <PresenceItem key={article.id}>
                <FeedArticle article={article} />
              </PresenceItem>
            ))}
          </ArticleSection>
        ) : null}
        <EmptyCopy
          show={visibleToday.length === 0 && visibleYesterday.length === 0}
        >
          No articles match these filters.
        </EmptyCopy>
      </div>
    </CenterContainer>
  )
}
