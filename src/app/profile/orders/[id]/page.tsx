import { Metadata } from 'next'

import { OrderDetailPage } from '@/components/orders/order-detail-page'

export const metadata: Metadata = {
  title: 'Order Details - playableFactory',
  description: 'View your order details and tracking information',
}

/**
 * Order Detail Page Route
 *
 * Displays detailed order information including items, tracking, and status.
 *
 * Features:
 * - Order details with items
 * - Order tracking information
 * - Order status updates
 * - Order cancellation
 * - Responsive design
 */
export default async function OrderDetailPageRoute({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <OrderDetailPage orderId={id} />
}
