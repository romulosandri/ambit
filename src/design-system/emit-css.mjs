import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = dirname(fileURLToPath(import.meta.url))

function extractObjectLiteral(src, exportName) {
  const marker = `export const ${exportName} = `
  const start = src.indexOf(marker)
  if (start === -1) throw new Error(`Missing ${exportName}`)
  const i = src.indexOf("{", start)
  let depth = 0
  for (let j = i; j < src.length; j += 1) {
    const char = src[j]
    if (char === "{") depth += 1
    else if (char === "}") {
      depth -= 1
      if (depth === 0) return src.slice(i, j + 1)
    }
  }
  throw new Error(`Unclosed object for ${exportName}`)
}

function loadTsObject(fileName, exportName) {
  const src = readFileSync(join(root, "tokens", fileName), "utf8")
  const body = extractObjectLiteral(src, exportName)
  const prelude =
    fileName === "color-semantic.ts"
      ? "const t = (alias, value) => ({ alias, value });\n"
      : ""
  return new Function(`${prelude}return (${body})`)()
}

function kebab(value) {
  return String(value)
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replaceAll(" ", "-")
    .toLowerCase()
}

function walk(value, path, visit) {
  if (value && typeof value === "object" && "alias" in value && "value" in value) {
    visit(path, value)
    return
  }
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      walk(child, [...path, kebab(key)], visit)
    }
    return
  }
  visit(path, value)
}

function tokenName(path) {
  return path.join("-")
}

function aliasToCssVar(alias) {
  return `var(--ds-color-${alias.replaceAll("/", "-")})`
}

function layerToCss(layer) {
  const inset = layer.type === "inner" ? "inset " : ""
  return `${inset}${layer.x}px ${layer.y}px ${layer.blur}px ${layer.spread}px ${layer.color}`
}

const primitiveColor = loadTsObject("color-primitive.ts", "primitiveColor")
const semanticColor = loadTsObject("color-semantic.ts", "semanticColor")
const spacing = loadTsObject("spacing.ts", "spacing")
const radius = loadTsObject("radius.ts", "radius")
const stroke = loadTsObject("stroke.ts", "stroke")
const shadowLayers = loadTsObject("shadow.ts", "shadowLayers")
const shadow = Object.fromEntries(
  Object.entries(shadowLayers).map(([key, layers]) => [
    key,
    layers.map(layerToCss).join(", "),
  ]),
)
const fontFamily = loadTsObject("typography.ts", "fontFamily")
const fontSize = loadTsObject("typography.ts", "fontSize")
const fontWeight = loadTsObject("typography.ts", "fontWeight")
const letterSpacing = loadTsObject("typography.ts", "letterSpacing")
const lineHeight = loadTsObject("typography.ts", "lineHeight")
const textStyles = loadTsObject("typography.ts", "textStyles")

const primitiveLines = []
const primitiveTheme = []
walk(primitiveColor, [], (path, value) => {
  if (typeof value !== "string") return
  const name = tokenName(path)
  primitiveLines.push(`  --ds-color-${name}: ${value};`)
  primitiveTheme.push(`  --color-${name}: var(--ds-color-${name});`)
})

const semanticLines = []
const semanticTheme = []
walk(semanticColor, [], (path, value) => {
  if (!value || typeof value !== "object" || !("alias" in value)) return
  const name = tokenName(path)
  semanticLines.push(`  --ds-color-${name}: ${aliasToCssVar(value.alias)};`)
  semanticTheme.push(`  --color-${name}: var(--ds-color-${name});`)
})

const spacingLines = Object.entries(spacing).map(
  ([key, value]) => `  --ds-space-${key}: ${value}px;`,
)

const radiusLines = []
const radiusTheme = []
walk(radius, [], (path, value) => {
  if (typeof value !== "number") return
  const name = tokenName(path)
  radiusLines.push(`  --ds-radius-${name}: ${value}px;`)
  radiusTheme.push(`  --radius-${name}: var(--ds-radius-${name});`)
})

const strokeLines = Object.entries(stroke).map(
  ([key, value]) => `  --ds-stroke-${key}: ${value}px;`,
)
const strokeTheme = Object.keys(stroke).map(
  (key) => `  --stroke-width-${key}: var(--ds-stroke-${key});`,
)

const shadowLines = Object.entries(shadow).map(
  ([key, value]) => `  --ds-shadow-${kebab(key)}: ${value};`,
)
const shadowTheme = Object.keys(shadow).map(
  (key) => `  --shadow-${kebab(key)}: var(--ds-shadow-${kebab(key)});`,
)

const fontFamilyLines = Object.entries(fontFamily).map(
  ([key, value]) => `  --ds-font-${key}: ${value};`,
)

const fontSizeRoot = []
const fontSizeMobile = []
const fontSizeTheme = []
for (const [key, value] of Object.entries(fontSize)) {
  fontSizeRoot.push(`  --ds-font-size-${key}: ${value.desktop}px;`)
  if (value.mobile !== value.desktop) {
    fontSizeMobile.push(`    --ds-font-size-${key}: ${value.mobile}px;`)
  }
  fontSizeTheme.push(`  --text-${key}: var(--ds-font-size-${key});`)
  /* Size utilities must not impose a line-height. Figma leading lives on
     the text-style classes (`text-body-default`, `text-display-small`, …). */
  fontSizeTheme.push(`  --text-${key}--line-height: normal;`)
}
fontSizeTheme.push(`  --text-base: var(--ds-font-size-md);`)
fontSizeTheme.push(`  --text-base--line-height: normal;`)

const fontWeightLines = Object.entries(fontWeight).map(
  ([key, value]) => `  --ds-font-weight-${key}: ${value};`,
)
const fontWeightTheme = Object.keys(fontWeight).map(
  (key) => `  --font-weight-${key}: var(--ds-font-weight-${key});`,
)

const trackingLines = Object.entries(letterSpacing).map(
  ([key, value]) => `  --ds-tracking-${key}: ${value}px;`,
)
const trackingTheme = Object.keys(letterSpacing).map(
  (key) => `  --tracking-${key}: var(--ds-tracking-${key});`,
)

const leadingRoot = []
const leadingMobile = []
const leadingTheme = []
for (const [key, value] of Object.entries(lineHeight)) {
  leadingRoot.push(`  --ds-leading-${key}: ${value.desktop}px;`)
  if (value.mobile !== value.desktop) {
    leadingMobile.push(`    --ds-leading-${key}: ${value.mobile}px;`)
  }
  leadingTheme.push(`  --leading-${key}: var(--ds-leading-${key});`)
}

const textStyleUtilities = Object.entries(textStyles)
  .map(([key, style]) => {
    const name = kebab(key)
    return `@utility text-${name} {
  font-family: var(--ds-font-${style.fontFamily});
  font-size: ${style.fontSize}px;
  font-weight: ${style.fontWeight};
  line-height: ${style.lineHeight};
  letter-spacing: ${style.letterSpacing};
}`
  })
  .join("\n\n")

const tokensCss = `/* Generated from src/design-system/tokens via emit-css.mjs. Do not edit by hand. */
:root {
  color-scheme: dark;

  /* Primitive colors */
${primitiveLines.join("\n")}

  /* Semantic colors (dark mode only) */
${semanticLines.join("\n")}

  /* Spacing */
${spacingLines.join("\n")}

  /* Radius */
${radiusLines.join("\n")}

  /* Stroke */
${strokeLines.join("\n")}

  /* Shadows — Figma effect styles, visible layers only */
${shadowLines.join("\n")}

  /* Typography */
${fontFamilyLines.join("\n")}
${fontWeightLines.join("\n")}
${fontSizeRoot.join("\n")}
${leadingRoot.join("\n")}
${trackingLines.join("\n")}
}

@media (max-width: 767px) {
  :root {
${fontSizeMobile.join("\n")}
${leadingMobile.join("\n")}
  }
}
`

const themeCss = `/* Generated from src/design-system/tokens via emit-css.mjs. Do not edit by hand. */
@theme inline {
  --spacing: 1px;

  --font-sans: var(--ds-font-body);
  --font-serif: var(--ds-font-headline);
  --font-headline: var(--ds-font-headline);
  --font-body: var(--ds-font-body);
  --font-reading: var(--ds-font-reading);

${primitiveTheme.join("\n")}

${semanticTheme.join("\n")}

${radiusTheme.join("\n")}

${strokeTheme.join("\n")}

${shadowTheme.join("\n")}

${fontSizeTheme.join("\n")}
${leadingTheme.join("\n")}
${trackingTheme.join("\n")}
${fontWeightTheme.join("\n")}
}
`

const textStylesCss = `/* Generated from src/design-system/tokens via emit-css.mjs. Do not edit by hand. */

${textStyleUtilities}
`

writeFileSync(join(root, "tokens.css"), tokensCss)
writeFileSync(join(root, "theme.css"), themeCss)
writeFileSync(join(root, "text-styles.css"), textStylesCss)

console.log(
  `Wrote tokens.css (${primitiveLines.length} primitives, ${semanticLines.length} semantic), theme.css, text-styles.css`,
)
