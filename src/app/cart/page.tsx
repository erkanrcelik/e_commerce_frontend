
import { CartPage } from '@/components/cart/cart-page'
import { CustomerCartService } from '@/services/customer-cart.service'

/**
 * Cart page
 *
 * Multi-step checkout process with cart management
 * Uses SSR to fetch cart data and recommendations
 */
export default async function Cart() {
  // Get cart screen data with recommendations
  try {
    const cartScreenData = await CustomerCartService.getCartScreen({ limit: 6 })
    return <CartPage initialData={cartScreenData} />
  } catch (error) {
    console.log('Failed to fetch cart data:', error)
    // Return empty cart page if data fetch fails
    return <CartPage initialData={undefined} />
  }
}
