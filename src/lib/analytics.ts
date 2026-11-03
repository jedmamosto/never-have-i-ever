import { track } from '@vercel/analytics';

/**
 * Custom event tracking utilities for Vercel Web Analytics.
 * All functions safely no-op during SSR or if analytics is blocked by client ad-blockers.
 */

export function trackGameStart(params: {
  totalCards: number;
  intensityMin: number;
  intensityMax: number;
}) {
  track('game_start', {
    total_cards: params.totalCards,
    intensity_min: params.intensityMin,
    intensity_max: params.intensityMax,
  });
}

export function trackCardNext(params: {
  cardId: string;
  level: number;
  category: string;
  isCustom: boolean;
}) {
  track('card_next', {
    card_id: params.cardId,
    level: params.level,
    category: params.category,
    is_custom: params.isCustom,
  });
}

export function trackCardPrev(params: {
  cardId: string;
  level: number;
  category: string;
}) {
  track('card_prev', {
    card_id: params.cardId,
    level: params.level,
    category: params.category,
  });
}

export function trackIntensityChange(min: number, max: number) {
  track('intensity_change', {
    min,
    max,
  });
}

export function trackCustomCardCreated(params: {
  level: number;
  category: string;
}) {
  track('custom_card_created', {
    level: params.level,
    category: params.category,
  });
}

export function trackDeckShuffled(totalCards: number) {
  track('deck_shuffled', {
    total_cards: totalCards,
  });
}
