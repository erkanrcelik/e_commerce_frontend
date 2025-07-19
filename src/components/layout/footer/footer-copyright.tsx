'use client'

import Link from 'next/link'
import React from 'react'

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

  /**
   * Legal and policy links
   */
  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Refund Policy', href: '/refunds' },
  ]

  return (
    <div className="border-t border-gray-700">
      <div className="container mx-auto px-4 py-6">
        {/* Copyright and Legal Links */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-3">
            © {currentYear} playableFactory. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            {legalLinks.map((link, index) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-400 hover:text-purple-400 text-xs transition-colors"
                >
                  {link.label}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="text-gray-500 text-xs">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
          
          {/* Additional Legal Text */}
          <p className="text-xs text-gray-500">
            playableFactory is a registered trademark. All product names, logos, and brands are property of their respective owners.
          </p>
        </div>
      </div>
    </div>
  )
} 