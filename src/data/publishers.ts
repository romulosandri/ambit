import { publisherLogos } from "./assets"
import type { Publisher } from "./types"

export const publishers: Publisher[] = [
  {
    id: "the-verge",
    name: "The Verge",
    logoSrc: publisherLogos["the-verge"],
    url: "https://www.theverge.com",
    subscribed: true,
  },
  {
    id: "wired",
    name: "Wired",
    logoSrc: publisherLogos.wired,
    url: "https://www.wired.com",
    subscribed: true,
  },
  {
    id: "bloomberg",
    name: "Bloomberg",
    logoSrc: publisherLogos.bloomberg,
    url: "https://www.bloomberg.com",
    subscribed: true,
  },
  {
    id: "reuters",
    name: "Reuters",
    logoSrc: publisherLogos.reuters,
    url: "https://www.reuters.com",
    subscribed: true,
  },
  {
    id: "the-guardian",
    name: "The Guardian",
    logoSrc: publisherLogos["the-guardian"],
    url: "https://www.theguardian.com",
  },
  {
    id: "financial-times",
    name: "Financial Times",
    logoSrc: publisherLogos["financial-times"],
    url: "https://www.ft.com",
  },
  {
    id: "axios",
    name: "Axios",
    logoSrc: publisherLogos.axios,
    url: "https://www.axios.com",
  },
  {
    id: "techcrunch",
    name: "TechCrunch",
    logoSrc: publisherLogos.techcrunch,
    url: "https://techcrunch.com",
  },
  {
    id: "ars-technica",
    name: "Ars Technica",
    logoSrc: publisherLogos["ars-technica"],
    url: "https://arstechnica.com",
  },
  {
    id: "cnbc",
    name: "CNBC",
    logoSrc: publisherLogos.cnbc,
    url: "https://www.cnbc.com",
  },
  {
    id: "forbes",
    name: "Forbes",
    logoSrc: publisherLogos.forbes,
    url: "https://www.forbes.com",
  },
  {
    id: "the-economist",
    name: "The Economist",
    logoSrc: publisherLogos["the-economist"],
    url: "https://www.economist.com",
  },
  {
    id: "wsj",
    name: "Wall Street Journal",
    logoSrc: publisherLogos.wsj,
    url: "https://www.wsj.com",
  },
  {
    id: "the-information",
    name: "The Information",
    logoSrc: publisherLogos["the-information"],
    url: "https://www.theinformation.com",
  },
  {
    id: "platformer",
    name: "Platformer",
    logoSrc: publisherLogos.platformer,
    url: "https://www.platformer.news",
  },
  {
    id: "stratechery",
    name: "Stratechery",
    logoSrc: publisherLogos.stratechery,
    url: "https://stratechery.com",
  },
  {
    id: "lennys",
    name: "Lenny's Newsletter",
    logoSrc: publisherLogos.lennys,
    url: "https://www.lennysnewsletter.com",
  },
]

export const publishersById: Record<string, Publisher> = Object.fromEntries(
  publishers.map((publisher) => [publisher.id, publisher]),
)
