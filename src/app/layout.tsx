import type { Metadata, Viewport } from "next";
import {
  Plus_Jakarta_Sans,
  Space_Grotesk,
  Space_Mono,
} from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tagay-ta.vercel.app"),
  title: {
    default: "Tagay Ta — Pinoy Barkada Party Deck & Drinking Game",
    template: "%s | Tagay Ta",
  },
  description:
    "Tagay Ta is the ultimate Pinoy barkada party deck. 500 calibrated Never Have I Ever prompts across 10 intensity levels for epic inuman sessions.",
  applicationName: "Tagay Ta",
  authors: [{ name: "Jed Mamosto", url: "https://jedmamosto.me" }],
  generator: "Next.js",
  keywords: [
    "Tagay Ta",
    "Never Have I Ever",
    "Pinoy Party Game",
    "Inuman Games",
    "Barkada Game",
    "Drinking Game Philippines",
    "Taglish party deck",
    "Pinoy icebreakers",
    "Tabletop card game",
  ],
  creator: "Jed Mamosto",
  publisher: "Tagay Ta",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tagay Ta — Pinoy Barkada Party Deck & Drinking Game",
    description:
      "Tagay Ta is the ultimate Pinoy barkada party deck. 500 calibrated Never Have I Ever prompts across 10 intensity levels for epic inuman sessions.",
    url: "https://tagay-ta.vercel.app",
    siteName: "Tagay Ta",
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tagay Ta — Pinoy Barkada Party Deck & Drinking Game",
    description:
      "Tagay Ta is the ultimate Pinoy barkada party deck. 500 calibrated Never Have I Ever prompts across 10 intensity levels for epic inuman sessions.",
    creator: "@jedmamosto",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fcf9f4",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://tagay-ta.vercel.app/#webapp",
      name: "Tagay Ta",
      alternateName: "Tagay Ta — Pinoy Barkada Party Deck & Drinking Game",
      url: "https://tagay-ta.vercel.app",
      applicationCategory: "GameApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      description:
        "Tagay Ta is the ultimate Pinoy barkada party deck. 500 calibrated Never Have I Ever prompts across 10 intensity levels for epic inuman sessions.",
      genre: ["Party Game", "Drinking Game", "Card Game", "Social Game"],
      inLanguage: ["en", "fil"],
      numberOfPlayers: "2+",
      author: {
        "@type": "Person",
        name: "Jed Mamosto",
        url: "https://jedmamosto.me",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "PHP",
      },
    },
    {
      "@type": "HowTo",
      "@id": "https://tagay-ta.vercel.app/#howto",
      name: "How to Play Tagay Ta: Pinoy Barkada Drinking Game",
      description:
        "Step-by-step instructions for playing Tagay Ta Never Have I Ever card game with friends during inuman sessions.",
      step: [
        {
          "@type": "HowToStep",
          name: "Gather the Barkada & Prepare Drinks",
          text: "Sit in a circle with your group and prepare your drinks of choice—whether beer, mixed drinks with chaser, or non-alcoholic juice.",
        },
        {
          "@type": "HowToStep",
          name: "Choose Your Intensity Range",
          text: "Use the intensity slider to calibrate your session from Level 1 (Chill Icebreakers) up to Level 10 (Walwalan & Deep Confessions).",
        },
        {
          "@type": "HowToStep",
          name: "Pass and Read Aloud",
          text: "Pass the device around. The active player reads the card out loud to the group.",
        },
        {
          "@type": "HowToStep",
          name: "Drink If Guilty & Share the Story",
          text: "Anyone who has done the act takes a drink (tagay). If only one person drinks, they have to share the backstory!",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://tagay-ta.vercel.app/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Tagay Ta?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tagay Ta is a mobile-first Pinoy tabletop party deck and drinking game featuring 500 hand-calibrated Never Have I Ever prompts across 10 intensity levels for Filipino barkadas.",
          },
        },
        {
          "@type": "Question",
          name: "How do the 10 intensity levels work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Levels 1 to 3 are Chill Icebreakers and high school nostalgia. Levels 4 to 7 are Spicy Party prompts and work/college drama. Levels 8 to 10 are Unfiltered Confessions and full walwalan mode.",
          },
        },
        {
          "@type": "Question",
          name: "Can Tagay Ta be played without alcohol?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Tagay Ta is designed as both a drinking game and a tabletop conversation deck. You can play with iced tea, juice, points, or funny dare penalties.",
          },
        },
        {
          "@type": "Question",
          name: "Can I add my own custom questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Tagay Ta includes a Custom Card Forge where you can write custom prompt cards, assign an intensity level and category, and inject them directly into your active game deck.",
          },
        },
        {
          "@type": "Question",
          name: "Is Tagay Ta free to play?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Tagay Ta is 100% free with no paywalls or signups required. All 500 calibrated cards and custom features are immediately accessible in your browser.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${spaceMono.variable}`}
    >
      <body className="min-h-dvh bg-surface bg-dot-grid font-sans text-on-surface antialiased selection:bg-secondary-container selection:text-on-surface">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
