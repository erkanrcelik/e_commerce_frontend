import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'sonner'

import { CustomerWishlistService } from '@/services/customer-wishlist.service'
import type { WishlistItem } from '@/types/customer-wishlist'

/**
 * Wishlist state interface
 */
export interface WishlistState {
  items: WishlistItem[]
  isLoading: boolean
  error: string | null
}

/**
 * Initial wishlist state
 */
const initialState: WishlistState = {
  items: [],
  isLoading: false,
  error: null,
}

/**
 * Get wishlist async thunk
 */
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const wishlistData = await CustomerWishlistService.getWishlist()
      return wishlistData
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to fetch wishlist'
      )
    }
  }
)

/**
 * Add to wishlist async thunk
 */
export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId: string, { rejectWithValue }) => {
    try {
      const newItem = await CustomerWishlistService.addToWishlist(productId)
      toast.success('Added to wishlist')
      return newItem
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to add to wishlist')
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to add to wishlist'
      )
    }
  }
)

/**
 * Remove from wishlist async thunk
 */
export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId: string, { rejectWithValue }) => {
    try {
      await CustomerWishlistService.removeFromWishlist(productId)
      toast.success('Removed from wishlist')
      return productId
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || 'Failed to remove from wishlist'
      )
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to remove from wishlist'
      )
    }
  }
)

/**
 * Wishlist slice
 */
export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearWishlist: state => {
      state.items = []
    },
    setWishlist: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload
    },
    clearError: state => {
      state.error = null
    },
  },
  extraReducers: builder => {
    // Fetch wishlist cases
    builder
      .addCase(fetchWishlist.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Add to wishlist cases
    builder
      .addCase(addToWishlist.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        // Check if item already exists to avoid duplicates
        const existingIndex = state.items.findIndex(
          item => item.productId._id === action.payload.productId._id
        )
        if (existingIndex === -1) {
          state.items.push(action.payload)
        }
        state.isLoading = false
        state.error = null
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Remove from wishlist cases
    builder
      .addCase(removeFromWishlist.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(
          item => item.productId._id !== action.payload
        )
        state.isLoading = false
        state.error = null
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearWishlist, setWishlist, clearError } = wishlistSlice.actions

export default wishlistSlice.reducer
