'use client'

import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

/**
 * Contact information interface
 */
interface ContactItem {
  icon: React.ComponentType<{ className?: string }>
  content: string | React.ReactNode
  href?: string
  label: string
}

/**
 * Contact Info Component
 *
 * Displays company contact information in footer.
 * Provides customers with multiple ways to reach support.
 *
 * Features:
 * - Phone number with click-to-call
 * - Email with mailto link
 * - Physical address
 * - Accessible contact options
 *
 * @example
 * ```tsx
 * <ContactInfo />
 * ```
 */
export function ContactInfo() {
  /**
   * Contact information configuration
   */
  const contactItems: ContactItem[] = [
    {
      icon: Phone,
      content: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      label: 'Call us',
    },
    {
      icon: Mail,
      content: 'support@shophub.com',
      href: 'mailto:support@shophub.com',
      label: 'Email us',
    },
    {
      icon: MapPin,
      content: (
        <span>
          123 Commerce Street
          <br />
          New York, NY 10001
          <br />
          United States
        </span>
      ),
      label: 'Visit us',
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>

      <div className="space-y-3 text-sm">
        {contactItems.map(({ icon: Icon, content, href, label }) => (
          <div key={label} className="flex items-start gap-3 text-gray-300">
            <Icon className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
            {href ? (
              <a
                href={href}
                className="hover:text-orange-400 transition-colors"
                aria-label={label}
              >
                {content}
              </a>
            ) : (
              <span>{content}</span>
            )}
          </div>
        ))}
      </div>

      {/* Business Hours */}
      <div className="pt-4 border-t border-gray-700">
        <h4 className="text-sm font-semibold text-white mb-2">
          Business Hours
        </h4>
        <div className="text-xs text-gray-400 space-y-1">
          <div>Monday - Friday: 9:00 AM - 8:00 PM</div>
          <div>Saturday: 10:00 AM - 6:00 PM</div>
          <div>Sunday: 12:00 PM - 5:00 PM</div>
        </div>
      </div>
    </div>
  )
}
