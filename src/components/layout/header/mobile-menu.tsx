'use client'

import { Heart, Menu, Package, Settings, ShoppingBag, Star, User } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { useAppSelector } from '@/hooks/redux'
import { mockCategories } from '@/lib/mock-data'

/**
 * Mobile Menu Component
 * 
 * Provides mobile navigation with categories, user account options, and authentication.
 * Uses a slide-out drawer interface optimized for mobile devices with enhanced design.
 * 
 * @example
 * ```tsx
 * <MobileMenu />
 * ```
 */
export function MobileMenu() {
  const { user, status } = useAppSelector(state => state.auth)
  const isAuthenticated = status === 'authenticated' && !!user

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="lg:hidden h-10 w-10 rounded-xl"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
        <SheetHeader className="text-left mb-8">
          <SheetTitle className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              playableFactory
            </span>
          </SheetTitle>
          {isAuthenticated && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Welcome back, {user.firstName}!
            </p>
          )}
        </SheetHeader>
        
        <div className="space-y-8">
          {/* Authentication Section */}
          {!isAuthenticated && (
            <div className="space-y-3">
              <Button 
                asChild 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12 rounded-xl"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild variant="outline" className="w-full h-12 rounded-xl">
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
          )}
          
          {/* Quick Actions */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/products"
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 text-center bg-white dark:bg-gray-800 hover:shadow-md"
              >
                <Package className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <div className="text-sm font-medium">All Products</div>
              </Link>
              <Link
                href="/wishlist"
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 text-center bg-white dark:bg-gray-800 hover:shadow-md"
              >
                <Heart className="w-6 h-6 mx-auto mb-2 text-red-500" />
                <div className="text-sm font-medium">Wishlist</div>
              </Link>
            </div>
          </div>
          
          {/* Categories Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Star className="w-4 h-4" />
              Categories
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {mockCategories.slice(0, 8).map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 text-center bg-white dark:bg-gray-800 hover:shadow-md text-sm"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Account Section (Authenticated Users) */}
          {isAuthenticated && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <User className="w-4 h-4" />
                Account
              </h3>
              <div className="space-y-2">
                <Link 
                  href="/orders" 
                  className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                >
                  <Package className="w-4 h-4" />
                  My Orders
                </Link>
                <Link 
                  href="/profile" 
                  className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                >
                  <Settings className="w-4 h-4" />
                  Profile Settings
                </Link>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
} 