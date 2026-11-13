import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tagay Ta — Pinoy Barkada Party Deck & Drinking Game',
    short_name: 'Tagay Ta',
    description:
      'A Pinoy barkada card game with 600 prompts across 10 levels for inuman nights and chill hangouts.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fcf9f4',
    theme_color: '#fcf9f4',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
