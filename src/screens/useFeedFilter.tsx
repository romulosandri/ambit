import { useCallback, useState } from "react"
import {
  FilterMenu,
  emptyFilterValue,
  socialNames,
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

const channelOptions: FilterChannelOption[] = socialNames.map((name) => ({
  name,
  label: name === "Twitter (X)" ? "X" : name,
}))

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
  const { navigate } = useAppNav()
  const [value, setValue] = useState<FilterValue>(emptyFilterValue)

  const control = (
    <FilterMenu
      value={value}
      onChange={setValue}
      topics={topicOptions}
      sources={sourceOptions}
      channels={channelOptions}
      onCreateTopic={() =>
        navigate({ name: "subscriptions", modal: "topic" })
      }
      onCreateSource={() =>
        navigate({ name: "subscriptions", modal: "source" })
      }
    />
  )

  const match = useCallback(
    (article: Article) => matchesArticleFilter(article, value),
    [value],
  )

  return { value, match, control }
}
