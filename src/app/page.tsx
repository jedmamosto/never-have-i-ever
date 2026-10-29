'use client';

import React, { useState } from 'react';
import { useCustomCards, type NewCustomCardInput } from '@/hooks/useCustomCards';
import { useGameDeck } from '@/hooks/useGameDeck';
import { HeroCardStack } from '@/components/card/HeroCardStack';
import { BottomDock } from '@/components/controls/BottomDock';
import { IntensitySlider } from '@/components/controls/IntensitySlider';
import { CustomCardModal } from '@/components/modals/CustomCardModal';
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from '@/components/card/Icons';
import type { QuestionCard } from '@/types/game';

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
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
  } = useGameDeck(customCards, isCustomModalOpen || !isPlaying);

  const handleAddCustomCard = (input: NewCustomCardInput) => {
    const created = addCustomCard(input);
    injectAndFocusCard(created);
    setIsCustomModalOpen(false);
  };

  const handleSelectCustomCard = (card: QuestionCard) => {
    jumpToCard(card);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-dvh flex flex-col justify-between">
      {/* Minimal Neo-Brutalist Top Bar (100% Mobile-Safe at 320px-393px+) */}
      <header className="border-b-[2.5px] border-on-surface bg-surface/95 backdrop-blur-md px-4 sm:px-6 h-14 landscape:h-12 flex items-center justify-between gap-2 shrink-0 z-20">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-display font-bold text-base sm:text-lg tracking-[-0.02em] uppercase text-on-surface whitespace-nowrap">
            NEVER HAVE I EVER
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant hidden sm:inline">
            • Pass &amp; Play
          </span>
        </div>

        <div className="flex items-center shrink-0">
          {!isPlaying ? (
            <button
              type="button"
              onClick={() => setIsCustomModalOpen(true)}
              aria-label="Open custom cards modal"
              className="brutal-interactive bg-secondary-container text-on-surface border-[2px] border-on-surface shadow-brutal-sm rounded-full px-3 py-1 font-mono text-label-code uppercase inline-flex items-center gap-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-offset-1"
            >
              <PlusIcon className="w-3.5 h-3.5 shrink-0" />
              <span>Custom ({customCards.length})</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(false)}
              aria-label="Return to Main Menu"
              className="brutal-interactive bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border-[2px] border-on-surface shadow-brutal-sm rounded-full px-3 py-1 font-mono text-label-code uppercase inline-flex items-center gap-1.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-offset-1"
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
                TABLETOP EDITION // 100+ PROMPTS
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
                onClick={() => setIsPlaying(true)}
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
    </div>
  );
}
