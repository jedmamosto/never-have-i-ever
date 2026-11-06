---
title: "Feature Intent: Tagay Ta — Pinoy Barkada Party Platform & Public Launch Suite"
id: "INTENT-tagay-ta-launch-suite-001"
version: "1.0.0"
status: "APPROVED"
appetite: "SMALL_BATCH"
owner: "Jed Mamosto"
created_at: "2026-11-06"
---

# Feature Intent: Tagay Ta — Pinoy Barkada Party Platform & Public Launch Suite

## 1. Problem Statement & Baseline Story
- **Who is Affected**: Jed Mamosto (creator & portfolio owner) and Pinoy barkadas playing tabletop party games during inuman or chill hangouts.
- **Status-Quo Failure**: The app currently has a single-game identity ("Never Have I Ever"), lacks social share cards (links shared on Facebook, Messenger, and Instagram preview as blank gray cards), has no search engine indexability, lacks any voluntary tipping channel, and cannot introduce second game modes without a disruptive future rebrand.
- **Measurable Business Pain**: Lost viral referral traffic from social media shares; zero portfolio proof-of-work metrics from public users; creator absorbs hosting overhead with zero tipping mechanism.
- **Target Outcome**: A culturally grounded Pinoy party game hub under the name **"Tagay Ta"** that launches immediately with "Never Have I Ever", renders eye-catching social share cards, captures organic Google traffic, measures demand for "Most Likely To...", and provides a seamless, optional GCash donation modal.

---

## 2. Appetite & Resource Boundaries
- **Time Box / Appetite**: SMALL_BATCH (1–2 days of focused execution).
- **Blast Radius**: Core application layout, top navigation, public assets, modal overlay system, and analytics instrumentation.
- **Trade-Off Stance**: Scope is variable; launch timeline is fixed. Authoring new question datasets or complex backend voting systems is strictly deferred to subsequent milestones.

---

## 3. Rabbit Holes & Out-of-Scope (No-Gos)
- **Rabbit Hole 1**: Implementing a real-time multiplayer room or WebSocket sync system before proving pass-and-play tabletop demand.
- **Rabbit Hole 2**: Integrating paid third-party payment gateways (Stripe, PayMongo) requiring API keys, webhooks, or merchant fees when a static GCash QR modal is 100% free and zero-maintenance.
- **No-Go 1**: Authoring or balancing the 100+ "Most Likely To..." question deck during this milestone (interactive teaser modal only).
- **No-Go 2**: Altering or reducing the existing 500-question calibrated "Never Have I Ever" dataset, 1–10 intensity slider, or custom card forge.
- **No-Go 3**: Introducing intrusive banner ads, paid paywalls, or forced login gates.

---

## 4. RFC 2119 Normative Invariants
- **MUST**: Rebrand the platform identity to **"Tagay Ta"** (e.g., *"Tagay Ta // The Barkada Party Deck"*), presenting "Never Have I Ever" as the headline active game.
- **MUST**: Provide OpenGraph and Twitter card assets (1200x630px) so shared links on Facebook, Instagram Stories, and Messenger render rich visual cards.
- **MUST**: Implement search metadata, structured JSON-LD data, and sitemap for search engine indexing.
- **MUST**: Implement an accessible, neo-brutalist "Support the Dev / Libreng Tagay" modal featuring a GCash QR image, account name/number, and a 1-tap "Copy Number" action.
- **MUST**: Include an interactive game mode selector in the top bar with "Never Have I Ever" active and "Most Likely To..." opening an upcoming preview modal that logs an analytics interest event.
- **MUST NOT**: Require user accounts, persistent server storage, or network connectivity beyond initial asset load.
- **SHOULD**: Feature warm, humorous Pinoy barkada microcopy (CEFR A2 English and natural colloquial Taglish).

---

## 5. Acceptance Thresholds & Definition of Done
- [ ] Brand name "Tagay Ta" and visual banner finalized across UI and metadata.
- [ ] OpenGraph image and metadata verified with Facebook Sharing Debugger standards.
- [ ] GCash modal tested on mobile viewports (320px–393px) with copy confirmation.
- [ ] Mode switch teaser logs custom event in Vercel Analytics.
- [ ] Existing 500-card NHIE game loop, slider, and custom cards remain 100% functional.
