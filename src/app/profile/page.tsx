import type { Metadata } from 'next'

import { ProfilePage } from '@/components/profile/profile-page'

export const metadata: Metadata = {
  title: 'Profil - playableFactory',
  description: 'Hesap bilgilerinizi yönetin',
  keywords: ['profil', 'hesap', 'kullanıcı'],
}

/**
 * Profile Page
 * 
 * User profile management page with modern sidebar layout
 */
export default function ProfilePageComponent() {
  return <ProfilePage />
} 