'use client'

import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import Link from 'next/link'

/**
 * Social Media Links Component
 * 
 * Displays social media icons with links to company profiles.
 * Provides quick access to social media channels.
 * 
 * Features:
 * - Social media platform links
 * - Hover effects
 * - Accessibility support
 * - Responsive icons
 * 
 * @example
 * ```tsx
 * <SocialLinks />
 * ```
 */
export function SocialLinks() {
  /**
   * Social media platform configuration
   */
  const socialLinks = [
    { 
      icon: Facebook, 
      href: 'https://facebook.com/shophub', 
      label: 'Follow us on Facebook',
      name: 'Facebook'
    },
    { 
      icon: Twitter, 
      href: 'https://twitter.com/shophub', 
      label: 'Follow us on Twitter',
      name: 'Twitter'
    },
    { 
      icon: Instagram, 
      href: 'https://instagram.com/shophub', 
      label: 'Follow us on Instagram',
      name: 'Instagram'
    },
    { 
      icon: Youtube, 
      href: 'https://youtube.com/shophub', 
      label: 'Subscribe to our YouTube channel',
      name: 'YouTube'
    },
  ]

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-400">Follow us:</span>
      {socialLinks.map(({ icon: Icon, href, label, name }) => (
        <Link
          key={name}
          href={href}
          className="text-gray-400 hover:text-orange-400 transition-colors p-1 rounded-md hover:bg-gray-800"
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon className="w-5 h-5" />
        </Link>
      ))}
    </div>
  )
} 