'use client'

import { CreditCard, Shield, Star, Truck } from 'lucide-react'
import React from 'react'

/**
 * Trust indicator interface
 */
interface TrustIndicator {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

/**
 * Trust Indicators Component
 *
 * Displays company trust and security features in footer.
 * Builds customer confidence with key service highlights.
 *
 * Features:
 * - Security and trust badges
 * - Service highlights
 * - Responsive grid layout
 * - Icon-based visual indicators
 *
 * @example
 * ```tsx
 * <TrustIndicators />
 * ```
 */
export function TrustIndicators() {
  /**
   * Trust and service indicators configuration
   */
  const indicators: TrustIndicator[] = [
    {
      icon: Shield,
      title: 'Secure Shopping',
      description: '256-bit SSL encryption',
    },
    {
      icon: Truck,
      title: 'Fast Shipping',
      description: 'Free shipping over $50',
    },
    {
      icon: CreditCard,
      title: 'Secure Payment',
      description: 'Multiple payment options',
    },
    {
      icon: Star,
      title: 'Top Rated',
      description: '4.8/5 customer rating',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {indicators.map(({ icon: Icon, title, description }) => (
        <div key={title} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <div className="font-medium text-white text-sm">{title}</div>
            <div className="text-gray-400 text-xs">{description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
