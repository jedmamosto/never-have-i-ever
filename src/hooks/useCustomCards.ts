'use client';

import { useState, useEffect, useCallback } from 'react';
import type { IntensityLevel, QuestionCard } from '../types/game';
import { getTierForLevel } from '../lib/theme';

const STORAGE_KEY = 'nhie_custom_cards_v1';

export interface NewCustomCardInput {
  text: string;
  level: IntensityLevel;
  category: string;
}

function formatPromptText(rawText: string): string {
  const stripped = rawText
    .trim()
    .replace(/^never\s+have\s+i\s+ever[\s.,:;!?\-—]*/i, '')
    .trim();

  if (!stripped) return '';

  const capitalized = stripped.charAt(0).toUpperCase() + stripped.slice(1);
  const hasTerminalPunctuation = /[.!?"'”]$/.test(capitalized);
  return hasTerminalPunctuation ? capitalized : `${capitalized}.`;
}

export function useCustomCards() {
  const [customCards, setCustomCards] = useState<QuestionCard[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
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
        }
      }
    } catch {
      // Ignore malformed localStorage entries and fall back to empty array
    } finally {
      setIsHydrated(true);
    }
  }, []);

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
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage quota errors
      }
      return updated;
    });

    return newCard;
  }, []);

  const deleteCustomCard = useCallback((id: string): void => {
    setCustomCards((prev) => {
      const updated = prev.filter((card) => card.id !== id);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }
      return updated;
    });
  }, []);

  return {
    customCards,
    isHydrated,
    addCustomCard,
    deleteCustomCard,
  };
}
