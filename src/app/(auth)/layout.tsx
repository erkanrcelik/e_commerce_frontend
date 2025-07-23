import React from 'react'

/**
 * Props for the AuthLayout component
 */
interface AuthLayoutProps {
  children: React.ReactNode
}

/**
 * Authentication layout component
 * Provides consistent layout and styling for all auth pages
 * E-commerce focused design with shopping benefits
 * This layout is applied to all routes under the (auth) route group
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="w-full max-w-6xl">{children}</div>
    </div>
  )
}

/**
 * Layout metadata
 */
export const metadata = {
  title: {
    template: '%s | playableFactory',
    default: 'Authentication | playableFactory',
  },
  description: 'Secure authentication for your playableFactory shopping account.',
}
