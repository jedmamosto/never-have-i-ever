# Never Have I Ever: Question Card Golden Template & Authoring Standard

> **Single Source of Truth (SSOT)** for authoring, evaluating, and validating question cards in the *Never Have I Ever* dataset ([`src/data/questions.ts`](file:///c:/Users/ASUS/Documents/VSCode/never-have-i-ever/src/data/questions.ts)).

---

## 1. Quick Reference: Card Schema

Every card in the dataset strictly implements the `QuestionCard` TypeScript interface:

```typescript
export interface QuestionCard {
  id: string;        // Sequential format: 'q-001' to 'q-500'
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  tier: 'chill' | 'party' | 'spicy';
  category: string;  // e.g., 'PARTY LORE', 'PETTY ARCHIVES', 'SOCIAL CRIMES', 'PLOT TWISTS'
  text: string;      // The prompt adhering to all mechanical and linguistic invariants
}
```

---

## 2. The 5 Core Mechanical Invariants

All prompts must satisfy these non-negotiable validation constraints:

| # | Invariant | Specification | Valid Example | Invalid Example |
|---|---|---|---|---|
| **1** | **Syntactic Anchor** | Must complete `"[Never have I ever...] {Action}"` using an active past-tense / past-participle verb. | `Passed the tagay glass without drinking.` | `I always pass the drink.` *(Not past-participle)* |
| **2** | **No Prefix Bloat** | Must **never** begin with `"Never have I ever"` or `"I have..."`. | `Muted an extended family group chat indefinitely.` | `Never have I ever muted a group chat.` |
| **3** | **Character Length** | Strictly between **15 and 68 characters** (inclusive). | 49 chars: `Hoarded the pulutan bowl on my side of the table.` | 72 chars: *(Too long for mobile layout)* |
| **4** | **Word Count** | Strictly between **3 and 12 words** (inclusive). | 8 words: `Texted 'on the way' while still in bed.` | 14 words: *(Fails one-breath out-loud test)* |
| **5** | **Punctuation & Case** | Must start with a **Capital Letter** and terminate with a period (`.`) or question mark (`?`). | `Lost a sneaker or heel on a crowded club dance floor.` | `lost a sneaker on the dance floor` *(No cap, no period)* |

---

## 3. Tier & Level Escalation Hierarchy

The dataset consists of **strictly 500 questions** evenly distributed into **exactly 50 cards per level** (Levels 1 to 10):

```
[CHILL TIER: Levels 1–3] ──► [PARTY TIER: Levels 4–7] ──► [SPICY TIER: Levels 8–10]
Relatable social fibs,         Inuman rituals, pulutan wars,      Situationships, late-night texts,
awkwardness & habits.          messy club lore & GC drama.        deep secrets & in-room romantic tension.
```

### Tier 1: Chill (Levels 1–3) — 150 Cards (50/level)
- **Target Hit Rate**: 60% – 85%
- **Tone**: Universal, lighthearted, safe for family/coworkers, zero social threat.
- **Themes**: Everyday white lies, commute struggles (EDSA/MRT), Shopee checkouts, condiment habits, GCash notifications.
- **Authorized Categories**: `MODERN HABITS`, `SOCIAL FIBS`, `CULINARY SINS`, `PETTY ARCHIVES`, `DIGITAL CHAOS`
- **Exemplars**:
  - `[q-021 | L1]`: *Texted 'On my way!' while still in bed.*
  - `[q-076 | L2]`: *Muted an extended family group chat indefinitely.*
  - `[q-119 | L3]`: *Sent a cropped GCash receipt to prove I paid my ambag.*

### Tier 2: Party (Levels 4–7) — 200 Cards (50/level)
- **Target Hit Rate**: 30% – 55%
- **Tone**: High-energy, loud group banter, college/barkada party culture, hangover regret.
- **Themes**: *Tagay* circle evasion, pulutan hoarding, Poblacion/BGC clubbing, videoke gatekeeping, work attendance while hungover, separate gossip GCs.
- **Authorized Categories**: `PARTY LORE`, `PETTY ARCHIVES`, `TRAVEL CHAOS`, `SOCIAL CRIMES`, `PLOT TWISTS`, `DEEP LORE`
- **Exemplars**:
  - `[q-152 | L4]`: *Mixed beer with iced tea to survive the drinking circle.*
  - `[q-211 | L5]`: *Dodged the inuman ambag by playing asleep.*
  - `[q-268 | L6]`: *Cried inside a Poblacion bar bathroom.*
  - `[q-311 | L7]`: *Created a separate GC to talk about a friend.*

### Tier 3: Spicy (Levels 8–10) — 150 Cards (50/level)
- **Target Hit Rate**: 10% – 35%
- **Tone**: Sensual, vulnerable, high-stakes romantic tension, electric in-room confessions.
- **Themes**: Situationships, soft-launching on IG, 2 AM Angkas visits, toxic exes, backburners, and direct in-room confessions.
- **Authorized Categories**: `MIDNIGHT SECRETS`, `DANGEROUS CRUSHES`, `ROMANTIC TENSION`, `UNFILTERED CONFESSIONS`, `SPICY LORE`
- **Exemplars**:
  - `[q-363 | L8]`: *Fell for someone who was already soft-launching someone else.*
  - `[q-419 | L9]`: *Booked a 2 AM Angkas straight to a fling's condo in BGC.*
  - `[q-451 | L10]`: *Had a crush on someone in this room.*
  - `[q-460 | L10]`: *Hooked up with someone in this room.*

---

## 4. Sociolinguistic Register: Colloquial Urban Philippine English (CUPE)

Prompts strike an organic code-switching balance between natural urban English and cultural Filipino touchstones:

```
[Archaic Formal Tagalog] ◄── [CUPE + Taglish Sweet Spot] ──► [Sterile Western Trope]
"Kailanman ay hindi pa..."    "Dodged the inuman ambag       "Skipped the frat party
(Too stiff / awkward)         by pretending to sleep."       cover charge by lying..."
                              (Organic & Relatable)          (Alien & Distant)
```

### Cultural Mapping Quick Guide:
- ❌ *Venmo / CashApp* ➔ ✅ **GCash / Maya**
- ❌ *Uber / Lyft* ➔ ✅ **Grab / Angkas / JoyRide**
- ❌ *Kegger / Frat party* ➔ ✅ **Inuman / Tagay session / Poblacion**
- ❌ *Bar snacks / Pretzels* ➔ ✅ **Pulutan (Sisig, Isaw, Mani, Chicharon)**
- ❌ *Late-night diner* ➔ ✅ **Jollibee 24/7 / 4 AM Pares Overload / Tapsilog**
- ❌ *Thanksgiving dinner* ➔ ✅ **Family Reunion / Christmas Fiesta / Tita interrogation**

---

## 5. Duplicate Prevention & Semantic Uniqueness

Before introducing or swapping any prompt:
1. **Exact Uniqueness**: Must not match any existing normalized string in the dataset.
2. **Semantic Similarity Gate**: Token Jaccard overlap must remain **$< 40\%$** against all existing prompts.
3. **Core Concept Audit**: Do not duplicate core situational premises across levels (e.g., avoid multiple prompts about crying in club bathrooms, ninja exits from drinking sessions, or chicken skin theft).

---

## 6. Verification Commands

Always run the automated verification script and full build verification before declaring changes complete:

```powershell
# 1. Verify all 500 cards against strict mechanical gates
node scripts/verify-dataset.mjs

# 2. Verify TypeScript compile & production Next.js build
npm run build
```
