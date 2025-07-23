'use client'

import type { Category } from '@/types/customer-category'
import Link from 'next/link'

/**
 * Footer link section interface
 */
interface LinkSection {
  title: string
  links: Array<{
    label: string
    href: string
  }>
}

/**
 * Footer Links Section Component Props
 */
interface FooterLinksProps {
  /** Categories to display in footer */
  categories?: Category[]
}

/**
 * Footer Links Section Component
 *
 * Displays organized navigation links in footer.
 * Groups links by category for better user experience.
 *
 * Features:
 * - Categorized navigation links
 * - Responsive grid layout
 * - Hover effects
 * - SEO-friendly structure
 * - Dynamic categories from API
 *
 * @example
 * ```tsx
 * <FooterLinks categories={categories} />
 * ```
 */
export function FooterLinks({ categories = [] }: FooterLinksProps) {
  /**
   * Footer navigation sections configuration
   */
  const linkSections: LinkSection[] = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', href: '/products' },
        { label: 'Categories', href: '/categories' },
        { label: 'Campaigns', href: '/campaigns' },
        { label: 'Search', href: '/search' },
      ],
    },
    {
      title: 'Categories',
      links: categories.length > 0 
        ? categories.slice(0, 5).map(category => ({
            label: category.name,
            href: `/categories/${category._id}`,
          }))
        : [
            { label: 'Electronics', href: '/categories/electronics' },
            { label: 'Fashion', href: '/categories/fashion' },
            { label: 'Home & Garden', href: '/categories/home-garden' },
            { label: 'Sports', href: '/categories/sports' },
            { label: 'Books', href: '/categories/books' },
          ],
    },
    {
      title: 'Account',
      links: [
        { label: 'My Profile', href: '/profile' },
        { label: 'My Orders', href: '/profile/orders' },
        { label: 'My Favorites', href: '/profile/favorites' },
        { label: 'My Addresses', href: '/profile/addresses' },
        { label: 'Account Settings', href: '/profile/settings' },
      ],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {linkSections.map(section => (
        <div key={section.title}>
          <h3 className="font-semibold text-white mb-4">{section.title}</h3>
          <ul className="space-y-2">
            {section.links.map(link => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm block py-1"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
