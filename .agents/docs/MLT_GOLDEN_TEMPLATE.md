# Most Likely To: Question Card Golden Template & Authoring Standard

> **Single Source of Truth (SSOT)** for authoring, evaluating, and validating question cards in the *Most Likely To* dataset ([`src/data/most-likely-to.ts`](file:///c:/Users/ASUS/Documents/VSCode/never-have-i-ever/src/data/most-likely-to.ts)).
>
> **Companion Architecture**: Synchronized with the sister reference [`.agents/docs/QUESTION_GOLDEN_TEMPLATE.md`](file:///c:/Users/ASUS/Documents/VSCode/never-have-i-ever/.agents/docs/QUESTION_GOLDEN_TEMPLATE.md) and grounded in the empirical behavioral framework of [`.agents/docs/research/mlt-question-framework-dossier.md`](file:///c:/Users/ASUS/Documents/VSCode/never-have-i-ever/.agents/docs/research/mlt-question-framework-dossier.md).

---

## 1. Quick Reference: Card Schema

Every card in the dataset strictly implements the `QuestionCard` TypeScript interface:

```typescript
export interface QuestionCard {
  id: string;        // Sequential format: 'mlt-001' to 'mlt-500'
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  tier: 'chill' | 'party' | 'spicy';
  category: string;  // Authorized per level, e.g., 'INUMAN ETIQUETTE', 'AMBAG EVASION', 'MARUPOK MOMENTS'
  text: string;      // The prompt adhering to all mechanical and linguistic invariants
}
```

---

## 2. The 5 Core Mechanical Invariants

All prompts must satisfy these non-negotiable validation constraints:

| # | Invariant | Specification | Valid Example | Invalid Example |
|---|---|---|---|---|
| **1** | **Syntactic Anchor** | Must complete `"[Who is most likely to...] {Action}"` using an **active base verb** (bare infinitive predicate). | `Pass the tagay glass without drinking.` | `Passed the tagay glass.` *(Past tense / NHIE syntax)* |
| **2** | **No Prefix Bloat** | Must **never** begin with `"Most likely to"` or `"Who is most likely to"`. | `Blame EDSA traffic for waking up at noon.` | `Most likely to blame EDSA traffic.` *(Wastes screen budget)* |
| **3** | **Character Length** | Strictly between **15 and 70 characters** (inclusive). | 46 chars: `Disappear into thin air when the bill arrives.` | 76 chars: *(Causes multi-line truncation on mobile)* |
| **4** | **Word Count** | Strictly between **4 and 12 words** (inclusive). | 8 words: `Send a cropped GCash screenshot with no timestamp.` | 3 words: `Sleep all day.` *(Fails narrative grounding)* |
| **5** | **Punctuation & Case** | Must start with a **Capital Letter** and terminate with a period (`.`). | `Queue five Aegis songs in a row at videoke.` | `queue five Aegis songs` *(Missing capital & period)* |

---

## 3. Tier & Level Escalation Hierarchy

The dataset consists of **strictly 500 questions** evenly distributed into **exactly 50 cards per level** (Levels 1 to 10):

```
[CHILL TIER: Levels 1–3] ──► [PARTY TIER: Levels 4–7] ──► [SPICY TIER: Levels 8–10]
Domestic quirks, clumsy        Inuman rituals, pulutan wars,      Situationships, late-night texts,
habits & workplace fibs.       GC drama & Poblacion lore.         sneaky flings & in-room sparks.
```

### Tier Calibration Matrix

| Tier | Level | Thematic Scope | Target Split $C(Q)$ | Authorized Categories |
| :---: | :---: | :--- | :---: | :--- |
| **Chill** | **1** | Domestic quirks, food habits & physical clumsiness | 0.70 – 0.90 | `DOMESTIC QUIRKS`, `CLUMSY HABITS`, `CULINARY SINS` |
| **Chill** | **2** | Everyday white lies, Filipino time & workplace laziness | 0.75 – 0.95 | `SOCIAL FIBS`, `MODERN HABITS`, `WORKPLACE LAZINESS` |
| **Chill** | **3** | Family reunion drama, tita dodging & social anxiety | 0.70 – 0.90 | `PETTY ARCHIVES`, `SOCIAL ANXIETY`, `FAMILY DRAMA` |
| **Party** | **4** | Pulutan wars, videoke mic battles & table banter | 0.80 – 0.95 | `PULUTAN WARS`, `VIDEOKE ANTHEMS`, `TABLE BANTER` |
| **Party** | **5** | Inuman etiquette, ambag dodging & tagay circle evasion | 0.80 – 0.95 | `INUMAN ETIQUETTE`, `AMBAG EVASION`, `PARTY LORE` |
| **Party** | **6** | Poblacion/BGC clubbing, bathroom crying & wild decisions | 0.75 – 0.95 | `NIGHTLIFE LORE`, `BAR SECRETS`, `SOCIAL CRIMES` |
| **Party** | **7** | Secret GCs, screenshot leaks & impulsive weekend trips | 0.70 – 0.90 | `GC DRAMA`, `TRAVEL CHAOS`, `PLOT TWISTS`, `DEEP LORE` |
| **Spicy** | **8** | Marupok relapses, talking stages & red flag denial | 0.75 – 0.95 | `MARUPOK MOMENTS`, `TALKING STAGES`, `DANGEROUS CRUSHES` |
| **Spicy** | **9** | 2 AM Angkas rides, secret condo flings & sneaky moves | 0.70 – 0.90 | `MIDNIGHT SECRETS`, `SNEAKY FLINGS`, `SPICY LORE` |
| **Spicy** | **10**| Direct in-room attraction, secret crushes & live sparks | 0.65 – 0.85 | `IN-ROOM VOLTAGE`, `ROMANTIC TENSION`, `UNFILTERED CONFESSIONS` |

---

### Level-by-Level Reference & 30 Pristine Exemplars

#### Tier 1: Chill (Levels 1–3) — 150 Cards (50/level)
*Vibe: Harmless domestic eccentricities, warm-up laughter, zero social threat.*

- **Level 1: Domestic Quirks & Physical Clumsiness**
  - `[mlt-001 | L1]`: *Trip over a flat, completely smooth floor.* (43 chars, 7 words)
  - `[mlt-015 | L1]`: *Lose their phone while literally holding it.* (44 chars, 7 words)
  - `[mlt-032 | L1]`: *Eat the last piece of chicken skin without asking.* (50 chars, 9 words)
- **Level 2: Everyday White Lies, Filipino Time & Modern Laziness**
  - `[mlt-055 | L2]`: *Blame EDSA traffic for waking up at noon.* (41 chars, 8 words)
  - `[mlt-068 | L2]`: *Check out ten Shopee items during a meeting.* (44 chars, 8 words)
  - `[mlt-089 | L2]`: *Text 'on the way na' while still in the shower.* (47 chars, 10 words)
- **Level 3: Tita Interrogations & Public Social Awkwardness**
  - `[mlt-105 | L3]`: *Hide in the bathroom to dodge family reunion chismis.* (53 chars, 9 words)
  - `[mlt-122 | L3]`: *Pretend to take a call to escape small talk.* (44 chars, 9 words)
  - `[mlt-140 | L3]`: *Keep the plastic film on a two-year-old gadget.* (47 chars, 8 words)

#### Tier 2: Party (Levels 4–7) — 200 Cards (50/level)
*Vibe: High table energy, loud group banter, nightlife receipts, friend-group drama.*

- **Level 4: Pulutan Wars & Videoke Anthems**
  - `[mlt-160 | L4]`: *Queue five Aegis songs in a row at videoke.* (43 chars, 9 words)
  - `[mlt-175 | L4]`: *Finish the sisig before the first bucket arrives.* (49 chars, 8 words)
  - `[mlt-190 | L4]`: *Hoard the microphone for an entire three-hour session.* (54 chars, 8 words)
- **Level 5: Inuman Etiquette & Ambag Evasion**
  - `[mlt-210 | L5]`: *Disappear into thin air when the bill arrives.* (46 chars, 8 words)
  - `[mlt-225 | L5]`: *Send a cropped GCash screenshot with no timestamp.* (50 chars, 8 words)
  - `[mlt-240 | L5]`: *Declare 'one drink lang' then close down the bar.* (49 chars, 9 words)
- **Level 6: Poblacion/BGC Nightlife & Wild Decisions**
  - `[mlt-260 | L6]`: *Cry inside a Poblacion bar bathroom over nothing.* (49 chars, 8 words)
  - `[mlt-275 | L6]`: *Befriend the bouncer just to get free entrance.* (47 chars, 8 words)
  - `[mlt-290 | L6]`: *Lose an expensive shoe or heel during a night out.* (50 chars, 10 words)
- **Level 7: Group Chat Drama & Impulsive Getaways**
  - `[mlt-310 | L7]`: *Create a separate GC to talk about someone here.* (48 chars, 9 words)
  - `[mlt-325 | L7]`: *Book an impulsive weekend Elyu trip at 3 AM.* (44 chars, 9 words)
  - `[mlt-340 | L7]`: *Leak a gossip screenshot to the main group chat.* (48 chars, 9 words)

#### Tier 3: Spicy (Levels 8–10) — 150 Cards (50/level)
*Vibe: Sensual tension, vulnerable romantic secrets, electric in-room callouts.*

- **Level 8: Marupok Relapses & Situationship Delusions**
  - `[mlt-360 | L8]`: *Reply within two seconds to an unblocked toxic ex.* (50 chars, 9 words)
  - `[mlt-375 | L8]`: *Defend an eight-month talking stage with zero label.* (52 chars, 8 words)
  - `[mlt-390 | L8]`: *Soft-launch someone new on IG every two months.* (47 chars, 8 words)
- **Level 9: Sneaky Late-Night Moves & High-Stakes Flings**
  - `[mlt-410 | L9]`: *Book a 2 AM Angkas straight to a fling's condo.* (47 chars, 10 words)
  - `[mlt-425 | L9]`: *Hold hands secretly under the inuman table tonight.* (51 chars, 8 words)
  - `[mlt-440 | L9]`: *Hook up with someone whose name they forgot.* (44 chars, 8 words)
- **Level 10: Live In-Room Electricity & Apex Callouts**
  - `[mlt-460 | L10]`: *Kiss someone sitting in this room before the night ends.* (56 chars, 10 words)
  - `[mlt-475 | L10]`: *Confess a secret crush on someone playing right now.* (52 chars, 9 words)
  - `[mlt-490 | L10]`: *Admit they came to this inuman just to see one person.* (54 chars, 11 words)

> [!IMPORTANT]
> **Level 10 In-Room Ratio Guardrail**: Direct in-room callouts (`"someone in this room"`, `"someone playing right now"`) are strictly forbidden below Level 10. Within Level 10, maintain a 3:7 ratio between direct in-room prompts and apex legendary lore cards to avoid social fatigue.

---

## 4. The Anti-Scapegoat & Dual-Vice Engineering Standard

### 4.1 Eliminating "The Dave Trap"
In naive party game design, questions that test a single negative axis (*"Go to jail"*, *"Black out first"*) cause the group to repeatedly point at one designated wild friend ("Dave"). This triggers René Girard's Scapegoat Mechanism, resulting in:
1. **Zero Suspense**: Vote entropy drops to 0 bits.
2. **Relational Harm**: The targeted player experiences public bullying, retreats into silence (*tampo*), or reacts with anger (*pikon*).
3. **Game Death**: The room freezes and play halts.

### 4.2 The Normalized Controversy Index $C(Q)$
To guarantee spirited debate, every prompt is modeled using Shannon Entropy normalized over table size $N$:

$$C(Q) = \frac{-\sum_{i=1}^N p_i \log_2(p_i)}{\log_2(N)}$$

- **Banned Trap ($C(Q) < 0.50$)**: Total consensus on one scapegoat.
- **Tepid Diffusion ($C(Q) = 1.00$)**: Random 1-vote scattering with zero conviction.
- **Target Golden Zone ($0.65 \le C(Q) \le 0.95$)**: Room splits between two or three competing candidates, sparking instant vocal debate.

### 4.3 The 5 Dual-Vice Architectural Axes
To engineer a clean room split, prompts must pit **competing human flaws** against each other rather than contrasting virtue against vice:

```
+──────────────────────────────────────────────────────────────────────────────────────────────────+
|                              THE 5 DUAL-VICE ARCHITECTURAL AXES                                  |
+───┬──────────────────────────┬───────────────────────────┬───────────────────────────────────────+
| # │ COMPETING VECTOR A       | COMPETING VECTOR B        | GOLDEN PROMPT ANCHOR                  |
+───┼──────────────────────────┼───────────────────────────┼───────────────────────────────────────+
| 1 │ Impulsive Chaos          | Neurotic Over-Control     | `Print a 10-page itinerary for a 2-day beach trip.`   |
|   | (Acts without thinking)  | (Over-plans every minute) | *(Free spirit vs. Spreadsheet micromanager)*          |
+───┼──────────────────────────┼───────────────────────────┼───────────────────────────────────────+
| 2 │ Shameless Cheapskate     | Insecure Flexer           | `Treat the whole table to drinks just to flex.`       |
|   | (Dodges ambag)           | (Overspends for status)   | *(Ambag dodger vs. Ego spender)*                      |
+───┼──────────────────────────┼───────────────────────────┼───────────────────────────────────────+
| 3 │ The 'Marupok' Relapser   | The 'Pakipot' Ghoster     | `Leave someone on delivered for 2 weeks to play cool.`|
|   | (Replies in 0.5 seconds) | (Calculates cool delay)   | *(Hopeless romantic vs. Toxic detached player)*       |
+───┼──────────────────────────┼───────────────────────────┼───────────────────────────────────────+
| 4 │ The Melodramatic Crier   | The Emotionless Robot     | `Cry while insisting that they are not dramatic.`     |
|   | (Public emotional tears) | (Stubborn emotional denial)| *(Theatrical crier vs. Stoic repressor)*              |
+───┼──────────────────────────┼───────────────────────────┼───────────────────────────────────────+
| 5 │ Clandestine Lurker       | Unfiltered Loudmouth      | `Maintain a fake account just to spy on their ex.`    |
|   | (Operates in the shadows)| (Blasts drama on Main)    | *(Covert stalker vs. Reckless broadcast cannon)*      |
+───┴──────────────────────────┴───────────────────────────┴───────────────────────────────────────+
```

---

## 5. The 10 Philippine Inuman Cultural Archetypes

Every prompt in the dataset anchors to one of the 10 foundational behavioral archetypes of Philippine *barkada* and *inuman* culture:

| # | Archetype | Profile & Behavioral Trigger | Golden Situational Prompt |
|---|---|---|---|
| **1** | **The Ambag Dodger** | Disappears when the bill arrives; claims zero GCash balance; rounds down their share. | `Disappear into thin air when the bill arrives.` |
| **2** | **The Pulutan Vacuum** | Consumes the sizzling sisig and crispy pata before the beer buckets arrive; treats bar snacks as dinner. | `Finish the sisig before the first bucket arrives.` |
| **3** | **The "One Drink Only" Liar** | Arrives promising an early exit for work; by 2:30 AM is ordering tequila rounds and driving to Poblacion. | `Declare 'one drink lang' then close down the bar.` |
| **4** | **The 2 AM Angkas Senders** | Impulsive romantic; books a motorcycle taxi across EDSA in heavy rain to visit an undefined situationship. | `Book a 2 AM Angkas straight to a fling's condo.` |
| **5** | **Toxic Situationship Defender** | Delivers an impassioned symposium justifying being ghosted; claims their partner is "healing their inner child." | `Defend an eight-month talking stage with zero label.` |
| **6** | **The Over-Sharer** | Confesses family secrets, therapy notes, or existential dread after two cocktail sips. | `Confess deep childhood trauma after one cocktail.` |
| **7** | **The Videoke Gatekeeper** | Hoards the songbook; reserves ten tracks in queue; grips the microphone with two hands for Aegis. | `Queue five Aegis songs in a row at videoke.` |
| **8** | **The Tanggero Dictator** | Pours brimful shots for peers while short-pouring their own; enforces zero glass-passing. | `Pour brimful tagay shots while sipping their own.` |
| **9** | **The Ninja Mover** | Vanishes at 1:15 AM without saying goodbye; avoids penalty shots; texts *"Nakatulog na ako"* from home. | `Execute a clean ninja exit before the bill drops.` |
| **10**| **The GCash Receipt Cropper** | Sends a screenshot with the timestamp, date, and transaction number conveniently cropped out. | `Send a cropped GCash screenshot with no timestamp.` |

---

## 6. Table Consequence Rules & The Right of Defense

Gameplay unfolds through synchronous physical gestures and table rituals:

```
[1. VOCAL PROMPT] ──► [2. COUNTDOWN 3-2-1] ──► [3. POINT!] ──► [4. 10s DEFENSE] ──► [5. CONSEQUENCE]
Reader speaks card    Hands ready; table        Fingers thrust   "Bakit ako?!"     Plurality drinks;
in a single breath.   chants synchronized.      simultaneously.  Rebuttal timer.   Laughter settles.
```

### Table Consequence Matrix

| Situation | Voting Outcome | Consequence & Ritual |
|---|---|---|
| **Standard Plurality** | One player receives the most fingers | Target takes 1 standard sip. |
| **Two-Way Tie** | Two players tie for the plurality | **The Duel Clink**: Both players clink glasses and drink, or table calls a 3-second sudden-death runoff. |
| **The Firing Squad** | 100% of the room points at one player | **Double Penalty**: Target takes a **DOUBLE shot** (or the entire room toasts the target). |
| **Table Mourning** | Every player receives exactly 1 vote | Total diffusion; everyone at the table takes 1 sip. |
| **The Reverse Card** | Player pointed at themselves **AND** won the vote | **Power Move**: Target is immune; everyone who pointed at them must take 1 sip! |
| **The Guilt Blunder** | Player pointed at themselves but **NOBODY** else did | **Guilt Penalty**: Player drinks 1 sip for exposing their own guilty conscience. |

### The 10-Second Right of Defense
The accused plurality target possesses the non-negotiable **Right of Defense**:
1. When fingers land, the target has an uninterrupted **10-second rebuttal timer**.
2. They may produce immediate receipts or redirect blame (*"Bakit ako?! Si Carlo ang nag-takeout ng sisig last week!"*).
3. If the defense makes the room erupt in laughter, the table may vote via quick show of hands to **Transfer the Tagay** to the newly exposed culprit.

---

## 7. Sociolinguistic Register: Colloquial Urban Philippine English (CUPE)

Prompts maintain an organic code-switching balance between contemporary urban English and authentic Filipino touchstones:

```
[Archaic Formal Tagalog] ◄── [CUPE + Taglish Sweet Spot] ──► [Sterile Western Trope]
"Sino ang pinaka-posibleng..." "Disappear into thin air       "Skip the frat party cover
(Stiff, unnatural party vibe)   when the bill arrives."        charge by lying to the bouncer."
                               (Organic & Instantly Shouted)  (Culturally alien & distant)
```

### Cultural Localization Mapping

| ❌ Sterile Western Trope | ✅ Culturally Grounded Touchstone (CUPE / Taglish) |
|---|---|
| *Venmo / CashApp* | **GCash / Maya** |
| *Uber / Lyft* | **Grab / Angkas / JoyRide** |
| *Frat party / Kegger* | **Inuman / Tagay circle / Poblacion / BGC** |
| *Pretzels / Bar peanuts* | **Pulutan (Sisig, Isaw, Mani, Chicharon, Crispy Pata)** |
| *Late-night diner* | **Jollibee 24/7 / 4 AM Pares Overload / Tapsilog** |
| *Thanksgiving dinner* | **Family Reunion / Christmas Fiesta / Tita interrogation** |

### The Asar vs. Pikon Safety Boundary
- **The "Laro Lang" Invariant**: Prompts must target **voluntary, self-inflicted comedic foibles** (e.g., ordering late-night food, being *marupok*, hoarding the videoke mic, waking up late).
- **Strictly Banned Topics**: Real financial insolvency or debt, severe clinical conditions, body shaming, reproductive choices, and unresolved family grief.

---

## 8. Duplicate Prevention & Semantic Uniqueness

Before accepting any new prompt into the dataset:
1. **Exact Uniqueness**: Text must not match any existing normalized prompt across both `most-likely-to.ts` and `questions.ts`.
2. **Semantic Similarity Gate**: Token Jaccard overlap must remain **$< 35\%$** against all existing cards.
3. **Core Concept Cap**: A single situational trope (e.g., crying in club bathrooms, sending fake GCash receipts, booking Angkas) may appear **at most twice** across the entire 500-card deck, provided each instance targets a completely different level and behavioral angle.

---

## 9. Authoring & PR Review Checklist

Every submitted card must pass all 12 criteria before merging:

- [ ] **1. Syntactic Anchor**: Begins with an active base verb / bare infinitive predicate.
- [ ] **2. Prefix Purge**: Contains zero occurrences of `"Most likely to"` or `"Who is most likely to"`.
- [ ] **3. Character Length**: Strictly between **15 and 70 characters** (inclusive).
- [ ] **4. Word Count**: Strictly between **4 and 12 words** (inclusive).
- [ ] **5. Punctuation & Case**: Begins with a capital letter and terminates with a period (`.`).
- [ ] **6. Acoustic Readability**: Passes the single-breath, loud-room vocal test (< 2.5 seconds).
- [ ] **7. Controversy Gate**: Embeds dual-vice polarity producing an estimated $C(Q) \ge 0.65$.
- [ ] **8. Anti-Scapegoat Audit**: Cannot be weaponized to repeatedly single out a solitary "Dave".
- [ ] **9. Cultural Grounding**: Employs organic Colloquial Urban Philippine English (CUPE).
- [ ] **10. Lovable Anti-Hero**: Targets relatable, affectionate human flaws; zero cruelty or malice.
- [ ] **11. Tier & Level Match**: Strictly matches the assigned level's thematic scope and authorized category.
- [ ] **12. Level 10 Guardrail**: Direct in-room targeting (`"in this room"`) is strictly confined to Level 10.

---

## 10. Verification Commands

Always run dataset integrity verification and full build compilation before submitting:

```powershell
# 1. Verify MLT dataset mechanical invariants and integrity (once src/data/most-likely-to.ts is seeded)
node scripts/verify-mlt-dataset.mjs

# 2. Verify core NHIE dataset integrity
node scripts/verify-dataset.mjs

# 3. Verify TypeScript compile & production Next.js build
npm run build
```
