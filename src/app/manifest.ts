import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Amprator Shipping',
    short_name: 'Amprator',
    description:
      'Amprator Shipping management dashboard for tracking, invoicing, and delivery operations.',
    start_url: '/dashboard',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#191C1F',
    theme_color: '#DAA520',
    categories: ['business', 'logistics', 'productivity'],
    icons: [
      {
        src: '/icon',
        sizes: 'any',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon',
        sizes: 'any',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
