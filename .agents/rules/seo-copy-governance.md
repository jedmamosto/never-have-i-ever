---
name: seo-copy-governance
description: Enforces barkada vocabulary cadence, anti-AI-slop standards, mobile touch ergonomics, and tabletop gameplay isolation.
always_on: false
version: 1.1.0
---

# SEO & Copywriting Governance

## Why This Rule Exists
Prevents generic AI marketing slop, unreadable long sentences, broken narrow-screen mobile layouts, and bleed-through of marketing content into active tabletop card gameplay.

## Guiding Self-Questions
- *"Is active tabletop gameplay (isPlaying === true) completely free of landing marketing content?"*
- *"Are all sentences under 15 words and authored in authentic, conversational Taglish?"*
- *"Are all interactive touch targets at least 44px by 44px on mobile screens?"*

---

## 1. Gameplay Isolation & Layout Hierarchy

1. **Active Gameplay State Boundary**:
   - DO NOT render landing page copy, FAQs, or SEO articles during active gameplay (`isPlaying === true`).
   - ALWAYS isolate active card swiping in a clean fullscreen overlay and place all SEO/marketing copy on the idle home view below the hero launcher card.

2. **Mobile Screen Ergonomics (320px–393px)**:
   - DO NOT allow horizontal scrolling, overflowing containers, or sub-44px touch targets on mobile devices.
   - ALWAYS apply responsive padding (`px-2.5 sm:px-4`), flex wrapping, and `min-h-[44px]` on all interactive buttons, links, and accordion headers.

---

## 2. Copywriting & Anti-AI-Slop Invariants

1. **Barkada Voice & Sentence Bounds**:
   - DO NOT use AI buzzwords (*"premier"*, *"delve"*, *"seamless"*, *"elevate"*, *"testament"*, *"rich tapestry"*).
   - ALWAYS author explanations and instructions in plain, authentic Taglish with sentences strictly under 15 words.

2. **Thin-Content SEO Floor**:
   - DO NOT reduce visible text below 250 words or 20 paragraphs on the landing page.
   - ALWAYS maintain rich, high-density structured sections (How to Play, Intensity Levels, House Rules, FAQs) to sustain search engine ranking.

3. **Native Accordion Pattern**:
   - DO NOT import heavy JavaScript accordion libraries for simple expandable sections.
   - ALWAYS use native HTML `<details name="...">` elements for exclusive auto-closing single-open accordions.

4. **English-First UI Framing vs. Organic Cultural Touchstones**:
   - DO NOT translate core game mode names, card headers, or UI action triggers into literal or forced Tagalog (e.g. avoid *"Sino ang pinaka-posibleng..."* or *"Ituro na!"*).
   - ALWAYS keep UI navigation, mode titles, card headers, and button microcopy in clean, natural English (e.g. *"MOST LIKELY TO..."*, *"POINT NOW!"*).
   - ALWAYS restrict Filipino vocabulary to organic cultural touchstones (*inuman*, *pulutan*, *ambag*, *tita*, *videoke*, *GCash*, *Angkas*) embedded naturally in prompt text and casual copy.
