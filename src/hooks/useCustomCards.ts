'use client';

import { useState, useEffect, useCallback } from 'react';
import type { GameMode, IntensityLevel, QuestionCard } from '../types/game';
import { getTierForLevel } from '../lib/theme';

const STORAGE_KEYS: Record<GameMode, string> = {
  'never-have-i-ever': 'nhie_custom_cards_v1',
  'most-likely-to': 'mlt_custom_cards_v1',
};

export interface NewCustomCardInput {
  text: string;
  level: IntensityLevel;
  category: string;
}

function formatPromptText(rawText: string): string {
  const stripped = rawText
    .trim()
    .replace(/^(who('?s|\s+is)\s+)?most\s+likely\s+to[\s.,:;!?\-—]*/i, '')
    .replace(/^never\s+have\s+i\s+ever[\s.,:;!?\-—]*/i, '')
    .replace(/^sino\s+ang\s+(pinaka-?posibleng|pinaka\s+posibleng|pinaka)[\s.,:;!?\-—]*/i, '')
    .trim();

  if (!stripped) return '';

  const capitalized = stripped.charAt(0).toUpperCase() + stripped.slice(1);
  const hasTerminalPunctuation = /[.!?"'”]$/.test(capitalized);
  return hasTerminalPunctuation ? capitalized : `${capitalized}.`;
}

export function useCustomCards(mode: GameMode = 'never-have-i-ever') {
  const storageKey = STORAGE_KEYS[mode];
  const [customCards, setCustomCards] = useState<QuestionCard[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          const validCards = parsed.filter(
            (item): item is QuestionCard =>
              typeof item === 'object' &&
              item !== null &&
              typeof (item as QuestionCard).id === 'string' &&
              typeof (item as QuestionCard).text === 'string' &&
              typeof (item as QuestionCard).level === 'number'
          );
          setCustomCards(validCards);
          return;
        }
      }
      setCustomCards([]);
    } catch {
      // Ignore malformed localStorage entries and fall back to empty array
      setCustomCards([]);
    } finally {
      setIsHydrated(true);
    }
  }, [storageKey]);

  const addCustomCard = useCallback((input: NewCustomCardInput): QuestionCard => {
    const cleanedText = formatPromptText(input.text);
    const cleanedCategory = input.category.trim().toUpperCase() || 'CUSTOM LORE';

    const newCard: QuestionCard = {
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      text: cleanedText,
      level: input.level,
      tier: getTierForLevel(input.level),
      category: cleanedCategory,
      isCustom: true,
      createdAt: Date.now(),
    };

    setCustomCards((prev) => {
      const updated = [newCard, ...prev];
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {
        // Ignore storage quota errors
      }
      return updated;
    });

    return newCard;
  }, [storageKey]);

  const deleteCustomCard = useCallback((id: string): void => {
    setCustomCards((prev) => {
      const updated = prev.filter((card) => card.id !== id);
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }
      return updated;
    });
  }, [storageKey]);

  return {
    customCards,
    isHydrated,
    addCustomCard,
    deleteCustomCard,
  };
}
