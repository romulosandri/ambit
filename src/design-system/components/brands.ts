/** Publication marks shipped by the Figma `publication-logos` component. */
export const publicationNames = [
  "The Verge",
  "TechCrunch",
  "Wired",
  "The Information",
  "Ars Technica",
  "CNET",
  "Axios",
  "Bloomberg",
  "Reuters",
  "Financial Times",
  "Wall Street Journal",
  "The Economist",
  "CNBC",
  "Forbes",
] as const

/** Social marks shipped by the Figma `social-logos` component. */
export const socialNames = [
  "Facebook",
  "Instagram",
  "Twitter (X)",
  "Substack",
  "Reddit",
  "Medium",
  "LinkedIn",
] as const

export type PublicationName = (typeof publicationNames)[number]
export type SocialName = (typeof socialNames)[number]
