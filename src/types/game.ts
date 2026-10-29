export type IntensityLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type IntensityTier = 'chill' | 'party' | 'spicy';

export interface IntensityRange {
  min: IntensityLevel;
  max: IntensityLevel;
}

export interface QuestionCard {
  id: string;
  text: string;
  level: IntensityLevel;
  tier: IntensityTier;
  category: string;
  isCustom?: boolean;
  createdAt?: number;
}

export interface TierThemeTokens {
  tier: IntensityTier;
  label: string;
  subtitle: string;
  badgeBg: string;
  badgeText: string;
  accentBg: string;
  accentText: string;
  underCardPrimary: string;
  underCardSecondary: string;
  accentHex: string;
}

