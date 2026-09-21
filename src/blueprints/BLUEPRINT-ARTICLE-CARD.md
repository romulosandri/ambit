# ARTICLE CARD Blueprint

## Design Overview

**Template Name:** article-card
**Node IDs:** component set `15172:74929`; variants `15172:74928` (`state=default, type=news`), `15172:75993` (`default, articles`), `15177:76245` (`default, post`), `15172:74930` (`hover, news`), `15172:76009` (`hover, articles`), `15177:76261` (`hover, post`). Instanced 40+ times across home, saved, topic-details, source-details, daily-brief-details, discovery.
**Purpose:** The feed row. The most-instanced composite in the file, so its internals (`SourceLine`, `MetaRow`) are shared with `ArticleCardSmall` and `FeaturedArticleCard`.

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg/state/ghost` | transparent | resting background |
| `bg/state/ghost-hover` | `transparent/light/8` | hover background |
| `text/default` | `#FFFFFF` | title |
| `text/subtle` | `transparent/light/70` | source name |
| `text/muted` | `transparent/light/50` | meta row |
| `bg/state/soft` | `transparent/light/8` | the hover-revealed save button |

### Typography
| Style | Font | Size | Weight | Line Height | Usage |
|-------|------|------|--------|-------------|-------|
| `body/body-large` | body | 16px | 400 | 1.24 | title (clamped to 2 lines) |
| `body/body-small` | body | 12px | 400 | 1.25 | source name, meta row |

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `spacing-16` | 16px | card padding, and the content column gap |
| `spacing-12` | 12px | source-group gap |
| `spacing-8` | 8px | header gap (source-group → title) |
| `spacing-6` | 6px | card gap (content → thumbnail), meta row gap, action-items gap |
| `spacing-4` | 4px | logo → source name gap; also the meta separator dot size |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `radius-md` | 12px | card (hover state) |
| `radius-sm` | 8px | thumbnail |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: ArticleCard
├── LAYOUT: Flex Row
├── WIDTH: Fill Parent (640px in the app shell)
├── HEIGHT: 148px
├── ALIGNMENT: center
├── GAP: 6px (spacing-6)
├── PADDING: 16px (spacing-16)
├── CORNER-RADIUS: radius-md
│
├── [ELEMENT] content-container          (fills remaining width)
│   ├── [ELEMENT] header
│   │   ├── [ELEMENT] source-group
│   │   │   ├── [ELEMENT] SourceLine
│   │   │   │   ├── [COMPONENT] PublicationLogo (12px)
│   │   │   │   └── [TEXT] source name
│   │   │   ├── [COMPONENT] Badge
│   │   │   └── [ELEMENT] action-items   (hover only)
│   │   │       └── [COMPONENT] Button   (iconOnly, soft, sm — BookmarkSimple)
│   │   └── [TEXT] title
│   └── [ELEMENT] MetaRow
│       └── [TEXT] × 3 separated by 4px dots
└── [COMPONENT] Cover                    (square thumbnail, fills card height)
```

`SourceLine` and `MetaRow` are shared internal elements (`./ArticleMeta`), used identically by `ArticleCardSmall` and `FeaturedArticleCard`. They are not public components.

## Component Specifications

### 1. ArticleCard_Default_News
**Node ID:** `15172:74928` · 640 × 148

```pseudo
ArticleCard {
  TYPE: Container (feed row, interactive)
  POSITION: Relative

  DIMENSIONS:
    - width: 100% (Fill Parent)
    - height: 148px (Fixed)

  AUTO-LAYOUT: Yes (Flex)
    - direction: Row
    - align-items: Center
    - justify-content: Start
    - gap: 6px (spacing-6)

  PADDING: 16px on all sides (spacing-16)

  FILL: rgba(217,210,206,0) (bg/state/ghost)
  STROKE: none
  CORNER-RADIUS: 12px (radius-md)

  CHILDREN:
    ├── [ELEMENT] content-container {
    │     DIMENSIONS: width Fill, min-width 0
    │     AUTO-LAYOUT: Column / Start, gap 16px (spacing-16)
    │     ├── [ELEMENT] header {
    │     │     AUTO-LAYOUT: Column / Start, gap 8px (spacing-8)
    │     │     ├── [ELEMENT] source-group {
    │     │     │     AUTO-LAYOUT: Row / Center, gap 12px (spacing-12)
    │     │     │     HEIGHT: 28px
    │     │     │     ├── [ELEMENT] SourceLine {
    │     │     │     │     AUTO-LAYOUT: Row / Center, gap 4px (spacing-4)
    │     │     │     │     ├── [COMPONENT] PublicationLogo (12px, radius-2xs)
    │     │     │     │     └── [TEXT] "The Verge" {
    │     │     │     │           TYPOGRAPHY: body-small (body, 12px, 400, 1.25, 0)
    │     │     │     │           COLOR: rgba(217,210,206,0.7) (text/subtle)
    │     │     │     │         }
    │     │     │     │   }
    │     │     │     └── [COMPONENT] Badge (color per `type`) → "News"
    │     │     │   }
    │     │     └── [TEXT] title {
    │     │           DIMENSIONS: max-width 400px
    │     │           TYPOGRAPHY: body-large (body, 16px, 400, 1.24, 0)
    │     │           COLOR: #ffffff (text/default)
    │     │           OVERFLOW: clamp to 2 lines with ellipsis
    │     │         }
    │     │   }
    │     └── [ELEMENT] MetaRow {
    │           AUTO-LAYOUT: Row / Center, gap 6px (spacing-6)
    │           TYPOGRAPHY: body-small
    │           COLOR: rgba(217,210,206,0.5) (text/muted)
    │           ITEMS: "18 Sources" • "4 min read" • "1h ago"
    │           SEPARATOR: 4px round dot on the same colour
    │         }
    │   }
    └── [COMPONENT] Cover {
          size: md → 116px square (the 148px card height minus its 16px padding)
          radius: sm → 8px (radius-sm), not Cover's default radius-md
          caption: none, overline: none
        }
}
```

### 2. ArticleCard_Hover_News
**Node ID:** `15172:74930` — same geometry, plus:

```pseudo
  FILL: rgba(217,210,206,0.08) (bg/state/ghost-hover)

  // a save action appears inside source-group
  └── [ELEMENT] action-items {
        AUTO-LAYOUT: Row / Center, gap 6px (spacing-6)
        └── [COMPONENT] Button {
              iconOnly, style "soft", size sm (28px), radius-sm
              glyph: BookmarkSimple (16px)
            }
      }
```

## Variant Matrix

| `type` | Badge default | Logo source |
|---|---|---|
| `news` | `cyan` / "News" | `PublicationLogo` |
| `articles` | `violet` / "Analysis" | `PublicationLogo` |
| `post` | `pink` / "Post" | `SocialLogo` |

Badge colour and label are overridable per article; the table is the default per type.

## States

| State | Trigger | Tokens applied |
|---|---|---|
| Default | — | `bg/state/ghost`, no action button |
| Hover | `:hover` | `bg/state/ghost-hover`; the save `Button` becomes visible |
| Focused | `:focus-visible` | `--shadow-misc-focus` on the card's link |
| Pressed | `:active` | `bg/state/ghost-press` |

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | headline |
| `source` | `string` | — | publication name |
| `logoSrc` | `string` | — | brand asset for the source |
| `type` | `"news" \| "articles" \| "post"` | `"news"` | drives the default badge + logo kind |
| `badge` | `{ label: string; color: BadgeColor }` | from `type` | badge override |
| `sources` | `number` | — | "N Sources" |
| `readTime` | `string` | — | "4 min read" |
| `time` | `string` | — | "1h ago" |
| `imageSrc` | `string` | — | thumbnail |
| `saved` | `boolean` | `false` | bookmark filled state |
| `onSave` | `() => void` | — | bookmark handler |
| `href` | `string` | — | article link |

## Accessibility

- The card's title is the link (`<a>` wrapping the title text) so the accessible name is the headline, not the whole card's text soup. The save button stays a separate focusable control.
- The hover-revealed save button must remain reachable by keyboard: it is rendered always and only *visually* hidden until hover or focus-within, never `display: none`.
- Meta separators are decorative dots (`aria-hidden`); the three meta values are read as text.

## Notes / Warnings

- The 400px title width in Figma is the fixed frame of a 640px card. In code the title fills the content column and clamps to 2 lines, which reproduces the 40px title block at any card width.
- The thumbnail's radius is `radius-sm`, **not** the `radius-md` that `Cover` defaults to, so it is passed as `radius="sm"`. Pass it as a prop rather than a `className` override — conflicting Tailwind utilities on the same element resolve by CSS source order, not by the order they appear in the class string, so an override silently may not win.
- Card height is 148px in every instance, which is what makes a 116px square thumbnail.
