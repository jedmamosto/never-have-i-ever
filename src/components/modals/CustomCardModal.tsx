"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import type { IntensityLevel, QuestionCard } from "@/types/game";

export interface CustomCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultIntensity: IntensityLevel;
  customCards: QuestionCard[];
  onAddCard: (input: {
    text: string;
    level: IntensityLevel;
    category: string;
  }) => void;
  onDeleteCard: (id: string) => void;
  onSelectCard?: (card: QuestionCard) => void;
}

const LEVELS: IntensityLevel[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const MAX_CHARS = 160;

function stripNeverHaveIEverPrefix(raw: string): string {
  return raw.replace(/^\s*never\s+have\s+i\s+ever[\s,.:;-]*/i, "");
}

function getTierDescription(level: IntensityLevel): {
  name: string;
  pillClasses: string;
} {
  if (level <= 3) {
    return {
      name: "1–3 Chill",
      pillClasses: "bg-tertiary-fixed text-on-tertiary-fixed",
    };
  }
  if (level <= 7) {
    return {
      name: "4–7 Party",
      pillClasses: "bg-secondary-container text-on-secondary-fixed",
    };
  }
  return {
    name: "8–10 Bold",
    pillClasses: "bg-primary-container text-on-surface",
  };
}

function getLevelButtonClasses(
  level: IntensityLevel,
  isSelected: boolean
): string {
  if (level <= 3) {
    return isSelected
      ? "bg-tertiary-fixed text-on-tertiary-fixed border-on-surface shadow-brutal-sm -translate-y-[1px] font-bold"
      : "bg-tertiary-fixed/35 text-on-tertiary-fixed hover:bg-tertiary-fixed/70 border-on-surface/50";
  }
  if (level <= 7) {
    return isSelected
      ? "bg-secondary-container text-on-secondary-fixed border-on-surface shadow-brutal-sm -translate-y-[1px] font-bold"
      : "bg-secondary-fixed/45 text-on-secondary-fixed hover:bg-secondary-container/75 border-on-surface/50";
  }
  return isSelected
    ? "bg-primary-container text-on-surface border-on-surface shadow-brutal-sm -translate-y-[1px] font-bold"
    : "bg-primary-fixed/50 text-on-primary-fixed hover:bg-primary-container/70 border-on-surface/50";
}

export function CustomCardModal({
  isOpen,
  onClose,
  defaultIntensity,
  customCards,
  onAddCard,
  onDeleteCard,
  onSelectCard,
}: CustomCardModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [promptText, setPromptText] = useState("");
  const [selectedLevel, setSelectedLevel] =
    useState<IntensityLevel>(defaultIntensity);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Sync default intensity when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedLevel(defaultIntensity);
      setValidationError(null);
    }
  }, [isOpen, defaultIntensity]);

  // Escape key dismissal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const rawValue = e.target.value;
    const stripped = stripNeverHaveIEverPrefix(rawValue).slice(0, MAX_CHARS);
    setPromptText(stripped);
    if (validationError && stripped.trim().length > 0) {
      setValidationError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = stripNeverHaveIEverPrefix(promptText).trim();
    if (!cleaned) {
      setValidationError("Enter a confession prompt before injecting.");
      textareaRef.current?.focus();
      return;
    }

    onAddCard({
      text: cleaned,
      level: selectedLevel,
      category: "CUSTOM",
    });
    setPromptText("");
    setValidationError(null);
  };

  const currentTierInfo = getTierDescription(selectedLevel);
  const remainingChars = MAX_CHARS - promptText.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-on-surface/60 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="w-full max-w-2xl max-h-[90vh] flex flex-col bg-surface rounded-card border-[3px] border-on-surface shadow-brutal-card overflow-hidden"
      >
        {/* Modal Header */}
        <header className="flex items-center justify-between gap-3 px-5 py-4 bg-surface-container-low border-b-[2.5px] border-on-surface">
          <div>
            <span className="font-mono text-label-code uppercase text-on-surface-variant block">
              CUSTOM DECK FORGE // LOCAL STORAGE
            </span>
            <h2
              id={titleId}
              className="font-display text-headline-sm text-on-surface tracking-[-0.02em]"
            >
              Custom Confession Cards
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close custom cards modal"
            className="w-9 h-9 rounded-control bg-surface-container-lowest border-[2.5px] border-on-surface shadow-brutal-sm flex items-center justify-center text-on-surface brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </header>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Create Custom Prompt Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <label
                  htmlFor="custom-prompt-textarea"
                  className="font-display font-bold text-body-md text-on-surface"
                >
                  Write Your Prompt
                </label>
                <span
                  id={descriptionId}
                  className="font-mono text-xs text-on-surface-variant"
                >
                  &ldquo;Never have I ever&rdquo; is added automatically
                </span>
              </div>

              <div className="relative">
                <textarea
                  ref={textareaRef}
                  id="custom-prompt-textarea"
                  rows={3}
                  maxLength={MAX_CHARS}
                  value={promptText}
                  onChange={handleTextChange}
                  placeholder="Booked a one-way flight on a dare..."
                  aria-invalid={Boolean(validationError)}
                  className="w-full rounded-control border-[2.5px] border-on-surface bg-surface-container-lowest p-3.5 font-sans text-body-md text-on-surface placeholder:text-on-surface/50 focus:outline-none focus:shadow-brutal transition-shadow resize-none"
                />
                <div className="flex items-center justify-between mt-1">
                  {validationError ? (
                    <p
                      role="alert"
                      className="font-sans text-body-sm text-error font-semibold"
                    >
                      {validationError}
                    </p>
                  ) : (
                    <span className="font-mono text-xs text-on-surface-variant">
                      Preview: Never have I ever{" "}
                      {promptText.trim() ? promptText.trim() : "..."}
                    </span>
                  )}
                  <span
                    aria-live="polite"
                    className={`font-mono text-xs font-bold shrink-0 ml-2 ${
                      remainingChars <= 20
                        ? "text-primary"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {promptText.length}/{MAX_CHARS}
                  </span>
                </div>
              </div>
            </div>

            {/* 1-10 Intensity Level Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-display font-bold text-body-sm text-on-surface">
                  Intensity Level (1–10)
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full border-2 border-on-surface font-mono text-label-code uppercase ${currentTierInfo.pillClasses}`}
                >
                  Lv. {selectedLevel} • {currentTierInfo.name}
                </span>
              </div>

              <div
                role="group"
                aria-label="Select custom card intensity level 1 to 10"
                className="grid grid-cols-10 gap-1.5"
              >
                {LEVELS.map((lvl) => {
                  const isSelected = selectedLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelectedLevel(lvl)}
                      aria-label={`Set card intensity to level ${lvl}`}
                      aria-pressed={isSelected}
                      className={`h-9 rounded-token border-2 font-mono text-label-counter flex items-center justify-center transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface ${getLevelButtonClasses(
                        lvl,
                        isSelected
                      )}`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-5 rounded-control bg-primary-container border-[2.5px] border-on-surface shadow-brutal font-display font-bold text-title text-on-surface flex items-center justify-center gap-2 brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
            >
              <svg
                className="w-5 h-5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
              <span>Inject Into Deck</span>
            </button>
          </form>

          {/* Saved Custom Cards List */}
          <div className="pt-4 border-t-2 border-on-surface/15 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-title text-on-surface">
                Saved Custom Cards
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high border-2 border-on-surface font-mono text-label-code text-on-surface">
                {customCards.length} SAVED
              </span>
            </div>

            {customCards.length === 0 ? (
              <div className="rounded-control border-2 border-dashed border-on-surface/35 bg-surface-container-low p-6 text-center space-y-1">
                <p className="font-display font-bold text-body-md text-on-surface">
                  No custom cards in your deck yet
                </p>
                <p className="font-sans text-body-sm text-on-surface-variant">
                  Write an inside joke or confession above to mix it into the
                  live deck.
                </p>
              </div>
            ) : (
              <ul
                aria-label="Saved custom cards"
                className="space-y-2.5 max-h-64 overflow-y-auto pr-1"
              >
                {customCards.map((card) => {
                  const tierInfo = getTierDescription(card.level);
                  return (
                    <li
                      key={card.id}
                      className="rounded-control border-2 border-on-surface bg-surface-container-lowest p-3 shadow-brutal-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded-full border border-on-surface font-mono text-[11px] font-bold uppercase ${tierInfo.pillClasses}`}
                          >
                            Lv. {card.level}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-surface-container-high border border-on-surface/40 font-mono text-[11px] font-bold uppercase text-on-surface-variant">
                            {card.category}
                          </span>
                        </div>
                        <p className="font-sans text-body-sm text-on-surface break-words">
                          <span className="font-semibold text-on-surface-variant">
                            Never have I ever{" "}
                          </span>
                          {card.text}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        {onSelectCard && (
                          <button
                            type="button"
                            onClick={() => {
                              onSelectCard(card);
                              onClose();
                            }}
                            aria-label={`Play custom card: Never have I ever ${card.text}`}
                            className="px-2.5 py-1.5 rounded-token bg-secondary-container border-2 border-on-surface shadow-brutal-sm font-display font-bold text-xs text-on-surface brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
                          >
                            Play Card
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onDeleteCard(card.id)}
                          aria-label={`Delete custom card: Never have I ever ${card.text}`}
                          className="px-2.5 py-1.5 rounded-token bg-error-container border-2 border-on-surface shadow-brutal-sm font-display font-bold text-xs text-on-error-container brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface inline-flex items-center gap-1"
                        >
                          <svg
                            className="w-3.5 h-3.5 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M3 6h18" />
                            <path d="M8 6V4h8v2" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                          </svg>
                          <span>Delete</span>
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomCardModal;
