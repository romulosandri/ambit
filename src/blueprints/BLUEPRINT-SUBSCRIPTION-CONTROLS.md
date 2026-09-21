# SUBSCRIPTION CONTROLS Blueprint — ChoiceCard, ChannelRow, BackgroundPicker

Controls that only appear inside `New Subscription Modal` (`15279:87477`).

---

## 1. ChoiceCard

**Template Name:** Choice/Topic, Choice/Source, Kind/Person, Kind/Publisher
**Node IDs:** `15279:86984` (Topic, selected), `15279:86996` (Source), `15279:87267` (Person, selected), `15279:87276` (Publisher)
**Purpose:** A selectable card wrapping `Radio`. Detailed (icon + title + description) on the Choose step; compact (title only) on the Source step.

### Tokens
| Token | Usage |
|-------|-------|
| `bg/muted` | card fill |
| `text/informative` `mojo/400` `#DA815D` | selected 2px inside ring — Figma names this `border/informative` with a mojo fallback; the tokens.css `border/informative` is blue, so we paint with `text/informative` |
| `border/darker` | unselected 1px inside ring |
| `radius-card-sm` | 12px |
| `spacing-16` | padding |
| `spacing-10` | radio → content |
| `spacing-8` | icon → text |
| `spacing-4` | title → description |

### Hierarchy

```pseudo
ROOT: ChoiceCard
├── LAYOUT: Flex Row · PADDING: 16 · RADIUS: card-sm
├── RING: 2px text/informative (selected) | 1px border/darker (idle)
│
├── [ELEMENT] RadioSlot          // 20px, centres Radio
│   └── [COMPONENT] Radio
└── [ELEMENT] Content            // column, gap 8
    ├── [COMPONENT] Icon         (optional, 16px)
    └── [ELEMENT] Text           // column, gap 4
        ├── [TEXT] title         heading-subsection / text/default
        └── [TEXT] description   body-default / text/subtle
```

### Specs

**Selected Topic** `15279:86984` — hug height, fill width

```pseudo
ChoiceCard {
  FILL: bg/muted
  PADDING: 16
  RADIUS: card-sm
  SHADOW: inset 0 0 0 2px text/informative + inset 0 -1px 0 rgba(0,0,0,0.1) + 0 1px 2px rgba(0,0,0,0.05)
  ALIGN: start (detailed) | center (compact)
}
```

### Props
| Prop | Type | Default |
|---|---|---|
| `title` | `string` | — |
| `description` | `string` | — |
| `icon` | Phosphor icon | — |
| `selected` | `boolean` | `false` |
| `name` / `value` | `string` | radio grouping |
| `onChange` | `() => void` | — |

### Notes
- Inside strokes (inset box-shadow) so selected 2px vs idle 1px does not grow the card. Same trap as `Badge` / `Tabs`.
- Compact (Person / Publisher) drops the icon and description and centres the radio on the title row.

---

## 2. ChannelRow

**Template Name:** Channel/on|off/{brand}
**Node IDs:** `15279:87123` (LinkedIn on), `15279:87140` (Reddit off), and the rest of the 7-row list
**Purpose:** A checkbox + social mark + label for picking where Ambit looks.

### Hierarchy

```pseudo
ROOT: ChannelRow                 // px-4
└── [ELEMENT] Container          // p-6, gap 4, radius-xs, ghost fill
    ├── [COMPONENT] Checkbox
    ├── [COMPONENT] SocialLogo   // 16px in a 20px slot
    └── [TEXT] label             // body-default, px-4
```

### Specs
Padding `6`, gap `4`, radius `xs`. Default selected on the file: LinkedIn, Medium, X. Display label for Twitter is `"X"`.

### Props
| Prop | Type | Default |
|---|---|---|
| `name` | `SocialName` | — |
| `label` | `string` | the brand name |
| `checked` / `onChange` / `disabled` | — | forwarded to `Checkbox` |

---

## 3. BackgroundPicker

**Template Name:** Background
**Node ID:** `15289:7064`
**Purpose:** Pick one of the 12 `bg-flower` covers as the topic artwork. Two rows of six, each tile `h-72`, fill width, gap `8`.

### Hierarchy

```pseudo
ROOT: BackgroundPicker
├── [TEXT] "Background"          heading-subsection
└── [ELEMENT] Grid               // 6 columns, gap 8
    └── [ELEMENT] Option × 12    // h-72, radius-md
        ├── [ELEMENT] Image
        └── [ELEMENT] Badge      (selected only — 18px primary circle + 10px check)
```

### Selected option `15291:7108`
- `p-2` ring in `bg/state/primary`
- inner image `radius-sm` + `border/white`
- check badge `18px`, `bg/state/primary`, `border/white`, bottom-right

### Unselected
- no padding, image fills the `radius-md` tile

### Props
| Prop | Type | Default |
|---|---|---|
| `value` | `number` | `0` | index into `flowerCovers` |
| `onChange` | `(index: number) => void` | — |

### Notes
- Uses the shipped `flowerCovers` assets, not Figma's expiring URLs.
- Do not reuse `Cover` here — Cover's 12px caption padding and size scale don't match the 72px picker tile.
