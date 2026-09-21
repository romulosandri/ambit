# AUDIO BUTTON Blueprint

## Design Overview

**Template Name:** audio-button
**Node IDs:** `15163:70903` (component), instanced at `15210:87224` (daily-brief-details), `15169:71149` (daily-brief-horizontal-card), `15234:4891` (featured-article-card), `15210:91768` (article-details)
**Purpose:** The "listen" control: a play button, the progress waveform, and a duration label in one pill.

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg/state/secondary` | `transparent/light/4` | container background |
| `bg/state/secondary-hover` | `transparent/light/8` | container hover |
| `bg/state/soft` | `transparent/light/8` | the inner play `Button` |
| `border/darker` | `transparent/light/15` | 1px solid container border |
| `text/muted` | `transparent/light/50` | time label |
| `icon/default` | `#FFFFFF` | play/pause glyph, played wave bars |
| `icon/default-muted` | `transparent/light/50` | unplayed wave bars |

### Typography
| Style | Font Family | Size | Weight | Line Height | Letter Spacing |
|-------|-------------|------|--------|-------------|----------------|
| `heading/heading-subsection` | body | 14px (`size/sm`) | 400 | 1.0 | 0 |

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `spacing-4` | 4px | padding-y, padding-left, and the wave→label gap |
| `spacing-8` | 8px | padding-right |
| `spacing-6` | 6px | gap between the play button and the wave group |
| `spacing-2` | 2px | label padding-x |

Asymmetric padding (`4px` left, `8px` right) is intentional: the left side is optically balanced by the play button's own box.

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 8px | container and the inner play button |

### Shadows
| Name | Applies to |
|------|------------|
| `components/default` | container |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: AudioButton
├── LAYOUT: Flex Row
├── WIDTH: Hug Content (133px in the reference)
├── HEIGHT: 32px
├── GAP: 6px (spacing-6)
├── FILL: bg/state/secondary
├── STROKE: 1px border/darker
├── CORNER-RADIUS: radius-sm
├── SHADOW: components/default
│
├── [COMPONENT] Button          // iconOnly, soft, 24px, Play/Pause
└── [ELEMENT] Container
    ├── [COMPONENT] AudioWave
    └── [ELEMENT] Label
        └── [TEXT] duration
```

## Component Specifications

**Node ID:** `15163:70903` · 133 × 32

```pseudo
AudioButton {
  TYPE: Container (composite control)
  POSITION: Relative

  DIMENSIONS:
    - width: Hug Content
    - height: 32px (4 + 24 + 4)

  AUTO-LAYOUT: Yes (Flex)
    - direction: Row
    - align-items: Center
    - justify-content: Center
    - gap: 6px (spacing-6)

  PADDING:
    - top: 4px    (spacing-4)
    - right: 8px  (spacing-8)
    - bottom: 4px (spacing-4)
    - left: 4px   (spacing-4)

  FILL:
    - type: Solid
    - color: rgba(217,210,206,0.04) (bg/state/secondary)

  STROKE:
    - position: Inside
    - weight: 1px (stroke-default)
    - color: rgba(217,210,206,0.15) (border/darker)
    - style: SOLID

  CORNER-RADIUS: 8px (radius-sm)
  OVERFLOW: Clip
  SHADOW: components/default

  CHILDREN:
    ├── [COMPONENT] Button {
    │     node: 15163:70779
    │     iconOnly: true
    │     style: "soft"          // bg/state/soft
    │     size: 24px box (min-width/min-height 24)
    │     shape: "rounded"       // radius-sm
    │     glyph: Play (16px) → Pause when playing
    │   }
    └── [ELEMENT] Container {
          AUTO-LAYOUT: Row / Center, gap 4px (spacing-4)
          ├── [COMPONENT] AudioWave (54 × 18)
          └── [ELEMENT] Label {
                PADDING: 0 2px (spacing-2)
                └── [TEXT] "21:16" {
                      TYPOGRAPHY: heading-subsection (body, 14px, 400, 1.0, 0)
                      COLOR: rgba(217,210,206,0.5) (text/muted)
                      white-space: nowrap
                    }
              }
        }
}
```

## States

| State | Trigger | Tokens applied |
|---|---|---|
| Default | — | `bg/state/secondary`, Play glyph |
| Hover | `:hover` on the container | `bg/state/secondary-hover` |
| Playing | `playing` prop | Pause glyph; wave `progress` advances |
| Focused | `:focus-visible` on the play button | `--shadow-misc-focus` |
| Disabled | `disabled` | `bg/state/disabled`, `text/hint`, wave all muted |

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `duration` | `string` | — | label text, e.g. `"21:16"` |
| `playing` | `boolean` | `false` | toggles Play/Pause |
| `progress` | `number` (0–1) | `0.53` | forwarded to `AudioWave` |
| `onPlayPause` | `() => void` | — | play/pause handler |
| `disabled` | `boolean` | `false` | disabled |

## Accessibility

- The play control is the only focusable element; it gets `aria-label` of "Play"/"Pause" plus the duration, so the whole pill doesn't need to be a control.
- The waveform is `aria-hidden`; the duration is real text, so the information is available without it.
- The container is a `<div>`, not a button — nesting the play button inside another button would be invalid.

## Notes / Warnings

- Reuse `Button` for the play control (`iconOnly`, `style="soft"`) rather than styling a fresh 24px box.
- The container's left padding is 4px while the right is 8px. Do not "fix" this to symmetrical padding — it is what centres the pill optically.
