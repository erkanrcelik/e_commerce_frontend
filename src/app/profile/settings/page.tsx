import type { Metadata } from 'next'

import { ProfileAccount } from '@/components/profile/profile-account'

export const metadata: Metadata = {
  title: 'Account Settings - playableFactory',
  description: 'Manage your account information',
  keywords: ['account', 'settings', 'profile'],
}

/**
 * Settings Page
 *
 * User account settings page
 */
export default function SettingsPageComponent() {
  return <ProfileAccount />
}
