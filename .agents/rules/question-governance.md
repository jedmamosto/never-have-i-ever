---
name: question-governance
description: Ambient invariants for authoring, editing, and validating question cards in src/data/questions.ts.
always_on: false
version: 1.0.0
---

# Question Dataset Governance

## Why This Rule Exists
Prevents card duplication, semantic premise collisions, broken deck distributions, and non-conforming card lengths when editing question cards.

## Guiding Self-Questions
- *"Does the new question have less than 40% token overlap with all existing questions?"*
- *"Does the prompt complete the unspoken phrase '[Never have I ever...] {Action}' in 15 to 68 characters?"*
- *"Did I run node scripts/verify-dataset.mjs and npm run build?"*

---

## 1. Mechanical Invariants & Text Formatting

1. **Syntactic Cadence**:
   - DO NOT begin prompts with "Never have I ever" or "I have...".
   - ALWAYS start with an active past-tense or past-participle verb anchor.

2. **Length and Word Count**:
   - DO NOT write prompts shorter than 15 characters or longer than 68 characters.
   - ALWAYS keep character counts between 15 and 68 characters.
   - DO NOT write prompts shorter than 3 words or longer than 12 words.
   - ALWAYS keep word counts between 3 and 12 words.

3. **Casing and Punctuation**:
   - DO NOT use lowercase initial letters or missing terminal punctuation.
   - ALWAYS start with a capital letter and terminate with a period or question mark.

---

## 2. Dataset Distribution & Integrity

1. **Balance and Sequential IDs**:
   - DO NOT alter the strict distribution of 50 cards per level across Levels 1 to 10.
   - ALWAYS maintain strictly 50 cards per level and 500 cards in total.
   - DO NOT break sequential ID formatting.
   - ALWAYS assign sequential IDs from `q-001` through `q-500`.

2. **Tier Calibration**:
   - DO NOT assign incorrect tiers to levels.
   - ALWAYS assign `chill` to Levels 1–3, `party` to Levels 4–7, and `spicy` to Levels 8–10.

---

## 3. Deduplication & Verification Gate

1. **Semantic Uniqueness**:
   - DO NOT introduce duplicate prompts or near-duplicate situational premises.
   - ALWAYS confirm semantic token overlap is below 40% against all other cards.

2. **Mechanical Verification**:
   - DO NOT finish dataset modifications without executing automated verification.
   - ALWAYS execute `node scripts/verify-dataset.mjs` and verify passing status.
