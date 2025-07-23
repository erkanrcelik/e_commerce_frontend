'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useAppSelector } from '@/hooks/redux'

import { AddressesPage } from './addresses-page'
import { ProfileAccount } from './profile-account'
import { ProfileFavorites } from './profile-favorites'
import { ProfileHeader } from './profile-header'
import { ProfileOrders } from './profile-orders'
import { ProfileReviews } from './profile-reviews'
import { ProfileSidebar } from './profile-sidebar'

/**
 * Profile Page (modern, sidebar layout, modular)
 *
 * @component
 */
export function ProfilePage() {
  const router = useRouter()
  const { user, status } = useAppSelector(state => state.auth)
  const [tab, setTab] = useState<
    'orders' | 'favorites' | 'reviews' | 'addresses' | 'account'
  >('orders')

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // Show loading if still checking auth status
  if (status === 'idle' || status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated
  if (!user || status !== 'authenticated') {
    return null
  }

  // Transform user data for components
  const userData = {
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    joined: user.createdAt,
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader user={userData} />
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="lg:w-1/4">
            <ProfileSidebar
              active={tab}
              onChange={t => setTab(t as typeof tab)}
            />
          </div>
          <div className="flex-1 lg:pl-8">
            {tab === 'orders' && <ProfileOrders />}
            {tab === 'favorites' && <ProfileFavorites />}
            {tab === 'reviews' && <ProfileReviews />}
            {tab === 'addresses' && <AddressesPage />}
            {tab === 'account' && <ProfileAccount />}
          </div>
        </div>
      </div>
    </div>
  )
}
