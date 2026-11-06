"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import {
  CheckIcon,
  CloseIcon,
  FlameIcon,
} from "@/components/card/Icons";

export interface ModeTeaserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVoteHype?: () => void;
}

const STORAGE_KEY = "tagay_ta_voted_most_likely_to";

export function ModeTeaserModal({
  isOpen,
  onClose,
  onVoteHype,
}: ModeTeaserModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const voteButtonRef = useRef<HTMLButtonElement>(null);

  const [hasVoted, setHasVoted] = useState(false);
  const [voteCountBonus, setVoteCountBonus] = useState(0);

  // Initialize vote status from localStorage on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "true") {
          setHasVoted(true);
        }
      } catch {
        // LocalStorage access may fail in strict private browsing
      }
    }
  }, [isOpen]);

  // Escape key listener
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

  // Focus management
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        voteButtonRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleVote = useCallback(() => {
    if (hasVoted) return;

    setHasVoted(true);
    setVoteCountBonus(1);

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // Ignore localStorage error
      }
    }

    try {
      track("mode_hype_vote", {
        mode: "most_likely_to",
      });
    } catch (err) {
      console.warn("Analytics tracking unavailable:", err);
    }

    onVoteHype?.();
  }, [hasVoted, onVoteHype]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-on-surface/60 backdrop-blur-xs overflow-y-auto"
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
        className="w-full max-w-lg my-auto flex flex-col bg-surface rounded-card border-[3px] border-on-surface shadow-brutal-card overflow-hidden"
      >
        {/* Modal Header */}
        <header className="flex items-center justify-between gap-3 px-5 py-4 bg-surface-container-low border-b-[2.5px] border-on-surface shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-token bg-primary-container border-2 border-on-surface flex items-center justify-center text-on-surface shrink-0">
              <FlameIcon className="w-4 h-4 text-on-surface" />
            </span>
            <div>
              <span className="font-mono text-label-code uppercase text-on-surface-variant block tracking-wider">
                EXPANSION PACK // IN THE LAB
              </span>
              <h2
                id={titleId}
                className="font-display font-bold text-headline-sm text-on-surface tracking-[-0.02em]"
              >
                Most Likely To... 🎯
              </h2>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close teaser modal"
            className="w-9 h-9 rounded-control bg-surface-container-lowest border-[2.5px] border-on-surface shadow-brutal-sm flex items-center justify-center text-on-surface brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface shrink-0"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </header>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 max-h-[calc(90vh-80px)]">
          {/* Subtitle / Intro */}
          <div className="space-y-1">
            <p
              id={descriptionId}
              className="font-sans text-body-md text-on-surface font-medium"
            >
              The ultimate callout game for Filipino barkadas is currently in
              development.
            </p>
            <p className="font-sans text-body-sm text-on-surface-variant">
              No holding back — point fingers at the count of three. The person
              with the most votes takes the shot!
            </p>
          </div>

          {/* Sample Interactive Card Preview */}
          <div className="rounded-card border-[2.5px] border-on-surface bg-surface-container-lowest p-4 sm:p-5 shadow-brutal-sm space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-primary-container border-2 border-on-surface font-mono text-label-code uppercase text-on-surface font-bold">
                PREVIEW DECK
              </span>
              <span className="font-mono text-xs text-on-surface-variant font-bold">
                TAGAY TA // M-01
              </span>
            </div>

            <div className="py-2">
              <span className="font-mono text-xs uppercase tracking-wider text-on-surface-variant block mb-1">
                MOST LIKELY TO...
              </span>
              <p className="font-display font-bold text-title sm:text-headline-sm text-on-surface leading-snug">
                &ldquo;Mag-text sa ex pagkatapos ng tatlong tagay habang sinasabing
                &apos;friendly catch-up lang naman&apos;?&rdquo;
              </p>
            </div>

            {/* Mechanics Pill Steps */}
            <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-on-surface/15 text-center font-mono text-[11px]">
              <div className="p-1.5 bg-surface-container-low rounded-token border border-on-surface/40">
                <span className="block font-bold text-on-surface">1. Read</span>
                <span className="text-on-surface-variant">Basahin aloud</span>
              </div>
              <div className="p-1.5 bg-secondary-fixed/50 rounded-token border border-on-surface/40">
                <span className="block font-bold text-on-surface">2. Point</span>
                <span className="text-on-surface-variant">Sabay turo!</span>
              </div>
              <div className="p-1.5 bg-primary-fixed/50 rounded-token border border-on-surface/40">
                <span className="block font-bold text-on-surface">3. Tagay</span>
                <span className="text-on-surface-variant">Inom ang turo!</span>
              </div>
            </div>
          </div>

          {/* Hype Vote Action Section */}
          <div className="rounded-control border-2 border-on-surface bg-surface-container-low p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <FlameIcon className="w-4 h-4 text-primary" />
                <span className="font-display font-bold text-body-md text-on-surface">
                  {hasVoted ? "Hype Registered!" : "Want this mode next?"}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest border border-on-surface font-mono text-xs font-bold text-on-surface">
                {247 + voteCountBonus} VOTES
              </span>
            </div>

            {hasVoted ? (
              <div
                role="status"
                aria-live="polite"
                className="p-3 bg-tertiary-fixed/60 border-2 border-on-surface rounded-token space-y-1"
              >
                <div className="flex items-center gap-1.5 text-on-tertiary-fixed font-bold font-sans text-body-sm">
                  <CheckIcon className="w-4 h-4 shrink-0" />
                  <span>Salamat sa Hype Vote mo!</span>
                </div>
                <p className="font-sans text-xs text-on-tertiary-fixed">
                  Demand noted! We are actively balancing the 100-card Filipino
                  barkada edition. Abangan sa susunod na update!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="font-sans text-xs text-on-surface-variant">
                  Click below to vote. High-demand features jump to the top of
                  our development roadmap.
                </p>
                <button
                  ref={voteButtonRef}
                  type="button"
                  onClick={handleVote}
                  className="w-full py-3 px-4 rounded-control bg-primary-container text-on-surface border-[2.5px] border-on-surface font-display font-bold text-title flex items-center justify-center gap-2 brutal-interactive shadow-brutal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
                >
                  <FlameIcon className="w-5 h-5 shrink-0" />
                  <span>Vote to Hype &quot;Most Likely To&quot; 🔥</span>
                </button>
              </div>
            )}
          </div>

          {/* Dismiss Action */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-control bg-surface-container-lowest text-on-surface border-2 border-on-surface font-mono text-label-code uppercase tracking-wider brutal-interactive shadow-brutal-sm flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
          >
            Bumalik sa Never Have I Ever
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModeTeaserModal;
