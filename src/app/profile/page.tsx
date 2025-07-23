import type { Metadata } from 'next'

import { ProfilePage } from '@/components/profile/profile-page'

export const metadata: Metadata = {
  title: 'Profile - playableFactory',
  description: 'Manage your account information',
  keywords: ['profile', 'account', 'user'],
}

/**
 * Profile Page
 *
 * User profile management page with modern sidebar layout
 */
export default function ProfilePageComponent() {
  return <ProfilePage />
}
