/**
 * Corner radius from Figma collection "Radius" (mode: Rounded).
 */
export const radius = {
  none: 0,
  "2xs": 4,
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 28,
  "3xl": 36,
  full: 9999,
  card: {
    none: 0,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
  },
} as const

export type RadiusToken = Exclude<keyof typeof radius, "card">
