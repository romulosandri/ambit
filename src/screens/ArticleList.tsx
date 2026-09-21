import type { Article } from "@/data"
import { FeedArticle } from "./FeedArticle"

export function ArticleList({ articles }: { articles: Article[] }) {
  return articles.map((article) => (
    <FeedArticle key={article.id} article={article} />
  ))
}
