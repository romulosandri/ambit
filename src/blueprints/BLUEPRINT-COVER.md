# COVER Blueprint

## Design Overview

**Template Name:** album-cover (`15163:71006`), the `image` frame in `daily-brief-vertical-card` (`15210:85783`), and the `Frame 3` thumbnail in `article-card` (`15172:74925`)
**Node IDs:** `15169:71005` (`Property 1=Default`), `15169:71139` (`Property 1=Variant2`); instanced at 28px (`15210:87185`, `15210:89753`), 40px (`15210:87862`), 116px (`15172:74925`), 164px (`15169:72787`), 180px (`15169:71144`), 244px (`15234:4934`)
**Purpose:** One square, rounded, image tile used by every card in the system. Optionally overlays a white label chip (the topic/date caption baked into the artwork).

Treating these as a single `Cover` avoids three near-identical components; the differences are size, and whether the caption chip shows.

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg/basic/gray-subtle` | `cobblestone/900` | fill while the image loads / no image |
| `bg/inverted` | `cobblestone/00` `#FFFFFF` | caption chip background |
| `text/inverted-default` | `cobblestone/950` `#0E0907` | caption chip label |

### Typography (caption chip)
| Style | Font Family | Size | Weight | Line Height | Letter Spacing |
|-------|-------------|------|--------|-------------|----------------|
| `body/body-large` | body | 16px (`size/md`) | 400 | 1.24 | 0 |

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `spacing-12` | 12px | padding inside the tile (keeps the chip off the edge) |
| `spacing-4` / `spacing-2` | 4px / 2px | caption chip padding (x / y) |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `radius-md` | 12px | the tile, at every size used on Page 38 |
| `radius-none` | 0px | caption chip (square corners — deliberate) |

### Shadows
| Name | Definition |
|------|------------|
| `shadows/card` | `--shadow-card` (`0 1px 2px rgba(0,0,0,0.05)` + `inset 0 -1px 0 rgba(0,0,0,0.1)`) |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: Cover
├── LAYOUT: Flex Column
│     - centred            when there is no overline (playlist covers)
│     - space-between      when there is an overline (brief covers)
├── WIDTH: 100% (or fixed size)
├── ASPECT-RATIO: 1 / 1
├── CORNER-RADIUS: radius-md
├── SHADOW: shadows/card
│
├── [ELEMENT] Image        // object-fit cover, absolutely filling the tile
├── [ELEMENT] Overline     (optional — pinned top, e.g. "September")
└── [ELEMENT] CaptionChip  (optional — white chip)
    └── [TEXT] caption
```

### Two layouts

| Used by | Content | Layout |
|---|---|---|
| `playlist-card` (`I15177:76671;15169:72787`) | caption only ("AI Agents") | column, centred |
| `daily-brief-vertical-card` (`I15190:79241;15210:85783`), `daily-brief-horizontal-card` (`15169:71144`) | overline ("September") + caption ("Saturday, 19") | column, `justify-between`, `items-start` |
| `article-card` thumbnail (`15172:74925`), `featured-article-card` (`15234:4934`) | image only | either; nothing renders |

The overline uses `body/body-large` on `text/default`.

## Component Specifications

**Node ID:** `I15177:76671;15169:72787` (inside playlist-card) · 164 × 164

```pseudo
Cover {
  TYPE: Container (Image Frame)
  POSITION: Relative

  DIMENSIONS:
    - width: 100% (Fill Parent)
    - height: auto
    - aspect-ratio: 64 / 64  → 1 / 1

  AUTO-LAYOUT: Yes (Flex)
    - direction: Column
    - align-items: Center
    - justify-content: Center
    - gap: 0px

  PADDING: 12px on all sides (spacing-12)

  FILL:
    - type: Solid
    - color: #1f1814 (bg/basic/gray-subtle)   // behind the image

  STROKE: none
  CORNER-RADIUS: 12px (radius-md)
  OVERFLOW: Clip
  SHADOW: shadows/card

  CHILDREN:
    ├── [ELEMENT] Image {
    │     POSITION: Absolute, inset 0
    │     OBJECT-FIT: Cover
    │     OBJECT-POSITION: center
    │     SOURCE: consumer-supplied (artwork data, not a design asset)
    │   }
    └── [ELEMENT] CaptionChip {
          PADDING: 2px 4px (spacing-2 / spacing-4)
          FILL: #ffffff (bg/inverted)
          CORNER-RADIUS: 0px
          └── [TEXT] "AI Agents" {
                TYPOGRAPHY: body-large (body, 16px, 400, 1.24, 0)
                COLOR: #0e0907 (text/inverted-default)
                white-space: nowrap
              }
        }
}
```

## Variant Matrix

| Prop | Values | Effect |
|---|---|---|
| `size` | `xs` (28) · `sm` (40) · `md` (116) · `lg` (164) · `xl` (180) · `2xl` (244) · `full` | fixed box, or fill the parent at 1:1 |
| `caption` | string \| undefined | shows/hides the white chip |
| `overline` | string \| undefined | shows the top label and switches to the `space-between` layout |
| `radius` | `md` (default) / `sm` / `full` | article thumbnails use `radius-sm`; 28px topic/brief headers use `full` |

Sizes map 1:1 to the instances found: 28px brief/topic headers, 40px small article card, 116px article card thumbnail, 164px playlist & brief cards in rails, 180px horizontal brief card, 244px featured card.

## States

Non-interactive. Hover treatments belong to the *card* that contains the cover, not to the cover.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | — | artwork URL |
| `alt` | `string` | `""` | image alt; empty when the card already names the item |
| `size` | see matrix | `"full"` | box size |
| `caption` | `string` | — | optional white chip label |
| `overline` | `string` | — | optional label pinned to the top; switches the layout to `space-between` |
| `radius` | `"md" \| "sm" \| "full"` | `"md"` | corner radius |

## Accessibility

- Decorative by default (`alt=""`): every card that uses a cover already shows the title as text.
- The caption chip is real text, so it is readable — it is not baked into the image.

## Notes / Warnings

- The 12px padding exists **only** to inset the caption chip. Without a caption the padding is invisible, so it stays either way rather than becoming conditional.
- Figma's `radius-[25711px]`/`radius-[51423px]` values on `source-icon` are Figma's way of expressing "fully round" on a scaled instance — that is `radius-full`, and `source-icon` is a circle, so it is **not** this component. See `BLUEPRINT-SOURCE-CARD.md`.
- Artwork stays a prop, never a downloaded Figma asset URL. The `bg-flower` set (`15212:2632`, `number=1…12`) ships in `src/design-system/assets/covers/`, exported as `flowerCovers` plus `flowerCoverFor(key)` — which hashes a key so a given topic or date always keeps the same artwork instead of shuffling between renders.
