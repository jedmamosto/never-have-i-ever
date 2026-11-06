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
  ChevronDownIcon,
  ExternalLinkIcon,
  FlameIcon,
  PlusIcon,
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

  return (
    <div className="min-h-dvh flex flex-col justify-between">
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
        <main className="flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
          <section
            aria-label="Main Menu"
            className="max-w-xl w-full bg-surface-container-lowest border-[3px] border-on-surface rounded-card shadow-brutal-card p-6 sm:p-8 flex flex-col gap-6"
          >
            {/* Title & 1-Line Subtitle */}
            <div className="space-y-1.5">
              <span className="font-mono text-label-code uppercase tracking-wider text-primary font-bold block">
                TAGAY TA // 500 CALIBRATED PROMPTS
              </span>
              <h1 className="font-display font-bold text-headline-md sm:text-display-sm tracking-[-0.02em] text-on-surface">
                Pass &amp; Play Conversation Deck
              </h1>
              <p className="font-sans text-body-md text-on-surface-variant">
                Pick your intensity range and pass the device around the room.
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
          </section>

          {/* Lowkey Portfolio Credit Footer */}
          <footer className="w-full text-center pt-6 pb-2">
            <a
              href="https://jedmamosto.me"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackPortfolioClick('main_menu_footer')}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface rounded-token px-2 py-1"
            >
              <span>Crafted with 🍻 by Jed Mamosto</span>
              <span className="text-primary font-bold">• jedmamosto.me</span>
              <ExternalLinkIcon className="w-3.5 h-3.5 shrink-0" />
            </a>
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
