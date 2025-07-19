'use client'

import { useState } from 'react'

import { ProfileAccount } from './profile-account'
import { ProfileComments } from './profile-comments'
import { ProfileFavorites } from './profile-favorites'
import { ProfileHeader } from './profile-header'
import { ProfileOrders } from './profile-orders'
import { ProfileSidebar } from './profile-sidebar'

/**
 * Profile Page (modern, sidebar layout, modular)
 *
 * @component
 */
export function ProfilePage() {
  const [tab, setTab] = useState<'orders' | 'favorites' | 'comments' | 'account'>('orders')

  // Mock user and data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    joined: '2023-01-01'
  }
  const orders = [
    { id: 1, date: '2024-06-01', total: 1200, status: 'delivered' as const, items: [{}, {}] },
    { id: 2, date: '2024-05-15', total: 800, status: 'preparing' as const, items: [{}] }
  ]
  const favorites = [
    { id: '1', name: 'iPhone 15 Pro Max', price: 1199.99, image: '/images/products/iphone-15-pro-max-1.jpg', slug: 'iphone-15-pro-max' },
    { id: '2', name: 'MacBook Air M2', price: 1099.99, image: '/images/products/macbook-air-m2-1.jpg', slug: 'macbook-air-m2' }
  ]
  const comments = [
    { id: '1', productName: 'iPhone 15 Pro Max', productSlug: 'iphone-15-pro-max', text: 'Great product, very satisfied!', date: '2024-06-01' },
    { id: '2', productName: 'MacBook Air M2', productSlug: 'macbook-air-m2', text: 'Excellent device.', date: '2024-05-20' }
  ]

  function handleLogout() {
    // Logout functionality
    alert('Logged out!')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <ProfileHeader user={user} />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <ProfileSidebar active={tab} onChange={t => setTab(t as typeof tab)} onLogout={handleLogout} />
          </div>
          <div className="flex-1">
            {tab === 'orders' && <ProfileOrders orders={orders} />}
            {tab === 'favorites' && <ProfileFavorites favorites={favorites} />}
            {tab === 'comments' && <ProfileComments comments={comments} />}
            {tab === 'account' && <ProfileAccount user={user} />}
          </div>
        </div>
      </div>
    </div>
  )
} 