'use client'

import type { Category } from '@/types/customer-category'

// Import footer sub-components
import { CompanyInfo } from './company-info'
import { FooterCopyright } from './footer-copyright'
import { FooterLinks } from './footer-links'
import { NewsletterSignup } from './newsletter-signup'

/**
 * Footer props interface
 */
interface FooterProps {
  /** Categories to display in footer */
  categories?: Category[]
}

/**
 * Main Footer Component
 *
 * Complete footer section with essential sub-components organized.
 * Provides essential site information and navigation.
 *
 * Features:
 * - Company information and branding
 * - Organized navigation links
 * - Newsletter subscription
 * - Copyright and legal information
 * - Responsive design
 * - Dark theme optimized
 *
 * Structure:
 * 1. Main footer content (2-column layout)
 *    - Company info and newsletter
 *    - Footer navigation links
 * 2. Copyright and legal section
 *
 * @example
 * ```tsx
 * <Footer categories={categories} />
 * ```
 */
export function Footer({ categories = [] }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Company Information & Newsletter */}
          <div className="lg:col-span-4 space-y-8">
            <CompanyInfo />
            <NewsletterSignup />
          </div>

          {/* Footer Navigation Links */}
          <div className="lg:col-span-8">
            <FooterLinks categories={categories} />
          </div>
        </div>
      </div>

      {/* Copyright and Legal Section */}
      <FooterCopyright />
    </footer>
  )
}
