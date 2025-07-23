import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ConditionalLayout } from '@/components/layout/conditional-layout'
import { NProgressProvider } from '@/components/providers/nprogress-provider'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/providers/auth-provider'
import { ReduxProvider } from '@/providers/redux-provider'
import { CustomerHomepageService } from '@/services/customer-homepage.service'
import type { Category } from '@/types/customer-category'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'playableFactory - Digital Experiences',
  description:
    'Create innovative and engaging digital solutions with exceptional quality and cutting-edge technology.',
  keywords: [
    'digital experiences',
    'innovative solutions',
    'technology',
    'premium digital',
    'playable',
  ],
  authors: [{ name: 'playableFactory Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'playableFactory - Digital Experiences',
    description:
      'Create innovative and engaging digital solutions with exceptional quality and cutting-edge technology.',
    type: 'website',
    siteName: 'playableFactory',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'playableFactory - Digital Experiences',
    description:
      'Create innovative and engaging digital solutions with exceptional quality and cutting-edge technology.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
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
 * - Authentication provider
 * - Toast notifications
 * - Progress bar for page transitions
 * - Conditional header/footer rendering
 * - SEO metadata
 * - Dark mode support
 * - Server-side category fetching
 *
 * @param children - Page components to render
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch categories for footer
  let categories: Category[] = []
  
  try {
    const homepageData = await CustomerHomepageService.getCategories({ limit: 12 })
    categories = homepageData?.items || []
  } catch (error) {
    console.error('Failed to fetch categories for footer:', error)
    // Fallback to empty array
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>
          <AuthProvider>
            <NProgressProvider>
              <ConditionalLayout categories={categories}>{children}</ConditionalLayout>
              <Toaster />
            </NProgressProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
