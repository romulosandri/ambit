# CHAT BUBBLE Blueprint

## Design Overview

**Template Name:** chat-bubble
**Node IDs:** component `15210:87478`; variants `15210:87477` (`type=user`), `15210:87476` (`type=ai`); instanced on chat-details at `15210:87735` / `15210:87781` (user) and `15210:87736` / `15210:87783` (ai)
**Purpose:** One turn in a conversation. The two variants are structurally different: the user turn is a contained bubble, the AI turn is an unstyled block with a source link and a row of response actions.

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg/state/soft` | `transparent/light/8` | user bubble fill |
| `border/default` | `transparent/light/10` | user bubble border |
| `text/default` | `#FFFFFF` | message text |
| `text/muted` | `transparent/light/50` | timestamp |

### Typography
| Style | Font | Size | Weight | Line Height | Usage |
|-------|------|------|--------|-------------|-------|
| `body/body-default` | body | 14px | 400 | 1.5 | message text |
| `body/body-small` | body | 12px | 400 | 1.25 | timestamp |

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `spacing-16` | 16px | user bubble padding-x; AI block padding |
| `spacing-12` | 12px | user bubble padding-y |
| `spacing-16` | 16px | AI: link → text gap |
| `spacing-4` | 4px | AI: gap between action buttons |
| `spacing-16` | 16px | AI: actions → timestamp gap |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `radius-md` | 12px | user bubble |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: ChatBubble (type="user")
├── LAYOUT: Flex Row, centred
├── WIDTH: Fill Parent
├── PADDING: 12px 16px
├── FILL: bg/state/soft
├── STROKE: 1px border/default
├── CORNER-RADIUS: radius-md
└── [TEXT] message

ROOT: ChatBubble (type="ai")
├── LAYOUT: Flex Column
├── WIDTH: Fill Parent
├── FILL: none
│
├── [COMPONENT] LinkButton            // "12 sources" style link
├── [TEXT] message
├── [COMPONENT] ArticleCardSmall × n  (optional citations)
└── [ELEMENT] bottom-info
    ├── [ELEMENT] action-items
    │   └── [COMPONENT] Button × 4    // iconOnly, ghost, xs (24px)
    └── [TEXT] timestamp
```

## Component Specifications

### 1. ChatBubble_User
**Node ID:** `15210:87735` · 640 × 47

```pseudo
ChatBubble {
  TYPE: Container
  POSITION: Relative

  DIMENSIONS:
    - width: 100% (Fill Parent)
    - height: Hug Content

  AUTO-LAYOUT: Yes (Flex)
    - direction: Row
    - align-items: Center
    - justify-content: Center
    - gap: 0px

  PADDING:
    - top: 12px    (spacing-12)
    - right: 16px  (spacing-16)
    - bottom: 12px (spacing-12)
    - left: 16px   (spacing-16)

  FILL:
    - type: Solid
    - color: rgba(217,210,206,0.08) (bg/state/soft)

  STROKE:
    - position: Inside
    - weight: 1px (stroke-default)
    - color: rgba(217,210,206,0.1) (border/default)
    - style: SOLID

  CORNER-RADIUS: 12px (radius-md)
  OVERFLOW: Clip

  CHILDREN:
    └── [TEXT] message {
          DIMENSIONS: width Fill
          TYPOGRAPHY: body (14px, 400, line-height 1.5, 0)
          COLOR: #ffffff (text/default)
        }
}
```

### 2. ChatBubble_AI
**Node ID:** `15210:87736` · 640 × 138 (grows with content)

```pseudo
ChatBubble {
  TYPE: Container
  DIMENSIONS: width Fill × Hug Content
  AUTO-LAYOUT: Column / Start, gap 16px (spacing-16)
  PADDING: 12px 16px (spacing-12 / spacing-16)
  FILL: none
  STROKE: none
  CORNER-RADIUS: 0px

  CHILDREN:
    ├── [COMPONENT] LinkButton {
    │     node: 15210:87415
    │     tone: "default"
    │     CONTENT: source label, e.g. "12 sources"
    │   }
    ├── [TEXT] message {
    │     TYPOGRAPHY: body (14px, 400, 1.5, 0)
    │     COLOR: text/default
    │   }
    ├── [COMPONENT] ArticleCardSmall × n (optional — hidden in the reference frame)
    └── [ELEMENT] bottom-info {
          AUTO-LAYOUT: Row / Center, gap 16px (spacing-16)
          HEIGHT: 24px
          ├── [ELEMENT] action-items {
          │     AUTO-LAYOUT: Row / Center, gap 4px (spacing-4)
          │     └── [COMPONENT] Button × 4 {
          │           iconOnly, style "ghost", size xs (24px)
          │           glyphs: Copy, ThumbsUp, ThumbsDown, ArrowsClockwise
          │         }
          │   }
          └── [TEXT] timestamp {
                TYPOGRAPHY: body-small
                COLOR: text/muted
                CONTENT: "9m ago"
              }
        }
}
```

## Variant Matrix

| `type` | Container | Children |
|---|---|---|
| `user` | soft fill, 1px border, `radius-md` | message only |
| `ai` | no fill, no border | source `LinkButton`, message, optional citations, action row + timestamp |

## States

| State | Trigger | Tokens applied |
|---|---|---|
| Default | — | per matrix |
| Hover (ai) | `:hover` | action buttons rise from `text/muted` to `text/default` |
| Focused | `:focus-visible` | `--shadow-misc-focus` on each action button |

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `"user" \| "ai"` | — | which variant |
| `children` | `ReactNode` | — | message text |
| `sourceLabel` | `string` | — | ai: the source link label |
| `onSourceClick` | `() => void` | — | ai: opens the sources panel |
| `timestamp` | `string` | — | ai: relative time |
| `citations` | `ReactNode` | — | ai: `ArticleCardSmall` list |
| `actions` | `{ icon, label, onClick }[]` | copy / up / down / retry | ai: response actions |

## Accessibility

- The turn is a `<li>` when rendered inside a conversation `<ol>`; the message itself is plain text, so screen readers read it without wrapper noise.
- Each AI action button has a real `aria-label` ("Copy answer", "Good response", "Bad response", "Regenerate").
- The timestamp is a `<time>` element so the relative label can carry a machine-readable `dateTime`.

## Notes / Warnings

- Figma reports the message text as **Inter** at 14px/1.5. Inter is not in the design system — this is a stray override in the file. Code uses the body family (Saans) at 14px with a 1.5 line-height, keeping the intended metrics on a real token font. Flag it to design so the text style gets fixed at source.
- The AI variant has no background. Do not add a bubble to "match" the user turn; the asymmetry is the design.
