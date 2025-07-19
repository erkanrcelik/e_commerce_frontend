'use client'

import React from 'react'

import { FloatingBackToTop } from '@/components/custom/floating-back-to-top'
import { useLayoutVisibility } from '@/hooks/use-layout'
import type { LayoutConfig } from '@/types/layout'

import { Footer } from './footer/footer'
import { Header } from './header/header'

/**
 * Conditional Layout Props
 */
interface ConditionalLayoutProps {
  /** Child components to render */
  children: React.ReactNode
  /** Override layout configuration */
  layoutOverride?: Partial<LayoutConfig>
}

/**
 * Conditional Layout Component
 * 
 * Wraps the application content with conditional header and footer rendering
 * based on current route and manual overrides.
 * 
 * Features:
 * - Automatic layout detection based on route
 * - Manual layout override support
 * - Responsive design
 * - Proper semantic HTML structure
 * - Floating back to top button
 * 
 * @example
 * ```tsx
 * // Automatic layout (based on route)
 * <ConditionalLayout>
 *   <PageContent />
 * </ConditionalLayout>
 * 
 * // Manual override
 * <ConditionalLayout layoutOverride={{ showHeader: false }}>
 *   <AuthPage />
 * </ConditionalLayout>
 * ```
 */
export function ConditionalLayout({ 
  children, 
  layoutOverride 
}: ConditionalLayoutProps) {
  const {
    showHeader,
    showFooter,
    mainClassName,
    fullWidth
  } = useLayoutVisibility(layoutOverride)

  return (  
      <div className="min-h-screen flex flex-col">
        {/* Conditional Header */}
        {showHeader && <Header />}

        {/* Main Content Area */}
        <main 
          className={`
            flex-1 
            ${fullWidth ? 'w-full' : 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'} 
            ${mainClassName || ''}
          `}
        >
          {children}
        </main>

        {/* Conditional Footer */}
        {showFooter && <Footer />}

        {/* Floating Back to Top Button */}
        <FloatingBackToTop />
      </div>
  )
}

/**
 * Auth Layout Wrapper
 * 
 * Pre-configured layout for authentication pages.
 * Automatically hides header/footer and centers content.
 * 
 * @example
 * ```tsx
 * <AuthLayout>
 *   <LoginForm />
 * </AuthLayout>
 * ```
 */
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConditionalLayout 
      layoutOverride={{
        showHeader: false,
        showFooter: false,
        fullWidth: true,
        mainClassName: 'min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800'
      }}
    >
      {children}
    </ConditionalLayout>
  )
}

/**
 * Minimal Layout Wrapper
 * 
 * Pre-configured layout for checkout/payment pages.
 * Shows header but hides footer and navigation.
 * 
 * @example
 * ```tsx
 * <MinimalLayout>
 *   <CheckoutPage />
 * </MinimalLayout>
 * ```
 */
export function MinimalLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConditionalLayout 
      layoutOverride={{
        showHeader: true,
        showFooter: false,
        showTopBanner: false,
        showNavigation: false,
        mainClassName: 'min-h-screen bg-gray-50 dark:bg-gray-900'
      }}
    >
      {children}
    </ConditionalLayout>
  )
}

/**
 * Admin Layout Wrapper
 * 
 * Pre-configured layout for admin/dashboard pages.
 * Hides all public navigation elements.
 * 
 * @example
 * ```tsx
 * <AdminLayout>
 *   <DashboardPage />
 * </AdminLayout>
 * ```
 */
export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConditionalLayout 
      layoutOverride={{
        showHeader: false,
        showFooter: false,
        fullWidth: true,
        mainClassName: 'min-h-screen bg-gray-100 dark:bg-gray-900'
      }}
    >
      {children}
    </ConditionalLayout>
  )
} 