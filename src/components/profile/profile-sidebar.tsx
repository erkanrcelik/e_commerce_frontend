'use client'

import { Heart, LogOut, MapPin, ShoppingBag, Star, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { logoutUser } from '@/features/auth/authSlice'
import { useAppDispatch } from '@/hooks/redux'

/**
 * Profile sidebar menu component
 *
 * Displays navigation menu for user profile sections with logout functionality.
 * Handles user logout with proper state management and navigation.
 *
 * Features:
 * - Navigation between profile sections
 * - Logout functionality with API call
 * - Loading states during logout
 * - Error handling and user feedback
 * - Automatic navigation after logout
 *
 * @param active - Currently active tab
 * @param onChange - Function to handle tab changes
 *
 * @example
 * ```tsx
 * <ProfileSidebar
 *   active="orders"
 *   onChange={(tab) => setActiveTab(tab)}
 * />
 * ```
 */
export function ProfileSidebar({
  active,
  onChange,
}: {
  active: string
  onChange: (tab: string) => void
}) {
  const dispatch = useAppDispatch()
  const router = useRouter()

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

  return (
    <nav className="flex flex-col gap-3 w-full md:w-64">
      <Button
        variant={active === 'orders' ? 'default' : 'ghost'}
        className="justify-start h-12 px-4"
        onClick={() => onChange('orders')}
      >
        <ShoppingBag className="w-4 h-4 mr-3" />
        My Orders
      </Button>

      <Button
        variant={active === 'favorites' ? 'default' : 'ghost'}
        className="justify-start h-12 px-4"
        onClick={() => onChange('favorites')}
      >
        <Heart className="w-4 h-4 mr-3" />
        My Favorites
      </Button>

      <Button
        variant={active === 'reviews' ? 'default' : 'ghost'}
        className="justify-start h-12 px-4"
        onClick={() => onChange('reviews')}
      >
        <Star className="w-4 h-4 mr-3" />
        My Reviews
      </Button>

      <Button
        variant={active === 'addresses' ? 'default' : 'ghost'}
        className="justify-start h-12 px-4"
        onClick={() => onChange('addresses')}
      >
        <MapPin className="w-4 h-4 mr-3" />
        My Addresses
      </Button>

      <Button
        variant={active === 'account' ? 'default' : 'ghost'}
        className="justify-start h-12 px-4"
        onClick={() => onChange('account')}
      >
        <User className="w-4 h-4 mr-3" />
        Account Settings
      </Button>

      {/* Logout Button */}
      <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="outline"
          className="w-full justify-start h-12 px-4 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/30"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
      </div>
    </nav>
  )
}
