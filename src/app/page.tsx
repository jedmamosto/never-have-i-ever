'use client';

import React, { useState, useEffect } from 'react';
import { useCustomCards, type NewCustomCardInput } from '@/hooks/useCustomCards';
import { useGameDeck } from '@/hooks/useGameDeck';
import { HeroCardStack } from '@/components/card/HeroCardStack';
import { BottomDock } from '@/components/controls/BottomDock';
import { IntensitySlider } from '@/components/controls/IntensitySlider';
import { CustomCardModal } from '@/components/modals/CustomCardModal';
import { GCashModal } from '@/components/modals/GCashModal';
import { ModeTeaserModal } from '@/components/modals/ModeTeaserModal';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BeerIcon,
  CheckIcon,
  ChevronDownIcon,
  ChillLeafIcon,
  ExternalLinkIcon,
  FlameIcon,
  PartyGlassIcon,
  PlusIcon,
  ShareIcon,
  SpicyFlameIcon,
} from '@/components/card/Icons';
import type { GameMode, QuestionCard } from '@/types/game';
import {
  trackGameStart,
  trackCustomCardCreated,
  trackGcashModalOpen,
  trackModeTeaserOpen,
  trackModeTeaserInterest,
  trackPortfolioClick,
} from '@/lib/analytics';

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isGcashModalOpen, setIsGcashModalOpen] = useState(false);
  const [isModeTeaserOpen, setIsModeTeaserOpen] = useState(false);
  const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>('never-have-i-ever');
  const { customCards, addCustomCard, deleteCustomCard } = useCustomCards();

  const {
    intensityRange,
    setIntensityRange,
    currentCard,
    currentIndex,
    totalCards,
    theme,
    direction,
    nextCard,
    prevCard,
    shuffleActiveDeck,
    injectAndFocusCard,
    jumpToCard,
  } = useGameDeck(
    customCards,
    isCustomModalOpen || isGcashModalOpen || isModeTeaserOpen || !isPlaying
  );

  // Close mode dropdown on Escape
  useEffect(() => {
    if (!isModeDropdownOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModeDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModeDropdownOpen]);

  const handleAddCustomCard = (input: NewCustomCardInput) => {
    const created = addCustomCard(input);
    trackCustomCardCreated({
      level: created.level,
      category: created.category,
    });
    injectAndFocusCard(created);
    setIsCustomModalOpen(false);
  };

  const handleStartGame = () => {
    trackGameStart({
      totalCards,
      intensityMin: intensityRange.min,
      intensityMax: intensityRange.max,
    });
    setIsPlaying(true);
  };

  const handleSelectCustomCard = (card: QuestionCard) => {
    jumpToCard(card);
    setIsPlaying(true);
  };

  const handleShareGame = async () => {
    const shareData = {
      title: 'Tagay Ta — Pinoy Barkada Party Deck & Drinking Game',
      text: 'Pass & play Never Have I Ever cards with 500 calibrated Pinoy prompts! Play now:',
      url: typeof window !== 'undefined' ? window.location.href : 'https://tagay-ta.vercel.app',
    };
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User closed share sheet
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      } catch {
        // Fallback
      }
    }
  };

  return (
    <div id="top" className="min-h-dvh flex flex-col justify-between">
      {/* Neo-Brutalist Top Bar (100% Mobile-Safe at 320px-393px+) */}
      <header className="border-b-[2.5px] border-on-surface bg-surface/95 backdrop-blur-md px-2.5 sm:px-6 h-14 landscape:h-12 flex items-center justify-between gap-1.5 sm:gap-2 shrink-0 z-20 relative">
        {/* Left: Brand & Game Mode Selector */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-display font-black text-sm sm:text-base md:text-lg tracking-[-0.03em] uppercase text-on-surface whitespace-nowrap">
              TAGAY TA
            </span>
            <span className="text-on-surface-variant/40 font-mono text-xs hidden sm:inline">•</span>
          </div>

          {/* Mode Switcher Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsModeDropdownOpen((prev) => !prev)}
              aria-expanded={isModeDropdownOpen}
              aria-haspopup="listbox"
              aria-label="Switch Game Mode"
              className="brutal-interactive bg-surface-container-low hover:bg-surface-container text-on-surface border-[2px] border-on-surface shadow-brutal-sm rounded-full px-2 sm:px-2.5 py-1 font-mono text-[11px] sm:text-label-code uppercase inline-flex items-center gap-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
            >
              <span className="truncate max-w-[85px] sm:max-w-none">
                <span className="hidden sm:inline">Never Have I Ever</span>
                <span className="sm:hidden">NHIE</span>
              </span>
              <ChevronDownIcon
                className={`w-3 h-3 text-on-surface shrink-0 transition-transform duration-150 ${
                  isModeDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isModeDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsModeDropdownOpen(false)}
                />
                <div
                  role="listbox"
                  aria-label="Game Modes"
                  className="absolute left-0 mt-2 w-60 sm:w-64 bg-surface rounded-card border-[2.5px] border-on-surface shadow-brutal z-30 overflow-hidden py-1"
                >
                  <div className="px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-on-surface-variant font-bold border-b border-on-surface/10">
                    Game Modes
                  </div>

                  {/* Mode 1: Never Have I Ever (Active) */}
                  <button
                    type="button"
                    role="option"
                    aria-selected={gameMode === 'never-have-i-ever'}
                    onClick={() => {
                      setGameMode('never-have-i-ever');
                      setIsModeDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 flex items-center justify-between gap-2 hover:bg-surface-container transition-colors"
                  >
                    <div className="min-w-0">
                      <span className="font-display font-bold text-xs sm:text-sm text-on-surface block truncate">
                        Never Have I Ever
                      </span>
                      <span className="font-mono text-[10px] text-tertiary font-bold block">
                        ● 500 Cards Active
                      </span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded-full bg-secondary-container border border-on-surface font-mono text-[9px] font-bold text-on-surface uppercase shrink-0">
                      Active
                    </span>
                  </button>

                  {/* Mode 2: Most Likely To... (Teaser) */}
                  <button
                    type="button"
                    role="option"
                    aria-selected={gameMode === 'most-likely-to'}
                    onClick={() => {
                      setIsModeDropdownOpen(false);
                      setIsModeTeaserOpen(true);
                      trackModeTeaserOpen('most-likely-to');
                    }}
                    className="w-full text-left px-3 py-2 flex items-center justify-between gap-2 hover:bg-primary-container/20 transition-colors border-t border-on-surface/10"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-display font-bold text-xs sm:text-sm text-on-surface truncate">
                          Most Likely To...
                        </span>
                        <FlameIcon className="w-3.5 h-3.5 text-primary shrink-0" />
                      </div>
                      <span className="font-mono text-[10px] text-on-surface-variant block">
                        Point &amp; Tagay • Coming Soon
                      </span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded-full bg-primary-container border border-on-surface font-mono text-[9px] font-bold text-on-surface uppercase shrink-0">
                      Teaser
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Libreng Tagay GCash Trigger */}
          <button
            type="button"
            onClick={() => {
              setIsGcashModalOpen(true);
              trackGcashModalOpen('topbar');
            }}
            aria-label="Support the developer - Libreng Tagay"
            className="brutal-interactive bg-secondary-container hover:bg-secondary-fixed text-on-surface border-[2px] border-on-surface shadow-brutal-sm rounded-full px-2 sm:px-3 py-1 font-mono text-[11px] sm:text-label-code uppercase inline-flex items-center gap-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-offset-1"
          >
            <BeerIcon className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Libreng Tagay</span>
            <span className="sm:hidden">Tagay</span>
          </button>

          {!isPlaying ? (
            <button
              type="button"
              onClick={() => setIsCustomModalOpen(true)}
              aria-label="Open custom cards modal"
              className="brutal-interactive bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border-[2px] border-on-surface shadow-brutal-sm rounded-full px-2 sm:px-3 py-1 font-mono text-[11px] sm:text-label-code uppercase inline-flex items-center gap-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-offset-1"
            >
              <PlusIcon className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Custom ({customCards.length})</span>
              <span className="sm:hidden">({customCards.length})</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(false)}
              aria-label="Return to Main Menu"
              className="brutal-interactive bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border-[2px] border-on-surface shadow-brutal-sm rounded-full px-2.5 sm:px-3 py-1 font-mono text-[11px] sm:text-label-code uppercase inline-flex items-center gap-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-offset-1"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5 shrink-0" />
              <span>Menu</span>
            </button>
          )}
        </div>
      </header>

      {!isPlaying ? (
        /* Main Menu Screen */
        <main className="flex-1 flex flex-col items-center justify-start w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-8 gap-8">
          {/* Hero Game Launcher Card */}
          <section
            aria-label="Main Menu"
            className="max-w-xl w-full bg-surface-container-lowest border-[3px] border-on-surface rounded-card shadow-brutal-card p-5 sm:p-8 flex flex-col gap-5 sm:gap-6"
          >
            {/* Title & Keyword-Aligned Subtitle */}
            <div className="space-y-2">
              <span className="font-mono text-label-code uppercase tracking-wider text-primary font-bold block">
                TAGAY TA // 500 CALIBRATED PROMPTS
              </span>
              <h1 className="font-display font-bold text-headline-md sm:text-display-sm tracking-[-0.02em] text-on-surface leading-tight">
                Tagay Ta: Pinoy Barkada Party Deck &amp; Drinking Game
              </h1>
              <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                The pass &amp; play conversational party deck calibrated for Filipino inuman sessions, house parties, and late-night confessions. Choose your intensity range and pass the phone around.
              </p>
            </div>

            {/* Embedded 1-10 Range Selector */}
            <div className="p-4 rounded-control bg-surface border-2 border-on-surface">
              <IntensitySlider
                range={intensityRange}
                onChange={setIntensityRange}
              />
            </div>

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleStartGame}
                className="flex-1 py-3.5 px-5 rounded-control bg-primary-container border-[2.5px] border-on-surface shadow-brutal font-display font-bold text-title text-on-surface inline-flex items-center justify-center gap-2 brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
              >
                <span>Start Game • {totalCards} Cards</span>
                <ArrowRightIcon className="w-5 h-5 shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => setIsCustomModalOpen(true)}
                className="py-3.5 px-4 rounded-control bg-secondary-container border-[2.5px] border-on-surface shadow-brutal font-display font-bold text-body-md text-on-surface inline-flex items-center justify-center gap-1.5 whitespace-nowrap brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
              >
                <PlusIcon className="w-4 h-4 shrink-0" />
                <span>Custom Cards ({customCards.length})</span>
              </button>
            </div>

            {/* Quick Navigation & Share Bar */}
            <div className="pt-3 border-t border-on-surface/15 flex flex-wrap items-center justify-between gap-2">
              <nav aria-label="Game Guide Jump Links" className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] sm:text-xs">
                <a
                  href="#how-to-play"
                  className="px-2.5 py-1 rounded-full bg-surface border border-on-surface hover:bg-surface-container font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
                >
                  How to Play
                </a>
                <a
                  href="#intensity-levels"
                  className="px-2.5 py-1 rounded-full bg-surface border border-on-surface hover:bg-surface-container font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
                >
                  10 Levels
                </a>
                <a
                  href="#inuman-rules"
                  className="px-2.5 py-1 rounded-full bg-surface border border-on-surface hover:bg-surface-container font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
                >
                  House Rules
                </a>
                <a
                  href="#faq"
                  className="px-2.5 py-1 rounded-full bg-surface border border-on-surface hover:bg-surface-container font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
                >
                  FAQs
                </a>
              </nav>

              <button
                type="button"
                onClick={handleShareGame}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-surface border border-on-surface font-mono text-[11px] sm:text-xs font-bold brutal-interactive shadow-brutal-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
                aria-label="Invite friends and share Tagay Ta"
              >
                {copiedLink ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5 text-on-surface shrink-0" />
                    <span>Link Copied! 🍻</span>
                  </>
                ) : (
                  <>
                    <ShareIcon className="w-3.5 h-3.5 text-on-surface shrink-0" />
                    <span>Invite Barkada</span>
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Semantic SEO & Player Guide Sections */}
          <div className="w-full max-w-xl flex flex-col gap-6 text-on-surface">
            {/* Section 1: About Tagay Ta */}
            <article
              id="about"
              aria-labelledby="about-heading"
              className="bg-surface-container-lowest border-[2.5px] border-on-surface rounded-card shadow-brutal p-6 space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-secondary-container border border-on-surface text-on-surface">
                  <BeerIcon className="w-4 h-4 shrink-0" />
                </span>
                <h2 id="about-heading" className="font-display font-bold text-title sm:text-headline-md tracking-[-0.02em]">
                  What is Tagay Ta?
                </h2>
              </div>
              <p className="font-sans text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
                <strong>Tagay Ta</strong> is a modern Pinoy tabletop party deck and drinking game designed specifically for Filipino barkadas, inuman nights, beach trips, and house parties. Derived from the classic toast <em>&quot;Tagay ta!&quot;</em> (&quot;Let&apos;s drink!&quot;), this card game reimagines <strong>Never Have I Ever</strong> with 500 hand-calibrated prompts rooted in shared Philippine culture.
              </p>
              <p className="font-sans text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
                Whether you want nostalgic campus memories, spicy office tea, relatable Pinoy habits, or late-night confessions, Tagay Ta provides an instant icebreaker that brings friends closer together—no physical cards to carry and zero app installations needed.
              </p>
            </article>

            {/* Section 2: How to Play */}
            <article
              id="how-to-play"
              aria-labelledby="how-to-play-heading"
              className="bg-surface-container-lowest border-[2.5px] border-on-surface rounded-card shadow-brutal p-6 space-y-4"
            >
              <h2 id="how-to-play-heading" className="font-display font-bold text-title sm:text-headline-md tracking-[-0.02em]">
                How to Play Never Have I Ever (Pinoy Edition)
              </h2>
              <p className="font-sans text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
                Tagay Ta is built for effortless pass-and-play tabletop gaming in any circle. Here is how to run your game in four simple steps:
              </p>
              <ol className="space-y-3 font-sans text-sm sm:text-body-md text-on-surface-variant">
                <li className="flex items-start gap-3 p-3 rounded-control bg-surface border border-on-surface/20">
                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-primary-container border border-on-surface text-on-surface shrink-0">
                    01
                  </span>
                  <div>
                    <strong className="text-on-surface block mb-0.5">Gather the Barkada &amp; Prep Drinks:</strong>
                    Sit in a circle. Each player grabs their drink of choice—ice-cold beer, mixed drinks with chaser, cocktails, or non-alcoholic juice and iced tea.
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-control bg-surface border border-on-surface/20">
                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-primary-container border border-on-surface text-on-surface shrink-0">
                    02
                  </span>
                  <div>
                    <strong className="text-on-surface block mb-0.5">Dial Your Intensity Range:</strong>
                    Use the intensity slider at the top to select your comfort zone—from Level 1 (wholesome icebreakers) to Level 10 (unfiltered confessions).
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-control bg-surface border border-on-surface/20">
                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-primary-container border border-on-surface text-on-surface shrink-0">
                    03
                  </span>
                  <div>
                    <strong className="text-on-surface block mb-0.5">Pass &amp; Read Aloud:</strong>
                    The active player holds the phone, reads the card prompt out loud to the room, and passes the device clockwise for the next turn.
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-control bg-surface border border-on-surface/20">
                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-primary-container border border-on-surface text-on-surface shrink-0">
                    04
                  </span>
                  <div>
                    <strong className="text-on-surface block mb-0.5">Tagay If Guilty &amp; Spill the Tea:</strong>
                    Anyone who has committed the deed takes a drink (<em>tagay</em>). If only one person drinks, the barkada gets to ask for the backstory!
                  </div>
                </li>
              </ol>
            </article>

            {/* Section 3: 10 Intensity Levels */}
            <article
              id="intensity-levels"
              aria-labelledby="levels-heading"
              className="bg-surface-container-lowest border-[2.5px] border-on-surface rounded-card shadow-brutal p-6 space-y-4"
            >
              <h2 id="levels-heading" className="font-display font-bold text-title sm:text-headline-md tracking-[-0.02em]">
                10 Calibrated Intensity Levels
              </h2>
              <p className="font-sans text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
                To keep every party comfortable and avoid awkward mismatches, Tagay Ta groups 500 questions across three distinct tiers:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-control bg-surface border border-on-surface space-y-1.5">
                  <div className="flex items-center gap-1.5 text-tertiary font-mono text-xs font-bold uppercase">
                    <ChillLeafIcon className="w-4 h-4 shrink-0" />
                    <span>Levels 1–3: Chill</span>
                  </div>
                  <strong className="text-xs font-display font-bold text-on-surface block">
                    Nostalgia &amp; Icebreakers
                  </strong>
                  <p className="font-sans text-[12px] text-on-surface-variant leading-normal">
                    Wholesome school memories, childhood Pinoy TV tropes, commute moments, and relatable Pinoy habits. Safe for family and coworkers.
                  </p>
                </div>

                <div className="p-3.5 rounded-control bg-surface border border-on-surface space-y-1.5">
                  <div className="flex items-center gap-1.5 text-primary font-mono text-xs font-bold uppercase">
                    <PartyGlassIcon className="w-4 h-4 shrink-0" />
                    <span>Levels 4–7: Party</span>
                  </div>
                  <strong className="text-xs font-display font-bold text-on-surface block">
                    Drama, Work &amp; Dating
                  </strong>
                  <p className="font-sans text-[12px] text-on-surface-variant leading-normal">
                    College escapades, workplace confessions, social media stalking, and messy situationships. Ideal for barkada weekend drinking sessions.
                  </p>
                </div>

                <div className="p-3.5 rounded-control bg-surface border border-on-surface space-y-1.5">
                  <div className="flex items-center gap-1.5 text-secondary-container-foreground font-mono text-xs font-bold uppercase">
                    <SpicyFlameIcon className="w-4 h-4 shrink-0" />
                    <span>Levels 8–10: Spicy</span>
                  </div>
                  <strong className="text-xs font-display font-bold text-on-surface block">
                    Walwal &amp; Confessions
                  </strong>
                  <p className="font-sans text-[12px] text-on-surface-variant leading-normal">
                    Unfiltered romantic confessions, wild party stories, secret regrets, and spicy truths. Strictly for your closest trusted circle.
                  </p>
                </div>
              </div>
            </article>

            {/* Section 4: Inuman House Rules */}
            <article
              id="inuman-rules"
              aria-labelledby="rules-heading"
              className="bg-surface-container-lowest border-[2.5px] border-on-surface rounded-card shadow-brutal p-6 space-y-3"
            >
              <h2 id="rules-heading" className="font-display font-bold text-title sm:text-headline-md tracking-[-0.02em]">
                Pinoy Inuman House Rules
              </h2>
              <p className="font-sans text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
                Add spice and laughter to your game night with these tried-and-tested Filipino drinking game house rules:
              </p>
              <ul className="space-y-2.5 font-sans text-sm sm:text-body-md text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-primary font-bold">🍺</span>
                  <div>
                    <strong className="text-on-surface">The Solo Drinker Tax:</strong> If only one person drinks on a card, they must tell the full story behind the deed before moving to the next round.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-primary font-bold">🍻</span>
                  <div>
                    <strong className="text-on-surface">The Dry Question Penalty:</strong> If nobody in the room has done the prompt, the card reader must take a penalty sip for asking a boring question!
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-primary font-bold">🥤</span>
                  <div>
                    <strong className="text-on-surface">Non-Alcoholic Finger Rule:</strong> Playing without alcohol? Start with 10 fingers up. Each time you are guilty of a prompt, put one finger down. The last player with fingers standing wins!
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-primary font-bold">💧</span>
                  <div>
                    <strong className="text-on-surface">Drink Responsibly:</strong> Always pace yourself, keep cold water and pulutan handy, look out for your friends, and never drink and drive.
                  </div>
                </li>
              </ul>
            </article>

            {/* Section 5: Frequently Asked Questions (FAQ) */}
            <article
              id="faq"
              aria-labelledby="faq-heading"
              className="bg-surface-container-lowest border-[2.5px] border-on-surface rounded-card shadow-brutal p-6 space-y-4"
            >
              <h2 id="faq-heading" className="font-display font-bold text-title sm:text-headline-md tracking-[-0.02em]">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                <details className="group border border-on-surface/20 rounded-control bg-surface p-3.5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none">
                    <span>How many players can play Tagay Ta?</span>
                    <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="mt-2.5 font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                    Tagay Ta is designed for 2 to 20+ players. Because it functions as a pass-and-play deck on a single mobile screen, your entire barkada participates together without needing separate devices.
                  </p>
                </details>

                <details className="group border border-on-surface/20 rounded-control bg-surface p-3.5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none">
                    <span>Can we create our own custom cards?</span>
                    <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="mt-2.5 font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                    Yes! Tap the &quot;Custom Cards&quot; button in the top bar or menu to forge your own prompts. You can set the intensity level and category, and they are saved locally in your browser and injected into your deck.
                  </p>
                </details>

                <details className="group border border-on-surface/20 rounded-control bg-surface p-3.5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none">
                    <span>Is Tagay Ta free to play?</span>
                    <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="mt-2.5 font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                    Yes, Tagay Ta is 100% free with no paywalls, accounts, or subscriptions. All 500 calibrated prompts and game tools are available immediately.
                  </p>
                </details>

                <details className="group border border-on-surface/20 rounded-control bg-surface p-3.5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none">
                    <span>Can we play Tagay Ta online or remotely?</span>
                    <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="mt-2.5 font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                    Yes! One host can share their browser screen over Discord, Zoom, or Google Meet while everyone plays along with their drinks at home.
                  </p>
                </details>

                <details className="group border border-on-surface/20 rounded-control bg-surface p-3.5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none">
                    <span>What happens when all 500 cards are played?</span>
                    <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="mt-2.5 font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                    The deck automatically reshuffles using a cryptographic Fisher-Yates shuffle, guaranteeing a fresh card sequence every single time you play.
                  </p>
                </details>
              </div>
            </article>

            {/* Back to Top Link */}
            <div className="text-center pt-2">
              <a
                href="#top"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface rounded-token px-2 py-1"
              >
                <span>↑ Back to Deck &amp; Start Playing</span>
              </a>
            </div>
          </div>

          {/* Footer Navigation & Credits */}
          <footer className="w-full max-w-xl text-center pt-4 pb-2 space-y-2 border-t border-on-surface/10">
            <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-on-surface-variant">
              <a
                href="https://jedmamosto.me"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackPortfolioClick('main_menu_footer')}
                className="inline-flex items-center gap-1 hover:text-primary transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface rounded-token px-1"
              >
                <span>Crafted by Jed Mamosto</span>
                <ExternalLinkIcon className="w-3.5 h-3.5 shrink-0" />
              </a>
              <span>•</span>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface rounded-token px-1"
              >
                Sitemap
              </a>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  setIsGcashModalOpen(true);
                  trackGcashModalOpen('footer');
                }}
                className="hover:text-primary transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface rounded-token px-1"
              >
                Libreng Tagay 🍻
              </button>
            </div>
            <p className="font-mono text-[11px] text-on-surface-variant/60">
              Tagay Ta © {new Date().getFullYear()} — Calibrated Filipino Barkada Conversation Deck
            </p>
          </footer>
        </main>
      ) : (
        /* Play Mode Screen */
        <>
          <main className="flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-3 sm:px-6 py-2 sm:py-4 landscape:py-1.5">
            <HeroCardStack
              card={currentCard}
              currentIndex={currentIndex}
              totalCards={totalCards}
              theme={theme}
              direction={direction}
              onNext={nextCard}
              onPrev={prevCard}
              onOpenCustomModal={() => setIsCustomModalOpen(true)}
            />
          </main>

          {/* Compact Minimal Tabletop Dock */}
          <footer className="w-full px-3 sm:px-6 pb-3 sm:pb-4 landscape:pb-2 pt-1 shrink-0">
            <BottomDock
              range={intensityRange}
              onRangeChange={setIntensityRange}
              onShuffle={shuffleActiveDeck}
              onOpenCustomModal={() => setIsCustomModalOpen(true)}
              customCardCount={customCards.length}
            />
          </footer>
        </>
      )}

      {/* Custom Card Forge Modal */}
      <CustomCardModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        defaultIntensity={intensityRange.max}
        customCards={customCards}
        onAddCard={handleAddCustomCard}
        onDeleteCard={deleteCustomCard}
        onSelectCard={handleSelectCustomCard}
      />

      {/* GCash Libreng Tagay Modal */}
      <GCashModal
        isOpen={isGcashModalOpen}
        onClose={() => setIsGcashModalOpen(false)}
      />

      {/* Mode Teaser Modal */}
      <ModeTeaserModal
        isOpen={isModeTeaserOpen}
        onClose={() => setIsModeTeaserOpen(false)}
        onVoteHype={() => trackModeTeaserInterest('most-likely-to')}
      />
    </div>
  );
}
