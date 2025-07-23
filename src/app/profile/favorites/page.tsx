import type { Metadata } from 'next'

import { ProfileFavorites } from '@/components/profile/profile-favorites'

export const metadata: Metadata = {
  title: 'Favorilerim - playableFactory',
  description: 'Favori ürünlerinizi görüntüleyin',
  keywords: ['favori', 'favorilerim', 'ürünler'],
}

/**
 * Favorites Page
 *
 * User favorites management page
 */
export default function FavoritesPageComponent() {
  return <ProfileFavorites />
}
