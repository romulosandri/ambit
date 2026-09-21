# PERSPECTIVE CARD Blueprint

## Design Overview

**Template Name:** `perspective/*` (`perspective/Bloomberg`, `perspective/Financial Times`, `perspective/Kara Swisher`, `perspective/Tim Cook`)
**Node IDs:** `15268:6235` … `15268:6238`, instanced on article-details `15268:6225`
**Purpose:** A 360 × 83 quote-card in the article-details "Perspectives" rail. Same internals as `ArticleCardSmall` (cover + source line + title) with a bordered soft fill.

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg/state/soft` | `transparent/light/8` | card fill |
| `border/default` | `transparent/light/10` | 1px solid stroke |
| `text/default` | `#FFFFFF` | quote title |
| `text/subtle` | `transparent/light/70` | source name |

### Typography
| Style | Usage |
|-------|-------|
| `body/body-default` (14/1.2) | quote title, two-line clamp |
| `body/body-small` (12/1.25) | source name |

### Spacing
| Token | Where |
|---|---|
| `spacing-12` | card padding, gap between cover and text, gap between cards in the rail |
| `spacing-8` | source line → title |
| `spacing-4` | source mark → name |

### Border Radius
| Token | Usage |
|-------|-------|
| `radius-md` 12px | card |
| `radius-sm` 8px | 40px cover |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: PerspectiveCard                     // 360 × hug
├── FILL: bg/state/soft
├── STROKE: 1px solid border/default
├── CORNER-RADIUS: radius-md
├── PADDING: 12px
├── AUTO-LAYOUT: Row / Start, gap 12
│
├── [COMPONENT] Cover                     // sm (40), radius-sm
└── [ELEMENT] content-container           // column, gap 8, flex-1
    ├── [ELEMENT] SourceLine              // 12px mark + name
    └── [TEXT] title                      // body-default, line-clamp 2
```

The section around it (`15268:6226`) is a `SectionHeader` ("Perspectives" + `DropdownButton` "All" + rail arrows) above a `CardRail` with `gap-12` and a right scrim.

## Props

| Prop | Type | Description |
|---|---|---|
| `title` | `string` | the quote |
| `source` | `string` | publication or person |
| `logoSrc` | `string?` | publication/social mark |
| `social` | `boolean` | use `SocialLogo` instead of `PublicationLogo` |
| `imageSrc` | `string?` | 40px cover |
| `href` | `string?` | |

## Notes / Warnings

- Width is owned by the rail (`w-360`), not the card — same rule as `PlaylistCard`.
- Artwork is data, not a Figma export URL. The four Page 38 photographs live in `src/design-system/assets/perspectives/`.
