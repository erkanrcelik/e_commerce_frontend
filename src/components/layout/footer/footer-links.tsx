'use client'

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
 * 
 * @example
 * ```tsx
 * <FooterLinks />
 * ```
 */
export function FooterLinks() {
  /**
   * Footer navigation sections configuration
   */
  const linkSections: LinkSection[] = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', href: '/products' },
        { label: 'New Arrivals', href: '/products/new' },
        { label: 'Best Sellers', href: '/products/best-sellers' },
        { label: 'Sale Items', href: '/products/sale' },
        { label: 'Gift Cards', href: '/gift-cards' },
      ]
    },
    {
      title: 'Customer Care',
      links: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Shipping Info', href: '/shipping' },
        { label: 'Returns', href: '/returns' },
        { label: 'Size Guide', href: '/size-guide' },
      ]
    },
    {
      title: 'Account',
      links: [
        { label: 'My Account', href: '/profile' },
        { label: 'Order History', href: '/orders' },
        { label: 'Wishlist', href: '/wishlist' },
        { label: 'Track Order', href: '/track' },
        { label: 'Address Book', href: '/addresses' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
        { label: 'Sustainability', href: '/sustainability' },
        { label: 'Investors', href: '/investors' },
      ]
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {linkSections.map((section) => (
        <div key={section.title}>
          <h3 className="font-semibold text-white mb-4">{section.title}</h3>
          <ul className="space-y-2">
            {section.links.map((link) => (
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