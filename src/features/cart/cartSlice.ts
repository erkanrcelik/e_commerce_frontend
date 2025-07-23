import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CustomerCartService } from '@/services/customer-cart.service'
import type { CartItem, CartResponse } from '@/types/customer-cart'

/**
 * Cart state interface
 */
export interface CartState {
  items: CartItem[]
  total: number
  subtotal: number
  totalDiscount: number
  shipping: number
  tax: number
  discount: number
  appliedCampaigns: any[]
  isLoading: boolean
  error: string | null
}

/**
 * Initial cart state
 */
const initialState: CartState = {
  items: [],
  total: 0,
  subtotal: 0,
  totalDiscount: 0,
  shipping: 0,
  tax: 0,
  discount: 0,
  appliedCampaigns: [],
  isLoading: false,
  error: null,
}

/**
 * Async thunk to fetch cart from API
 */
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await CustomerCartService.getCart()
      return response
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch cart'
      )
    }
  }
)

/**
 * Async thunk to add item to cart
 */
export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (
    { productId, quantity }: { productId: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await CustomerCartService.addToCart(productId, quantity)
      return response
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add item to cart'
      )
    }
  }
)

/**
 * Async thunk to update cart item quantity
 */
export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async (
    { productId, quantity }: { productId: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await CustomerCartService.updateCartItem(
        productId,
        quantity
      )
      return response
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update cart item'
      )
    }
  }
)

/**
 * Async thunk to remove item from cart
 */
export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await CustomerCartService.removeFromCart(productId)
      return response
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to remove item from cart'
      )
    }
  }
)

/**
 * Async thunk to clear cart
 */
export const clearCartAsync = createAsyncThunk(
  'cart/clearCartAsync',
  async (_, { rejectWithValue }) => {
    try {
      await CustomerCartService.clearCart()
      return { message: 'Cart cleared successfully' }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to clear cart'
      )
    }
  }
)

/**
 * Cart slice with Redux Toolkit
 * Handles cart state management including API operations
 */
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Set loading state
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },

    /**
     * Set error state
     */
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },

    /**
     * Clear error state
     */
    clearError: state => {
      state.error = null
    },

    /**
     * Calculate cart totals including shipping, tax, and discounts
     */
    calculateTotals: state => {
      // Calculate subtotal
      state.subtotal = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )

      // Calculate shipping (free if subtotal > 150)
      state.shipping = state.subtotal >= 150 ? 0 : 15

      // Calculate tax (8.5%)
      state.tax = state.subtotal * 0.085

      // Calculate discount (from totalDiscount)
      state.discount = state.totalDiscount

      // Calculate total
      state.total = state.subtotal + state.shipping + state.tax - state.discount
    },
  },
  extraReducers: builder => {
    // Fetch cart
    builder
      .addCase(fetchCart.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(
        fetchCart.fulfilled,
        (state, action: PayloadAction<CartResponse>) => {
          state.isLoading = false
          state.items = action.payload.items
          state.total = action.payload.total
          state.subtotal = action.payload.subtotal
          state.totalDiscount = action.payload.totalDiscount
          state.appliedCampaigns = action.payload.appliedCampaigns

          // Calculate additional totals
          state.shipping = state.subtotal >= 150 ? 0 : 15
          state.tax = state.subtotal * 0.085
          state.discount = state.totalDiscount
        }
      )
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Add item to cart
    builder
      .addCase(addItemToCart.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(
        addItemToCart.fulfilled,
        (state, action: PayloadAction<CartResponse>) => {
          state.isLoading = false
          state.items = action.payload.items
          state.total = action.payload.total
          state.subtotal = action.payload.subtotal
          state.totalDiscount = action.payload.totalDiscount
          state.appliedCampaigns = action.payload.appliedCampaigns

          // Calculate additional totals
          state.shipping = state.subtotal >= 150 ? 0 : 15
          state.tax = state.subtotal * 0.085
          state.discount = state.totalDiscount
        }
      )
      .addCase(addItemToCart.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Update cart item quantity
    builder
      .addCase(updateCartItemQuantity.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(
        updateCartItemQuantity.fulfilled,
        (state, action: PayloadAction<CartResponse>) => {
          state.isLoading = false
          state.items = action.payload.items
          state.total = action.payload.total
          state.subtotal = action.payload.subtotal
          state.totalDiscount = action.payload.totalDiscount
          state.appliedCampaigns = action.payload.appliedCampaigns

          // Calculate additional totals
          state.shipping = state.subtotal >= 150 ? 0 : 15
          state.tax = state.subtotal * 0.085
          state.discount = state.totalDiscount
        }
      )
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Remove item from cart
    builder
      .addCase(removeItemFromCart.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(
        removeItemFromCart.fulfilled,
        (state, action: PayloadAction<CartResponse>) => {
          state.isLoading = false
          state.items = action.payload.items
          state.total = action.payload.total
          state.subtotal = action.payload.subtotal
          state.totalDiscount = action.payload.totalDiscount
          state.appliedCampaigns = action.payload.appliedCampaigns

          // Calculate additional totals
          state.shipping = state.subtotal >= 150 ? 0 : 15
          state.tax = state.subtotal * 0.085
          state.discount = state.totalDiscount
        }
      )
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Clear cart
    builder
      .addCase(clearCartAsync.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(clearCartAsync.fulfilled, state => {
        state.isLoading = false
        state.items = []
        state.total = 0
        state.subtotal = 0
        state.totalDiscount = 0
        state.shipping = 0
        state.tax = 0
        state.discount = 0
        state.appliedCampaigns = []
      })
      .addCase(clearCartAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { setLoading, setError, clearError, calculateTotals } =
  cartSlice.actions

export default cartSlice.reducer
