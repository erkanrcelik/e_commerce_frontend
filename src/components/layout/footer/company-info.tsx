'use client'

import Link from 'next/link'

/**
 * Company Info Component
 *
 * Displays company branding and description in footer.
 * Provides brand identity and company overview for customers.
 *
 * Features:
 * - Company logo and branding
 * - Business description
 * - Brand consistency
 *
 * @example
 * ```tsx
 * <CompanyInfo />
 * ```
 */
export function CompanyInfo() {
  return (
    <div className="mb-6">
      {/* Company Logo */}
      <Link href="/" className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">P</span>
        </div>
        <span className="text-xl font-bold text-white">playableFactory</span>
      </Link>

      {/* Company Description */}
      <p className="text-gray-300 text-sm leading-relaxed">
        Your trusted partner for premium digital experiences. We create
        innovative and engaging solutions with exceptional quality and
        cutting-edge technology.
      </p>
    </div>
  )
}
