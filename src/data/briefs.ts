import { flowerCoverFor } from "@ds"
import type { Brief } from "./types"

export const briefs: Brief[] = [
  {
    id: "brief-sep-21",
    title: "AI Trust",
    month: "September",
    date: "Sunday, 21",
    headline: "Sunday, 21",
    summary:
      "Huang told CBS there is 0% chance AI ends the world by 2030. Amodei and Altman want independent evaluators. OpenAI filed its first Article 55 report over a German wiki. von der Leyen is inviting the labs in.",
    duration: "22:04",
    imageSrc: flowerCoverFor("Sunday, 21"),
    articleIds: [
      "huang-zero-percent",
      "leaders-split-doom",
      "openai-article-55",
      "von-der-leyen-pause",
      "amodei-pace-frontier",
      "sarah-guo-agents",
    ],
    featured: true,
    saved: true,
  },
  {
    id: "brief-sep-20",
    title: "Frontier Regulation",
    month: "September",
    date: "Saturday, 20",
    headline: "Saturday, 20",
    summary:
      "Anthropic published a threat report on Claude misuse across ministries and parties. It is not obvious they filed Article 55. Schaake's test: if delay is free, delay becomes policy.",
    duration: "18:11",
    imageSrc: flowerCoverFor("Saturday, 20"),
    articleIds: [
      "anthropic-threat-intel",
      "schaake-enforcement",
      "openai-article-55",
    ],
    saved: true,
  },
  {
    id: "brief-sep-19",
    title: "AI Agents",
    month: "September",
    date: "Friday, 19",
    headline: "Friday, 19",
    summary:
      "Microsoft is shipping Copilot as teammates with write access. Willison's note on the wiki occupation: an agent does not need to be superhuman. It needs a form.",
    duration: "16:40",
    imageSrc: flowerCoverFor("Friday, 19"),
    articleIds: [
      "copilot-teammates",
      "nadella-copilot-post",
      "willison-wiki-agents",
      "schneier-security",
    ],
    saved: true,
  },
  {
    id: "brief-sep-18",
    title: "EU Digital Markets",
    month: "September",
    date: "Thursday, 18",
    headline: "Thursday, 18",
    summary:
      "Apple is still blaming the DMA for Intelligence and Live Translation staying gated in the EU. Doctorow and Bradford read that as the garden wall talking.",
    duration: "14:22",
    imageSrc: flowerCoverFor("Thursday, 18"),
    articleIds: ["apple-dma-delays"],
    saved: true,
  },
  {
    id: "brief-sep-17",
    title: "Accountability",
    month: "September",
    date: "Wednesday, 17",
    headline: "Wednesday, 17",
    summary:
      "Raji asks who hires the independent evaluator. Gebru notes a frontier-only slowdown leaves deployed systems untouched. Hao tracks who still has a job after they say the number.",
    duration: "19:05",
    imageSrc: flowerCoverFor("Wednesday, 17"),
    articleIds: ["raji-evals", "gebru-dair", "hao-split-inside", "whittaker-room"],
  },
  {
    id: "brief-sep-16",
    title: "Climate Compute",
    month: "September",
    date: "Tuesday, 16",
    headline: "Tuesday, 16",
    summary:
      "Luccioni's condition for a pause: publish the energy numbers for the run you still do. Data centers do not wait for the CBS interview.",
    duration: "12:48",
    imageSrc: flowerCoverFor("Tuesday, 16"),
    articleIds: ["luccioni-pacing-carbon"],
  },
  {
    id: "brief-sep-15",
    title: "Chip Supply",
    month: "September",
    date: "Monday, 15",
    headline: "Monday, 15",
    summary:
      "Thompson: whoever owns the agent layer owns the customer. Huang's 0% is also a utilization forecast for Blackwell.",
    duration: "15:33",
    imageSrc: flowerCoverFor("Monday, 15"),
    articleIds: ["thompson-agent-layer", "huang-zero-percent"],
  },
  {
    id: "brief-sep-14",
    title: "California",
    month: "September",
    date: "Sunday, 14",
    headline: "Sunday, 14",
    summary:
      "SB 53 is the state filling a federal gap: publish the framework, report the incident, protect the whistleblower. The definitions are where the lawyers will live.",
    duration: "13:10",
    imageSrc: flowerCoverFor("Sunday, 14"),
    articleIds: ["sb53-california"],
  },
]

export const briefsById: Record<string, Brief> = Object.fromEntries(
  briefs.map((brief) => [brief.id, brief]),
)

export const todayBrief = briefs[0]
