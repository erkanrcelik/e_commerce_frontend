import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utils'

/**
 * Props for the AuthLayout component
 */
interface AuthLayoutProps {
  /** Title of the authentication form */
  title: string
  /** Subtitle or description text */
  subtitle: string
  /** Main form content */
  children: React.ReactNode
  /** Footer content with links */
  footerContent?: React.ReactNode
  /** Error message to display */
  error?: string | null
  /** Success message to display */
  success?: string | null
  /** Additional CSS classes */
  className?: string
}

/**
 * Reusable authentication layout component
 * Provides consistent styling and structure for auth pages
 * E-commerce focused design with product showcase
 */
export function AuthLayout({
  title,
  subtitle,
  children,
  footerContent,
  error,
  success,
  className,
  ...props
}: AuthLayoutProps) {
  return (
    <div
      className={cn('flex flex-col gap-6 w-full max-w-6xl mx-auto', className)}
      {...props}
    >
      <Card className="overflow-hidden p-0 shadow-xl">
        <CardContent className="grid p-0 lg:grid-cols-2">
          {/* Form Section */}
          <div className="p-8 lg:p-12 flex items-center">
            <div className="flex flex-col gap-6 w-full max-w-md mx-auto lg:mx-0 lg:max-w-none">
              {/* Header with Logo */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                    <Image
                      src="/logo.svg"
                      alt="playableFactory"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      playableFactory
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Digital Experiences
                    </p>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
                <p className="text-muted-foreground text-balance">{subtitle}</p>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Success Alert */}
              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              {/* Main Form Content */}
              {children}

              {/* Footer Links */}
              {footerContent && (
                <div className="text-center text-sm">{footerContent}</div>
              )}
            </div>
          </div>

          {/* E-commerce Showcase Section */}
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-600/5 relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent" />
            <div className="relative h-full flex items-center justify-center p-12">
              <div className="text-center space-y-6">
                {/* Product Showcase */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 mx-auto overflow-hidden">
                      <Image
                        src="/placeholder-product.jpg"
                        alt="Featured Product"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Premium Products</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Quality guaranteed</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 mx-auto overflow-hidden">
                      <Image
                        src="/placeholder-product.jpg"
                        alt="Featured Product"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Fast Delivery</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Free shipping over $50</p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Shop with Confidence
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                  Join thousands of satisfied customers. Get exclusive deals, track your orders, and enjoy secure shopping with our trusted platform.
                </p>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-6 pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Privacy */}
      <div className="text-muted-foreground text-center text-xs text-balance">
        By continuing, you agree to our{' '}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-purple-600 dark:hover:text-purple-400"
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-purple-600 dark:hover:text-purple-400"
        >
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  )
}
