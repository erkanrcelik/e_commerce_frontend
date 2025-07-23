import { Metadata } from 'next'

import { AddressesPage } from '@/components/profile/addresses-page'

export const metadata: Metadata = {
  title: 'My Addresses - playableFactory',
  description: 'Manage your shipping addresses',
}

/**
 * Addresses Page
 *
 * Displays user's shipping addresses with add, edit, delete functionality.
 *
 * Features:
 * - List all user addresses
 * - Add new address
 * - Edit existing address
 * - Delete address
 * - Set default address
 * - Form validation
 * - Responsive design
 */
export default function AddressesPageRoute() {
  return <AddressesPage />
}
