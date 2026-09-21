# SOCIAL BUTTON Blueprint

## Design Overview

**Template Name:** Social Button
**Node IDs:** `15201:3265`, `15201:3266`, `15201:3267` (sign-in), `15201:3733`, `15201:3734`, `15201:3735` (sign-up); component `2153:2239`
**Purpose:** Full-width OAuth entry point on the auth screens. A `Button` at a larger size with a brand mark instead of a UI glyph.

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg/state/secondary` | `transparent/light/4` | background |
| `bg/state/secondary-hover` | `transparent/light/8` | hover |
| `bg/state/secondary-press` | `transparent/light/10` | press |
| `border/darker` | `transparent/light/15` | 1px solid border |
| `text/default` | `#FFFFFF` | label |

### Typography
| Style | Font Family | Size | Weight | Line Height | Letter Spacing |
|-------|-------------|------|--------|-------------|----------------|
| `heading/heading-subsection` | body | 14px (`size/sm`) | 400 | 1.0 | 0 |

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `spacing-14` | 14px | padding-x |
| `spacing-10` | 10px | padding-y |
| `spacing-6` | 6px | gap |
| `spacing-2` | 2px | label padding-x |

### Border Radius
| Token | Value |
|-------|-------|
| `radius-sm` | 8px |

### Shadows
| Name | Applies to |
|------|------------|
| `components/default` | the button |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: SocialButton
└── [COMPONENT] Button {
      style: "secondary"
      size: "lg"          // 36px — auth-only size
      fullWidth: true
    }
    ├── [ELEMENT] BrandMark    // 16px brand asset, not an Icon
    └── [ELEMENT] Label
        └── [TEXT] children
```

## Component Specifications

**Node ID:** `15201:3265` · 328 × 36

```pseudo
SocialButton {
  TYPE: Button Container
  POSITION: Relative

  DIMENSIONS:
    - width: 100% (Fill Parent — 328px in the auth card)
    - height: 36px (Hug Content: 10 + 16 + 10)

  AUTO-LAYOUT: Yes (Flex)
    - direction: Row
    - align-items: Center
    - justify-content: Center
    - gap: 6px (spacing-6)

  PADDING:
    - top: 10px    (spacing-10)
    - right: 14px  (spacing-14)
    - bottom: 10px (spacing-10)
    - left: 14px   (spacing-14)

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
    ├── [ELEMENT] BrandMark {
    │     DIMENSIONS: 16px × 16px
    │     SOURCE: src/assets/brands/{brand}.svg
    │   }
    └── [ELEMENT] Label {
          PADDING: 0 2px (spacing-2)
          └── [TEXT] "Sign in with Apple" {
                TYPOGRAPHY: heading-subsection
                COLOR: #ffffff (text/default)
              }
        }
}
```

## Variant Matrix

| `brand` | Label pattern | Mark |
|---|---|---|
| `apple` | "Sign in with Apple" / "Sign up with Apple" | Apple mark |
| `google` | "… with Google" | Google mark |
| `microsoft` | "… with Microsoft" | Microsoft mark |

The Figma component exposes `brand`, `label`, `shape`, `state`, `style`, `type`; Page 38 uses `shape=Rounded`, `style=Secondary`, `state=Default`, `type=Default` throughout.

## States

| State | Trigger | Tokens applied |
|---|---|---|
| Default | — | `bg/state/secondary` |
| Hover | `:hover` | `bg/state/secondary-hover` |
| Press | `:active` | `bg/state/secondary-press` |
| Focused | `:focus-visible` | `--shadow-misc-focus` |
| Loading | `isLoading` | `bg/state/secondary-loading`, `aria-busy` |
| Disabled | `disabled` | `bg/state/disabled`, `text/hint` |

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `brand` | `"apple" \| "google" \| "microsoft"` | — | which mark and default label |
| `children` | `ReactNode` | derived from `brand` | label override |
| `isLoading` | `boolean` | `false` | loading state |
| `onClick` | `() => void` | — | starts the OAuth flow |

## Accessibility

- A real `<button>` with the full label as its accessible name — "Sign in with Apple", not "Apple".
- The brand mark is `aria-hidden`.

## Notes / Warnings

- The 36px height needs a **new `lg` size on `Button`** (`10/14` padding, gap 6). That size exists only on the auth screens, so it is added to `Button` rather than special-cased here.
- Brand marks are third-party assets on `src/assets/brands/`. Like publication logos, they are not recoloured and not hand-drawn; until the assets land, the component renders the label without a mark rather than substituting an approximate glyph.
