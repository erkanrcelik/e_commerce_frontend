'use client'

import { Package, User } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAppSelector } from '@/hooks/redux'

/**
 * User Account Menu Component
 * 
 * Handles user authentication state and provides access to account-related pages.
 * Shows different content based on authentication status.
 * 
 * @example
 * ```tsx
 * <UserAccountMenu />
 * ```
 */
export function UserAccountMenu() {
  const { user, status } = useAppSelector(state => state.auth)
  const isAuthenticated = status === 'authenticated' && !!user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          aria-label="User account menu"
        >
          <User className="w-5 h-5 text-white" />
        </Button>
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
                <Link href="/register" className="text-purple-600 hover:underline">
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
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.firstName?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{user.firstName} {user.lastName}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {/* Account Actions */}
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              <Link href="/profile" className="w-full">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Package className="w-4 h-4 mr-2" />
              <Link href="/orders" className="w-full">My Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            
            {/* Sign Out */}
            <DropdownMenuItem className="text-red-600">
              Sign Out
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 