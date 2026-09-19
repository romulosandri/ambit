/**
 * Effect styles from Figma, converted to CSS `box-shadow`.
 *
 * Mapping used (this is the part that usually goes wrong):
 * - Figma `offset.x/y` → CSS offset-x / offset-y
 * - Figma `radius` → CSS blur-radius (not spread)
 * - Figma `spread` → CSS spread-radius (can be negative)
 * - `INNER_SHADOW` → `inset`
 * - `visible: false` layers are omitted
 * - Layers keep Figma order (first = painted on top in CSS)
 */
export type ShadowLayer = {
  type: "drop" | "inner"
  x: number
  y: number
  blur: number
  spread: number
  color: string
}

function layerToCss(layer: ShadowLayer): string {
  const inset = layer.type === "inner" ? "inset " : ""
  return `${inset}${layer.x}px ${layer.y}px ${layer.blur}px ${layer.spread}px ${layer.color}`
}

function shadowFromLayers(layers: readonly ShadowLayer[]): string {
  return layers.map(layerToCss).join(", ")
}

export const shadowLayers = {
  card: [
    { type: "drop", x: 0, y: 1, blur: 2, spread: 0, color: "rgba(0, 0, 0, 0.05)" },
    { type: "inner", x: 0, y: -1, blur: 0, spread: 0, color: "rgba(0, 0, 0, 0.1)" },
  ],
  component: [
    { type: "drop", x: 0, y: 1, blur: 2, spread: 0, color: "rgba(0, 0, 0, 0.05)" },
    { type: "inner", x: 0, y: -1, blur: 0, spread: 0, color: "rgba(0, 0, 0, 0.08)" },
  ],
  focus: [
    { type: "drop", x: 0, y: 0, blur: 0, spread: 3, color: "rgba(218, 129, 93, 0.4)" },
    { type: "drop", x: 0, y: 0, blur: 0, spread: 1, color: "rgba(44, 35, 33, 1)" },
    { type: "drop", x: 0, y: 1, blur: 2, spread: 0, color: "rgba(0, 0, 0, 0.05)" },
    { type: "inner", x: 0, y: -1, blur: 0, spread: 0, color: "rgba(0, 0, 0, 0.1)" },
  ],
  destructiveFocus: [
    { type: "drop", x: 0, y: 0, blur: 0, spread: 3, color: "rgba(238, 110, 108, 0.4)" },
    { type: "drop", x: 0, y: 0, blur: 0, spread: 1, color: "rgba(44, 35, 33, 1)" },
    { type: "drop", x: 0, y: 1, blur: 2, spread: 0, color: "rgba(0, 0, 0, 0.05)" },
    { type: "inner", x: 0, y: -1, blur: 0, spread: 0, color: "rgba(0, 0, 0, 0.1)" },
  ],
  miscFocus: [
    { type: "drop", x: 0, y: 0, blur: 0, spread: 3, color: "rgba(218, 129, 93, 0.4)" },
    { type: "drop", x: 0, y: 0, blur: 0, spread: 1, color: "rgba(44, 35, 33, 1)" },
  ],
  modalSm: [
    { type: "drop", x: 0, y: 0, blur: 0, spread: 1, color: "rgba(217, 210, 206, 0.1)" },
    { type: "drop", x: 0, y: 12, blur: 12, spread: -6, color: "rgba(0, 0, 0, 0.04)" },
    { type: "drop", x: 0, y: 6, blur: 6, spread: -3, color: "rgba(0, 0, 0, 0.04)" },
    { type: "drop", x: 0, y: 3, blur: 3, spread: -1.5, color: "rgba(0, 0, 0, 0.04)" },
    { type: "drop", x: 0, y: 1, blur: 1, spread: -0.5, color: "rgba(0, 0, 0, 0.04)" },
  ],
  modalMd: [
    { type: "drop", x: 0, y: 0, blur: 0, spread: 1, color: "rgba(217, 210, 206, 0.1)" },
    { type: "drop", x: 0, y: 12, blur: 12, spread: 0, color: "rgba(0, 0, 0, 0.04)" },
    { type: "drop", x: 0, y: 6, blur: 6, spread: 0, color: "rgba(0, 0, 0, 0.04)" },
    { type: "drop", x: 0, y: 3, blur: 3, spread: 0, color: "rgba(0, 0, 0, 0.04)" },
    { type: "drop", x: 0, y: 1, blur: 1, spread: -0.5, color: "rgba(0, 0, 0, 0.04)" },
  ],
  modalLg: [
    { type: "drop", x: 0, y: 0, blur: 0, spread: 1, color: "rgba(217, 210, 206, 0.1)" },
    { type: "drop", x: 0, y: 16, blur: 16, spread: 0, color: "rgba(0, 0, 0, 0.04)" },
    { type: "drop", x: 0, y: 6, blur: 6, spread: 0, color: "rgba(0, 0, 0, 0.04)" },
    { type: "drop", x: 0, y: 12, blur: 12, spread: 0, color: "rgba(0, 0, 0, 0.04)" },
    { type: "drop", x: 0, y: 3, blur: 3, spread: 0, color: "rgba(0, 0, 0, 0.04)" },
    { type: "drop", x: 0, y: 1, blur: 1, spread: -0.5, color: "rgba(0, 0, 0, 0.04)" },
  ],
  inputFocus: [
    { type: "drop", x: 0, y: 0, blur: 0, spread: 3, color: "rgba(217, 210, 206, 0.1)" },
    { type: "inner", x: 0, y: 0, blur: 0, spread: 1, color: "rgba(217, 210, 206, 0.45)" },
  ],
  switchHandle: [
    { type: "drop", x: 0, y: 1, blur: 3, spread: 0, color: "rgba(0, 0, 0, 0.08)" },
    { type: "drop", x: 0, y: 1, blur: 2, spread: -1, color: "rgba(0, 0, 0, 0.08)" },
  ],
} as const satisfies Record<string, readonly ShadowLayer[]>

export const shadow = {
  card: shadowFromLayers(shadowLayers.card),
  component: shadowFromLayers(shadowLayers.component),
  focus: shadowFromLayers(shadowLayers.focus),
  destructiveFocus: shadowFromLayers(shadowLayers.destructiveFocus),
  miscFocus: shadowFromLayers(shadowLayers.miscFocus),
  modalSm: shadowFromLayers(shadowLayers.modalSm),
  modalMd: shadowFromLayers(shadowLayers.modalMd),
  modalLg: shadowFromLayers(shadowLayers.modalLg),
  inputFocus: shadowFromLayers(shadowLayers.inputFocus),
  switchHandle: shadowFromLayers(shadowLayers.switchHandle),
} as const

export type ShadowToken = keyof typeof shadow
