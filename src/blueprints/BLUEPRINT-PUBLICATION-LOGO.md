# PUBLICATION LOGO / SOCIAL LOGO Blueprint

## Design Overview

**Template Name:** publication-logos (`15195:1243`), social-logos (`15177:76327`)
**Node IDs:** publication variants `15195:1215` … `15195:1241`; social variants `15177:76321` … `15182:1106`; instanced at `15210:91736` (article-details), `15195:81023` (article-card), `15210:87852` (article-card-small), `15234:4973` (featured card), and at 61.7px inside `source-icon` (`I15206:84231;15206:84210;15206:84196`)
**Purpose:** The brand mark for a news source. Rendered at 12px next to a source name in article cards, and large inside a circular `source-icon` tile.

## Variants

**publication-logos** (14): The Verge, TechCrunch, Wired, The Information, Ars Technica, CNET, Axios, Bloomberg, Reuters, Financial Times, Wall Street Journal, The Economist, CNBC, Forbes.

**social-logos** (7): Facebook, Instagram, Twitter (X), Substack, Reddit, Medium, LinkedIn.

## Design Tokens & Variables

### Colors
Brand marks carry their own brand colours — they are **not** tokenised and must not be recoloured. The only token in play is the fallback:

| Token | Value | Usage |
|-------|-------|-------|
| `bg/basic/gray-subtle` | `cobblestone/900` | fallback tile fill |
| `text/subtle` | `transparent/light/70` | fallback initial letter |

### Sizes
| Name | Value | Usage |
|---|---|---|
| `sm` | 12px | inline in article cards, next to the source name |
| `fill` | parent-driven (61.7px in `source-icon`) | circular source tile |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `radius-2xs` | 4px | the mark's own tile at 12px |
| `radius-full` | 9999px | when nested in `source-icon` |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: PublicationLogo
├── WIDTH: {size}
├── HEIGHT: {size}
├── CORNER-RADIUS: radius-2xs (or radius-full inside source-icon)
│
└── [ELEMENT] Mark        // <img> of the brand asset, object-fit cover
```

## Component Specifications

**Node ID:** `I15206:84231;15206:84210;15206:84196;15195:1216` (The Verge, inside a source card)

```pseudo
PublicationLogo {
  TYPE: Container (Image Frame)
  POSITION: Relative

  DIMENSIONS:
    - width: {12px | 100%}
    - height: {12px | 100%}
    - aspect-ratio: 1 / 1

  FILL: bg/basic/gray-subtle (visible only behind a transparent mark / while loading)
  STROKE: none
  CORNER-RADIUS: 4px (radius-2xs) | 9999px (radius-full)
  OVERFLOW: Clip

  CHILDREN:
    └── [ELEMENT] Mark {
          POSITION: Absolute, inset 0
          OBJECT-FIT: Cover
          SOURCE: static brand asset in `src/assets/logos/{slug}.svg|png`
        }
}
```

## Variant Matrix

| Prop | Values |
|---|---|
| `publication` | the 14 publication slugs |
| `social` | the 7 social slugs |
| `size` | `sm` (12) / `fill` |
| `shape` | `rounded` (radius-2xs) / `circle` (radius-full) |

## States

Non-interactive.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | publication or social slug | — | which mark to render |
| `size` | `"sm" \| "fill"` | `"sm"` | box size |
| `shape` | `"rounded" \| "circle"` | `"rounded"` | corner radius |

## Static Assets Mapping

| Figma Element | Static File |
|---------------|-------------|
| `type=The Verge` | `src/assets/logos/the-verge.svg` |
| `type=TechCrunch` | `src/assets/logos/techcrunch.svg` |
| … (one per variant) | `src/assets/logos/{slug}.svg` |

## Accessibility

- `alt` is the publication name when the mark stands alone; `alt=""` when the name is already rendered as text beside it (which is the case in every Page 38 usage).

## Asset status

| Set | Status |
|---|---|
| **social-logos** (7) | **Shipped.** `src/design-system/assets/social/{facebook,instagram,x,substack,reddit,medium,linkedin}.png`, resolved automatically by `SocialLogo` from the name — no `src` needed. |
| **publication-logos** (14) | Still missing. `PublicationLogo` falls back to the source's initial on a token-styled tile until assets land; pass `src` to override. |

## Notes / Warnings

- **These marks are third-party brand assets.** They are never reproduced by hand-drawing SVG paths. Where the asset is missing, the component renders a token-styled fallback tile with the source's initial, which keeps every card that depends on it working and visually honest.
- Do not apply `icon/*` colour tokens to a brand mark.
- `SocialLogo` looks its own asset up by name, so `ArticleCard type="post"` shows the real mark with no extra wiring. `PublicationLogo` keeps the same API so it will start working the moment the publication assets are added.
