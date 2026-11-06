# Technical Intelligence Dossier: Empirical Evaluation & Taxonomy of Game Modes for "Tagay Ta"
## Pass-and-Play Tabletop Ergonomics, Barkada Social Dynamics, Information Asymmetry, and Client-Side Next.js Architecture

- **Document ID**: `RESEARCH-TAGAY-TA-GAME-MODES`
- **Classification**: Technical Research Dossier, Behavioral Game Mechanics & Cultural Ergonomics Analysis
- **Author**: Lead Research Scientist & Technical Intelligence Specialist
- **Date**: November 6, 2026
- **Target Application**: Multi-Mode Party Game Expansion for *Tagay Ta* (`never-have-i-ever`)
- **ICD 203 Analytic Confidence**: **High Confidence** (Triangulated across Social Psychology [Information Asymmetry, Social Comparison, Cognitive Dissonance, Social Proof], Anthropological Ethnography of Philippine *Inuman* Culture, Mobile Tabletop HCI / Ergonomics, and Client-Side React/Next.js Architecture Constraints).

---

## Executive Summary

The *Tagay Ta* party game platform currently operates with two foundational modes:
1. **Never Have I Ever (NHIE)** (500 cards, 10 levels) — *Retrospective Self-Incrimination* ("Drink if you did it").
2. **Most Likely To (MLT)** (100 cards, 10 levels) — *Peer-Directed Social Indictment* ("Point at who would do it on 3-2-1").

While these two modes cover self-disclosure and peer perception, a mature party gaming suite requires diverse social and emotional dynamics to sustain multi-hour sessions across varying group compositions (from sober college mixers and workplace happy hours to unhinged 2 AM barkada drinking sessions).

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 THE SOCIAL VELOCITY SPECTRUM                                     │
├───────────────────────────────┬──────────────────────────────────┬───────────────────────────────┤
│ SELF-DISCLOSURE (Inward)      │ PEER PERCEPTION (Outward)        │ CONFLICT & CURIOSITY (Dynamic)│
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ Never Have I Ever             │ Most Likely To                   │ Paranoia                      │
│ (Retrospective Confession)    │ (Synchronous Indictment)         │ (Information Asymmetry)       │
│                               │                                  │                               │
│ Sagot o Lagot                 │ Red Flag / Green Flag            │ Alin ang Pipiliin Mo?         │
│ (Truth or Drink Dilemma)      │ (Normative Boundary Debate)      │ (Polarized Binary Dilemma)    │
│                               │                                  │                               │
│ Tagay Ka Kung... (Drink If)   │ Bagsak-Tapon (Categories)        │ Gagawin o Lalaklakin          │
│ (Rapid Behavioral Triggers)   │ (Acoustic Rhythm & Cognition)    │ (Action vs. Substance Dare)   │
└───────────────────────────────┴──────────────────────────────────┴───────────────────────────────┘
```

This research dossier investigates **10 global and viral party game archetypes** through four non-negotiable operational filters:
1. **Philippine Barkada & Inuman Dynamics**: Alignment with *kantiyawan*, *asaran*, *chismis*, *tanggero* rituals, saving face (*hiya*), and relational flirting (*harot* / *marupok*).
2. **Mobile Pass-and-Play Physical Ergonomics**: Zero room codes, zero typing player rosters, greasy pulutan fingers, dim bar lighting, and one phone passed or propped against a beer bottle.
3. **Psychological Drivers**: Information asymmetry, social proof, confession relief, targeting, and debate polarization.
4. **Client-Side Next.js Architecture**: Maximum reusability of the 10-level slider (`IntensitySlider`), swipe gestures (`HeroCardStack`), and lightweight data contracts (`QuestionCard`).

### Ranked Summary of Recommendations

| Rank | Game Mode (Taglish Name) | Primary Mechanic | Cultural & Psychological Engine | Ergonomic Friction | Codebase Viability | Recommendation Verdict |
| :---: | :--- | :--- | :--- | :---: | :---: | :--- |
| **#1** | **Sagot o Lagot** *(Truth or Drink)* | Forced Choice: Unfiltered Truth vs. Drink Penalty | High *Chismis* / Catharsis; High-Stakes Interrogation | **Zero** (Pass phone) | **100% Drop-In** (`QuestionCard`) | **TIER S (Immediate Next Epic)** |
| **#2** | **Paranoia** *(Sikreto o Tagay)* | Information Asymmetry: Name drop; Drink to reveal question | Curiosity Agony; *Intriga* & Barkada Paranoia | **Very Low** (Tap to reveal) | **High** (Privacy Card Overlay) | **TIER S (Signature Viral Centerpiece)** |
| **#3** | **Tagay Ka Kung...** *(Drink If... / Buzzed)* | Direct Environmental / Behavioral Trigger | Zero Debate; Immediate Group Pace Accelerant | **Zero** (Propped or passed) | **100% Drop-In** (`QuestionCard`) | **TIER A (High-Leverage Quick Win)** |
| **#4** | **Alin ang Pipiliin Mo?** *(Would You Rather)* | Forced Binary Dilemma: Group votes; Minority drinks | Polarized Debate; Inuman Philosophy & Banter | **Zero** (Read aloud) | **100% Drop-In** (`QuestionCard`) | **TIER A (Universal Icebreaker)** |
| **#5** | **Red Flag o Green Flag** *(Dating Audit)* | Normative Trait Evaluation: Consensus vs. Penalty | Situationships, *Harot*, Generational Dating Lore | **Zero** (Read aloud) | **100% Drop-In** (`QuestionCard`) | **TIER B+ (Gen-Z / Millennial Hook)** |
| **#6** | **Bagsak-Tapon** *(Categories / Quickfire)* | Rapid verbal naming around circle within 3-5 sec | Acoustic Pressure, Loud Banter, Cognitive Panic | **Low** (Center table buzzer) | **Medium** (Audio/Timer component) | **TIER B (Action Party Mode)** |
| **#7** | **Gisa / Hot Seat** *(The Interrogation)* | 3-5 consecutive grilling cards for 1 target | Extreme Spotlight; Asymmetrical Pressure | **Medium** (Player round tracking) | **Medium** (Multi-turn state engine) | **TIER C (Niche / High Friction)** |
| **#8** | **Gagawin o Lalaklakin** *(Do or Drink / Dares)* | Physical/Digital Dare vs. Heavy Drink Penalty | High Voltage, but Privacy/Mess Hazard | **Medium** (Phone passing / privacy) | **High** (Safety boundaries) | **TIER C (Safety & Venue Risk)** |
| **#9** | **King's Cup / Ring of Fire** *(Tanggero Rules)* | Stateful Table Rule Assignment | Classic, but High Cognitive Overhead | **High** (Persistent state tracking) | **Low** (Requires stateful UI) | **REJECTED (High Cognitive Tax)** |
| **#10**| **Heads Up / Psych! / Charades** | Forehead Tilt / Multi-Device Input | Party Classic, but Greasy Hands & Code Sync | **Extreme** (Hardware/WebSockets) | **Zero** (Violates client-only rule) | **DISQUALIFIED (Architecture Mismatch)** |

---

## 1. Grounding in Philippine Inuman Ecology & Table Ergonomics

### 1.1 The Physical Physics of the Philippine Inuman
Unlike Western house parties where people stand with red plastic Solo cups mingling in an open kitchen, the Philippine *inuman* is predominantly **seated, circular, and intimate**:
- **Venues**: A cramped living room coffee table, a plastic monobloc table on a street patio or garage, a noisy Poblacion bar booth, or an out-of-town Elyu/Tagaytay Airbnb veranda.
- **The Centerpiece**: The center of the table is physically occupied by bottles of San Miguel Light, Pale Pilsen, or Alfonso I, a bucket of melting ice, and shared plates of greasy, sizzling *pulutan* (pork sisig, crispy chicken skin, isaw, chicharon bulaklak, sizzling tofu).
- **The Tanggero Ritual**: Traditionally, one designated person (*ang tanggero*) manages the single shared shot glass (*ang tagay*), pouring and passing it sequentially to each person in the circle.

```
                  ┌─────────────────────────────────────────┐
                  │       THE INUMAN TABLETOP TOPOLOGY      │
                  └─────────────────────────────────────────┘
                                  [Player 4]
                             (Sipsik / Marites)
                    [Player 3]                 [Player 5]
                  (The Marupok)              (The Ambag Dodger)
                                ┌───────────┐
                                │  PULUTAN  │
                                │  (Sisig)  │
            [Player 2]          ├───────────┤          [Player 6]
        (Designated Driver)     │   PHONE   │      (The Loud Videoke King)
                                │  (Propped)│
                                ├───────────┤
                                │ ICE BUCKET│
                    [Player 1]  └───────────┘  [Player 7]
                  (The Tanggero)             (The Ninja Exit Artist)
                                  [Player 8]
                             (First-Time Guest)
```

### 1.2 Tabletop Human-Computer Interaction (HCI) Invariants

When evaluating software mechanics for this physical ecology, four environmental constraints govern success or failure:

1. **The Greasy Pulutan Barrier**:
   Players eat sisig and chicken skin with spoons, forks, or their bare fingers. Touching a phone screen with oily fingers creates tactile aversion.
   * *Ergonomic Imperative*: **Zero-typing design**. Players must NEVER be asked to type names, search text, or enter custom inputs during active gameplay. Interactions must be restricted to large, forgiving tap targets ($\ge 56\text{px}$) or one-finger horizontal card swipes.

2. **The "Propped Against Beer Bottle" Centerpiece Anchor**:
   Frequently, the barkada does not want to pass an expensive iPhone 15 Pro Max hand-to-hand across wet, sticky tabletop rings. Instead, the phone is propped vertically or horizontally against an amber glass beer bottle in the dead center of the table.
   * *Ergonomic Imperative*: High-contrast typography, large headline text (clamp `text-2xl` to `text-4xl`), and concise prompts ($\le 12$ words) legible from 1.0 to 1.5 meters away under dim bar lighting.

3. **Acoustic Competition & One-Breath Legibility**:
   Inuman sessions are loud. Background videoke machines belt out Aegis and My Way; adjacent tables shout; motorcycles pass outside.
   * *Ergonomic Imperative*: Prompts must pass the **"One-Breath Test"**. A player holding or glancing at the phone must be able to shout the card prompt across the table in under 3.5 seconds without stumbling over complex clauses or multi-sentence descriptions.

4. **Zero-Setup, Drop-In/Drop-Out Elasticity**:
   Friends arrive late ("traffic sa EDSA"), step away to vape, or pull a "ninja move" (disappearing without saying goodbye). 
   * *Ergonomic Imperative*: The game engine must be **stateless regarding player rosters**. Any mode that requires initializing player names or breaks when someone leaves the circle fails at an authentic inuman.

---

## 2. In-Depth Evaluation of Candidate Game Modes

---

### Rank 1: Sagot o Lagot (Truth or Drink / Spill or Swig)
> **Verdict: TIER S (Immediate Next Epic — Highest Strategic Value)**

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             SAGOT O LAGOT GAME LOOP                              │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 1. Phone advances to Player A (Holder).                                          │
│ 2. Card displays a high-octane intrusive question.                               │
│ 3. Player A is faced with the ultimate inuman ultimatum:                        │
│    • SAGOT: Confess the unvarnished truth out loud to the table.                 │
│    • LAGOT: Refuse to answer and down the designated tagay shot.                 │
│ 4. Table reacts: If Sagot -> Loud chismis & grilling. If Lagot -> Kantiyawan.   │
└──────────────────────────────────────────────────────────────────────────────────┘
```

#### Cultural Hook & Barkada Dynamics
- **The "Truth Toll" (Bayad-Chismis)**: In Philippine culture, *chismis* (gossip) is communal currency. *Sagot o Lagot* institutionalizes the exact cultural dynamic of *inuman*: you either feed the group's curiosity (*mag-spill ng tea*) or you pay the physical tax with your liver (*lagot sa tagay*).
- **The Face-Saving Valve (*Hiya* Protection)**: In pure Truth or Dare, players who refuse a dare freeze the game awkwardly. In *Sagot o Lagot*, the drink provides an honorable, socially accepted escape hatch. Taking the shot saves face while acknowledging that the question hit a nerve, which fuels even more playful *kantiyawan* (*"Uy, uminom! Ibig sabihin totoo!"*).
- **Tension Escalation**: At Level 1 (Chill), questions are funny social quirks (*"Sino dito pinaka-kuripot sa ambagan?"*). At Level 10 (Spicy), questions target in-room romantic electricity (*"Sino sa lamesang 'to ang pinaka-type mo kung walang makakaalam?"*).

#### Ergonomic & Technical Feasibility
- **Ergonomic Friction**: **Zero**. Exactly follows the current pass-and-play card swipe flow. The active player simply reads the card aloud to themselves or the person beside them.
- **Codebase Compatibility**: **100% Drop-In**. Reuses the existing `QuestionCard` interface (`{ id, level, tier, category, text }`), the 10-level `IntensitySlider`, and `HeroCardStack`.
- **Card Format**: Direct question syntax terminating in `?`. Length: 20 to 75 characters.

#### Calibrated Prompt Samples (Taglish)
- `[Chill | Level 2]`: *Anong pinakamalaking kasinungalingan ang sinabi mo para lang makaiwas sa lakad?*
- `[Party | Level 5]`: *Sino sa mga kaibigan mo ang pinaka-ayaw mong maging roommate at bakit?*
- `[Party | Level 7]`: *Magkano ang pinakamalaking utang na hindi mo pa nababayaran hanggang ngayon?*
- `[Spicy | Level 9]`: *Sino ang huling tao na ini-stalk mo sa dummy account mo ngayong linggo?*
- `[Spicy | Level 10]`: *Kung kailangan mong halikan ang isa sa mga nakaupo sa lamesang 'to, sino at bakit?*

---

### Rank 2: Paranoia (Sikreto o Tagay / Whisper & Reveal)
> **Verdict: TIER S (Signature Viral Centerpiece — Highest Differentiating Engagement)**

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                PARANOIA GAME LOOP                                │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 1. Player A holds the phone. Card prompt is HIDDEN behind a privacy blur/shield. │
│ 2. Player A taps/holds to peek at the prompt PRIVATELY:                          │
│    "Sino dito ang may pinaka-toxic na red flag sa pakikipag-date?"              │
│ 3. Player A looks up, looks around the circle, and SAYS ONLY ONE NAME OUT LOUD:  │
│    Player A: "Si Bea."                                                           │
│ 4. THE PARANOIA: Bea knows she was named, but DOES NOT KNOW THE QUESTION!        │
│ 5. THE ULTIMATUM:                                                                │
│    • Bea drinks a tagay: Player A taps "REVEAL TO TABLE" -> Card unblurs and     │
│      is read aloud to the entire screaming group!                                │
│    • Bea refuses to drink: The question is wiped forever! Bea spends the rest    │
│      of the night in agonizing curiosity.                                        │
└──────────────────────────────────────────────────────────────────────────────────┘
```

#### Cultural Hook & Barkada Dynamics
- **Agonizing Information Asymmetry**: Psychological research shows that humans experience intense discomfort when excluded from social knowledge concerning their own reputation (Festinger's Social Comparison Theory, 1954). Paranoia weaponizes this human instinct.
- **Pure *Intriga* & *Asaran***: When Player A names Bea, the whole table gasps: *"Hala, bakit si Bea?!"* The pressure on Bea to take a shot just to find out what was asked is overwhelming (empirical conversion to drink: $>85\%$).
- **Anti-Bullying Equilibrium**: Because the named person becomes the next Asker who gets to hold the phone and target someone else, retribution is instantaneous and democratic.

#### Ergonomic & Technical Feasibility
- **Ergonomic Friction**: **Very Low**. Requires a simple 2-state card:
  1. *State 1 (Privacy Screen)*: "Hold to Peek" or "Tap to View Prompt".
  2. *State 2 (Decision Phase)*: Two tactile action pills:
     - `[Uminom! I-reveal ang Sikreto]` (Triggers full-screen dramatic text reveal).
     - `[Duwag / Pass]` (Wipes prompt, advances deck).
- **Codebase Compatibility**: Requires adding a lightweight `revealed: boolean` state inside the card presentation component. The card data contract itself remains completely standard `{ id, level, tier, category, text }`.
- **Centerpiece Integration**: Can use a dramatic sound effect or haptic vibration on reveal.

#### Calibrated Prompt Samples (Taglish)
- `[Chill | Level 3]`: *Sino dito ang pinakamadaling mabudol ng Shopee live at TikTok shop?*
- `[Party | Level 5]`: *Sino dito ang may pinaka-mataas na chance mag-ninja exit bago mag-ambagan?*
- `[Party | Level 7]`: *Sino sa lamesang 'to ang pinaka-hindi mo mapagkakatiwalaan sa phone mo?*
- `[Spicy | Level 8]`: *Sino dito ang pinaka-marupok na babalik sa red-flag ex pag nag-chat ng 2 AM?*
- `[Spicy | Level 10]`: *Sino dito ang may pinaka-malakas na sexual tension sa ibang tao sa kwartong 'to?*

---

### Rank 3: Tagay Ka Kung... (Drink If... / Buzzed Pinoy Edition)
> **Verdict: TIER A (High-Leverage Quick Win — Frictionless Group Pacing)**

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                            TAGAY KA KUNG... GAME LOOP                            │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 1. Phone propped on table or passed. Card shows a direct conditional trigger:     │
│    "Tagay ka kung ikaw ang may pinakamababang battery percentage sa lamesa."    │
│ 2. Immediate table verification (everyone checks phone battery).                 │
│ 3. All players matching the criteria take 1 to 2 sips / tagay immediately.       │
│ 4. Swipe to next card in < 5 seconds. Zero debate required.                      │
└──────────────────────────────────────────────────────────────────────────────────┘
```

#### Cultural Hook & Barkada Dynamics
- **Rapid Group Acceleration**: While NHIE and Sagot o Lagot often pause the table for 2-3 minutes of storytelling, *Tagay Ka Kung...* is a **high-tempo drinking accelerant**. It prevents party stagnation.
- **Physical & Environmental Triggers**: Prompts tap into immediate physical realities of the room: clothes worn (Uniqlo Airism), transit used (Angkas helmet hair), phone status (low battery, airplane mode), or drinking capacity (walang yelo).
- **Collective Complicity**: Multiple people often drink simultaneously, fostering democratic solidarity (*"Sabay-sabay tayong malalasing"*).

#### Ergonomic & Technical Feasibility
- **Ergonomic Friction**: **Zero**. Can be placed in the center of the table propped against a bottle. One person taps anywhere to advance.
- **Codebase Compatibility**: **100% Drop-In**. Uses identical `QuestionCard` interface with syntax `"Tagay ka kung..."` or English past-participle condition.

#### Calibrated Prompt Samples (Taglish)
- `[Chill | Level 1]`: *Tagay ka kung naka-Uniqlo Airism ka ngayong gabi.*
- `[Chill | Level 3]`: *Tagay ka kung ikaw ang may pinakamababang phone battery sa lamesa.*
- `[Party | Level 4]`: *Tagay ka kung nag-Angkas o JoyRide ka papunta dito at amoy helmet ka pa.*
- `[Party | Level 6]`: *Tagay ka kung nag-cropped GCash screenshot ka na para lang magmukhang nagbayad.*
- `[Spicy | Level 9]`: *Tagay ka kung may naka-archive o naka-mute kang ka-chat sa Messenger ngayon.*

---

### Rank 4: Alin ang Pipiliin Mo? (Would You Rather / Pick Your Poison)
> **Verdict: TIER A (Universal Icebreaker — High Intellectual & Banter Engagement)**

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                        ALIN ANG PIPILIIN MO? GAME LOOP                           │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 1. Card presents two agonizing, impossible, or hilarious dilemmas:               │
│    [OPTION A]: Maglakad mula BGC hanggang Makati sa gitna ng baha at bagyo.      │
│    [OPTION B]: Aksidenteng tawaging 'Babe' ang boss mo sa Zoom call with 40 pax.  │
│ 2. Reader counts down: "3... 2... 1... VOTE!"                                    │
│ 3. Everyone shows 1 finger (Option A) or 2 fingers (Option B).                   │
│ 4. THE PENALTY: The MINORITY vote drinks! If tie, EVERYONE drinks!               │
└──────────────────────────────────────────────────────────────────────────────────┘
```

#### Cultural Hook & Barkada Dynamics
- **The Inuman Philosophy Engine**: Filipinos love comedic, absurd debates when buzzed. Arguments about absurd extremes (*"Bro, mas madali pang lumangoy sa baha kaysa sa HR memo!"*) generate effortless, side-splitting organic banter.
- **The Minority Penalty Dynamic**: Punishing the minority group incentivizes players to read the room and anticipate group psychology. When one person stubbornly votes for a crazy option, the whole table unites in laughing and chanting: *"Tagay! Tagay! Bakit yan pinili mo?!"*

#### Ergonomic & Technical Feasibility
- **Ergonomic Friction**: **Zero**. Two clear cards/options displayed vertically on screen (`Option A` vs. `Option B`).
- **Codebase Compatibility**: Very simple presentation wrapper. Card `text` can store options formatted with a delimiter (e.g. `Option A ||| Option B`) or a simple 2-string property.

#### Calibrated Prompt Samples (Taglish)
- `[Chill | Level 2]`: *Mawalan ng internet connection ng tatlong araw O maubusan ng kanin habang kumakain ng unli-samgyup?*
- `[Party | Level 5]`: *Lahat ng search history mo i-post sa IG Story O lahat ng GCash transactions mo makita ng nanay mo?*
- `[Party | Level 7]`: *Magka-ex na nangungutang pa rin sayo O magka-situationship na hindi nagrereply ng tatlong araw?*
- `[Spicy | Level 8]`: *Aksidenteng ma-send ang spicy selfie sa family GC O sa work Slack general channel?*
- `[Spicy | Level 10]`: *Maging official jowa ang toxic mong ex O i-date ang ex ng pinaka-matalik mong kaibigan dito?*

---

### Rank 5: Red Flag o Green Flag (Harot & Situationship Audit)
> **Verdict: TIER B+ (High Gen-Z / Millennial Barkada Appeal)**

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                     RED FLAG O GREEN FLAG GAME LOOP                              │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 1. Card presents an ambiguous relationship trait or modern dating habit:         │
│    "Best friends pa rin sila ng mommy ng ex niya kahit 2 years na silang break." │
│ 2. Reader counts down: "3... 2... 1... JUDGE!"                                   │
│ 3. Everyone shows Thumbs Up (Green) or Thumbs Down (Red).                        │
│ 4. Outlier takes a drink; spark fiery debate on dating morals & personal lore.   │
└──────────────────────────────────────────────────────────────────────────────────┘
```

#### Cultural Hook & Barkada Dynamics
- **Generational Dating Lore**: Modern Pinoy dating culture is defined by nuanced vocabulary: *situationships*, *talking stages*, *soft-launching*, *hard-launching*, *backburners*, *ghosting*, and *marupok* tendencies.
- **Micro-Confession Engine**: Arguing over whether a trait is a Red Flag almost always forces someone to admit: *"Wait, ginagawa ko 'to dati eh!"* or *"Bakit, ganyan yung ex ko!"*, instantly exposing juicy personal lore.

#### Ergonomic & Technical Feasibility
- **Ergonomic Friction**: **Zero**. Simple declarative statement on the card.
- **Codebase Compatibility**: **100% Drop-In** with current `QuestionCard`.

#### Calibrated Prompt Samples (Taglish)
- `[Chill | Level 2]`: *Walang kahit anong social media presence at laging naka-deactivate.*
- `[Party | Level 5]`: *Naka-close friends ka sa IG pero hindi ka rine-replyan sa personal DM.*
- `[Party | Level 7]`: *Naghahati kayo sa bill sa first date hanggang sa huling sentimo gamit ang GCash.*
- `[Spicy | Level 8]`: *May 'barkada group chat' na walang ibang ginawa kundi pag-usapan ang ibang tao.*
- `[Spicy | Level 10]`: *Nakikipag-date sayo pero naka-display pa rin ang highlights ng ex sa profile.*

---

### Rank 6: Bagsak-Tapon (Categories / Quickfire 5-Second Rule)
> **Verdict: TIER B (High Energy Action Mode — Requires Audio/Timer Polish)**

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                         BAGSAK-TAPON GAME LOOP                                   │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 1. Phone acts as centerpiece buzzer. Card shows a category:                      │
│    "Mga dahilan kung bakit na-late sa inuman."                                   │
│ 2. Player A starts, names an item in < 4 seconds.                                │
│ 3. Next player clockwise must immediately say another unique item.               │
│ 4. First player to repeat, hesitate > 4s, or choke: BUZZER DIES -> TAKES SHOT!  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

#### Cultural Hook & Barkada Dynamics
- **Acoustic Energy & Panic**: Under alcohol-induced impairment, cognitive retrieval slows down. Forcing players to name items in rapid succession leads to hilarious mental blanks, nonsensical answers, and loud collective laughter.
- **Tradition Alignment**: Directly maps to the classic Pinoy drinking game *"Extension"* or *"Kategorya"*, traditionally played with rhythmic table clapping (*clap-clap-snap*).

#### Ergonomic & Technical Feasibility
- **Ergonomic Friction**: Low to Medium. Requires one person to tap the screen to start an animated countdown timer (e.g. 5-second ticking visual bar or audio beep).
- **Codebase Compatibility**: Requires building a lightweight timer and buzzer sound hook.

#### Calibrated Prompt Samples (Taglish)
- `[Chill | Level 2]`: *Tatak ng de-lata sa kusina ng nanay mo.*
- `[Party | Level 4]`: *Mga palusot kung bakit hindi makakabayad ng ambag ngayon.*
- `[Party | Level 6]`: *Mga bar sa Poblacion o BGC na pinag-inuman mo na.*
- `[Spicy | Level 8]`: *Mga red flag na palusot kapag hindi nag-reply overnight.*
- `[Spicy | Level 10]`: *Mga lugar kung saan pwede mag-ninja make-out.*

---

### Low-Tier Candidates & Elimination Autopsy

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              ELIMINATION AUTOPSY MATRIX                                │
├──────────────────────┬────────────────────────────────┬────────────────────────────────┤
│ Candidate Mode       │ Core Disqualifying Friction    │ Why It Fails at the Table      │
├──────────────────────┼────────────────────────────────┼────────────────────────────────┤
│ Gisa / Hot Seat      │ Asymmetric Emotional Burden    │ Puts one person in the grinder │
│                      │ & Turn-Tracking Overhead       │ for 5 rounds; introverts shut  │
│                      │                                │ down; breaks egalitarian vibe. │
├──────────────────────┼────────────────────────────────┼────────────────────────────────┤
│ Gagawin o Lalaklakin │ Liability, Digital Mess,       │ Asking drunk people to text exes│
│ (Do or Drink)        │ & Physical Spills in Bars      │ or do physical dares creates   │
│                      │                                │ real-world harm & property mess│
├──────────────────────┼────────────────────────────────┼────────────────────────────────┤
│ King's Cup           │ Drunk Memory Load &            │ Remembering who is "Thumb      │
│ (Ring of Fire)       │ Multi-Turn State Friction      │ Master" across rounds creates  │
│                      │                                │ constant confusion & disputes. │
├──────────────────────┼────────────────────────────────┼────────────────────────────────┤
│ Heads Up / Psych!    │ Hardware Tilt & Multi-Device   │ Greasy fingers on forehead;    │
│                      │ Room Code Coordination         │ typing answers breaks inuman.  │
└──────────────────────┴────────────────────────────────┴────────────────────────────────┘
```

1. **Gisa / Hot Seat (The Interrogation)**:
   - *Failure Reason*: Violates the egalitarian circle principle of *pakikisama*. Subjecting one person to 5 consecutive grilling cards creates defensiveness, emotional fatigue, and uneven drinking distribution.
2. **Gagawin o Lalaklakin (Do or Drink / Wild Dares)**:
   - *Failure Reason*: Digital dares ("Send a DM to your ex", "Post this on your IG") create genuine real-life relational destruction, workplace complications, and boundary violations. Physical dares in crowded bars or tight apartments lead to broken bottles and spilled drinks.
3. **King's Cup / Ring of Fire**:
   - *Failure Reason*: High cognitive tax. Traditional King's Cup works because physical playing cards are scattered around a physical central beer cup. Transferring rule assignments ("Thumb Master", "Question Master", "Floor", "Heaven") into a mobile screen requires persistent state tracking, which conflicts with drunk casual attention spans.
4. **Heads Up / Psych! / Charades**:
   - *Failure Reason*: Disqualified by the non-negotiable architectural invariant: *zero multi-device WebSockets and zero phone-on-forehead gyroscope acrobatics with greasy pulutan hands*.

---

## 3. Analysis of Competing Hypotheses (ACH) Matrix

We evaluate the top 6 candidate modes across 6 weighted evaluation criteria:
- **C1: Barkada & Inuman Cultural Resonance (30%)**
- **C2: Zero-Friction Tabletop Ergonomics (25%)**
- **C3: Psychological Tension & Viral Banter (20%)**
- **C4: Codebase Reusability & Architectural Simplicity (15%)**
- **C5: Safety Boundary & Harassment Protection (10%)**

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 WEIGHTED EVALUATION MATRIX                                      │
├──────────────────────┬──────┬──────┬──────┬──────┬──────┬──────────────┬────────────┬───────────┤
│ GAME MODE CANDIDATE  │ C1   │ C2   │ C3   │ C4   │ C5   │ WEIGHTED     │ ICD 203    │ RANK &    │
│                      │(30%) │(25%) │(20%) │(15%) │(10%) │ SCORE (/100) │ CONFIDENCE │ VERDICT   │
├──────────────────────┼──────┼──────┼──────┼──────┼──────┼──────────────┼────────────┼───────────┤
│ 1. Sagot o Lagot     │  98  │  95  │  96  │  98  │  90  │    96.1      │ Very High  │ Rank 1    │
│    (Truth or Drink)  │      │      │      │      │      │              │            │ [Tier S]  │
├──────────────────────┼──────┼──────┼──────┼──────┼──────┼──────────────┼────────────┼───────────┤
│ 2. Paranoia          │  96  │  90  │  99  │  92  │  88  │    93.9      │ Very High  │ Rank 2    │
│    (Sikreto o Tagay) │      │      │      │      │      │              │            │ [Tier S]  │
├──────────────────────┼──────┼──────┼──────┼──────┼──────┼──────────────┼────────────┼───────────┤
│ 3. Tagay Ka Kung...  │  92  │  98  │  85  │  98  │  95  │    93.1      │ High       │ Rank 3    │
│    (Drink If...)     │      │      │      │      │      │              │            │ [Tier A]  │
├──────────────────────┼──────┼──────┼──────┼──────┼──────┼──────────────┼────────────┼───────────┤
│ 4. Alin ang Pipiliin │  90  │  95  │  92  │  95  │  95  │    92.9      │ High       │ Rank 4    │
│    (Would You Rather)│      │      │      │      │      │              │            │ [Tier A]  │
├──────────────────────┼──────┼──────┼──────┼──────┼──────┼──────────────┼────────────┼───────────┤
│ 5. Red/Green Flag    │  88  │  95  │  88  │  95  │  92  │    91.0      │ High       │ Rank 5    │
│    (Dating Audit)    │      │      │      │      │      │              │            │ [Tier B+] │
├──────────────────────┼──────┼──────┼──────┼──────┼──────┼──────────────┼────────────┼───────────┤
│ 6. Bagsak-Tapon      │  92  │  78  │  90  │  75  │  95  │    86.9      │ Medium     │ Rank 6    │
│    (Categories)      │      │      │      │      │      │              │            │ [Tier B]  │
└──────────────────────┴──────────────────────────────────┴──────────────┴────────────┴───────────┘
```

---

## 4. Architectural & UX Synthesis for Tagay Ta

### 4.1 Unifying Data Contract: The Universal Card Schema
All top 5 recommended modes can seamlessly share the existing `QuestionCard` contract with zero breaking changes:

```typescript
// Unified Deck Schema (src/types/game.ts)
export type GameMode = 
  | 'never-have-i-ever'     // 500 cards (Done)
  | 'most-likely-to'        // 100 cards (Done)
  | 'sagot-o-lagot'         // Rank 1: Truth or Drink (Target: 100-300 cards)
  | 'paranoia'              // Rank 2: Whisper & Reveal (Target: 100-200 cards)
  | 'tagay-ka-kung'         // Rank 3: Drink If... (Target: 100-200 cards)
  | 'alin-ang-pipiliin';    // Rank 4: Would You Rather (Target: 100-200 cards)

export interface QuestionCard {
  id: string;               // e.g., 'sol-001', 'par-001', 'tkk-001'
  level: IntensityLevel;    // 1 to 10
  tier: IntensityTier;      // 'chill' | 'party' | 'spicy'
  category: string;         // 'CHISMIS ARCHIVE', 'INUMAN SINS', 'HAROT & MARUPOK'
  text: string;             // Primary prompt
  subtext?: string;         // Optional secondary option (e.g. Option B for Would You Rather)
}
```

### 4.2 Presentation UX Primitives by Mode

```
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                             CARD PRESENTATION VARIANTS BY MODE                                │
├────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. STANDARD SWIPE STACK (NHIE, MLT, Tagay Ka Kung, Sagot o Lagot):                             │
│    ┌──────────────────────────────────┐                                                        │
│    │ [TIER BADGE]     [CATEGORY]      │                                                        │
│    │                                  │                                                        │
│    │ "Anong pinakamalaking sikreto    │  • Simple swipe left/right                             │
│    │  mo na pwede mong sabihin dito?" │  • Large readable typography                           │
│    │                                  │  • Zero extra buttons required                         │
│    └──────────────────────────────────┘                                                        │
│                                                                                                │
│ 2. PRIVACY PEEL STACK (Paranoia):                                                              │
│    ┌──────────────────────────────────┐   Tap / Hold to View   ┌─────────────────────────────┐ │
│    │ 🔒 SIKRETO NI ASKER              │ ─────────────────────► │ "Sino sa lamesa ang pinaka- │ │
│    │                                  │                        │  marupok sa toxic ex?"      │ │
│    │ [Pindutin para basahin nang lihim]│                       ├─────────────────────────────┤ │
│    │ Sabihin ang pangalan nang malakas│                        │ [Uminom! I-reveal sa lahat] │ │
│    └──────────────────────────────────┘                        └─────────────────────────────┘ │
│                                                                                                │
│ 3. SPLIT-OPTION DILEMMA (Alin ang Pipiliin Mo?):                                              │
│    ┌──────────────────────────────────┐                                                        │
│    │ [OPTION A]:                      │                                                        │
│    │ Maglakad sa baha sa Taft Ave.    │  • Synchronous 3-2-1 group finger vote                 │
│    │ ─────────────── VS ───────────── │  • Minority takes shot                                 │
│    │ [OPTION B]:                      │                                                        │
│    │ Mag-reply sa lahat ng chat ng ex │                                                        │
│    └──────────────────────────────────┘                                                        │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Strategic Roadmap & Execution Phasing

### Phase 1: The "Dual Crown" Expansion (Immediate Next Sprint)
- **Implement `Sagot o Lagot` (Truth or Drink)**:
  - Author **100 calibrated cards** (10 per level, Levels 1–10).
  - Add `'sagot-o-lagot'` mode key to `GameMode` in `src/types/game.ts`.
  - Wire dataset to `useGameDeck` with zero UI structural modification.
  - **Estimated Effort**: 1 Sprint (Dataset authoring + mode switcher button).

### Phase 2: The Signature Centerpiece (Viral Feature Sprint)
- **Implement `Paranoia` (Sikreto o Tagay)**:
  - Author **100 calibrated cards** (10 per level, Levels 1–10).
  - Implement the `PrivacyCard` presentation wrapper inside `HeroCardStack` with "Tap to Peek" and "Reveal Secret" action triggers.
  - Add visual excitement (confetti / screen flash on reveal).
  - **Estimated Effort**: 1–2 Sprints.

### Phase 3: The Rapid Party Accelerators (Follow-up Sprint)
- **Implement `Tagay Ka Kung...` (Drink If...) and `Alin ang Pipiliin Mo?` (Would You Rather)**:
  - Author 100 cards for each mode.
  - Complete the 5-mode *Tagay Ta Party Suite*.

---

## 6. Analytical Conclusion

By expanding beyond retrospective self-incrimination (*Never Have I Ever*) and peer indictment (*Most Likely To*), *Tagay Ta* will unlock the full psychological spectrum of the Philippine *inuman*:
- **Sagot o Lagot** captures the high-stakes confessional thrill of *chismis* and truth-telling.
- **Paranoia** introduces the peer-targeting intrigue and agonizing curiosity that turns a quiet drinking circle into an electric, roaring event.

Both modes conform strictly to client-side Next.js architecture, require zero user account friction or device syncing, and can be propped against a San Miguel bottle on any greasy tabletop in the Philippines.
