import { AudioButton, Cover, Divider } from "@ds"
import {
  AppShell,
  BottomContainer,
  CenterContainer,
} from "@/layout"
import { articlesForBrief, briefsById, todayBrief } from "@/data"
import { useAppNav } from "@/navigation"
import { AppBackButton } from "./AppBackButton"
import { AppSidebar } from "./AppSidebar"
import { FeedArticle } from "./FeedArticle"
import { useComposer } from "./useComposer"
import { useFeedFilter } from "./useFeedFilter"

export function DailyBriefDetailsScreen() {
  const { route } = useAppNav()
  const composer = useComposer()
  const filter = useFeedFilter()
  const briefId = route.name === "brief" ? route.id : todayBrief.id
  const brief = briefsById[briefId] ?? todayBrief
  const feed = articlesForBrief(brief.id).filter(filter.match)

  return (
    <AppShell
      sidebar={<AppSidebar activeItem="daily-briefs" />}
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
        <div className="flex items-center gap-12 px-8 max-md:flex-wrap">
          <Cover src={brief.imageSrc} size="xs" />
          <h1 className="text-display-small text-text-default min-w-0">
            {brief.headline}
          </h1>
          <div className="ml-auto max-md:ml-0">{filter.control}</div>
        </div>
        <p className="text-body-default text-text-subtle px-8">{brief.summary}</p>
        <div className="px-8">
          <AudioButton duration={brief.duration} />
        </div>
        <Divider />
        <div className="flex flex-col gap-20">
          {feed.length > 0 ? (
            feed.map((article) => (
              <FeedArticle key={article.id} article={article} />
            ))
          ) : (
            <p className="text-body-default text-text-muted px-8">
              No articles match these filters.
            </p>
          )}
        </div>
      </CenterContainer>
    </AppShell>
  )
}
