import type { Metadata } from 'next'
import '../styles/globals.css'
import ScrollProgress from '@/components/ScrollProgress'

export const metadata: Metadata = {
  title: {
    default: 'WhatsClose - Smart Locker Ecosystem',
    template: '%s | WhatsClose',
  },
  description:
    'Revolutionary smart locker network connecting e-commerce, delivery, and retail. Discover a seamless ecosystem for package delivery, product sampling, and instant access.',
  keywords: [
    'smart lockers',
    'delivery network',
    'e-commerce',
    'package delivery',
    'retail innovation',
    'product sampling',
    'last-mile delivery',
    'locker ecosystem',
    'retail technology',
  ],
  authors: [{ name: 'WhatsClose Team' }],
  creator: 'WhatsClose',
  publisher: 'WhatsClose',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  colorScheme: 'dark',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://whatsclose.com',
    siteName: 'WhatsClose',
    title: 'WhatsClose - Smart Locker Ecosystem',
    description:
      'Revolutionary smart locker network connecting e-commerce, delivery, and retail. Discover a seamless ecosystem for package delivery, product sampling, and instant access.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WhatsClose - Smart Locker Ecosystem',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WhatsClose - Smart Locker Ecosystem',
    description:
      'Revolutionary smart locker network connecting e-commerce, delivery, and retail.',
    images: ['/og-image.jpg'],
    creator: '@whatsclose',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-dark-900 text-white antialiased overflow-x-hidden font-sans">
        {/* Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Main Content */}
        {children}

        {/* Noise texture overlay for visual depth */}
        <div
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </body>
    </html>
  )
}
