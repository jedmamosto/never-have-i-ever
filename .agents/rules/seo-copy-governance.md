---
name: seo-copy-governance
description: Enforces barkada vocabulary cadence, anti-AI-slop standards, mobile touch ergonomics, and route separation between the game lobby and SEO guide.
trigger: model_decision
always_on: false
version: 1.2.0
---

# SEO & Copywriting Governance

## Why This Rule Exists
Prevents generic AI marketing slop, unreadable long sentences, broken mobile layouts, and prose bloat on the root game lobby.

## Guiding Self-Questions
- *"Is active gameplay (isPlaying === true) completely free of landing marketing content?"*
- *"Does the root route (/) stay a component-first game lobby with zero marketing essays?"*
- *"Are all sentences under 15 words and authored in conversational Taglish?"*
- *"Are all interactive touch targets at least 44px by 44px on mobile screens?"*

---

## 1. Gameplay Isolation & Layout Hierarchy

1. **Active Gameplay & Lobby State Boundary**:
   - DO NOT render landing copy, FAQs, or SEO articles during active gameplay (`isPlaying === true`).
   - DO NOT place long-form marketing prose or FAQ articles on the root game lobby (`/`).
   - ALWAYS isolate active card swiping in a clean fullscreen view and house SEO guides on `/how-to-play`.

2. **Mobile Screen Ergonomics (320px–393px)**:
   - DO NOT allow horizontal scrolling, overflowing containers, or sub-44px touch targets on mobile devices.
   - ALWAYS apply responsive padding (`px-2.5 sm:px-4`), flex wrapping, and `min-h-[44px]` on mobile buttons, links, and accordions.

---

## 2. Copywriting & Anti-AI-Slop Invariants

1. **Barkada Voice & Sentence Bounds**:
   - DO NOT use AI buzzwords (*"premier"*, *"delve"*, *"seamless"*, *"elevate"*, *"testament"*, *"rich tapestry"*).
   - ALWAYS write instructions and explanations in plain Taglish with sentences under 15 words.

2. **Thin-Content SEO Floor (`/how-to-play`)**:
   - DO NOT reduce visible text below 250 words or 20 paragraphs on `/how-to-play`.
   - ALWAYS keep full rules, intensity tiers, FAQs, and `HowTo`/`FAQPage` JSON-LD on `/how-to-play` to preserve search ranking.

3. **Native Accordion Pattern**:
   - DO NOT import heavy JavaScript accordion libraries for expandable FAQ sections.
   - ALWAYS use native HTML `<details name="...">` elements for exclusive auto-closing single-open accordions.

4. **English-First UI Framing vs. Organic Cultural Touchstones**:
   - DO NOT translate game mode names, card headers, or action buttons into forced Tagalog.
   - ALWAYS keep navigation, mode titles, card headers, and button labels in natural English.
   - ALWAYS restrict Filipino words to organic touchstones (*inuman*, *pulutan*, *ambag*, *tita*, *videoke*, *GCash*, *Angkas*) inside prompts and casual copy.
