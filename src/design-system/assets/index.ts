import ambitLogo from "./ambit-logo.png"
import ambitMark from "./ambit-mark.svg"
import flower01 from "./covers/flower-01.png"
import flower02 from "./covers/flower-02.png"
import flower03 from "./covers/flower-03.png"
import flower04 from "./covers/flower-04.png"
import flower05 from "./covers/flower-05.png"
import flower06 from "./covers/flower-06.png"
import flower07 from "./covers/flower-07.png"
import flower08 from "./covers/flower-08.png"
import flower09 from "./covers/flower-09.png"
import flower10 from "./covers/flower-10.png"
import flower11 from "./covers/flower-11.png"
import flower12 from "./covers/flower-12.png"
import homeFlower from "./covers/home-flower.jpg"
import lauraLee from "./avatars/laura-lee.jpg"
import sarahGuo from "./avatars/sarah-guo.png"
import applePark from "./perspectives/apple-park.jpg"
import berlaymont from "./perspectives/berlaymont.jpg"
import karaSwisher from "./perspectives/kara-swisher.jpg"
import timCook from "./perspectives/tim-cook.jpg"
import facebook from "./social/facebook.png"
import instagram from "./social/instagram.png"
import linkedin from "./social/linkedin.png"
import medium from "./social/medium.png"
import reddit from "./social/reddit.png"
import substack from "./social/substack.png"
import x from "./social/x.png"
import type { SocialName } from "../components/brands"

export { ambitLogo, ambitMark, homeFlower, lauraLee, sarahGuo }

export const perspectivePhotos = {
  applePark,
  berlaymont,
  karaSwisher,
  timCook,
} as const

/** Marks from the Figma `social-logos` component (`15177:76327`). */
export const socialLogos: Record<SocialName, string> = {
  Facebook: facebook,
  Instagram: instagram,
  "Twitter (X)": x,
  Substack: substack,
  Reddit: reddit,
  Medium: medium,
  LinkedIn: linkedin,
}

/**
 * The `bg-flower` artwork set (`15212:2632`, variants `number=1…12`) used as
 * cover art for daily briefs and topics.
 */
export const flowerCovers = [
  flower01,
  flower02,
  flower03,
  flower04,
  flower05,
  flower06,
  flower07,
  flower08,
  flower09,
  flower10,
  flower11,
  flower12,
] as const

/** Picks a stable cover for a given key, so a topic keeps its artwork. */
export function flowerCoverFor(key: string): string {
  let hash = 0
  for (let index = 0; index < key.length; index += 1) {
    hash = (hash * 31 + key.charCodeAt(index)) % 997
  }
  return flowerCovers[hash % flowerCovers.length]
}
