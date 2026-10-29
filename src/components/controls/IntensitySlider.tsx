'use client';

import React from 'react';
import type { IntensityLevel, IntensityRange } from '@/types/game';

export interface IntensitySliderProps {
  range: IntensityRange;
  onChange: (min: IntensityLevel, max: IntensityLevel) => void;
}

const LEVELS: IntensityLevel[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const PRESETS: { label: string; min: IntensityLevel; max: IntensityLevel }[] = [
  { label: 'All 1–10', min: 1, max: 10 },
  { label: 'Chill 1–3', min: 1, max: 3 },
  { label: 'Party 4–7', min: 4, max: 7 },
  { label: 'Bold 8–10', min: 8, max: 10 },
];

function getRangePillClasses(level: IntensityLevel, inRange: boolean): string {
  if (!inRange) {
    return 'bg-surface-container-low text-on-surface-variant/60 border-on-surface/30 hover:border-on-surface/60 hover:text-on-surface';
  }
  if (level <= 3) {
    return 'bg-tertiary-fixed text-on-tertiary-fixed border-on-surface shadow-brutal-sm -translate-y-[1px] font-bold';
  }
  if (level <= 7) {
    return 'bg-secondary-container text-on-secondary-fixed border-on-surface shadow-brutal-sm -translate-y-[1px] font-bold';
  }
  return 'bg-primary-container text-on-surface border-on-surface shadow-brutal-sm -translate-y-[1px] font-bold';
}

export function IntensitySlider({ range, onChange }: IntensitySliderProps) {
  const isFullRange = range.min === 1 && range.max === 10;

  const handlePillClick = (lvl: IntensityLevel) => {
    if (range.min === range.max && range.min !== lvl) {
      const nextMin = Math.min(range.min, lvl) as IntensityLevel;
      const nextMax = Math.max(range.max, lvl) as IntensityLevel;
      onChange(nextMin, nextMax);
    } else {
      onChange(lvl, lvl);
    }
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) as IntensityLevel;
    if (val >= 1 && val <= 10) {
      onChange(val, Math.max(val, range.max) as IntensityLevel);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) as IntensityLevel;
    if (val >= 1 && val <= 10) {
      onChange(Math.min(range.min, val) as IntensityLevel, val);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Header Row: Current Range Label + 1-Tap Reset */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="font-display font-bold text-body-md text-on-surface">
          {range.min === range.max
            ? `Intensity Range: Level ${range.min}`
            : `Intensity Range: Level ${range.min} – ${range.max}`}
        </span>

        {!isFullRange && (
          <button
            type="button"
            onClick={() => onChange(1, 10)}
            className="px-2.5 py-1 rounded-full bg-surface-container-high border-2 border-on-surface shadow-brutal-sm font-mono text-[11px] font-bold uppercase text-on-surface brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
          >
            Select All (1–10)
          </button>
        )}
      </div>

      {/* Quick-Range Preset Chips */}
      <div
        role="group"
        aria-label="Intensity range presets"
        className="grid grid-cols-2 sm:grid-cols-4 gap-1.5"
      >
        {PRESETS.map((preset) => {
          const isActive =
            range.min === preset.min && range.max === preset.max;
          return (
            <button
              key={preset.label}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(preset.min, preset.max)}
              className={`px-2.5 py-1.5 rounded-token border-2 font-mono text-xs font-bold tracking-tight transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface ${
                isActive
                  ? 'bg-on-surface text-surface border-on-surface shadow-brutal-sm -translate-y-[1px]'
                  : 'bg-surface-container-low text-on-surface border-on-surface/50 hover:border-on-surface'
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      {/* Interactive 1 to 10 Range Bar */}
      <div
        role="group"
        aria-label="Select intensity range 1 to 10"
        className="grid grid-cols-10 gap-1 sm:gap-1.5"
      >
        {LEVELS.map((lvl) => {
          const inRange = lvl >= range.min && lvl <= range.max;
          return (
            <button
              key={lvl}
              type="button"
              onClick={() => handlePillClick(lvl)}
              aria-label={`Level ${lvl}`}
              aria-pressed={inRange}
              className={`h-9 sm:h-10 rounded-token border-2 font-mono text-xs sm:text-label-counter flex items-center justify-center transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface active:translate-y-0 active:shadow-none ${getRangePillClasses(
                lvl,
                inRange
              )}`}
            >
              {lvl}
            </button>
          );
        })}
      </div>

      {/* Dual Min / Max Range Sliders */}
      <div className="grid grid-cols-2 gap-3 pt-0.5">
        <label className="flex flex-col gap-1">
          <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase text-on-surface-variant">
            <span>Min Level</span>
            <span className="text-on-surface">Lv. {range.min}</span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={range.min}
            onChange={handleMinChange}
            aria-label="Minimum intensity level"
            style={{ accentColor: '#7b9f80' }}
            className="w-full h-2 rounded-full border-2 border-on-surface bg-surface-container-high appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
          />
        </label>

        <label className="flex flex-col gap-1">
          <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase text-on-surface-variant">
            <span>Max Level</span>
            <span className="text-on-surface">Lv. {range.max}</span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={range.max}
            onChange={handleMaxChange}
            aria-label="Maximum intensity level"
            style={{ accentColor: '#e07a5f' }}
            className="w-full h-2 rounded-full border-2 border-on-surface bg-surface-container-high appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
          />
        </label>
      </div>

      {/* Subtle Configuration-Only Tier Legend */}
      <div
        className="flex items-center justify-center gap-2 text-xs font-mono text-on-surface-variant pt-0.5"
        aria-label="Intensity tier guide"
      >
        <span className="inline-flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-full bg-tertiary-fixed border border-on-surface"
            aria-hidden="true"
          />
          1–3 Chill
        </span>
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-full bg-secondary-container border border-on-surface"
            aria-hidden="true"
          />
          4–7 Party
        </span>
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-full bg-primary-container border border-on-surface"
            aria-hidden="true"
          />
          8–10 Bold
        </span>
      </div>
    </div>
  );
}

export default IntensitySlider;
