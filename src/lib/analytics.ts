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

export function trackGcashModalOpen(sourceOrParams?: string | { source?: string }) {
  const source = typeof sourceOrParams === 'string' ? sourceOrParams : sourceOrParams?.source;
  track('gcash_modal_open', source ? { source } : {});
}

export function trackGcashNumberCopied() {
  track('gcash_number_copied');
}

export function trackModeTeaserOpen(modeOrParams?: string | { mode?: string }) {
  const mode = typeof modeOrParams === 'string' ? modeOrParams : modeOrParams?.mode ?? 'most-likely-to';
  track('mode_teaser_open', { mode });
}

export function trackModeTeaserInterest(modeOrParams?: string | { mode?: string }) {
  const mode = typeof modeOrParams === 'string' ? modeOrParams : modeOrParams?.mode ?? 'most-likely-to';
  track('mode_teaser_interest', { mode });
}

export function trackPortfolioClick(sourceOrParams?: string | { source?: string }) {
  const source = typeof sourceOrParams === 'string' ? sourceOrParams : sourceOrParams?.source ?? 'main_menu';
  track('portfolio_click', { source });
}

