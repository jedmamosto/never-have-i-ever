import type { IntensityLevel, IntensityTier, TierThemeTokens } from '../types/game';

export function getTierForLevel(level: IntensityLevel): IntensityTier {
  if (level <= 3) return 'chill';
  if (level <= 7) return 'party';
  return 'spicy';
}

export function getThemeForLevel(level: IntensityLevel): TierThemeTokens {
  const tier = getTierForLevel(level);

  switch (tier) {
    case 'chill':
      return {
        tier: 'chill',
        label: 'Warm-Up',
        subtitle: 'Levels 1–3',
        badgeBg: 'bg-tertiary-fixed',
        badgeText: 'text-on-tertiary-fixed-variant',
        accentBg: 'bg-tertiary-container',
        accentText: 'text-on-tertiary-container',
        underCardPrimary: 'bg-tertiary-container',
        underCardSecondary: 'bg-tertiary-fixed',
        accentHex: '#7b9f80',
      };
    case 'party':
      return {
        tier: 'party',
        label: 'Party',
        subtitle: 'Levels 4–7',
        badgeBg: 'bg-secondary-container',
        badgeText: 'text-on-secondary-fixed',
        accentBg: 'bg-secondary-container',
        accentText: 'text-on-surface',
        underCardPrimary: 'bg-secondary-container',
        underCardSecondary: 'bg-secondary-fixed',
        accentHex: '#fec24a',
      };
    case 'spicy':
      return {
        tier: 'spicy',
        label: 'Bold',
        subtitle: 'Levels 8–10',
        badgeBg: 'bg-primary-container',
        badgeText: 'text-on-primary-fixed',
        accentBg: 'bg-primary-container',
        accentText: 'text-on-primary-fixed',
        underCardPrimary: 'bg-primary-container',
        underCardSecondary: 'bg-primary-fixed',
        accentHex: '#e07a5f',
      };
  }
}

