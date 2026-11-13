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
    default:
      "Tagay Ta — Pinoy Barkada Party Deck & Drinking Game (Never Have I Ever & Most Likely To)",
    template: "%s | Tagay Ta",
  },
  description:
    "A Pinoy barkada card game with 600 prompts across 10 levels. Play Never Have I Ever and Most Likely To with friends.",
  applicationName: "Tagay Ta",
  authors: [{ name: "Jed Mamosto", url: "https://jedmamosto.me" }],
  generator: "Next.js",
  keywords: [
    "Tagay Ta",
    "Never Have I Ever",
    "Most Likely To",
    "Pinoy Most Likely To",
    "Barkada pointing game",
    "Inuman voting game",
    "Sino ang pinaka",
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
    title:
      "Tagay Ta — Pinoy Barkada Party Deck & Drinking Game (Never Have I Ever & Most Likely To)",
    description:
      "A Pinoy barkada card game with 600 prompts across 10 levels. Play Never Have I Ever and Most Likely To with friends.",
    url: "https://tagay-ta.vercel.app",
    siteName: "Tagay Ta",
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Tagay Ta — Pinoy Barkada Party Deck & Drinking Game (Never Have I Ever & Most Likely To)",
    description:
      "A Pinoy barkada card game with 600 prompts across 10 levels. Play Never Have I Ever and Most Likely To with friends.",
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
      alternateName:
        "Tagay Ta — Pinoy Barkada Party Deck & Drinking Game (Never Have I Ever & Most Likely To)",
      url: "https://tagay-ta.vercel.app",
      applicationCategory: "GameApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      description:
        "A Pinoy barkada card game with 600 prompts across 10 levels. Play Never Have I Ever and Most Likely To with friends.",
      genre: [
        "Party Game",
        "Drinking Game",
        "Card Game",
        "Social Game",
        "Voting Game",
      ],
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
      name: "How to Play Tagay Ta: Pinoy Barkada Drinking Game (Never Have I Ever & Most Likely To)",
      description:
        "Step-by-step instructions for playing Tagay Ta party games with friends during inuman sessions.",
      step: [
        {
          "@type": "HowToStep",
          name: "Gather the Barkada & Pick Game Mode",
          text: "Sit in a circle. Switch between Never Have I Ever (500 cards) and Most Likely To (100 cards).",
        },
        {
          "@type": "HowToStep",
          name: "Choose Your Intensity Range",
          text: "Calibrate your session from Level 1 (Chill Icebreakers) up to Level 10 (Walwalan & Wild Truths).",
        },
        {
          "@type": "HowToStep",
          name: "Mode A: Never Have I Ever",
          text: "Pass the phone around. Read the card out loud. Drink if guilty. Share the chismis!",
        },
        {
          "@type": "HowToStep",
          name: "Mode B: Most Likely To",
          text: "Read the prompt. Count down 3-2-1 together. Point fingers simultaneously. Most votes drinks, with 10 seconds to defend yourself.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://tagay-ta.vercel.app/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How many players can play Tagay Ta?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Play with 2 to 20 or more people. Pass one phone around. No app installation required.",
          },
        },
        {
          "@type": "Question",
          name: "What game modes are available in Tagay Ta?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can play Never Have I Ever (500 cards) and Most Likely To (100 cards).",
          },
        },
        {
          "@type": "Question",
          name: "How do we play the Most Likely To mode?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Read the card aloud. Count down 3-2-1 together. Point fingers simultaneously. Most votes drinks!",
          },
        },
        {
          "@type": "Question",
          name: "Can we switch modes in the middle of a game?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Tap the mode button in the top navigation bar anytime. It switches decks instantly.",
          },
        },
        {
          "@type": "Question",
          name: "Can we create our own custom cards?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Tap Custom Cards to write your own prompts. Cards save directly in your browser.",
          },
        },
        {
          "@type": "Question",
          name: "Is Tagay Ta free to play?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, 100% free. No paywalls, ads, or sign-ups. All 600 cards are unlocked immediately.",
          },
        },
        {
          "@type": "Question",
          name: "Can we play Tagay Ta online or remotely?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Share your screen on Discord, Zoom, or Google Meet. Friends drink together online.",
          },
        },
        {
          "@type": "Question",
          name: "What happens when all cards are played?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The deck shuffles automatically when finished. You get a fresh card sequence every session.",
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
