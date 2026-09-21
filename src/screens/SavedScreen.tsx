import { useMemo, useState } from "react"
import { PlaylistCard, SearchInput } from "@ds"
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
import { articles, briefs, topics } from "@/data"
import { EmptyCopy, PresenceItem } from "@/motion"
import { useAppNav } from "@/navigation"
import { FeedArticle } from "./FeedArticle"
import { useFeedFilter } from "./useFeedFilter"
import { DailyBriefVerticalCard } from "@ds"

export function SavedScreen() {
  const { savedIds } = useAppNav()
  const [query, setQuery] = useState("")
  const filter = useFeedFilter()
  const briefsRail = useRail()
  const topicsRail = useRail()

  const savedFeed = useMemo(
    () =>
      articles.filter(
        (article) =>
          savedIds.has(article.id) &&
          article.title.toLowerCase().includes(query.toLowerCase()) &&
          filter.match(article),
      ),
    [savedIds, query, filter.match],
  )

  const savedTopics = topics.slice(0, 2)
  const savedBriefs = briefs.slice(0, 4)

  return (
    <CenterContainer>
      <PageHeader
        title="Saved"
        toolbar={
          <ToolBar
            actions={filter.control}
          >
            <SearchInput
              placeholder="Find in saved..."
              shortcut="/"
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              className="flex-1"
            />
          </ToolBar>
        }
      />

      <section className="flex flex-col gap-6">
        <SectionHeader
          actions={
            <RailArrows
              rail={briefsRail}
              prevLabel="Previous daily briefs"
              nextLabel="Next daily briefs"
            />
          }
        >
          Daily Briefs
        </SectionHeader>
        <CardRail rail={briefsRail}>
          {savedBriefs.map((brief) => (
            <DailyBriefVerticalCard
              key={brief.id}
              title={brief.title}
              month={brief.month}
              date={brief.date}
              imageSrc={brief.imageSrc}
              href={`#/brief/${brief.id}`}
              className="w-180"
            />
          ))}
        </CardRail>
      </section>

      <section className="flex flex-col gap-6">
        <SectionHeader
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
          {savedTopics.map((topic) => (
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

      {savedFeed.length > 0 ? (
        <ArticleSection label="Today">
          {savedFeed.map((article) => (
            <PresenceItem key={article.id}>
              <FeedArticle article={article} />
            </PresenceItem>
          ))}
        </ArticleSection>
      ) : (
        <EmptyCopy show>
          Nothing saved yet. Bookmark an article and it will land here.
        </EmptyCopy>
      )}
    </CenterContainer>
  )
}
