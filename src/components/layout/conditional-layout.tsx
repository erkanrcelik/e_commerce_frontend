'use client'

import { Suspense } from 'react'

import { Toaster } from '@/components/ui/sonner'
import { useLayout } from '@/hooks/use-layout'

import { Footer } from './footer/footer'
import { Header } from './header/header'

/**
 * Conditional Layout Component
 * 
 * Wraps the application with conditional header and footer based on layout settings.
 * Also includes toast provider.
 * 
 * Features:
 * - Conditional header/footer rendering
 * - Toast notifications
 * - Suspense boundaries
 * 
 * @example
 * ```tsx
 * <ConditionalLayout>
 *   <YourPageContent />
 * </ConditionalLayout>
 * ```
 */
interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const { showHeader, showFooter } = useLayout()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      {showHeader && (
        <Suspense fallback={<div>Loading header...</div>}>
          <Header />
        </Suspense>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </main>

      {/* Footer */}
      {showFooter && (
        <Suspense fallback={<div>Loading footer...</div>}>
          <Footer />
        </Suspense>
      )}

      {/* Toast Provider */}
      <Toaster />
    </div>
  )
} 