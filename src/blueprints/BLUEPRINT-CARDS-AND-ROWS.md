# CARDS & ROWS Blueprint

The remaining Tier 3 composites. Each is short enough that keeping them together makes the shared structure obvious; `article-card` has its own file because it is the most complex and defines the shared `SourceLine` / `MetaRow` elements.

Common rules for everything below:
- Tokens only; all sizes cite the Figma spacing token.
- `[COMPONENT]` children are imported, never re-styled inline.
- Interactive cards render the title as the link so the accessible name is the item title.

---

## 1. ARTICLE CARD SMALL

**Node ID:** `15210:87869` · 360 × 100. Instanced inside AI `chat-bubble` (`15210:87884`, hidden by default).
**Purpose:** Compact source citation attached to an AI answer.

```pseudo
ArticleCardSmall {
  TYPE: Container
  DIMENSIONS: 360px × 100px
  AUTO-LAYOUT: Row / Start, gap 12px (spacing-12)
  PADDING: 12px (spacing-12)
  FILL: bg/state/ghost → bg/state/ghost-hover on hover
  STROKE: 1px (stroke-default) border/default
  CORNER-RADIUS: 12px (radius-md)

  CHILDREN:
    ├── [COMPONENT] Cover (size sm = 40px, radius-sm)
    └── [ELEMENT] content-container {
          AUTO-LAYOUT: Column / Start, gap 8px (spacing-8), width Fill
          ├── [ELEMENT] SourceLine        // shared: PublicationLogo 12px + name (body-small, text/subtle)
          └── [TEXT] title {
                TYPOGRAPHY: body-default (body, 14px, 400, 1.2, 0)
                COLOR: text/default
                OVERFLOW: clamp to 3 lines
              }
        }
}
```

**Props:** `title`, `source`, `logoSrc`, `imageSrc`, `href`.

---

## 2. FEATURED ARTICLE CARD

**Node IDs:** component `15236:4647`; variants `15236:4646` (`state=Default`), `15236:4648` (`state=hover`); instanced at `15237:4930` (discovery) · 640 × 260.
**Purpose:** The hero article at the top of discovery. Same ingredients as `article-card`, but a headline typeface, a description, and a listen control.

```pseudo
FeaturedArticleCard {
  TYPE: Container
  DIMENSIONS: width Fill (640px) × 260px
  AUTO-LAYOUT: Row / Center, gap 16px (spacing-16)
  PADDING: 8px (spacing-8)
  FILL: bg/state/ghost → bg/state/ghost-hover on hover
  CORNER-RADIUS: 12px (radius-md)

  CHILDREN:
    ├── [ELEMENT] content-container {
    │     AUTO-LAYOUT: Column / Start, gap 16px (spacing-16), width Fill
    │     ├── [ELEMENT] source-group {
    │     │     AUTO-LAYOUT: Row / Center, gap 12px (spacing-12), height 28px
    │     │     ├── [ELEMENT] SourceLine
    │     │     └── [COMPONENT] Badge → "Featured Article"
    │     │   }
    │     ├── [ELEMENT] header {
    │     │     AUTO-LAYOUT: Column / Start, gap 10px (spacing-10), width Fill
    │     │     ├── [TEXT] title {
    │     │     │     TYPOGRAPHY: heading-page (headline/Concrette, 20px, 400, 1.0, 0)
    │     │     │     COLOR: text/default
    │     │     │   }
    │     │     └── [TEXT] description {
    │     │           TYPOGRAPHY: body-default (body, 14px, 400, 1.2, 0)
    │     │           COLOR: text/subtle
    │     │         }
    │     │   }
    │     ├── [COMPONENT] AudioButton
    │     └── [ELEMENT] MetaRow
    │   }
    └── [COMPONENT] Cover (size 2xl = 244px, stretched to the card height)
}
```

**Props:** `title`, `description`, `source`, `logoSrc`, `badge`, `sources`, `readTime`, `time`, `duration`, `imageSrc`, `href`.

**Note:** this is the only card using the **headline** family for its title, which is what separates it visually from a plain `article-card`.

---

## 3. PLAYLIST CARD

**Node IDs:** component `15169:73015`; variants `15169:73014` (`Default`), `15169:73016` (`Variant2`); instanced on home, saved, subscriptions-topics, discovery · 180 × 206 (and 210 × 236 in the subscriptions grid).
**Purpose:** A topic tile in a horizontal rail.

Its width is set by the rail or grid that contains it (180px in the home rail, 210px in the subscriptions grid), so the component must **not** set a width of its own — the same goes for `DailyBriefVerticalCard`.

```pseudo
PlaylistCard {
  TYPE: Container
  DIMENSIONS: width from parent (180px in a rail, 210px in a grid) × Hug
  AUTO-LAYOUT: Column / Start, gap 12px (spacing-12)
  PADDING: 8px (spacing-8)
  FILL: bg/state/ghost → bg/state/ghost-hover on hover
  CORNER-RADIUS: 12px (radius-md)

  CHILDREN:
    ├── [COMPONENT] Cover (size full, caption = topic name)
    └── [TEXT] title {
          TYPOGRAPHY: heading-subsection (body, 14px, 400, 1.0, 0)
          COLOR: text/default
          OVERFLOW: truncate to one line
        }
}
```

**Props:** `title`, `imageSrc`, `caption` (defaults to `title`), `href`.

---

## 4. DAILY BRIEF VERTICAL CARD

**Node IDs:** component `15210:85650`; variants `15210:85651` (`state=Default`), `15210:85655` (`state=hover`); instanced on saved and daily-briefs · 180 × 206 / 210 × 236.
**Purpose:** A dated brief tile.

Identical geometry to `PlaylistCard`, with the cover carrying **two** labels:

```pseudo
DailyBriefVerticalCard {
  // geometry as PlaylistCard
  CHILDREN:
    ├── [COMPONENT] Cover {
    │     size: full
    │     overline: "September"     // body-large, text/default, pinned top
    │     caption: "Saturday, 19"   // white chip, pinned bottom
    │   }
    └── [TEXT] title   // heading-subsection, text/default, truncate
}
```

**Props:** `title`, `month`, `date`, `imageSrc`, `href`.

---

## 5. DAILY BRIEF HORIZONTAL CARD

**Node IDs:** component `15169:71189`; variants `15169:71188` (`Default`), `15169:71190` (`Variant2`); instanced at `15177:76660` / `15256:27947` (home) · 640 × 196.
**Purpose:** Today's brief, promoted at the top of the home feed.

```pseudo
DailyBriefHorizontalCard {
  TYPE: Container
  DIMENSIONS: width Fill (640px) × Hug (196px)
  AUTO-LAYOUT: Row / Center, gap 16px (spacing-16)
  PADDING: 8px (spacing-8)
  CORNER-RADIUS: 12px (radius-md)

  CHILDREN:
    ├── [COMPONENT] Cover (size xl = 180px, overline + caption)
    └── [ELEMENT] content-container {
          AUTO-LAYOUT: Column / Start, gap 16px (spacing-16), width Fill
          ├── [ELEMENT] header {
          │     AUTO-LAYOUT: Column / Start, gap 10px (spacing-10)
          │     ├── [TEXT] "Daily Brief" {
          │     │     TYPOGRAPHY: heading-page (headline, 20px, 400, 1.0, 0)
          │     │     COLOR: text/default
          │     │   }
          │     └── [TEXT] summary {
          │           DIMENSIONS: max-width 280px
          │           TYPOGRAPHY: body-default, COLOR: text/subtle
          │         }
          │   }
          └── [COMPONENT] AudioButton
        }
}
```

**Props:** `title` (default `"Daily Brief"`), `summary`, `month`, `date`, `duration`, `imageSrc`, `href`.

---

## 6. SOURCE CARD

**Node IDs:** component `15210:89600`; variants `15206:84222` (`state=Default`), `15210:89601` (`state=hover`); instanced on home-sources, subscriptions-sources, discovery · ~88–97 × 111.
**Purpose:** A publication tile. Wraps the circular `source-icon`.

```pseudo
SourceCard {
  TYPE: Container
  DIMENSIONS: Hug × 111px
  AUTO-LAYOUT: Column / Center, gap 8px (spacing-8)
  PADDING: 8px (spacing-8)
  FILL: bg/state/ghost → bg/state/ghost-hover on hover
  CORNER-RADIUS: 12px (radius-md)

  CHILDREN:
    ├── [ELEMENT] source-icon {
    │     DIMENSIONS: 72px × 72px
    │     AUTO-LAYOUT: Row / Center / Center
    │     STROKE: 2.571px border/strong, inside     // scaled instance of a 2px stroke
    │     CORNER-RADIUS: 9999px (radius-full)
    │     └── [COMPONENT] PublicationLogo (size fill, shape circle — 61.7px)
    │   }
    └── [TEXT] name {
          TYPOGRAPHY: body-small (body, 12px, 400, 1.25, 0)
          COLOR: text/subtle
          OVERFLOW: truncate
        }
}
```

**Props:** `name`, `logoSrc`, `href`.

**Note:** the 2.571px stroke is a scaled instance artefact. In code it is `stroke-lg` (2px) on `border/strong` — the nearest token, and visually identical at this size. This is the one place a Figma value is deliberately snapped to a token.

---

## 7. TOPIC ITEM

**Node IDs:** component `15234:4835`; variants `15234:4834` (`Default`), `15234:4836` (`Variant2`); instanced in the discovery trending card · 622 × 41.
**Purpose:** A trending-topic row.

```pseudo
TopicItem {
  TYPE: Container
  DIMENSIONS: width Fill × Hug (41px)
  AUTO-LAYOUT: Row / Center, gap 10px (spacing-10)
  PADDING: 12px (spacing-12)
  FILL: bg/state/ghost → bg/state/ghost-hover on hover
  CORNER-RADIUS: 12px (radius-md)

  CHILDREN:
    ├── [TEXT] title {
    │     DIMENSIONS: width Fill
    │     TYPOGRAPHY: heading-section (headline/Concrette, 16px, 400, 1.0, 0)
    │     COLOR: text/default
    │     OVERFLOW: truncate
    │   }
    └── [TEXT] meta {
          TYPOGRAPHY: body-default (body, 14px, 400, 1.2, 0)
          COLOR: text/subtle
          CONTENT: "16 Selected Articles"
        }
}
```

**Props:** `title`, `meta`, `href`.

---

## 8. CHAT ITEM

**Node IDs:** component `15190:79324`; variants `15190:79323` (`state=Default`), `15190:79325` (`state=hover`); instanced 16× on the chats screen · 640 × 53.
**Purpose:** A row in the chat history list.

```pseudo
ChatItem {
  TYPE: Container
  DIMENSIONS: width Fill × Hug (53px)
  AUTO-LAYOUT: Row / Center, gap 10px (spacing-10)
  PADDING: 16px (spacing-16)
  FILL: bg/state/ghost → bg/state/ghost-hover on hover

  STROKE:
    - position: Bottom edge only
    - weight: 1px (stroke-default)
    - color: border/default
    - style: SOLID

  CHILDREN:
    ├── [TEXT] title {
    │     DIMENSIONS: width Fill
    │     TYPOGRAPHY: body-large (body, 16px, 400, 1.24, 0)
    │     COLOR: text/default
    │   }
    ├── [ELEMENT] UnreadDot (optional) {
    │     DIMENSIONS: 8px × 8px
    │     FILL: bg/state/brand (mojo/500)
    │     CORNER-RADIUS: radius-full
    │   }
    └── [TEXT] date {
          TYPOGRAPHY: body-large
          COLOR: text/subtle
          CONTENT: "Sep 18"
        }
}
```

**Props:** `title`, `date`, `unread`, `href`.

**Note:** the dot is `hidden="true"` in most instances — it is the unread affordance, hence the `unread` prop.
