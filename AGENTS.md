# Never Have I Ever Workspace Guidelines

> [!NOTE]
> **Baseline Inheritance**: This workspace strictly inherits and follows the universal Global Agent Rules in [~/.gemini/GEMINI.md](file:///C:/Users/ASUS/.gemini/GEMINI.md). This AGENTS.md defines ONLY repository-specific rules, boundaries, and architecture.

## Why This Rule Exists
Prevents breaking game state mechanics, UI card layout bounds, and dataset integrity across the 500-question calibrated deck in `src/data/questions.ts`.

## Guiding Self-Questions
- *"Did I run node scripts/verify-dataset.mjs after editing any question card?"*
- *"Are all card prompts compliant with the 15–68 character and 3–12 word bounds?"*
- *"Does the Next.js production build pass cleanly with zero TypeScript errors?"*

---

## Workspace Overview & Architecture
- **Framework**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS.
- **Dataset (SSOT)**: `src/data/questions.ts` (500 questions, 50 per level, levels 1–10).
- **Golden Reference Standard**: `.agents/docs/QUESTION_GOLDEN_TEMPLATE.md`.
- **Key Directories**:
  - `src/app/`: Next.js App Router root layout and main game page.
  - `src/components/card/`: `HeroCardStack` swipe and presentation components.
  - `src/components/controls/`: `BottomDock` and `IntensitySlider` level selectors.
  - `src/components/modals/`: `CustomCardModal` user custom card creator.
  - `src/data/`: `questions.ts` static card library.
  - `src/hooks/`: Game state hooks (`useGameDeck`, `useCustomCards`).
  - `scripts/`: Dataset verification and maintenance scripts.

## Core Shell Commands (Windows PowerShell)
- **Development Server**: `npm run dev`
- **Build All**: `npm run build`
- **Lint**: `npm run lint`
- **Verify Dataset**: `node scripts/verify-dataset.mjs`

## Context Routing Index
- Golden Question Standard: inspect `.agents/docs/QUESTION_GOLDEN_TEMPLATE.md`
- Cultural Framework & Touchstones: inspect `.agents/docs/research/nhie-filipino-cultural-framework.md`
- Question Research Dossier: inspect `.agents/docs/research/nhie-question-framework-dossier.md`
- Workspace Modular Rules: inspect `.agents/rules/question-governance.md`
- SEO & Copy Governance: inspect `.agents/rules/seo-copy-governance.md`

## Execution Boundaries

1. **Dataset Integrity & Golden Template**:
   - DO NOT alter the 50-cards-per-level balance (strictly 500 cards total).
   - ALWAYS verify that any new or updated prompt satisfies the 5 Core Mechanical Invariants:
     1. Active past-tense/past-participle verb anchor.
     2. No "Never have I ever" or "I have..." prefix.
     3. 15 to 68 characters.
     4. 3 to 12 words.
     5. Capital first letter and terminal punctuation (`.` or `?`).

2. **Deduplication Gate**:
   - DO NOT introduce duplicate or near-duplicate situational premises.
   - ALWAYS verify that semantic token overlap remains below 40% across all 500 cards.

3. **Verification Before Declaring Victory**:
   - DO NOT claim question changes are complete without testing.
   - ALWAYS run `node scripts/verify-dataset.mjs` and `npm run build`.

4. **Windows Next.js Build Process Locking**:
   - DO NOT run `npm run build` while a background server (`next dev` or `next start`) holds file locks on `.next`.
   - ALWAYS terminate locking Node processes (`Stop-Process -Id <pid> -Force`) and clean `.next` (`Remove-Item -Recurse -Force .next`) if encountering `PageNotFoundError` or `ENOENT` during static page collection.
