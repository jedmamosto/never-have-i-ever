"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import {
  BeerIcon,
  CheckIcon,
  CloseIcon,
  CopyIcon,
  ExternalLinkIcon,
} from "@/components/card/Icons";

export interface GCashModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GCASH_NUMBER = "09695737221";
const ACCOUNT_NAME = "J** MA****W M. (Jed M.)";
const USER_ID = "•••••••••0TLI6K";
const MASKED_PHONE = "0969 573 ••••";

export function GCashModal({ isOpen, onClose }: GCashModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);

  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset copied state on open
  useEffect(() => {
    if (isOpen) {
      setCopied(false);
      setImageError(false);
      // Auto-focus copy button for quick interaction
      const timer = setTimeout(() => {
        copyButtonRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  // Escape key handler
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

  const handleCopy = useCallback(async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(GCASH_NUMBER);
      } else {
        // Fallback for non-secure contexts
        const textarea = document.createElement("textarea");
        textarea.value = GCASH_NUMBER;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy GCash number:", err);
    }
  }, []);

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
        className="w-full max-w-md my-auto flex flex-col bg-surface rounded-card border-[3px] border-on-surface shadow-brutal-card overflow-hidden"
      >
        {/* Modal Header */}
        <header className="flex items-center justify-between gap-3 px-5 py-4 bg-surface-container-low border-b-[2.5px] border-on-surface shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-token bg-secondary-container border-2 border-on-surface flex items-center justify-center text-on-surface shrink-0">
              <BeerIcon className="w-4 h-4" />
            </span>
            <div>
              <span className="font-mono text-label-code uppercase text-on-surface-variant block tracking-wider">
                LIBRENG TAGAY // GCASH TIP
              </span>
              <h2
                id={titleId}
                className="font-display font-bold text-headline-sm text-on-surface tracking-[-0.02em]"
              >
                Libreng Tagay
              </h2>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close GCash modal"
            className="w-9 h-9 rounded-control bg-surface-container-lowest border-[2.5px] border-on-surface shadow-brutal-sm flex items-center justify-center text-on-surface brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface shrink-0"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </header>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[calc(90vh-80px)]">
          {/* Tagline / Subtitle */}
          <p
            id={descriptionId}
            className="font-sans text-body-sm text-on-surface-variant"
          >
            Nag-enjoy ba ang inuman o hangout niyo? Support the project with a
            cold drink or pulutan fund para tuloy-tuloy ang libreng laro!
          </p>

          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center p-3 bg-surface-container-lowest rounded-control border-[2.5px] border-on-surface shadow-brutal-sm">
            <div className="relative w-56 h-72 sm:w-60 sm:h-76 flex items-center justify-center overflow-hidden rounded-token bg-white">
              {/* Loading State Skeleton */}
              {!imageLoaded && !imageError && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface-container-low animate-pulse"
                >
                  <BeerIcon className="w-8 h-8 text-on-surface-variant/40 animate-bounce" />
                  <span className="font-mono text-xs text-on-surface-variant">
                    Loading GCash QR...
                  </span>
                </div>
              )}

              {/* Error State Fallback */}
              {imageError ? (
                <div className="p-4 text-center space-y-2">
                  <span className="font-mono text-xs font-bold text-error uppercase block">
                    QR Preview Unavailable
                  </span>
                  <p className="font-sans text-xs text-on-surface-variant">
                    Scan isn&apos;t loading right now, but you can copy the
                    mobile number directly below!
                  </p>
                </div>
              ) : (
                <Image
                  src="/gcash-qr.jpg"
                  alt="GCash QR Code for Jed Mamosto"
                  width={240}
                  height={304}
                  priority
                  className={`w-full h-full object-contain transition-opacity duration-200 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <span className="font-mono text-[11px] text-on-surface-variant mt-2 font-bold uppercase tracking-wider">
              Scan via GCash App
            </span>
          </div>

          {/* Account Details Card */}
          <div className="rounded-control border-2 border-on-surface bg-surface-container-low p-3.5 space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between gap-2 border-b border-on-surface/10 pb-1.5">
              <span className="text-on-surface-variant font-bold">NAME:</span>
              <span className="text-on-surface font-bold text-right">
                {ACCOUNT_NAME}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 border-b border-on-surface/10 pb-1.5">
              <span className="text-on-surface-variant font-bold">USER ID:</span>
              <span className="text-on-surface font-semibold tracking-wider">
                {USER_ID}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-on-surface-variant font-bold">
                MOBILE NO:
              </span>
              <span className="text-on-surface font-semibold">
                {MASKED_PHONE}
              </span>
            </div>
          </div>

          {/* 1-Tap Copy Button */}
          <button
            ref={copyButtonRef}
            type="button"
            onClick={handleCopy}
            aria-live="polite"
            className={`w-full py-3.5 px-4 rounded-control border-[2.5px] border-on-surface font-display font-bold text-title flex items-center justify-center gap-2 brutal-interactive shadow-brutal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface transition-colors ${
              copied
                ? "bg-tertiary-fixed text-on-tertiary-fixed"
                : "bg-secondary-container text-on-surface hover:bg-secondary-fixed"
            }`}
          >
            {copied ? (
              <>
                <CheckIcon className="w-5 h-5 shrink-0" />
                <span>Copied! 09695737221</span>
              </>
            ) : (
              <>
                <CopyIcon className="w-5 h-5 shrink-0" />
                <span>Copy 09695737221</span>
              </>
            )}
          </button>

          {/* Lowkey Portfolio Credit Footer */}
          <footer className="pt-2 text-center">
            <a
              href="https://jedmamosto.me"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface rounded-token px-1"
            >
              <span className="inline-flex items-center gap-1">
                Crafted with <BeerIcon className="w-3.5 h-3.5 text-primary shrink-0" /> by Jed Mamosto
              </span>
              <span className="text-primary font-bold">• jedmamosto.me</span>
              <ExternalLinkIcon className="w-3.5 h-3.5 shrink-0" />
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default GCashModal;
