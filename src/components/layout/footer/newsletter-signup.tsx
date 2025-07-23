'use client'

import { Mail } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

/**
 * Newsletter Signup Component
 *
 * Provides email subscription form for footer section.
 * Allows users to subscribe to newsletter updates.
 *
 * Features:
 * - Email input validation
 * - Responsive design
 * - Newsletter subscription
 *
 * @example
 * ```tsx
 * <NewsletterSignup />
 * ```
 */
export function NewsletterSignup() {
  /**
   * Handle newsletter subscription
   * @param e - Form submit event
   */
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription logic
  }

  return (
    <div className="max-w-md">
      <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
      <p className="text-gray-300 text-sm mb-4">
        Get the latest updates on new arrivals and exclusive deals.
      </p>
      <form onSubmit={handleSubscribe} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-orange-500"
          required
          aria-label="Email address for newsletter"
        />
        <Button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 px-4"
          aria-label="Subscribe to newsletter"
        >
          <Mail className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
}
