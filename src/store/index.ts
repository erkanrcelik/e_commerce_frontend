import { configureStore } from '@reduxjs/toolkit'

import authReducer from '@/features/auth/authSlice'
import cartReducer from '@/features/cart/cartSlice'
import wishlistReducer from '@/features/wishlist/wishlistSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
