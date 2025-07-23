/**
 * Layout Configuration Types
 * Controls which layout elements are shown on different pages
 */

/**
 * Layout visibility configuration
 */
export interface LayoutConfig {
  /** Whether to show the header */
  showHeader?: boolean
  /** Whether to show the footer */
  showFooter?: boolean
  /** Whether to show the top banner in header */
  showTopBanner?: boolean
  /** Whether to show the navigation bar */
  showNavigation?: boolean
  /** Custom class name for the main content */
  mainClassName?: string
  /** Whether the page uses full width layout */
  fullWidth?: boolean
}

/**
 * Page props with layout configuration
 */
export interface PageProps {
  /** Layout configuration for the page */
  layout?: LayoutConfig
  /** Page-specific props */
  [key: string]: unknown
}

/**
 * Default layout configurations for different page types
 */
export const LAYOUT_CONFIGS = {
  /** Default layout for most pages */
  DEFAULT: {
    showHeader: true,
    showFooter: true,
    showTopBanner: true,
    showNavigation: true,
    fullWidth: false,
  } as LayoutConfig,

  /** Layout for authentication pages (login, register, forgot password) */
  AUTH: {
    showHeader: false,
    showFooter: false,
    showTopBanner: false,
    showNavigation: false,
    fullWidth: true,
    mainClassName:
      'min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800',
  } as LayoutConfig,

  /** Layout for minimal pages (checkout, payment) */
  MINIMAL: {
    showHeader: true,
    showFooter: false,
    showTopBanner: false,
    showNavigation: false,
    fullWidth: false,
    mainClassName: 'min-h-screen bg-gray-50 dark:bg-gray-900',
  } as LayoutConfig,

  /** Layout for cart and checkout pages */
  CART: {
    showHeader: true,
    showFooter: false,
    showTopBanner: false,
    showNavigation: false,
    fullWidth: false,
    mainClassName: 'min-h-screen bg-gray-50 dark:bg-gray-900',
  } as LayoutConfig,

  /** Layout for admin/dashboard pages */
  ADMIN: {
    showHeader: false,
    showFooter: false,
    showTopBanner: false,
    showNavigation: false,
    fullWidth: true,
  } as LayoutConfig,
} as const

/**
 * Route patterns that should use specific layouts
 */
export const ROUTE_LAYOUT_MAP: Record<string, keyof typeof LAYOUT_CONFIGS> = {
  '/login': 'AUTH',
  '/register': 'AUTH',
  '/forgot-password': 'AUTH',
  '/reset-password': 'AUTH',
  '/verify-email': 'AUTH',
  '/cart': 'CART',
  '/checkout': 'MINIMAL',
  '/payment': 'MINIMAL',
  '/admin': 'ADMIN',
  '/dashboard': 'ADMIN',
}

/**
 * Check if a route should use a specific layout
 * @param pathname - Current route pathname
 * @returns Layout config key or 'DEFAULT'
 */
export function getLayoutConfigByRoute(
  pathname: string
): keyof typeof LAYOUT_CONFIGS {
  // Check exact matches first
  if (pathname in ROUTE_LAYOUT_MAP) {
    return ROUTE_LAYOUT_MAP[pathname]
  }

  // Check pattern matches
  for (const [pattern, config] of Object.entries(ROUTE_LAYOUT_MAP)) {
    if (pathname.startsWith(pattern)) {
      return config
    }
  }

  return 'DEFAULT'
}
