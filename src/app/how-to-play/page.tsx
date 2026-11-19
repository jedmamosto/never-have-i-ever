import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BeerIcon,
  ChevronDownIcon,
  ChillLeafIcon,
  ExternalLinkIcon,
  PartyGlassIcon,
  SpicyFlameIcon,
} from '@/components/card/Icons';
import { Droplets, Hand, Scale, Target, Users, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Play, Rules & FAQs',
  description:
    'Learn how to play Tagay Ta Never Have I Ever and Most Likely To. Explore all 10 intensity levels, Pinoy inuman house rules, and FAQs.',
  alternates: {
    canonical: '/how-to-play',
  },
};

const guideJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HowTo',
      '@id': 'https://tagay-ta.vercel.app/how-to-play#howto',
      name: 'How to Play Tagay Ta: Pinoy Barkada Drinking Game (Never Have I Ever & Most Likely To)',
      description:
        'Step-by-step instructions for playing Tagay Ta party games with friends during inuman sessions.',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Gather the Barkada & Pick Game Mode',
          text: 'Sit in a circle. Switch between Never Have I Ever (500 cards) and Most Likely To (100 cards).',
        },
        {
          '@type': 'HowToStep',
          name: 'Choose Your Intensity Range',
          text: 'Calibrate your session from Level 1 (Chill Icebreakers) up to Level 10 (Walwalan & Wild Truths).',
        },
        {
          '@type': 'HowToStep',
          name: 'Mode A: Never Have I Ever',
          text: 'Pass the phone around. Read the card out loud. Drink if guilty. Share the chismis!',
        },
        {
          '@type': 'HowToStep',
          name: 'Mode B: Most Likely To',
          text: 'Read the prompt. Count down 3-2-1 together. Point fingers simultaneously. Most votes drinks, with 10 seconds to defend yourself.',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://tagay-ta.vercel.app/how-to-play#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How many players can play Tagay Ta?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Play with 2 to 20 or more people. Pass one phone around. No app installation required.',
          },
        },
        {
          '@type': 'Question',
          name: 'What game modes are available in Tagay Ta?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can play Never Have I Ever (500 cards) and Most Likely To (100 cards).',
          },
        },
        {
          '@type': 'Question',
          name: 'How do we play the Most Likely To mode?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Read the card aloud. Count down 3-2-1 together. Point fingers simultaneously. Most votes drinks!',
          },
        },
        {
          '@type': 'Question',
          name: 'Can we switch modes in the middle of a game?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Tap the mode button in the top navigation bar anytime. It switches decks instantly.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can we create our own custom cards?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Tap Custom Cards to write your own prompts. Cards save directly in your browser.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Tagay Ta free to play?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, 100% free. No paywalls, ads, or sign-ups. All 600 cards are unlocked immediately.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can we play Tagay Ta online or remotely?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Share your screen on Discord, Zoom, or Google Meet. Friends drink together online.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens when all cards are played?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The deck shuffles automatically when finished. You get a fresh card sequence every session.',
          },
        },
      ],
    },
  ],
};

export default function HowToPlayPage() {
  return (
    <div id="top" className="min-h-dvh flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd) }}
      />

      {/* Top Navigation Bar */}
      <header className="border-b-[2.5px] border-on-surface bg-surface/95 backdrop-blur-md px-2.5 sm:px-6 h-14 flex items-center justify-between gap-2 shrink-0 sticky top-0 z-20">
        <div className="flex items-center gap-2 min-w-0">
          <Link
            href="/"
            className="font-display font-black text-sm sm:text-base md:text-lg tracking-[-0.03em] uppercase text-on-surface whitespace-nowrap hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface rounded-token px-1 py-1"
          >
            TAGAY TA
          </Link>
          <span className="text-on-surface-variant/40 font-mono text-xs hidden sm:inline">
            •
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-surface-container border border-on-surface font-mono text-[10px] sm:text-label-code uppercase font-bold text-on-surface whitespace-nowrap">
            Game Guide
          </span>
        </div>

        <Link
          href="/?play=1"
          className="brutal-interactive bg-secondary-container hover:bg-secondary-fixed text-on-surface border-[2px] border-on-surface shadow-brutal-sm rounded-full px-3 py-1.5 min-h-[44px] sm:min-h-[36px] font-mono text-[11px] sm:text-label-code uppercase font-bold inline-flex items-center gap-1.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
        >
          <span>Play Now</span>
          <ArrowRightIcon className="w-3.5 h-3.5 shrink-0" />
        </Link>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-6 py-5 sm:py-8 flex flex-col gap-6 text-on-surface">
        {/* Guide Hero & Jump Links */}
        <section
          aria-label="Guide Overview"
          className="bg-surface-container-lowest border-[3px] border-on-surface rounded-card shadow-brutal-card p-4 sm:p-6 space-y-4"
        >
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-[32px] font-mono text-xs font-bold text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface rounded-token"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5 shrink-0" />
              <span>Back to Game Lobby</span>
            </Link>
            <h1 className="font-display font-bold text-headline-md sm:text-display-sm tracking-[-0.02em] text-on-surface leading-tight mt-1">
              How to Play Tagay Ta: Rules, Levels &amp; FAQs
            </h1>
            <p className="font-sans text-sm sm:text-body-md text-on-surface-variant leading-relaxed mt-1.5">
              Everything your barkada needs for Never Have I Ever and Most Likely To.
            </p>
          </div>

          <nav
            aria-label="Game Guide Jump Links"
            className="flex flex-wrap items-center gap-1.5 font-mono text-xs pt-2 border-t border-on-surface/15"
          >
            <a
              href="#about"
              className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[32px] px-2.5 py-1 text-on-surface-variant hover:text-primary underline-offset-4 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
            >
              About
            </a>
            <span className="text-on-surface-variant/40">•</span>
            <a
              href="#how-to-play"
              className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[32px] px-2.5 py-1 text-on-surface-variant hover:text-primary underline-offset-4 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
            >
              How to Play
            </a>
            <span className="text-on-surface-variant/40">•</span>
            <a
              href="#intensity-levels"
              className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[32px] px-2.5 py-1 text-on-surface-variant hover:text-primary underline-offset-4 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
            >
              10 Levels
            </a>
            <span className="text-on-surface-variant/40">•</span>
            <a
              href="#inuman-rules"
              className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[32px] px-2.5 py-1 text-on-surface-variant hover:text-primary underline-offset-4 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
            >
              Rules
            </a>
            <span className="text-on-surface-variant/40">•</span>
            <a
              href="#faq"
              className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[32px] px-2.5 py-1 text-on-surface-variant hover:text-primary underline-offset-4 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
            >
              FAQs
            </a>
          </nav>
        </section>

        {/* Section 1: About Tagay Ta */}
        <article
          id="about"
          aria-labelledby="about-heading"
          className="bg-surface-container-lowest border-[2.5px] border-on-surface rounded-card shadow-brutal p-4 sm:p-6 space-y-3"
        >
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-secondary-container border border-on-surface text-on-surface">
              <BeerIcon className="w-4 h-4 shrink-0" />
            </span>
            <h2
              id="about-heading"
              className="font-display font-bold text-title sm:text-headline-md tracking-[-0.02em]"
            >
              What is Tagay Ta?
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
            <strong>Tagay Ta</strong> means &quot;let&apos;s drink!&quot; in Visayan. It is built for real barkada inuman nights.
          </p>
          <p className="font-sans text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
            We packed two party games inside. Play <strong>Never Have I Ever</strong> (500 cards) and <strong>Most Likely To</strong> (100 cards). That gives your table 600 prompts total.
          </p>
          <p className="font-sans text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
            Expect campus bloopers, ambag drama, workplace tea, and 2 AM dating truths.
          </p>
          <p className="font-sans text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
            No app download needed. Grab your pulutan, open your browser, and pass the phone around.
          </p>
        </article>

        {/* Section 2: How to Play */}
        <article
          id="how-to-play"
          aria-labelledby="how-to-play-heading"
          className="bg-surface-container-lowest border-[2.5px] border-on-surface rounded-card shadow-brutal p-4 sm:p-6 space-y-5"
        >
          <div>
            <h2
              id="how-to-play-heading"
              className="font-display font-bold text-title sm:text-headline-md tracking-[-0.02em]"
            >
              How to Play Tagay Ta
            </h2>
            <p className="font-sans text-sm sm:text-body-md text-on-surface-variant leading-relaxed mt-1">
              Tagay Ta has two Pinoy party games. Pick a mode and gather your circle:
            </p>
          </div>

          {/* Mode A: Never Have I Ever */}
          <div className="space-y-3 pt-1 border-t border-on-surface/10">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-secondary-container border border-on-surface font-mono text-[11px] font-bold text-on-surface uppercase">
                Mode 1
              </span>
              <h3 className="font-display font-bold text-sm sm:text-base text-on-surface">
                Never Have I Ever (500 Cards)
              </h3>
            </div>
            <ol className="space-y-2.5 font-sans text-sm sm:text-body-md text-on-surface-variant">
              <li className="flex items-start gap-2.5 p-3 rounded-control bg-surface border border-on-surface/20">
                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-secondary-container border border-on-surface text-on-surface shrink-0">
                  01
                </span>
                <div>
                  <strong className="text-on-surface block mb-0.5">Circle Up &amp; Pour:</strong>
                  Sit in a circle. Grab cold beer, mixed drinks, juice, or iced water.
                </div>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-control bg-surface border border-on-surface/20">
                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-secondary-container border border-on-surface text-on-surface shrink-0">
                  02
                </span>
                <div>
                  <strong className="text-on-surface block mb-0.5">Pass &amp; Read Aloud:</strong>
                  Read the card on screen out loud. Pass the phone to your right.
                </div>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-control bg-surface border border-on-surface/20">
                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-secondary-container border border-on-surface text-on-surface shrink-0">
                  03
                </span>
                <div>
                  <strong className="text-on-surface block mb-0.5">Drink If Guilty:</strong>
                  Take a drink if you did the prompt.
                </div>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-control bg-surface border border-on-surface/20">
                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-secondary-container border border-on-surface text-on-surface shrink-0">
                  04
                </span>
                <div>
                  <strong className="text-on-surface block mb-0.5">Spill the Backstory:</strong>
                  If only one person drinks, they must tell the whole story!
                </div>
              </li>
            </ol>
          </div>

          {/* Mode B: Most Likely To */}
          <div className="space-y-3 pt-3 border-t border-on-surface/10">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed border border-on-surface font-mono text-[11px] font-bold text-on-surface uppercase">
                Mode 2
              </span>
              <h3 className="font-display font-bold text-sm sm:text-base text-on-surface">
                Most Likely To (100 Cards)
              </h3>
            </div>
            <ol className="space-y-2.5 font-sans text-sm sm:text-body-md text-on-surface-variant">
              <li className="flex items-start gap-2.5 p-3 rounded-control bg-surface border border-on-surface/20">
                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-tertiary-fixed border border-on-surface text-on-surface shrink-0">
                  01
                </span>
                <div>
                  <strong className="text-on-surface block mb-0.5">Read Prompt:</strong>
                  Read the Most Likely To prompt loudly to everyone.
                </div>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-control bg-surface border border-on-surface/20">
                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-tertiary-fixed border border-on-surface text-on-surface shrink-0">
                  02
                </span>
                <div>
                  <strong className="text-on-surface block mb-0.5">3-2-1 Table Countdown:</strong>
                  Count down three, two, one together out loud.
                </div>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-control bg-surface border border-on-surface/20">
                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-tertiary-fixed border border-on-surface text-on-surface shrink-0">
                  03
                </span>
                <div>
                  <strong className="text-on-surface block mb-0.5">Point Together:</strong>
                  On three, point directly at whoever fits the card best.
                </div>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-control bg-surface border border-on-surface/20">
                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-tertiary-fixed border border-on-surface text-on-surface shrink-0">
                  04
                </span>
                <div>
                  <strong className="text-on-surface block mb-0.5">Highest Votes Drinks:</strong>
                  Whoever receives the most fingers pointing at them takes a tagay.
                </div>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-control bg-surface border border-on-surface/20">
                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-tertiary-fixed border border-on-surface text-on-surface shrink-0">
                  05
                </span>
                <div>
                  <strong className="text-on-surface block mb-0.5">10-Second Right of Defense:</strong>
                  The accused has 10 seconds to defend their innocence!
                </div>
              </li>
            </ol>
          </div>
        </article>

        {/* Section 3: 10 Intensity Levels */}
        <article
          id="intensity-levels"
          aria-labelledby="levels-heading"
          className="bg-surface-container-lowest border-[2.5px] border-on-surface rounded-card shadow-brutal p-4 sm:p-6 space-y-4"
        >
          <h2
            id="levels-heading"
            className="font-display font-bold text-title sm:text-headline-md tracking-[-0.02em]"
          >
            10 Intensity Levels for Any Crowd
          </h2>
          <p className="font-sans text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
            Not every inuman has the same energy. Both game decks scale across 10 intensity levels:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 sm:p-4 rounded-control bg-surface border border-on-surface space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-tertiary font-mono text-xs font-bold uppercase">
                  <ChillLeafIcon className="w-4 h-4 shrink-0" />
                  <span>Levels 1–3: Chill</span>
                </div>
                <strong className="text-xs font-display font-bold text-on-surface block">
                  Icebreakers &amp; School Days
                </strong>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Light campus stories and commute fails. Safe for family or coworkers.
                </p>
                <div className="p-2 rounded-token bg-surface-container-low border border-on-surface/20 font-mono text-[11px] text-on-surface-variant italic">
                  &ldquo;Nakatulog sa jeep at lumagpas ng babaan.&rdquo;
                </div>
              </div>
              <Link
                href="/?min=1&max=3&play=1"
                className="w-full py-2 px-3 rounded-control bg-tertiary-fixed hover:bg-tertiary-fixed-dim text-on-tertiary-fixed border border-on-surface font-mono text-xs font-bold inline-flex items-center justify-center gap-1 brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface min-h-[44px]"
              >
                <span>Play Chill (1–3)</span>
                <ArrowRightIcon className="w-3.5 h-3.5 shrink-0" />
              </Link>
            </div>

            <div className="p-3.5 sm:p-4 rounded-control bg-surface border border-on-surface space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-primary font-mono text-xs font-bold uppercase">
                  <PartyGlassIcon className="w-4 h-4 shrink-0" />
                  <span>Levels 4–7: Party</span>
                </div>
                <strong className="text-xs font-display font-bold text-on-surface block">
                  Office Tea &amp; Situationships
                </strong>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Office tea, secret crushes, and old inuman stories for close barkadas.
                </p>
                <div className="p-2 rounded-token bg-surface-container-low border border-on-surface/20 font-mono text-[11px] text-on-surface-variant italic">
                  &ldquo;Nag-mute sa meeting para uminom o kumain.&rdquo;
                </div>
              </div>
              <Link
                href="/?min=4&max=7&play=1"
                className="w-full py-2 px-3 rounded-control bg-secondary-container hover:bg-secondary-fixed text-on-secondary-fixed border border-on-surface font-mono text-xs font-bold inline-flex items-center justify-center gap-1 brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface min-h-[44px]"
              >
                <span>Play Party (4–7)</span>
                <ArrowRightIcon className="w-3.5 h-3.5 shrink-0" />
              </Link>
            </div>

            <div className="p-3.5 sm:p-4 rounded-control bg-surface border border-on-surface space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-secondary font-mono text-xs font-bold uppercase">
                  <SpicyFlameIcon className="w-4 h-4 shrink-0" />
                  <span>Levels 8–10: Spicy</span>
                </div>
                <strong className="text-xs font-display font-bold text-on-surface block">
                  Walwal &amp; Wild Truths
                </strong>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Late-night party stories, exes, and bold confessions. Best played with trusted friends.
                </p>
                <div className="p-2 rounded-token bg-surface-container-low border border-on-surface/20 font-mono text-[11px] text-on-surface-variant italic">
                  &ldquo;Nag-drunk dial ng ex nang hatinggabi.&rdquo;
                </div>
              </div>
              <Link
                href="/?min=8&max=10&play=1"
                className="w-full py-2 px-3 rounded-control bg-primary-container hover:bg-primary-fixed text-on-surface border border-on-surface font-mono text-xs font-bold inline-flex items-center justify-center gap-1 brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface min-h-[44px]"
              >
                <span>Play Spicy (8–10)</span>
                <ArrowRightIcon className="w-3.5 h-3.5 shrink-0" />
              </Link>
            </div>
          </div>
        </article>

        {/* Section 4: Inuman House Rules */}
        <article
          id="inuman-rules"
          aria-labelledby="rules-heading"
          className="bg-surface-container-lowest border-[2.5px] border-on-surface rounded-card shadow-brutal p-4 sm:p-6 space-y-3"
        >
          <h2
            id="rules-heading"
            className="font-display font-bold text-title sm:text-headline-md tracking-[-0.02em]"
          >
            Pinoy Inuman House Rules
          </h2>
          <p className="font-sans text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
            Make your inuman louder with these classic table rules:
          </p>
          <ul className="space-y-2.5 font-sans text-sm sm:text-body-md text-on-surface-variant">
            <li className="flex items-start gap-2">
              <BeerIcon className="w-4 h-4 text-primary shrink-0 mt-1" />
              <div>
                <strong className="text-on-surface">The Solo Drinker Tax (NHIE):</strong> Only one person drank? They must spill the backstory to the table.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <PartyGlassIcon className="w-4 h-4 text-primary shrink-0 mt-1" />
              <div>
                <strong className="text-on-surface">The Dry Question Penalty:</strong> Nobody drank or voted? The reader takes a penalty sip.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <PartyGlassIcon className="w-4 h-4 text-primary shrink-0 mt-1" />
              <div>
                <strong className="text-on-surface">The Duel Clink (MLT):</strong> Tied vote count? Both players clink glasses and take a tagay together.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Target className="w-4 h-4 text-primary shrink-0 mt-1" aria-hidden="true" />
              <div>
                <strong className="text-on-surface">The Firing Squad (MLT):</strong> Unanimous 100% vote? That player must take a double shot!
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Scale className="w-4 h-4 text-primary shrink-0 mt-1" aria-hidden="true" />
              <div>
                <strong className="text-on-surface">The 10-Second Right of Defense (MLT):</strong> Accused players get 10 seconds to plead innocence. Convince the table to transfer the tagay!
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Hand className="w-4 h-4 text-primary shrink-0 mt-1" aria-hidden="true" />
              <div>
                <strong className="text-on-surface">The 10-Finger Rule (No Booze):</strong> Playing sober? Put up 10 fingers. Drop one finger per guilty card. Last standing wins.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Droplets className="w-4 h-4 text-primary shrink-0 mt-1" aria-hidden="true" />
              <div>
                <strong className="text-on-surface">Drink Responsibly:</strong> Pace your drinks. Eat your pulutan, drink plenty of water, and never drink and drive.
              </div>
            </li>
          </ul>
        </article>

        {/* Section 5: Frequently Asked Questions (FAQ) */}
        <article
          id="faq"
          aria-labelledby="faq-heading"
          className="bg-surface-container-lowest border-[2.5px] border-on-surface rounded-card shadow-brutal p-4 sm:p-6 space-y-4"
        >
          <h2
            id="faq-heading"
            className="font-display font-bold text-title sm:text-headline-md tracking-[-0.02em]"
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            <details
              name="faq"
              className="group border border-on-surface/20 rounded-control bg-surface overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-colors"
            >
              <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none min-h-[44px] p-3.5 hover:bg-surface-container/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-inset transition-colors">
                <span>How many players can play Tagay Ta?</span>
                <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-3.5 pb-3.5 pt-0">
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                  Play with 2 to 20 or more people. Pass one phone around. No app installation required.
                </p>
              </div>
            </details>

            <details
              name="faq"
              className="group border border-on-surface/20 rounded-control bg-surface overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-colors"
            >
              <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none min-h-[44px] p-3.5 hover:bg-surface-container/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-inset transition-colors">
                <span>What game modes are available in Tagay Ta?</span>
                <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-3.5 pb-3.5 pt-0">
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                  Play Never Have I Ever (500 cards) and Most Likely To (100 cards). That is 600 calibrated prompts total.
                </p>
              </div>
            </details>

            <details
              name="faq"
              className="group border border-on-surface/20 rounded-control bg-surface overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-colors"
            >
              <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none min-h-[44px] p-3.5 hover:bg-surface-container/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-inset transition-colors">
                <span>How do we play the Most Likely To mode?</span>
                <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-3.5 pb-3.5 pt-0">
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                  Read the prompt aloud. Count down 3-2-1 together. Point fingers simultaneously. The person with the most votes drinks!
                </p>
              </div>
            </details>

            <details
              name="faq"
              className="group border border-on-surface/20 rounded-control bg-surface overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-colors"
            >
              <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none min-h-[44px] p-3.5 hover:bg-surface-container/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-inset transition-colors">
                <span>Can we switch modes in the middle of a game?</span>
                <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-3.5 pb-3.5 pt-0">
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                  Yes. Tap the mode button in the top navigation bar anytime. It switches decks instantly.
                </p>
              </div>
            </details>

            <details
              name="faq"
              className="group border border-on-surface/20 rounded-control bg-surface overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-colors"
            >
              <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none min-h-[44px] p-3.5 hover:bg-surface-container/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-inset transition-colors">
                <span>Can we create our own custom cards?</span>
                <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-3.5 pb-3.5 pt-0">
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                  Yes! Tap &quot;Custom Cards&quot; to write your own prompts. Cards save directly in your browser.
                </p>
              </div>
            </details>

            <details
              name="faq"
              className="group border border-on-surface/20 rounded-control bg-surface overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-colors"
            >
              <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none min-h-[44px] p-3.5 hover:bg-surface-container/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-inset transition-colors">
                <span>Is Tagay Ta free to play?</span>
                <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-3.5 pb-3.5 pt-0">
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                  Yes, 100% free. No paywalls, ads, or sign-ups. All 600 cards are unlocked immediately.
                </p>
              </div>
            </details>

            <details
              name="faq"
              className="group border border-on-surface/20 rounded-control bg-surface overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-colors"
            >
              <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none min-h-[44px] p-3.5 hover:bg-surface-container/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-inset transition-colors">
                <span>Can we play Tagay Ta online or remotely?</span>
                <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-3.5 pb-3.5 pt-0">
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                  Yes! Share your screen on Discord, Zoom, or Google Meet. Friends drink together online.
                </p>
              </div>
            </details>

            <details
              name="faq"
              className="group border border-on-surface/20 rounded-control bg-surface overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-colors"
            >
              <summary className="flex items-center justify-between font-display font-bold text-xs sm:text-sm text-on-surface cursor-pointer select-none min-h-[44px] p-3.5 hover:bg-surface-container/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface focus-visible:ring-inset transition-colors">
                <span>What happens when all cards are played?</span>
                <ChevronDownIcon className="w-4 h-4 text-on-surface shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-3.5 pb-3.5 pt-0">
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-on-surface/10 pt-2.5">
                  The deck shuffles automatically when finished. You get a fresh card sequence every session.
                </p>
              </div>
            </details>
          </div>
        </article>

        {/* Final Conversion CTA Stack */}
        <section
          aria-label="Start Game Final Call"
          className="bg-surface-container-lowest border-[2.5px] border-on-surface rounded-card shadow-brutal p-4 sm:p-6 text-center space-y-3.5"
        >
          <div className="space-y-1">
            <h2 className="font-display font-bold text-title sm:text-headline-md tracking-tight text-on-surface">
              Ready to start the tagay?
            </h2>
            <p className="font-sans text-xs sm:text-sm text-on-surface-variant">
              One phone, two decks, and 600 Pinoy prompts.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap font-mono text-[11px] text-on-surface-variant font-medium">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container border border-on-surface/30">
              <Zap className="w-3 h-3 text-on-surface shrink-0" aria-hidden="true" />
              <span>Instant Play</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container border border-on-surface/30">
              <BeerIcon className="w-3 h-3 text-on-surface shrink-0" />
              <span>100% Free</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container border border-on-surface/30">
              <Users className="w-3 h-3 text-on-surface shrink-0" aria-hidden="true" />
              <span>2–20+ Players</span>
            </span>
          </div>

          <Link
            href="/?play=1"
            className="w-full py-3.5 px-5 min-h-[52px] rounded-control bg-secondary-container hover:bg-secondary-fixed border-[2.5px] border-on-surface shadow-brutal font-display font-bold text-title text-on-surface inline-flex items-center justify-center gap-2 brutal-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
          >
            <span>Deal My First Card</span>
            <ArrowRightIcon className="w-5 h-5 shrink-0" />
          </Link>

          <div>
            <a
              href="#top"
              className="inline-flex items-center justify-center min-h-[44px] gap-1 font-mono text-xs font-bold text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface rounded-token px-2 py-1"
            >
              <span>↑ Back to Top</span>
            </a>
          </div>
        </section>
      </main>

      {/* Footer Navigation & Credits */}
      <footer className="w-full max-w-4xl mx-auto px-3 sm:px-6 text-center pt-6 pb-4 mt-2 space-y-2 border-t border-on-surface/10">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-xs text-on-surface-variant">
          <Link
            href="/"
            className="inline-flex items-center justify-center min-h-[44px] hover:text-primary transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface rounded-token px-2 py-1 font-bold text-on-surface"
          >
            Play Tagay Ta
          </Link>
          <span className="hidden sm:inline">•</span>
          <a
            href="https://jedmamosto.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[44px] gap-1 hover:text-primary transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface rounded-token px-2 py-1"
          >
            <span>Built by Jed Mamosto</span>
            <ExternalLinkIcon className="w-3.5 h-3.5 shrink-0" />
          </a>
          <span className="hidden sm:inline">•</span>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[44px] hover:text-primary transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface rounded-token px-2 py-1"
          >
            Sitemap
          </a>
        </div>
        <p className="font-mono text-[11px] text-on-surface-variant/60">
          Tagay Ta © {new Date().getFullYear()} · Pinoy Barkada Party Deck
        </p>
      </footer>
    </div>
  );
}
