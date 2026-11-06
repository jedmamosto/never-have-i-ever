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
    "The ultimate Pinoy barkada party deck. 500 calibrated Never Have I Ever prompts across 10 intensity levels for inuman sessions, chill hangouts, and late-night confessions.",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tagay Ta — Pinoy Barkada Party Deck & Drinking Game",
    description:
      "The ultimate Pinoy barkada party deck. 500 calibrated Never Have I Ever prompts across 10 intensity levels for inuman sessions and chill hangouts.",
    url: "https://tagay-ta.vercel.app",
    siteName: "Tagay Ta",
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tagay Ta — Pinoy Barkada Party Deck & Drinking Game",
    description:
      "The ultimate Pinoy barkada party deck. 500 calibrated Never Have I Ever prompts across 10 intensity levels for inuman sessions.",
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
      "name": "Tagay Ta",
      "alternateName": "Tagay Ta — Pinoy Barkada Party Deck",
      "url": "https://tagay-ta.vercel.app",
      "applicationCategory": "GameApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "description":
        "The ultimate Pinoy barkada party deck. 500 calibrated Never Have I Ever prompts across 10 intensity levels for inuman sessions, chill hangouts, and late-night confessions.",
      "genre": ["Party Game", "Drinking Game", "Card Game", "Social Game"],
      "inLanguage": ["en", "fil"],
      "author": {
        "@type": "Person",
        "name": "Jed Mamosto",
        "url": "https://jedmamosto.me",
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "PHP",
      },
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
