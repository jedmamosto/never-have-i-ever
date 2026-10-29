'use client';

import React, { useEffect, useState } from 'react';
import type { IntensityLevel, IntensityRange } from '@/types/game';
import { IntensitySlider } from './IntensitySlider';
import { PlusIcon, ShuffleIcon, SlidersIcon } from '@/components/card/Icons';

export interface BottomDockProps {
  range: IntensityRange;
  onRangeChange: (min: IntensityLevel, max: IntensityLevel) => void;
  onShuffle: () => void;
  onOpenCustomModal: () => void;
  customCardCount: number;
}

export function BottomDock({
  range,
  onRangeChange,
  onShuffle,
  onOpenCustomModal,
  customCardCount,
}: BottomDockProps) {
  const [isRangePopoverOpen, setIsRangePopoverOpen] = useState(false);

  useEffect(() => {
    if (!isRangePopoverOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsRangePopoverOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRangePopoverOpen]);

  const rangeLabel = `Lv. ${range.min}–${range.max}`;

  return (
    <section
      aria-label="Game deck controls"
      className="relative w-full max-w-md mx-auto"
    >
      {/* Toggleable Pop-up Range Configuration Card */}
      {isRangePopoverOpen && (
        <div
          role="dialog"
          aria-label="Configure intensity range"
          className="absolute bottom-full left-0 right-0 mb-2.5 z-30 bg-surface-container-lowest rounded-card border-[2.5px] border-on-surface shadow-brutal-card p-4 flex flex-col gap-3.5"
        >
          <IntensitySlider range={range} onChange={onRangeChange} />

          <div className="flex justify-end pt-1 border-t border-on-surface/15">
            <button
              type="button"
              onClick={() => setIsRangePopoverOpen(false)}
              className="px-4 py-1.5 rounded-control bg-secondary-container border-2 border-on-surface shadow-brutal-sm font-display font-bold text-body-sm text-on-surface brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Compact Single-Row Floating Dock */}
      <div className="bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl border-[2.5px] border-on-surface shadow-brutal p-2 grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => setIsRangePopoverOpen((prev) => !prev)}
          aria-expanded={isRangePopoverOpen}
          aria-label={`Adjust intensity range, currently ${rangeLabel}`}
          className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-control border-2 border-on-surface shadow-brutal-sm font-mono font-bold text-xs sm:text-body-sm text-on-surface whitespace-nowrap brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface ${
            isRangePopoverOpen
              ? 'bg-secondary-container'
              : 'bg-surface hover:bg-surface-container-low'
          }`}
        >
          <SlidersIcon className="w-3.5 h-3.5 shrink-0" />
          <span>{rangeLabel}</span>
        </button>

        <button
          type="button"
          onClick={onShuffle}
          className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-control bg-surface hover:bg-surface-container-low border-2 border-on-surface shadow-brutal-sm font-display font-bold text-xs sm:text-body-sm text-on-surface whitespace-nowrap brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
        >
          <ShuffleIcon className="w-3.5 h-3.5 shrink-0" />
          <span>Shuffle</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setIsRangePopoverOpen(false);
            onOpenCustomModal();
          }}
          className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-control bg-secondary-container border-2 border-on-surface shadow-brutal-sm font-display font-bold text-xs sm:text-body-sm text-on-surface whitespace-nowrap brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
        >
          <PlusIcon className="w-3.5 h-3.5 shrink-0" />
          <span>
            {`Custom${customCardCount > 0 ? ` (${customCardCount})` : ''}`}
          </span>
        </button>
      </div>
    </section>
  );
}

export default BottomDock;
