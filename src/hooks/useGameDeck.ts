'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { IntensityLevel, IntensityRange, QuestionCard, TierThemeTokens } from '../types/game';
import { INITIAL_QUESTIONS } from '../data/questions';
import { getThemeForLevel } from '../lib/theme';
import { createNonRepeatingOrder } from '../lib/shuffle';

function filterQuestionsByRange(
  allCards: QuestionCard[],
  min: IntensityLevel,
  max: IntensityLevel
): QuestionCard[] {
  return allCards.filter((q) => q.level >= min && q.level <= max);
}

export function useGameDeck(customCards: QuestionCard[], isModalOpen = false) {
  const [intensityRange, setIntensityRangeState] = useState<IntensityRange>({
    min: 1,
    max: 10,
  });
  const [direction, setDirection] = useState<'next' | 'prev' | 'idle'>('idle');
  const [stagedCard, setStagedCard] = useState<QuestionCard | null>(null);

  const [deckOrder, setDeckOrder] = useState<string[]>(() =>
    filterQuestionsByRange(INITIAL_QUESTIONS, 1, 10).map((q) => q.id)
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Shuffle initial deck on client mount so first draw is randomized without SSR mismatch
  useEffect(() => {
    setDeckOrder((prev) => createNonRepeatingOrder(prev));
  }, []);

  // Clear stagedCard once customCards prop includes it so later deletions work cleanly
  useEffect(() => {
    if (stagedCard && customCards.some((c) => c.id === stagedCard.id)) {
      setStagedCard(null);
    }
  }, [customCards, stagedCard]);

  // Combined card pool including any newly staged card not yet reflected in customCards prop
  const allCards = useMemo(() => {
    const customIds = new Set(customCards.map((c) => c.id));
    const mergedCustom =
      stagedCard && stagedCard.isCustom && !customIds.has(stagedCard.id)
        ? [stagedCard, ...customCards]
        : customCards;
    return [...mergedCustom, ...INITIAL_QUESTIONS];
  }, [customCards, stagedCard]);

  const cardById = useMemo(() => {
    const map = new Map<string, QuestionCard>();
    for (const card of allCards) {
      map.set(card.id, card);
    }
    return map;
  }, [allCards]);

  const filteredPool = useMemo(
    () => filterQuestionsByRange(allCards, intensityRange.min, intensityRange.max),
    [allCards, intensityRange.min, intensityRange.max]
  );

  // Reconcile deckOrder when customCards are added or deleted
  useEffect(() => {
    const validIds = new Set(filteredPool.map((q) => q.id));
    setDeckOrder((prevOrder) => {
      const kept = prevOrder.filter((id) => validIds.has(id));
      const keptSet = new Set(kept);
      const missing = filteredPool
        .map((q) => q.id)
        .filter((id) => !keptSet.has(id));

      if (kept.length === prevOrder.length && missing.length === 0) {
        return prevOrder;
      }

      const nextOrder =
        kept.length > 0
          ? [...kept, ...missing]
          : createNonRepeatingOrder(filteredPool.map((q) => q.id));

      setCurrentIndex((prevIdx) =>
        nextOrder.length === 0 ? 0 : Math.min(prevIdx, nextOrder.length - 1)
      );
      return nextOrder;
    });
  }, [filteredPool]);

  const safeIndex =
    deckOrder.length > 0 ? Math.min(currentIndex, deckOrder.length - 1) : 0;

  const currentCard: QuestionCard | null =
    deckOrder.length > 0
      ? cardById.get(deckOrder[safeIndex]) ?? filteredPool[0] ?? null
      : filteredPool[0] ?? null;

  const totalCards = deckOrder.length;
  const seenCountInCycle = totalCards > 0 ? safeIndex + 1 : 0;

  const theme: TierThemeTokens = useMemo(
    () =>
      currentCard
        ? getThemeForLevel(currentCard.level)
        : getThemeForLevel(intensityRange.max),
    [currentCard, intensityRange.max]
  );

  const rangeTheme: TierThemeTokens = useMemo(
    () => getThemeForLevel(intensityRange.max),
    [intensityRange.max]
  );

  const setIntensityRange = useCallback(
    (min: IntensityLevel, max: IntensityLevel) => {
      const actualMin = Math.min(min, max) as IntensityLevel;
      const actualMax = Math.max(min, max) as IntensityLevel;
      const nextPool = filterQuestionsByRange(allCards, actualMin, actualMax);
      const nextIds = nextPool.map((q) => q.id);
      setIntensityRangeState({ min: actualMin, max: actualMax });
      setDeckOrder(createNonRepeatingOrder(nextIds, currentCard?.id));
      setCurrentIndex(0);
      setDirection('next');
    },
    [allCards, currentCard?.id]
  );

  const nextCard = useCallback(() => {
    if (deckOrder.length === 0) return;
    setDirection('next');

    if (safeIndex + 1 < deckOrder.length) {
      setCurrentIndex(safeIndex + 1);
    } else {
      const lastCardId = deckOrder[safeIndex];
      const poolIds = filteredPool.map((q) => q.id);
      const reshuffled = createNonRepeatingOrder(
        poolIds.length > 0 ? poolIds : deckOrder,
        lastCardId
      );
      setDeckOrder(reshuffled);
      setCurrentIndex(0);
    }
  }, [deckOrder, safeIndex, filteredPool]);

  const prevCard = useCallback(() => {
    if (deckOrder.length === 0) return;
    setDirection('prev');
    setCurrentIndex(safeIndex > 0 ? safeIndex - 1 : deckOrder.length - 1);
  }, [deckOrder.length, safeIndex]);

  const shuffleActiveDeck = useCallback(() => {
    const poolIds = filteredPool.map((q) => q.id);
    if (poolIds.length === 0) return;
    setDirection('next');
    setDeckOrder(createNonRepeatingOrder(poolIds, currentCard?.id));
    setCurrentIndex(0);
  }, [filteredPool, currentCard?.id]);

  const injectAndFocusCard = useCallback(
    (newCard: QuestionCard) => {
      setStagedCard(newCard);
      setDirection('next');

      const nextMin = Math.min(intensityRange.min, newCard.level) as IntensityLevel;
      const nextMax = Math.max(intensityRange.max, newCard.level) as IntensityLevel;

      if (nextMin !== intensityRange.min || nextMax !== intensityRange.max) {
        setIntensityRangeState({ min: nextMin, max: nextMax });
      }

      const poolWithCard = [
        newCard,
        ...allCards.filter((c) => c.id !== newCard.id),
      ];

      setDeckOrder((prev) => {
        const withoutNew = prev.filter((id) => id !== newCard.id);
        const insertIdx = Math.min(safeIndex, withoutNew.length);
        const next = [...withoutNew];
        next.splice(insertIdx, 0, newCard.id);

        const nextSet = new Set(next);
        const extraIds = filterQuestionsByRange(poolWithCard, nextMin, nextMax)
          .map((q) => q.id)
          .filter((id) => !nextSet.has(id));

        return extraIds.length > 0
          ? [...next, ...createNonRepeatingOrder(extraIds)]
          : next;
      });
    },
    [allCards, intensityRange.min, intensityRange.max, safeIndex]
  );

  const jumpToCard = useCallback(
    (card: QuestionCard) => {
      setStagedCard(card);
      setDirection('next');

      const nextMin = Math.min(intensityRange.min, card.level) as IntensityLevel;
      const nextMax = Math.max(intensityRange.max, card.level) as IntensityLevel;

      if (nextMin !== intensityRange.min || nextMax !== intensityRange.max) {
        setIntensityRangeState({ min: nextMin, max: nextMax });
      }

      const poolWithCard = [
        card,
        ...allCards.filter((c) => c.id !== card.id),
      ];
      const matchingIds = filterQuestionsByRange(poolWithCard, nextMin, nextMax)
        .map((q) => q.id)
        .filter((id) => id !== card.id);
      const shuffledOthers = createNonRepeatingOrder(matchingIds);
      setDeckOrder([card.id, ...shuffledOthers]);
      setCurrentIndex(0);
    },
    [allCards, intensityRange.min, intensityRange.max]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) return;

      const target = e.target as HTMLElement | null;
      if (target) {
        const tagName = target.tagName;
        if (
          tagName === 'INPUT' ||
          tagName === 'TEXTAREA' ||
          tagName === 'SELECT' ||
          target.isContentEditable
        ) {
          return;
        }
      }

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextCard();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevCard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, nextCard, prevCard]);

  return {
    intensityRange,
    setIntensityRange,
    currentCard,
    currentIndex: safeIndex,
    seenCountInCycle,
    totalCards,
    theme,
    rangeTheme,
    direction,
    nextCard,
    prevCard,
    shuffleActiveDeck,
    injectAndFocusCard,
    jumpToCard,
  };
}

