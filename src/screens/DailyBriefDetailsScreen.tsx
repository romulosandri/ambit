import { AudioButton, Cover, Divider } from "@ds"
import { CenterContainer } from "@/layout"
import { articlesForBrief, briefsById, todayBrief } from "@/data"
import { EmptyCopy, gsap, prefersReducedMotion, PresenceItem, PresenceList, useGSAP } from "@/motion"
import { useAppNav } from "@/navigation"
import { FeedArticle } from "./FeedArticle"
import { useFeedFilter } from "./useFeedFilter"
import { useRef } from "react"

export function DailyBriefDetailsScreen() {
  const { route } = useAppNav()
  const filter = useFeedFilter()
  const rootRef = useRef<HTMLDivElement>(null)
  const briefId = route.name === "brief" ? route.id : todayBrief.id
  const brief = briefsById[briefId] ?? todayBrief
  const feed = articlesForBrief(brief.id).filter(filter.match)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from("[data-read-stage='hero']", { y: 18, opacity: 0, duration: 0.5 })
      tl.from(
        "[data-read-stage='audio']",
        { y: 12, opacity: 0, duration: 0.35 },
        "-=0.28",
      )
      tl.from(
        "[data-read-stage='feed']",
        { y: 14, opacity: 0, duration: 0.4 },
        "-=0.2",
      )
    },
    { scope: rootRef },
  )

  return (
    <CenterContainer ref={rootRef} hasDock>
      <div data-read-stage="hero" className="flex flex-col gap-12">
        <div className="flex items-center gap-12 px-8 max-md:flex-wrap">
          <Cover src={brief.imageSrc} size="xs" />
          <h1 className="text-display-small text-text-default min-w-0">
            {brief.headline}
          </h1>
          <div className="ml-auto max-md:ml-0">{filter.control}</div>
        </div>
        <p className="text-body-default text-text-subtle px-8">{brief.summary}</p>
      </div>
      <div data-read-stage="audio" className="px-8">
        <AudioButton duration={brief.duration} />
      </div>
      <Divider />
      <div data-read-stage="feed">
        <PresenceList className="flex flex-col gap-20">
          {feed.map((article) => (
            <PresenceItem key={article.id}>
              <FeedArticle article={article} />
            </PresenceItem>
          ))}
        </PresenceList>
        <EmptyCopy show={feed.length === 0}>
          No articles match these filters.
        </EmptyCopy>
      </div>
    </CenterContainer>
  )
}
