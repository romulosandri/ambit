import { useCallback, useState } from "react"
import {
  FilterMenu,
  emptyFilterValue,
  type FilterChannelOption,
  type FilterOption,
  type FilterValue,
} from "@ds"
import {
  matchesArticleFilter,
  subscribedSources,
  homeTopics,
  type Article,
} from "@/data"
import { useAppNav } from "@/navigation"

const channelOptions: FilterChannelOption[] = [
  { name: "LinkedIn", label: "LinkedIn" },
  { name: "Reddit", label: "Reddit" },
  { name: "Medium", label: "Medium" },
  { name: "Substack", label: "Substack" },
  { name: "Facebook", label: "Facebook" },
  { name: "Instagram", label: "Instagram" },
  { name: "Twitter (X)", label: "X" },
]

const topicOptions: FilterOption[] = homeTopics.map((topic) => ({
  id: topic.id,
  label: topic.title,
  imageSrc: topic.imageSrc,
}))

const sourceOptions: FilterOption[] = subscribedSources.map((source) =>
  "photoSrc" in source
    ? {
        id: `person-${source.id}`,
        label: source.name,
        imageSrc: source.photoSrc,
      }
    : {
        id: `publisher-${source.id}`,
        label: source.name,
        imageSrc: source.logoSrc,
      },
)

export function useFeedFilter() {
  const { openSubscription } = useAppNav()
  const [value, setValue] = useState<FilterValue>(emptyFilterValue)

  const control = (
    <FilterMenu
      value={value}
      onChange={setValue}
      topics={topicOptions}
      sources={sourceOptions}
      channels={channelOptions}
      onCreateTopic={() => openSubscription("topic")}
      onCreateSource={() => openSubscription("source")}
    />
  )

  const match = useCallback(
    (article: Article) => matchesArticleFilter(article, value),
    [value],
  )

  return { value, match, control }
}
