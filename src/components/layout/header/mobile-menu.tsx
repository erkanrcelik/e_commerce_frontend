'use client'

import {
  Heart,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  Star,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { logoutUser } from '@/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { CustomerCategoryService } from '@/services/customer-category.service'
import type { Category } from '@/types/customer-category'
import Image from 'next/image'

/**
 * Mobile Menu Component
 *
 * Provides mobile navigation with categories, user account options, and authentication.
 * Uses a slide-out drawer interface optimized for mobile devices with enhanced design.
 *
 * Features:
 * - User authentication display
 * - Quick action links
 * - Category navigation
 * - Logout functionality
 * - Responsive design
 *
 * @example
 * ```tsx
 * <MobileMenu />
 * ```
 */
export function MobileMenu() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { user, status } = useAppSelector(state => state.auth)
  const isAuthenticated = status === 'authenticated' && !!user
  const [categories, setCategories] = useState<Category[]>([])

  /**
   * Load categories on component mount
   */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await CustomerCategoryService.getCategories({
          limit: 10,
        })
        setCategories(categoriesData.data)
      } catch (error) {
        console.error('Load categories error:', error)
        // Handle error
      }
    }

    loadCategories()
  }, [])

  /**
   * Handle user logout
   *
   * Calls the logout API, clears authentication state,
   * and redirects to home page with success feedback.
   */
  const handleLogout = async () => {
    try {
      // Show loading toast
      toast.loading('Logging out...', {
        id: 'logout',
      })

      // Dispatch logout action
      await dispatch(logoutUser()).unwrap()

      // Show success message
      toast.success('Logged out successfully', {
        id: 'logout',
        description: 'You have been logged out successfully.',
      })

      // Redirect to home page
      router.push('/')
    } catch (error) {
      console.error('Load user data error:', error)
      // Handle error
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle className="text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                  <Image
                    src="/logo.svg"
                    alt="playableFactory"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  playableFactory
                </span>
              </div>
            </SheetTitle>
          </SheetHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* User Section */}
            <div className="px-6 py-4 border-b bg-gray-50 dark:bg-gray-800/50">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                    {user?.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={`${user.firstName} ${user.lastName}`}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link href="/login">
                    <Button variant="default" size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline" size="sm" className="w-full">
                      Create Account
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-4 border-b">
              <h3 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
                Quick Actions
              </h3>
              <div className="space-y-1">
                <Link
                  href="/profile/orders"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Package className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">My Orders</span>
                </Link>
                <Link
                  href="/profile/favorites"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Heart className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">My Favorites</span>
                </Link>
                <Link
                  href="/profile/reviews"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Star className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">My Reviews</span>
                </Link>
                <Link
                  href="/profile/comments"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Star className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">My Comments</span>
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div className="px-6 py-4">
              <h3 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
                Categories
              </h3>
              <div className="space-y-1">
                {categories.map(category => (
                  <Link
                    key={category._id}
                    href={`/categories/${category._id}`}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <ShoppingBag className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          {isAuthenticated && (
            <div className="border-t p-6 space-y-2">
              <Link
                href="/profile"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Settings className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Account Settings</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors w-full text-left"
              >
                <LogOut className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-600 dark:text-red-400">
                  Logout
                </span>
              </button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
