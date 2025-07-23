'use client'

import { LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logoutUser } from '@/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import Image from 'next/image'

/**
 * User Account Menu Component
 *
 * Handles user authentication state and provides access to account-related pages.
 * Shows different content based on authentication status with logout functionality.
 * Prevents hydration errors by ensuring client-side rendering.
 *
 * Features:
 * - User authentication display
 * - Account navigation links
 * - Logout functionality with feedback
 * - Responsive design
 * - Hydration error prevention
 *
 * @example
 * ```tsx
 * <UserAccountMenu />
 * ```
 */
export function UserAccountMenu() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { user, status } = useAppSelector(state => state.auth)
  const [isClient, setIsClient] = useState(false)

  // Prevent hydration mismatch by only rendering after client-side mount
  useEffect(() => {
    setIsClient(true)
  }, [])

  const isAuthenticated = status === 'authenticated' && !!user

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
      // Show error message
      toast.error('Logout failed', {
        id: 'logout',
        description: 'There was an error logging out. Please try again.',
      })
    }
  }

  /**
   * Get user initials for avatar display
   *
   * @returns User initials as string
   */
  const getUserInitials = () => {
    if (!user) return '?'
    const first = user.firstName?.charAt(0) || ''
    const last = user.lastName?.charAt(0) || ''
    return (first + last).toUpperCase() || 'U'
  }

  // Show loading state during hydration
  if (!isClient) {
    return (
      <Button
        variant="ghost"
        className="relative h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500"
        aria-label="User account menu"
        disabled
      >
        <User className="w-5 h-5 text-white" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isAuthenticated ? (
          // Authenticated user - show avatar with name
          <Button
            variant="ghost"
            className="flex items-center gap-2 h-10 px-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="User account menu"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-sm font-medium">
                  {getUserInitials()}
                </span>
              )}
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
              {user.firstName}
            </span>
          </Button>
        ) : (
          // Guest user - show user icon
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            aria-label="User account menu"
          >
            <User className="w-5 h-5 text-white" />
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        {!isAuthenticated ? (
          <>
            {/* Guest User Menu */}
            <div className="p-4 text-center">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                New customer?{' '}
                <Link
                  href="/register"
                  className="text-purple-600 hover:underline"
                >
                  Create account
                </Link>
              </p>
            </div>
            <DropdownMenuSeparator />
          </>
        ) : (
          <>
            {/* Authenticated User Menu */}
            <DropdownMenuLabel>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={`${user.firstName} ${user.lastName}`}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm font-medium">
                      {getUserInitials()}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-medium">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Account Actions */}
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center w-full">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Sign Out */}
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
