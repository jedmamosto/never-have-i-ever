import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tagay Ta — Pinoy Barkada Party Deck & Drinking Game',
    short_name: 'Tagay Ta',
    description:
      'The ultimate Pinoy barkada party deck. 500 calibrated Never Have I Ever prompts across 10 intensity levels for inuman sessions and chill hangouts.',
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
