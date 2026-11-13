---
name: Warm Editorial Neo-Brutalist Party Game
colors:
  surface: '#fcf9f4'
  surface-dim: '#dcdad5'
  surface-bright: '#fcf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ee'
  surface-container: '#f0ede9'
  surface-container-high: '#ebe8e3'
  surface-container-highest: '#e5e2dd'
  on-surface: '#1c1c19'
  on-surface-variant: '#55423e'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f3f0eb'
  outline: '#88726d'
  outline-variant: '#dbc1ba'
  surface-tint: '#9a442d'
  primary: '#9a442d'
  on-primary: '#ffffff'
  primary-container: '#e07a5f'
  on-primary-container: '#5b1604'
  inverse-primary: '#ffb4a1'
  secondary: '#7c5800'
  on-secondary: '#ffffff'
  secondary-container: '#fec24a'
  on-secondary-container: '#715000'
  tertiary: '#44664b'
  on-tertiary: '#ffffff'
  tertiary-container: '#7b9f80'
  on-tertiary-container: '#14351e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd2'
  primary-fixed-dim: '#ffb4a1'
  on-primary-fixed: '#3c0800'
  on-primary-fixed-variant: '#7c2e19'
  secondary-fixed: '#ffdea7'
  secondary-fixed-dim: '#f8bd45'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5e4200'
  tertiary-fixed: '#c5ecca'
  tertiary-fixed-dim: '#aad0af'
  on-tertiary-fixed: '#00210c'
  on-tertiary-fixed-variant: '#2c4e35'
  background: '#fcf9f4'
  on-background: '#1c1c19'
  surface-variant: '#e5e2dd'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Space Grotesk
    fontSize: 38px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: 0em
  title:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0em
  label-code:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-counter:
    fontFamily: Space Mono
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system uses Warm Editorial Neo-Brutalism. It pairs tactile print cards with bold ink borders, inspired by *We're Not Really Strangers* and Gumroad.

Key brand pillars:
- **Paper-Crafted Physicality:** Surfaces look like printed linen cardstock, prompt decks, and game tokens on a wooden table.
- **Sharp Borders with Soft Corners:** Uniform ink-black strokes frame every surface. Rounded outer corners keep the layout friendly and touchable.
- **Color by Mood:** Colors match the prompt intensity, moving from calm green icebreakers to warm yellow party cards and deep red late-night prompts.

## Colors

Each color role maps to an intensity tier and gameplay state:

- **Canvas & Surface:** Oatmeal Cream (`#FBF8F3`) is the main background. Secondary containers and card faces use Stark White (`#FFFFFF`) or `#F5EFEB`.
- **Ink & Strokes:** Ink-Black (`#18181B`) sets the color for text, borders, and hard drop shadows.
- **Primary (Late-Night Spicy):** Terracotta Coral (`#E07A5F`) marks primary buttons, high-intensity cards, and main CTAs. Dusty Berry (`#D1495B`) handles countdown states and deep-cut badges.
- **Secondary (Party & Lore):** Warm Marigold (`#F4B942`) highlights group prompts, turn badges, and active tabs. Muted Lavender (`#D4C1EC`) styles reflection decks.
- **Tertiary (Chill Reflection):** Matcha Sage (`#A3C9A8`) marks low-stress icebreakers, safe zones, and calm transitions.

## Typography

The type system uses three fonts:
1. **Space Grotesk** handles display titles, prompt card text, and headlines with tight letter-tracking.
2. **Plus Jakarta Sans** handles descriptions, body rules, and modal copy for clear reading.
3. **Space Mono** formats counters, deck categories, card numbers (e.g., `LVL 03 // CARD 42`), and timers.

Prompt card headings use tight line height and negative tracking for a poster feel. Do not use italic styles on cards; use underlines or brackets (`[CONFESS]`) instead.

## Layout & Spacing

The layout uses an 8pt grid built around card play:
- **Mobile (<640px):** Single-column layout with bottom-docked controls. Keep screen margins and card gutters at `1rem` so the prompt fills the screen.
- **Tablet (641px–1024px):** 6-column fluid canvas with `1.5rem` gutters. Supports dual-pane views with the active prompt on 4 columns and controls on 2 columns.
- **Desktop (>1024px):** 12-column layout centered at `1200px` max width with `3rem` margins. Leaves room for floating sidebars and deck selectors.

Component spacing uses fixed tokens: `space-xs` for counter gaps, `space-sm`/`space-lg` for button padding, and `space-xl` for card padding.

## Elevation & Depth

Depth uses hard Neo-Brutalist offsets with zero blur:
- **Ink Borders:** Elevated surfaces use a `2.5px` (controls/chips) or `3px` (cards/panels) solid `#18181B` border.
- **Card Stacks & Major Modals:** Use an `8px 8px 0px 0px #18181B` offset shadow. Stacked deck cards duplicate this with `4px` and `8px` staggered black rims.
- **Interactive Controls (Buttons, Inputs, Toggles):** Resting state uses a `4px 4px 0px 0px #18181B` shadow.
- **Hover State:** Moves `-2px, -2px` and expands the shadow to `6px 6px 0px 0px #18181B`.
- **Active / Pressed State:** Moves `4px, 4px` with a `0px` shadow for tactile press feedback.

## Shapes

The geometric signature contrasts sharp, heavy borders with generous, approachable corner curvature:
- **Primary Game Cards & Large Dialogs:** Set at `20px` border-radius to feel friendly, physical, and safely held in hand like rounded corner playing cards.
- **Buttons, Selection Chips & Inputs:** Set at `12px` border-radius to maintain ergonomic harmony with the larger cards.
- **Badges, Status Tags & Counters:** Fully rounded pill forms (`9999px`) or rigid rectangular tokens (`6px`), contrasting against the `20px` card frames.

## Components

### Buttons
- **Primary Button:** Background in Terracotta Coral (`#E07A5F`) or Marigold (`#F4B942`), text in Ink-Black (`#18181B`), font `Space Grotesk` 700. Solid `2.5px` border in `#18181B`, `12px` border-radius, hard shadow `4px 4px 0px #18181B`. Press state moves `translate(4px, 4px)` with shadow removed.
- **Secondary Button:** Background in Oatmeal Cream (`#FBF8F3`) or White (`#FFFFFF`), `2.5px` border `#18181B`, identical shadow mechanics.
- **Destructive/Urgent Button:** Dusty Berry (`#D1495B`) background with white text, Ink-Black stroke and hard shadow.

### Prompt & Question Cards
- Main game cards use a minimum height of `380px` on mobile, bordered with `3px` solid `#18181B`, `20px` corner radii, and `8px 8px 0px #18181B` hard shadow.
- Background tint maps to game mode: Matcha Sage (`#A3C9A8`) for Icebreakers, Marigold (`#F4B942`) for Wild Group Lore, Lavender (`#D4C1EC`) for Deep Digs, and Terracotta Coral (`#E07A5F`) for High-Spicy/Wildcards.
- Cards feature an ink-bordered header strip containing category stamps in `Space Mono` uppercase.

### Chips & Badges
- Category badges feature `Space Mono` 700 uppercase typography, enclosed within a `2px` black stroke, `9999px` pill radius, and minimal internal padding (`0.25rem 0.75rem`).
- Active selection chips toggle from Oatmeal Cream (`#FBF8F3`) to vivid Marigold (`#F4B942`) with a subtle `2px 2px 0px #18181B` drop shadow.

### Input Fields
- Text inputs feature `2.5px` borders in `#18181B`, `12px` radius, and clean White (`#FFFFFF`) or pale cream backgrounds.
- Placeholder text sits at 50% opacity Ink-Black.
- Active/Focus state casts an instant `4px 4px 0px #18181B` shadow with no glowing outlines.

### Checkboxes & Radio Controls
- Checkboxes: Square with `6px` radius, `2.5px` stroke, white fill. Checked state fills with `#18181B` accompanied by a bold white check glyph or Terracotta Coral (`#E07A5F`) fill.
- Radio buttons: Circular, `2.5px` stroke, inset concentric solid circle on active selection.

### Custom Game Components
- **Turn / Round Pill:** Fixed top or floating badge sporting a live monospace countdown timer, separated by vertical rules: `ROUND 03 // 00:45`.
- **Deck Selector Stack:** Layered card backs featuring alternating offset angles (`rotate(-2deg)`, `rotate(3deg)`) with visible 3px outlines, simulating a physical deck ready to be drawn.