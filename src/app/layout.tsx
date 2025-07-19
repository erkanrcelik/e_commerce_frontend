import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ConditionalLayout } from '@/components/layout/conditional-layout'
import { Toaster } from '@/components/ui/sonner'
import { ReduxProvider } from '@/providers/redux-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'playableFactory - Digital Experiences',
  description: 'Create innovative and engaging digital solutions with exceptional quality and cutting-edge technology.',
  keywords: ['digital experiences', 'innovative solutions', 'technology', 'premium digital', 'playable'],
  authors: [{ name: 'playableFactory Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'playableFactory - Digital Experiences',
    description: 'Create innovative and engaging digital solutions with exceptional quality and cutting-edge technology.',
    type: 'website',
    siteName: 'playableFactory',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'playableFactory - Digital Experiences',
    description: 'Create innovative and engaging digital solutions with exceptional quality and cutting-edge technology.',
  },
}

/**
 * Root Layout Component
 * 
 * The main layout wrapper for the entire application.
 * Provides global providers, styling, and conditional layout rendering.
 * 
 * Features:
 * - Global font configuration
 * - Redux state management
 * - Toast notifications
 * - Conditional header/footer rendering
 * - SEO metadata
 * - Dark mode support
 * 
 * @param children - Page components to render
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>
          <ConditionalLayout>
            {children}
          <Toaster /> 
          </ConditionalLayout>
        </ReduxProvider>
      </body>
    </html>
  )
}
