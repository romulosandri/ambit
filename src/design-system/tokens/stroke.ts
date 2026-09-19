/**
 * Stroke widths from Figma collection "Stroke".
 */
export const stroke = {
  sm: 0.5,
  default: 1,
  md: 1.5,
  lg: 2,
  xl: 3,
  "2xl": 4,
} as const

export type StrokeToken = keyof typeof stroke
