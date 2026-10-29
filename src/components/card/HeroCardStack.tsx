'use client';

import React, { useRef, useState } from 'react';
import type { QuestionCard, TierThemeTokens } from '@/types/game';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CustomSparkleIcon,
  PlusIcon,
  TierIcon,
} from '@/components/card/Icons';

export interface HeroCardStackProps {
  card: QuestionCard | null;
  currentIndex: number;
  totalCards: number;
  theme: TierThemeTokens;
  direction: 'next' | 'prev' | 'idle';
  onNext: () => void;
  onPrev: () => void;
  onOpenCustomModal?: () => void;
}

const SWIPE_THRESHOLD_PX = 65;

export function HeroCardStack({
  card,
  currentIndex,
  totalCards,
  theme,
  direction,
  onNext,
  onPrev,
  onOpenCustomModal,
}: HeroCardStackProps) {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const pointerStartRef = useRef<{ id: number; startX: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    pointerStartRef.current = { id: e.pointerId, startX: e.clientX };
    setIsDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture is unsupported in synthetic environments
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!isDragging || !pointerStartRef.current) return;
    if (pointerStartRef.current.id !== e.pointerId) return;
    const deltaX = e.clientX - pointerStartRef.current.startX;
    setDragX(deltaX);
  };

  const finishPointerGesture = (e: React.PointerEvent<HTMLElement>, commitSwipe: boolean) => {
    if (!pointerStartRef.current || pointerStartRef.current.id !== e.pointerId) {
      return;
    }
    const finalDragX = dragX;
    pointerStartRef.current = null;
    setIsDragging(false);
    setDragX(0);

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore release errors
    }

    if (commitSwipe) {
      if (finalDragX < -SWIPE_THRESHOLD_PX) {
        onNext();
      } else if (finalDragX > SWIPE_THRESHOLD_PX) {
        onPrev();
      }
    }
  };

  const formattedCurrent = String(totalCards > 0 ? currentIndex + 1 : 0).padStart(3, '0');
  const formattedTotal = String(totalCards).padStart(3, '0');

  const activeSwipeLabel =
    isDragging && dragX < -24
      ? 'NEXT CARD →'
      : isDragging && dragX > 24
        ? '← PREV CARD'
        : null;

  const cardTransformStyle: React.CSSProperties = isDragging
    ? {
        transform: `translate3d(${dragX}px, ${Math.abs(dragX) * 0.04}px, 0) rotate(${dragX * 0.035}deg)`,
        transition: 'none',
      }
    : {
        transform: 'translate3d(0px, 0px, 0) rotate(0deg)',
      };

  return (
    <section
      aria-label="Active question card deck"
      className="w-full max-w-2xl mx-auto relative py-2.5 px-1.5 sm:px-3"
      data-direction={direction}
    >
      {/* Bottom angled under-card */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-1.5 sm:inset-x-3 inset-y-2.5 ${theme.underCardSecondary} rotate-[2.6deg] scale-[0.98] border-[2.5px] border-on-surface rounded-card shadow-brutal-card transition-colors duration-200`}
      />

      {/* Middle angled under-card */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-1.5 sm:inset-x-3 inset-y-2.5 ${theme.underCardPrimary} -rotate-[2.1deg] scale-[0.99] border-[2.5px] border-on-surface rounded-card shadow-brutal-card transition-colors duration-200`}
      />

      {/* Main active top card */}
      <article
        onPointerDown={card ? handlePointerDown : undefined}
        onPointerMove={card ? handlePointerMove : undefined}
        onPointerUp={card ? (e) => finishPointerGesture(e, true) : undefined}
        onPointerCancel={card ? (e) => finishPointerGesture(e, false) : undefined}
        style={cardTransformStyle}
        className={`relative z-10 bg-surface-container-lowest border-[3px] border-on-surface rounded-card shadow-brutal-card select-none touch-pan-y p-5 sm:p-7 md:p-9 landscape:py-5 landscape:px-8 flex flex-col justify-between gap-5 sm:gap-7 landscape:gap-4 min-h-[300px] sm:min-h-[350px] landscape:min-h-[240px] ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab transition-transform duration-150 ease-out'
        }`}
      >
        {/* Tactile swipe status badge during active drag */}
        {activeSwipeLabel && (
          <div
            aria-live="polite"
            className={`pointer-events-none absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 ${theme.accentBg} ${theme.accentText} border-[2px] border-on-surface rounded-full px-3.5 py-1 shadow-brutal-sm font-mono text-label-code uppercase tracking-wider whitespace-nowrap`}
          >
            {activeSwipeLabel}
          </div>
        )}

        {card ? (
          <>
            {/* Header Strip */}
            <header className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`${theme.badgeBg} ${theme.badgeText} border-[2px] border-on-surface shadow-brutal-sm rounded-full px-3 py-1 font-mono text-label-code uppercase inline-flex items-center gap-1.5`}
                >
                  LEVEL {card.level}
                </span>

                {card.isCustom && (
                  <span className="bg-secondary-container text-on-surface border-[2px] border-on-surface shadow-brutal-sm rounded-full px-2.5 py-1 font-mono text-label-code uppercase inline-flex items-center gap-1">
                    <CustomSparkleIcon className="w-3 h-3 shrink-0" />
                    <span>CUSTOM</span>
                  </span>
                )}
              </div>

              <div
                aria-label={`Card ${currentIndex + 1} of ${totalCards}`}
                className="bg-surface-container-high px-3 py-1 rounded-full border-[2px] border-on-surface shadow-brutal-sm font-mono text-label-counter font-bold text-on-surface shrink-0"
              >
                {formattedCurrent} / {formattedTotal}
              </div>
            </header>

            {/* Core Statement Body */}
            <div className="my-auto py-2 sm:py-4 landscape:py-1 flex flex-col gap-2.5 sm:gap-3.5">
              <div className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={`w-2.5 h-2.5 rounded-full border-[1.5px] border-on-surface ${theme.accentBg}`}
                />
                <span className="font-mono text-label-code uppercase tracking-[0.18em] font-bold text-primary">
                  NEVER HAVE I EVER...
                </span>
              </div>

              <h1 className="text-[clamp(1.5rem,3.4vw+0.5rem,2.5rem)] leading-[1.2] tracking-[-0.02em] font-display font-bold text-on-surface break-words">
                {card.text}
              </h1>
            </div>

            {/* Footer Action Controls */}
            <footer className="pt-3 border-t-[2px] border-surface-container-highest flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous card"
                className="brutal-interactive bg-surface-container-low hover:bg-surface-container text-on-surface border-[2.5px] border-on-surface rounded-control shadow-brutal px-4 py-2.5 font-display font-bold text-body-md inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-offset-2"
              >
                <ArrowLeftIcon className="w-4 h-4 shrink-0" />
                <span>Prev</span>
              </button>

              <button
                type="button"
                onClick={onNext}
                aria-label="Next card"
                className={`brutal-interactive ${theme.accentBg} ${theme.accentText} border-[2.5px] border-on-surface rounded-control shadow-brutal px-5 py-2.5 font-display font-bold text-body-md inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-offset-2`}
              >
                <span>Next Card</span>
                <ArrowRightIcon className="w-4 h-4 shrink-0" />
              </button>
            </footer>
          </>
        ) : (
          /* Empty State Fallback */
          <div className="my-auto py-8 flex flex-col items-center text-center gap-4">
            <span
              className={`${theme.badgeBg} ${theme.badgeText} border-[2px] border-on-surface shadow-brutal-sm rounded-full px-3 py-1 font-mono text-label-code uppercase inline-flex items-center gap-1.5`}
            >
              <TierIcon tier={theme.tier} className="w-3.5 h-3.5 shrink-0" />
              <span>EMPTY DECK</span>
            </span>
            <h1 className="text-[clamp(1.45rem,3.2vw+0.5rem,2.2rem)] leading-[1.18] tracking-[-0.02em] font-display font-bold text-on-surface">
              No prompts match this filter.
            </h1>
            <p className="font-sans text-body-md text-on-surface-variant max-w-md">
              Try widening the intensity scope or add your own custom prompt to this level.
            </p>
            {onOpenCustomModal && (
              <button
                type="button"
                onClick={onOpenCustomModal}
                className={`brutal-interactive ${theme.accentBg} ${theme.accentText} border-[2.5px] border-on-surface rounded-control shadow-brutal px-5 py-2.5 font-display font-bold text-body-md inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-offset-2`}
              >
                <PlusIcon className="w-4 h-4 shrink-0" />
                <span>Add Custom Prompt</span>
              </button>
            )}
          </div>
        )}
      </article>
    </section>
  );
}
