'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCustomCards, type NewCustomCardInput } from '@/hooks/useCustomCards';
import { useGameDeck } from '@/hooks/useGameDeck';
import { HeroCardStack } from '@/components/card/HeroCardStack';
import { LobbyPreviewDeck } from '@/components/card/LobbyPreviewDeck';
import { BottomDock } from '@/components/controls/BottomDock';
import { IntensitySlider } from '@/components/controls/IntensitySlider';
import { ModeLoopStrip } from '@/components/lobby/ModeLoopStrip';
import { CustomCardModal } from '@/components/modals/CustomCardModal';
import { GCashModal } from '@/components/modals/GCashModal';
import { ModeTeaserModal } from '@/components/modals/ModeTeaserModal';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BeerIcon,
  CheckIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  FlameIcon,
  PlusIcon,
  ShareIcon,
} from '@/components/card/Icons';
import { BookOpen, Target } from 'lucide-react';
import type { GameMode, IntensityLevel, QuestionCard } from '@/types/game';
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

  // Support deep-linked launches from /how-to-play (e.g. /?min=8&max=10&play=1)
  const didInitFromQueryRef = useRef(false);
  useEffect(() => {
    if (didInitFromQueryRef.current || typeof window === 'undefined') return;
    if (!window.location.search) {
      didInitFromQueryRef.current = true;
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const modeParam = params.get('mode');
    const minParam = params.get('min');
    const maxParam = params.get('max');
    const playParam = params.get('play');

    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled || didInitFromQueryRef.current) return;
      didInitFromQueryRef.current = true;

      if (modeParam === 'never-have-i-ever' || modeParam === 'most-likely-to') {
        setGameMode(modeParam);
      }

      if (minParam !== null && maxParam !== null) {
        const minVal = Number.parseInt(minParam, 10);
        const maxVal = Number.parseInt(maxParam, 10);
        if (
          Number.isInteger(minVal) &&
          Number.isInteger(maxVal) &&
          minVal >= 1 &&
          maxVal <= 10 &&
          minVal <= maxVal
        ) {
          setIntensityRange(minVal as IntensityLevel, maxVal as IntensityLevel);
        }
      }

      if (playParam === '1') {
        setIsPlaying(true);
      }

      if (modeParam || minParam || maxParam || playParam) {
        window.history.replaceState({}, '', '/');
      }
    });

    return () => {
      cancelled = true;
    };
  }, [setIntensityRange]);

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

  const handleStartGame = (rangeOverride?: {
    min: IntensityLevel;
    max: IntensityLevel;
  }) => {
    if (rangeOverride) {
      setIntensityRange(rangeOverride.min, rangeOverride.max);
      trackGameStart({
        totalCards,
        intensityMin: rangeOverride.min,
        intensityMax: rangeOverride.max,
      });
    } else {
      trackGameStart({
        totalCards,
        intensityMin: intensityRange.min,
        intensityMax: intensityRange.max,
      });
    }
    setIsPlaying(true);
  };

  const handleSelectCustomCard = (card: QuestionCard) => {
    jumpToCard(card);
    setIsPlaying(true);
  };

  const handleShareGame = async () => {
    const shareData = {
      title: 'Tagay Ta — Pinoy Barkada Party Deck & Drinking Game',
      text: 'Play Never Have I Ever and Most Likely To with 600 Pinoy barkada prompts! Play now:',
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
                        <Target className="w-3.5 h-3.5 text-tertiary shrink-0" />
                      </div>
                      <span className="font-mono text-[10px] text-tertiary font-bold block">
                        ● 100 Cards Active
                      </span>
                    </div>
                    {gameMode === 'most-likely-to' && (
                      <span className="px-1.5 py-0.5 rounded-full bg-tertiary-fixed border border-on-surface font-mono text-[9px] font-bold text-on-surface uppercase shrink-0">
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
          {/* Desktop Guide Link */}
          <Link
            href="/how-to-play"
            className="hidden md:inline-flex brutal-interactive bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border-[2px] border-on-surface shadow-brutal-sm rounded-full px-3 py-1.5 min-h-[34px] font-mono text-label-code uppercase items-center gap-1.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-offset-1"
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Guide</span>
          </Link>

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
        /* Main Menu Screen (Option A2: Single-Screen Arcade Launcher) */
        <main className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-3 sm:px-6 py-2.5 sm:py-4 gap-3">
          {/* Hero Game Launcher Card */}
          <section
            aria-label="Main Menu"
            className="w-full bg-surface-container-lowest border-[3px] border-on-surface rounded-card shadow-brutal-card p-3.5 sm:p-5 flex flex-col gap-3 sm:gap-3.5"
          >
            {/* Compact Header Row */}
            <div className="flex items-center justify-between gap-2">
              <h1 className="font-display font-bold text-title sm:text-headline-sm tracking-[-0.02em] text-on-surface leading-tight">
                {gameMode === 'most-likely-to'
                  ? 'Pinoy Most Likely To'
                  : 'Pinoy Never Have I Ever'}
              </h1>
              <span className="px-2.5 py-1 rounded-full bg-surface-container border border-on-surface font-mono text-[10px] sm:text-[11px] font-bold text-on-surface whitespace-nowrap shrink-0">
                <span className="hidden sm:inline">100% Free · No Login</span>
                <span className="sm:hidden">600 Cards</span>
              </span>
            </div>

            {/* Inline 2-Mode Segmented Switcher */}
            <div
              role="tablist"
              aria-label="Game Mode Switcher"
              className="grid grid-cols-2 p-1 rounded-control bg-surface border-2 border-on-surface gap-1.5"
            >
              <button
                type="button"
                role="tab"
                aria-selected={gameMode === 'never-have-i-ever'}
                onClick={() => setGameMode('never-have-i-ever')}
                className={`min-h-[44px] py-2 px-2 sm:px-3 rounded-token font-mono text-xs sm:text-sm font-bold uppercase transition-all duration-100 flex items-center justify-center gap-1.5 cursor-pointer brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface ${
                  gameMode === 'never-have-i-ever'
                    ? 'bg-secondary-container text-on-surface border-2 border-on-surface shadow-brutal-sm -translate-y-[1px]'
                    : 'bg-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                }`}
              >
                <BeerIcon className="w-4 h-4 shrink-0" />
                <span>Never Have I Ever</span>
                <span className="font-mono text-[11px] opacity-80 hidden sm:inline">
                  (500)
                </span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={gameMode === 'most-likely-to'}
                onClick={() => setGameMode('most-likely-to')}
                className={`min-h-[44px] py-2 px-2 sm:px-3 rounded-token font-mono text-xs sm:text-sm font-bold uppercase transition-all duration-100 flex items-center justify-center gap-1.5 cursor-pointer brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface ${
                  gameMode === 'most-likely-to'
                    ? 'bg-tertiary-fixed text-on-surface border-2 border-on-surface shadow-brutal-sm -translate-y-[1px]'
                    : 'bg-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                }`}
              >
                <Target className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Most Likely To</span>
                <span className="font-mono text-[11px] opacity-80 hidden sm:inline">
                  (100)
                </span>
              </button>
            </div>

            {/* Tactile Stacked Preview Deck */}
            <LobbyPreviewDeck
              card={currentCard}
              theme={theme}
              gameMode={gameMode}
              onNext={nextCard}
              onPrev={prevCard}
            />

            {/* Embedded Compact 1-10 Intensity Selector */}
            <div className="p-3 sm:p-3.5 rounded-control bg-surface border-2 border-on-surface">
              <IntensitySlider
                range={intensityRange}
                onChange={setIntensityRange}
                showRangeInputs={false}
              />
            </div>

            {/* Primary Dominant AAA CTA */}
            <button
              type="button"
              onClick={() => handleStartGame()}
              className="w-full py-3.5 px-5 min-h-[52px] rounded-control bg-secondary-container hover:bg-secondary-fixed border-[2.5px] border-on-surface shadow-brutal font-display font-bold text-title text-on-surface inline-flex items-center justify-center gap-2 brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
            >
              <span>Deal My First Card • {totalCards} Cards</span>
              <ArrowRightIcon className="w-5 h-5 shrink-0" />
            </button>

            {/* Mode-Synced 3-Step Visual Loop Strip */}
            <ModeLoopStrip gameMode={gameMode} />

            {/* Compact Utility Bar */}
            <div className="pt-2.5 border-t border-on-surface/15 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setIsCustomModalOpen(true)}
                  className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[34px] px-3 py-1.5 rounded-full bg-surface border border-on-surface hover:bg-surface-container font-mono text-xs font-semibold text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface active:scale-95"
                >
                  <PlusIcon className="w-3.5 h-3.5 shrink-0 mr-1" />
                  <span>Custom ({customCards.length})</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareGame}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] sm:min-h-[34px] px-3 py-1.5 rounded-full bg-surface text-on-surface border border-on-surface font-mono text-xs font-semibold hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface active:scale-95"
                  aria-label="Invite friends and share Tagay Ta"
                >
                  {copiedLink ? (
                    <>
                      <CheckIcon className="w-3.5 h-3.5 text-on-surface shrink-0" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <ShareIcon className="w-3.5 h-3.5 text-on-surface shrink-0" />
                      <span>Invite Barkada</span>
                    </>
                  )}
                </button>
              </div>

              <Link
                href="/how-to-play"
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] sm:min-h-[34px] px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container border border-on-surface font-mono text-xs font-bold text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Rules &amp; FAQs</span>
              </Link>
            </div>
          </section>

          {/* Compact Footer */}
          <footer className="w-full text-center pt-1 pb-2 space-y-1">
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-[11px] sm:text-xs text-on-surface-variant">
              <a
                href="https://jedmamosto.me"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackPortfolioClick('main_menu_footer')}
                className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[32px] gap-1 hover:text-primary transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface rounded-token px-1.5"
              >
                <span>Built by Jed Mamosto</span>
                <ExternalLinkIcon className="w-3 h-3 shrink-0" />
              </a>
              <span>•</span>
              <Link
                href="/how-to-play"
                className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[32px] hover:text-primary transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface rounded-token px-1.5"
              >
                How to Play &amp; FAQs
              </Link>
              <span>•</span>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[32px] hover:text-primary transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface rounded-token px-1.5"
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
                className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[32px] gap-1 hover:text-primary transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface rounded-token px-1.5"
              >
                <span>Libreng Tagay</span>
                <BeerIcon className="w-3 h-3 shrink-0" />
              </button>
            </div>
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
