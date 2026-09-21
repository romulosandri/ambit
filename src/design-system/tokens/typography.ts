/**
 * Typography from Figma collections "Font Family" + "Font Size"
 * and local text styles. Desktop is the default; mobile overrides live in CSS.
 */
export const fontFamily = {
  headline: '"Concrette", "Concrette M-TRIAL", Georgia, serif',
  body: '"Saans", "Saans-TRIAL", system-ui, sans-serif',
  reading: '"IBM Plex Sans", system-ui, sans-serif',
} as const

export const fontSize = {
  xs: { desktop: 12, mobile: 12 },
  sm: { desktop: 14, mobile: 14 },
  md: { desktop: 16, mobile: 16 },
  lg: { desktop: 18, mobile: 16 },
  xl: { desktop: 20, mobile: 18 },
  "2xl": { desktop: 24, mobile: 20 },
  "3xl": { desktop: 30, mobile: 24 },
  "4xl": { desktop: 36, mobile: 30 },
  "5xl": { desktop: 48, mobile: 36 },
  "6xl": { desktop: 60, mobile: 48 },
  "7xl": { desktop: 72, mobile: 60 },
  "8xl": { desktop: 96, mobile: 72 },
  "9xl": { desktop: 128, mobile: 96 },
} as const

export const fontWeight = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const

export const lineHeight = {
  3: { desktop: 12, mobile: 12 },
  4: { desktop: 16, mobile: 16 },
  5: { desktop: 20, mobile: 20 },
  6: { desktop: 24, mobile: 24 },
  7: { desktop: 28, mobile: 24 },
  8: { desktop: 32, mobile: 28 },
  9: { desktop: 36, mobile: 32 },
  10: { desktop: 40, mobile: 36 },
  11: { desktop: 48, mobile: 40 },
  12: { desktop: 60, mobile: 48 },
  13: { desktop: 72, mobile: 60 },
  14: { desktop: 96, mobile: 72 },
  15: { desktop: 128, mobile: 96 },
} as const

/** Letter-spacing scale from Figma (pixel values, not em). */
export const letterSpacing = {
  tighter: -0.8,
  tight: -0.4,
  normal: 0,
  wide: 0.4,
  wider: 0.8,
  widest: 1.6,
} as const

export type TextStyleDefinition = {
  fontFamily: keyof typeof fontFamily
  fontSize: number
  fontWeight: number
  /** Unitless CSS line-height, from Figma PERCENT / 100. */
  lineHeight: number
  /** CSS letter-spacing. Percent styles use `em`; scale styles use `px`. */
  letterSpacing: string
}

export const textStyles = {
  displayXl: {
    fontFamily: "headline",
    fontSize: 48,
    fontWeight: 400,
    lineHeight: 0.8,
    letterSpacing: "-0.02em",
  },
  displayLarge: {
    fontFamily: "headline",
    fontSize: 36,
    fontWeight: 400,
    lineHeight: 0.8,
    letterSpacing: "-0.02em",
  },
  displaySmall: {
    fontFamily: "headline",
    fontSize: 30,
    fontWeight: 400,
    lineHeight: 0.8,
    letterSpacing: "-0.01em",
  },
  headingPage: {
    fontFamily: "headline",
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "0em",
  },
  headingSection: {
    fontFamily: "headline",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "0em",
  },
  headingSubsection: {
    fontFamily: "body",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "0em",
  },
  headingArticle: {
    fontFamily: "headline",
    fontSize: 32,
    fontWeight: 400,
    lineHeight: 1.2,
    letterSpacing: "0.02em",
  },
  bodyLarge: {
    fontFamily: "body",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.24,
    letterSpacing: "0em",
  },
  bodyDefault: {
    fontFamily: "body",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.2,
    letterSpacing: "0em",
  },
  bodySmall: {
    fontFamily: "body",
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1.25,
    letterSpacing: "0em",
  },
  bodyReading: {
    fontFamily: "reading",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0em",
  },
  bodyArticle: {
    fontFamily: "reading",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.02em",
  },
} as const satisfies Record<string, TextStyleDefinition>

export type TextStyleToken = keyof typeof textStyles
