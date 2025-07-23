import type { Metadata } from 'next'

import { ProfileOrders } from '@/components/profile/profile-orders'

export const metadata: Metadata = {
  title: 'My Orders - playableFactory',
  description: 'Siparişlerinizi görüntüleyin ve takip edin',
  keywords: ['sipariş', 'siparişlerim', 'takip'],
}

/**
 * Orders Page
 *
 * User orders management page
 */
export default function OrdersPageComponent() {
  return <ProfileOrders />
}
