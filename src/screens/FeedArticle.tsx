import { ArticleCard } from "@ds"
import { toCard, type Article } from "@/data"
import { useAppNav } from "@/navigation"

export function FeedArticle({ article }: { article: Article }) {
  const { savedIds, toggleSaved } = useAppNav()
  const card = toCard(article)

  return (
    <ArticleCard
      title={card.title}
      source={card.source}
      logoSrc={card.logoSrc}
      type={card.type}
      person={card.person}
      channel={card.channel}
      sources={card.sources}
      readTime={card.readTime}
      time={card.time}
      imageSrc={card.imageSrc}
      href={card.href}
      saved={savedIds.has(article.id)}
      onSave={() => toggleSaved(article.id)}
    />
  )
}
