'use client'


/**
 * Footer Copyright Component
 *
 * Displays copyright information and legal links.
 * Contains important legal information.
 *
 * Features:
 * - Copyright notice
 * - Legal policy links
 * - Responsive layout
 *
 * @example
 * ```tsx
 * <FooterCopyright />
 * ```
 */
export function FooterCopyright() {
  /**
   * Current year for copyright
   */
  const currentYear = new Date().getFullYear()

  return (
    <div className="border-t border-gray-700">
      <div className="container mx-auto px-4 py-6">
        {/* Copyright and Legal Links */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-3">
            © {currentYear} playableFactory. All rights reserved.
          </p>

          {/* Additional Legal Text */}
          <p className="text-xs text-gray-500">
            playableFactory is a registered trademark. All product names, logos,
            and brands are property of their respective owners.
          </p>
        </div>
      </div>
    </div>
  )
}
