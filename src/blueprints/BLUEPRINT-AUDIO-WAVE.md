# AUDIO WAVE Blueprint

## Design Overview

**Template Name:** audio-wave (built from the bar primitive `Component 1`, `15163:70789`)
**Node IDs:** `15163:70901` (the wave, 54 × 18), bar variants `15163:70788` … `15163:70820`
**Purpose:** The progress waveform inside `audio-button`. A row of 2px bars where played bars are bright and unplayed bars are muted.

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `icon/default` | `cobblestone/00` `#FFFFFF` | played (`type=active`) bars |
| `icon/default-muted` | `transparent/light/50` | unplayed (`type=inactive`) bars |

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `spacing-2` | 2px | gap between bars, and bar width |

### Border Radius
| Token | Value |
|-------|-------|
| `radius-2xs` | 4px | every bar |

### Bar heights (Figma `size` prop)
| Size | Height |
|---|---|
| `lg` | 18px |
| `md` | 12px |
| `sm` | 8px |
| `xs` | 4px |
| `xxs` | 2px |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: AudioWave
├── LAYOUT: Flex Row
├── ALIGNMENT: center (bars are vertically centred)
├── GAP: 2px (spacing-2)
│
└── [ELEMENT] Bar × n      // width 2px, height from the size table, radius-2xs
```

## Component Specifications

**Node ID:** `15163:70901` · 54 × 18 · **14 bars**

The reference wave, in order, is:
`lg, md, md, sm, lg, lg, xs, md` (active) then `md, xs, md, lg, xs, xxs` (inactive).

14 bars at 2px with 2px gaps is exactly the 54px frame width: `14×2 + 13×2 = 54`. Getting the bar count wrong is easy to miss visually but shows up as a wrong `audio-button` width (133px), so the count is load-bearing.

```pseudo
AudioWave {
  TYPE: Container
  POSITION: Relative

  DIMENSIONS:
    - width: Hug Content (54px at 15 bars)
    - height: 18px (tallest bar)

  AUTO-LAYOUT: Yes (Flex)
    - direction: Row
    - align-items: Center
    - justify-content: Start
    - gap: 2px (spacing-2)

  PADDING: 0px

  CHILDREN:
    └── [ELEMENT] Bar {
          DIMENSIONS: 2px × {18 | 12 | 8 | 4 | 2}px
          FILL: icon/default (played) | icon/default-muted (unplayed)
          CORNER-RADIUS: 4px (radius-2xs)
        }
}
```

## Variant Matrix

| Prop | Values | Effect |
|---|---|---|
| bar `size` | `lg` `md` `sm` `xs` `xxs` | bar height |
| bar `type` | `active` / `inactive` | `icon/default` vs `icon/default-muted` |

## States

Not interactive. `progress` shifts which bars are active; there is no hover or focus. The wave is the *display* — the play control is a separate `Button` inside `audio-button`.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `bars` | `("lg" \| "md" \| "sm" \| "xs" \| "xxs")[]` | the reference 14-bar pattern | bar heights, left to right |
| `progress` | `number` (0–1) | `8/14` | fraction of bars rendered active |

## Accessibility

- Decorative: `aria-hidden`. The real progress information belongs to the audio player's own controls (`AudioButton` exposes the time label as text).

## Notes / Warnings

- Figma's export contains a stray `bg-[#4c4c4c]` on two bar wrappers. That is a leftover fill on an invisible wrapper frame, not a design colour — ignore it and use the token fills.
- Bars are `2px` wide with a `4px` radius, so they render as fully rounded stadiums. That's intended.
- Default `progress` of `8/14` reproduces the reference frame: the first 8 bars bright, the last 6 muted.
