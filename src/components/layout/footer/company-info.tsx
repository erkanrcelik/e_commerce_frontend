'use client'

import Link from 'next/link'

import { SocialLinks } from './social-links'

/**
 * Company Info Component
 * 
 * Displays company branding, description and social links in footer.
 * Provides brand identity and company overview for customers.
 * 
 * Features:
 * - Company logo and branding
 * - Business description
 * - Social media integration
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
      <p className="text-gray-300 text-sm mb-6 leading-relaxed">
        Your trusted partner for premium digital experiences. We create innovative 
        and engaging solutions with exceptional quality and cutting-edge technology.
      </p>

      {/* Social Media Links */}
      <SocialLinks />

      {/* Company Values */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <h5 className="text-white font-medium mb-1">Founded</h5>
            <p className="text-gray-400">2020</p>
          </div>
          <div>
            <h5 className="text-white font-medium mb-1">Customers</h5>
            <p className="text-gray-400">50,000+</p>
          </div>
          <div>
            <h5 className="text-white font-medium mb-1">Products</h5>
            <p className="text-gray-400">10,000+</p>
          </div>
          <div>
            <h5 className="text-white font-medium mb-1">Countries</h5>
            <p className="text-gray-400">25+</p>
          </div>
        </div>
      </div>
    </div>
  )
} 