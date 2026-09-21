# AVATAR Blueprint

## Design Overview

**Template Name:** Avatar
**Node IDs:** `15177:76653` (20px, home-topics title), `15256:27940` / `15210:87958` (20px), `15210:91422` (56px, source-details header), `I15190:79357;15151:20932;4237:27717` (20px thumbnail inside the sidebar's Avatar Button)
**Purpose:** A circular image for a person or a source. Sizes observed: 20px and 56px.

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg/basic/gray-subtle` | `cobblestone/900` `#1F1814` | placeholder fill behind the image |
| `border/default` | `transparent/light/10` | 1px ring |
| `text/subtle` | `transparent/light/70` | initials fallback |

### Typography (initials fallback)
| Style | Font Family | Size | Weight | Line Height |
|-------|-------------|------|--------|-------------|
| `body/body-small` | body | 12px | 400 | 1.25 |

### Sizes
| Name | Value | Seen in |
|---|---|---|
| `xs` | 20px | page titles, sidebar avatar button |
| `md` | 56px | source-details header |

### Border Radius
| Token | Value |
|-------|-------|
| `radius-full` | 9999px |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: Avatar
├── WIDTH: {size}
├── HEIGHT: {size}
├── CORNER-RADIUS: radius-full
│
└── [ELEMENT] image           // <img> when src is given, otherwise initials text
```

## Component Specifications

**Node ID:** `15177:76653` · 20 × 20

```pseudo
Avatar {
  TYPE: Container (Image Frame)
  POSITION: Relative

  DIMENSIONS:
    - width: 20px (Fixed)
    - height: 20px (Fixed)
    - aspect-ratio: 1 / 1

  AUTO-LAYOUT: No (image fills the frame)

  FILL:
    - type: Solid
    - color: #1f1814 (bg/basic/gray-subtle)

  STROKE:
    - position: Inside
    - weight: 1px (stroke-default)
    - color: rgba(217,210,206,0.1) (border/default)

  CORNER-RADIUS: 9999px (radius-full)
  OVERFLOW: Clip

  CHILDREN:
    └── [ELEMENT] Image {
          OBJECT-FIT: Cover
          OBJECT-POSITION: center
          SOURCE: consumer-supplied (API/data), not a static asset
        }
}
```

## Variant Matrix

| Prop | Values | Effect |
|---|---|---|
| `size` | `xs` (20) / `md` (56) | box size; initials font steps to `body-default` at `md` |

## States

Non-interactive on its own. The sidebar's **Avatar Button** wraps it in a `Button`-like pill — that composition belongs to `BLUEPRINT-SIDEBAR.md`, not here.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | — | image URL; when absent, initials render |
| `name` | `string` | — | used for `alt` and to derive initials |
| `size` | `"xs" \| "md"` | `"xs"` | box size |

## Accessibility

- `alt` comes from `name`. When the avatar is decorative next to a visible name (the sidebar case), pass `alt=""` via an empty `name` so it isn't announced twice.
- The initials fallback is plain text inside the circle, so it is readable by screen readers without extra ARIA.

## Notes / Warnings

- The image in Figma is a dynamic, data-supplied photo, not a design asset — it stays a prop. Do not download the Figma placeholder and hardcode it into the component.
- Figma draws the image with a gradient placeholder underneath; the `bg/basic/gray-subtle` fill covers that case while an image loads.
