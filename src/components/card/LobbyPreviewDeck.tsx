'use client';

import React, { useRef, useState } from 'react';
import type { GameMode, QuestionCard, TierThemeTokens } from '@/types/game';
import { ArrowLeftIcon } from '@/components/card/Icons';
import { Dices } from 'lucide-react';

export interface LobbyPreviewDeckProps {
  card: QuestionCard | null;
  theme: TierThemeTokens;
  gameMode: GameMode;
  onNext: () => void;
  onPrev: () => void;
}

const SWIPE_THRESHOLD_PX = 55;
const TAP_THRESHOLD_PX = 8;

/**
 * Interactive stacked preview card deck shown in the main lobby launcher.
 * Supports pointer swipe gestures, card-body tap-to-advance, and explicit controls.
 */
export function LobbyPreviewDeck({
  card,
  theme,
  gameMode,
  onNext,
  onPrev,
}: LobbyPreviewDeckProps) {
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
    setDragX(e.clientX - pointerStartRef.current.startX);
  };

  const finishPointerGesture = (
    e: React.PointerEvent<HTMLElement>,
    commitSwipe: boolean
  ) => {
    if (!pointerStartRef.current || pointerStartRef.current.id !== e.pointerId) {
      return;
    }
    const finalDragX =
      typeof e.clientX === 'number' && e.clientX !== 0
        ? e.clientX - pointerStartRef.current.startX
        : dragX;

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
      } else if (Math.abs(finalDragX) < TAP_THRESHOLD_PX) {
        onNext();
      }
    }
  };

  const activeSwipeLabel =
    isDragging && dragX < -20
      ? 'NEXT →'
      : isDragging && dragX > 20
        ? '← PREV'
        : null;

  const cardTransformStyle: React.CSSProperties = isDragging
    ? {
        transform: `translate3d(${dragX}px, ${Math.abs(dragX) * 0.03}px, 0) rotate(${dragX * 0.03}deg)`,
        transition: 'none',
      }
    : {
        transform: 'translate3d(0px, 0px, 0) rotate(0deg)',
      };

  return (
    <div
      aria-label="Live card sample"
      className="relative w-full py-1.5 px-1"
    >
      {/* Bottom angled under-card */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-1 inset-y-1.5 ${theme.underCardSecondary} rotate-[1.8deg] scale-[0.985] border-[2px] border-on-surface rounded-control shadow-brutal-sm transition-colors duration-200`}
      />

      {/* Middle angled under-card */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-1 inset-y-1.5 ${theme.underCardPrimary} -rotate-[1.4deg] scale-[0.992] border-[2px] border-on-surface rounded-control shadow-brutal-sm transition-colors duration-200`}
      />

      {/* Active top preview card */}
      <article
        onPointerDown={card ? handlePointerDown : undefined}
        onPointerMove={card ? handlePointerMove : undefined}
        onPointerUp={card ? (e) => finishPointerGesture(e, true) : undefined}
        onPointerCancel={card ? (e) => finishPointerGesture(e, false) : undefined}
        style={cardTransformStyle}
        className={`relative z-10 bg-surface border-[2.5px] border-on-surface rounded-control shadow-brutal p-3.5 sm:p-4 min-h-[144px] sm:min-h-[156px] flex flex-col justify-between gap-2.5 select-none touch-pan-y ${
          card
            ? isDragging
              ? 'cursor-grabbing'
              : 'cursor-pointer transition-transform duration-150 ease-out'
            : ''
        }`}
      >
        {activeSwipeLabel && (
          <div
            aria-live="polite"
            className={`pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 z-20 ${theme.accentBg} ${theme.accentText} border-[2px] border-on-surface rounded-full px-3 py-0.5 shadow-brutal-sm font-mono text-[10px] uppercase tracking-wider whitespace-nowrap font-bold`}
          >
            {activeSwipeLabel}
          </div>
        )}

        {card ? (
          <>
            <div className="flex items-center justify-between gap-2">
              <span
                className={`${theme.badgeBg} ${theme.badgeText} border-[1.5px] border-on-surface rounded-full px-2.5 py-0.5 font-mono text-[10px] sm:text-label-code uppercase font-bold shrink-0`}
              >
                LEVEL {card.level}
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-on-surface-variant/80 whitespace-nowrap shrink-0">
                LIVE PREVIEW
              </span>
            </div>

            <div className="space-y-1 my-auto py-1">
              <span
                className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-bold block ${
                  gameMode === 'most-likely-to' ? 'text-tertiary' : 'text-primary'
                }`}
              >
                {gameMode === 'most-likely-to'
                  ? 'MOST LIKELY TO...'
                  : 'NEVER HAVE I EVER...'}
              </span>
              <p className="font-display font-bold text-base sm:text-title md:text-headline-sm text-on-surface leading-snug break-words">
                {card.text}
              </p>
            </div>

            <div className="pt-2 border-t border-on-surface/15 flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] text-on-surface-variant/75">
                <span className="sm:hidden">Swipe or tap</span>
                <span className="hidden sm:inline">Swipe or tap card to preview</span>
              </span>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous sample card"
                  className="relative h-8 w-9 rounded-token bg-surface-container-low hover:bg-surface-container-high text-on-surface border-[1.5px] border-on-surface shadow-brutal-sm font-mono text-[11px] font-bold inline-flex items-center justify-center brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface after:content-[''] after:absolute after:-inset-y-1.5 after:-inset-x-1"
                >
                  <ArrowLeftIcon className="w-3.5 h-3.5 shrink-0" />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Show another sample card"
                  className="relative h-8 px-2.5 rounded-token bg-surface-container-high hover:bg-surface-container-highest text-on-surface border-[1.5px] border-on-surface shadow-brutal-sm font-mono text-[11px] font-bold inline-flex items-center gap-1.5 brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface after:content-[''] after:absolute after:-inset-y-1.5 after:-inset-x-1"
                >
                  <span>Sample</span>
                  <Dices className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="my-auto py-4 text-center space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-primary block">
              EMPTY RANGE
            </span>
            <p className="font-display font-bold text-sm sm:text-base text-on-surface">
              No cards in this range. Widen levels below.
            </p>
          </div>
        )}
      </article>
    </div>
  );
}

export default LobbyPreviewDeck;
