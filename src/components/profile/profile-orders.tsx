import { ShoppingBag } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

/**
 * Order interface
 */
interface Order {
  id: number
  date: string
  total: number
  status: 'delivered' | 'preparing' | 'cancelled'
  items: Array<Record<string, unknown>>
}

/**
 * My Orders component
 * @param orders Order list
 */
export function ProfileOrders({ orders }: { orders: Order[] }) {
  if (!orders.length) {
    return (
      <Card className="p-8 text-center flex flex-col items-center justify-center">
        <ShoppingBag className="w-10 h-10 text-gray-300 mb-2" />
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">No orders yet</div>
        <div className="text-gray-500 dark:text-gray-400">Continue shopping!</div>
      </Card>
    )
  }
  return (
    <div className="grid gap-4">
      {orders.map(order => (
        <Card key={order.id} className="p-6 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="font-semibold text-gray-900 dark:text-white mb-1">Order #{order.id}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Date: {order.date}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total: <span className="font-bold">${order.total}</span></div>
            <div className="flex gap-2 mt-2">
              {order.status === 'delivered' && <Badge variant="secondary">Delivered</Badge>}
              {order.status === 'preparing' && <Badge variant="secondary">Preparing</Badge>}
              {order.status === 'cancelled' && <Badge variant="destructive">Cancelled</Badge>}
            </div>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <div className="text-sm text-gray-500 dark:text-gray-400">{order.items.length} items</div>
            <a href={`/orders/${order.id}`} className="text-purple-600 dark:text-purple-400 hover:underline text-sm font-medium">Details</a>
          </div>
        </Card>
      ))}
    </div>
  )
} 