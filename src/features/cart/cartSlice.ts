import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { CartItem, CartState } from '@/types/cart'

/**
 * Mock cart items for demonstration
 */
const mockCartItems: CartItem[] = [
  {
    id: '1',
    productId: 'prod-1',
    name: 'Nike Air Max 270',
    price: 1299.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    variant: {
      size: '42',
      color: 'Siyah',
    },
    maxQuantity: 10,
  },
  {
    id: '2',
    productId: 'prod-2',
    name: 'Adidas Ultraboost 22',
    price: 1899.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop',
    variant: {
      size: '41',
      color: 'Beyaz',
    },
    maxQuantity: 8,
  },
  {
    id: '3',
    productId: 'prod-3',
    name: 'Puma RS-X',
    price: 899.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
    variant: {
      size: '43',
      color: 'Mavi',
    },
    maxQuantity: 5,
  },
]

/**
 * Calculate initial totals
 */
const calculateInitialTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 50 ? 0 : 5.99
  const tax = subtotal * 0.085
  const total = subtotal + shipping + tax
  return { subtotal, shipping, tax, total }
}

const initialTotals = calculateInitialTotals(mockCartItems)

/**
 * Initial cart state
 */
const initialState: CartState = {
  items: mockCartItems,
  total: initialTotals.total,
  subtotal: initialTotals.subtotal,
  shipping: initialTotals.shipping,
  tax: initialTotals.tax,
  discount: 0,
  discountCode: undefined,
}

/**
 * Cart slice for Redux state management
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Add item to cart
     */
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      )

      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }

      // Recalculate totals
      cartSlice.caseReducers.calculateTotals(state)
    },

    /**
     * Remove item from cart
     */
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      cartSlice.caseReducers.calculateTotals(state)
    },

    /**
     * Update item quantity
     */
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity)
        cartSlice.caseReducers.calculateTotals(state)
      }
    },

    /**
     * Clear cart
     */
    clearCart: state => {
      state.items = []
      state.total = 0
      state.subtotal = 0
      state.shipping = 0
      state.tax = 0
      state.discount = 0
      state.discountCode = undefined
    },

    /**
     * Calculate cart totals
     */
    calculateTotals: state => {
      state.subtotal = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
      
      // Shipping calculation (free shipping over $50)
      state.shipping = state.subtotal >= 50 ? 0 : 5.99
      
      // Tax calculation (8.5%)
      state.tax = state.subtotal * 0.085
      
      // Total calculation
      state.total = state.subtotal + state.shipping + state.tax - state.discount
    },

    /**
     * Apply discount code
     */
    applyDiscount: (
      state,
      action: PayloadAction<{ code: string; amount: number }>
    ) => {
      state.discountCode = action.payload.code
      state.discount = action.payload.amount
      cartSlice.caseReducers.calculateTotals(state)
    },

    /**
     * Remove discount
     */
    removeDiscount: state => {
      state.discountCode = undefined
      state.discount = 0
      cartSlice.caseReducers.calculateTotals(state)
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  calculateTotals,
  applyDiscount,
  removeDiscount,
} = cartSlice.actions

export default cartSlice.reducer 