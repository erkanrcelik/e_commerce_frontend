'use client'

import { Bell } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

/**
 * Notifications Button Component
 * 
 * Displays notification bell icon with unread count badge.
 * Provides access to user notifications when clicked.
 * 
 * @example
 * ```tsx
 * <NotificationsButton />
 * ```
 */
export function NotificationsButton() {
  // TODO: Replace with actual notification state from Redux store
  const notificationCount = 2

  /**
   * Handle notification button click
   */
  const handleNotificationClick = () => {
    // TODO: Implement notification panel or navigation
    // console.log('Notifications clicked')
  }

  return (
    <Button 
      variant="ghost" 
      className="relative h-10 w-10 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/30"
      onClick={handleNotificationClick}
      aria-label={`Notifications ${notificationCount > 0 ? `(${notificationCount} unread)` : ''}`}
    >
      <Bell className="w-5 h-5" />
      {notificationCount > 0 && (
        <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500">
          {notificationCount > 9 ? '9+' : notificationCount}
        </Badge>
      )}
    </Button>
  )
} 