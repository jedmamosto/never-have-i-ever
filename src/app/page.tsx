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
  const { customCards, addCustomCard, deleteCustomCard } = useCustomCards(gameMode);

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
    isCustomModalOpen || isGcashModalOpen || isModeTeaserOpen || !isPlaying,
    gameMode
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
      text: 'Play Never Have I Ever and Most Likely To with 600 calibrated Pinoy prompts! Play now:',
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
              className="brutal-interactive bg-surface-container-low hover:bg-surface-container text-on-surface border-[2px] border-on-surface shadow-brutal-sm rounded-full px-2.5 py-1.5 min-h-[36px] sm:min-h-[34px] font-mono text-[11px] sm:text-label-code uppercase inline-flex items-center gap-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
            >
              <span className="truncate max-w-[85px] sm:max-w-none">
                {gameMode === 'never-have-i-ever' ? (
                  <>
                    <span className="hidden sm:inline">Never Have I Ever</span>
                    <span className="sm:hidden">NHIE</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Most Likely To</span>
                    <span className="sm:hidden">MLT</span>
                  </>
                )}
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

                  {/* Mode 1: Never Have I Ever */}
                  <button
                    type="button"
                    role="option"
                    aria-selected={gameMode === 'never-have-i-ever'}
                    onClick={() => {
                      setGameMode('never-have-i-ever');
                      setIsModeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between gap-2 hover:bg-surface-container transition-colors ${
                      gameMode === 'never-have-i-ever' ? 'bg-surface-container/60' : ''
                    }`}
                  >
                    <div className="min-w-0">
                      <span className="font-display font-bold text-xs sm:text-sm text-on-surface block truncate">
                        Never Have I Ever
                      </span>
                      <span className="font-mono text-[10px] text-tertiary font-bold block">
                        ● 500 Cards Active
                      </span>
                    </div>
                    {gameMode === 'never-have-i-ever' && (
                      <span className="px-1.5 py-0.5 rounded-full bg-secondary-container border border-on-surface font-mono text-[9px] font-bold text-on-surface uppercase shrink-0">
                        Active
                      </span>
                    )}
                  </button>

                  {/* Mode 2: Most Likely To... */}
                  <button
                    type="button"
                    role="option"
                    aria-selected={gameMode === 'most-likely-to'}
                    onClick={() => {
                      setGameMode('most-likely-to');
                      setIsModeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between gap-2 hover:bg-surface-container transition-colors border-t border-on-surface/10 ${
                      gameMode === 'most-likely-to' ? 'bg-surface-container/60' : ''
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-display font-bold text-xs sm:text-sm text-on-surface truncate">
                          Most Likely To...
                        </span>
                        <FlameIcon className="w-3.5 h-3.5 text-primary shrink-0" />
                      </div>
                      <span className="font-mono text-[10px] text-tertiary font-bold block">
                        ● 100 Cards Active
                      </span>
                    </div>
                    {gameMode === 'most-likely-to' && (
                      <span className="px-1.5 py-0.5 rounded-full bg-primary-container border border-on-surface font-mono text-[9px] font-bold text-on-surface uppercase shrink-0">
                        Active
                      </span>
                    )}
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
            className="brutal-interactive bg-secondary-container hover:bg-secondary-fixed text-on-surface border-[2px] border-on-surface shadow-brutal-sm rounded-full px-2.5 sm:px-3 py-1.5 min-h-[36px] sm:min-h-[34px] font-mono text-[11px] sm:text-label-code uppercase inline-flex items-center gap-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-offset-1"
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
              className="brutal-interactive bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border-[2px] border-on-surface shadow-brutal-sm rounded-full px-2.5 sm:px-3 py-1.5 min-h-[36px] sm:min-h-[34px] font-mono text-[11px] sm:text-label-code uppercase inline-flex items-center gap-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-offset-1"
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
              className="brutal-interactive bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border-[2px] border-on-surface shadow-brutal-sm rounded-full px-2.5 sm:px-3 py-1.5 min-h-[36px] sm:min-h-[34px] font-mono text-[11px] sm:text-label-code uppercase inline-flex items-center gap-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-offset-1"
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
            className="max-w-xl w-full bg-surface-container-lowest border-[3px] border-on-surface rounded-card shadow-brutal-card p-4 sm:p-8 flex flex-col gap-4 sm:gap-6"
          >
            {/* Title & Keyword-Aligned Subtitle */}
            <div className="space-y-2">
              <span className="font-mono text-label-code uppercase tracking-wider text-primary font-bold block">
                {gameMode === 'most-likely-to'
                  ? 'TAGAY TA // 100 CALIBRATED PROMPTS'
                  : 'TAGAY TA // 500 CALIBRATED PROMPTS'}
              </span>
              <h1 className="font-display font-bold text-headline-md sm:text-display-sm tracking-[-0.02em] text-on-surface leading-tight">
                {gameMode === 'most-likely-to'
                  ? 'Tagay Ta: Most Likely To Party Deck'
                  : 'Tagay Ta: Pinoy Barkada Party Deck & Drinking Game'}
              </h1>
              <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                {gameMode === 'most-likely-to'
                  ? 'The Pinoy drinking game for your barkada inuman. Count down 3-2-1, point at who is most likely, and take a drink!'
                  : 'The Pinoy drinking game for your barkada inuman. Pick an intensity, pass the phone around, and drink if guilty.'}
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
                className="flex-1 py-3.5 px-5 min-h-[48px] rounded-control bg-primary-container border-[2.5px] border-on-surface shadow-brutal font-display font-bold text-title text-on-surface inline-flex items-center justify-center gap-2 brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
              >
                <span>Start Game • {totalCards} Cards</span>
                <ArrowRightIcon className="w-5 h-5 shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => setIsCustomModalOpen(true)}
                className="py-3.5 px-4 min-h-[48px] rounded-control bg-secondary-container border-[2.5px] border-on-surface shadow-brutal font-display font-bold text-body-md text-on-surface inline-flex items-center justify-center gap-1.5 whitespace-nowrap brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
              >
                <PlusIcon className="w-4 h-4 shrink-0" />
                <span>Custom Cards ({customCards.length})</span>
              </button>
            </div>

            {/* Quick Navigation & Share Bar */}
            <div className="pt-3 border-t border-on-surface/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <nav aria-label="Game Guide Jump Links" className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-xs">
                <a
                  href="#how-to-play"
                  className="inline-flex items-center justify-center min-h-[38px] sm:min-h-[32px] px-3 py-1.5 rounded-full bg-surface border border-on-surface hover:bg-surface-container font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface active:scale-95"
                >
                  How to Play
                </a>
                <a
                  href="#intensity-levels"
                  className="inline-flex items-center justify-center min-h-[38px] sm:min-h-[32px] px-3 py-1.5 rounded-full bg-surface border border-on-surface hover:bg-surface-container font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface active:scale-95"
                >
                  10 Levels
                </a>
                <a
                  href="#inuman-rules"
                  className="inline-flex items-center justify-center min-h-[38px] sm:min-h-[32px] px-3 py-1.5 rounded-full bg-surface border border-on-surface hover:bg-surface-container font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface active:scale-95"
                >
                  House Rules
                </a>
                <a
                  href="#faq"
                  className="inline-flex items-center justify-center min-h-[38px] sm:min-h-[32px] px-3 py-1.5 rounded-full bg-surface border border-on-surface hover:bg-surface-container font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface active:scale-95"
                >
                  FAQs
                </a>
              </nav>

              <button
                type="button"
                onClick={handleShareGame}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 min-h-[44px] sm:min-h-[34px] px-3.5 py-2 rounded-full bg-primary-container text-on-surface border border-on-surface font-mono text-xs font-bold brutal-interactive shadow-brutal-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface active:scale-95"
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
              className="bg-surface-container-lowest border-[2.5px] border-on-surface rounded-card shadow-brutal p-4 sm:p-6 space-y-3"
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
                <strong>Tagay Ta</strong> means &quot;let&apos;s drink!&quot; in Visayan. It is built for real barkada inuman nights.
              </p>
              <p className="font-sans text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
                We packed two party games inside. Play <strong>Never Have I Ever</strong> (500 cards) and <strong>Most Likely To</strong> (100 cards). That gives your table 600 calibrated prompts total.
              </p>
              <p className="font-sans text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
                No boring cards. Expect real campus bloopers, ambag drama, workplace tea, and 2 AM dating truths.
              </p>
              <p className="font-sans text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
                No app download needed. Grab your pulutan, open your browser, and pass the phone around.
              </p>
            </article>

            {/* Section 2: How to Play */}
            <article
              id="how-to-play"
              aria-labelledby="how-to-play-heading"
              className="bg-surface-container-lowest border-[2.5px] border-on-surface rounded-card shadow-brutal p-4 sm:p-6 space-y-5"
            >
              <div>
                <h2 id="how-to-play-heading" className="font-display font-bold text-title sm:text-headline-md tracking-[-0.02em]">
                  How to Play Tagay Ta
                </h2>
                <p className="font-sans text-sm sm:text-body-md text-on-surface-variant leading-relaxed mt-1">
                  Tagay Ta features two Pinoy party games. Pick a mode and gather your circle:
                </p>
              </div>

              {/* Mode A: Never Have I Ever */}
              <div className="space-y-3 pt-1 border-t border-on-surface/10">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container border border-on-surface font-mono text-[11px] font-bold text-on-surface uppercase">
                    Mode 1
                  </span>
                  <h3 className="font-display font-bold text-sm sm:text-base text-on-surface">
                    Never Have I Ever (500 Cards)
                  </h3>
                </div>
                <ol className="space-y-2.5 font-sans text-sm sm:text-body-md text-on-surface-variant">
                  <li className="flex items-start gap-2.5 p-3 rounded-control bg-surface border border-on-surface/20">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-primary-container border border-on-surface text-on-surface shrink-0">
                      01
                    </span>
                    <div>
                      <strong className="text-on-surface block mb-0.5">Circle Up &amp; Pour:</strong>
                      Sit in a circle. Grab cold beer, mixed drinks, juice, or iced water.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-3 rounded-control bg-surface border border-on-surface/20">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-primary-container border border-on-surface text-on-surface shrink-0">
                      02
                    </span>
                    <div>
                      <strong className="text-on-surface block mb-0.5">Pass &amp; Read Aloud:</strong>
                      Read the card on screen out loud. Pass the phone to your right.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-3 rounded-control bg-surface border border-on-surface/20">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-primary-container border border-on-surface text-on-surface shrink-0">
                      03
                    </span>
                    <div>
                      <strong className="text-on-surface block mb-0.5">Drink If Guilty:</strong>
                      Take a drink if you did the prompt.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-3 rounded-control bg-surface border border-on-surface/20">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-primary-container border border-on-surface text-on-surface shrink-0">
                      04
                    </span>
                    <div>
                      <strong className="text-on-surface block mb-0.5">Spill the Backstory:</strong>
                      If only one person drinks, they must tell the whole story!
                    </div>
                  </li>
                </ol>
              </div>

              {/* Mode B: Most Likely To */}
              <div className="space-y-3 pt-3 border-t border-on-surface/10">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary-container border border-on-surface font-mono text-[11px] font-bold text-on-surface uppercase">
                    Mode 2
                  </span>
                  <h3 className="font-display font-bold text-sm sm:text-base text-on-surface">
                    Most Likely To (100 Cards)
                  </h3>
                </div>
                <ol className="space-y-2.5 font-sans text-sm sm:text-body-md text-on-surface-variant">
                  <li className="flex items-start gap-2.5 p-3 rounded-control bg-surface border border-on-surface/20">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-primary-container border border-on-surface text-on-surface shrink-0">
                      01
                    </span>
                    <div>
                      <strong className="text-on-surface block mb-0.5">Read Prompt:</strong>
                      Read the Most Likely To prompt loudly to everyone.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-3 rounded-control bg-surface border border-on-surface/20">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-primary-container border border-on-surface text-on-surface shrink-0">
                      02
                    </span>
                    <div>
                      <strong className="text-on-surface block mb-0.5">3-2-1 Table Countdown:</strong>
                      Count down three, two, one together out loud.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-3 rounded-control bg-surface border border-on-surface/20">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-primary-container border border-on-surface text-on-surface shrink-0">
                      03
                    </span>
                    <div>
                      <strong className="text-on-surface block mb-0.5">Point Together:</strong>
                      On three, point directly at whoever fits the card best.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-3 rounded-control bg-surface border border-on-surface/20">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-primary-container border border-on-surface text-on-surface shrink-0">
                      04
                    </span>
                    <div>
                      <strong className="text-on-surface block mb-0.5">Highest Votes Drinks:</strong>
                      Whoever receives the most fingers pointing at them takes a tagay.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-3 rounded-control bg-surface border border-on-surface/20">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-primary-container border border-on-surface text-on-surface shrink-0">
                      05
                    </span>
                    <div>
                      <strong className="text-on-surface block mb-0.5">10-Second Right of Defense:</strong>
                      The accused has 10 seconds to defend their innocence!
                    </div>
                  </li>
                </ol>
              </div>
            </article>

            {/* Section 3: 10 Intensity Levels */}
            <article
              id="intensity-levels"
              aria-labelledby="levels-heading"
              className="bg-surface-container-lowest border-[2.5px] border-on-surface rounded-card shadow-brutal p-4 sm:p-6 space-y-4"
            >
              <h2 id="levels-heading" className="font-display font-bold text-title sm:text-headline-md tracking-[-0.02em]">
                10 Intensity Levels for Any Crowd
              </h2>
              <p className="font-sans text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
                Not every inuman has the same energy. Both game decks scale across 10 intensity levels:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 sm:p-4 rounded-control bg-surface border border-on-surface space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-tertiary font-mono text-xs font-bold uppercase">
                      <ChillLeafIcon className="w-4 h-4 shrink-0" />
                      <span>Levels 1–3: Chill</span>
                    </div>
                    <strong className="text-xs font-display font-bold text-on-surface block">
                      Icebreakers &amp; School Days
                    </strong>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      Campus bloopers, childhood memories, commute woes, and funny Pinoy habits. Safe for family, coworkers, or new friends.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-control bg-surface border border-on-surface space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-primary font-mono text-xs font-bold uppercase">
                      <PartyGlassIcon className="w-4 h-4 shrink-0" />
                      <span>Levels 4–7: Party</span>
                    </div>
                    <strong className="text-xs font-display font-bold text-on-surface block">
                      Office Tea &amp; Situationships
                    </strong>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      Workplace confessions, secret crushes, messy group chats, and inuman memories. Great for close barkadas having beer and pulutan.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-control bg-surface border border-on-surface space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-secondary font-mono text-xs font-bold uppercase">
                      <SpicyFlameIcon className="w-4 h-4 shrink-0" />
                      <span>Levels 8–10: Spicy</span>
                    </div>
                    <strong className="text-xs font-display font-bold text-on-surface block">
                      Walwal &amp; Wild Truths
                    </strong>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      Wild party nights, secret exes, and unfiltered late-night confessions. Play only with friends you trust 100%.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Section 4: Inuman House Rules */}
            <article
              id="inuman-rules"
              aria-labelledby="rules-heading"
              className="bg-surface-container-lowest border-[2.5px] border-on-surface rounded-card shadow-brutal p-4 sm:p-6 space-y-3"
            >
              <h2 id="rules-heading" className="font-display font-bold text-title sm:text-headline-md tracking-[-0.02em]">
                Pinoy Inuman House Rules
              </h2>
              <p className="font-sans text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
                Make your inuman louder with these classic table rules:
              </p>
              <ul className="space-y-2.5 font-sans text-sm sm:text-body-md text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-primary font-bold">🍺</span>
                  <div>
                    <strong className="text-on-surface">The Solo Drinker Tax (NHIE):</strong> Only one person drank? They must spill the backstory to the table.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-primary font-bold">🍻</span>
                  <div>
                    <strong className="text-on-surface">The Dry Question Penalty:</strong> Nobody drank or voted? The reader takes a penalty sip.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-primary font-bold">🥂</span>
                  <div>
                    <strong className="text-on-surface">The Duel Clink (MLT):</strong> Tied vote count? Both players clink glasses and take a tagay together.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-primary font-bold">🎯</span>
                  <div>
                    <strong className="text-on-surface">The Firing Squad (MLT):</strong> Unanimous 100% vote? That player must take a double shot!
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-primary font-bold">⚖️</span>
                  <div>
                    <strong className="text-on-surface">The 10-Second Right of Defense (MLT):</strong> Accused players get 10 seconds to plead innocence. Convince the table to transfer the tagay!
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-primary font-bold">🥤</span>
                  <div>
                    <strong className="text-on-surface">The 10-Finger Rule (No Booze):</strong> Playing sober? Put up 10 fingers. Drop one finger per guilty card. Last standing wins.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-primary font-bold">💧</span>
                  <div>
                    <strong className="text-on-surface">Drink Responsibly:</strong> Pace your drinks. Eat your pulutan, drink plenty of water, and never drink and drive.
                  </div>
                </li>
              </ul>
            </article>

            {/* Section 5: Frequently Asked Questions (FAQ) */}
            <article
              id="faq"
              aria-labelledby="faq-heading"
              className="bg-surface-container-lowest border-[2.5px] border-on-surface rounded-card shadow-brutal p-4 sm:p-6 space-y-4"
            >
              <h2 id="faq-heading" className="font-display font-bold text-title sm:text-headline-md tracking-[-0.02em]">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                <details name="faq" className="group border border-on-surface/20 rounded-control bg-surface overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-colors">
                  <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none min-h-[44px] p-3.5 hover:bg-surface-container/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-inset transition-colors">
                    <span>How many players can play Tagay Ta?</span>
                    <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="px-3.5 pb-3.5 pt-0">
                    <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                      Play with 2 to 20 or more people. Pass one phone around. No app installation required.
                    </p>
                  </div>
                </details>

                <details name="faq" className="group border border-on-surface/20 rounded-control bg-surface overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-colors">
                  <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none min-h-[44px] p-3.5 hover:bg-surface-container/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-inset transition-colors">
                    <span>What game modes are available in Tagay Ta?</span>
                    <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="px-3.5 pb-3.5 pt-0">
                    <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                      Play Never Have I Ever (500 cards) and Most Likely To (100 cards). That is 600 calibrated prompts total.
                    </p>
                  </div>
                </details>

                <details name="faq" className="group border border-on-surface/20 rounded-control bg-surface overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-colors">
                  <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none min-h-[44px] p-3.5 hover:bg-surface-container/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-inset transition-colors">
                    <span>How do we play the Most Likely To mode?</span>
                    <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="px-3.5 pb-3.5 pt-0">
                    <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                      Read the prompt aloud. Count down 3-2-1 together. Point fingers simultaneously. The person with the most votes drinks!
                    </p>
                  </div>
                </details>

                <details name="faq" className="group border border-on-surface/20 rounded-control bg-surface overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-colors">
                  <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none min-h-[44px] p-3.5 hover:bg-surface-container/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-inset transition-colors">
                    <span>Can we switch modes in the middle of a game?</span>
                    <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="px-3.5 pb-3.5 pt-0">
                    <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                      Yes. Tap the mode button in the top navigation bar anytime. It switches decks instantly.
                    </p>
                  </div>
                </details>

                <details name="faq" className="group border border-on-surface/20 rounded-control bg-surface overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-colors">
                  <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none min-h-[44px] p-3.5 hover:bg-surface-container/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-inset transition-colors">
                    <span>Can we create our own custom cards?</span>
                    <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="px-3.5 pb-3.5 pt-0">
                    <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                      Yes! Tap &quot;Custom Cards&quot; to write your own prompts. Cards save directly in your browser.
                    </p>
                  </div>
                </details>

                <details name="faq" className="group border border-on-surface/20 rounded-control bg-surface overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-colors">
                  <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none min-h-[44px] p-3.5 hover:bg-surface-container/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-inset transition-colors">
                    <span>Is Tagay Ta free to play?</span>
                    <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="px-3.5 pb-3.5 pt-0">
                    <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                      Yes, 100% free. No paywalls, ads, or sign-ups. All 600 cards are unlocked immediately.
                    </p>
                  </div>
                </details>

                <details name="faq" className="group border border-on-surface/20 rounded-control bg-surface overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-colors">
                  <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none min-h-[44px] p-3.5 hover:bg-surface-container/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-inset transition-colors">
                    <span>Can we play Tagay Ta online or remotely?</span>
                    <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="px-3.5 pb-3.5 pt-0">
                    <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                      Yes! Share your screen on Discord, Zoom, or Google Meet. Friends drink together online.
                    </p>
                  </div>
                </details>

                <details name="faq" className="group border border-on-surface/20 rounded-control bg-surface overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-colors">
                  <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none min-h-[44px] p-3.5 hover:bg-surface-container/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-inset transition-colors">
                    <span>What happens when all cards are played?</span>
                    <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="px-3.5 pb-3.5 pt-0">
                    <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                      The deck shuffles automatically when finished. You get a fresh card sequence every session.
                    </p>
                  </div>
                </details>
              </div>
            </article>

            {/* Back to Top Link */}
            <div className="text-center pt-2">
              <a
                href="#top"
                className="inline-flex items-center justify-center min-h-[44px] gap-1.5 font-mono text-xs font-bold text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface rounded-token px-3 py-2"
              >
                <span>↑ Back to Deck &amp; Start Playing</span>
              </a>
            </div>
          </div>

          {/* Footer Navigation & Credits */}
          <footer className="w-full max-w-xl text-center pt-4 pb-2 space-y-2 border-t border-on-surface/10">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-xs text-on-surface-variant">
              <a
                href="https://jedmamosto.me"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackPortfolioClick('main_menu_footer')}
                className="inline-flex items-center justify-center min-h-[44px] gap-1 hover:text-primary transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface rounded-token px-2 py-1"
              >
                <span>Crafted by Jed Mamosto</span>
                <ExternalLinkIcon className="w-3.5 h-3.5 shrink-0" />
              </a>
              <span className="hidden sm:inline">•</span>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[44px] hover:text-primary transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface rounded-token px-2 py-1"
              >
                Sitemap
              </a>
              <span className="hidden sm:inline">•</span>
              <button
                type="button"
                onClick={() => {
                  setIsGcashModalOpen(true);
                  trackGcashModalOpen('footer');
                }}
                className="inline-flex items-center justify-center min-h-[44px] hover:text-primary transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface rounded-token px-2 py-1"
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
              gameMode={gameMode}
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
