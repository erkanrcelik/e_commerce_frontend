'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

import {
  LAYOUT_CONFIGS,
  getLayoutConfigByRoute,
  type LayoutConfig,
} from '@/types/layout'

/**
 * Custom hook for managing layout configuration
 *
 * Automatically determines layout config based on current route,
 * with support for manual overrides.
 *
 * @param overrideConfig - Manual layout configuration to override automatic detection
 * @returns Current layout configuration
 *
 * @example
 * ```tsx
 * // Automatic layout detection
 * const layout = useLayout()
 *
 * // Manual override
 * const layout = useLayout({ showHeader: false })
 * ```
 */
export function useLayout(
  overrideConfig?: Partial<LayoutConfig>
): LayoutConfig {
  const pathname = usePathname()

  const layoutConfig = useMemo(() => {
    // Get automatic config based on route
    const configKey = getLayoutConfigByRoute(pathname)
    const baseConfig = LAYOUT_CONFIGS[configKey]

    // Merge with override config if provided
    return {
      ...baseConfig,
      ...overrideConfig,
    }
  }, [pathname, overrideConfig])

  return layoutConfig
}

/**
 * Hook for checking if current route should show specific layout elements
 *
 * @param overrideConfig - Manual layout configuration
 * @returns Layout visibility flags
 *
 * @example
 * ```tsx
 * const { showHeader, showFooter } = useLayoutVisibility()
 *
 * return (
 *   <>
 *     {showHeader && <Header />}
 *     <main>{children}</main>
 *     {showFooter && <Footer />}
 *   </>
 * )
 * ```
 */
export function useLayoutVisibility(overrideConfig?: Partial<LayoutConfig>) {
  const layout = useLayout(overrideConfig)

  return {
    showHeader: layout.showHeader ?? true,
    showFooter: layout.showFooter ?? true,
    showTopBanner: layout.showTopBanner ?? true,
    showNavigation: layout.showNavigation ?? true,
    fullWidth: layout.fullWidth ?? false,
    mainClassName: layout.mainClassName ?? '',
  }
}

/**
 * Hook for debugging layout configuration
 *
 * @returns Current route and layout info
 */
export function useLayoutDebug() {
  const pathname = usePathname()
  const configKey = getLayoutConfigByRoute(pathname)
  const config = LAYOUT_CONFIGS[configKey]

  return {
    pathname,
    configKey,
    config,
    availableConfigs: Object.keys(LAYOUT_CONFIGS),
  }
}
