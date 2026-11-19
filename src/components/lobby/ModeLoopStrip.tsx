import React from 'react';
import type { GameMode } from '@/types/game';
import { ArrowRightIcon, BeerIcon } from '@/components/card/Icons';
import { BookOpen, Target } from 'lucide-react';

export interface ModeLoopStripProps {
  gameMode: GameMode;
}

interface LoopStep {
  num: string;
  label: string;
  icon: React.ReactNode;
}

/**
 * Compact 3-tile visual loop strip synchronized with the selected game mode.
 */
export function ModeLoopStrip({ gameMode }: ModeLoopStripProps) {
  const badgeBg =
    gameMode === 'most-likely-to'
      ? 'bg-tertiary-fixed'
      : 'bg-secondary-container';

  const steps: LoopStep[] =
    gameMode === 'most-likely-to'
      ? [
          {
            num: '01',
            label: 'Read Card',
            icon: <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />,
          },
          {
            num: '02',
            label: '3-2-1 Point',
            icon: <Target className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />,
          },
          {
            num: '03',
            label: 'Most Votes Sips',
            icon: <BeerIcon className="w-3.5 h-3.5 shrink-0" />,
          },
        ]
      : [
          {
            num: '01',
            label: 'Read Card',
            icon: <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />,
          },
          {
            num: '02',
            label: 'Guilty? Sip',
            icon: <BeerIcon className="w-3.5 h-3.5 shrink-0" />,
          },
          {
            num: '03',
            label: 'Pass Phone',
            icon: <ArrowRightIcon className="w-3.5 h-3.5 shrink-0" />,
          },
        ];

  return (
    <ol
      aria-label="How this mode plays"
      className="grid grid-cols-3 gap-1.5 sm:gap-2"
    >
      {steps.map((step) => (
        <li
          key={step.num}
          className="bg-surface border border-on-surface/30 rounded-token px-2 py-2 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 text-center"
        >
          <span
            className={`${badgeBg} border border-on-surface rounded-full px-1.5 py-0.5 font-mono text-[10px] font-bold text-on-surface leading-none shrink-0`}
          >
            {step.num}
          </span>
          <span className="inline-flex items-center gap-1 text-on-surface min-w-0">
            {step.icon}
            <span className="font-mono text-[10px] sm:text-xs font-bold leading-tight">
              {step.label}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}

export default ModeLoopStrip;
