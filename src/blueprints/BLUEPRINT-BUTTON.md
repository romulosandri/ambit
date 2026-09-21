# BUTTON Blueprint

## Design Overview

**Template Name:** Button
**Node IDs (instances on Page 38):** `15190:79368` (md secondary dashed, "New Chat"), `15210:86314` (sm secondary + tail icon, "Last 30 Days"), `15210:88690` (xs secondary, 130×24), `15210:87772` (xs ghost, "Back"), `15177:76659` (xs ghost icon-only 24), `15177:76668` / `15237:5590` (sm ghost icon-only 28), `I15206:84133;7006:42924` (sm soft pill icon-only 28), `15163:70779` (icon-only 24 soft, inside audio-button)
**Purpose:** The base interactive atom. Every other button-shaped component in the file (`Filter Button`, `Dropdown Button`, `Social Button`, `audio-button`'s play control, sidebar collapse, composer actions) is this component with different props, so this is the one that must be right.

## Design Tokens & Variables

### Colors — per style
| Style | Default bg | Hover | Press | Border | Label |
|---|---|---|---|---|---|
| `primary` | `bg/state/primary` `mojo/600` | `bg/state/primary-hover` `mojo/500` | `bg/state/primary-press` | none | `text/default` |
| `secondary` | `bg/state/secondary` `transparent/light/4` | `bg/state/secondary-hover` | `bg/state/secondary-press` | `border/darker` 1px | `text/default` |
| `soft` | `bg/state/soft` `transparent/light/8` | `bg/state/soft-hover` | `bg/state/soft-press` | none | `text/default` |
| `ghost` | `bg/state/ghost` (transparent) | `bg/state/ghost-hover` | `bg/state/ghost-press` | none | `text/default` |
| `destructive` | `bg/state/destructive` `red/500` | `bg/state/destructive-hover` | `bg/state/destructive-press` | none | `text/default` |

Disabled for every style: `bg/state/disabled` + `text/hint` + `icon/default-disabled`.

### Typography
| Style | Font Family | Size | Weight | Line Height | Letter Spacing |
|-------|-------------|------|--------|-------------|----------------|
| `heading/heading-subsection` | body (Saans) | 14px (`size/sm`) | 400 | 1.0 | 0 |

### Spacing — per size
| Size | Height | Padding (y / x) | Gap | Icon | Label pad-x |
|---|---|---|---|---|---|
| `md` | 32px | `8` / `12` | `6` | md (16) | `2` |
| `sm` | 28px | `6` / `10` | `4` | md (16) | `2` |
| `xs` | 24px | `4` / `8` | `4` | md (16) | `2` |

Icon-only overrides padding to `0` and applies `min-width = min-height = height` (24 / 28 / 32), gap `none`.

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 8px | default (`shape="rounded"`) |
| `radius-full` | 9999px | `shape="pill"` — composer action buttons |

### Shadows
| Name | Definition | Applies to |
|------|------------|------------|
| `components/default` | `--shadow-component` | `secondary`, `primary`, `destructive` |
| `misc-focus` | `--shadow-misc-focus` | `:focus-visible`, all styles |

Note: `ghost` and `soft` carry **no** shadow in Figma.

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: Button
├── LAYOUT: Flex Row
├── WIDTH: Hug Content (or Fill when the parent stretches it)
├── HEIGHT: Fixed per size
├── ALIGNMENT: center / center
├── GAP: per size
│
├── [COMPONENT] Icon            (optional — leadIcon)
├── [ELEMENT] Label             (omitted when icon-only)
│   └── [TEXT] children
└── [COMPONENT] Icon            (optional — tailIcon)
```

## Component Specifications

### 1. Button_Secondary_md — "New Chat"
**Node ID:** `15190:79368` · 111 × 32

```pseudo
Button {
  TYPE: Button Container
  POSITION: Relative

  DIMENSIONS:
    - width: Hug Content
    - height: 32px (Fixed)

  AUTO-LAYOUT: Yes (Flex)
    - direction: Row
    - align-items: Center
    - justify-content: Center
    - gap: 6px (spacing-6)

  PADDING:
    - top: 8px    (spacing-8)
    - right: 12px (spacing-12)
    - bottom: 8px (spacing-8)
    - left: 12px  (spacing-12)

  FILL:
    - type: Solid
    - color: rgba(217,210,206,0.04) (bg/state/secondary)

  STROKE:
    - position: Inside
    - weight: 1px (stroke-default)
    - color: rgba(217,210,206,0.15) (border/darker)
    - style: DASHED                      // (Note: this instance is dashed — see Props.borderStyle)

  CORNER-RADIUS: 8px (radius-sm)
  OVERFLOW: Clip

  CHILDREN:
    ├── [COMPONENT] Icon (size md, tone default)   // plus glyph
    └── [ELEMENT] Label {
          PADDING: 0 2px (spacing-2)
          └── [TEXT] "New Chat"  // heading-subsection, text/default
        }
}
```

### 2. Button_Secondary_sm — "Last 30 Days" (lead + tail icon)
**Node ID:** `15210:86314` · 144 × 28

```pseudo
Button {
  DIMENSIONS: Hug Content × 28px
  AUTO-LAYOUT: Row / Center / Center, gap 4px (spacing-4)
  PADDING: 6px (spacing-6) vertical, 10px (spacing-10) horizontal
  FILL: bg/state/secondary
  STROKE: 1px border/darker, SOLID, inside
  CORNER-RADIUS: 8px (radius-sm)
  SHADOW: components/default
  OVERFLOW: Clip

  CHILDREN:
    ├── [COMPONENT] Icon (md)      // calendar
    ├── [ELEMENT] Label → [TEXT] "Last 30 Days"
    └── [COMPONENT] Icon (md)      // caret-down
}
```

### 3. Button_Ghost_xs_IconOnly
**Node ID:** `15177:76659` · 24 × 24

```pseudo
Button {
  DIMENSIONS: 24px × 24px (min-width and min-height both 24)
  AUTO-LAYOUT: Row / Center / Center, gap 0px (spacing-none)
  PADDING: 0px on all sides (spacing-none)
  FILL: rgba(217,210,206,0) (bg/state/ghost)
  STROKE: none
  CORNER-RADIUS: 8px (radius-sm)
  SHADOW: none
  OVERFLOW: Clip

  CHILDREN:
    └── [COMPONENT] Icon (size md, tone default)
}
```

### 4. Button_Ghost_sm_IconOnly
**Node ID:** `15177:76668` · 28 × 28 — identical to spec 3 with `min-width/min-height: 28px`.

### 5. Button_Soft_sm_IconOnly_Pill — composer action
**Node ID:** `I15206:84133;7006:42924` · 28 × 28

```pseudo
Button {
  DIMENSIONS: 28px × 28px
  PADDING: 0px
  FILL: rgba(217,210,206,0.08) (bg/state/soft)
  CORNER-RADIUS: 9999px (radius-full)
  SHADOW: none
  CHILDREN: └── [COMPONENT] Icon (md)   // plus / microphone
}
```

## Style Matrix

| Prop | Values | Notes |
|---|---|---|
| `style` | `primary` `secondary` `soft` `ghost` `destructive` | drives bg + border + shadow |
| `size` | `md` `sm` `xs` | drives height, padding, gap |
| `shape` | `rounded` `pill` | `radius-sm` vs `radius-full` |
| `borderStyle` | `solid` `dashed` | `secondary` only; the "New Chat" and `Filter Button` instances are dashed |
| `iconOnly` | boolean | square box, no padding, no label |
| `fullWidth` | boolean | auth-screen buttons fill 328px |

## States

| State | Trigger | Tokens applied |
|---|---|---|
| Default | — | `bg/state/{style}` |
| Hover | `:hover` | `bg/state/{style}-hover` |
| Press | `:active` | `bg/state/{style}-press` |
| Focused | `:focus-visible` | `--shadow-misc-focus` ring |
| Loading | `isLoading` prop | `bg/state/{style}-loading`, label stays, `aria-busy` |
| Disabled | `disabled` attr | `bg/state/disabled`, `text/hint`, `icon/default-disabled`, `cursor: not-allowed` |

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | label; omit when `iconOnly` |
| `style` | see matrix | `"secondary"` | visual style |
| `size` | `"md" \| "sm" \| "xs"` | `"md"` | size |
| `shape` | `"rounded" \| "pill"` | `"rounded"` | corner radius |
| `borderStyle` | `"solid" \| "dashed"` | `"solid"` | secondary border style |
| `leadIcon` | `PhosphorIcon` | — | icon before the label |
| `tailIcon` | `PhosphorIcon` | — | icon after the label |
| `iconOnly` | `boolean` | `false` | square icon button; requires `aria-label` |
| `fullWidth` | `boolean` | `false` | stretch to container |
| `isLoading` | `boolean` | `false` | loading state |
| `disabled` | `boolean` | `false` | native disabled |

Plus the native `button` attributes (`onClick`, `type`, `aria-label`, …).

## Accessibility

- Renders a real `<button>` with `type="button"` unless told otherwise.
- `iconOnly` **requires** `aria-label`; the icon is `aria-hidden`.
- Focus is visible via `--shadow-misc-focus` on `:focus-visible` only, so pointer users don't see a ring.
- Disabled uses the native attribute plus `aria-disabled` so it stays announced.

## Notes / Warnings

- Figma paints `components/default` as an inner 1px `border/darker` shadow layer *plus* a drop shadow. In code the border is a real CSS border and the shadow token covers the rest — do not double up by adding both a `border` and the inset border layer.
- The `New Chat` and `Filter` instances are **dashed**; every other secondary button is solid. Dashed is a prop, not a separate style.
- Heights are fixed, not derived from line-height, so a 14px/1.0 label in a 32px `md` button is correct.
