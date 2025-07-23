'use client'

import { Suspense } from 'react'

import { Toaster } from '@/components/ui/sonner'
import { useLayout } from '@/hooks/use-layout'
import type { Category } from '@/types/customer-category'

import { Footer } from './footer/footer'
import { Header } from './header/header'

/**
 * Conditional Layout Component Props
 */
interface ConditionalLayoutProps {
  children: React.ReactNode
  /** Categories to display in footer */
  categories?: Category[]
}

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
 * - Dynamic footer categories
 *
 * @example
 * ```tsx
 * <ConditionalLayout categories={categories}>
 *   <YourPageContent />
 * </ConditionalLayout>
 * ```
 */
export function ConditionalLayout({ children, categories = [] }: ConditionalLayoutProps) {
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
      <div className="flex-1">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </div>

      {/* Footer */}
      {showFooter && (
        <Suspense fallback={<div>Loading footer...</div>}>
          <Footer categories={categories} />
        </Suspense>
      )}

      {/* Toast Provider */}
      <Toaster />
    </div>
  )
}
