import { primitiveColor } from "./color-primitive"
import { semanticColor } from "./color-semantic"
import { radius } from "./radius"
import { shadow, shadowLayers } from "./shadow"
import { spacing } from "./spacing"
import { stroke } from "./stroke"
import {
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  textStyles,
} from "./typography"

export const tokens = {
  color: {
    primitive: primitiveColor,
    semantic: semanticColor,
  },
  spacing,
  radius,
  stroke,
  shadow,
  shadowLayers,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  textStyles,
} as const

export type Tokens = typeof tokens

export {
  primitiveColor,
  semanticColor,
  spacing,
  radius,
  stroke,
  shadow,
  shadowLayers,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  textStyles,
}

export type { PrimitiveColor } from "./color-primitive"
export type { SemanticColor, SemanticToken } from "./color-semantic"
export type { ShadowLayer, ShadowToken } from "./shadow"
export type { SpacingToken } from "./spacing"
export type { RadiusToken } from "./radius"
export type { StrokeToken } from "./stroke"
export type { TextStyleToken } from "./typography"
